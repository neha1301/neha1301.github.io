import type { ComponentType, CSSProperties } from "react";
import {
  SiArgo,
  SiCloudflare,
  SiDocker,
  SiElasticsearch,
  SiFastapi,
  SiGithubactions,
  SiGrafana,
  SiGooglecloud,
  SiHelm,
  SiJenkins,
  SiKubernetes,
  SiMysql,
  SiOpentelemetry,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiTerraform,
  SiGnubash,
  SiOpenjdk,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Activity,
  BrainCircuit,
  Bug,
  Cpu,
  Gauge,
  MessageSquare,
  Network,
  Radar,
  ScrollText,
  Search,
  ShieldCheck,
  Siren,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Waypoints,
  Zap,
} from "lucide-react";

import type { SkillIconKey } from "@/config/skills";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

type IconSpec = {
  Icon: IconComponent;
  /** Brand / accent colour used for the glyph. */
  color: string;
};

/**
 * Brand marks come from Simple Icons (via react-icons) wherever an official
 * mark exists. Concepts without an official mark use a lucide glyph.
 */
export const techIcons: Record<SkillIconKey, IconSpec> = {
  aws: { Icon: FaAws, color: "#ff9900" },
  gcp: { Icon: SiGooglecloud, color: "#4285f4" },
  eks: { Icon: FaAws, color: "#ff9900" },
  gke: { Icon: SiGooglecloud, color: "#4285f4" },
  lambda: { Icon: Zap, color: "#ff9900" },
  apigateway: { Icon: Network, color: "#8c4fff" },
  cloudflare: { Icon: SiCloudflare, color: "#f38020" },

  kubernetes: { Icon: SiKubernetes, color: "#4c8dff" },
  docker: { Icon: SiDocker, color: "#2496ed" },
  helm: { Icon: SiHelm, color: "#5c7cfa" },
  terraform: { Icon: SiTerraform, color: "#a06ee0" },
  karpenter: { Icon: Cpu, color: "#38bdf8" },

  prometheus: { Icon: SiPrometheus, color: "#f0603c" },
  grafana: { Icon: SiGrafana, color: "#f98400" },
  opentelemetry: { Icon: SiOpentelemetry, color: "#f5a800" },
  pyroscope: { Icon: Gauge, color: "#fbbf24" },
  loki: { Icon: ScrollText, color: "#f5b73d" },
  tempo: { Icon: Waypoints, color: "#f46800" },
  coralogix: { Icon: Radar, color: "#3d7dff" },
  elk: { Icon: SiElasticsearch, color: "#00a3bf" },

  sre: { Icon: ShieldCheck, color: "#34d399" },
  slos: { Icon: Target, color: "#34d399" },
  incident: { Icon: Siren, color: "#fb7185" },
  rca: { Icon: Search, color: "#c084fc" },
  mttr: { Icon: Timer, color: "#fbbf24" },
  fault: { Icon: ShieldCheck, color: "#4ade9b" },
  monitoring: { Icon: Activity, color: "#38bdf8" },

  argocd: { Icon: SiArgo, color: "#ef8354" },
  ghactions: { Icon: SiGithubactions, color: "#4c8dff" },
  jenkins: { Icon: SiJenkins, color: "#d24939" },
  gitops: { Icon: SiGithubactions, color: "#8b7cf6" },

  python: { Icon: SiPython, color: "#4b8bbe" },
  bash: { Icon: SiGnubash, color: "#6ec06e" },
  java: { Icon: SiOpenjdk, color: "#ed8b00" },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  slack: { Icon: MessageSquare, color: "#e01e5a" },
  postgres: { Icon: SiPostgresql, color: "#4169e1" },
  mysql: { Icon: SiMysql, color: "#4479a1" },
  sql: { Icon: SiPostgresql, color: "#4169e1" },

  ai: { Icon: Sparkles, color: "#8b7cf6" },
  llm: { Icon: BrainCircuit, color: "#8b7cf6" },
  prompt: { Icon: Terminal, color: "#4ade9b" },
  aidebug: { Icon: Bug, color: "#4ade9b" },
};

export function TechIcon({
  name,
  className,
  size = "md",
}: {
  name: SkillIconKey;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const spec = techIcons[name];
  const { Icon, color } = spec;

  const dims = {
    sm: "h-7 w-7 rounded-md",
    md: "h-8 w-8 rounded-lg",
    lg: "h-10 w-10 rounded-xl",
  }[size];

  const glyph = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" }[size];

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center border border-border bg-surface-2 transition-all duration-200",
        dims,
        className,
      )}
      style={{ color }}
    >
      <Icon className={glyph} aria-hidden="true" />
    </span>
  );
}

/** Standalone glyph (no badge) for inline use. */
export function TechGlyph({
  name,
  className,
}: {
  name: SkillIconKey;
  className?: string;
}) {
  const { Icon, color } = techIcons[name];
  return (
    <Icon
      className={cn("shrink-0", className)}
      style={{ color }}
      aria-hidden="true"
    />
  );
}
