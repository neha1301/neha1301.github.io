import { MapPin } from "lucide-react";

import { experience } from "@/config/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience" divided>
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I worked — and what I owned."
        description="Two production roles. The full chronology is in the resume."
      />

      <div className="mt-8 divide-y divide-border border-y border-border">
        {experience.slice(0, 2).map((role, i) => (
          <Reveal key={role.id} delay={0.05 * i}>
            <article className="grid gap-4 py-5 sm:py-6 md:grid-cols-[1fr_auto] md:gap-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    {role.company}
                  </h3>
                  <span className="text-[0.8125rem] font-medium text-accent-text sm:text-[0.9375rem]">
                    {role.title}
                  </span>
                  {role.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-text">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-fg-muted sm:text-[0.9375rem]">
                  {role.summary}
                </p>

              </div>

              <div className="flex shrink-0 flex-col gap-1.5 md:items-end">
                <span className="font-mono text-[11.5px] whitespace-nowrap text-fg-muted">
                  {role.period}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-fg-subtle">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {role.location}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
