/**
 * Articles & engineering writing.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD AN ARTICLE
 * ---------------------------------------------------------------------------
 * Append an entry to `articles` below. The showcase component picks it up
 * automatically — no component changes required.
 *
 *   {
 *     id: "unique-slug",
 *     title: "Article title",
 *     description: "One or two sentences summarising the post.",
 *     category: "Kubernetes",          // technical category
 *     publishedAt: "2026-02-14",      // ISO date
 *     url: "https://www.linkedin.com/posts/neha1301_<slug>",
 *     readTime: "6 min read",         // optional
 *   }
 *
 * Until real, published posts are added here, the section renders a link
 * out to the LinkedIn profile instead of inventing article titles.
 * ---------------------------------------------------------------------------
 */

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  /** ISO-8601 date string, e.g. "2026-02-14" */
  publishedAt: string;
  url: string;
  readTime?: string;
}

export const articles: Article[] = [];

/** Shown when `articles` is empty. */
export const writingFallback = {
  headline: "Technical posts on LinkedIn",
  description:
    "My engineering writing lives on LinkedIn — notes from production Kubernetes, observability, SRE practice, and incident response. Direct links to individual posts are added here as they are published.",
  ctaLabel: "Explore My Technical Posts",
  ctaHref: "https://www.linkedin.com/in/neha1301/",
};

/** Topics I write about — descriptive of real work, not article titles. */
export const writingTopics = [
  "Production Kubernetes",
  "Prometheus & Grafana",
  "SLO / SLI design",
  "Incident response",
  "Terraform modules",
  "Helm & GitOps",
  "Node-level diagnostics",
];
