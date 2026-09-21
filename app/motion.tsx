'use client';

import { MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

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

/*
 * Immersive mode
 * --------------
 * The page is read as one world that changes as you move through it. Each
 * section owns a scene, and every scene is tied to what that section says:
 *
 *   origin        the orbit system from the hero, turning with the scroll
 *   work          a ridge rises; the graduation project makes it erupt
 *   capabilities  the ground splits into strata and data shards fall
 *   about         the fall settles into slow embers
 *   contact       everything collapses back into one point
 *
 * The stage is decoration only: it is aria-hidden, never takes pointer
 * events, and with reduced motion it renders as a still composition.
 */

export type Scene = 'origin' | 'work' | 'capabilities' | 'about' | 'contact';
const sceneOrder: Scene[] = ['origin', 'work', 'capabilities', 'about', 'contact'];
const sceneNames: Record<Scene, string> = { origin: 'ORBIT', work: 'RIDGE', capabilities: 'STRATA', about: 'EMBERS', contact: 'SIGNAL' };

/** Tracks the section that crosses the middle of the viewport. */
function useActiveScene(): Scene {
  const [scene, setScene] = useState<Scene>('origin');
  useEffect(() => {
    const targets = sceneOrder.slice(1).map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id);
      const current = [...sceneOrder].reverse().find((id) => visible.has(id));
      setScene(current ?? (window.scrollY < (targets[0]?.offsetTop ?? 0) ? 'origin' : 'work'));
    }, { rootMargin: '-48% 0px -48% 0px' });
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return scene;
}

/** True while the graduation project card is on screen. */
function useEruption(): boolean {
  const [erupting, setErupting] = useState(false);
  useEffect(() => {
    const card = document.querySelector('[data-slug="graduation-ml-fitness-health"]');
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => setErupting(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  return erupting;
}

// Fixed seeds so the server and client render the same field.
const shards = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 97,
  size: 6 + ((i * 7) % 5) * 4,
  drift: ((i % 5) - 2) * 26,
  depth: 0.45 + ((i * 13) % 10) / 16,
  spin: (i % 2 ? 1 : -1) * (160 + i * 23),
  label: i % 6 === 0 ? ['0x1F', 'ML', 'Σ', '∂'][(i / 6) % 4] : null,
}));
const embers = Array.from({ length: 14 }, (_, i) => ({ left: 38 + ((i * 29) % 26), delay: (i * 0.37) % 3, size: 2 + (i % 3) }));

function Shard({ progress, shard, index }: { progress: MotionValue<number>; shard: (typeof shards)[number]; index: number }) {
  const start = 0.36 + (index % 6) * 0.018;
  const y = useTransform(progress, [start, start + 0.36 * shard.depth + 0.12], ['-12vh', '112vh']);
  const x = useTransform(progress, [start, 0.9], [0, shard.drift]);
  const rotate = useTransform(progress, [start, 0.9], [0, shard.spin]);
  return <motion.span className={`im-shard${shard.label ? ' has-label' : ''}`} style={{ left: `${shard.left}%`, width: shard.size, height: shard.size, y, x, rotate, opacity: 0.35 + shard.depth * 0.5 }}>{shard.label && <b>{shard.label}</b>}</motion.span>;
}

export function ImmersiveStage() {
  const reduced = useReducedMotion() ?? false;
  const scene = useActiveScene();
  const erupting = useEruption();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.0005 });
  const progress = reduced ? scrollYProgress : smooth;

  // Orbit: turns through the whole page, then collapses into the contact point.
  const orbitTurn = useTransform(progress, [0, 1], [0, reduced ? 0 : 300]);
  const innerTurn = useTransform(orbitTurn, (v) => -v * 1.6);
  const orbitScale = useTransform(progress, [0, 0.3, 0.82, 1], [1, 1.18, 0.9, reduced ? 0.9 : 0.08]);
  // Ridge: rises under the work section and sinks when the ground splits.
  const ridgeY = useTransform(progress, [0.08, 0.26, 0.5, 0.7], ['46%', '0%', '8%', '60%']);
  // Strata: the two halves of the ground pull apart under capabilities.
  const split = useTransform(progress, [0.4, 0.58], [0, reduced ? 0 : 1]);
  const upperY = useTransform(split, [0, 1], [0, -38]);
  const lowerY = useTransform(split, [0, 1], [0, 34]);
  const upperX = useTransform(split, [0, 1], [0, -22]);
  const crack = useTransform(progress, [0.38, 0.56], [0, 1]);

  const [energy, setEnergy] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (value) => setEnergy(Math.round(value * 100)));

  const index = sceneOrder.indexOf(scene);

  return <div className="im-stage" data-scene={scene} data-erupting={erupting || undefined} aria-hidden="true">
    <div className="im-sky" />
    <div className="im-orbit-plane">
      <motion.div className="im-orbit im-orbit-outer" style={{ rotate: orbitTurn, scale: orbitScale }}><i /></motion.div>
      <motion.div className="im-orbit im-orbit-inner" style={{ rotate: innerTurn, scale: orbitScale }}><i /><i /></motion.div>
    </div>
    <motion.svg className="im-ridge" viewBox="0 0 1200 420" preserveAspectRatio="none" style={{ y: ridgeY }}>
      <path className="im-ridge-back" d="M0 420 L0 300 L140 250 L260 290 L400 190 L520 238 L590 120 L640 132 L700 214 L820 170 L960 262 L1080 214 L1200 270 L1200 420Z" />
      <path className="im-ridge-front" d="M0 420 L0 350 L180 318 L330 346 L470 262 L560 210 L600 170 L640 206 L760 278 L900 318 L1040 300 L1200 340 L1200 420Z" />
      <path className="im-vent" d="M586 172 L600 150 L614 172" />
    </motion.svg>
    <div className="im-eruption"><span className="im-flare" />{embers.map((ember, i) => <span key={i} className="im-ember" style={{ left: `${ember.left}%`, width: ember.size, height: ember.size, animationDelay: `${ember.delay}s` }} />)}</div>
    <svg className="im-strata" viewBox="0 0 1200 500" preserveAspectRatio="none">
      <motion.g style={{ y: upperY, x: upperX }}>
        <path className="im-layer im-layer-a" d="M0 170 C220 150 360 196 600 180 C820 166 980 204 1200 186 L1200 250 C980 262 820 236 600 246 C360 258 220 226 0 238Z" />
        <motion.path className="im-crack" style={{ pathLength: crack }} d="M600 180 L586 212 L612 236 L596 262" />
      </motion.g>
      <motion.g style={{ y: lowerY }}>
        <path className="im-layer im-layer-b" d="M0 262 C260 276 420 250 600 268 C800 288 960 262 1200 274 L1200 500 L0 500Z" />
        <path className="im-layer-line" d="M0 330 C300 318 520 344 760 332 C960 322 1080 340 1200 334" />
        <path className="im-layer-line" d="M0 400 C220 410 480 390 700 404 C900 416 1060 398 1200 406" />
        <motion.path className="im-crack" style={{ pathLength: crack }} d="M596 268 L620 300 L598 336 L630 372 L610 420 L648 470" />
        <motion.path className="im-crack im-crack-branch" style={{ pathLength: crack }} d="M620 300 L690 318 L736 312" />
      </motion.g>
    </svg>
    {!reduced && <div className="im-shards">{shards.map((shard, i) => <Shard key={i} progress={progress} shard={shard} index={i} />)}</div>}
    <div className="im-grain" />
    <div className="im-meter">
      <span className="im-meter-scene">{String(index + 1).padStart(2, '0')} / {sceneNames[scene]}</span>
      <span className="im-meter-track"><motion.span className="im-meter-fill" style={{ scaleY: progress }} /></span>
      <span className="im-meter-value">{String(energy).padStart(3, '0')}<small>EN</small></span>
    </div>
  </div>;
}

/**
 * A heading line that pulls apart as the hero scrolls away and comes back
 * together on the way up. Whole lines move, never single letters, so Arabic
 * shaping is never broken.
 */
export function ShatterLine({ children, index, active, className }: { children: ReactNode; index: number; active: boolean; className?: string }) {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const direction = index % 2 ? 1 : -1;
  const x = useTransform(scrollY, [0, 520], [0, active && !reduced ? direction * (40 + index * 26) : 0]);
  const y = useTransform(scrollY, [0, 520], [0, active && !reduced ? index * 14 : 0]);
  const skewX = useTransform(scrollY, [0, 520], [0, active && !reduced ? direction * -8 : 0]);
  const opacity = useTransform(scrollY, [0, 560], [1, active ? 0.18 : 1]);
  return <motion.span className={`shatter-line${className ? ` ${className}` : ''}`} style={{ x, y, skewX, opacity }}>{children}</motion.span>;
}

export { motion };
