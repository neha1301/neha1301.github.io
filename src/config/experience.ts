/**
 * Professional experience — ownership and impact focused.
 * Source: resume (BharatPe, Gurugram · Devtron, Gurugram).
 * Metrics are limited to figures already verified in the resume.
 */

export interface ExperienceRole {
  id: string;
  company: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: ExperienceRole[] = [
  {
    id: "bharatpe-sre",
    company: "BharatPe",
    title: "DevOps Engineer II (SDE-2)",
    period: "September 2026 – Present",
    startDate: "Sep 2026",
    endDate: null,
    location: "Gurugram, Haryana, India",
    current: true,
    summary:
      "Own infrastructure and observability for two business verticals: alerting, cross-cluster dashboards, and the move off paid monitoring.",
    highlights: [
      "Centralizing alerting across 5–10 services — one service alone emits 300–400 alerts — by reviewing each use case and rewriting rules instead of forwarding raw noise.",
      "Built ~10 centralized Grafana dashboards that aggregate data from 15+ clusters into one view for on-call engineers and service owners.",
      "Leading the migration of logging and dashboards from paid enterprise tooling to open-source Grafana, Prometheus and Loki, cutting licence dependency.",
      "Own end-to-end monitoring and observability across two business verticals: alert rules, dashboards, troubleshooting and incident investigation.",
    ],
    stack: [
      "Kubernetes",
      "AWS",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Loki",
      "Tempo",
    ],
  },
  {
    id: "devtron-sre",
    company: "Devtron",
    title: "DevOps Engineer",
    period: "May 2024 – August 2026",
    startDate: "May 2024",
    endDate: "Aug 2026",
    location: "Gurugram, Haryana, India",
    current: false,
    summary:
      "Owned production Kubernetes platforms across 30+ environments: upgrades, infrastructure as code, observability and incident response.",
    highlights: [
      "Executed Kubernetes cluster upgrades across 30+ production environments with zero downtime, maintaining platform reliability and security compliance.",
      "Built a Python onboarding automation pipeline for Devtron applications, removing manual provisioning and cutting onboarding time by 60%.",
      "Developed a Kubernetes Validating Admission Policy on the native v1.32 API, standardizing deployment validation across production clusters — policy-as-code that rejects bad deploys before they land.",
      "Designed reusable infrastructure with Terraform, provisioning VPCs, IAM, networking and cluster add-ons for EKS and Kubernetes environments; maintained 10+ Helm charts for repeatable delivery.",
      "Built observability with Prometheus, Grafana and Pyroscope for SLO-driven monitoring and faster production incident detection.",
      "Replaced static node provisioning with Karpenter, improving workload scheduling efficiency and lowering infrastructure costs.",
      "Resolved customer-facing Kubernetes and infrastructure incidents through debugging and root cause analysis, with 95% of incidents resolved without escalation.",
    ],
    stack: [
      "Kubernetes",
      "EKS",
      "AWS",
      "GCP",
      "Terraform",
      "Policy-as-Code",
      "Helm",
      "Karpenter",
      "Prometheus",
      "Grafana",
      "Pyroscope",
      "Python",
    ],
  },
  {
    id: "devtron-intern",
    company: "Devtron",
    title: "DevOps Engineering Intern",
    period: "January 2024 – May 2024",
    startDate: "Jan 2024",
    endDate: "May 2024",
    location: "Gurugram, Haryana, India",
    current: false,
    summary:
      "Shipped release-validation automation for a multi-microservice platform and moved from reactive firefighting to preventive monitoring rules.",
    highlights: [
      "Developed a Bash-based post-release validation framework that automated sanity checks and delivered real-time deployment notifications across microservices.",
      "Performed production incident investigation and root cause analysis for Kubernetes-based applications, introducing preventive monitoring rules that reduced recurring failures.",
    ],
    stack: ["Bash", "Kubernetes", "Monitoring", "Release Automation"],
  },
];
