import Image from "next/image";
import { MapPin } from "lucide-react";

import { experience } from "@/config/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="experience"
      divided
      className="highlight-band border-t-accent/35 py-10! md:py-12! lg:py-16!"
    >
      <Reveal>
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          Production ownership, not just tickets.
        </h2>
      </Reveal>

      <div className="relative mt-6">
        {/* Rail */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:block"
        />

        <ol className="space-y-6">
          {experience.map((company, i) => (
            <Reveal as="li" key={company.id} delay={0.06 * i}>
              <div className="relative sm:pl-10">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] items-center justify-center sm:flex"
                >
                  <span className="absolute h-[15px] w-[15px] rounded-full border border-accent/50 bg-bg" />
                  <span className="relative h-[7px] w-[7px] rounded-full bg-fg-subtle" />
                </span>

                <article className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-border-strong hover:bg-surface-2 sm:p-[22px]">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 shrink-0 items-center rounded-lg border border-border bg-bg-elevated px-2">
                        <Image
                          src={company.logo}
                          alt={`${company.company} logo`}
                          width={88}
                          height={20}
                          unoptimized
                          className={cn(
                            "h-auto w-[88px] object-contain",
                            company.id === "bharatpe"
                              ? "dark:brightness-0 dark:invert"
                              : "[.light_&]:brightness-0",
                          )}
                        />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                            {company.company}
                          </h3>
                          <span className="text-sm text-accent-text">
                            {company.designation}
                          </span>
                        </div>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-subtle">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {company.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {company.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-text">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          Current
                        </span>
                      ) : null}
                      <span className="font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-fg-muted">
                        {company.period}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-fg-muted">
                    {company.summary}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {company.contributions.map(({ label, description }) => (
                      <li key={label} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent/80"
                        />
                        <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                          <span className="font-semibold text-fg">{label}</span>
                          <span aria-hidden="true"> — </span>
                          {description}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
                    <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                      Stack
                    </span>
                    {company.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-[11px] text-fg-muted"
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
