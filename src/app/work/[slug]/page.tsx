import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { caseStudies } from "@/config/caseStudies";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </h2>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">
        {text}
      </p>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) notFound();

  return (
    <Section
      id="case-study"
      divided
      className="py-10! md:py-12! lg:py-16!"
    >
      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Selected Engineering Work
      </Link>

      <Reveal className="mt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
          {study.category}
        </span>
        <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          {study.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
          {study.problem}
        </p>
      </Reveal>

      {study.metrics ? (
        <Reveal className="mt-6" delay={0.04}>
          <dl className="grid gap-3 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block text-lg font-semibold leading-tight text-fg">
                    {metric.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-fg-subtle">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}

      <Reveal className="mt-8" delay={0.08}>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          System architecture
        </h2>
        <ol
          aria-label={`${study.title} architecture`}
          className="mt-4 flex flex-col"
        >
          {study.architecture.map((node, i) => (
            <li key={node.id} className="flex flex-col">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <TechIcon
                  name={node.icon}
                  size="sm"
                  className="mt-0.5 h-6 w-6 shrink-0 rounded-md"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug text-fg">
                    {node.label}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-fg-muted">
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
      </Reveal>

      <Reveal className="mt-8" delay={0.12}>
        <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <DetailBlock label="Technical challenge" text={study.challenge} />
          <DetailBlock label="Design decision" text={study.decision} />
          <DetailBlock label="Trade-off" text={study.tradeoff} />
          <DetailBlock label="Outcome" text={study.outcome} />
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={0.16}>
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-1.5 rounded text-sm text-accent-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Selected Engineering Work
        </Link>
      </Reveal>
    </Section>
  );
}
