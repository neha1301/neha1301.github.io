import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline top border — used to separate major bands. */
  divided?: boolean;
};

export function Section({ id, children, className, divided }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 py-16 sm:px-8 md:py-24",
        divided && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
