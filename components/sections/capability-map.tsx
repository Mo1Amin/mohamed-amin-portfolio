'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePreferences } from '@/components/providers/preferences'
import { skillCategories, getSkillsByCategory } from '@/content/skills'
import { getProjectsByIds } from '@/content/projects'
import type { SkillCategoryId } from '@/content/types'
import { tr } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { cn } from '@/lib/cn'
import { Section, SectionHeader, type HeadingLevel } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

const RADIUS = 37

function nodePosition(index: number, total: number) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180)
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  }
}

/**
 * Interactive capability map.
 *
 * The radial layout is decorative; the controls underneath it are real buttons
 * in a tablist, so the map works with a pointer, touch, and the keyboard alone.
 */
export function CapabilityMap({ level = 2 }: { level?: HeadingLevel }) {
  const { locale, t } = usePreferences()
  const reduceMotion = useReducedMotion()
  const categories = useMemo(
    () => [...skillCategories].sort((a, b) => a.order - b.order),
    [],
  )
  const [activeId, setActiveId] = useState<SkillCategoryId>(categories[0]?.id ?? 'web')
  const buttonsRef = useRef<Map<SkillCategoryId, HTMLButtonElement>>(new Map())

  const activeIndex = categories.findIndex((category) => category.id === activeId)
  const active = categories[activeIndex] ?? categories[0]
  const activeSkills = active ? getSkillsByCategory(active.id) : []

  const focusCategory = (index: number) => {
    const next = categories[(index + categories.length) % categories.length]
    if (!next) return
    setActiveId(next.id)
    buttonsRef.current.get(next.id)?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    if (event.key === 'Home') return focusCategory(0)
    if (event.key === 'End') return focusCategory(categories.length - 1)

    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    focusCategory(activeIndex + (forward ? 1 : -1))
  }

  if (!active) return null

  return (
    <Section id="skills" className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="skills"
          index={t.sections.skills.index}
          label={t.sections.skills.label}
          title={t.sections.skills.title}
          lede={t.skills.lede}
          level={level}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="flex flex-col gap-6">
              {/* Radial diagram: decorative, mirrors the selection below. */}
              <div
                aria-hidden
                className="relative mx-auto hidden aspect-square w-full max-w-[460px] md:block"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  <circle cx="50" cy="50" r={RADIUS} className="fill-none stroke-line" strokeWidth="0.25" />
                  <circle cx="50" cy="50" r={RADIUS / 2} className="fill-none stroke-line" strokeWidth="0.25" />
                  {categories.map((category, index) => {
                    const point = nodePosition(index, categories.length)
                    const isActive = category.id === active.id
                    return (
                      <line
                        key={category.id}
                        x1="50"
                        y1="50"
                        x2={point.x}
                        y2={point.y}
                        className={isActive ? 'stroke-accent' : 'stroke-line'}
                        strokeWidth={isActive ? 0.6 : 0.25}
                      />
                    )
                  })}
                  <circle cx="50" cy="50" r="2.4" className="fill-accent" />
                </svg>

                {categories.map((category, index) => {
                  const point = nodePosition(index, categories.length)
                  const isActive = category.id === active.id
                  return (
                    <motion.span
                      key={category.id}
                      animate={{ scale: isActive && !reduceMotion ? 1.06 : 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      className={cn(
                        'absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-[var(--radius-card)] border px-3 py-2 text-center transition-colors duration-300',
                        isActive
                          ? 'border-accent bg-accent-soft text-ink'
                          : 'border-line bg-surface text-muted',
                      )}
                    >
                      <span className="font-mono text-[0.7rem]">{category.glyph}</span>
                      <span className="max-w-[9ch] text-[0.65rem] leading-tight">
                        {tr(category.label, locale)}
                      </span>
                    </motion.span>
                  )
                })}
              </div>

              <div
                role="tablist"
                aria-label={t.skills.mapLabel}
                onKeyDown={onKeyDown}
                className="flex flex-wrap gap-2"
              >
                {categories.map((category) => {
                  const isActive = category.id === active.id
                  return (
                    <button
                      key={category.id}
                      ref={(node) => {
                        if (node) buttonsRef.current.set(category.id, node)
                        else buttonsRef.current.delete(category.id)
                      }}
                      type="button"
                      role="tab"
                      id={`capability-tab-${category.id}`}
                      aria-selected={isActive}
                      aria-controls="capability-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveId(category.id)}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                        isActive
                          ? 'border-accent bg-accent text-accent-fg'
                          : 'border-line text-muted hover:border-line-strong hover:text-ink',
                      )}
                    >
                      <span aria-hidden className="font-mono text-[0.7rem] opacity-70">
                        {category.glyph}
                      </span>
                      {tr(category.label, locale)}
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-faint">{t.skills.keyboardHint}</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                id="capability-panel"
                role="tabpanel"
                aria-labelledby={`capability-tab-${active.id}`}
                tabIndex={0}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28 }}
                className="panel corner-ticks flex flex-col gap-6 p-6 md:p-8"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="font-mono text-sm text-accent">
                      {active.glyph}
                    </span>
                    <h3 className="font-display text-2xl leading-tight">
                      {tr(active.label, locale)}
                    </h3>
                  </div>
                  <p className="prose-measure text-sm leading-relaxed text-muted">
                    {tr(active.summary, locale)}
                  </p>
                </div>

                <ul className="flex flex-col divide-y divide-[color:var(--border)] border-t border-line">
                  {activeSkills.map((skill) => {
                    const evidence = getProjectsByIds(skill.evidenceProjectIds)
                    return (
                      <li key={skill.id} className="flex flex-col gap-2 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="text-base">{tr(skill.name, locale)}</span>
                          {skill.levelLabel && (
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                              {tr(skill.levelLabel, locale)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-faint">{t.skills.evidenceLabel}:</span>
                          {evidence.length > 0 ? (
                            evidence.map((project) => (
                              <Link
                                key={project.id}
                                href={localePath(locale, `/projects/${project.slug}`)}
                                className="rounded-full border border-line px-2.5 py-1 text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                              >
                                {tr(project.title, locale)}
                              </Link>
                            ))
                          ) : (
                            <span className="text-faint">{t.skills.noEvidence}</span>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  )
}
