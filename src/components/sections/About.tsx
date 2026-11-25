import { Cloud, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const focusAreas: {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
}[] = [
  {
    id: "reliability",
    title: "Reliability Engineering",
    icon: ShieldCheck,
    description:
      "Alerting that stays quiet until it matters, SLOs people actually use, and incidents closed with a root cause instead of a workaround.",
    points: [
      "Centralized alerting",
      "Incident response & RCA",
      "95% resolved without escalation",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platform Infrastructure",
    icon: Cloud,
    description:
      "Kubernetes and multi-cloud built from code. Environments that are cheap to create, safe to change, and boring to operate.",
    points: [
      "30+ environments, zero-downtime upgrades",
      "Terraform modules on AWS",
      "Helm & GitOps delivery",
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Tooling",
    icon: Wrench,
    description:
      "Tools that collapse a twenty-command investigation into one readable answer — deterministic where it can be, automated where it saves a page.",
    points: [
      "Node insight tool, ~70% faster triage",
      "Alert enrichment with cluster context",
      "Python + Kubernetes API",
    ],
  },
];

export function About() {
  return (
    <Section id="about" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index="01"
            eyebrow="About"
            title={
              <>
                Reliability is a{" "}
                <span className="text-accent-text italic">design choice.</span>
              </>
            }
            className="lg:sticky lg:top-28"
          />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-[1.75rem] leading-[1.3] tracking-[-0.02em] text-fg sm:text-[2.125rem]">
              I own systems after they ship — the alerting that wakes us up, the
              monitoring we trust, and the deployments that don&apos;t page
              anyone.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 border-l-2 border-accent pl-6">
              <p className="text-[1.0625rem] leading-[1.75] text-fg-muted">
                The last three years were spent deep in production Kubernetes:{" "}
                <span className="text-fg">30+ environments upgraded with zero
                downtime</span>,{" "}
                <span className="text-fg">95% of incidents resolved without
                escalation</span>, and a Kubernetes v1.32 admission policy that
                rejects bad deploys before they land.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-fg-muted">
              I&apos;d rather remove a manual step than get faster at doing it.
              A Python onboarding pipeline cut onboarding time by 60%,
              Terraform modules made new environments reproducible, and Karpenter
              kept node cost down without starving workloads.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 text-[1.0625rem] leading-[1.75] text-fg-muted">
              The current focus is quieter on-call shifts: consolidating alerting
              across 5–10 services and moving the monitoring stack from paid
              tooling to open source. The same instinct produced a node-level
              debugger that turns OOMKilled and pressure signals into a ranked
              root cause, and a FastAPI service that enriches Alertmanager alerts
              so one Slack message carries the whole story.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {focusAreas.map((area, i) => {
          const Icon = area.icon;
          return (
            <Reveal key={area.id} delay={0.08 * i} className="h-full">
              <article className="panel group h-full p-7 transition-all duration-200 hover:-translate-y-1 hover:border-border-strong">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[13px] font-semibold tracking-[0.12em] text-fg-subtle">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.875rem] leading-[1.08] text-fg">
                  {area.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-fg-muted">
                  {area.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                  {area.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[0.875rem] leading-relaxed text-fg-muted"
                    >
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
