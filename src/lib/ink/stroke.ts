export interface InkPoint {
  x: number;
  y: number;
  w: number;
}

const SUBDIVISIONS = 6;

export function smooth(points: InkPoint[]): InkPoint[] {
  if (points.length < 3) return points;

  const out: InkPoint[] = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    for (let s = 1; s <= SUBDIVISIONS; s++) {
      const t = s / SUBDIVISIONS;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
        w: p1.w + (p2.w - p1.w) * t,
      });
    }
  }
  return out;
}

export interface Outline {
  body: Array<[number, number]>;
  caps: Array<{ x: number; y: number; r: number }>;
}

// A filled outline instead of stroked segments, so a fading stroke never
// shows darker overlaps where its segments meet.
export function outline(points: InkPoint[]): Outline {
  if (points.length === 0) return { body: [], caps: [] };

  const first = points[0];
  const last = points[points.length - 1];
  const caps = [
    { x: first.x, y: first.y, r: first.w / 2 },
    { x: last.x, y: last.y, r: last.w / 2 },
  ];
  if (points.length === 1) return { body: [], caps };

  const left: Array<[number, number]> = [];
  const right: Array<[number, number]> = [];
  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(i - 1, 0)];
    const next = points[Math.min(i + 1, points.length - 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const r = points[i].w / 2;
    left.push([points[i].x + nx * r, points[i].y + ny * r]);
    right.push([points[i].x - nx * r, points[i].y - ny * r]);
  }
  return { body: left.concat(right.reverse()), caps };
}

export function outlineToSvgPath({ body, caps }: Outline): string {
  const round = (n: number) => Math.round(n * 100) / 100;
  let d = body.length ? `M${body.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}Z` : "";
  for (const { x, y, r } of caps) {
    d += `M${round(x - r)} ${round(y)}a${round(r)} ${round(r)} 0 1 0 ${round(2 * r)} 0a${round(r)} ${round(r)} 0 1 0 ${round(-2 * r)} 0Z`;
  }
  return d;
}

export function fillOutline(ctx: CanvasRenderingContext2D, { body, caps }: Outline) {
  ctx.beginPath();
  if (body.length) {
    ctx.moveTo(body[0][0], body[0][1]);
    for (let i = 1; i < body.length; i++) ctx.lineTo(body[i][0], body[i][1]);
    ctx.closePath();
  }
  for (const { x, y, r } of caps) {
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fill("nonzero");
}

export function centerlineToSvgPath(points: InkPoint[]): string {
  return `M${points.map((p) => `${Math.round(p.x * 10) / 10} ${Math.round(p.y * 10) / 10}`).join("L")}`;
}
