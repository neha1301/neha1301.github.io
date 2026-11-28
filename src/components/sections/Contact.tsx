import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";

import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Let’s talk about keeping systems up."
            description="Open to SRE, Platform and DevOps roles. If you're hiring for someone who owns production after it ships, email is fastest."
          />

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
            <div className="mt-6 flex flex-col gap-1.5 text-sm text-fg-subtle sm:flex-row sm:items-center sm:gap-5">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {site.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
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
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Email
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={site.links.email}
                  className="min-w-0 truncate text-[0.9375rem] font-medium text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent"
                >
                  {site.email}
                </a>
                <CopyEmail email={site.email} />
              </div>

              <ul className="mt-6 space-y-1 border-t border-border pt-5">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors group-hover:text-fg">
                          {Icon ? (
                            <Icon className="h-4 w-4 fill-current" />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="grid h-4 w-4 place-items-center font-mono text-[10px] font-semibold text-fg-subtle"
                            >
                              LC
                            </span>
                          )}
                          {channel.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-fg-subtle">
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
