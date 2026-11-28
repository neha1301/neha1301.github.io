/**
 * Selected engineering work — the only detailed section on the site.
 *
 * Every figure and claim comes from the verified resume or public project
 * README. Detailed explanations live inside expandable panels so the main
 * page stays scannable.
 */

export interface WorkMetric {
  value: string;
  label: string;
}

export interface WorkNode {
  id: string;
  label: string;
  detail: string;
}

export interface WorkItem {
  id: string;
  meta: string;
  title: string;
  summary: string;
  stack: string[];
  metrics: WorkMetric[];
  architecture: WorkNode[];
  challenge: string;
  decision: string;
  tradeoffs: string[];
  outcome: string;
  href?: string;
  hrefLabel?: string;
}

export const engineeringWork: WorkItem[] = [
  {
    id: "alert-enrichment",
    meta: "Open source · SRE tooling",
    title: "Alert enrichment for Alertmanager",
    summary:
      "A FastAPI webhook that turns raw pages into one Slack message with pod state, previous-container logs and a silence link.",
    stack: ["FastAPI", "Kubernetes API", "Slack", "Helm", "Redis"],
    metrics: [
      { value: "×3", label: "alerts → one message" },
      { value: "4s", label: "enrichment budget" },
      { value: "91.34%", label: "branch coverage" },
    ],
    architecture: [
      {
        id: "alertmanager",
        label: "Alertmanager",
        detail: "Fires v4 alert payloads to the webhook",
      },
      {
        id: "webhook",
        label: "FastAPI webhook",
        detail: "Parses and groups alerts by incident key",
      },
      {
        id: "dedupe",
        label: "Dedup reservation",
        detail: "Memory or Redis Lua, reserved before enrich",
      },
      {
        id: "enrich",
        label: "K8s enrichment",
        detail: "Pod, owner, rollout, previous logs, events",
      },
      {
        id: "slack",
        label: "Slack Block Kit",
        detail: "One escaped message with action buttons",
      },
    ],
    challenge:
      "A PodCrashLooping page gives a pod name, while the reason is scattered across restart counts, rollout state, previous-container logs, node pressure and warning events. Duplicate alerts about the same pod make the noise worse.",
    decision:
      "Reserve a per-incident dedup key before enrichment, read live cluster state inside a 4-second budget, then publish a single Slack message. Partial context is always sent rather than dropping an alert.",
    tradeoffs: [
      "Dedup is reserved before enrichment, so a failed enrichment can suppress a retry — but a flapping pod cannot produce a second page.",
      "In-memory dedup is the default; Redis with an atomic Lua reservation is opt-in for multi-replica deployments.",
    ],
    outcome:
      "Three alerts collapse into one actionable message, backed by 75 passing tests and 91.34% branch coverage.",
    href: "https://github.com/neha1301/alertbrief",
    hrefLabel: "View repository",
  },
  {
    id: "centralized-observability",
    meta: "Production work · BharatPe",
    title: "Centralized observability across 15+ clusters",
    summary:
      "Rewritten alert rules and ~10 Grafana dashboards that give on-call engineers and service owners one cross-cluster view.",
    stack: ["Prometheus", "Grafana", "Loki", "OpenTelemetry"],
    metrics: [
      { value: "5–10", label: "services in scope" },
      { value: "300–400", label: "alerts in one service" },
      { value: "15+", label: "clusters in one view" },
    ],
    architecture: [
      {
        id: "services",
        label: "Services",
        detail: "Alert rules and metrics from 5–10 services",
      },
      {
        id: "rules",
        label: "Rule review",
        detail: "Each use case reviewed, then rewritten",
      },
      {
        id: "dashboards",
        label: "Grafana",
        detail: "~10 dashboards over 15+ clusters",
      },
      {
        id: "owners",
        label: "On-call & owners",
        detail: "One shared operational view",
      },
    ],
    challenge:
      "One service alone emitted 300–400 alerts. Forwarding that volume would have moved noise rather than removed it, and cluster-scoped views made system-wide failures hard to see.",
    decision:
      "Reviewed each alert use case and rewrote the rules instead of passing raw alerts through. Standardized on Grafana dashboards that aggregate Prometheus data across 15+ clusters.",
    tradeoffs: [
      "Rewriting rules takes longer than adding a routing rule, but it removes the cause of the noise instead of hiding it downstream.",
    ],
    outcome:
      "On-call engineers and service owners work from the same cross-cluster view instead of hunting cluster by cluster.",
  },
  {
    id: "node-insight",
    meta: "Open source · Platform diagnostics",
    title: "Kubernetes Node Insight Tool",
    summary:
      "A read-only CLI that correlates node conditions, kubelet OOM events, capacity and workload state into a ranked root cause.",
    stack: ["Python", "Kubernetes API", "Karpenter"],
    metrics: [
      { value: "~70%", label: "less debugging time" },
      { value: "1", label: "read-only command" },
      { value: "0", label: "cluster changes" },
    ],
    architecture: [
      {
        id: "cluster",
        label: "Cluster",
        detail: "Nodes, pods, kubelet events, workload state",
      },
      {
        id: "api",
        label: "Kubernetes API",
        detail: "Read-only node conditions and events",
      },
      {
        id: "collector",
        label: "Python collector",
        detail: "Single file, no agent, no cluster writes",
      },
      {
        id: "correlate",
        label: "Signal correlation",
        detail: "OOM, pressure and capacity scored by severity",
      },
      {
        id: "verdict",
        label: "Root cause",
        detail: "Ranked cause plus affected pods",
      },
    ],
    challenge:
      "A node can remain Ready after a kernel-level OOM. The evidence sits in kubelet events, node conditions and capacity, while standard dashboards watch pod metrics — so triage means several commands and still some guesswork.",
    decision:
      "Correlate node conditions, OOM events, capacity and workload state in one read-only pass, then rank the likely root cause by severity. It also catches Ready-but-degraded nodes.",
    tradeoffs: [
      "Deterministic by design: one read-only pass, no agent and no cluster mutation. It reports evidence rather than speculation.",
    ],
    outcome:
      "Node-level triage drops from a multi-command investigation to a single pass, cutting debugging time by roughly 70%.",
    href: "https://github.com/neha1301/Kubernetes-Node-Insight-Tool",
    hrefLabel: "View repository",
  },
];
