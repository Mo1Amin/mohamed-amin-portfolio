"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const SPACING = 26;
const STEP_MS = 190;
const FADE = 0.93;

interface Runner {
  col: number;
  row: number;
  fromCol: number;
  fromRow: number;
  dir: [number, number];
  since: number;
}

const directions: Array<[number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// A grid of dots that pass a light between them: each runner hands the glow
// to a neighbour every step, and the dots it leaves behind cool down slowly.
export function RelayDots({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let runners: Runner[] = [];
    let frame = 0;
    let visible = false;
    const grid = document.createElement("canvas");

    const colours = () => {
      const style = getComputedStyle(canvas);
      return { dot: style.getPropertyValue("--relay-dot").trim(), glow: style.color };
    };

    const layout = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = grid.width = Math.round(width * ratio);
      canvas.height = grid.height = Math.round(height * ratio);
      cols = Math.floor(width / SPACING) + 1;
      rows = Math.floor(height / SPACING) + 1;
      heat = new Float32Array(cols * rows);

      const gctx = grid.getContext("2d");
      if (gctx) {
        gctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        gctx.fillStyle = colours().dot;
        gctx.beginPath();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            gctx.moveTo(c * SPACING + 1.3, r * SPACING);
            gctx.arc(c * SPACING, r * SPACING, 1.3, 0, Math.PI * 2);
          }
        }
        gctx.fill();
      }

      const count = Math.max(3, Math.round((cols * rows) / 160));
      runners = Array.from({ length: count }, () => {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        return { col, row, fromCol: col, fromRow: row, dir: directions[Math.floor(Math.random() * 4)], since: 0 };
      });
      draw(performance.now());
    };

    const advance = (runner: Runner, now: number) => {
      const options = directions.filter(([dc, dr]) => {
        const c = runner.col + dc;
        const r = runner.row + dr;
        return c >= 0 && r >= 0 && c < cols && r < rows && !(dc === -runner.dir[0] && dr === -runner.dir[1]);
      });
      const keep = options.find(([dc, dr]) => dc === runner.dir[0] && dr === runner.dir[1]);
      const next = keep && Math.random() < 0.6 ? keep : options[Math.floor(Math.random() * options.length)];
      runner.fromCol = runner.col;
      runner.fromRow = runner.row;
      runner.col += next[0];
      runner.row += next[1];
      runner.dir = next;
      runner.since = now;
      heat[runner.row * cols + runner.col] = 1;
    };

    const draw = (now: number) => {
      const ratio = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(grid, 0, 0);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const { glow } = colours();
      ctx.fillStyle = glow;

      for (let i = 0; i < heat.length; i++) {
        const h = heat[i];
        if (h < 0.02) continue;
        const c = i % cols;
        const r = (i - c) / cols;
        ctx.globalAlpha = h * 0.85;
        ctx.beginPath();
        ctx.arc(c * SPACING, r * SPACING, 1.3 + h * 1.8, 0, Math.PI * 2);
        ctx.fill();
        heat[i] = h * FADE;
      }

      ctx.globalAlpha = 1;
      for (const runner of runners) {
        const t = Math.min((now - runner.since) / STEP_MS, 1);
        const x = (runner.fromCol + (runner.col - runner.fromCol) * t) * SPACING;
        const y = (runner.fromRow + (runner.row - runner.fromRow) * t) * SPACING;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        if (t >= 1) advance(runner, now);
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible) frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reduced;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(loop);
    });
    const resize = new ResizeObserver(layout);
    const theme = new MutationObserver(layout);
    resize.observe(canvas);
    observer.observe(canvas);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
      resize.disconnect();
      theme.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={`relay-dots ${className ?? ""}`} aria-hidden="true" />;
}
