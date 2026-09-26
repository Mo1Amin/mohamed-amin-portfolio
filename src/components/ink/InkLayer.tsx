"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { fillOutline, outline, smooth, type InkPoint } from "@/lib/ink/stroke";

const BASE_WIDTH = 3.4;
const DRY_AFTER_MS = 9000;
const FADE_MS = 1400;

interface Stroke {
  points: InkPoint[];
  endedAt: number | null;
}

interface InkState {
  penOn: boolean;
  setPenOn: (on: boolean) => void;
  hasInk: boolean;
  clear: () => void;
}

const InkContext = createContext<InkState | null>(null);

export function useInk(): InkState {
  const state = useContext(InkContext);
  if (!state) throw new Error("useInk must be used inside <InkLayer>");
  return state;
}

function isInteractive(target: EventTarget | null) {
  return target instanceof Element && target.closest("a, button, input, textarea, select, label, [data-no-ink]") !== null;
}

export function InkLayer({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const frame = useRef(0);
  const [penOn, setPenOn] = useState(false);
  const [hasInk, setHasInk] = useState(false);

  const render = useCallback(() => {
    frame.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = performance.now();
    strokes.current = strokes.current.filter((s) => s.endedAt === null || now - s.endedAt < DRY_AFTER_MS + FADE_MS);

    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-window.scrollX, -window.scrollY);
    ctx.fillStyle = getComputedStyle(canvas).color;

    for (const stroke of strokes.current) {
      const age = stroke.endedAt === null ? 0 : now - stroke.endedAt;
      ctx.globalAlpha = age <= DRY_AFTER_MS ? 1 : 1 - (age - DRY_AFTER_MS) / FADE_MS;
      fillOutline(ctx, outline(smooth(stroke.points)));
    }
    ctx.globalAlpha = 1;

    setHasInk(strokes.current.length > 0);
    if (strokes.current.length > 0) frame.current = requestAnimationFrame(render);
  }, []);

  const requestRender = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(render);
  }, [render]);

  const clear = useCallback(() => {
    strokes.current = [];
    requestRender();
  }, [requestRender]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      requestRender();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", requestRender, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", requestRender);
      cancelAnimationFrame(frame.current);
    };
  }, [requestRender]);

  useEffect(() => {
    let active: Stroke | null = null;
    let pointerId = -1;
    let last = { x: 0, y: 0, t: 0, w: BASE_WIDTH };

    const sample = (event: PointerEvent): InkPoint => {
      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;
      let target: number;
      if (event.pointerType === "pen" && event.pressure > 0) {
        target = BASE_WIDTH * (0.3 + event.pressure * 1.1);
      } else {
        // Without pressure, speed stands in for it: fast strokes thin out like a real nib.
        const speed = Math.hypot(x - last.x, y - last.y) / Math.max(event.timeStamp - last.t, 1);
        target = BASE_WIDTH * Math.min(Math.max(1.25 - speed * 0.35, 0.45), 1.15);
      }
      const w = last.w + (target - last.w) * 0.3;
      const point = {
        x: last.x + (x - last.x) * 0.6,
        y: last.y + (y - last.y) * 0.6,
        w,
      };
      last = { x: point.x, y: point.y, t: event.timeStamp, w };
      return point;
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || active) return;
      const inZone = event.target instanceof Element && event.target.closest("[data-ink-zone]") !== null;
      const canDraw = penOn || (inZone && event.pointerType !== "touch");
      if (!canDraw || isInteractive(event.target)) return;

      event.preventDefault();
      pointerId = event.pointerId;
      last = { x: event.clientX + window.scrollX, y: event.clientY + window.scrollY, t: event.timeStamp, w: BASE_WIDTH };
      active = { points: [{ x: last.x, y: last.y, w: BASE_WIDTH * 0.6 }], endedAt: null };
      strokes.current.push(active);
      requestRender();
    };

    const onMove = (event: PointerEvent) => {
      if (!active || event.pointerId !== pointerId) return;
      event.preventDefault();
      const events = event.getCoalescedEvents?.() ?? [event];
      for (const e of events.length ? events : [event]) active.points.push(sample(e));
      requestRender();
    };

    const onUp = (event: PointerEvent) => {
      if (!active || event.pointerId !== pointerId) return;
      active.endedAt = performance.now();
      active = null;
      requestRender();
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [penOn, requestRender]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-pen", penOn);
  }, [penOn]);

  return (
    <InkContext.Provider value={{ penOn, setPenOn, hasInk, clear }}>
      {children}
      <canvas ref={canvasRef} className="ink-layer" aria-hidden="true" />
    </InkContext.Provider>
  );
}
