/**
 * Selected engineering work — concise card summaries with detailed technical
 * articles on dedicated pages.
 *
 * Content is limited to figures and decisions supplied by the user or already
 * verified in the resume. Unconfirmed implementation details are intentionally
 * not added.
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
  flow: {
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
      flow: {
        caption: "Observability workflow",
        nodes: [
          {
            label: "Alert review",
            detail: "10–15 services; noisy and non-actionable conditions identified",
          },
          {
            label: "Prometheus",
            detail: "Metrics collection and alert rule evaluation",
          },
          {
            label: "Grafana",
            detail: "Centralized dashboards covering 30+ production clusters",
          },
          {
            label: "Loki + Tempo",
            detail: "Log aggregation and distributed tracing where available",
          },
          {
            label: "On-call engineers and service owners",
            detail: "Unified investigation workflow",
          },
        ],
      },
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "As the Kubernetes infrastructure scaled across 30+ production clusters, monitoring became increasingly fragmented. Engineers relied on cluster-specific dashboards, service-level alerts, and proprietary monitoring tools, making incident investigation and infrastructure visibility more complex.",
            "The objective was to establish a centralized observability platform that improved operational visibility, reduced alert noise, and provided a consistent troubleshooting experience for on-call engineers and service owners.",
          ],
        },
        {
          id: "challenges",
          heading: "Key Challenges",
          paragraphs: [],
          bullets: [
            "Fragmented monitoring across multiple production clusters.",
            "Excessive alert volume, with a single service generating 300–400 alerts.",
            "Inconsistent alert definitions and severity classification across services.",
            "Limited correlation between metrics, logs, and traces.",
            "Dependency on proprietary monitoring tools and licensing.",
          ],
        },
        {
          id: "engineering-approach",
          heading: "Engineering Approach",
          paragraphs: [],
          subsections: [
            {
              id: "centralized-alerting",
              heading: "1. Centralized Alerting",
              paragraphs: [
                "Redesigned alerting across 10–15 services by reviewing existing alert rules, identifying noisy and non-actionable conditions, and restructuring rules around meaningful operational signals.",
                "Rather than simply suppressing notifications, the focus was on improving alert quality at the source. Alert conditions and severity levels were reviewed to distinguish actionable incidents from informational signals.",
              ],
            },
            {
              id: "unified-visibility",
              heading: "2. Unified Infrastructure Visibility",
              paragraphs: [
                "Designed centralized Grafana dashboards covering 30+ production Kubernetes clusters, eliminating the need to navigate individual cluster dashboards during incident investigation.",
                "The dashboards provided a shared operational view, allowing engineers to identify affected services, narrow down infrastructure issues, and investigate cluster-level problems from a common interface.",
              ],
            },
            {
              id: "open-source-migration",
              heading: "3. Open-Source Observability Migration",
              paragraphs: [
                "Migrated monitoring capabilities from proprietary tools to an open-source observability stack, establishing greater control over monitoring configurations, alert definitions, and operational workflows.",
              ],
              tables: [
                {
                  caption:
                    "The separation of metrics, logs, and traces provided a structured foundation for troubleshooting while reducing vendor dependency.",
                  columns: ["Component", "Responsibility"],
                  rows: [
                    [
                      "Prometheus",
                      "Metrics collection and alert rule evaluation",
                    ],
                    [
                      "Grafana",
                      "Centralized visualization and operational dashboards",
                    ],
                    ["Loki", "Log aggregation and investigation"],
                    ["Tempo", "Distributed tracing where available"],
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "engineering-decisions",
          heading: "Engineering Decisions",
          paragraphs: [
            "The primary design decision was to improve signal quality before centralizing monitoring. Aggregating existing alerts without reviewing their underlying conditions would have amplified operational noise.",
            "Another important consideration was balancing centralized visibility with cluster-level granularity. Engineers needed a unified view of the infrastructure without losing the ability to investigate individual clusters and services.",
            "Moving to an open-source stack also introduced greater responsibility for monitoring infrastructure and configuration management, but provided more flexibility and ownership over the observability platform.",
          ],
        },
        {
          id: "operational-impact",
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
                  "Restructured alert rules across 10–15 services",
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
                [
                  "Vendor dependency",
                  "License-dependent monitoring",
                  "Greater platform ownership",
                ],
              ],
            },
          ],
        },
        {
          id: "engineering-learnings",
          heading: "Engineering Learnings",
          paragraphs: [
            "Effective observability is not about collecting more data or generating more alerts. It is about providing the right signals, with sufficient context, when engineers need them.",
            "Centralizing observability requires improving alert quality, standardizing monitoring practices, and designing dashboards around operational needs rather than infrastructure boundaries.",
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
      flow: {
        caption: "Migration flow",
        nodes: [
          {
            label: "Infrastructure assessment",
            detail:
              "Dependencies, resource requirements, networking configurations, and cloud-specific integrations",
          },
          {
            label: "Infrastructure provisioning",
            detail:
              "Terraform-based networking, clusters, node pools, access controls, and supporting infrastructure",
          },
          {
            label: "Workload migration",
            detail:
              "Application configuration, secrets, storage, resource requests, ingress rules, and external dependencies validated",
          },
          {
            label: "Production validation",
            detail:
              "Application health, service connectivity, DNS resolution, resource utilization, and monitoring coverage",
          },
          {
            label: "Traffic transition",
            detail: "Phased migration with rollback and recovery readiness",
          },
        ],
      },
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "Migrating production infrastructure between cloud providers involves much more than redeploying Kubernetes workloads. Although Kubernetes provides a consistent orchestration layer, cloud-specific dependencies introduce challenges across networking, security, storage, and application delivery.",
            "The objective of this migration was to transition more than 10 Kubernetes clusters from AWS EKS to Google Cloud GKE while maintaining production availability, optimizing infrastructure costs, and ensuring operational consistency.",
          ],
        },
        {
          id: "objectives",
          heading: "Migration Objectives",
          paragraphs: [],
          bullets: [
            "Maintain application availability throughout the migration.",
            "Reduce infrastructure and operational costs.",
            "Establish consistent infrastructure provisioning across environments.",
            "Minimize disruption to existing application deployment workflows.",
            "Maintain infrastructure security and observability.",
          ],
        },
        {
          id: "technical-complexity",
          heading: "Understanding the Technical Complexity",
          paragraphs: [
            "While application containers remain largely portable, the infrastructure supporting them differs significantly between AWS and GCP. A successful migration requires understanding these differences rather than simply replicating the existing environment.",
          ],
          tables: [
            {
              caption:
                "These differences represent the areas that need to be evaluated when designing a cross-cloud migration.",
              columns: ["Infrastructure Component", "AWS", "Google Cloud"],
              rows: [
                ["Kubernetes", "EKS", "GKE"],
                ["Networking", "AWS VPC", "Google Cloud VPC"],
                ["Pod Networking", "Amazon VPC CNI", "VPC-native networking"],
                ["Workload Identity", "IRSA", "Workload Identity Federation"],
                ["Block Storage", "Amazon EBS", "Persistent Disk"],
                [
                  "Load Balancing",
                  "ALB / NLB",
                  "Google Cloud Load Balancing",
                ],
                ["Container Registry", "ECR", "Artifact Registry"],
                ["Infrastructure Provisioning", "Terraform", "Terraform"],
              ],
            },
          ],
        },
        {
          id: "migration-strategy",
          heading: "Migration Strategy",
          paragraphs: [],
          subsections: [
            {
              id: "assessment",
              heading: "1. Infrastructure Assessment",
              paragraphs: [
                "The first step in a migration of this scale is understanding the existing infrastructure, workload dependencies, resource requirements, networking configurations, and cloud-specific integrations.",
                "Identifying these dependencies early helps prevent application failures caused by missing permissions, incompatible storage configurations, or networking differences.",
              ],
            },
            {
              id: "provisioning",
              heading: "2. Infrastructure Provisioning",
              paragraphs: [
                "The target GKE environment needs to provide equivalent infrastructure capabilities without unnecessarily replicating AWS-specific configurations.",
                "Infrastructure as Code enables consistent provisioning of networking, Kubernetes clusters, node pools, access controls, and supporting infrastructure across multiple environments.",
                "The goal is to establish a reproducible platform rather than manually configure each cluster.",
              ],
            },
            {
              id: "workload-migration",
              heading: "3. Workload Migration",
              paragraphs: [
                "Kubernetes workloads require validation beyond successful deployment. Application configurations, secrets, persistent storage, resource requests, ingress rules, and external dependencies must remain compatible with the target environment.",
                "A phased migration approach reduces the blast radius of failures and allows infrastructure and application issues to be identified before migrating additional workloads.",
              ],
            },
            {
              id: "validation",
              heading: "4. Production Validation and Traffic Transition",
              paragraphs: [
                "Before transitioning production traffic, the target environment must be validated for application health, service connectivity, DNS resolution, resource utilization, and monitoring coverage.",
                "Maintaining a viable rollback strategy is equally important. A successful deployment does not necessarily guarantee that an application behaves correctly under production traffic.",
              ],
            },
          ],
        },
        {
          id: "engineering-challenges",
          heading: "Key Engineering Challenges",
          paragraphs: [],
          subsections: [
            {
              id: "networking",
              heading: "Cross-Cloud Networking",
              paragraphs: [
                "AWS and GCP differ in their networking models, routing behavior, firewall configurations, and load-balancing integrations.",
                "Migration planning must account for service connectivity, private networking, DNS resolution, and communication between application dependencies.",
              ],
            },
            {
              id: "identity",
              heading: "Identity and Access Management",
              paragraphs: [
                "AWS IAM permissions cannot be directly translated into Google Cloud IAM policies. Workload identities and service permissions need to be evaluated against the target cloud's security model while maintaining least-privilege access.",
              ],
            },
            {
              id: "storage",
              heading: "Storage and Stateful Workloads",
              paragraphs: [
                "Persistent volumes and storage integrations are cloud-specific. Stateful applications require additional consideration around data consistency, storage compatibility, backup validation, and recovery.",
              ],
            },
            {
              id: "resource-optimization",
              heading: "Resource Optimization",
              paragraphs: [
                "Replicating existing node configurations without evaluating workload requirements can carry infrastructure inefficiencies into the new environment.",
                "Resource requests, node utilization, autoscaling behavior, and workload distribution should be evaluated to achieve meaningful cost optimization.",
              ],
            },
            {
              id: "operational-consistency",
              heading: "Operational Consistency",
              paragraphs: [
                "A cloud migration should not introduce unnecessary complexity for application teams. Consistent deployment practices, monitoring, alerting, and troubleshooting workflows are essential for maintaining operational efficiency.",
              ],
            },
          ],
        },
        {
          id: "reliability",
          heading: "Reliability and Risk Management",
          paragraphs: ["The key reliability considerations throughout the migration were:"],
          bullets: [
            "Maintaining application availability.",
            "Validating infrastructure and application dependencies.",
            "Minimizing the blast radius of migration-related failures.",
            "Ensuring monitoring and alerting coverage.",
            "Maintaining rollback and recovery readiness.",
          ],
        },
        {
          id: "outcomes",
          heading: "Migration Outcomes",
          paragraphs: [],
          tables: [
            {
              caption: "Outcomes of migrating 10+ Kubernetes clusters to GKE.",
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
            "Cloud migration is not simply an infrastructure replacement exercise. It requires balancing application reliability, infrastructure compatibility, operational efficiency, and cost.",
            "The most important considerations are understanding dependencies before migration, designing reproducible infrastructure, validating workloads incrementally, and ensuring that reliability remains a priority throughout the transition.",
          ],
        },
      ],
    },
  },
];
