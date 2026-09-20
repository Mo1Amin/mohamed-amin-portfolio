'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useReveal } from '@/hooks/use-reveal'

const layers = [
  { x: 18, nodes: [22, 44, 66, 88] },
  { x: 60, nodes: [30, 55, 80] },
  { x: 102, nodes: [40, 70] },
  { x: 140, nodes: [55] },
]

/**
 * Decorative depiction of a model feeding an application. It shows structure,
 * not results: no metrics are implied or displayed.
 */
export function ModelDiagram({ caption }: { caption: string }) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useReveal<HTMLDivElement>()
  const visible = reduceMotion || revealed

  const edges: { from: [number, number]; to: [number, number] }[] = []
  layers.forEach((layer, index) => {
    const next = layers[index + 1]
    if (!next) return
    layer.nodes.forEach((y) => {
      next.nodes.forEach((ny) => {
        edges.push({ from: [layer.x, y], to: [next.x, ny] })
      })
    })
  })

  return (
    <div ref={ref} className="corner-ticks panel flex flex-col gap-5 p-6 md:p-8">
      <svg viewBox="0 0 160 110" className="h-auto w-full" aria-hidden>
        {edges.map((edge, index) => (
          <motion.line
            key={index}
            x1={edge.from[0]}
            y1={edge.from[1]}
            x2={edge.to[0]}
            y2={edge.to[1]}
            className="stroke-line-strong"
            strokeWidth="0.4"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : Math.min(index * 0.012, 0.6),
            }}
          />
        ))}

        {layers.map((layer, layerIndex) =>
          layer.nodes.map((y) => (
            <motion.circle
              key={`${layer.x}-${y}`}
              cx={layer.x}
              cy={y}
              r={layerIndex === layers.length - 1 ? 4 : 2.6}
              className={layerIndex === layers.length - 1 ? 'fill-accent' : 'fill-muted'}
              initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : 0.2 + layerIndex * 0.12,
              }}
              style={{ transformOrigin: `${layer.x}px ${y}px` }}
            />
          )),
        )}
      </svg>

      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">{caption}</p>
    </div>
  )
}
