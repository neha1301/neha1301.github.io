import { ArrowUpRight, Sparkles } from "lucide-react";

import { projects } from "@/config/projects";
import type { Project } from "@/config/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

function RepositoryLink({ project }: { project: Project }) {
  return (
    <a
      href={project.repository.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-7 inline-flex items-center gap-2 border-b border-border-strong pb-1 text-[0.9375rem] font-medium text-fg transition-colors hover:border-accent hover:text-accent-text"
    >
      <GithubIcon className="h-4 w-4 fill-current" aria-hidden="true" />
      {project.repository.live
        ? "Read the code on GitHub"
        : project.repository.label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  const metric = project.impact.metric;

  return (
    <div>
      <Reveal>
        <div className="panel panel-accent overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="p-7 sm:p-10 lg:col-span-7 lg:p-12">
              <p className="inline-flex items-center gap-2 kicker text-accent-text">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Case study 01 · {project.year} · {project.category}
              </p>
              <h3 className="mt-7 font-display text-[3rem] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[4.5rem] lg:text-[5rem]">
                {project.name}
              </h3>
              <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.7] text-fg-muted sm:text-[1.25rem]">
                {project.tagline}
              </p>
              <RepositoryLink project={project} />
            </div>

            <div className="border-t border-border px-7 pb-9 pt-8 sm:px-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-12 lg:py-12">
              <p className="kicker text-fg-subtle">The outcome</p>
              {metric ? (
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    className="font-display text-[5rem] leading-[0.85] tracking-[-0.045em] text-fg sm:text-[6rem]"
                  />
                  <span className="max-w-[15rem] text-[1rem] leading-snug text-fg-muted">
                    {metric.label}
                  </span>
                </p>
              ) : (
                <p className="mt-6 font-display text-[2.5rem] leading-[1.05] text-fg">
                  {project.impact.headline}
                </p>
              )}
              <p className="mt-6 text-[1rem] leading-[1.7] text-fg-muted">
                {project.impact.description}
              </p>
              {project.impact.detail ? (
                <p className="mt-6 border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {project.impact.detail}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06} className="mt-6">
        <ArchitectureFlow project={project} />
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Reveal>
          <article className="panel h-full p-7 sm:p-9">
            <p className="kicker text-accent-text">01 / The problem</p>
            <h4 className="mt-5 font-display text-[1.875rem] leading-[1.08] text-fg">
              Why it existed
            </h4>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-fg-muted">
              {project.problem}
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.06}>
          <article className="panel h-full p-7 sm:p-9">
            <p className="kicker text-accent-text">02 / The fix</p>
            <h4 className="mt-5 font-display text-[1.875rem] leading-[1.08] text-fg">
              How it works
            </h4>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-fg-muted">
              {project.solution}
            </p>
          </article>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal>
          <article className="panel h-full p-7 sm:p-9">
            <p className="kicker text-fg-subtle">Stack</p>
            <p className="mt-5 text-[1rem] leading-[1.8] text-fg-muted">
              {project.stack.map((item) => item.name).join(" · ")}
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.06}>
          <article className="panel h-full p-7 sm:p-9">
            <p className="kicker text-fg-subtle">Capabilities</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted"
                >
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      {project.tradeoffs?.length ? (
        <Reveal delay={0.08}>
          <article className="mt-4 rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-7 sm:p-9">
            <p className="kicker text-accent-2">Design trade-offs</p>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {project.tradeoffs.map((tradeoff) => (
                <li
                  key={tradeoff}
                  className="text-[0.9375rem] leading-[1.75] text-fg-muted"
                >
                  {tradeoff}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ) : null}
    </div>
  );
}

function ProjectSummary({ project }: { project: Project }) {
  const metric = project.impact.metric;

  return (
    <Reveal className="h-full">
      <article className="panel group h-full p-7 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong sm:p-9">
        <div className="flex items-center justify-between gap-3">
          <p className="kicker text-fg-subtle">
            {project.category} · {project.year}
          </p>
          <span className="font-mono text-[11px] text-fg-subtle">02</span>
        </div>
        <h4 className="mt-6 font-display text-[2rem] leading-[1.05] text-fg">
          {project.name}
        </h4>
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-fg-muted">
          {project.tagline}
        </p>
        <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-border pt-6">
          <span className="font-display text-[2.5rem] leading-none tracking-[-0.03em] text-fg">
            {metric
              ? `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`
              : project.impact.headline}
          </span>
          <span className="text-[0.875rem] text-fg-muted">{metric?.label}</span>
        </div>
        <RepositoryLink project={project} />
      </article>
    </Reveal>
  );
}

export function FeaturedProject() {
  return (
    <Section id="project" divided className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
      >
        <div className="absolute left-1/2 top-[-240px] h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_70%)]" />
      </div>

      <SectionHeading
        index="04"
        eyebrow="Selected work"
        title={
          <>
            Tools for the{" "}
            <span className="text-accent-text italic">3 a.m. page.</span>
          </>
        }
        description="Two production tools: one explains why a Kubernetes workload failed, the other turns Alertmanager noise into a single actionable message. Both designed around what an engineer needs at 3 a.m."
      />

      <div className="mt-14">
        <ProjectCaseStudy project={projects[0]} />

        {projects.length > 1 ? (
          <div className="mt-12">
            <div className="flex items-center gap-4">
              <span className="kicker text-accent-text">More work</span>
              <span aria-hidden="true" className="h-px w-full bg-border" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
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
