/**
 * Technical expertise, grouped by depth rather than by category.
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

export interface SkillGroup {
  id: string;
  title: string;
  /** lucide icon name rendered as the group marker */
  marker: "daily" | "working" | "familiar";
  blurb: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "daily",
    title: "Daily use",
    marker: "daily",
    blurb: "Every week, in production.",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Helm", icon: "helm" },
      { name: "Terraform", icon: "terraform" },
      { name: "AWS", icon: "aws" },
      { name: "AWS API Gateway", icon: "apigateway" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Python", icon: "python" },
      { name: "Bash", icon: "bash" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Loki", icon: "loki" },
      { name: "GitHub Actions", icon: "ghactions" },
      { name: "ArgoCD", icon: "argocd" },
      { name: "Incident Management", icon: "incident" },
      { name: "Production Monitoring", icon: "monitoring" },
    ],
  },
  {
    id: "working",
    title: "Working knowledge",
    marker: "working",
    blurb: "Used on real projects.",
    items: [
      { name: "GCP", icon: "gcp" },
      { name: "EKS", icon: "eks" },
      { name: "GKE", icon: "gke" },
      { name: "Docker", icon: "docker" },
      { name: "Karpenter", icon: "karpenter" },
      { name: "OpenTelemetry", icon: "opentelemetry" },
      { name: "Tempo", icon: "tempo" },
      { name: "ELK Stack", icon: "elk" },
      { name: "Coralogix", icon: "coralogix" },
      { name: "Pyroscope", icon: "pyroscope" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Kubernetes API", icon: "kubernetes" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "SLO / SLI", icon: "slos" },
      { name: "Root Cause Analysis", icon: "rca" },
      { name: "MTTR Reduction", icon: "mttr" },
    ],
  },
  {
    id: "familiar",
    title: "Familiar",
    marker: "familiar",
    blurb: "Fundamentals, not daily drivers.",
    items: [
      { name: "Java", icon: "java" },
      { name: "MySQL", icon: "mysql" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Lambda", icon: "lambda" },
      { name: "Compute Engine", icon: "gcp" },
      { name: "Cloud Storage", icon: "gcp" },
    ],
  },
];
