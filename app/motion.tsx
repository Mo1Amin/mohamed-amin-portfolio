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

export function WildAtmosphere() {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [-18, 260]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.12, 0.9]);
  const lavaY = useTransform(scrollYProgress, [0, 0.45, 1], ['18%', '0%', '-12%']);

  return <motion.div className="wild-atmosphere" aria-hidden="true">
    <motion.div className="wild-orbit wild-orbit-a" style={{ rotate: rotation, scale: orbitScale }} />
    <motion.div className="wild-orbit wild-orbit-b" style={{ rotate: rotation, scale: orbitScale }} />
    <motion.div className="wild-volcano" style={{ y: lavaY }}><span className="wild-lava" /><span className="wild-smoke wild-smoke-a" /><span className="wild-smoke wild-smoke-b" /></motion.div>
    <span className="wild-rock wild-rock-a" /><span className="wild-rock wild-rock-b" /><span className="wild-rock wild-rock-c" /><span className="wild-rock wild-rock-d" />
    <span className="wild-signal wild-signal-a">01</span><span className="wild-signal wild-signal-b">AI</span><span className="wild-signal wild-signal-c">∞</span>
  </motion.div>;
}

export { motion };
