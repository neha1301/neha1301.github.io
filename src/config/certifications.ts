/**
 * Certifications and achievements.
 *
 * Verification links point at official credential-verification portals.
 * A per-credential ID can be appended to the CKA link when available.
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
    href: "https://training.linuxfoundation.org/certification/verify/",
    hrefLabel: "Verify credential",
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
    href: "https://training.linuxfoundation.org/certification/verify/",
    hrefLabel: "Verify credential",
    skills: ["PromQL", "Alerting", "Instrumentation", "Monitoring"],
  },
];

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  metric: string;
  href?: string;
  hrefLabel?: string;
}

export const achievements: Achievement[] = [
  {
    id: "gwc",
    title: "Flipkart GWC 4.0",
    detail:
      "Top 30 performer out of 3.9 lakh+ participants in Flipkart's nationwide coding contest.",
    metric: "Top 30",
    href: "https://www.flipkart.com/",
    hrefLabel: "Flipkart",
  },
  {
    id: "dsa",
    title: "300+ DSA problems solved",
    detail:
      "Solved 300+ Data Structures and Algorithms problems across LeetCode and GeeksforGeeks.",
    metric: "300+",
    href: "https://leetcode.com/",
    hrefLabel: "LeetCode",
  },
];
