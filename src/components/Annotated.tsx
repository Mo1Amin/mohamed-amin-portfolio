"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { loopAround, underline, type Box } from "@/lib/ink/handDrawn";
import { centerlineToSvgPath, outline, outlineToSvgPath, smooth, type InkPoint } from "@/lib/ink/stroke";

interface Props {
  children: ReactNode;
  mark: "loop" | "underline";
  seed: number;
  delay?: number;
  weight?: number;
}

interface Stroke {
  fill: string;
  reveal: string;
  reach: number;
}

function toStroke(points: InkPoint[]): Stroke {
  return {
    fill: outlineToSvgPath(outline(smooth(points))),
    reveal: centerlineToSvgPath(points),
    reach: Math.max(...points.map((p) => p.w)) + 6,
  };
}

export function Annotated({ children, mark, seed, delay = 0, weight }: Props) {
  const maskId = useId();
  const hostRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const svg = svgRef.current;
    if (!host || !svg) return;

    const measure = () => {
      const origin = svg.getBoundingClientRect();
      const rtl = getComputedStyle(host).direction === "rtl";
      const relative = (r: DOMRect): Box => ({
        x: r.left - origin.left,
        y: r.top - origin.top,
        width: r.width,
        height: r.height,
      });

      if (mark === "loop") {
        setStrokes([toStroke(loopAround(relative(host.getBoundingClientRect()), seed, weight))]);
      } else {
        const lines = Array.from(host.getClientRects()).filter((r) => r.width > 0);
        setStrokes(lines.map((line, i) => toStroke(underline(relative(line), seed + i, rtl, weight))));
      }
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(host.parentElement ?? host);
    document.fonts?.ready.then(measure);

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDrawn(true);
        visible.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    visible.observe(host);

    return () => {
      resize.disconnect();
      visible.disconnect();
    };
  }, [mark, seed, weight]);

  return (
    <span ref={hostRef} className="annotated">
      {children}
      <svg ref={svgRef} className="annotated-ink" aria-hidden="true" data-drawn={drawn || undefined}>
        {strokes.map((stroke, i) => (
          <g key={i}>
            <mask id={`${maskId}-${i}`} maskUnits="userSpaceOnUse" x="-5000" y="-5000" width="10000" height="10000">
              <path
                d={stroke.reveal}
                pathLength={1}
                className="annotated-reveal"
                strokeWidth={stroke.reach}
                style={{ transitionDelay: `${delay + i * 380}ms` }}
              />
            </mask>
            <path d={stroke.fill} mask={`url(#${maskId}-${i})`} />
          </g>
        ))}
      </svg>
    </span>
  );
}
