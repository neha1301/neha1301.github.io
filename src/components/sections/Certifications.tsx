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
        title={
          <>
            Proof, not <span className="text-accent-text italic">promises.</span>
          </>
        }
        description="The certificates are checkpoints. The real evidence is the systems I run, the incidents I close, and the open-source work on this page."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={0.05 * i} className="h-full">
            <article className="panel group h-full p-7 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-accent/30 bg-accent-soft font-mono text-[14px] font-semibold text-accent-text">
                  {cert.shortName}
                </span>
                <span className="font-mono text-[12px] text-fg-subtle">
                  {cert.year}
                </span>
              </div>

              <h3 className="mt-7 font-display text-[2rem] leading-[1.06] text-fg">
                {cert.name}
              </h3>
              <p className="mt-2 text-[1rem] text-fg-subtle">{cert.issuer}</p>
              <p className="mt-6 text-[1.0625rem] leading-[1.7] text-fg-muted">
                {cert.description}
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">
                {cert.skills.join(" · ")}
              </p>

              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-7 inline-flex items-center gap-2 border-b border-border-strong pb-1 text-[0.9375rem] font-medium text-accent-text transition-colors hover:border-accent"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {cert.hrefLabel}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <article
          id="education"
          className="panel mt-4 flex scroll-mt-24 flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-9"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="kicker text-fg-subtle">Education</p>
            </div>
            <h3 className="mt-6 font-display text-[1.75rem] leading-[1.1] text-fg">
              {education.degree} · {education.field}
            </h3>
            <p className="mt-2 text-[1rem] text-fg-muted">
              {education.institution}
            </p>
          </div>
          <span className="font-mono text-[12px] text-fg-subtle sm:shrink-0">
            {education.period}
          </span>
        </article>
      </Reveal>
    </Section>
  );
}
