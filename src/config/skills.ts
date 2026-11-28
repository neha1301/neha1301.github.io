/**
 * Technical expertise, grouped by engineering domain.
 * Only tools that matter to the roles this portfolio targets are listed.
 */

export type SkillIconKey =
  | "aws"
  | "gcp"
  | "eks"
  | "gke"
  | "lambda"
  | "apigateway"
  | "cloudflare"
  | "kubernetes"
  | "docker"
  | "helm"
  | "terraform"
  | "karpenter"
  | "prometheus"
  | "grafana"
  | "opentelemetry"
  | "pyroscope"
  | "loki"
  | "tempo"
  | "coralogix"
  | "elk"
  | "sre"
  | "slos"
  | "incident"
  | "rca"
  | "mttr"
  | "fault"
  | "monitoring"
  | "argocd"
  | "ghactions"
  | "jenkins"
  | "gitops"
  | "python"
  | "bash"
  | "java"
  | "fastapi"
  | "slack"
  | "postgres"
  | "mysql"
  | "sql"
  | "ai"
  | "llm"
  | "prompt"
  | "aidebug";

export interface SkillItem {
  name: string;
  icon: SkillIconKey;
}

export type SkillDomain = "platform" | "automation" | "observability";

export interface SkillGroup {
  id: SkillDomain;
  title: string;
  marker: SkillDomain;
  blurb: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "platform",
    title: "Cloud & Platform",
    marker: "platform",
    blurb: "Kubernetes platforms on AWS and GCP.",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "EKS", icon: "eks" },
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
      { name: "Helm", icon: "helm" },
      { name: "ArgoCD", icon: "argocd" },
      { name: "Karpenter", icon: "karpenter" },
    ],
  },
  {
    id: "automation",
    title: "Infrastructure as Code",
    marker: "automation",
    blurb: "Environments, delivery and validation from code.",
    items: [
      { name: "Terraform", icon: "terraform" },
      { name: "Policy-as-Code", icon: "sre" },
      { name: "Python", icon: "python" },
      { name: "Bash", icon: "bash" },
      { name: "GitHub Actions", icon: "ghactions" },
      { name: "FastAPI", icon: "fastapi" },
    ],
  },
  {
    id: "observability",
    title: "Observability & SRE",
    marker: "observability",
    blurb: "Signals, incident response and reliability practice.",
    items: [
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Loki", icon: "loki" },
      { name: "OpenTelemetry", icon: "opentelemetry" },
      { name: "Pyroscope", icon: "pyroscope" },
      { name: "SLO / SLI", icon: "slos" },
      { name: "Incident response", icon: "incident" },
      { name: "Root cause analysis", icon: "rca" },
    ],
  },
];
