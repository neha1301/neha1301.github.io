import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" divided className="highlight-band border-t-accent/35">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
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
              ship — Kubernetes platforms, infrastructure as code, alerting and
              the release paths teams depend on in production at BharatPe.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted sm:text-lg">
              My focus is the unglamorous work that makes incidents rare:
              reproducible environments, zero-downtime upgrades, policy-as-code
              validation, quieter alerting and diagnostics that turn scattered
              signals into a root cause.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
