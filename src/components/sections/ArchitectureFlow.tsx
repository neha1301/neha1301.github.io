import type { Project } from "@/config/projects";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillIconKey } from "@/config/skills";

const nodeIcons: Record<string, SkillIconKey> = {
  cluster: "kubernetes",
  api: "kubernetes",
  engine: "python",
  llm: "llm",
  insights: "aidebug",
  alertmanager: "prometheus",
  webhook: "fastapi",
  dedupe: "monitoring",
  enrich: "kubernetes",
  slack: "slack",
};

export function ArchitectureFlow({ project }: { project: Project }) {
  const nodes = project.architecture;
  const summary = nodes.map((node) => node.label).join(" → ");

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-5 sm:p-7">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          System architecture
        </h3>
        <span className="font-mono text-[11px] text-fg-subtle">
          {summary}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {nodes.map((node, i) => (
          <div key={node.id} className="contents">
            <Reveal delay={0.08 * i} className="flex-1">
              <div className="group relative h-full rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:border-accent/40 hover:bg-surface-2">
                <span className="absolute right-3 top-3 font-mono text-[10.5px] text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TechIcon
                  name={nodeIcons[node.id] ?? "kubernetes"}
                  size="md"
                  className="h-9 w-9 rounded-lg"
                />
                <p className="mt-3.5 text-[0.875rem] font-semibold leading-snug text-fg">
                  {node.label}
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-fg-muted">
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
