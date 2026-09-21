'use client';

import { MotionConfig, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return <MotionConfig reducedMotion="user"><div className="motion-root"><motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />{children}</div></MotionConfig>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.42], [0, -95]);
  const rotate = useTransform(scrollYProgress, [0, 0.42], [0, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.36], [1, 0.2]);
  return <motion.div className={className} style={{ y, rotate, opacity }}>{children}</motion.div>;
}

export { motion };
