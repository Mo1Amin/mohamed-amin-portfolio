'use client'

import { useEffect, useState } from 'react'
import { usePreferences } from '@/components/providers/preferences'
import { homeSectionIds, type HomeSectionId } from '@/lib/routes'
import { cn } from '@/lib/cn'

/**
 * Scroll rail for the home page: it names the section currently in view and
 * lets a reader jump between them. It is a plain anchor list, so it works
 * without JavaScript-driven scrolling and with the keyboard.
 */
export function SectionRail() {
  const { t } = usePreferences()
  const [active, setActive] = useState<HomeSectionId>('hero')

  useEffect(() => {
    const sections = homeSectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id as HomeSectionId)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label={t.a11y.sectionProgress}
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 start-4 2xl:block"
    >
      <ul className="flex flex-col gap-2.5">
        {homeSectionIds.map((id) => {
          const isActive = id === active
          const section = t.sections[id]
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  aria-hidden
                  className={cn(
                    'h-px transition-all duration-300',
                    isActive ? 'w-8 bg-accent' : 'w-4 bg-line-strong group-hover:w-6',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-faint group-hover:text-muted',
                  )}
                >
                  {section.index}
                </span>
                {/* The label stays collapsed so the rail never crowds the page
                    gutter; it expands on hover and focus. */}
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs text-muted transition-all duration-300 group-hover:max-w-[12rem] group-focus-visible:max-w-[12rem]">
                  {section.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
