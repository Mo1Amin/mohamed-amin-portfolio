"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Squash and stretch: the logo is pulled wide, snaps tall, and settles like
// something with weight, instead of just scaling up.
const stretch: Variants = {
  rest: { scaleX: 1, scaleY: 1 },
  play: {
    scaleX: [1, 1.22, 0.9, 1.05, 1],
    scaleY: [1, 0.8, 1.1, 0.97, 1],
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export function Squish({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={stretch}
      initial="rest"
      whileHover="play"
      whileTap="play"
      style={{ display: "inline-grid", transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.span>
  );
}

export function SquishLink({ href, mark, children }: { href: string; mark: ReactNode; children: ReactNode }) {
  return (
    <motion.a href={href} initial="rest" whileHover="play" whileFocus="play">
      <motion.span
        className="project-index-mark"
        variants={stretch}
        style={{ transformOrigin: "50% 100%" }}
      >
        {mark}
      </motion.span>
      {children}
    </motion.a>
  );
}
