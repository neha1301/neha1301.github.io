import { Activity, Boxes, Cloud, Terminal, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { skillGroups } from "@/config/skills";
import type { SkillDomain } from "@/config/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

const markers: Record<SkillDomain, LucideIcon> = {
  cloud: Cloud,
  kubernetes: Boxes,
  iac: Workflow,
  observability: Activity,
  programming: Terminal,
};

export function TechStack() {
  return (
    <Section id="skills" divided>
      <SectionHeading
        index="05"
        eyebrow="Technical expertise"
        title="The tools behind the work."
        description="Technologies I use to build, automate, and operate reliable production infrastructure."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        {skillGroups.map((group, gi) => {
          const Marker = markers[group.marker];

          return (
            <Reveal
              key={group.id}
              delay={0.05 * gi}
              className="border-b border-border last:border-b-0"
            >
              <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[210px_1fr] md:gap-7">
                <div className="flex items-center gap-3 md:items-start">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-bg-elevated text-fg-muted">
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
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-2 py-1 text-[11.5px] font-medium text-fg transition-colors duration-200 hover:border-border-strong hover:bg-surface-2">
                        <TechIcon
                          name={item.icon}
                          size="sm"
                          className="h-3.5 w-3.5 rounded-[0.2rem] border-0 bg-transparent"
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
