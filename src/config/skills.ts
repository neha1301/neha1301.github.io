/**
 * Technical expertise, grouped by engineering domain.
 *
 * `icon` keys map to brand marks in `src/components/ui/TechIcon.tsx`.
 * Where no official mark exists (Karpenter, Pyroscope, Loki, Tempo, SRE
 * concepts), a lucide glyph is used instead.
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

export type SkillDomain = "platform" | "automation" | "observability" | "data";

export interface SkillGroup {
  id: SkillDomain;
  title: string;
  /** lucide icon name rendered as the group marker */
  marker: SkillDomain;
  blurb: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "platform",
    title: "Cloud & Platform Engineering",
    marker: "platform",
    blurb: "Kubernetes platforms across AWS and GCP.",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "EKS", icon: "eks" },
      { name: "GKE", icon: "gke" },
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
      { name: "Helm", icon: "helm" },
      { name: "Karpenter", icon: "karpenter" },
      { name: "Docker", icon: "docker" },
      { name: "ArgoCD", icon: "argocd" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "AWS API Gateway", icon: "apigateway" },
      { name: "Lambda", icon: "lambda" },
      { name: "Compute Engine", icon: "gcp" },
      { name: "Cloud Storage", icon: "gcp" },
    ],
  },
  {
    id: "automation",
    title: "Infrastructure as Code & Automation",
    marker: "automation",
    blurb: "Environments, delivery and validation from code.",
    items: [
      { name: "Terraform", icon: "terraform" },
      { name: "Policy-as-Code", icon: "sre" },
      { name: "Kubernetes API", icon: "kubernetes" },
      { name: "Python", icon: "python" },
      { name: "Bash", icon: "bash" },
      { name: "GitHub Actions", icon: "ghactions" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "GitOps", icon: "gitops" },
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
      { name: "Tempo", icon: "tempo" },
      { name: "OpenTelemetry", icon: "opentelemetry" },
      { name: "Pyroscope", icon: "pyroscope" },
      { name: "ELK Stack", icon: "elk" },
      { name: "Coralogix", icon: "coralogix" },
      { name: "Production Monitoring", icon: "monitoring" },
      { name: "Incident Management", icon: "incident" },
      { name: "Root Cause Analysis", icon: "rca" },
      { name: "SLO / SLI", icon: "slos" },
      { name: "MTTR Reduction", icon: "mttr" },
    ],
  },
  {
    id: "data",
    title: "Languages & Data",
    marker: "data",
    blurb: "Supporting languages and stores.",
    items: [
      { name: "Java", icon: "java" },
      { name: "SQL", icon: "sql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
];
