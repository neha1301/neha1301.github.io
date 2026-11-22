# k8s-ingress-report.sh

Standalone operational script (no Next.js coupling) that fetches **every Ingress
across the production namespaces** of a Kubernetes cluster and reports **when each
one was created**.

## Requirements

- `kubectl` (v1.21+)
- `jq` (1.6+)
- bash 3.2+ (works on stock macOS)

## Quick start

```bash
chmod +x scripts/k8s-ingress-report.sh

# point it at the kubeconfig for the prod cluster
./scripts/k8s-ingress-report.sh --kubeconfig ~/prod.kubeconfig

# specific context inside a multi-cluster kubeconfig
./scripts/k8s-ingress-report.sh -k ~/prod.kubeconfig -c prod-cluster

# save reports
./scripts/k8s-ingress-report.sh -k ~/prod.kubeconfig --csv ingress.csv --json ingress.json

# stream ingresses as they get created
./scripts/k8s-ingress-report.sh -k ~/prod.kubeconfig --watch --interval 10

# check which namespaces the script considers "prod" before scanning
./scripts/k8s-ingress-report.sh -k ~/prod.kubeconfig --list-namespaces
```

## How "prod" is detected

A namespace is treated as production when **any** of these hold:

| Signal | Examples |
| --- | --- |
| Namespace label | `environment=prod`, `env=production`, `stage=prod`, `devtron.io/environment=PROD`, `app.kubernetes.io/environment=production` |
| Namespace name | matches the prod regex — default `(^\|[^[:alnum:]])prod(uction)?([^[:alnum:]]\|$)` (e.g. `payments-prod`, `prod-payments`, `production`) |
| Explicit list | `--namespace payments-prod --namespace checkout-prod` |
| Label selector | `--ns-selector environment=prod` (replaces auto-detection) |
| Everything | `--all-namespaces` |

Override the name rule with `--prod-pattern '<regex>'`, or force-include extra
namespaces with `--include-ns ns-a,ns-b`.

## Sample output

```
NAMESPACE      INGRESS           APP           CLASS  HOSTS                 CREATED (UTC)         AGE
-------------  ----------------  ------------  -----  --------------------  --------------------  --------
search-prod    search-ingress    search        -      search.example.com    2026-06-01T10:00:00Z  5mo
payments-prod  payments-ingress  payments      nginx  pay.example.com       2026-11-02T04:15:22Z  12d
checkout-prod  checkout-ingress  checkout-web  nginx  checkout.example.com  2026-11-14T22:41:09Z  2h

ingress count : 3
namespaces    : 3
oldest       : 2026-06-01T10:00:00Z  (age 5mo)  search-prod/search-ingress
newest       : 2026-11-14T22:41:09Z  (age 2h)  checkout-prod/checkout-ingress
per namespace:
  checkout-prod: 1
  payments-prod: 1
  search-prod: 1
```

## Columns / CSV fields

| Field | Meaning |
| --- | --- |
| `namespace` | namespace the ingress lives in |
| `ingress` | ingress name |
| `app` | owning app — from `app.kubernetes.io/instance` label, else the Deployment behind the ingress backend service |
| `class` | `spec.ingressClassName` |
| `hosts` | `spec.rules[].host` |
| `tls_secrets` | `spec.tls[].secretName` |
| `services` | backend services referenced by the ingress |
| `workloads` | Deployments matching those services' selectors |
| `address` | `status.loadBalancer.ingress[]` (LB hostname/IP) |
| `owner` | `metadata.ownerReferences` |
| `created_at` | `metadata.creationTimestamp` (UTC, fractional seconds stripped) |
| `age` | human-readable age (`12d`, `5mo`, `3h`, `just now`) |
| `age_days` | age in whole days |

## Notes

- Timestamps are read from `metadata.creationTimestamp` — that is the API server's
  record of when the ingress object was created, not when its backing app was deployed.
- `--watch` polls the API (default 15s) and prints only ingresses that appear after
  the initial snapshot.
- Use `--no-resolve-app` to skip the extra Service/Deployment lookups on large clusters.
