"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Dot {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  r: number;
  colour: string;
  start: number;
}

const GAP = 6;
const DURATION = 1800;
const SPREAD = 0.5;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// The photo arrives as a mosaic of dots in its own colours, which fly in and
// settle before the real image fades up over them.
export function DotPortrait({ src, alt, width, height }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"static" | "assembling" | "done" | "settled">("static");

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const ctx = canvas?.getContext("2d");
    if (!img || !canvas || !frame || !ctx) return;

    let raf = 0;
    let cancelled = false;
    setPhase("assembling");

    img
      .decode()
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        const box = img.getBoundingClientRect();
        const w = Math.round(box.width);
        const h = Math.round(box.height);
        const sample = document.createElement("canvas");
        sample.width = w;
        sample.height = h;
        const sctx = sample.getContext("2d", { willReadFrequently: true });
        if (!sctx || !w || !h) return setPhase("done");
        // Crop the source the way object-fit: cover does, so each dot lands
        // on the pixel the real photo will show there.
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const [ox, oy] = getComputedStyle(img)
          .objectPosition.split(" ")
          .map((part) => (part.endsWith("%") ? parseFloat(part) / 100 : 0.5));
        const sw = w / scale;
        const sh = h / scale;
        sctx.drawImage(img, (img.naturalWidth - sw) * ox, (img.naturalHeight - sh) * oy, sw, sh, 0, 0, w, h);
        const { data } = sctx.getImageData(0, 0, w, h);

        const dots: Dot[] = [];
        for (let y = GAP / 2; y < h; y += GAP) {
          for (let x = GAP / 2; x < w; x += GAP) {
            const i = (Math.floor(y) * w + Math.floor(x)) * 4;
            if (data[i + 3] < 120) continue;
            const angle = Math.random() * Math.PI * 2;
            const reach = Math.max(w, h) * (0.35 + Math.random() * 0.5);
            dots.push({
              fromX: x + Math.cos(angle) * reach,
              fromY: y + Math.sin(angle) * reach,
              toX: x,
              toY: y,
              r: GAP * 0.5,
              colour: `rgb(${data[i]} ${data[i + 1]} ${data[i + 2]})`,
              start: (y / h) * SPREAD * 0.6 + Math.random() * SPREAD * 0.4,
            });
          }
        }

        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const began = performance.now();

        const draw = (now: number) => {
          const t = (now - began) / DURATION;
          ctx.clearRect(0, 0, w, h);
          for (const dot of dots) {
            const local = ease(Math.min(Math.max((t - dot.start) / (1 - SPREAD), 0), 1));
            if (local <= 0) continue;
            ctx.globalAlpha = Math.min(local * 2, 1);
            ctx.fillStyle = dot.colour;
            ctx.beginPath();
            ctx.arc(
              dot.fromX + (dot.toX - dot.fromX) * local,
              dot.fromY + (dot.toY - dot.fromY) * local,
              dot.r * (0.6 + 0.4 * local),
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          if (t < 1) raf = requestAnimationFrame(draw);
          else setPhase("done");
        };
        raf = requestAnimationFrame(draw);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    if (phase !== "done") return;
    const timer = window.setTimeout(() => setPhase("settled"), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  const rest = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={frameRef}
      className="portrait"
      data-phase={phase}
      onPointerMove={follow}
      onPointerLeave={rest}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      <img ref={imgRef} className="portrait-photo" src={src} alt={alt} width={width} height={height} decoding="async" />
      {phase !== "settled" && <canvas ref={canvasRef} className="portrait-dots" aria-hidden="true" />}
      <noscript>
        <style>{".portrait-photo{opacity:1!important}"}</style>
      </noscript>
      <span className="portrait-dot" aria-hidden="true" />
    </motion.div>
  );
}
