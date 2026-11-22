"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { SquareTerminal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TerminalLine = {
  type: "command" | "output" | "success" | "warn" | "muted";
  text: string;
  indent?: boolean;
};

export type TerminalScene = {
  title: string;
  lines: TerminalLine[];
};

/**
 * Animated terminal that types commands and reveals their output,
 * then cycles to the next scene. Respects reduced-motion by rendering
 * the final state of every scene statically.
 */
export function Terminal({
  scenes,
  className,
}: {
  scenes: TerminalScene[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [revealed, setRevealed] = React.useState(0);
  const [typed, setTyped] = React.useState("");

  const scene = scenes[sceneIndex % scenes.length];

  React.useEffect(() => {
    if (reduce) return;

    const lines = scene.lines;
    const current = lines[revealed];

    // Scene fully revealed → hold, then advance.
    if (!current) {
      const t = setTimeout(() => {
        setSceneIndex((i) => (i + 1) % scenes.length);
        setRevealed(0);
        setTyped("");
      }, 3200);
      return () => clearTimeout(t);
    }

    if (current.type === "command") {
      if (typed.length < current.text.length) {
        const t = setTimeout(() => {
          setTyped(current.text.slice(0, typed.length + 1));
        }, 26);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setRevealed((r) => r + 1);
        setTyped("");
      }, 420);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setRevealed((r) => r + 1);
    }, 380);
    return () => clearTimeout(t);
  }, [scene, revealed, typed, scenes.length, reduce]);

  if (reduce) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-surface-2/60 shadow-lift",
          className,
        )}
      >
        <TerminalHeader title={scenes[0].title} />
        <div className="space-y-1.5 p-4 font-mono text-[11.5px] leading-relaxed sm:p-5 sm:text-[12.5px]">
          {scenes[0].lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}
        </div>
      </div>
    );
  }

  const lines = scene.lines.slice(0, revealed);
  const current = scene.lines[revealed];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-2/60 shadow-lift backdrop-blur-sm",
        className,
      )}
    >
      <TerminalHeader title={scene.title} />

      <div
        className="h-[176px] space-y-1.5 overflow-hidden p-4 font-mono text-[11.5px] leading-relaxed sm:h-[232px] sm:p-5 sm:text-[12.5px]"
        aria-live="polite"
        aria-atomic="false"
      >
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}

        {current ? (
          <div className={cn("flex items-start", current.indent && "pl-4")}>
            {current.type === "command" ? (
              <>
                <span className="mr-2 shrink-0 text-accent">$</span>
                <span className="text-fg">{typed}</span>
                <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] animate-caret bg-accent/80 align-middle" />
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TerminalHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-surface/70 px-4 py-2.5 sm:px-5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="flex min-w-0 items-center gap-1.5 truncate font-mono text-[11px] text-fg-subtle">
        <SquareTerminal className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{title}</span>
      </span>
      <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10.5px] text-fg-subtle sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        live
      </span>
    </div>
  );
}

function Line({ line }: { line: TerminalLine }) {
  const color =
    line.type === "command"
      ? "text-fg"
      : line.type === "success"
        ? "text-accent"
        : line.type === "warn"
          ? "text-amber-400"
          : line.type === "muted"
            ? "text-fg-subtle"
            : "text-fg-muted";

  return (
    <div className={cn("flex items-start", line.indent && "pl-4")}>
      {line.type === "command" ? (
        <span className="mr-2 shrink-0 text-accent">$</span>
      ) : (
        <span className="mr-2 shrink-0" aria-hidden="true" />
      )}
      <span className={cn("break-words", color)}>{line.text}</span>
    </div>
  );
}
