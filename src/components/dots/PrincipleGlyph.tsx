"use client";

import { motion, useReducedMotion } from "motion/react";

export type GlyphKind = "moment" | "security" | "device" | "team";

const view = { once: true, amount: 0.8 } as const;
const loop = { repeat: Infinity, repeatDelay: 1.6 } as const;

// One small moving picture per principle, drawn with the same dots and lines
// as the rest of the lower page.
export function PrincipleGlyph({ kind }: { kind: GlyphKind }) {
  const reduced = useReducedMotion();
  const still = reduced ?? false;

  return (
    <svg className="principle-glyph" viewBox="0 0 72 72" width="72" height="72" aria-hidden="true">
      {kind === "moment" && <Moment still={still} />}
      {kind === "security" && <Security still={still} />}
      {kind === "device" && <Device still={still} />}
      {kind === "team" && <Team still={still} />}
    </svg>
  );
}

// Nine quiet dots, and one of them becomes the moment people remember.
function Moment({ still }: { still: boolean }) {
  const dots = [14, 36, 58].flatMap((y) => [14, 36, 58].map((x) => [x, y] as const));
  return (
    <>
      {dots.map(([x, y]) =>
        x === 36 && y === 36 ? null : <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" className="glyph-quiet" />,
      )}
      <motion.circle
        cx="36"
        cy="36"
        className="glyph-accent"
        initial={{ r: 2.5 }}
        whileInView={{ r: 8 }}
        viewport={view}
        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.2 }}
      />
      {!still && (
        <motion.circle
          cx="36"
          cy="36"
          r="8"
          className="glyph-ring"
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ scale: [1, 2.6], opacity: [0.7, 0] }}
          viewport={view}
          transition={{ duration: 1.4, delay: 0.6, ...loop }}
          style={{ transformOrigin: "36px 36px" }}
        />
      )}
    </>
  );
}

// The shield draws itself, then the check closes it.
function Security({ still }: { still: boolean }) {
  const drawn = still ? { pathLength: 1 } : { pathLength: 0 };
  return (
    <>
      <motion.path
        d="M36 10l20 7v15c0 13-8.6 22.6-20 27-11.4-4.4-20-14-20-27V17l20-7z"
        className="glyph-line"
        initial={drawn}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.path
        d="M27 36l6.5 6.5L46 30"
        className="glyph-line glyph-accent-line"
        initial={drawn}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 0.45, delay: 0.85, ease: "easeOut" }}
      />
    </>
  );
}

// An old phone, and a frame-time line that stays flat and smooth across it.
function Device({ still }: { still: boolean }) {
  return (
    <>
      <rect x="20" y="8" width="32" height="56" rx="6" className="glyph-line" />
      <path d="M32 57h8" className="glyph-line" />
      <motion.path
        d="M24 38c3 0 3-6 6-6s3 6 6 6 3-6 6-6 3 6 6 6"
        className="glyph-line glyph-accent-line"
        initial={still ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 1.2, ease: "linear", ...(still ? {} : loop) }}
      />
    </>
  );
}

// A lead in the middle hands the work to each agent in turn.
function Team({ still }: { still: boolean }) {
  const agents = [
    [14, 14],
    [58, 14],
    [58, 58],
    [14, 58],
  ] as const;
  return (
    <>
      {agents.map(([x, y], i) => (
        <g key={i}>
          <motion.line
            x1="36"
            y1="36"
            x2={x}
            y2={y}
            className="glyph-line glyph-thin"
            initial={still ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={view}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.25 }}
          />
          <circle cx={x} cy={y} r="5" className="glyph-quiet" />
          {!still && (
            <motion.circle
              r="2.6"
              className="glyph-accent"
              initial={{ cx: 36, cy: 36, opacity: 0 }}
              whileInView={{ cx: [36, x], cy: [36, y], opacity: [1, 1, 0] }}
              viewport={view}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.35, repeat: Infinity, repeatDelay: 1.6 + 3 * 0.35 }}
            />
          )}
        </g>
      ))}
      <circle cx="36" cy="36" r="7" className="glyph-accent" />
    </>
  );
}
