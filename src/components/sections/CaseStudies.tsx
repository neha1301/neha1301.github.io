import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { caseStudies } from "@/config/caseStudies";
import type { CaseStudy } from "@/config/caseStudies";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Reveal className="h-full" delay={0.06 * index}>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong sm:p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
          {study.category}
        </span>

        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-fg">
          {study.title}
        </h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-fg-muted">
          {study.problem}
        </p>

        <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-subtle">
          {study.technologies.join(" · ")}
        </p>

        <Link
          href={`/work/${study.slug}/`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-medium text-accent-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Explore Case Study
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </article>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <Section id="case-studies" divided>
      <Reveal>
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          Selected Engineering Work.
        </h2>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
