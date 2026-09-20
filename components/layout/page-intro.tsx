'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Shared page opening for the routes outside the home page. */
export function PageIntro({
  index,
  label,
  title,
  lede,
  children,
}: {
  index: string
  label: string
  title: string
  lede?: string
  children?: ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="shell relative flex flex-col gap-6 py-16 md:py-24">
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-10 bg-accent" />
          <span className="eyebrow">{label}</span>
        </div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="display-hero max-w-[14ch] font-display"
        >
          {title}
        </motion.h1>

        {lede && <p className="prose-measure text-base leading-relaxed text-muted md:text-lg">{lede}</p>}
        {children}
      </div>
    </header>
  )
}
