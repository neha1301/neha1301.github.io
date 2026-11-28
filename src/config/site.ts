/**
 * Central site configuration.
 * Single source of truth for identity, links, and meta information.
 */

export const site = {
  name: "Neha Sharma",
  shortName: "Neha",
  /** Canonical origin — used for SEO metadata, OG tags and sitemap. */
  url: "https://neha1301.github.io",
  title: "Neha Sharma — Site Reliability & Platform Engineer",
  role: "Site Reliability & Platform Engineer · BharatPe",
  tagline: "Fewer alerts. Faster root causes.",
  subtagline:
    "I'm Neha Sharma, a Site Reliability and Platform Engineer building reliable Kubernetes platforms, automation and observability across AWS and GCP.",
  description:
    "Site Reliability and Platform Engineer at BharatPe. Three years operating production Kubernetes across AWS and GCP — platform automation, observability and incident response.",

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
  { id: "impact", label: "Impact" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "case-studies", label: "Case Studies" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Projects" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;
