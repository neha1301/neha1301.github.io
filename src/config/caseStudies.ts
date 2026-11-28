/**
 * Selected engineering work — concise card summaries with detailed technical
 * articles on dedicated pages.
 *
 * Content is limited to figures and decisions supplied by the user or already
 * verified in the resume. Unconfirmed implementation details (for example,
 * Alertmanager topology, tracing instrumentation, retention settings, or an
 * exact cutover sequence) are intentionally not added.
 */

export interface CaseStudyFlowNode {
  label: string;
  detail: string;
}

export interface CaseStudySection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseStudyComparison {
  heading: string;
  caption: string;
  columns: [string, string, string];
  rows: [string, string, string][];
}

export interface CaseStudyArticle {
  summary: string;
  scope: string[];
  flow: {
    caption: string;
    nodes: CaseStudyFlowNode[];
  };
  sections: CaseStudySection[];
  comparison: CaseStudyComparison;
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
      summary:
        "Moving 10+ Kubernetes clusters from AWS EKS to GCP GKE was treated as a change to the delivery system, not a one-time host switch. Terraform, Helm, and GitOps kept infrastructure and workloads reviewable while services stayed available during the move.",
      scope: [
        "10+ Kubernetes clusters",
        "EKS → GKE",
        "~20% infrastructure cost reduction",
        "Zero production downtime",
      ],
      flow: {
        caption: "Migration flow",
        nodes: [
          {
            label: "AWS / EKS",
            detail: "Existing workloads and platform definitions",
          },
          {
            label: "Terraform",
            detail: "Target infrastructure defined as code",
          },
          {
            label: "Helm + GitOps",
            detail: "Repeatable packaging and reviewed rollout",
          },
          {
            label: "GCP / GKE",
            detail: "Migrated workloads on the new cloud",
          },
          {
            label: "Validation",
            detail: "Deployment checks and shared observability",
          },
        ],
      },
      sections: [
        {
          id: "platform-problem",
          heading: "Why this was a platform migration",
          paragraphs: [
            "Workloads, networking and delivery definitions had to move between AWS and GCP while services stayed usable and deployments stayed reviewable.",
            "That is why the migration was framed around repeatable definitions rather than manual console work. Changing the provider is visible in the outcome, but the engineering risk sits in the definitions that decide how workloads are packaged, deployed, and validated after the move.",
          ],
        },
        {
          id: "migration-architecture",
          heading: "Architecture of the move",
          paragraphs: [
            "The flow kept the same logical responsibilities on both clouds: define infrastructure, package workloads, roll out through review, and validate the result. EKS represented the source state. Terraform described the target environment. Helm and GitOps carried the workload definitions and rollout path. GKE became the target cluster platform, with validation remaining part of delivery rather than a separate step.",
            "This structure made the migration auditable. Each change had a place in the flow, so the team could reason about what had moved and what still needed verification instead of relying on memory or console state.",
            "Separating platform definitions from workload packaging was important. Infrastructure changes could be reviewed as infrastructure changes, and application changes could stay in charts. That separation reduced the coupling between a cloud provider switch and the services running on top of it.",
          ],
        },
        {
          id: "infrastructure-as-code",
          heading: "Infrastructure as code as the control boundary",
          paragraphs: [
            "Defined target infrastructure with Terraform, kept workloads packaged in Helm charts, and used GitOps-driven delivery so the same review and validation steps applied on both clouds.",
            "Terraform gave the target environment a reviewable boundary. Chart parameters and infrastructure modules could be examined before rollout, which matters when the same platform model is being applied in a different cloud. Helm kept workloads as packaged units instead of loose manifests, reducing the chance that source and target states drift apart after the first successful deployment.",
          ],
        },
        {
          id: "delivery",
          heading: "Delivery and validation during cutover",
          paragraphs: [
            "GitOps mattered because cross-cloud risk often appears after the first successful deployment. The review path needed to remain the same on both sides so that changes were visible, repeatable, and comparable. Validation stayed attached to that path through deployment checks and shared observability.",
            "Keeping delivery reviewable also made operational support simpler. The platform team could carry the same model to GCP rather than learning a separate set of ad hoc procedures for the new environment.",
            "The migration did not remove validation to make the move faster. Checks stayed attached to rollout, so the target environment had to satisfy the same delivery expectations as the source. That made zero production downtime an outcome of the approach rather than a claim made after the fact.",
          ],
        },
        {
          id: "operating-model",
          heading: "What stayed constant",
          paragraphs: [
            "The comparison below describes the operating model, not a claim that every internal detail was identical on both clouds. The important continuity was in how changes were defined, reviewed, and checked.",
          ],
        },
        {
          id: "tradeoffs",
          heading: "Trade-offs",
          paragraphs: [
            "A code-defined migration needs more upfront work on modules and chart parameters, but it avoids one-off console changes that are hard to reproduce or audit.",
            "The extra work is front-loaded: platform definitions have to be made explicit before the move can be repeated safely. That cost was accepted because the alternative leaves scattered changes that cannot be reviewed, reproduced, or explained after the fact.",
          ],
        },
        {
          id: "outcome",
          heading: "Outcome",
          paragraphs: [
            "The migration moved 10+ Kubernetes clusters with zero production downtime and achieved approximately 20% infrastructure cost reduction. These figures are specific to this migration; they are not presented as a general property of either cloud provider.",
            "Repeatable delivery and validation carried across the migration, with the platform team keeping the same operational model on GCP.",
            "Shared observability remained part of validation, so the move did not trade delivery control for reduced visibility. The target environment was reached without losing the checks that make production changes understandable.",
          ],
        },
        {
          id: "learnings",
          heading: "Engineering learnings",
          paragraphs: [
            "The most useful lesson was to treat a cloud migration as a change to the delivery system rather than a one-time infrastructure event. Provider details matter, but the durable work is making infrastructure and workloads reproducible, reviewable, and observable in both environments.",
            "A second lesson was to keep continuity explicit. When review, packaging, and validation remain stable, the team can focus on the differences that actually matter in the target cloud instead of rebuilding its operating process at the same time.",
            "A third lesson was to state outcomes precisely. Approximately 20% lower infrastructure cost and zero production downtime are results of this migration under its specific scope of 10+ clusters. Keeping that boundary clear makes the case study useful without turning it into a universal claim about cloud moves.",
          ],
        },
      ],
      comparison: {
        heading: "Operating model across the migration",
        caption: "Continuity in how changes were defined, reviewed, and checked.",
        columns: ["Area", "AWS EKS", "GCP GKE"],
        rows: [
          ["Cluster platform", "EKS", "GKE"],
          [
            "Infrastructure definition",
            "Existing platform definitions",
            "Terraform-defined target infrastructure",
          ],
          ["Workload packaging", "Helm charts", "Helm charts"],
          [
            "Delivery",
            "GitOps-driven review and rollout",
            "Same GitOps-driven review and validation",
          ],
          [
            "Availability",
            "Production services stayed available",
            "Zero production downtime",
          ],
          ["Infrastructure cost", "Baseline", "Approximately 20% lower"],
        ],
      },
    },
  },
];
