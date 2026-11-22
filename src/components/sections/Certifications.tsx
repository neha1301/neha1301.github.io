import {
  ArrowUpRight,
  Award,
  GraduationCap,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import { achievements, certifications } from "@/config/certifications";
import { education } from "@/config/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <Section id="certifications" divided>
      <SectionHeading
        eyebrow="Credentials & proof"
        title="Certifications & achievements."
        description="The certificates are checkpoints. The real evidence is the systems I run, the incidents I close, and the open-source work on this page."
      />

      {/* Certifications */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={0.06 * i}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2 sm:p-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                  {cert.year}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-snug text-fg">
                {cert.name}
              </h3>
              <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-accent-text">
                {cert.shortName} · {cert.issuer}
              </p>
              <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-fg-muted">
                {cert.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-bg-elevated px-2 py-1 text-[11.5px] text-fg-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 border-t border-border pt-5 text-[0.8125rem] font-medium text-accent-text transition-colors hover:text-accent"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {cert.hrefLabel}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Education — context only, not the headline. */}
      <Reveal delay={0.1}>
        <article
          id="education"
          className="mt-4 flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-elevated text-accent">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                Education
              </p>
              <h3 className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-fg">
                {education.degree} · {education.field}
              </h3>
              <p className="mt-1 text-[0.875rem] text-fg-muted">
                {education.institution}
              </p>
            </div>
          </div>
          <span className="font-mono text-[11.5px] text-fg-subtle sm:shrink-0">
            {education.period}
          </span>
        </article>
      </Reveal>

      {/* Achievements */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, i) => (
          <Reveal key={achievement.id} delay={0.06 * i}>
            <article className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-bg-elevated p-6 transition-all duration-300 hover:border-border-strong hover:bg-surface">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-accent">
                <Trophy className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[1.375rem] font-semibold leading-none tracking-tight text-fg">
                  {achievement.metric}
                </p>
                <h3 className="mt-2 text-[0.9375rem] font-medium text-fg">
                  {achievement.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                  {achievement.detail}
                </p>
                {achievement.href ? (
                  <a
                    href={achievement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-fg-subtle transition-colors hover:text-accent"
                  >
                    {achievement.hrefLabel}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

    </Section>
  );
}
