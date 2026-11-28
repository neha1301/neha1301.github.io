/**
 * Professional experience — grouped by company, ownership and impact focused.
 * Source: resume (BharatPe, Gurugram · Devtron, Gurugram).
 * Metrics are limited to figures already verified in the resume.
 */

export interface ExperienceContribution {
  label: string;
  description: string;
}

export interface ExperienceCompany {
  id: string;
  company: string;
  designation: string;
  period: string;
  current: boolean;
  location: string;
  logo: string;
  summary: string;
  contributions: ExperienceContribution[];
  stack: string[];
}

export const experience: ExperienceCompany[] = [
  {
    id: "bharatpe",
    company: "BharatPe",
    designation: "DevOps Engineer II (SDE-2)",
    period: "September 2026 – Present",
    current: true,
    location: "Gurugram, Haryana, India",
    logo: "/logos/bharatpe.png",
    summary:
      "Own observability and reliability for two business verticals, with a focus on alert quality and shared monitoring.",
    contributions: [
      {
        label: "Alert quality",
        description:
          "Rewrote alert rules for 5–10 services — one emits 300–400 alerts — instead of forwarding raw noise.",
      },
      {
        label: "Shared observability",
        description:
          "Built ~10 Grafana dashboards aggregating 15+ clusters into one view for on-call engineers and service owners.",
      },
      {
        label: "Open-source migration",
        description:
          "Moved logging and dashboards from paid tooling to Grafana, Prometheus and Loki, removing licence dependency while owning end-to-end observability.",
      },
    ],
    stack: ["Kubernetes", "AWS", "Prometheus", "Grafana", "Loki"],
  },
  {
    id: "devtron",
    company: "Devtron",
    designation: "DevOps Engineer · Intern to Full-time",
    period: "January 2024 – August 2026",
    current: false,
    location: "Gurugram, Haryana, India",
    logo: "/logos/devtron.png",
    summary:
      "Owned production Kubernetes platforms end to end — infrastructure as code, upgrades, observability and incident response across AWS and GCP.",
    contributions: [
      {
        label: "Platform Reliability",
        description:
          "Upgraded Kubernetes across 30+ production environments with zero downtime; debugging and RCA resolved 95% of incidents without escalation, and early preventive monitoring rules reduced recurring failures.",
      },
      {
        label: "Infrastructure & Automation",
        description:
          "Python onboarding automation cut application onboarding time by 60%; Terraform modules and 10+ Helm charts made EKS delivery repeatable, while a Bash release-validation framework added sanity checks and deployment notifications.",
      },
      {
        label: "Security & Governance",
        description:
          "Kubernetes v1.32 Validating Admission Policy rejected bad deploys before rollout, standardizing deployment validation across production clusters as policy-as-code.",
      },
      {
        label: "Observability & Optimization",
        description:
          "Prometheus, Grafana and Pyroscope added SLO-driven detection; Karpenter replaced static node provisioning to improve scheduling efficiency and lower infrastructure costs.",
      },
    ],
    stack: [
      "Kubernetes",
      "EKS",
      "Terraform",
      "Helm",
      "Python",
      "Prometheus",
      "Karpenter",
    ],
  },
];
