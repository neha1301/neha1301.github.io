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
      {/* Case-study hero — the loudest thing in this section. */}
      <Reveal>
        <div className="border-y border-border bg-bg-elevated">
          <div className="grid gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-14">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Featured case study · {project.year} · {project.category}
              </p>
              <h3 className="mt-6 text-[2.375rem] font-semibold leading-[1.04] tracking-[-0.04em] text-fg sm:text-[3.5rem]">
                {project.name}
              </h3>
              <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.7] text-fg-muted sm:text-[1.25rem]">
                {project.tagline}
              </p>
              <RepositoryLink project={project} />
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                What changed
              </p>
              {metric ? (
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    className="text-[4rem] font-semibold leading-none tracking-[-0.05em] text-fg sm:text-[5rem]"
                  />
                  <span className="max-w-[16rem] text-[1rem] leading-snug text-fg-muted">
                    {metric.label}
                  </span>
                </p>
              ) : (
                <p className="mt-5 text-[2rem] font-semibold leading-tight tracking-tight text-fg">
                  {project.impact.headline}
                </p>
              )}
              <p className="mt-6 text-[1rem] leading-[1.7] text-fg-muted">
                {project.impact.description}
              </p>
              {project.impact.detail ? (
                <p className="mt-5 border-l-2 border-accent/60 pl-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {project.impact.detail}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06} className="mt-14">
        <ArchitectureFlow project={project} />
      </Reveal>

      {/* Narrative — no boxes, just two clear columns. */}
      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
            01 / The problem
          </p>
          <h4 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
            Why it existed
          </h4>
          <p className="mt-4 text-[1.0625rem] leading-[1.8] text-fg-muted">
            {project.problem}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
            02 / The fix
          </p>
          <h4 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
            How it works
          </h4>
          <p className="mt-4 text-[1.0625rem] leading-[1.8] text-fg-muted">
            {project.solution}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 border-t border-border pt-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            Stack
          </p>
          <p className="mt-4 text-[1rem] leading-[1.8] text-fg-muted">
            {project.stack.map((item) => item.name).join(" · ")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            Capabilities
          </p>
          <ul className="mt-4 space-y-3">
            {project.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex gap-3 text-[1rem] leading-relaxed text-fg-muted"
              >
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {capability}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {project.tradeoffs?.length ? (
        <Reveal delay={0.08}>
          <div className="mt-14 border-l-2 border-accent-2/60 pl-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Design trade-offs
            </p>
            <ul className="mt-5 space-y-4">
              {project.tradeoffs.map((tradeoff) => (
                <li
                  key={tradeoff}
                  className="text-[0.9375rem] leading-[1.8] text-fg-muted"
                >
                  {tradeoff}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

function ProjectSummary({ project }: { project: Project }) {
  const metric = project.impact.metric;

  return (
    <Reveal>
      <article className="border-l border-border pl-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          {project.category} · {project.year}
        </p>
        <h4 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-fg">
          {project.name}
        </h4>
        <p className="mt-3 text-[0.9375rem] leading-[1.7] text-fg-muted">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-2xl font-semibold tracking-tight text-fg">
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
        title="Built for the 3 a.m. page."
        description="Two production tools: one explains why a Kubernetes workload failed, the other turns Alertmanager noise into a single actionable message. Both designed around what an engineer needs at 3 a.m."
      />

      <div className="mt-14">
        <ProjectCaseStudy project={projects[0]} />

        {projects.length > 1 ? (
          <div className="mt-14 border-t border-border pt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              More work
            </h3>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
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
