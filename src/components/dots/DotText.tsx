"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface Props {
  as?: ElementType;
  id?: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}

interface Dot {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  start: number;
}

const DURATION = 1600;
const SPREAD = 0.45;

// Draws every word where the browser laid it out, so wrapping, RTL runs and
// the page's own font all match, then keeps the pixels the text covers.
function samplePoints(host: HTMLElement): { points: Array<[number, number]>; gap: number; color: string } {
  const box = host.getBoundingClientRect();
  const style = getComputedStyle(host);
  const size = parseFloat(style.fontSize);
  const gap = Math.max(2, Math.min(6, Math.round(size / 16)));

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(box.width);
  canvas.height = Math.ceil(box.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { points: [], gap, color: style.color };

  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement ?? host;
    const own = getComputedStyle(parent);
    ctx.font = `${own.fontStyle} ${own.fontWeight} ${own.fontSize} ${own.fontFamily}`;
    ctx.direction = own.direction as CanvasDirection;
    ctx.textBaseline = "alphabetic";

    const text = node.textContent ?? "";
    for (const match of text.matchAll(/\S+/g)) {
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const rect = range.getClientRects()[0];
      if (!rect) continue;

      const metrics = ctx.measureText(match[0]);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      const baseline = rect.top - box.top + (rect.height - ascent - descent) / 2 + ascent;
      // Canvas ignores font-variation-settings, so condensed display type is
      // squeezed back to the width the browser gave the word.
      const squeeze = metrics.width ? rect.width / metrics.width : 1;

      ctx.save();
      ctx.translate(rect.left - box.left, baseline);
      ctx.scale(squeeze, 1);
      ctx.textAlign = "left";
      ctx.direction = "ltr";
      ctx.fillText(match[0], 0, 0);
      ctx.restore();
    }
  }

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const points: Array<[number, number]> = [];
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      if (data[(y * width + x) * 4 + 3] > 140) points.push([x, y]);
    }
  }
  return { points, gap, color: style.color };
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function DotText({ as: Tag = "span", id, className, delay = 0, children }: Props) {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"static" | "waiting" | "assembling" | "done" | "settled">("static");
  const armed = phase !== "static";

  useEffect(() => {
    if (!reduced) setPhase("waiting");
  }, [reduced]);

  useEffect(() => {
    const host = hostRef.current;
    if (!armed || !host) return;

    let frame = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          setPhase("assembling");
          frame = requestAnimationFrame(() => run(host));
        }, delay);
      },
      { threshold: 0.6 },
    );
    observer.observe(host);

    const run = (target: HTMLElement) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return setPhase("done");

      const { points, gap, color } = samplePoints(target);
      const box = target.getBoundingClientRect();
      const pad = Math.max(box.width, box.height) * 0.6;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.ceil((box.width + pad * 2) * ratio);
      canvas.height = Math.ceil((box.height + pad * 2) * ratio);
      canvas.style.left = canvas.style.top = `${-pad}px`;
      canvas.style.width = `${box.width + pad * 2}px`;
      canvas.style.height = `${box.height + pad * 2}px`;
      ctx.setTransform(ratio, 0, 0, ratio, pad, pad);
      ctx.fillStyle = color;

      const dots: Dot[] = points.map(([x, y]) => {
        const angle = Math.random() * Math.PI * 2;
        const reach = pad * (0.4 + Math.random() * 0.9);
        return {
          fromX: box.width / 2 + Math.cos(angle) * (box.width / 2 + reach),
          fromY: box.height / 2 + Math.sin(angle) * (box.height / 2 + reach),
          toX: x,
          toY: y,
          start: Math.random() * SPREAD,
        };
      });
      const radius = gap * 0.42;
      const began = performance.now();

      const draw = (now: number) => {
        const t = (now - began) / DURATION;
        ctx.clearRect(-pad, -pad, box.width + pad * 2, box.height + pad * 2);
        ctx.beginPath();
        for (const dot of dots) {
          const local = ease(Math.min(Math.max((t - dot.start) / (1 - SPREAD), 0), 1));
          const x = dot.fromX + (dot.toX - dot.fromX) * local;
          const y = dot.fromY + (dot.toY - dot.fromY) * local;
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
        ctx.fill();
        if (t < 1) frame = requestAnimationFrame(draw);
        else setPhase("done");
      };
      frame = requestAnimationFrame(draw);
    };

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [armed, delay]);

  useEffect(() => {
    if (phase !== "done") return;
    const timer = window.setTimeout(() => setPhase("settled"), 320);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <Tag ref={hostRef} id={id} className={`dot-text ${className ?? ""}`} data-phase={phase}>
      {children}
      {phase !== "static" && phase !== "settled" && (
        <canvas ref={canvasRef} className="dot-text-canvas" aria-hidden="true" />
      )}
    </Tag>
  );
}
