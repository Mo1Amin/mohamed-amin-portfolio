'use client'

import Link from 'next/link'
import { usePreferences } from '@/components/providers/preferences'
import { getSpotlight } from '@/content/spotlights'
import { getProjectsByIds } from '@/content/projects'
import { tr, trList } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { cn } from '@/lib/cn'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { PendingNote } from '@/components/ui/pending-note'
import { DeviceFrame } from '@/components/visuals/device-frame'
import { ModelDiagram } from '@/components/visuals/model-diagram'

/** The mobile and AI spotlights share one layout and swap the visual. */
export function SpotlightSection({ id }: { id: 'mobile' | 'ai' }) {
  const { locale, t } = usePreferences()
  const spotlight = getSpotlight(id)
  const related = getProjectsByIds(spotlight.relatedProjectIds)
  const section = t.sections[id]

  return (
    <Section id={id} className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id={id}
          index={section.index}
          label={section.label}
          title={section.title}
          lede={tr(spotlight.lede, locale)}
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className={cn(id === 'ai' && 'lg:order-2')}>
            {id === 'mobile' ? (
              <DeviceFrame caption={t.spotlight.deviceCaption} />
            ) : (
              <ModelDiagram caption={t.spotlight.modelCaption} />
            )}
          </Reveal>

          <div className={cn('flex flex-col gap-8', id === 'ai' && 'lg:order-1')}>
            <Reveal step={1}>
              <dl className="flex flex-col divide-y divide-[color:var(--border)] border-y border-line">
                {spotlight.points.map((point) => (
                  <div
                    key={point.id}
                    className="grid gap-1 py-4 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                      {tr(point.label, locale)}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted">
                      {tr(point.detail, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal step={2}>
              <PendingNote
                label={t.spotlight.pendingLabel}
                items={trList(spotlight.pending, locale)}
              />
            </Reveal>

            {related.length > 0 && (
              <Reveal step={3}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{t.spotlight.relatedLabel}</span>
                  {related.map((project) => (
                    <Link
                      key={project.id}
                      href={localePath(locale, `/projects/${project.slug}`)}
                      className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      {tr(project.title, locale)}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
