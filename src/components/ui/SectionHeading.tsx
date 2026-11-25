import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Two-digit chapter number. Rendered large and as a label prefix. */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn("relative flex flex-col gap-6", centered && "items-center text-center", className)}
    >
      <div
        className={cn(
          "flex w-full items-center gap-5",
          centered && "justify-center",
        )}
      >
        <span className="inline-flex shrink-0 items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-text">
            {index ? `${index} — ` : ""}
            {eyebrow}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={cn("h-px w-full bg-border-strong", centered && "max-w-16")}
        />
      </div>

      {index ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 hidden select-none font-mono text-[7rem] font-semibold leading-none tracking-[-0.09em] text-transparent [-webkit-text-stroke:1px_var(--border-strong)] lg:block"
        >
          {index}
        </span>
      ) : null}

      <h2 className="relative max-w-3xl text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.04em] text-fg sm:text-[3.25rem] lg:text-[3.875rem]">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[1.125rem] leading-[1.7] text-fg-muted sm:text-[1.1875rem]",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
