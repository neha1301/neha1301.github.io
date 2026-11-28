import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { certifications } from "@/config/certifications";
import { education } from "@/config/education";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="credentials" divided>
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            Credentials
          </p>
          <p className="text-[0.8125rem] text-fg-muted">
            {education.degree} · {education.institution} · {education.period}
          </p>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={0.05 * i}>
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="flex min-w-0 items-center gap-3">
                <ShieldCheck
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[0.875rem] font-medium text-fg">
                    {cert.shortName}
                  </span>
                  <span className="block truncate font-mono text-[10.5px] text-fg-subtle">
                    {cert.issuer} · {cert.year}
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
