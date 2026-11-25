import { ArrowUpRight, GraduationCap, ShieldCheck } from "lucide-react";

import { certifications } from "@/config/certifications";
import { education } from "@/config/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="certifications" divided className="bg-bg-elevated/40">
      <SectionHeading
        index="05"
        eyebrow="Credentials & proof"
        title="Certifications & education."
        description="The certificates are checkpoints. The real evidence is the systems I run, the incidents I close, and the open-source work on this page."
      />

      <div className="mt-14 border-t border-border">
        {certifications.map((cert, i) => (
          <Reveal
            key={cert.id}
            delay={0.05 * i}
            className="grid gap-6 border-b border-border py-9 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/30 font-mono text-[13px] font-semibold text-accent-text">
                  {cert.shortName}
                </span>
                <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-fg-subtle">
                  {cert.year}
                </p>
              </div>
              <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
                {cert.name}
              </h3>
              <p className="mt-2 text-[1rem] text-fg-subtle">{cert.issuer}</p>
            </div>

            <div className="md:col-span-7">
              <p className="text-[1.0625rem] leading-[1.7] text-fg-muted">
                {cert.description}
              </p>
              <p className="mt-5 text-[1rem] leading-relaxed text-fg-muted">
                {cert.skills.join(" · ")}
              </p>
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 border-b border-border-strong pb-1 text-[1rem] font-medium text-accent-text transition-colors hover:border-accent"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {cert.hrefLabel}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div
          id="education"
          className="mt-10 flex scroll-mt-24 flex-col gap-4 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-strong text-accent-text">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-fg-subtle">
                Education
              </p>
            </div>
            <h3 className="mt-5 text-xl font-semibold leading-snug text-fg">
              {education.degree} · {education.field}
            </h3>
            <p className="mt-2 text-[1rem] text-fg-muted">
              {education.institution}
            </p>
          </div>
          <span className="font-mono text-[12px] text-fg-subtle sm:shrink-0">
            {education.period}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
