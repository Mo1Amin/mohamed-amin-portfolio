'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { usePreferences } from '@/components/providers/preferences'
import { projects } from '@/content/projects'
import type { CaseStudyField, Project } from '@/content/types'
import { tr, trList } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { StatusBadge } from '@/components/ui/status-badge'
import { PendingNote } from '@/components/ui/pending-note'
import { Reveal } from '@/components/ui/reveal'
import { ArrowIcon, ArrowUpRightIcon } from '@/components/ui/icons'

const caseStudyOrder: CaseStudyField[] = [
  'problem',
  'solution',
  'responsibilities',
  'challenges',
  'outcome',
  'technicalNotes',
]

export function CaseStudy({ project }: { project: Project }) {
  const { locale, t } = usePreferences()
  const reduceMotion = useReducedMotion()

  const ordered = [...projects].sort((a, b) => a.order - b.order)
  const position = ordered.findIndex((entry) => entry.id === project.id)
  const previous = position > 0 ? ordered[position - 1] : undefined
  const next = position < ordered.length - 1 ? ordered[position + 1] : undefined

  const present = caseStudyOrder.filter((field) => Boolean(project.caseStudy?.[field]))
  const missing = caseStudyOrder.filter((field) => !project.caseStudy?.[field])

  const linkEntries = (
    [
      ['github', project.links.github],
      ['live', project.links.live],
      ['googlePlay', project.links.googlePlay],
      ['testFlight', project.links.testFlight],
    ] as const
  ).filter((entry): entry is [keyof typeof t.projects.links, string] => Boolean(entry[1]))

  const pendingItems = [
    ...missing.map((field) => t.projects.caseStudy[field]),
    ...trList(project.pendingInformation, locale),
  ]

  return (
    <article className="flex flex-col">
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
        <div className="shell relative flex flex-col gap-6 py-12 md:py-20">
          <Link
            href={localePath(locale, '/projects')}
            className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
            {t.actions.backToProjects}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} label={t.projects.status[project.status]} />
            <span className="text-xs text-faint">{t.projects.statusHint[project.status]}</span>
          </div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="display-hero max-w-[16ch] font-display"
          >
            {tr(project.title, locale)}
          </motion.h1>

          <p className="prose-measure text-base leading-relaxed text-muted md:text-lg">
            {tr(project.shortSummary, locale)}
          </p>
        </div>
      </header>

      <div className="shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-10">
          {present.length > 0 ? (
            present.map((field, index) => (
              <Reveal key={field} step={index}>
                <section className="flex flex-col gap-3">
                  <h2 className="eyebrow">{t.projects.caseStudy[field]}</h2>
                  <p className="prose-measure text-lg leading-relaxed">
                    {tr(project.caseStudy![field]!, locale)}
                  </p>
                </section>
              </Reveal>
            ))
          ) : (
            <Reveal>
              <p className="prose-measure text-lg leading-relaxed text-muted">
                {t.projects.pendingHint}
              </p>
            </Reveal>
          )}

          <Reveal step={2}>
            <PendingNote
              label={t.projects.pendingLabel}
              hint={t.projects.pendingHint}
              items={pendingItems}
            />
          </Reveal>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div className="panel corner-ticks flex flex-col gap-6 p-6 md:p-8">
            {project.role && (
              <div className="flex flex-col gap-2">
                <span className="eyebrow">{t.projects.roleLabel}</span>
                <p className="text-sm text-muted">{tr(project.role, locale)}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <span className="eyebrow">{t.projects.stackLabel}</span>
              {project.technologies.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li
                      key={technology.id}
                      className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.68rem] text-muted"
                    >
                      {technology.label}
                      <span className="text-faint">· {t.projects.source[technology.source]}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-faint">{t.projects.source.pending}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <span className="eyebrow">{t.projects.linksLabel}</span>
              {linkEntries.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {linkEntries.map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        {t.projects.links[key]}
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        <span className="sr-only">{t.a11y.opensInNewTab}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-faint">{t.projects.noLinks}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <span className="eyebrow">{t.projects.filterLabel}</span>
              <ul className="flex flex-wrap gap-2">
                {project.category.map((category) => (
                  <li
                    key={category}
                    className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
                  >
                    {t.projects.filters[category]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <nav aria-label={t.nav.projects} className="border-t border-line">
        <div className="shell grid gap-4 py-8 sm:grid-cols-2">
          {previous ? (
            <Link
              href={localePath(locale, `/projects/${previous.slug}`)}
              className="group flex flex-col gap-1 rounded-[var(--radius-card)] border border-line p-5 transition-colors hover:border-accent"
            >
              <span className="eyebrow">{t.actions.backToProjects}</span>
              <span className="font-display text-lg group-hover:text-accent">
                {tr(previous.title, locale)}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={localePath(locale, `/projects/${next.slug}`)}
              className="group flex flex-col gap-1 rounded-[var(--radius-card)] border border-line p-5 text-end transition-colors hover:border-accent"
            >
              <span className="eyebrow">{t.actions.viewCaseStudy}</span>
              <span className="font-display text-lg group-hover:text-accent">
                {tr(next.title, locale)}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  )
}
