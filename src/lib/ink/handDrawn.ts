import type { InkPoint } from "./stroke";

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Real pen strokes start light, press down, and lift off at the end.
function pressure(t: number, weight: number) {
  return weight * (0.35 + 0.65 * Math.pow(Math.sin(Math.PI * Math.min(Math.max(t, 0.02), 0.98)), 0.45));
}

export function loopAround(box: Box, seed: number, weight = 3.2): InkPoint[] {
  const random = seeded(seed);
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const rx = box.width / 2 + 12 + random() * 6;
  const ry = box.height / 2 + 8 + random() * 4;
  const start = -Math.PI * (0.62 + random() * 0.1);
  const sweep = Math.PI * 2 * (1.08 + random() * 0.06);
  const tilt = (random() - 0.5) * 0.08;
  const phase = random() * Math.PI * 2;

  const steps = 72;
  const points: InkPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = start + sweep * t;
    // The loop drifts outward as it closes, the way a hand overshoots its start.
    const drift = 1 + t * 0.07 + Math.sin(angle * 2 + phase) * 0.025;
    const x = Math.cos(angle) * rx * drift;
    const y = Math.sin(angle) * ry * drift;
    points.push({
      x: cx + x * Math.cos(tilt) - y * Math.sin(tilt),
      y: cy + x * Math.sin(tilt) + y * Math.cos(tilt),
      w: pressure(t, weight),
    });
  }
  return points;
}

export function underline(box: Box, seed: number, rtl: boolean, weight = 3): InkPoint[] {
  const random = seeded(seed);
  const from = box.x - 4;
  const to = box.x + box.width + 6;
  const baseline = box.y + box.height + 2 + random() * 2;
  const rise = 2 + random() * 3;
  const wobble = random() * Math.PI * 2;

  const steps = Math.max(12, Math.round(box.width / 10));
  const points: InkPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const along = rtl ? 1 - t : t;
    points.push({
      x: from + (to - from) * along,
      y: baseline - rise * t + Math.sin(t * Math.PI * 1.5 + wobble) * 1.2,
      w: pressure(t, weight),
    });
  }
  return points;
}

export function arrow(from: { x: number; y: number }, to: { x: number; y: number }, seed: number, weight = 2.4) {
  const random = seeded(seed);
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const bend = (random() * 0.3 + 0.25) * (dx >= 0 ? 1 : -1);
  const control = { x: from.x + dx / 2 - dy * bend, y: from.y + dy / 2 + dx * bend };

  const steps = 32;
  const shaft: InkPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    shaft.push({
      x: u * u * from.x + 2 * u * t * control.x + t * t * to.x,
      y: u * u * from.y + 2 * u * t * control.y + t * t * to.y,
      w: pressure(t * 0.8 + 0.1, weight),
    });
  }

  const tail = shaft[steps - 3];
  const angle = Math.atan2(to.y - tail.y, to.x - tail.x);
  const size = 10;
  const barb = (side: number): InkPoint[] => {
    const a = angle + Math.PI + side * 0.5;
    return [
      { x: to.x + Math.cos(a) * size, y: to.y + Math.sin(a) * size, w: weight * 0.5 },
      { x: to.x, y: to.y, w: weight * 0.9 },
    ];
  };

  return [shaft, barb(1), barb(-1)];
}
