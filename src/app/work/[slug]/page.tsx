import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies } from "@/config/caseStudies";
import type {
  CaseStudyFlowNode,
  CaseStudySection,
} from "@/config/caseStudies";
import { Section } from "@/components/ui/Section";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return { title: "Case study not found" };

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/work/${study.slug}/` },
  };
}

function Flow({ nodes, caption }: { nodes: CaseStudyFlowNode[]; caption: string }) {
  return (
    <figure className="mt-8 border-y border-border py-6">
      <figcaption className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {caption}
      </figcaption>
      <ol className="mt-4">
        {nodes.map((node, i) => (
          <li
            key={node.label}
            className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-3 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="pt-0.5 font-mono text-[10px] text-fg-subtle"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-medium leading-snug text-fg">
                {node.label}
              </p>
              <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                {node.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ArticleSection({ section }: { section: CaseStudySection }) {
  return (
    <section className="mt-9" aria-labelledby={section.id}>
      <h2
        id={section.id}
        className="text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl"
      >
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-3 text-[0.9375rem] leading-[1.8] text-fg-muted sm:text-base"
        >
          {paragraph}
        </p>
      ))}
      {section.bullets ? (
        <ul className="mt-4 space-y-2 border-l border-border pl-4">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="text-[0.9375rem] leading-[1.75] text-fg-muted sm:text-base"
            >
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) notFound();

  const { article } = study;

  return (
    <Section id="case-study" divided className="py-10! md:py-12! lg:py-16!">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span aria-hidden="true">←</span>
          Selected Engineering Work
        </Link>

        <header className="mt-8 border-b border-border pb-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-text">
            {study.category}
          </span>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
            {study.description}
          </p>
          <p className="mt-5 font-mono text-[11px] leading-relaxed text-fg-subtle">
            {article.scope.join(" · ")}
          </p>
        </header>

        <p className="mt-7 text-[1.0625rem] leading-[1.75] text-fg">
          {article.summary}
        </p>

        <Flow nodes={article.flow.nodes} caption={article.flow.caption} />

        {article.sections.map((section) => (
          <ArticleSection key={section.id} section={section} />
        ))}

        <section className="mt-9" aria-labelledby="comparison">
          <h2
            id="comparison"
            className="text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl"
          >
            {article.comparison.heading}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.8] text-fg-muted sm:text-base">
            {article.comparison.caption}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-strong">
                  {article.comparison.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="py-3 pr-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-subtle"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {article.comparison.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-b-0">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`py-3 pr-4 align-top leading-relaxed ${
                          i === 0 ? "font-medium text-fg" : "text-fg-muted"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-10 border-t border-border pt-6">
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 text-sm text-accent-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span aria-hidden="true">←</span>
            Back to Selected Engineering Work
          </Link>
        </footer>
      </article>
    </Section>
  );
}
