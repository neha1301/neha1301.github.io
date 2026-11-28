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
      summary:
        "Centralizing observability meant changing both the signal definitions and the way engineers consumed them. The work covered 10–15 services and 30+ production Kubernetes clusters, replacing a cluster-scoped, vendor-led view with a shared stack built on Prometheus, Grafana, Loki, and Tempo.",
      scope: [
        "30+ production clusters",
        "10–15 services",
        "Prometheus · Grafana · Loki · Tempo",
      ],
      flow: {
        caption: "Operational data flow",
        nodes: [
          {
            label: "Services",
            detail: "10–15 services producing metrics, alerts, logs, and traces where available",
          },
          {
            label: "Prometheus",
            detail: "Metrics and rewritten alert rules evaluated centrally",
          },
          {
            label: "Loki + Tempo",
            detail: "Logs and trace context for investigation",
          },
          {
            label: "Grafana",
            detail: "Dashboards spanning 30+ production clusters",
          },
          {
            label: "On-call & service owners",
            detail: "One view for detection and diagnosis",
          },
        ],
      },
      sections: [
        {
          id: "starting-point",
          heading: "Existing monitoring architecture and its limitations",
          paragraphs: [
            "Monitoring had grown with the Kubernetes estate instead of being designed as a single system. Alerts were defined close to individual services, dashboards were organized around individual clusters, and logging and visualization depended on proprietary monitoring tools. With 30+ production clusters, that shape makes diagnosis a manual correlation exercise: identify the affected cluster, locate the relevant dashboard, then switch tools to add log or trace context.",
            "The limitation was not a lack of signals. One service could emit 300–400 alerts, and the default path was to forward that volume. Moving the same stream into another tool would have relocated noise rather than reduced it. The useful work was upstream: decide what each alert meant and what condition deserved attention.",
          ],
        },
        {
          id: "centralized-alerting",
          heading: "Centralized alerting across 10–15 services",
          paragraphs: [
            "Centralized alerting was implemented as a rule-quality problem across 10–15 services. Each alert use case was reviewed and the rule was rewritten around an actionable condition, instead of treating every emitted event as something to route onward. In practice, that changed alerts from service-local output into a shared operational contract.",
            "Noise reduction came from restructuring the rules themselves, not from muting notifications further down the path. That distinction matters. Suppression can hide a recurring failure; rewriting a rule removes the reason the signal was misleading in the first place.",
            "The review also made severity meaning more consistent. A condition that belongs on a dashboard does not need to interrupt an engineer, while a condition tied to operational impact should be explicit. This is slower than simply aggregating alerts, but it makes the alert set something an on-call engineer can trust.",
          ],
        },
        {
          id: "implementation",
          heading: "Technical implementation",
          paragraphs: [
            "The work can be understood as four connected changes rather than a tool swap. Each layer has a narrow responsibility: Prometheus answers whether a condition is happening, Loki and Tempo help explain why, and Grafana is where those views meet.",
          ],
          bullets: [
            "Alert rules were reviewed per use case and rewritten before they were treated as centralized signals.",
            "Prometheus became the common layer for metrics and evaluated alert rules across the cluster estate.",
            "Loki and Tempo supplied log and trace context for investigation, with traces used where they were available.",
            "Grafana became the shared read layer, with dashboards covering 30+ production clusters for on-call engineers and service owners.",
          ],
        },
        {
          id: "dashboards",
          heading: "Dashboards across 30+ production clusters",
          paragraphs: [
            "The dashboards were organized around operational questions, not cluster names. Cluster remained a dimension in the data, but it was no longer a separate destination. A responder could start from a service-level symptom and narrow to the affected cluster without hunting for a dashboard.",
            "Using the same Grafana view for incident response and routine health checks kept the signal definitions visible. Service owners could see the same information that on-call engineers used during an incident, which reduced the gap between owning a service and understanding how it appears operationally.",
            "Coverage across 30+ production clusters was the point of the design. A centralized view is useful only if it reflects the whole estate; otherwise the responder still has to know where to look before the dashboard can help.",
          ],
        },
        {
          id: "open-source-migration",
          heading: "Migration to an open-source stack",
          paragraphs: [
            "Moving off proprietary monitoring tools was not only a licensing decision. It changed who controls alert semantics, dashboard structure, and investigation paths. Prometheus and Grafana took over metric evaluation and visualization; Loki took over logs; Tempo covered traces where available. Removing licence dependency was a clear result, but the more important outcome was owning the definitions that drive operational decisions.",
          ],
        },
        {
          id: "decisions",
          heading: "Engineering decisions and trade-offs",
          paragraphs: [
            "The hardest decision was classification: which signals should page, which should live on a dashboard, and which are only useful during deeper investigation. High-volume sources such as the service emitting 300–400 alerts made that decision unavoidable. Without it, centralization would have produced a larger, noisier stream rather than a better one.",
            "Operating an owned stack also changes responsibility. Collection, retention, and dashboard maintenance become platform concerns instead of vendor defaults. That trade-off was worthwhile here because it allowed alert rules and views to be standardized across 30+ clusters without being constrained by a proprietary tool's model.",
          ],
        },
        {
          id: "impact",
          heading: "Operational impact and engineering learnings",
          paragraphs: [
            "The operational result is a shared view for on-call engineers and service owners spanning 30+ production clusters. Alert noise is addressed in the rules that generate it, and logs and trace context are part of the same investigation path rather than a separate hunt.",
            "The main learning is that centralization is a design problem, not a relocation exercise. Moving raw alerts into a new tool preserves the noise. Durable improvement comes from defining what an alert means, connecting metrics with logs and traces, and judging the work by whether a responder can understand impact and location quickly.",
          ],
        },
      ],
      comparison: {
        heading: "Monitoring model, before and after",
        caption: "Key changes in how signals were defined and consumed.",
        columns: ["Area", "Before", "After"],
        rows: [
          [
            "Alert source",
            "High-volume, service-local signals; one service could emit 300–400 alerts",
            "Reviewed and rewritten rules across 10–15 services",
          ],
          [
            "Scope",
            "Cluster-scoped views",
            "Grafana dashboards covering 30+ production clusters",
          ],
          [
            "Tooling",
            "Proprietary monitoring tools",
            "Prometheus, Grafana, Loki, and Tempo",
          ],
          [
            "Investigation",
            "Context spread across separate views",
            "Metrics, logs, and traces used from one operational workflow",
          ],
        ],
      },
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
