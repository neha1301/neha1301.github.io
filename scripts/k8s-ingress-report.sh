#!/usr/bin/env bash
#
# k8s-ingress-report.sh
#
# Fetches every Ingress across the production namespaces of a Kubernetes cluster
# and reports, for each one, WHEN it was created (creationTimestamp + age).
#
# Designed for bash 3.2 (macOS default) - no associative arrays, no bash-4isms.
#
# Requires: kubectl, jq
#
set -euo pipefail

# ---------------------------------------------------------------------------
# defaults
# ---------------------------------------------------------------------------
KUBECONFIG_PATH="${KUBECONFIG:-${HOME}/.kube/config}"
CONTEXT=""
NS_SELECTOR=""
ALL_NAMESPACES=0
PROD_PATTERN='(^|[^[:alnum:]])prod(uction)?([^[:alnum:]]|$)'
RESOLVE_APP=1
CSV_FILE=""
JSON_FILE=""
OUTPUT="table"        # table | csv | json | none
LIST_NAMESPACES=0
WATCH=0
INTERVAL=15
INCLUDE_NAMESPACES=""

usage() {
  cat <<'EOF'
Fetch all Ingress resources across prod namespaces and show when each was created.

USAGE
  k8s-ingress-report.sh [options]

OPTIONS
  -k, --kubeconfig PATH   Path to the kubeconfig file to use
                          (default: $KUBECONFIG or ~/.kube/config)
  -c, --context NAME      kubectl context to use (default: current context)
      --namespace NAME    Scan only this namespace (repeatable)
      --ns-selector SEL   Label selector used to identify prod namespaces
                          (e.g. "environment=prod"). Overrides auto-detection.
      --all-namespaces    Scan every namespace, skip the prod filter
      --prod-pattern RE   Regex a namespace name must match to count as prod
                          (default: "(^|[^[:alnum:]])prod(uction)?([^[:alnum:]]|$)")
      --include-ns LIST   Comma separated namespaces to always treat as prod
      --no-resolve-app    Skip mapping ingress backends to their Deployment
      --watch             Keep running; print ingresses as they are created
      --interval SEC      Poll interval for --watch (default: 15)
      --csv FILE          Write a CSV report to FILE
      --json FILE         Write a JSON report to FILE
      --output FORMAT     stdout format: table | csv | json | none (default: table)
      --list-namespaces   Print the prod namespaces that would be scanned and exit
  -h, --help              Show this help

EXAMPLES
  ./k8s-ingress-report.sh --kubeconfig ~/prod.kubeconfig
  ./k8s-ingress-report.sh -k ~/prod.kubeconfig -c prod-cluster --csv ingress.csv
  ./k8s-ingress-report.sh -k ~/prod.kubeconfig --watch --interval 10
  ./k8s-ingress-report.sh -k ~/prod.kubeconfig --ns-selector environment=prod
EOF
}

die() { printf 'error: %s\n' "$*" >&2; exit 1; }
info() { printf '==> %s\n' "$*" >&2; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "'$1' is required but was not found in PATH"
}

# ---------------------------------------------------------------------------
# argument parsing
# ---------------------------------------------------------------------------
NAMESPACES=()
while [ $# -gt 0 ]; do
  case "$1" in
    -k|--kubeconfig) KUBECONFIG_PATH="${2:?--kubeconfig needs a path}"; shift 2 ;;
    -c|--context)    CONTEXT="${2:?--context needs a name}"; shift 2 ;;
    --namespace)     NAMESPACES+=("${2:?--namespace needs a name}"); shift 2 ;;
    --ns-selector)   NS_SELECTOR="${2:?--ns-selector needs a selector}"; shift 2 ;;
    --all-namespaces) ALL_NAMESPACES=1; shift ;;
    --prod-pattern)  PROD_PATTERN="${2:?--prod-pattern needs a regex}"; shift 2 ;;
    --include-ns)    INCLUDE_NAMESPACES="${2:?--include-ns needs a list}"; shift 2 ;;
    --no-resolve-app) RESOLVE_APP=0; shift ;;
    --watch)         WATCH=1; shift ;;
    --interval)      INTERVAL="${2:?--interval needs seconds}"; shift 2 ;;
    --csv)           CSV_FILE="${2:?--csv needs a path}"; shift 2 ;;
    --json)          JSON_FILE="${2:?--json needs a path}"; shift 2 ;;
    --output)        OUTPUT="${2:?--output needs a format}"; shift 2 ;;
    --list-namespaces) LIST_NAMESPACES=1; shift ;;
    -h|--help)       usage; exit 0 ;;
    *)               die "unknown option '$1' (try --help)" ;;
  esac
done

case "$OUTPUT" in
  table|csv|json|none) ;;
  *) die "--output must be one of: table, csv, json, none" ;;
esac

need_cmd kubectl
need_cmd jq

[ -f "$KUBECONFIG_PATH" ] || die "kubeconfig not found: $KUBECONFIG_PATH"
[ -r "$KUBECONFIG_PATH" ] || die "kubeconfig not readable: $KUBECONFIG_PATH"

export KUBECONFIG="$KUBECONFIG_PATH"

# ---------------------------------------------------------------------------
# kubectl wrapper
# ---------------------------------------------------------------------------
KCTX=()
[ -n "$CONTEXT" ] && KCTX=(--context "$CONTEXT")

kube() {
  # ${arr[@]+...} keeps this working on bash 3.2 where an empty array + `set -u` errors.
  kubectl --kubeconfig "$KUBECONFIG_PATH" ${KCTX[@]+"${KCTX[@]}"} "$@"
}

TMPDIR_RUN="$(mktemp -d "${TMPDIR:-/tmp}/ingress-report.XXXXXX")"
cleanup() { rm -rf "$TMPDIR_RUN"; }
trap cleanup EXIT

# ---------------------------------------------------------------------------
# connectivity check
# ---------------------------------------------------------------------------
if ! SERVER_URL="$(kube config view --minify -o jsonpath='{.clusters[0].cluster.server}' 2>/dev/null)"; then
  die "could not read cluster info from $KUBECONFIG_PATH"
fi
[ -n "$SERVER_URL" ] || die "no cluster server found in $KUBECONFIG_PATH"

if ! kube version -o json >/dev/null 2>&1; then
  die "cannot reach cluster at $SERVER_URL - check network/VPN and credentials"
fi

CTX_NAME="${CONTEXT:-$(kube config current-context 2>/dev/null || echo 'unknown')}"
info "cluster: $SERVER_URL  (context: $CTX_NAME)"

# ---------------------------------------------------------------------------
# resolve the set of prod namespaces
# ---------------------------------------------------------------------------
NS_FILE="$TMPDIR_RUN/namespaces.json"

if [ "${#NAMESPACES[@]}" -gt 0 ]; then
  printf '%s\n' "${NAMESPACES[@]}" | jq -R . | jq -s '{items: map({metadata: {name: .}})}' > "$NS_FILE"
elif [ -n "$NS_SELECTOR" ]; then
  info "selecting namespaces with label selector: $NS_SELECTOR"
  if ! kube get namespaces -l "$NS_SELECTOR" -o json > "$NS_FILE" 2>/dev/null; then
    die "namespace selector '$NS_SELECTOR' matched nothing or was invalid"
  fi
elif [ "$ALL_NAMESPACES" -eq 1 ]; then
  kube get namespaces -o json > "$NS_FILE"
else
  kube get namespaces -o json > "$NS_FILE"
fi

# Build the prod namespace list.
if [ "${#NAMESPACES[@]}" -gt 0 ]; then
  PROD_NS="$(printf '%s\n' "${NAMESPACES[@]}")"
elif [ -n "$NS_SELECTOR" ]; then
  PROD_NS="$(jq -r '.items[].metadata.name' "$NS_FILE")"
elif [ "$ALL_NAMESPACES" -eq 1 ]; then
  PROD_NS="$(jq -r '.items[].metadata.name' "$NS_FILE")"
else
  INCLUDE_JSON="$(printf '%s\n' "$INCLUDE_NAMESPACES" | jq -R 'split(",") | map(select(length > 0))')"
  PROD_NS="$(jq -r --arg pattern "$PROD_PATTERN" --argjson include "$INCLUDE_JSON" '
    def is_prod_label:
      ( (.metadata.labels // {})
        | to_entries
        | map(select(.key | test("^(environment|env|stage|tier|devtron\\.io/environment|app\\.kubernetes\\.io/environment)$")))
        | map(.value | ascii_downcase)
        | any(. == "prod" or . == "production" or . == "prd" or . == "live") );
    [ .items[]
      | select(
          is_prod_label
          or (.metadata.name | test($pattern; "i"))
          or (.metadata.name as $n | $include | index($n) != null)
        )
      | .metadata.name
    ] | sort | .[]
  ' "$NS_FILE")"
fi

if [ -z "$PROD_NS" ]; then
  die "no prod namespaces were detected - use --namespace, --ns-selector or --all-namespaces"
fi

NS_COUNT="$(printf '%s\n' "$PROD_NS" | wc -l | tr -d ' ')"
info "prod namespaces ($NS_COUNT): $(printf '%s' "$PROD_NS" | tr '\n' ' ')"

if [ "$LIST_NAMESPACES" -eq 1 ]; then
  printf '%s\n' "$PROD_NS"
  exit 0
fi

# The prod namespace list, as a JSON array (safe to pass to jq via --argjson).
PROD_NS_CSV="$(printf '%s\n' "$PROD_NS" | jq -R . | jq -s .)"

# ---------------------------------------------------------------------------
# fetch resources
# ---------------------------------------------------------------------------
info "fetching ingresses..."
kube get ingress --all-namespaces -o json > "$TMPDIR_RUN/ingresses.json"

if [ "$RESOLVE_APP" -eq 1 ]; then
  info "fetching services and deployments for backend mapping..."
  kube get services --all-namespaces -o json > "$TMPDIR_RUN/services.json" 2>/dev/null || printf '{"items":[]}' > "$TMPDIR_RUN/services.json"
  kube get deployments --all-namespaces -o json > "$TMPDIR_RUN/deployments.json" 2>/dev/null || printf '{"items":[]}' > "$TMPDIR_RUN/deployments.json"
  RESOLVE_JSON=true
else
  printf '{"items":[]}' > "$TMPDIR_RUN/services.json"
  printf '{"items":[]}' > "$TMPDIR_RUN/deployments.json"
  RESOLVE_JSON=false
fi

# ---------------------------------------------------------------------------
# jq program: flatten every ingress into a report record
# ---------------------------------------------------------------------------
build_records() {
  jq -n \
    --slurpfile ing "$TMPDIR_RUN/ingresses.json" \
    --slurpfile svc "$TMPDIR_RUN/services.json" \
    --slurpfile dep "$TMPDIR_RUN/deployments.json" \
    --argjson prodns "$PROD_NS_CSV" \
    --argjson resolve "$RESOLVE_JSON" '
    def norm_ts: sub("\\.[0-9]+Z$"; "Z");
    def epoch: (norm_ts | fromdateiso8601);
    def age_human($e):
      (now - $e) as $d
      | if   $d < 0            then "just now"
        elif $d < 60           then "\($d)s"
        elif $d < 3600         then "\(($d / 60 | floor))m"
        elif $d < 86400        then "\(($d / 3600 | floor))h"
        elif $d < 2592000      then "\(($d / 86400 | floor))d"
        elif $d < 31536000     then "\(($d / 2592000 | floor))mo"
        else "\(($d / 31536000 | floor))y" end;

    def hosts($i): [ ($i.spec.rules // [])[] | .host? | select(. != null) ] | unique;
    def tls($i):   [ ($i.spec.tls // [])[] | .secretName? | select(. != null) ] | unique;
    def backends($i):
      ( [ ($i.spec.rules // [])[] | .http.paths[]? | .backend.service.name? | select(. != null) ]
      + [ $i.spec.defaultBackend?.service?.name? | select(. != null) ] ) | unique;
    def address($i): [ ($i.status.loadBalancer.ingress // [])[] | (.hostname // .ip // empty) ] | join(",");
    def owner($i):  [ ($i.metadata.ownerReferences // [])[] | "\(.kind)/\(.name)" ] | join(",");
    def app_label($i):
      ( ($i.metadata.labels // {}) as $l
        | ( $l["app.kubernetes.io/instance"] // $l["app.kubernetes.io/name"]
            // $l["devtron.io/app-id"] // $l["app"] // "" ) );
    def deploy_for($svc; $deps):
      ( ($svc.spec.selector // {}) as $sel
        | if ($sel | length) == 0 then ""
          else ( [ $deps[]
                   | select((.spec.template.metadata.labels // {}) as $l
                            | ($sel | to_entries | all(. as $e | $l[$e.key] == $e.value)))
                   | .metadata.name ] | first // "" )
          end );

    $ing[0].items
    | map(select(.metadata.namespace as $n | $prodns | index($n)))
    | map(
        . as $i
        | ($i.metadata.namespace) as $ns
        | (backends($i)) as $bs
        | ( [ $svc[0].items[]
               | select(.metadata.namespace == $ns)
               | select(.metadata.name as $sn | $bs | index($sn)) ] ) as $svcs
        | ( [ $dep[0].items[] | select(.metadata.namespace == $ns) ] ) as $deps
        | ( [ $svcs[] | deploy_for(.; $deps) | select(. != "") ] | unique ) as $apps
        | ( [ $svcs[].metadata.name ] | unique ) as $svcNames
        | ( $i.metadata.creationTimestamp ) as $ct
        | ( $ct | epoch ) as $ce
        | {
            namespace:   $ns,
            name:        $i.metadata.name,
            app:         (if $resolve then (app_label($i) // "") else "" end),
            class:       ($i.spec.ingressClassName // "-"),
            hosts:       hosts($i),
            tls:         tls($i),
            services:    $svcNames,
            backends:    $bs,
            workloads:   $apps,
            address:     address($i),
            owner:       owner($i),
            createdAt:   ($ct | norm_ts),
            createdEpoch: $ce,
            age:         age_human($ce),
            ageDays:     (((now - $ce) / 86400) | floor),
            uid:         ($i.metadata.uid // "")
          }
      )
    | map(
        . as $r
        | .app = (if $r.app != "" then $r.app
                  elif ($r.workloads | length) > 0 then ($r.workloads | join(","))
                  else "" end)
      )
    | sort_by(.createdEpoch, .namespace, .name)
  '
}

# ---------------------------------------------------------------------------
# formatting helpers
# ---------------------------------------------------------------------------
print_table() {
  local rows
  rows="$(jq -r '
    ( if (length == 0) then empty
      else
        ["NAMESPACE","INGRESS","APP","CLASS","HOSTS","CREATED (UTC)","AGE"]
        , ( .[]
            | [ .namespace, .name,
                (if .app == "" then "-" else .app end),
                .class,
                (if (.hosts | length) == 0 then "-" else (.hosts | join(", ")) end),
                .createdAt,
                .age ] )
        end )
    | @tsv' "$REPORT_JSON" 2>/dev/null)" || true

  if [ -z "$rows" ]; then
    printf 'No ingress resources found in the prod namespaces.\n'
    return
  fi

  printf '%s\n' "$rows" | awk -F'\t' '
    {
      line[NR] = $0
      for (i = 1; i <= NF; i++) {
        cell[NR, i] = $i
        if (length($i) > w[i]) w[i] = length($i)
      }
      if (NF > maxn) maxn = NF
    }
    END {
      for (r = 1; r <= NR; r++) {
        out = ""
        for (i = 1; i <= maxn; i++) {
          v = cell[r, i]
          out = out sprintf("%-*s  ", w[i], v)
        }
        print out
        if (r == 1) {
          sep = ""
          for (i = 1; i <= maxn; i++) {
            for (k = 0; k < w[i]; k++) sep = sep "-"
            sep = sep "  "
          }
          print sep
        }
      }
    }'
}

print_csv() {
  jq -r '
    ( ["namespace","ingress","app","class","hosts","tls_secrets","services","workloads","address","owner","created_at","age","age_days","uid"]
    , ( .[]
        | [ .namespace, .name, .app, .class,
            (.hosts | join(" ")), (.tls | join(" ")),
            (.services | join(" ")), (.workloads | join(" ")),
            .address, .owner, .createdAt, .age, .ageDays, .uid ] ) )
    | @csv' "$REPORT_JSON" 2>/dev/null || true
}

print_summary() {
  jq -r '
    . as $all
    | ($all | min_by(.createdAt)) as $old
    | ($all | max_by(.createdAt)) as $new
    | "ingress count : \($all | length)",
      "namespaces    : \($all | map(.namespace) | unique | length)",
      (if ($all | length) == 0 then "oldest       : -"
       else "oldest       : \($old.createdAt)  (age \($old.age))  \($old.namespace)/\($old.name)" end),
      (if ($all | length) == 0 then "newest       : -"
       else "newest       : \($new.createdAt)  (age \($new.age))  \($new.namespace)/\($new.name)" end),
      "per namespace:",
      ($all | group_by(.namespace)[] | "  \(.[0].namespace): \(length)")
  ' "$REPORT_JSON" 2>/dev/null || true
}

# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------
REPORT_JSON="$TMPDIR_RUN/report.json"
build_records > "$REPORT_JSON"

TOTAL="$(jq 'length' "$REPORT_JSON" 2>/dev/null || echo 0)"

if [ "$OUTPUT" = "table" ]; then
  print_table
  printf '\n'
  print_summary
elif [ "$OUTPUT" = "csv" ]; then
  print_csv
elif [ "$OUTPUT" = "json" ]; then
  jq '.' "$REPORT_JSON"
fi

if [ -n "$CSV_FILE" ]; then
  print_csv > "$CSV_FILE"
  info "CSV written to $CSV_FILE"
fi

if [ -n "$JSON_FILE" ]; then
  jq '.' "$REPORT_JSON" > "$JSON_FILE"
  info "JSON written to $JSON_FILE"
fi

info "total ingresses across prod namespaces: $TOTAL"

if [ "$WATCH" -eq 1 ]; then
  # Keep polling and print ingresses that show up after the initial snapshot.
  info "watching for new ingresses every ${INTERVAL}s (ctrl-c to stop)"
  SEEN_FILE="$TMPDIR_RUN/seen.txt"
  jq -r '.[] | "\(.namespace)/\(.name)"' "$REPORT_JSON" | sort > "$SEEN_FILE"
  while true; do
    sleep "$INTERVAL"
    LIVE_FILE="$TMPDIR_RUN/live.json"
    if ! kube get ingress --all-namespaces -o json > "$LIVE_FILE" 2>/dev/null; then
      info "poll failed - retrying in ${INTERVAL}s"
      continue
    fi
    jq -n \
      --slurpfile ing "$LIVE_FILE" \
      --argjson prodns "$PROD_NS_CSV" '
      def norm_ts: sub("\\.[0-9]+Z$"; "Z");
      def epoch: (norm_ts | fromdateiso8601);
      def age_human($e):
        (now - $e) as $d
        | if   $d < 0     then "just now"
          elif $d >= 86400 then "\(($d / 86400 | floor))d"
          elif $d >= 3600  then "\(($d / 3600 | floor))h"
          elif $d >= 60    then "\(($d / 60 | floor))m"
          else "\($d)s" end;
      $ing[0].items
      | map(select(.metadata.namespace as $n | $prodns | index($n)))
      | map(
          . as $i
          | ($i.metadata.creationTimestamp | epoch) as $ce
          | { namespace: $i.metadata.namespace,
              name: $i.metadata.name,
              class: ($i.spec.ingressClassName // "-"),
              hosts: ([ ($i.spec.rules // [])[] | .host? | select(. != null) ] | unique | join(", ")),
              createdAt: ($i.metadata.creationTimestamp | norm_ts),
              age: age_human($ce),
              uid: ($i.metadata.uid // "") }
        )
      | sort_by(.createdAt)
    ' > "$TMPDIR_RUN/live-records.json" 2>/dev/null || continue

    jq -r '.[] | "\(.namespace)/\(.name)"' "$TMPDIR_RUN/live-records.json" | sort > "$TMPDIR_RUN/live-seen.txt"
    comm -13 "$SEEN_FILE" "$TMPDIR_RUN/live-seen.txt" > "$TMPDIR_RUN/new.txt" || true

    if [ -s "$TMPDIR_RUN/new.txt" ]; then
      while IFS= read -r key; do
        [ -n "$key" ] || continue
        jq -r --arg key "$key" '.[] | select("\(.namespace)/\(.name)" == $key)
          | "NEW INGRESS  \(.namespace)/\(.name)\n  class   : \(.class)\n  hosts   : \(.hosts)\n  created : \(.createdAt)  (age \(.age))"' \
          "$TMPDIR_RUN/live-records.json"
      done < "$TMPDIR_RUN/new.txt"
      cat "$TMPDIR_RUN/live-seen.txt" > "$SEEN_FILE"
    fi
  done
fi
