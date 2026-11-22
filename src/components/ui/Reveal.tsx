"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "span" | "article" | "section";
};

const TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  article: motion.article,
  section: motion.section,
} as const;

/**
 * Scroll-triggered entrance animation.
 * Renders statically when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.55,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = TAGS[as];
  const StaticTag = as;

  if (reduce) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
