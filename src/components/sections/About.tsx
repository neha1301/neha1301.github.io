import { Cloud, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const focusAreas: {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  keywords: string[];
}[] = [
  {
    id: "reliability",
    title: "Reliability Engineering",
    icon: ShieldCheck,
    description:
      "Signals designed with the service, so alerts stay quiet until they matter.",
    keywords: ["Alerting", "SLOs", "RCA", "Observability"],
  },
  {
    id: "cloud",
    title: "Cloud & Platform Infrastructure",
    icon: Cloud,
    description:
      "Reproducible Kubernetes environments with upgrades that don't wake anyone up.",
    keywords: ["Terraform", "EKS", "Helm", "GitOps"],
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Tooling",
    icon: Wrench,
    description: "One readable answer instead of a multi-command investigation.",
    keywords: ["Python", "Kubernetes API", "Automation"],
  },
];

export function About() {
  return (
    <Section id="about" divided className="border-t-accent/35">
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-accent">
          02
        </span>
        <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          About
        </span>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          Own the platform, not just the pager.
        </h2>
      </Reveal>

      <div className="mt-5 max-w-3xl">
        <Reveal delay={0.08}>
          <p className="text-[0.9375rem] leading-relaxed text-fg sm:text-base">
            I&apos;m an SRE and platform engineer who owns what happens after
            deploy — the Kubernetes platforms, infrastructure-as-code and
            alerting teams rely on in production. I treat reliability as a
            design problem: make environments reproducible, upgrades boring,
            and alerts worth waking up for.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
            When something breaks, I look for the smallest durable fix: remove a
            manual step, add validation before deploy, or turn a multi-command
            investigation into one clear answer. Observability belongs with the
            service that emits it, not bolted on as another dashboard.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, i) => {
          const Icon = area.icon;
          return (
            <Reveal key={area.id} delay={0.06 * i} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong sm:p-5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-accent/20 bg-accent-soft text-accent">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-base font-semibold leading-snug text-fg">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {area.description}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] leading-relaxed text-fg-subtle">
                  {area.keywords.join(" · ")}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
