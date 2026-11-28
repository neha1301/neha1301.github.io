/**
 * Selected engineering work — concise card summaries with full depth on
 * dedicated case study pages.
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
  slug: string;
  category: string;
  title: string;
  problem: string;
  technologies: string[];
  metrics?: { value: string; label: string }[];
  challenge: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  architecture: CaseStudyNode[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "unified-observability",
    slug: "unified-observability",
    category: "Observability",
    title: "One operational view, on an owned stack.",
    problem:
      "Alert storms and vendor-led dashboards made cross-cluster failures hard to see and expensive to investigate.",
    technologies: ["Grafana", "Prometheus", "Loki", "Kubernetes"],
    metrics: [
      { value: "5–10", label: "services in scope" },
      { value: "300–400", label: "alerts from one service" },
      { value: "~10", label: "dashboards · 15+ clusters" },
    ],
    challenge:
      "One service emitted 300–400 alerts, and forwarding that volume would have moved noise rather than removed it. Logging and dashboards also sat behind paid enterprise tooling, while cluster-scoped views made system-wide failures hard to see.",
    decision:
      "Reviewed each alert use case and rewrote the rules instead of passing raw alerts through. Standardized on Grafana dashboards aggregating Prometheus data across 15+ clusters, and moved logs to Loki so metrics, alerts and dashboards live in one owned stack.",
    tradeoff:
      "Rewriting rules takes longer than adding a routing rule, and an in-house stack means collection, retention and dashboard maintenance become platform responsibilities instead of vendor defaults. The result removes the cause of noise rather than hiding it downstream.",
    outcome:
      "On-call engineers and service owners work from the same cross-cluster view, with licence dependency removed and one open-source stack for metrics, logs and dashboards.",
    architecture: [
      {
        id: "services",
        label: "Services",
        detail: "5–10 services with rules and metrics",
        icon: "kubernetes",
      },
      {
        id: "rules",
        label: "Rule review",
        detail: "Each use case reviewed, then rewritten",
        icon: "prometheus",
      },
      {
        id: "collect",
        label: "Prometheus + Loki",
        detail: "Metrics, alert rules and logs",
        icon: "loki",
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
    id: "cloud-migration",
    slug: "cloud-migration",
    category: "Cloud migration",
    title: "AWS-to-GCP cloud migration.",
    problem:
      "Moving production Kubernetes workloads across clouds without losing repeatable delivery, validation or shared observability.",
    technologies: ["Kubernetes", "EKS → GKE", "Terraform", "Helm", "GitOps"],
    challenge:
      "Workloads, networking and delivery definitions had to move between AWS and GCP while services stayed usable and deployments stayed reviewable.",
    decision:
      "Defined target infrastructure with Terraform, kept workloads packaged in Helm charts, and used GitOps-driven delivery so the same review and validation steps applied on both clouds.",
    tradeoff:
      "A code-defined migration needs more upfront work on modules and chart parameters, but it avoids one-off console changes that are hard to reproduce or audit.",
    outcome:
      "Repeatable delivery and validation carried across the migration, with the platform team keeping the same operational model on GCP.",
    architecture: [
      {
        id: "source",
        label: "AWS / EKS",
        detail: "Existing workloads and platform definitions",
        icon: "aws",
      },
      {
        id: "modules",
        label: "Terraform",
        detail: "Target infrastructure defined as code",
        icon: "terraform",
      },
      {
        id: "delivery",
        label: "Helm + GitOps",
        detail: "Repeatable packaging and reviewed rollout",
        icon: "gitops",
      },
      {
        id: "target",
        label: "GCP / GKE",
        detail: "Migrated workloads on the new cloud",
        icon: "gke",
      },
      {
        id: "verify",
        label: "Validation",
        detail: "Deployment checks and shared observability",
        icon: "sre",
      },
    ],
  },
];
