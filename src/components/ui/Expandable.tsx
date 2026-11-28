import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type ExpandableProps = {
  index: number;
  meta: string;
  title: string;
  summary: string;
  stack: string[];
  children: ReactNode;
};

/**
 * Native disclosure: keyboard accessible by default, no client JS required.
 * The detail panel is hidden until the visitor asks for it, which keeps the
 * main page scannable without losing the engineering depth.
 */
export function Expandable({
  index,
  meta,
  title,
  summary,
  stack,
  children,
}: ExpandableProps) {
  return (
    <details className="group rounded-2xl border border-border bg-surface transition-colors duration-200 open:border-border-strong hover:border-border-strong">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl p-5 [&::-webkit-details-marker]:hidden sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent-text">
              {meta}
            </span>
            <span className="font-mono text-[10.5px] text-fg-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-fg-muted sm:text-[0.9375rem]">
            {summary}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-bg-elevated px-2 py-1 font-mono text-[10.5px] text-fg-subtle"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-bg-elevated text-fg-muted transition-colors group-open:border-accent/40 group-open:text-accent">
          <ChevronDown
            className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>

      <div className="expand-content border-t border-border p-5 sm:p-6">
        {children}
      </div>
    </details>
  );
}
