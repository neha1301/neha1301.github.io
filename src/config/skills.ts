/**
 * Technical expertise, grouped by engineering domain.
 *
 * `icon` keys map to brand marks in `src/components/ui/TechIcon.tsx`.
 * Where no official mark exists, a neutral lucide glyph is used instead.
 */

export type SkillIconKey =
  | "aws"
  | "gcp"
  | "vpc"
  | "iam"
  | "ec2"
  | "s3"
  | "alb"
  | "route53"
  | "cloudflare"
  | "kubernetes"
  | "eks"
  | "gke"
  | "docker"
  | "helm"
  | "karpenter"
  | "keda"
  | "hpa"
  | "gatewayapi"
  | "rbac"
  | "terraform"
  | "argocd"
  | "argorollouts"
  | "gitops"
  | "ghactions"
  | "jenkins"
  | "sre"
  | "prometheus"
  | "grafana"
  | "alertmanager"
  | "loki"
  | "tempo"
  | "opentelemetry"
  | "victoriametrics"
  | "pyroscope"
  | "elk"
  | "coralogix"
  | "slos"
  | "incident"
  | "rca"
  | "monitoring"
  | "python"
  | "bash"
  | "linux"
  | "fastapi"
  | "java"
  | "sql"
  | "postgres"
  | "mysql"
  | "slack";

export interface SkillItem {
  name: string;
  icon: SkillIconKey;
}

export type SkillDomain =
  | "cloud"
  | "kubernetes"
  | "iac"
  | "observability"
  | "programming";

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
    id: "cloud",
    title: "Cloud & Infrastructure",
    marker: "cloud",
    blurb: "AWS and GCP primitives.",
    items: [
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
      { name: "VPC", icon: "vpc" },
      { name: "IAM", icon: "iam" },
      { name: "EC2", icon: "ec2" },
      { name: "S3", icon: "s3" },
      { name: "ALB/NLB", icon: "alb" },
      { name: "Route 53", icon: "route53" },
      { name: "Cloudflare", icon: "cloudflare" },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes & Platform Engineering",
    marker: "kubernetes",
    blurb: "Cluster platforms and delivery.",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "EKS", icon: "eks" },
      { name: "GKE", icon: "gke" },
      { name: "Docker", icon: "docker" },
      { name: "Helm", icon: "helm" },
      { name: "Karpenter", icon: "karpenter" },
      { name: "KEDA", icon: "keda" },
      { name: "HPA", icon: "hpa" },
      { name: "Gateway API", icon: "gatewayapi" },
      { name: "RBAC", icon: "rbac" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code & CI/CD",
    marker: "iac",
    blurb: "Provisioning, delivery and policy.",
    items: [
      { name: "Terraform", icon: "terraform" },
      { name: "ArgoCD", icon: "argocd" },
      { name: "Argo Rollouts", icon: "argorollouts" },
      { name: "GitOps", icon: "gitops" },
      { name: "GitHub Actions", icon: "ghactions" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Policy-as-Code", icon: "sre" },
    ],
  },
  {
    id: "observability",
    title: "Observability & SRE",
    marker: "observability",
    blurb: "Signals, reliability and investigation.",
    items: [
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Alertmanager", icon: "alertmanager" },
      { name: "Loki", icon: "loki" },
      { name: "Tempo", icon: "tempo" },
      { name: "OpenTelemetry", icon: "opentelemetry" },
      { name: "VictoriaMetrics", icon: "victoriametrics" },
      { name: "Pyroscope", icon: "pyroscope" },
      { name: "ELK Stack", icon: "elk" },
      { name: "Coralogix", icon: "coralogix" },
      { name: "SLO/SLI", icon: "slos" },
      { name: "Incident Response", icon: "incident" },
      { name: "Root Cause Analysis", icon: "rca" },
    ],
  },
  {
    id: "programming",
    title: "Programming & Systems",
    marker: "programming",
    blurb: "Automation, services and data stores.",
    items: [
      { name: "Python", icon: "python" },
      { name: "Bash", icon: "bash" },
      { name: "Linux", icon: "linux" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Java", icon: "java" },
      { name: "SQL", icon: "sql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
];
