"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up to `value` once the element scrolls into view.
 * Falls back to the final value when reduced motion is preferred.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView || reduce) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOutExpo(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduce]);

  // With reduced motion the final value is rendered directly — no animation.
  const shown = reduce ? value : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
