import { ArrowUpRight } from "lucide-react";

import { selectedWork } from "@/config/selectedWork";
import type { WorkItem } from "@/config/selectedWork";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Expandable } from "@/components/ui/Expandable";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ArchitectureFlow } from "./ArchitectureFlow";

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

function WorkDetail({ item }: { item: WorkItem }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <dl className="grid grid-cols-3 gap-3">
          {item.metrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-base font-semibold leading-tight text-fg sm:text-lg">
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
          <ArchitectureFlow nodes={item.architecture} />
        </div>
      </div>

      <div className="space-y-4">
        <DetailBlock label="Problem" text={item.challenge} />
        <DetailBlock label="Approach" text={item.decision} />
        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
            Trade-offs
          </h4>
          <ul className="mt-2 space-y-2">
            {item.tradeoffs.map((tradeoff) => (
              <li
                key={tradeoff}
                className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-fg-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                />
                {tradeoff}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-accent/25 bg-accent-soft px-3.5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
            Outcome
          </span>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg">
            {item.outcome}
          </p>
        </div>

        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-accent-text transition-colors hover:text-accent"
          >
            <GithubIcon className="h-3.5 w-3.5 fill-current" />
            {item.hrefLabel ?? "View repository"}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function SelectedWork() {
  return (
    <Section id="work" divided>
      <SectionHeading
        index="02"
        eyebrow="Projects"
        title="Systems built for production."
        description="Selected projects and architecture decisions. Tap a project to open the problem, approach, trade-offs and outcome."
        emphasis
      />

      <div className="mt-8 space-y-3">
        {selectedWork.map((item, i) => (
          <Reveal key={item.id} delay={0.05 * i}>
            <Expandable
              index={i}
              meta={item.meta}
              title={item.title}
              summary={item.summary}
              stack={item.stack}
            >
              <WorkDetail item={item} />
            </Expandable>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
