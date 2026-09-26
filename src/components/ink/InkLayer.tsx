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

interface Props {
  id: string;
  className: string;
  labelledBy: string;
  children: ReactNode;
}

// The ink lives only inside this section: strokes start here, and the canvas
// is clipped to it, so the rest of the page scrolls and selects as usual.
export function InkLayer({ id, className, labelledBy, children }: Props) {
  const zoneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const frame = useRef(0);
  const [penOn, setPenOn] = useState(false);
  const [hasInk, setHasInk] = useState(false);

  const render = useCallback(() => {
    frame.current = 0;
    const zone = zoneRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!zone || !canvas || !ctx) return;

    const now = performance.now();
    strokes.current = strokes.current.filter((s) => s.endedAt === null || now - s.endedAt < DRY_AFTER_MS + FADE_MS);

    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bounds = zone.getBoundingClientRect();
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.left, bounds.top, bounds.width, bounds.height);
    ctx.clip();
    ctx.translate(-window.scrollX, -window.scrollY);
    ctx.fillStyle = getComputedStyle(canvas).color;

    for (const stroke of strokes.current) {
      const age = stroke.endedAt === null ? 0 : now - stroke.endedAt;
      ctx.globalAlpha = age <= DRY_AFTER_MS ? 1 : 1 - (age - DRY_AFTER_MS) / FADE_MS;
      fillOutline(ctx, outline(smooth(stroke.points)));
    }
    ctx.restore();

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
    const zone = zoneRef.current;
    if (!zone) return;

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
      const point = { x: last.x + (x - last.x) * 0.6, y: last.y + (y - last.y) * 0.6, w };
      last = { x: point.x, y: point.y, t: event.timeStamp, w };
      return point;
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || active) return;
      if (event.pointerType === "touch" && !penOn) return;
      if (isInteractive(event.target)) return;

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
      const events = event.getCoalescedEvents?.() ?? [];
      for (const e of events.length ? events : [event]) active.points.push(sample(e));
      requestRender();
    };

    const onUp = (event: PointerEvent) => {
      if (!active || event.pointerId !== pointerId) return;
      active.endedAt = performance.now();
      active = null;
      requestRender();
    };

    zone.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      zone.removeEventListener("pointerdown", onDown);
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
      <section ref={zoneRef} id={id} className={className} aria-labelledby={labelledBy}>
        {children}
        <canvas ref={canvasRef} className="ink-layer" aria-hidden="true" />
      </section>
    </InkContext.Provider>
  );
}

export function PenControl({ labels }: { labels: { on: string; off: string; clear: string; active: string } }) {
  const { penOn, setPenOn, hasInk, clear } = useInk();

  return (
    <div className="pen-control" data-no-ink>
      <button type="button" className="pen-button" aria-pressed={penOn} onClick={() => setPenOn(!penOn)}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
          <path d="M12.5 6.5l5 5" />
        </svg>
        <span>{penOn ? labels.off : labels.on}</span>
      </button>
      {hasInk && (
        <button type="button" className="pen-button pen-clear" onClick={clear} aria-label={labels.clear} title={labels.clear}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 20h9M7.5 16.5l-3-3a1.5 1.5 0 0 1 0-2.1l7.9-7.9a1.5 1.5 0 0 1 2.1 0l4.5 4.5a1.5 1.5 0 0 1 0 2.1L12 17.1" />
            <path d="M9.5 8.5l6 6" />
          </svg>
        </button>
      )}
      <p className="visually-hidden" role="status">
        {penOn ? labels.active : ""}
      </p>
    </div>
  );
}
