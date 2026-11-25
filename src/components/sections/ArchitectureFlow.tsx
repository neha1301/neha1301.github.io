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
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
        System architecture · {nodes.length} stages
      </p>

      <div className="mt-6 flex flex-col lg:flex-row lg:items-stretch">
        {nodes.map((node, i) => (
          <div key={node.id} className="contents">
            <Reveal delay={0.06 * i} className="flex-1">
              <div className="h-full border-t border-border-strong pt-4">
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
                <p className="mt-4 text-[0.9375rem] font-semibold leading-snug text-fg">
                  {node.label}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                  {node.detail}
                </p>
              </div>
            </Reveal>

            {i < nodes.length - 1 ? (
              <>
                {/* Vertical connector (mobile) */}
                <div className="relative mx-auto h-9 w-px self-center overflow-hidden bg-border lg:hidden">
                  <span className="absolute inset-x-0 h-1/2 animate-flow-y bg-gradient-to-b from-transparent via-accent to-transparent" />
                </div>
                {/* Horizontal connector (desktop) */}
                <div className="relative hidden h-px flex-1 self-center overflow-hidden bg-border lg:block">
                  <span className="absolute inset-y-0 w-1/3 animate-flow-x bg-gradient-to-r from-transparent via-accent to-transparent" />
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
