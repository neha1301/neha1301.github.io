/**
 * Professional experience — grouped by company, ownership and impact focused.
 * Source: resume (BharatPe, Gurugram · Devtron, Gurugram).
 * Metrics are limited to figures already verified in the resume.
 */

export interface ExperienceContribution {
  label: string;
  description: string;
}

export interface ExperienceRole {
  id: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  summary?: string;
  contributions: ExperienceContribution[];
  stack: string[];
}

export interface ExperienceCompany {
  id: string;
  company: string;
  location: string;
  logo: string;
  roles: ExperienceRole[];
}

export const experience: ExperienceCompany[] = [
  {
    id: "bharatpe",
    company: "BharatPe",
    location: "Gurugram, Haryana, India",
    logo: "/logos/bharatpe.png",
    roles: [
      {
        id: "bharatpe-sre",
        title: "DevOps Engineer II (SDE-2)",
        period: "September 2026 – Present",
        startDate: "Sep 2026",
        endDate: null,
        current: true,
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
    ],
  },
  {
    id: "devtron",
    company: "Devtron",
    location: "Gurugram, Haryana, India",
    logo: "/logos/devtron.png",
    roles: [
      {
        id: "devtron-sre",
        title: "DevOps Engineer",
        period: "May 2024 – August 2026",
        startDate: "May 2024",
        endDate: "Aug 2026",
        current: false,
        summary:
          "Owned production Kubernetes platforms end to end — infrastructure as code, upgrades, observability and incident response across AWS and GCP.",
        contributions: [
          {
            label: "Zero-downtime upgrades",
            description:
              "Upgraded Kubernetes across 30+ production environments on AWS and GCP; 95% of incidents resolved without escalation through debugging and RCA.",
          },
          {
            label: "Faster onboarding",
            description:
              "Python automation cut application onboarding time by 60%; Terraform modules and 10+ Helm charts made EKS delivery repeatable.",
          },
          {
            label: "Deployment guardrails",
            description:
              "Kubernetes v1.32 Validating Admission Policy rejected bad deploys before rollout; Prometheus, Grafana and Pyroscope added SLO-driven detection, and Karpenter improved scheduling efficiency.",
          },
        ],
        stack: ["Kubernetes", "Terraform", "Helm", "Python", "Grafana"],
      },
      {
        id: "devtron-intern",
        title: "DevOps Engineering Intern",
        period: "January 2024 – May 2024",
        startDate: "Jan 2024",
        endDate: "May 2024",
        current: false,
        contributions: [
          {
            label: "Release validation",
            description:
              "Bash framework added automated sanity checks and real-time deployment notifications across microservices.",
          },
          {
            label: "Preventive monitoring",
            description:
              "Investigated Kubernetes incidents and introduced rules that reduced recurring failures.",
          },
        ],
        stack: ["Bash", "Kubernetes", "Release Automation"],
      },
    ],
  },
];
