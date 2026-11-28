import { Bug, Server, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

/**
 * Engineering impact — four verified production outcomes.
 *
 * Compact cards with quiet surfaces, hairline borders and restrained accents.
 * No numbering, subtitle, gradients or oversized display type.
 */
const metrics: {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    id: "environments",
    value: "30+",
    label: "Zero-downtime upgrades",
    icon: Server,
  },
  {
    id: "no-escalation",
    value: "95%",
    label: "Incidents without escalation",
    icon: ShieldCheck,
  },
  {
    id: "onboarding",
    value: "60%",
    label: "Faster application onboarding",
    icon: Zap,
  },
  {
    id: "debugging",
    value: "~70%",
    label: "Less node debugging time",
    icon: Bug,
  },
];

export function Metrics() {
  return (
    <section
      id="impact"
      aria-label="Engineering impact"
      className="scroll-mt-24 -mt-6 px-5 pb-8 pt-6 sm:-mt-8 sm:px-8 sm:pb-10 sm:pt-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            Engineering Impact
          </h2>
        </Reveal>

        <ul
          aria-label="Verified engineering impact metrics"
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.id}
              delay={0.05 * i}
              y={10}
              className="h-full"
            >
              <article className="flex h-full min-h-[136px] flex-col rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong sm:p-5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-accent/20 bg-accent-soft text-accent">
                  <metric.icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <div className="mt-auto pt-5">
                  <p className="text-[1.85rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[2rem]">
                    {metric.value}
                  </p>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-fg-muted">
                    {metric.label}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
