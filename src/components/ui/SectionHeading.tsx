import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Short section number shown before the label, e.g. "04". */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Larger, accent-led heading for the primary sections. */
  emphasis?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  emphasis = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex w-fit items-center gap-3",
            align === "center" && "mx-auto",
          )}
        >
          {index ? (
            <span
              className={cn(
                "font-mono text-[12px] font-semibold tracking-[0.08em]",
                emphasis ? "text-accent-text" : "text-accent",
              )}
            >
              {index}
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-6",
              emphasis ? "bg-accent/60" : "bg-border-strong",
            )}
          />
          <span
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted",
              emphasis && "text-[12px] font-medium text-fg",
            )}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight text-fg sm:text-4xl md:text-[2.75rem]",
          emphasis && "text-4xl font-bold sm:text-5xl md:text-[3.375rem]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-[1.0625rem]",
            emphasis && "max-w-3xl text-[1.0625rem] text-fg sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
