import Image from "next/image";
import { MapPin } from "lucide-react";

import { experience } from "@/config/experience";
import type { ExperienceRole } from "@/config/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function RoleBlock({
  role,
  first,
}: {
  role: ExperienceRole;
  first: boolean;
}) {
  return (
    <div className={cn("mt-7", !first && "border-t border-border pt-7")}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
        <h4 className="text-base font-semibold text-fg sm:text-lg">
          {role.title}
        </h4>
        <div className="flex flex-wrap items-center gap-2.5">
          {role.current ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-text">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Current
            </span>
          ) : null}
          <span className="font-mono text-[12px] whitespace-nowrap text-fg-muted">
            {role.period}
          </span>
        </div>
      </div>

      {role.summary ? (
        <p className="mt-3 border-l-2 border-accent/50 pl-4 text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
          {role.summary}
        </p>
      ) : null}

      <ul className="mt-4 space-y-2.5">
        {role.highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
            />
            <span className="text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
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
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      divided
      className="highlight-band border-t-accent/35"
    >
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-accent">
          03
        </span>
        <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Experience
        </span>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          Production ownership, not just tickets.
        </h2>
      </Reveal>

      <div className="relative mt-8">
        {/* Rail */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:block"
        />

        <ol className="space-y-8">
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

                <article className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-strong hover:bg-surface-2 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <span className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border bg-bg-elevated px-2.5">
                      <Image
                        src={company.logo}
                        alt={`${company.company} logo`}
                        width={96}
                        height={22}
                        unoptimized
                        className={cn(
                          "h-auto w-24 object-contain",
                          company.id === "bharatpe"
                            ? "dark:brightness-0 dark:invert"
                            : "[.light_&]:brightness-0",
                        )}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                        {company.company}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-fg-subtle">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {company.location}
                      </p>
                    </div>
                  </div>

                  {company.roles.map((role, roleIndex) => (
                    <RoleBlock
                      key={role.id}
                      role={role}
                      first={roleIndex === 0}
                    />
                  ))}
                </article>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
