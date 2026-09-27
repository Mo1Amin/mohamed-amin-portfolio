"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Each item starts as a single accent dot and opens into its full shape, one
// after another, so a row of links reads as dots gathering into buttons.
const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045 } },
};

const item: Variants = {
  hidden: { clipPath: "circle(4px at 50% 50%)", backgroundColor: "var(--grow-dot)" },
  shown: {
    clipPath: "circle(150% at 50% 50%)",
    backgroundColor: "var(--grow-bg)",
    transition: { duration: 0.55, ease: [0.3, 0.7, 0.2, 1] },
  },
};

interface GroupProps {
  as?: "ul" | "div";
  className?: string;
  children: ReactNode;
}

export function DotGrowGroup({ as = "ul", className, children }: GroupProps) {
  const reduced = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      variants={reduced ? undefined : group}
      initial={reduced ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </Tag>
  );
}

export function DotGrowItem({ as = "li", className, children }: { as?: "li" | "span"; className?: string; children: ReactNode }) {
  const Tag = as === "li" ? motion.li : motion.span;
  return (
    <Tag className={`dot-grow ${className ?? ""}`} variants={item}>
      {children}
    </Tag>
  );
}
