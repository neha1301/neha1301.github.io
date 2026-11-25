import { skillGroups } from "@/config/skills";
import type { SkillGroup } from "@/config/skills";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

const depthBars: Record<SkillGroup["marker"], number> = {
  daily: 3,
  working: 2,
  familiar: 1,
};

export function TechStack() {
  return (
    <Section id="skills" divided className="bg-bg-elevated/40">
      <SectionHeading
        index="02"
        eyebrow="Technical expertise"
        title={
          <>
            Depth{" "}
            <span className="text-accent-text italic">where it counts.</span>
          </>
        }
        description="Grouped by how deeply I use them, from daily production work to fundamentals."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.id} delay={0.05 * gi} className="h-full">
            <article className="panel group h-full p-7 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="kicker text-accent-text">
                    0{gi + 1} / {group.marker}
                  </p>
                  <h3 className="mt-4 font-display text-[1.875rem] leading-[1.08] text-fg">
                    {group.title}
                  </h3>
                </div>
                <span aria-hidden="true" className="mt-1 flex gap-1">
                  {[1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className={cn(
                        "h-4 w-1 rounded-full",
                        bar <= depthBars[group.marker]
                          ? "bg-accent"
                          : "bg-border-strong",
                      )}
                    />
                  ))}
                </span>
              </div>

              <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-subtle">
                {group.blurb}
              </p>

              <ul className="mt-7 grid grid-cols-1 gap-x-5 gap-y-3 border-t border-border pt-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2.5 text-[0.9375rem] font-medium",
                        group.marker === "daily"
                          ? "text-fg"
                          : "text-fg-muted",
                      )}
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-surface-2/70">
                        <TechIcon
                          name={item.icon}
                          size="sm"
                          className="h-4 w-4 rounded-[0.2rem] border-0 bg-transparent"
                        />
                      </span>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
