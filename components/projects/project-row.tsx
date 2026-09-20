'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import type { Project } from '@/content/types'
import { usePreferences } from '@/components/providers/preferences'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/cn'
import { tr } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { StatusBadge } from '@/components/ui/status-badge'
import { ArrowUpRightIcon } from '@/components/ui/icons'

/**
 * A project reads as a case file row rather than a card in a grid: index,
 * title, status, summary, stack. The whole row is one link target.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { locale, t } = usePreferences()
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useReveal<HTMLLIElement>()
  const visible = reduceMotion || revealed

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 50}ms` : '0ms' }}
      className={cn(
        'group relative border-t border-line transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
    >
      <Link
        href={localePath(locale, `/projects/${project.slug}`)}
        className="grid gap-5 py-8 transition-colors duration-300 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-[0_50%] scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100 rtl:origin-[100%_50%]"
        />

        <div className="flex items-center gap-4 md:col-span-2 md:flex-col md:items-start md:gap-3">
          <span className="font-mono text-xs tracking-[0.14em] text-faint tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <StatusBadge
            status={project.status}
            label={t.projects.status[project.status]}
          />
        </div>

        <div className="flex flex-col gap-3 md:col-span-5">
          <h3 className="font-display text-2xl leading-tight transition-colors duration-300 group-hover:text-accent md:text-[2rem]">
            {tr(project.title, locale)}
          </h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.category.map((category) => (
              <li
                key={category}
                className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint"
              >
                {t.projects.filters[category]}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:col-span-4">
          <p className="text-sm leading-relaxed text-muted">{tr(project.shortSummary, locale)}</p>
          {project.technologies.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology.id}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                >
                  {technology.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-start md:col-span-1 md:justify-end">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
          >
            <ArrowUpRightIcon />
          </span>
          <span className="sr-only">{t.actions.viewCaseStudy}</span>
        </div>
      </Link>
    </li>
  )
}
