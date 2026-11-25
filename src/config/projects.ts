/**
 * Engineering projects.
 *
 * Content is limited to what is verifiable from the resume and project notes —
 * no additional integrations or capabilities are invented.
 *
 * Every project renders as a full case study in the Projects section.
 */

export interface ProjectStackItem {
  name: string;
  icon:
    | "python"
    | "kubernetes"
    | "karpenter"
    | "fastapi"
    | "slack"
    | "docker";
}

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  capabilities: string[];
  /**
   * Design decisions and what they cost — the "why" behind the build.
   * Only include trade-offs that are verifiable from the project notes/README.
   */
  tradeoffs?: string[];
  impact: {
    headline: string;
    description: string;
    /** Optional animated metric rendered as the headline number. */
    metric?: {
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
    };
    /** Short callout shown beneath the result. */
    detail?: string;
  };
  stack: ProjectStackItem[];
  architecture: {
    id: string;
    label: string;
    detail: string;
  }[];
  repository: {
    href: string;
    label: string;
    /** Set to false until a public repository URL is available. */
    live: boolean;
  };
}

export const projects: Project[] = [
  {
    id: "alert-enrichment",
    name: "Alert Enrichment Service for Alertmanager",
    category: "SRE Tooling / Alerting",
    year: "2026",
    tagline:
      "A FastAPI webhook that turns a raw Alertmanager page into one Slack message with pod state, previous-container logs and a silence link, delivered inside a 4-second enrichment budget.",
    problem:
      "A PodCrashLooping webhook gives you a pod name and a runbook link. The reason is scattered across the cluster: restart counts, rollout state, previous-container logs, node pressure and warning events. The first five minutes of every incident go into gathering context, and duplicate alerts about the same broken pod make the noise worse.",
    solution:
      "Built a Python (FastAPI) service that receives Alertmanager v4 payloads, reserves a per-incident dedup key before enriching, reads pod state, owner, rollout, previous-container logs and warning events from the Kubernetes API inside a 4-second budget, then publishes a single Slack Block Kit message. Partial context is always sent rather than dropping an alert, and the service ships with a Helm chart, read-only RBAC and a Redis-backed dedup mode.",
    capabilities: [
      "Previous-container log capture",
      "Pod status, restarts, node and owner",
      "Rollout state and warning events",
      "Duplicate suppression (memory + Redis Lua)",
      "Per-alert runbook and silence links",
      "Helm chart, read-only RBAC, CI",
    ],
    tradeoffs: [
      "Dedup is reserved before enrichment, not after. A failed enrichment can therefore suppress a retry, but a flapping pod cannot produce a second Slack message.",
      "Enrichment runs on a 4-second budget with a 1.5s hard timeout per Kubernetes call. Partial context is always sent — a complete message that arrives late is worse than a partial one that arrives while someone is still reading the alert.",
      "In-memory dedup is the default; Redis with an atomic Lua reservation is opt-in for multi-replica deployments, where two pods could otherwise claim the same incident key.",
    ],
    impact: {
      headline: "×3 alerts → one message",
      description:
        "Merges duplicate alerts into a single actionable Slack message, with 75 passing tests and 91.34% branch coverage behind it.",
      metric: {
        value: 3,
        prefix: "×",
        label: "alerts merged into one message",
      },
    },
    stack: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Kubernetes API", icon: "kubernetes" },
      { name: "Slack API", icon: "slack" },
      { name: "Docker", icon: "docker" },
    ],
    architecture: [
      {
        id: "alertmanager",
        label: "Alertmanager",
        detail: "Fires v4 alert payloads to the webhook",
      },
      {
        id: "webhook",
        label: "FastAPI Webhook",
        detail: "Parses and groups alerts by incident key",
      },
      {
        id: "dedupe",
        label: "Dedup Reservation",
        detail: "Memory or Redis Lua, reserved before enrich",
      },
      {
        id: "enrich",
        label: "Kubernetes Enrichment",
        detail: "Pod, owner, rollout, previous logs, events",
      },
      {
        id: "slack",
        label: "Slack Block Kit",
        detail: "One escaped message with action buttons",
      },
    ],
    repository: {
      href: "https://github.com/neha1301/alertbrief",
      label: "View on GitHub",
      live: true,
    },
  },
  {
    id: "k8s-node-insight",
    name: "Kubernetes Node Insight Tool",
    category: "Platform Engineering / SRE Tooling",
    year: "2025",
    tagline:
      "One read-only command that turns scattered node signals into a ranked root cause.",
    problem:
      "A node can stay Ready after a kernel-level OOM, so the worst failures never trip an alert. The evidence sits in kubelet events, node conditions, capacity and workload state, while standard dashboards watch pod metrics rather than node internals. Triage means running five commands and still guessing whether the fault is the node or the app.",
    solution:
      "Built a single-file, read-only Python CLI that correlates node conditions, kubelet OOM events, capacity and workload state in one pass, then ranks the most likely root cause by severity. It diagnoses NotReady nodes and Ready-but-degraded ones, where the damage is invisible to a status check.",
    capabilities: [
      "SystemOOM detection from kubelet events",
      "Pod-level OOMKill correlation",
      "Memory, disk and PID pressure checks",
      "Ready-but-degraded node diagnosis",
      "Priority-ranked root cause summary",
      "Karpenter-aware capacity overview",
    ],
    impact: {
      headline: "~70% less debugging time",
      description:
        "Cut node-level triage from a multi-command investigation to a single pass, reducing debugging time by approximately 70%.",
      metric: {
        value: 70,
        suffix: "%",
        label: "less debugging time",
      },
      detail: "Root cause identified in one run instead of five commands.",
    },
    stack: [
      { name: "Python", icon: "python" },
      { name: "Kubernetes API", icon: "kubernetes" },
      { name: "Kubelet events", icon: "kubernetes" },
      { name: "Karpenter", icon: "karpenter" },
    ],
    architecture: [
      {
        id: "cluster",
        label: "Kubernetes Cluster",
        detail: "Nodes, pods, kubelet events and workload state",
      },
      {
        id: "api",
        label: "Kubernetes API",
        detail: "Read-only access to node conditions and events",
      },
      {
        id: "collector",
        label: "Python Collector",
        detail: "Single file, no agent, no cluster changes",
      },
      {
        id: "correlate",
        label: "Signal Correlation",
        detail: "OOM, pressure and capacity scored by severity",
      },
      {
        id: "verdict",
        label: "Root Cause Summary",
        detail: "Ranked cause plus the pods it affects",
      },
    ],
    repository: {
      href: "https://github.com/neha1301/Kubernetes-Node-Insight-Tool",
      label: "View on GitHub",
      live: true,
    },
  },
];

/** The project highlighted first in the Projects section. */
export const featuredProject: Project = projects[0];
