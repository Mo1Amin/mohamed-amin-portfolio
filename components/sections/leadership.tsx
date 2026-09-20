'use client'

import { useMemo } from 'react'
import { usePreferences } from '@/components/providers/preferences'
import { leadershipEntries } from '@/content/leadership'
import type { TimelineItem } from '@/content/types'
import { tr } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { Section, SectionHeader, type HeadingLevel } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { Timeline } from '@/components/ui/timeline'
import { ActionLink } from '@/components/ui/action-link'

export function LeadershipSection({
  showAction = true,
  level = 2,
}: {
  showAction?: boolean
  level?: HeadingLevel
}) {
  const { locale, t } = usePreferences()

  const items = useMemo<TimelineItem[]>(
    () =>
      [...leadershipEntries]
        .sort((a, b) => a.order - b.order)
        .map((entry) => ({
          id: entry.id,
          kind: 'leadership',
          title: entry.title,
          organization: entry.organization,
          period: entry.periodLabel,
          description: entry.description,
          current: entry.current,
        })),
    [],
  )

  return (
    <Section id="leadership" className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="leadership"
          index={t.sections.leadership.index}
          label={t.sections.leadership.label}
          title={t.sections.leadership.title}
          lede={t.leadership.lede}
          level={level}
          action={
            showAction ? (
              <ActionLink href={localePath(locale, '/leadership')} variant="ghost">
                {t.nav.leadership}
              </ActionLink>
            ) : undefined
          }
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-16">
          <Timeline items={items} label={t.leadership.timelineLabel} />

          <Reveal step={1}>
            <aside className="panel flex flex-col gap-6 p-6 md:p-8">
              <span className="eyebrow">{t.leadership.responsibilitiesLabel}</span>
              <ul className="flex flex-col divide-y divide-[color:var(--border)]">
                {[...leadershipEntries]
                  .sort((a, b) => a.order - b.order)
                  .map((entry) => (
                    <li key={entry.id} className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0">
                      <span className="font-display text-base">{tr(entry.title, locale)}</span>
                      <span className="text-sm text-muted">
                        {tr(entry.responsibilities, locale)}
                      </span>
                    </li>
                  ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
