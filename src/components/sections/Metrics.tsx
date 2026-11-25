/**
 * Scannable impact band.
 *
 * Every figure here is taken verbatim from the resume. No rounding, no
 * invented baselines — if a number is not verifiable it does not belong here.
 */
const metrics = [
  {
    id: "environments",
    value: "30+",
    label: "production environments upgraded",
    detail: "zero downtime",
  },
  {
    id: "no-escalation",
    value: "95%",
    label: "customer incidents resolved",
    detail: "without escalation",
  },
  {
    id: "onboarding",
    value: "60%",
    label: "faster application onboarding",
    detail: "Python pipeline",
  },
  {
    id: "debugging",
    value: "70%",
    label: "less node debugging time",
    detail: "single-pass diagnostics",
  },
  {
    id: "helm",
    value: "10+",
    label: "Helm charts maintained",
    detail: "in production",
  },
];

export function Metrics() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="border-y border-border bg-bg-elevated"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <h2 id="impact-heading" className="sr-only">
          Engineering impact
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.id} className="min-w-0">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[2.75rem]">
                  {metric.value}
                </span>
                <span className="mt-3 block text-[0.9375rem] leading-snug text-fg-muted">
                  {metric.label}
                </span>
                <span className="mt-1.5 block font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg-subtle">
                  {metric.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
