"use client";

// The motion patterns follow itshover (https://github.com/itshover/itshover,
// Apache-2.0): each icon owns a start and a stop animation, and whatever holds
// it decides when to play them, so hovering a whole button moves its icon.

import { motion, useAnimate } from "motion/react";
import { useImperativeHandle, type ReactNode, type Ref } from "react";

type Animate = ReturnType<typeof useAnimate>[1];

export interface IconHandle {
  start: () => void;
  stop: () => void;
  press: () => void;
}

interface IconProps {
  ref?: Ref<IconHandle>;
  size?: number;
  className?: string;
}

interface Motion {
  start: (animate: Animate) => unknown;
  stop: (animate: Animate) => unknown;
  press?: (animate: Animate) => unknown;
}

function createIcon(name: string, body: ReactNode, moves: Motion) {
  function Icon({ ref, size = 20, className }: IconProps) {
    const [scope, animate] = useAnimate();

    useImperativeHandle(ref, () => ({
      start: () => moves.start(animate),
      stop: () => moves.stop(animate),
      press: () => (moves.press ?? moves.start)(animate),
    }));

    return (
      <svg
        ref={scope}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {body}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

const centre = { transformBox: "fill-box", transformOrigin: "center" } as const;

export const WhatsappIcon = createIcon(
  "WhatsappIcon",
  <>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <motion.path
      className="phone"
      style={centre}
      d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
    />
  </>,
  {
    start: (animate) => animate(".phone", { rotate: [0, -18, 16, -12, 8, 0] }, { duration: 0.5 }),
    stop: (animate) => animate(".phone", { rotate: 0 }, { duration: 0.2 }),
  },
);

export const InstagramIcon = createIcon(
  "InstagramIcon",
  <>
    <motion.rect className="body" style={centre} x="4" y="4" width="16" height="16" rx="4" />
    <motion.circle className="lens" style={centre} cx="12" cy="12" r="3.2" />
    <motion.path className="flash" d="M16.5 7.5v.01" />
  </>,
  {
    start: async (animate) => {
      animate(".body", { scale: [1, 1.08, 1] }, { duration: 0.3 });
      await animate(".lens", { scale: [1, 1.35, 1] }, { duration: 0.3 });
      animate(".flash", { opacity: [1, 0, 1, 0, 1] }, { duration: 0.35 });
    },
    stop: (animate) => animate(".body, .lens, .flash", { scale: 1, opacity: 1 }, { duration: 0.2 }),
  },
);

export const GithubIcon = createIcon(
  "GithubIcon",
  <motion.g className="cat" style={centre}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </motion.g>,
  {
    start: (animate) => animate(".cat", { scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }, { duration: 0.5 }),
    stop: (animate) => animate(".cat", { scale: 1, rotate: 0 }, { duration: 0.2 }),
  },
);

export const SendIcon = createIcon(
  "SendIcon",
  <motion.g className="plane" style={centre}>
    <path d="M10 14L21 3" />
    <path d="M21 3l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3" />
  </motion.g>,
  {
    start: (animate) =>
      animate(".plane", { x: 3, y: -3, rotate: -6 }, { type: "spring", stiffness: 400, damping: 12 }),
    stop: (animate) => animate(".plane", { x: 0, y: 0, rotate: 0, opacity: 1 }, { duration: 0.25 }),
    // The plane leaves through the top corner and slides back in from the
    // opposite one, so the icon is whole again by the time the mail app opens.
    press: async (animate) => {
      await animate(".plane", { x: 160, y: -110, rotate: -18, opacity: 0 }, { duration: 0.6, ease: [0.5, 0, 0.9, 0.4] });
      await animate(".plane", { x: -24, y: 24, rotate: 0 }, { duration: 0 });
      await animate(".plane", { x: 0, y: 0, opacity: 1 }, { duration: 0.35, ease: "easeOut" });
    },
  },
);

export const MailIcon = createIcon(
  "MailIcon",
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <motion.path className="flap" d="M3 7l9 6 9-6" />
  </>,
  {
    start: (animate) => animate(".flap", { d: "M3 7l9-5 9 5" }, { duration: 0.3, ease: "easeOut" }),
    stop: (animate) => animate(".flap", { d: "M3 7l9 6 9-6" }, { duration: 0.25 }),
  },
);

export const ArrowDownIcon = createIcon(
  "ArrowDownIcon",
  <motion.g className="arrow">
    <path d="M12 5v14" />
    <path d="M18 13l-6 6-6-6" />
  </motion.g>,
  {
    start: (animate) => animate(".arrow", { y: [0, 4, 0, 3, 0] }, { duration: 0.7 }),
    stop: (animate) => animate(".arrow", { y: 0 }, { duration: 0.2 }),
  },
);

export const ArrowOutIcon = createIcon(
  "ArrowOutIcon",
  <motion.g className="arrow">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </motion.g>,
  {
    start: async (animate) => {
      await animate(".arrow", { x: 10, y: -10, opacity: 0 }, { duration: 0.2, ease: "easeIn" });
      await animate(".arrow", { x: -10, y: 10 }, { duration: 0 });
      await animate(".arrow", { x: 0, y: 0, opacity: 1 }, { duration: 0.25, ease: "easeOut" });
    },
    stop: (animate) => animate(".arrow", { x: 0, y: 0, opacity: 1 }, { duration: 0.2 }),
  },
);

export const PenIcon = createIcon(
  "PenIcon",
  <motion.g className="pen" style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}>
    <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
    <path d="M12.5 6.5l5 5" />
  </motion.g>,
  {
    start: (animate) =>
      animate(".pen", { rotate: [0, -10, 6, -8, 0], x: [0, 1, -1, 1, 0] }, { duration: 0.6 }),
    stop: (animate) => animate(".pen", { rotate: 0, x: 0 }, { duration: 0.2 }),
  },
);

export const EraserIcon = createIcon(
  "EraserIcon",
  <motion.g className="eraser">
    <path d="M4 20h9M7.5 16.5l-3-3a1.5 1.5 0 0 1 0-2.1l7.9-7.9a1.5 1.5 0 0 1 2.1 0l4.5 4.5a1.5 1.5 0 0 1 0 2.1L12 17.1" />
    <path d="M9.5 8.5l6 6" />
  </motion.g>,
  {
    start: (animate) => animate(".eraser", { x: [0, -3, 3, -2, 0] }, { duration: 0.45 }),
    stop: (animate) => animate(".eraser", { x: 0 }, { duration: 0.2 }),
  },
);

export const SunIcon = createIcon(
  "SunIcon",
  <>
    <circle cx="12" cy="12" r="4" />
    <motion.g className="rays" style={{ transformOrigin: "12px 12px" }}>
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </motion.g>
  </>,
  {
    start: (animate) => animate(".rays", { rotate: 90 }, { duration: 0.6, ease: "easeInOut" }),
    stop: (animate) => animate(".rays", { rotate: 0 }, { duration: 0.4 }),
  },
);

export const MoonIcon = createIcon(
  "MoonIcon",
  <motion.path className="moon" style={centre} d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  {
    start: (animate) => animate(".moon", { rotate: [0, -20, 10, 0] }, { duration: 0.6 }),
    stop: (animate) => animate(".moon", { rotate: 0 }, { duration: 0.2 }),
  },
);
