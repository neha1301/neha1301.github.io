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
    | "llm"
    | "ai"
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
    id: "ai-k8s-debugger",
    name: "AI-Powered Kubernetes Infrastructure Debugging Tool",
    category: "AI Engineering / Platform Engineering",
    year: "2025",
    tagline:
      "An LLM-assisted diagnostic engine that turns raw cluster signals into an actionable root cause.",
    problem:
      "Diagnosing Kubernetes production incidents can require engineers to inspect multiple cluster signals, events, and workload states manually. The context needed for a correct root cause is scattered across nodes, pods, events, and pressure conditions. Triage stays slow and inconsistent.",
    solution:
      "Built an AI-powered debugging tool that analyzes Kubernetes infrastructure signals and uses LLM-based reasoning to assist with root cause analysis, turning raw cluster evidence into a clear explanation of what failed and why.",
    capabilities: [
      "OOMKilled event analysis",
      "MemoryPressure detection",
      "DiskPressure detection",
      "Evicted pod analysis",
      "LLM-powered root cause analysis",
      "Automated infrastructure troubleshooting assistance",
    ],
    impact: {
      headline: "~70% less debugging time",
      description:
        "Reduced debugging time by approximately 70%, helping identify infrastructure issues within minutes.",
      metric: {
        value: 70,
        suffix: "%",
        label: "less debugging time",
      },
      detail: "Identifying infrastructure issues within minutes.",
    },
    stack: [
      { name: "Python", icon: "python" },
      { name: "Kubernetes API", icon: "kubernetes" },
      { name: "LLMs", icon: "llm" },
      { name: "Generative AI", icon: "ai" },
    ],
    architecture: [
      {
        id: "cluster",
        label: "Kubernetes Cluster",
        detail: "Nodes, pods, events and workload state",
      },
      {
        id: "api",
        label: "Kubernetes API",
        detail: "Programmatic access to cluster objects",
      },
      {
        id: "engine",
        label: "Python Diagnostic Engine",
        detail: "Collects and normalises cluster signals",
      },
      {
        id: "llm",
        label: "LLM Analysis",
        detail: "Reasoning over the collected evidence",
      },
      {
        id: "insights",
        label: "Root Cause Insights",
        detail: "Actionable cause and troubleshooting steps",
      },
    ],
    repository: {
      href: "https://github.com/neha130",
      label: "More on GitHub",
      live: false,
    },
  },
];

/** The project highlighted first in the Projects section. */
export const featuredProject: Project = projects[0];
