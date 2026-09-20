'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import type { TimelineItem } from '@/content/types'
import { usePreferences } from '@/components/providers/preferences'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/cn'
import { tr } from '@/lib/i18n'
import type { Locale } from '@/i18n/config'

/**
 * Animated timeline. The rail fills with scroll position, and each entry
 * reveals once. With reduced motion the rail is drawn in full and the entries
 * render immediately.
 */
export function Timeline({ items, label }: { items: TimelineItem[]; label: string }) {
  const { locale, t } = usePreferences()
  const containerRef = useRef<HTMLOListElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 55%'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <ol
      ref={containerRef}
      aria-label={label}
      className="relative flex flex-col gap-10 ps-8 md:ps-12"
    >
      <div aria-hidden className="absolute inset-y-0 start-[7px] w-px bg-line md:start-[11px]">
        <motion.div
          className="h-full w-full origin-top bg-accent"
          style={reduceMotion ? { scaleY: 1 } : { scaleY: railScale }}
        />
      </div>

      {items.map((item, index) => (
        <TimelineEntry
          key={item.id}
          item={item}
          index={index}
          locale={locale}
          currentLabel={t.leadership.current}
        />
      ))}
    </ol>
  )
}

function TimelineEntry({
  item,
  index,
  locale,
  currentLabel,
}: {
  item: TimelineItem
  index: number
  locale: Locale
  currentLabel: string
}) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useReveal<HTMLLIElement>()
  const visible = reduceMotion || revealed

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 40}ms` : '0ms' }}
      className={cn(
        'relative transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
      )}
    >
      <span
        aria-hidden
        className="absolute -start-8 top-1.5 flex h-4 w-4 items-center justify-center md:-start-12"
      >
        <span className="h-2.5 w-2.5 rounded-full border border-accent bg-canvas" />
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
            {tr(item.period, locale)}
          </span>
          {item.current && (
            <span className="rounded-full border border-signal/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal">
              {currentLabel}
            </span>
          )}
        </div>

        <h3 className="font-display text-xl leading-tight md:text-2xl">{tr(item.title, locale)}</h3>
        <p className="text-sm text-muted">{tr(item.organization, locale)}</p>
        <p className="prose-measure text-sm leading-relaxed text-muted">
          {tr(item.description, locale)}
        </p>
      </div>
    </li>
  )
}
