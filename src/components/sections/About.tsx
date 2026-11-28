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
      "Alerting and SLOs designed with the service, with incidents closed through root-cause analysis.",
    keywords: ["Alerting", "SLOs", "RCA", "Observability"],
  },
  {
    id: "cloud",
    title: "Cloud & Platform Infrastructure",
    icon: Cloud,
    description:
      "Infrastructure as code and Helm delivery for reproducible environments and zero-downtime upgrades.",
    keywords: ["Terraform", "EKS", "Helm", "GitOps"],
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Tooling",
    icon: Wrench,
    description:
      "Python and Kubernetes API tooling that consolidates diagnostics into one deterministic workflow.",
    keywords: ["Python", "Kubernetes API", "Automation"],
  },
];

export function About() {
  return (
    <Section
      id="about"
      divided
      className="border-t-accent/35 py-8! md:py-12! lg:py-14!"
    >
      <Reveal>
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          Own the platform, not just the pager.
        </h2>
      </Reveal>

      <div className="mt-5 max-w-3xl">
        <Reveal delay={0.08}>
          <p className="text-[0.9375rem] leading-relaxed text-fg sm:text-base">
            I focus on predictable platforms: infrastructure defined as code,
            deployments validated before release, and observability designed
            with the service.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
            When an alert fires, I trace it to the underlying condition, then
            remove the manual step or design gap that allowed it to escalate.
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
                <p className="mt-4 font-mono text-[11.5px] tracking-[0.08em] leading-relaxed text-fg-muted">
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
