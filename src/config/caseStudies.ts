/**
 * Engineering case studies drawn from production work.
 *
 * These describe verified scope and decisions from the resume — no new
 * numbers, links or capabilities are introduced.
 */

import type { SkillIconKey } from "./skills";

export interface CaseStudyNode {
  id: string;
  label: string;
  detail: string;
  icon: SkillIconKey;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  architecture: CaseStudyNode[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "centralized-observability",
    category: "Centralized observability",
    title: "From alert storms to one operational view.",
    summary:
      "Rewriting alert rules across 5–10 services and aggregating 15+ clusters into dashboards people actually open.",
    metrics: [
      { value: "5–10", label: "services in scope" },
      { value: "300–400", label: "alerts from one service" },
      { value: "~10", label: "dashboards · 15+ clusters" },
    ],
    challenge:
      "One service alone emitted 300–400 alerts. Forwarding that volume would have moved noise rather than removed it, and cluster-scoped views made system-wide failures hard to see.",
    decision:
      "Reviewed each alert use case and rewrote the rules instead of passing raw alerts through. Standardized on Grafana dashboards that aggregate Prometheus data across 15+ clusters into a single view.",
    tradeoff:
      "Rewriting rules takes longer than a routing rule, but it removes the cause of the noise instead of hiding it downstream.",
    outcome:
      "On-call engineers and service owners work from the same cross-cluster view instead of hunting cluster by cluster.",
    architecture: [
      {
        id: "services",
        label: "Services",
        detail: "5–10 services with alert rules and metrics",
        icon: "kubernetes",
      },
      {
        id: "rules",
        label: "Rule review",
        detail: "Each use case reviewed, then rewritten",
        icon: "prometheus",
      },
      {
        id: "dashboards",
        label: "Grafana",
        detail: "~10 dashboards over 15+ clusters",
        icon: "grafana",
      },
      {
        id: "owners",
        label: "On-call & owners",
        detail: "One shared operational view",
        icon: "sre",
      },
    ],
  },
  {
    id: "observability-migration",
    category: "Observability migration",
    title: "Off paid tooling, onto an owned stack.",
    summary:
      "Moving logging and dashboards from paid enterprise tooling to Grafana, Prometheus and Loki.",
    metrics: [
      { value: "Grafana", label: "visualization" },
      { value: "Prometheus", label: "metrics & alerts" },
      { value: "Loki", label: "logs" },
    ],
    challenge:
      "Paid tooling put logging and dashboards behind vendor licences while teams needed a consistent view across clusters.",
    decision:
      "Adopted Grafana for visualization, Prometheus for metrics and alerting, and Loki for logs — keeping collection and dashboard definitions inside the platform.",
    tradeoff:
      "Operational ownership moves in-house: collection, retention and dashboard maintenance become platform responsibilities instead of vendor defaults.",
    outcome:
      "Licence dependency is cut, with one open-source stack for metrics, logs and dashboards.",
    architecture: [
      {
        id: "workloads",
        label: "Workloads",
        detail: "Applications across clusters and verticals",
        icon: "kubernetes",
      },
      {
        id: "collect",
        label: "Prometheus + Loki",
        detail: "Metrics, alert rules and logs",
        icon: "loki",
      },
      {
        id: "visualize",
        label: "Grafana",
        detail: "Dashboards and alert investigation",
        icon: "grafana",
      },
      {
        id: "team",
        label: "Platform team",
        detail: "Owns rules, retention and dashboards",
        icon: "sre",
      },
    ],
  },
  {
    id: "incident-management",
    category: "Incident management",
    title: "Close the incident. Remove the cause.",
    summary:
      "Customer-facing Kubernetes investigations where the fix is a root cause, not a restart.",
    metrics: [
      { value: "95%", label: "resolved without escalation" },
      { value: "RCA", label: "before workaround" },
      { value: "Preventive", label: "rules after the fix" },
    ],
    challenge:
      "Customer-facing Kubernetes failures had to be diagnosed from live cluster state while services were still in use.",
    decision:
      "Combined production debugging and root cause analysis with the single-pass node diagnostic, then fed repeat failures into monitoring rules and deployment validation.",
    tradeoff:
      "A permanent fix can take longer than a restart; the extra work goes into the rule, chart or dashboard that prevents the next page.",
    outcome:
      "95% of incidents resolved without escalation, with findings fed back into monitoring and validation.",
    architecture: [
      {
        id: "signal",
        label: "Signal / page",
        detail: "Alert or customer-facing symptom",
        icon: "incident",
      },
      {
        id: "triage",
        label: "Triage + RCA",
        detail: "Live cluster state and node signals",
        icon: "rca",
      },
      {
        id: "fix",
        label: "Fix + validation",
        detail: "Root cause corrected, deploy validated",
        icon: "sre",
      },
      {
        id: "prevent",
        label: "Preventive rule",
        detail: "Monitoring rule or policy updated",
        icon: "monitoring",
      },
    ],
  },
];
