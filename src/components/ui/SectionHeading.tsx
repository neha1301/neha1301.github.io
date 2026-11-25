import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Two-digit chapter number, shown as a visible index chip. */
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
    <Reveal className={cn("relative", centered && "text-center", className)}>
      <div
        className={cn(
          "flex w-full items-center gap-4",
          centered && "justify-center",
        )}
      >
        {index ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[13px] font-semibold text-accent-text">
            {index}
          </span>
        ) : null}
        <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
        <span className="kicker text-fg-subtle">{eyebrow}</span>
        <span
          aria-hidden="true"
          className={cn("h-px w-full bg-border", centered && "max-w-12")}
        />
      </div>

      <h2
        className={cn(
          "mt-7 max-w-3xl font-display text-[2.75rem] leading-[0.94] tracking-[-0.035em] text-fg sm:text-[4rem] lg:text-[5.25rem]",
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-[1.125rem] leading-[1.7] text-fg-muted sm:text-[1.1875rem]",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
