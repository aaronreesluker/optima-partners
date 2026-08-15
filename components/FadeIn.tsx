"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, e.g. 0.12 for the second card in a staggered grid. */
  delay?: number;
  /** Animate on mount instead of on scroll into view — for above-the-fold content. */
  immediate?: boolean;
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  immediate = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 20, filter: "blur(8px)" };
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = {
    duration: reduceMotion ? 0 : 0.55,
    ease: "easeOut" as const,
    delay: reduceMotion ? 0 : delay,
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={initial}
        animate={visible}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: "-64px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
