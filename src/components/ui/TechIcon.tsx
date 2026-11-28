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
  SiLinux,
  SiMysql,
  SiOpentelemetry,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiTerraform,
  SiGnubash,
  SiOpenjdk,
  SiVictoriametrics,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Activity,
  BellRing,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  KeyRound,
  MessageSquare,
  Network,
  Radar,
  ScrollText,
  Search,
  Server,
  ShieldCheck,
  Siren,
  Target,
  Waypoints,
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
 * mark exists. Concepts without one use a neutral lucide glyph.
 */
export const techIcons: Record<SkillIconKey, IconSpec> = {
  aws: { Icon: FaAws, color: "#ff9900" },
  gcp: { Icon: SiGooglecloud, color: "#4285f4" },
  vpc: { Icon: Network, color: "#ff9900" },
  iam: { Icon: ShieldCheck, color: "#ff9900" },
  ec2: { Icon: Server, color: "#ff9900" },
  s3: { Icon: Database, color: "#ff9900" },
  alb: { Icon: Network, color: "#ff9900" },
  route53: { Icon: Globe2, color: "#ff9900" },
  cloudflare: { Icon: SiCloudflare, color: "#f38020" },

  kubernetes: { Icon: SiKubernetes, color: "#4c8dff" },
  eks: { Icon: FaAws, color: "#ff9900" },
  gke: { Icon: SiGooglecloud, color: "#4285f4" },
  docker: { Icon: SiDocker, color: "#2496ed" },
  helm: { Icon: SiHelm, color: "#5c7cfa" },
  karpenter: { Icon: Cpu, color: "#38bdf8" },
  keda: { Icon: Activity, color: "#7aa2f7" },
  hpa: { Icon: Gauge, color: "#326ce5" },
  gatewayapi: { Icon: Waypoints, color: "#326ce5" },
  rbac: { Icon: KeyRound, color: "#326ce5" },

  terraform: { Icon: SiTerraform, color: "#a06ee0" },
  argocd: { Icon: SiArgo, color: "#ef8354" },
  argorollouts: { Icon: SiArgo, color: "#f4a261" },
  gitops: { Icon: GitBranch, color: "#8b7cf6" },
  ghactions: { Icon: SiGithubactions, color: "#4c8dff" },
  jenkins: { Icon: SiJenkins, color: "#d24939" },
  sre: { Icon: ShieldCheck, color: "#94a3b8" },

  prometheus: { Icon: SiPrometheus, color: "#f0603c" },
  grafana: { Icon: SiGrafana, color: "#f98400" },
  alertmanager: { Icon: BellRing, color: "#f0603c" },
  loki: { Icon: ScrollText, color: "#f5b73d" },
  tempo: { Icon: Waypoints, color: "#f46800" },
  opentelemetry: { Icon: SiOpentelemetry, color: "#f5a800" },
  victoriametrics: { Icon: SiVictoriametrics, color: "#5bbf7a" },
  pyroscope: { Icon: Gauge, color: "#fbbf24" },
  elk: { Icon: SiElasticsearch, color: "#00a3bf" },
  coralogix: { Icon: Radar, color: "#3d7dff" },
  slos: { Icon: Target, color: "#94a3b8" },
  incident: { Icon: Siren, color: "#fb7185" },
  rca: { Icon: Search, color: "#c084fc" },
  monitoring: { Icon: Activity, color: "#38bdf8" },

  python: { Icon: SiPython, color: "#4b8bbe" },
  bash: { Icon: SiGnubash, color: "#6ec06e" },
  linux: { Icon: SiLinux, color: "#f2c94c" },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  java: { Icon: SiOpenjdk, color: "#ed8b00" },
  sql: { Icon: Database, color: "#94a3b8" },
  postgres: { Icon: SiPostgresql, color: "#4169e1" },
  mysql: { Icon: SiMysql, color: "#4479a1" },
  slack: { Icon: MessageSquare, color: "#e01e5a" },
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
        "grid shrink-0 place-items-center border border-border bg-surface-2 transition-colors duration-200",
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
