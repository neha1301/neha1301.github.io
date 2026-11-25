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
        "relative scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:py-20",
        divided && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
