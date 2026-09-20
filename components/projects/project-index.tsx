'use client'

import { useMemo, useState } from 'react'
import { usePreferences } from '@/components/providers/preferences'
import { projects } from '@/content/projects'
import type { ProjectCategory } from '@/content/types'
import { cn } from '@/lib/cn'
import { ProjectRow } from './project-row'

type Filter = 'all' | ProjectCategory

const filters: Filter[] = ['all', 'web', 'mobile', 'ai_ml', 'backend', 'product', 'leadership']

export function ProjectIndex() {
  const { t } = usePreferences()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(() => {
    const ordered = [...projects].sort((a, b) => a.order - b.order)
    if (filter === 'all') return ordered
    return ordered.filter((project) => project.category.includes(filter))
  }, [filter])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div role="group" aria-label={t.projects.filterLabel} className="flex flex-wrap gap-2">
          {filters.map((id) => {
            const active = filter === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                  active
                    ? 'border-accent bg-accent text-accent-fg'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink',
                )}
              >
                {t.projects.filters[id]}
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="font-mono text-xs text-faint">
          {visible.length} {visible.length === 1 ? t.projects.countOne : t.projects.countMany}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="flex flex-col border-b border-line">
          {visible.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-10 text-sm text-muted">{t.projects.empty}</p>
      )}
    </div>
  )
}
