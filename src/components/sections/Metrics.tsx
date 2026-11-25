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

        <div className="mb-8 flex items-center gap-3">
          <span className="kicker text-accent-text">Measured impact</span>
          <span aria-hidden="true" className="h-px w-full bg-border" />
        </div>

        <dl className="panel grid grid-cols-2 divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="min-w-0 border-b border-border px-5 py-6 last:border-b-0 sm:px-6 lg:border-b-0 lg:py-7"
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="font-display block text-[2.75rem] leading-none tracking-[-0.03em] text-fg sm:text-[3rem]">
                  {metric.value}
                </span>
                <span className="mt-3 block text-[0.9375rem] leading-snug text-fg-muted">
                  {metric.label}
                </span>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
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
