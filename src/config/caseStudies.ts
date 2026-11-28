/**
 * Selected engineering work — concise card summaries with short, relevant
 * technical articles on dedicated pages.
 */

export interface CaseStudyFlowNode {
  label: string;
  detail: string;
}

export interface CaseStudySubsection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  tables?: CaseStudyComparison[];
}

export interface CaseStudyComparison {
  heading?: string;
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface CaseStudySection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: CaseStudySubsection[];
  tables?: CaseStudyComparison[];
}

export interface CaseStudyArticle {
  eyebrow?: string;
  summary?: string;
  scope?: string[];
  scopeLine?: string;
  flow?: {
    caption: string;
    nodes: CaseStudyFlowNode[];
  };
  sections: CaseStudySection[];
  comparison?: CaseStudyComparison;
}

export interface CaseStudy {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  article: CaseStudyArticle;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "unified-observability",
    slug: "unified-observability",
    category: "Observability",
    title: "Building a Centralized Observability Platform",
    description:
      "Unifying monitoring, alerting, and operational visibility across 30+ Kubernetes clusters while transitioning to an open-source observability stack.",
    technologies: ["Prometheus", "Grafana", "Loki", "Tempo", "Kubernetes"],
    article: {
      eyebrow: "Observability",
      scopeLine: "30+ Production Clusters · 10–15 Services · Open-Source Observability",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "Monitoring had become fragmented across 30+ production clusters, with cluster-specific dashboards, service-level alerts, and proprietary tools slowing incident investigation.",
            "The goal was one platform that improved visibility, reduced alert noise, and gave on-call engineers and service owners a consistent troubleshooting path.",
          ],
        },
        {
          id: "challenges",
          heading: "Key Challenges",
          paragraphs: [],
          bullets: [
            "Fragmented dashboards and limited correlation between metrics, logs, and traces.",
            "One service generated 300–400 alerts; alert definitions and severity varied across services.",
            "Licensing dependency on proprietary monitoring tools.",
          ],
        },
        {
          id: "approach",
          heading: "Engineering Approach",
          paragraphs: [],
          subsections: [
            {
              id: "alerting",
              heading: "Centralized Alerting",
              paragraphs: [
                "Reviewed rules across 10–15 services, removed noisy and non-actionable conditions, and restructured alerts around meaningful operational signals. Conditions and severity were reviewed to separate actionable incidents from informational alerts instead of simply suppressing notifications.",
              ],
            },
            {
              id: "visibility",
              heading: "Unified Visibility",
              paragraphs: [
                "Built Grafana dashboards covering 30+ production clusters, removing the need to navigate individual dashboards during incidents. The shared view helped engineers identify affected services, narrow infrastructure issues, and inspect clusters from one interface.",
              ],
            },
            {
              id: "stack",
              heading: "Open-Source Migration",
              paragraphs: [
                "Moved monitoring to Prometheus, Grafana, Loki, and Tempo for greater control over configurations, alert definitions, and workflows while reducing vendor dependency.",
              ],
              tables: [
                {
                  caption: "Component responsibilities in the observability stack.",
                  columns: ["Component", "Responsibility"],
                  rows: [
                    ["Prometheus", "Metrics collection and alert rule evaluation"],
                    ["Grafana", "Centralized visualization and dashboards"],
                    ["Loki", "Log aggregation and investigation"],
                    ["Tempo", "Distributed tracing where available"],
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "impact",
          heading: "Operational Impact",
          paragraphs: [],
          tables: [
            {
              caption: "Before and after the centralized observability work.",
              columns: ["Area", "Before", "After"],
              rows: [
                [
                  "Monitoring",
                  "Individual cluster dashboards",
                  "Centralized visibility across 30+ clusters",
                ],
                [
                  "Alerting",
                  "High-volume, fragmented alerts",
                  "Restructured rules across 10–15 services",
                ],
                [
                  "Tooling",
                  "Proprietary monitoring tools",
                  "Open-source observability stack",
                ],
                [
                  "Troubleshooting",
                  "Multiple tools and dashboards",
                  "Unified investigation workflow",
                ],
              ],
            },
          ],
        },
        {
          id: "learnings",
          heading: "Engineering Learnings",
          paragraphs: [
            "Effective observability is about the right signals with enough context, not more data or alerts. Centralizing it requires improving alert quality, standardizing monitoring, and designing dashboards around operational needs rather than infrastructure boundaries.",
          ],
        },
      ],
    },
  },
  {
    id: "cloud-migration",
    slug: "cloud-migration",
    category: "Cloud migration",
    title: "Migrating 10+ Kubernetes Clusters from AWS EKS to GCP GKE",
    description:
      "Migrating Kubernetes infrastructure across cloud providers, achieving approximately 20% infrastructure cost reduction with zero production downtime.",
    technologies: ["EKS", "GKE", "Terraform", "Helm", "GitOps"],
    article: {
      eyebrow: "Cloud Migration · Kubernetes · Platform Engineering",
      scopeLine: "10+ Kubernetes Clusters | Zero Downtime | ~20% Infrastructure Cost Reduction",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "Migrating more than 10 production Kubernetes clusters from AWS EKS to GCP GKE required maintaining availability while changing networking, identity, storage, delivery, and cost assumptions. Kubernetes provided a consistent orchestration layer, but cloud-specific dependencies still had to be evaluated.",
            "The goal was zero production downtime, approximately 20% infrastructure cost reduction, consistent provisioning, and minimal disruption to application deployment workflows.",
          ],
        },
        {
          id: "complexity",
          heading: "Cloud Differences",
          paragraphs: [],
          tables: [
            {
              caption: "Components evaluated before designing the cross-cloud migration.",
              columns: ["Component", "AWS", "Google Cloud"],
              rows: [
                ["Kubernetes", "EKS", "GKE"],
                ["Networking", "AWS VPC", "Google Cloud VPC"],
                ["Pod Networking", "Amazon VPC CNI", "VPC-native networking"],
                ["Workload Identity", "IRSA", "Workload Identity Federation"],
                ["Block Storage", "Amazon EBS", "Persistent Disk"],
                ["Load Balancing", "ALB / NLB", "Google Cloud Load Balancing"],
                ["Container Registry", "ECR", "Artifact Registry"],
                ["Provisioning", "Terraform", "Terraform"],
              ],
            },
          ],
        },
        {
          id: "strategy",
          heading: "Migration Strategy",
          paragraphs: [],
          bullets: [
            "Assessed existing dependencies, resource requirements, networking, and cloud-specific integrations before moving workloads.",
            "Provisioned GKE with Terraform for networking, clusters, node pools, access controls, and supporting infrastructure instead of manually configuring each cluster.",
            "Validated application configuration, secrets, storage, resource requests, ingress rules, and external dependencies before phased migration.",
            "Checked health, connectivity, DNS, resource use, and monitoring coverage before traffic transition, with rollback readiness maintained.",
          ],
        },
        {
          id: "challenges",
          heading: "Key Challenges",
          paragraphs: [],
          bullets: [
            "Networking and IAM differed across clouds, so connectivity, routing, firewalls, load balancers, and least-privilege access had to be re-evaluated.",
            "Stateful workloads required checks for storage compatibility, data consistency, backup validation, and recovery.",
            "Node configuration and autoscaling were reviewed to avoid carrying inefficiencies into GKE while keeping deployment, monitoring, and troubleshooting workflows consistent.",
          ],
        },
        {
          id: "outcomes",
          heading: "Migration Outcomes",
          paragraphs: [],
          tables: [
            {
              caption: "Verified outcomes of the migration.",
              columns: ["Metric", "Outcome"],
              rows: [
                ["Migration scale", "10+ Kubernetes clusters"],
                ["Production downtime", "Zero"],
                ["Infrastructure cost", "Approximately 20% reduction"],
                [
                  "Platform efficiency",
                  "Improved infrastructure utilization and operational consistency",
                ],
              ],
            },
          ],
        },
        {
          id: "takeaways",
          heading: "Engineering Takeaways",
          paragraphs: [
            "Cloud migration is not just infrastructure replacement. It requires balancing availability, compatibility, operational efficiency, and cost. Understanding dependencies first, defining infrastructure as code, validating incrementally, and preserving observability kept the transition controlled.",
          ],
        },
      ],
    },
  },
];
