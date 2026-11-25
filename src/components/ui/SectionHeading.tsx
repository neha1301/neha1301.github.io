import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Two-digit section number, rendered before the eyebrow. */
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
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex w-full items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
            {index ? `${index} / ` : ""}
            {eyebrow}
          </span>
          <span
            aria-hidden="true"
            className={cn("h-px w-full bg-border", align === "center" && "max-w-16")}
          />
        </div>
      ) : null}

      <h2 className="max-w-4xl text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-[3rem] md:text-[3.375rem]">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[1.0625rem] leading-[1.7] text-fg-muted sm:text-[1.125rem]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
