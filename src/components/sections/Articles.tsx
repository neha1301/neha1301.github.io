import { ArrowUpRight, BookOpen, CalendarDays, Tag } from "lucide-react";

import { articles, writingFallback, writingTopics } from "@/config/articles";
import { formatDate } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Articles() {
  return (
    <Section id="writing" divided>
      <SectionHeading
        eyebrow="Articles & Engineering Writing"
        title="Sharing what I learn."
        description="Notes from real production work — Kubernetes operations, observability, SRE practice, and applying AI to infrastructure debugging."
      />

      {articles.length > 0 ? (
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={0.06 * i}>
              <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2">
                <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 font-medium text-accent">
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-fg-subtle">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {formatDate(article.publishedAt)}
                  </span>
                  {article.readTime ? (
                    <span className="text-fg-subtle">· {article.readTime}</span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-fg">
                  {article.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-fg-muted">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent-text transition-colors hover:text-accent"
                >
                  Read Article
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        /* No published post URLs yet — point to LinkedIn instead of inventing. */
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-6 rounded-2xl border border-border bg-surface p-7 sm:p-9 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {writingFallback.headline}
              </span>
              <p className="mt-5 max-w-xl leading-relaxed text-fg-muted">
                {writingFallback.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {writingTopics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-lg border border-border bg-bg-elevated px-2.5 py-1.5 text-[12px] text-fg-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <Button
                href={writingFallback.ctaHref}
                variant="primary"
                size="lg"
                className="mt-7"
                iconRight={
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                }
              >
                {writingFallback.ctaLabel}
              </Button>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-xl border border-border bg-bg-elevated p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  Where to find it
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Platform and SRE write-ups",
                    "Observability and SLO practice",
                    "Kubernetes & Terraform deep dives",
                    "AI-assisted debugging write-ups",
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
                      />
                      <span className="text-[0.8125rem] leading-relaxed text-fg-muted">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-[0.75rem] leading-relaxed text-fg-subtle">
                  Individual post links are added to the articles configuration as
                  they publish.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
