import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Boxes,
  Layers,
  Lightbulb,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { projects } from "@/config/projects";
import type { Project } from "@/config/projects";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

function CaseCard({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "h-full rounded-2xl border border-border bg-surface p-6 sm:p-7",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent-soft text-accent">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          {label}
        </h3>
      </div>
      <div className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
        {children}
      </div>
    </article>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Featured project
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
              {project.category}
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-fg-muted">
              {project.year}
            </span>
            {project.repository.live ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Open source
              </span>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight text-fg sm:text-4xl md:text-[2.75rem]">
              {project.name}
            </h2>
            <div className="shrink-0 sm:pt-1.5">
              <a
                href={project.repository.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-[0.8125rem] font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <GithubIcon className="h-4 w-4 fill-current" />
                {project.repository.live
                  ? "View repository"
                  : project.repository.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-fg-muted">
            {project.tagline}
          </p>
        </Reveal>
      </div>

      {/* Architecture */}
      <Reveal delay={0.12} className="mt-8">
        <ArchitectureFlow project={project} />
      </Reveal>

      {/* Case study body */}
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <CaseCard icon={Target} label="Problem">
              {project.problem}
            </CaseCard>
          </Reveal>
          <Reveal delay={0.06} className="h-full">
            <CaseCard icon={Lightbulb} label="Solution">
              {project.solution}
            </CaseCard>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <CaseCard icon={Boxes} label="Technology stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item.name}>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-2.5 py-1.5 text-[12.5px] font-medium text-fg-muted">
                      <TechIcon
                        name={item.icon}
                        size="sm"
                        className="h-5 w-5 rounded-[0.3rem] border-0 bg-transparent"
                      />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CaseCard>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <CaseCard icon={Layers} label="Key capabilities">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2.5 rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-[0.8125rem] leading-snug text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </CaseCard>
          </Reveal>
        </div>

        {project.tradeoffs?.length ? (
          <Reveal delay={0.08}>
            <CaseCard icon={Scale} label="Design trade-offs">
              <ul className="space-y-3">
                {project.tradeoffs.map((tradeoff) => (
                  <li key={tradeoff} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                    />
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </CaseCard>
          </Reveal>
        ) : null}

        <Reveal delay={0.1}>
          <article className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.09] via-surface to-surface p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent-soft text-accent">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Results &amp; impact
              </h3>
            </div>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {project.impact.metric ? (
                  <p className="flex items-baseline gap-2 text-[2.5rem] font-semibold leading-none tracking-tight text-fg sm:text-[3rem]">
                    <AnimatedCounter
                      value={project.impact.metric.value}
                      prefix={project.impact.metric.prefix}
                      suffix={project.impact.metric.suffix}
                    />
                    <span className="text-[0.9375rem] font-medium text-fg-muted">
                      {project.impact.metric.label}
                    </span>
                  </p>
                ) : (
                  <p className="text-[2rem] font-semibold leading-tight tracking-tight text-fg">
                    {project.impact.headline}
                  </p>
                )}
                <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-fg-muted">
                  {project.impact.description}
                </p>
              </div>

              {project.impact.detail ? (
                <div className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-bg-elevated px-3.5 py-2.5 text-[0.75rem] text-fg-muted sm:max-w-xs">
                  <Zap
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {project.impact.detail}
                </div>
              ) : null}
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}

function ProjectSummary({ project }: { project: Project }) {
  const metric = project.impact.metric;

  return (
    <Reveal className="h-full">
      <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong hover:bg-surface-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[10.5px] text-fg-muted">
            {project.category}
          </span>
          <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[10.5px] text-fg-muted">
            {project.year}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-fg-muted">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item.name}>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-2 py-1 text-[11.5px] text-fg-muted">
                <TechIcon
                  name={item.icon}
                  size="sm"
                  className="h-4 w-4 rounded-[0.2rem] border-0 bg-transparent"
                />
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-border pt-4">
          <p className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold leading-none text-fg">
              {metric
                ? `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`
                : project.impact.headline}
            </span>
            <span className="text-[11.5px] text-fg-subtle">
              {metric?.label}
            </span>
          </p>
          <a
            href={project.repository.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-fg-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="h-3.5 w-3.5 fill-current" />
            Repository
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedProject() {
  return (
    <Section id="project" divided className="relative overflow-hidden">
      {/* Prominence glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
      >
        <div className="absolute left-1/2 top-[-240px] h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_70%)]" />
      </div>

      <SectionHeading
        index="06"
        eyebrow="Projects"
        title="Open-source engineering."
        description="Two public tools built for 3 a.m. problems: one explains why a Kubernetes workload failed, the other turns Alertmanager noise into one actionable Slack message."
      />

      <div className="mt-10">
        <ProjectCaseStudy project={projects[0]} />

        {projects.length > 1 ? (
          <div className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              More work
            </h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {projects.slice(1).map((project) => (
                <ProjectSummary key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
