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
        title="Production ownership, not just tickets."
        description="From release automation to production ownership, building and operating reliable Kubernetes platforms through automation, observability, and incident response."
      />

      <ol className="mt-14 border-t border-border">
        {experience.map((role, i) => (
          <Reveal
            as="li"
            key={role.id}
            delay={0.05 * i}
            className={cn(
              "border-b border-border py-10 sm:py-12",
              role.current &&
                "bg-gradient-to-r from-accent/[0.05] via-transparent to-transparent",
            )}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
              <div
                className={cn(
                  "border-l pl-6 lg:col-span-4",
                  role.current ? "border-accent/70" : "border-border",
                )}
              >
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent-text">
                  {role.period}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-[1.75rem]">
                  {role.company}
                  <span className="sr-only"> — {role.title}</span>
                </h3>
                <p className="mt-2 text-[1.125rem] font-medium text-accent-text">
                  {role.title}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-[0.875rem] text-fg-subtle">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {role.location}
                </p>
                {role.current ? (
                  <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    Current role
                  </p>
                ) : null}
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                    Stack
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {role.stack.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
