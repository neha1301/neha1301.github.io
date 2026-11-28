import { Activity, Cloud, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { skillGroups } from "@/config/skills";
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
        index="04"
        eyebrow="Skills"
        title="Technical capabilities."
        description="Grouped by engineering domain — no proficiency bars, just the tools used in the work above."
      />

      <div className="mt-8 divide-y divide-border border-y border-border">
        {skillGroups.map((group, gi) => {
          const Marker = markers[group.marker] ?? Cloud;

          return (
            <Reveal key={group.id} delay={0.05 * gi}>
              <div className="grid gap-3 py-5 md:grid-cols-[200px_1fr] md:gap-8">
                <div className="flex items-center gap-2.5">
                  <Marker
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <h3 className="text-[0.9375rem] font-semibold text-fg">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-2 py-1.5 text-[12px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg">
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
