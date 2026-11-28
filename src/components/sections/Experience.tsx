import { MapPin } from "lucide-react";

import { experience } from "@/config/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      divided
      className="highlight-band border-t-accent/35"
    >
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Production ownership, not just tickets."
        description="From release automation to production ownership — Kubernetes platforms, observability and incident response."
        emphasis
      />

      <div className="relative mt-10">
        {/* Rail */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:block"
        />

        <ol className="space-y-8">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.id} delay={0.06 * i}>
              <div className="relative sm:pl-10">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] items-center justify-center sm:flex"
                >
                  <span className="absolute h-[15px] w-[15px] rounded-full border border-accent/50 bg-bg" />
                  {role.current ? (
                    <span className="relative h-[7px] w-[7px] rounded-full bg-accent" />
                  ) : (
                    <span className="relative h-[7px] w-[7px] rounded-full bg-fg-subtle" />
                  )}
                </span>

                <article className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-strong hover:bg-surface-2 sm:p-7">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                          {role.company}
                          <span className="sr-only"> — {role.title}</span>
                        </h3>
                        {role.current ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-base font-semibold text-accent-text sm:text-lg">
                        {role.title}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-fg-subtle">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {role.location}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg border border-border bg-bg-elevated px-3 py-1.5 font-mono text-[13px] whitespace-nowrap text-fg-muted">
                      {role.period}
                    </span>
                  </div>

                  {/* Ownership statement */}
                  <p className="mt-5 border-l-2 border-accent/50 pl-4 text-base leading-relaxed text-fg sm:text-lg">
                    {role.summary}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-border pt-5">
                    <span className="mr-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
                      Stack
                    </span>
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-bg-elevated px-2 py-1 text-xs text-fg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
