import { ArrowRight } from "lucide-react";

import type { Project } from "@/config/projects";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillIconKey } from "@/config/skills";

const nodeIcons: Record<string, SkillIconKey> = {
  cluster: "kubernetes",
  api: "kubernetes",
  collector: "python",
  correlate: "monitoring",
  verdict: "rca",
  alertmanager: "prometheus",
  webhook: "fastapi",
  dedupe: "monitoring",
  enrich: "kubernetes",
  slack: "slack",
};

export function ArchitectureFlow({ project }: { project: Project }) {
  const nodes = project.architecture;

  return (
    <div className="panel p-7 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="kicker text-fg-subtle">
          System architecture · {nodes.length} stages
        </p>
        <span className="font-mono text-[11px] text-fg-subtle">
          {project.repository.live ? "read-only design" : "design overview"}
        </span>
      </div>

      <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {nodes.map((node, i) => (
          <Reveal
            as="li"
            key={node.id}
            delay={0.05 * i}
            className="relative h-full rounded-xl border border-border bg-surface-2/40 p-5 transition-colors duration-200 hover:border-border-strong"
          >
            <div className="flex items-start justify-between gap-3">
              <TechIcon
                name={nodeIcons[node.id] ?? "kubernetes"}
                size="md"
                className="h-9 w-9 rounded-lg"
              />
              <span className="font-mono text-[11px] text-fg-subtle">
                0{i + 1}
              </span>
            </div>
            <p className="mt-5 text-[0.9375rem] font-semibold leading-snug text-fg">
              {node.label}
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
              {node.detail}
            </p>
            {i < nodes.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-3 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-accent lg:block"
              />
            ) : null}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
