import { skillGroups } from "@/config/skills";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

export function TechStack() {
  return (
    <Section id="skills" divided className="bg-bg-elevated/40">
      <SectionHeading
        index="02"
        eyebrow="Technical expertise"
        title="The tools behind the work."
        description="Grouped by how deeply I use them, from daily production work to fundamentals."
      />

      <div className="mt-14 border-t border-border">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.id}
            delay={0.05 * gi}
            className="grid gap-5 border-b border-border py-9 md:grid-cols-[240px_1fr] md:gap-10"
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent-text">
                0{gi + 1} / {group.marker}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-fg">
                {group.title}
              </h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-fg-subtle">
                {group.blurb}
              </p>
            </div>

            <ul className="flex flex-wrap gap-x-7 gap-y-4">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2.5 text-[1rem] font-medium",
                      group.marker === "daily" ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    <TechIcon
                      name={item.icon}
                      size="sm"
                      className="h-5 w-5 rounded-[0.2rem] border-0 bg-transparent"
                    />
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
