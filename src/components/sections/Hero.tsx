import { ArrowDown, Download, Mail, MapPin, Sparkles } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Terminal, type TerminalScene } from "@/components/ui/Terminal";

const terminalScenes: TerminalScene[] = [
  {
    title: "prod-cluster / kubectl",
    lines: [
      { type: "command", text: "kubectl get nodes -o wide" },
      { type: "output", text: "NAME            STATUS   ROLES    AGE   VERSION" },
      { type: "output", text: "ip-10-0-3-21    Ready    <none>   142d  v1.32.0" },
      { type: "output", text: "ip-10-0-8-104   Ready    <none>   142d  v1.32.0" },
      {
        type: "success",
        text: "→ 30+ production environments upgraded · zero downtime",
      },
    ],
  },
  {
    title: "node-insight / diagnostics",
    lines: [
      { type: "command", text: "python node_inspector.py" },
      { type: "success", text: "✓ SystemOOM found in kubelet events" },
      { type: "success", text: "✓ MemoryPressure on ip-10-0-3-21" },
      { type: "output", text: "→ root cause: memory limit below peak usage" },
      { type: "success", text: "→ one pass, not five commands" },
    ],
  },
  {
    title: "automation / onboarding",
    lines: [
      { type: "command", text: "python onboard.py --app checkout-api" },
      { type: "success", text: "✓ namespace created" },
      { type: "success", text: "✓ helm values generated" },
      { type: "success", text: "✓ pipeline triggered" },
      { type: "success", text: "→ onboarding time reduced 60%" },
    ],
  },
  {
    title: "observability / prometheus / grafana / pyroscope",
    lines: [
      { type: "command", text: "kubectl top nodes" },
      { type: "output", text: "NAME            CPU(cores)   MEMORY(bytes)" },
      { type: "output", text: "ip-10-0-3-21    312m         2.1Gi" },
      { type: "output", text: "ip-10-0-8-104   208m         1.8Gi" },
      {
        type: "muted",
        text: "→ metrics · dashboards · continuous profiling",
      },
    ],
  },
];

const statusChips = [
  { id: "availability", label: site.availability, dot: true },
  { id: "experience", label: `${site.yearsOfExperience} Years Experience` },
  { id: "location", label: site.locationShort },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pt-28 md:pb-20 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_68%)]" />
        <div className="absolute -right-24 top-32 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-2-soft),transparent_70%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {statusChips.map((chip) => (
                <li
                  key={chip.id}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-fg-muted"
                >
                  {chip.dot ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                  ) : null}
                  {chip.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mt-8 flex items-center gap-4 border-l-2 border-accent pl-5">
              <span className="kicker text-accent-text">
                DevOps Engineer II · BharatPe
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
              <span className="kicker text-fg-subtle">Site Reliability</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-[3.25rem] leading-[0.94] tracking-[-0.035em] text-fg sm:text-[5rem] lg:text-[5.75rem]">
              Fewer alerts.{" "}
              <span className="text-gradient italic">Faster root causes.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-[1.125rem] leading-[1.65] text-fg-muted sm:text-[1.1875rem]">
              {site.subtagline}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 max-w-xl text-[1rem] leading-[1.75] text-fg-subtle">
              From Kubernetes and multi-cloud infrastructure to observability and
              incident response, I turn production problems into systems that stay
              up.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                href="#project"
                size="lg"
                icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
              >
                View Projects
              </Button>
              <Button
                href={site.resume.path}
                download={site.resume.fileName}
                variant="secondary"
                size="lg"
                icon={<Download className="h-4 w-4" aria-hidden="true" />}
              >
                Download Resume
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="kicker text-fg-subtle">Find me on</span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-fg-muted">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-text"
                >
                  <GithubIcon
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  />
                  GitHub
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-text"
                >
                  <LinkedinIcon
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  />
                  LinkedIn
                </a>
                <a
                  href={site.links.emailCompose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-text"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.16} y={26}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[24px] bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 blur-2xl"
              />
              <Terminal scenes={terminalScenes} />
              <p className="mt-4 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-subtle">
                <span aria-hidden="true" className="h-px w-6 bg-accent" />
                Raw alert → ranked root cause
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-16 hidden w-full max-w-6xl items-center gap-2 text-fg-subtle lg:flex">
        <ArrowDown className="h-3.5 w-3.5 animate-float" aria-hidden="true" />
        <span className="kicker">Scroll to explore</span>
        <MapPin className="ml-auto h-3.5 w-3.5" aria-hidden="true" />
        <span className="kicker">{site.location}</span>
      </div>
    </section>
  );
}
