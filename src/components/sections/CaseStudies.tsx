import { caseStudies } from "@/config/caseStudies";
import type { CaseStudy } from "@/config/caseStudies";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </h4>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg-muted">
        {text}
      </p>
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Reveal className="h-full" delay={0.06 * index}>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-muted">
            {study.category}
          </span>
          <span className="font-mono text-[10.5px] text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-fg">
          {study.title}
        </h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-fg-muted">
          {study.summary}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-border py-4">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-[0.9375rem] font-semibold leading-tight text-fg">
                  {metric.value}
                </span>
                <span className="mt-1 block text-[10.5px] leading-snug text-fg-subtle">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
            Architecture
          </h4>
          <ol
            aria-label={`${study.title} architecture`}
            className="mt-3 flex flex-col"
          >
            {study.architecture.map((node, i) => (
              <li key={node.id} className="flex flex-col">
                <div className="flex items-start gap-2.5 rounded-lg border border-border bg-bg-elevated px-3 py-2.5">
                  <TechIcon
                    name={node.icon}
                    size="sm"
                    className="mt-0.5 h-5 w-5 shrink-0 rounded-[0.3rem]"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] font-medium leading-snug text-fg">
                      {node.label}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-fg-muted">
                      {node.detail}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="ml-auto font-mono text-[10px] text-fg-subtle"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {i < study.architecture.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="mx-auto h-3 w-px bg-border"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 space-y-3">
          <DetailBlock label="Technical challenge" text={study.challenge} />
          <DetailBlock label="Design decision" text={study.decision} />
          <DetailBlock label="Trade-off" text={study.tradeoff} />
        </div>

        <p className="mt-auto border-t border-border pt-4 text-[0.8125rem] font-medium leading-relaxed text-fg">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
            Outcome
          </span>
          <span className="mt-1 block">{study.outcome}</span>
        </p>
      </article>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <Section id="case-studies" divided>
      <SectionHeading
        index="04"
        eyebrow="Case studies"
        title="Decisions behind the uptime."
        description="Three production problems, the architecture around them, and the trade-offs that shaped the fix."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
