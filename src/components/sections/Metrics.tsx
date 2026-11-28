import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact impact strip — four verified production outcomes presented as a
 * continuation of the hero. No cards, outer borders, icons or gradients.
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
      <div className="mx-auto w-full max-w-6xl px-5 pt-4 sm:px-8 sm:pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-text">
            01 · Engineering Impact
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle sm:block">
            Verified production outcomes
          </p>
        </div>

        <ul
          aria-label="Verified engineering impact metrics"
          className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-0"
        >
          {metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.id}
              delay={0.04 * i}
              y={8}
              duration={0.4}
              className={cn(
                "min-w-0 lg:px-6 lg:py-1",
                i > 0 && "lg:border-l lg:border-border/70",
                i === 0 && "lg:pl-0",
                i === metrics.length - 1 && "lg:pr-0",
              )}
            >
              <span className="tabular-nums block text-[2.125rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[2.5rem]">
                {metric.value}
              </span>
              <span className="mt-2 block text-[0.8125rem] leading-snug text-fg-muted">
                {metric.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
