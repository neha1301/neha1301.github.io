import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { certifications } from "@/config/certifications";
import { education } from "@/config/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="credentials" divided>
      <SectionHeading
        index="05"
        eyebrow="Credentials"
        title="Certifications & education."
        description={`${education.degree} · ${education.institution} · ${education.period}`}
      />

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={0.05 * i}>
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.875rem] text-fg-muted transition-colors hover:text-accent-text"
            >
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span className="font-medium">{cert.shortName}</span>
              <span className="font-mono text-[10.5px] text-fg-subtle">
                {cert.issuer} · {cert.year}
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-fg-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
