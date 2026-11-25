import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { CopyEmail } from "./CopyEmail";

const channels = [
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/neha1301",
    href: site.links.linkedin,
    icon: LinkedinIcon,
  },
  {
    id: "github",
    label: "GitHub",
    value: "neha1301",
    href: site.links.github,
    icon: GithubIcon,
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" divided className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_68%)]" />
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex w-full items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[13px] font-semibold text-accent-text">
                06
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              <span className="kicker text-fg-subtle">Contact</span>
              <span aria-hidden="true" className="h-px w-full bg-border" />
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="mt-8 max-w-2xl font-display text-[2.75rem] leading-[0.94] tracking-[-0.035em] text-fg sm:text-[4rem] lg:text-[5.25rem]">
              Let&apos;s keep systems <span className="text-accent-text italic">up.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-fg-muted">
              I&apos;m open to Site Reliability, Platform and DevOps roles. If
              you&apos;re hiring for someone who owns production after it ships,
              the fastest way to reach me is email.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                href={site.links.emailCompose}
                size="lg"
                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              >
                Email me
              </Button>
              <Button
                href={site.resume.path}
                download={site.resume.fileName}
                variant="secondary"
                size="lg"
                icon={<Download className="h-4 w-4" aria-hidden="true" />}
              >
                Download resume
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-1.5 text-[0.9375rem] text-fg-subtle sm:flex-row sm:items-center sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {site.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                {site.availability}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="panel p-7 sm:p-9">
              <p className="kicker text-fg-subtle">Email</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <a
                  href={site.links.email}
                  className="min-w-0 truncate font-display text-[1.75rem] leading-tight text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent"
                >
                  {site.email}
                </a>
                <CopyEmail email={site.email} />
              </div>

              <ul className="mt-8 border-t border-border pt-4">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-surface-2/60"
                      >
                        <span className="inline-flex items-center gap-3 text-[1rem] text-fg-muted transition-colors group-hover:text-fg">
                          <Icon
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          />
                          {channel.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-subtle">
                          {channel.value}
                          <ArrowUpRight
                            className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
