/**
 * Certifications.
 *
 * Verification links point at the public Credly badge for each credential.
 * Contest and DSA counts are deliberately omitted — at this career stage they
 * distract from the production reliability work above.
 */

export interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  year: string;
  description: string;
  href: string;
  hrefLabel: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "cka",
    name: "Certified Kubernetes Administrator",
    shortName: "CKA",
    issuer: "The Linux Foundation",
    year: "2026",
    description:
      "Hands-on administrator certification covering cluster installation, workload management, networking, storage, and troubleshooting.",
    href: "https://www.credly.com/badges/4e34fd34-6b0f-4e5f-ae82-7c296f10ccd1",
    hrefLabel: "Verify on Credly",
    skills: ["Cluster operations", "Networking", "Storage", "Troubleshooting"],
  },
  {
    id: "pca",
    name: "Prometheus Certified Associate",
    shortName: "PCA",
    issuer: "CNCF / The Linux Foundation",
    year: "2026",
    description:
      "Certification covering Prometheus fundamentals, instrumentation, querying with PromQL, alerting, and practical troubleshooting.",
    href: "https://www.credly.com/badges/42c070f7-827d-4fb5-b1a9-3bd24320c8c3",
    hrefLabel: "Verify on Credly",
    skills: ["PromQL", "Alerting", "Instrumentation", "Monitoring"],
  },
];

