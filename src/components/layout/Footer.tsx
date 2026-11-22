import { ArrowUp, MapPin } from "lucide-react";

import { navLinks, site } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <span className="text-[0.9375rem] font-medium tracking-tight">
              {site.name}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {site.role}. Building and operating reliable production
              infrastructure across Kubernetes, AWS and GCP.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-subtle">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {site.location}
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Sections
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Get in touch
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.resume.path}
                    download={site.resume.fileName}
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <ArrowUp className="h-3.5 w-3.5 rotate-45" aria-hidden="true" />
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-fg-subtle transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
