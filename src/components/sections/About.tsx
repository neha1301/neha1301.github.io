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
      "Alerting that stays quiet until it matters, SLO-driven monitoring, and incidents closed with a root cause instead of a workaround.",
    points: [
      "Centralized alerting",
      "Incident response & RCA",
      "Open-source observability stack",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Platform Infrastructure",
    icon: Cloud,
    description:
      "Kubernetes platforms built from code: reproducible environments, zero-downtime upgrades and validation that runs before a deploy lands.",
    points: [
      "Terraform + EKS platform work",
      "Kubernetes policy-as-code",
      "Helm & GitOps delivery",
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Tooling",
    icon: Wrench,
    description:
      "Tools that collapse a multi-command investigation into one readable answer — deterministic where it can be, automated where it saves a page.",
    points: [
      "Single-pass node diagnostics",
      "Alert enrichment with cluster context",
      "Python + Kubernetes API",
    ],
  },
];

export function About() {
  return (
    <Section
      id="about"
      divided
      className="highlight-band border-t-accent/35"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="About"
            title="Own the platform, not just the pager."
            emphasis
            className="lg:sticky lg:top-28"
          />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xl font-medium leading-relaxed text-fg sm:text-2xl">
              I&apos;m an SRE and platform engineer who owns systems after they
              ship — the Kubernetes platforms, infrastructure-as-code, alerting
              and release paths that teams depend on in production.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted sm:text-lg">
              My work sits where platform engineering and reliability meet:
              Terraform and Helm make environments reproducible, Kubernetes
              upgrades run without downtime, and Python automation removes manual
              onboarding. Observability is part of that platform, not a separate
              dashboard — signals and alert rules are designed with the service
              that emits them.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-fg-muted sm:text-lg">
              I&apos;d rather delete a manual step than get faster at doing it.
              Whether it&apos;s a Kubernetes v1.32 admission policy that rejects
              bad deploys, a single-pass node diagnostic, or consolidating alerts
              across services, the goal is the same: fewer surprises in
              production and a clearer path to root cause.
            </p>
          </Reveal>

          {/* Focus areas */}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, i) => {
          const Icon = area.icon;
          return (
            <Reveal key={area.id} delay={0.08 * i} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-2 text-accent transition-colors duration-300 group-hover:border-accent/40">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug text-fg sm:text-lg">
                  {area.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-muted sm:text-[0.9375rem]">
                  {area.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {area.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 font-mono text-xs text-fg-subtle"
                    >
                      <span
                        className="h-1 w-1 rounded-full bg-accent/70"
                        aria-hidden="true"
                      />
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
