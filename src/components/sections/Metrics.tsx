import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Engineering impact — four verified production outcomes.
 *
 * Presented as an editorial strip rather than a dashboard: large numbers,
 * quiet labels, thin rules and generous space. No cards, icons or gradients.
 */
const metrics = [
  {
    id: "environments",
    value: "30+",
    label: "Production environments",
    detail: "Zero-downtime Kubernetes upgrades",
  },
  {
    id: "no-escalation",
    value: "95%",
    label: "Incidents resolved",
    detail: "Without escalation",
  },
  {
    id: "onboarding",
    value: "60%",
    label: "Faster onboarding",
    detail: "Python automation pipeline",
  },
  {
    id: "debugging",
    value: "~70%",
    label: "Less debugging time",
    detail: "Single-pass node diagnostics",
  },
];

export function Metrics() {
  return (
    <section
      id="impact"
      aria-label="Engineering impact"
      className="border-y border-border bg-bg-elevated"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <SectionHeading
          index="01"
          eyebrow="Engineering Impact"
          title="What changed in production."
          description="Four outcomes from platform work, automation and diagnostics."
          className="gap-3"
        />

        <ul
          aria-label="Verified engineering impact metrics"
          className="mt-10 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.id}
              delay={0.05 * i}
              className={cn(
                "min-w-0 border-b border-border py-7 sm:px-6 lg:border-b-0 lg:px-8 lg:py-2",
                i > 0 && "lg:border-l lg:border-border",
                i === 0 && "lg:pl-0",
                i === metrics.length - 1 && "lg:pr-0",
              )}
            >
              <div
                aria-hidden="true"
                className="flex items-baseline justify-between gap-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-border-strong" />
              </div>

              <span className="tabular-nums mt-5 block text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[3.25rem]">
                {metric.value}
              </span>
              <span
                aria-hidden="true"
                className="mt-5 block h-px w-8 bg-accent/70"
              />
              <span className="mt-4 block text-[0.9375rem] font-medium leading-snug text-fg">
                {metric.label}
              </span>
              <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-fg-muted">
                {metric.detail}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
