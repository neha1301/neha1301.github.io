import { MapPin } from "lucide-react";

import { experience } from "@/config/experience";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience" divided>
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title={
          <>
            Production,{" "}
            <span className="text-accent-text italic">owned end to end.</span>
          </>
        }
        description="From release automation to production ownership, building and operating reliable Kubernetes platforms through automation, observability, and incident response."
      />

      <ol className="relative mt-14 grid gap-4">
        {experience.map((role, i) => (
          <Reveal as="li" key={role.id} delay={0.05 * i} className="relative">
            <article
              className={cn(
                "p-7 transition-all duration-200 hover:-translate-y-0.5 sm:p-9",
                role.current ? "panel panel-accent" : "panel",
              )}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4 lg:border-r lg:border-border lg:pr-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                      {role.period}
                    </span>
                    {role.current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                        />
                        Now
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 font-display text-[2.25rem] leading-[1.02] tracking-[-0.02em] text-fg">
                    {role.company}
                    <span className="sr-only"> — {role.title}</span>
                  </h3>
                  <p className="mt-3 text-[1.125rem] font-medium text-accent-text">
                    {role.title}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-[0.875rem] text-fg-subtle">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {role.location}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-[1.0625rem] leading-[1.7] text-fg">
                    {role.summary}
                  </p>

                  <ul className="mt-7 space-y-5">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7rem] h-px w-5 shrink-0 bg-accent/70"
                        />
                        <span className="text-[1rem] leading-[1.7] text-fg-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-border pt-5">
                    <p className="kicker text-fg-subtle">Stack</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                      {role.stack.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
