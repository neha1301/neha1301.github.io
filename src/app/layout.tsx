import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { site } from "@/config/site";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Neha Sharma",
  },
  description: site.description,
  applicationName: "Neha Sharma — Portfolio",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Neha Sharma",
    "Site Reliability Engineer",
    "SRE",
    "Platform Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "AWS",
    "GCP",
    "Terraform",
    "EKS",
    "Policy-as-Code",
    "Helm",
    "ArgoCD",
    "Prometheus",
    "Grafana",
    "Observability",
    "Incident management",
    "Centralized alerting",
    "Gurugram",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/og.png`,
  jobTitle: "Site Reliability & Platform Engineer | DevOps Engineer II (SDE-2)",
  description: site.description,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "BharatPe",
  },
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: [
    "Site Reliability Engineering",
    "Platform Engineering",
    "Kubernetes",
    "AWS",
    "EKS",
    "GCP",
    "Terraform",
    "Policy-as-Code",
    "Helm",
    "Prometheus",
    "Grafana",
    "OpenTelemetry",
    "GitOps",
    "Centralized alerting",
    "Incident management",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <noscript>
          {/* Framer Motion sets opacity:0 inline during SSR. Without JS the
              page would otherwise be blank — force every Reveal visible. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
