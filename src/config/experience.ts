/**
 * Professional experience — ownership and impact focused.
 * Source: resume (BharatPe, Gurugram · Devtron, Gurugram).
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
      "Own infrastructure and applications for two business verticals, and set the reliability direction: centralizing alerting across 5–10 services, building cross-cluster dashboards, and moving off paid monitoring.",
    highlights: [
      "Centralizing alerting across 5–10 services — a single service alone emits 300–400 alerts — by reviewing each use case and rewriting the rules instead of forwarding raw noise.",
      "Built ~10 centralized Grafana dashboards that aggregate data from 15+ clusters into a single view for on-call and service owners.",
      "Leading the migration of logging and dashboards off paid enterprise tooling onto open-source Grafana, Prometheus and Loki, cutting licence dependency.",
      "Own end-to-end monitoring and observability for BharatPe applications: alert rules, dashboards, troubleshooting and incident investigation across two business verticals.",
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
      "Owned production Kubernetes platforms end to end: observability, upgrades, incident response, and the automation that keeps 30+ environments healthy.",
    highlights: [
      "Engineered a Python-based onboarding automation pipeline for Devtron applications, eliminating manual provisioning and reducing onboarding time by 60% across multiple production environments.",
      "Maintained and enhanced 10+ Helm charts while developing a Kubernetes Validating Admission Policy on the native v1.32 API, standardizing deployment validation across production clusters.",
      "Built and maintained an observability platform using Prometheus, Grafana, and Pyroscope, enabling SLO-driven monitoring and faster production incident detection.",
      "Resolved customer-facing Kubernetes and infrastructure incidents through production debugging and root cause analysis, with 95% of incidents resolved without escalation.",
      "Executed Kubernetes cluster upgrades across 30+ production environments with zero downtime, ensuring platform reliability and security compliance.",
      "Replaced static node provisioning with Karpenter, improving workload scheduling efficiency and lowering infrastructure costs.",
      "Designed reusable Kubernetes infrastructure using Terraform, provisioning VPCs, IAM, networking, and cluster add-ons to automate environment creation.",
    ],
    stack: [
      "Kubernetes",
      "AWS",
      "GCP",
      "Prometheus",
      "Grafana",
      "Pyroscope",
      "Helm",
      "Terraform",
      "Karpenter",
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
