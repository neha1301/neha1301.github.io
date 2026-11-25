/**
 * Central site configuration.
 * Single source of truth for identity, links, and meta information.
 */

export const site = {
  name: "Neha Sharma",
  shortName: "Neha",
  /** Canonical origin — used for SEO metadata, OG tags and sitemap. */
  url: "https://neha1301.github.io",
  title: "Neha Sharma — Site Reliability & DevOps Engineer",
  role: "DevOps Engineer II (SDE-2) at BharatPe · Site Reliability Engineer",
  tagline: "Fewer alerts. Faster root causes.",
  subtagline:
    "I'm Neha Sharma, a Site Reliability & DevOps Engineer with 3 years of experience building, automating, and operating production-grade cloud infrastructure.",
  description:
    "Site Reliability & DevOps Engineer at BharatPe. Three years running production Kubernetes, AWS and GCP — alerting, observability and incident response.",

  location: "Gurugram, Haryana, India",
  locationShort: "Gurugram, India",
  email: "nehasharma13dec2001@gmail.com",
  availability: "Open to opportunities",
  yearsOfExperience: 3,

  /** Swap this path if the resume file is renamed. */
  resume: {
    path: "/Neha-Sharma-Resume.pdf",
    fileName: "Neha-Sharma-Resume.pdf",
  },

  links: {
    github: "https://github.com/neha1301",
    linkedin: "https://www.linkedin.com/in/neha1301/",
    leetcode: "https://leetcode.com/u/neha_onefour/",
    email: "mailto:nehasharma13dec2001@gmail.com",
    /** Opens a compose window in the browser even without a desktop mail app. */
    emailCompose:
      "https://mail.google.com/mail/?view=cm&fs=1&to=nehasharma13dec2001@gmail.com",
  },
} as const;

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "neha1301",
    href: site.links.github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/neha1301",
    href: site.links.linkedin,
  },
  {
    id: "email",
    label: "Email",
    handle: site.email,
    href: site.links.email,
  },
] as const;

/** Primary navigation — anchors must match section ids in `page.tsx`. */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;
