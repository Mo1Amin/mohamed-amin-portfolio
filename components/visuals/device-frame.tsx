'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useReveal } from '@/hooks/use-reveal'

/**
 * Abstract device frame. It deliberately shows no invented screenshots: the app
 * screens are listed as pending content next to it.
 */
export function DeviceFrame({ caption }: { caption: string }) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useReveal<HTMLDivElement>()
  const visible = reduceMotion || revealed

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[290px]">
      <div className="corner-ticks panel relative aspect-[9/19] overflow-hidden rounded-[2.25rem] p-3">
        <div className="relative flex h-full flex-col gap-4 rounded-[1.75rem] border border-line bg-canvas-deep p-4">
          <div aria-hidden className="mx-auto h-1.5 w-16 rounded-full bg-line-strong" />

          <div aria-hidden className="flex flex-col gap-2">
            <div className="h-2 w-20 rounded-full bg-line-strong" />
            <div className="h-2 w-32 rounded-full bg-line" />
          </div>

          <div aria-hidden className="rounded-2xl border border-line bg-surface p-3">
            <svg viewBox="0 0 120 48" className="h-16 w-full" role="presentation">
              <motion.polyline
                points="0,34 12,30 24,36 36,22 48,26 60,12 72,20 84,8 96,18 108,10 120,16"
                className="fill-none stroke-accent"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: visible ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <div aria-hidden className="flex flex-col gap-2.5">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-3 rounded-xl border border-line p-2.5">
                <span className="h-6 w-6 rounded-full border border-line-strong" />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="block h-1.5 w-2/3 rounded-full bg-line-strong" />
                  <span className="block h-1.5 w-1/3 rounded-full bg-line" />
                </span>
              </div>
            ))}
          </div>

          <p className="mt-auto text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
            {caption}
          </p>
        </div>
      </div>
    </div>
  )
}
