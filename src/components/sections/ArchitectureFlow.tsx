import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import type { SkillIconKey } from "@/config/skills";

type FlowNode = {
  id: string;
  label: string;
  detail: string;
};

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
  services: "kubernetes",
  rules: "prometheus",
  dashboards: "grafana",
  owners: "sre",
};

export function ArchitectureFlow({
  nodes,
  title = "System architecture",
}: {
  nodes: FlowNode[];
  title?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-elevated p-4 sm:p-5">
      <h4 className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {title}
      </h4>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {nodes.map((node, i) => (
          <div key={node.id} className="contents">
            <Reveal delay={0.05 * i} className="flex-1">
              <div className="h-full rounded-lg border border-border bg-surface p-3.5">
                <TechIcon
                  name={nodeIcons[node.id] ?? "kubernetes"}
                  size="sm"
                  className="h-7 w-7 rounded-md"
                />
                <p className="mt-3 text-[0.8125rem] font-semibold leading-snug text-fg">
                  {node.label}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-fg-muted">
                  {node.detail}
                </p>
              </div>
            </Reveal>

            {i < nodes.length - 1 ? (
              <>
                <div
                  aria-hidden="true"
                  className="relative mx-auto h-7 w-px self-center overflow-hidden bg-border lg:hidden"
                >
                  <span className="absolute inset-x-0 h-1/2 animate-flow-y bg-gradient-to-b from-transparent via-accent to-transparent" />
                </div>
                <div
                  aria-hidden="true"
                  className="relative hidden h-px flex-1 self-center overflow-hidden bg-border lg:block"
                >
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
