import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Engineering impact — four verified production outcomes.
 *
 * A quiet editorial band: prominent heading, accent figures, hairline rules
 * and generous spacing. No cards, icons or gradients.
 */
const metrics = [
  {
    id: "environments",
    value: "30+",
    label: "Zero-downtime upgrades",
  },
  {
    id: "no-escalation",
    value: "95%",
    label: "Incidents without escalation",
  },
  {
    id: "onboarding",
    value: "60%",
    label: "Faster application onboarding",
  },
  {
    id: "debugging",
    value: "~70%",
    label: "Less node debugging time",
  },
];

export function Metrics() {
  return (
    <section id="impact" aria-label="Engineering impact" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12">
        <SectionHeading
          index="01"
          eyebrow="Engineering Impact"
          title="What changed in production."
          description="Four verified outcomes from platform work, automation and diagnostics."
          className="gap-3"
        />

        <ul
          aria-label="Verified engineering impact metrics"
          className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/60 pt-8 lg:grid-cols-4 lg:gap-x-0"
        >
          {metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.id}
              delay={0.05 * i}
              y={10}
              className={cn(
                "min-w-0 lg:px-8",
                i > 0 && "lg:border-l lg:border-border/70",
                i === 0 && "lg:pl-0",
                i === metrics.length - 1 && "lg:pr-0",
              )}
            >
              <span className="tabular-nums block text-[2.75rem] font-semibold leading-none tracking-[-0.045em] text-accent-text sm:text-[3.25rem]">
                {metric.value}
              </span>
              <span className="mt-3 block text-[0.875rem] font-medium leading-snug text-fg">
                {metric.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
