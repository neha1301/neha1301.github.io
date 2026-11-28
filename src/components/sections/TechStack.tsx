import { Activity, Cloud, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { skillGroups } from "@/config/skills";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

const markers: Record<string, LucideIcon> = {
  platform: Cloud,
  automation: Workflow,
  observability: Activity,
};

export function TechStack() {
  return (
    <Section id="skills" divided>
      <SectionHeading
        eyebrow="Technical expertise"
        title="The tools behind the work."
        description="Grouped by engineering domain — platform, automation, observability and the data layer."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        {skillGroups.map((group, gi) => {
          const Marker = markers[group.marker] ?? Cloud;
          const primary = group.marker === "platform";

          return (
            <Reveal
              key={group.id}
              delay={0.05 * gi}
              className="border-b border-border last:border-b-0"
            >
              <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-[190px_1fr] md:gap-8">
                <div className="flex items-center gap-3 md:items-start">
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg border",
                      primary
                        ? "border-accent/30 bg-accent-soft text-accent"
                        : "border-border bg-bg-elevated text-fg-muted",
                    )}
                  >
                    <Marker className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold leading-snug text-fg">
                      {group.title}
                    </h3>
                    <p className="mt-0.5 text-[0.75rem] leading-snug text-fg-subtle">
                      {group.blurb}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[12px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg",
                          primary
                            ? "border-accent/20 bg-accent-soft hover:border-accent/40"
                            : "border-border bg-bg-elevated hover:border-border-strong",
                        )}
                      >
                        <TechIcon
                          name={item.icon}
                          size="sm"
                          className="h-4 w-4 rounded-[0.2rem] border-0 bg-transparent"
                        />
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
