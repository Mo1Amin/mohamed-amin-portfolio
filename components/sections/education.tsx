'use client'

import { usePreferences } from '@/components/providers/preferences'
import { certifications, educationEntries } from '@/content/education'
import { tr } from '@/lib/i18n'
import { Section, SectionHeader, type HeadingLevel } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export function EducationSection({ level = 2 }: { level?: HeadingLevel }) {
  const { locale, t } = usePreferences()

  return (
    <Section id="education" className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="education"
          index={t.sections.education.index}
          label={t.sections.education.label}
          title={t.sections.education.title}
          level={level}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            {educationEntries.map((entry, index) => (
              <Reveal key={entry.id} step={index}>
                <article className="corner-ticks panel flex flex-col gap-4 p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="eyebrow">{t.education.degreeLabel}</span>
                    <span className="font-mono text-xs text-accent tabular-nums">
                      {tr(entry.period, locale)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">
                    {tr(entry.program, locale)}
                  </h3>
                  <p className="text-sm text-muted">{tr(entry.institution, locale)}</p>
                  {entry.description && (
                    <p className="prose-measure text-sm leading-relaxed text-muted">
                      {tr(entry.description, locale)}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal step={1}>
            <div className="flex flex-col gap-5">
              <span className="eyebrow">{t.education.certificationsLabel}</span>
              <ul className="flex flex-col divide-y divide-[color:var(--border)] border-t border-line">
                {certifications.map((certification) => (
                  <li
                    key={certification.id}
                    className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-lg leading-snug">
                        {tr(certification.title, locale)}
                      </span>
                      <span className="text-sm text-muted">{tr(certification.issuer, locale)}</span>
                    </div>
                    {certification.year && (
                      <span className="font-mono text-xs text-faint tabular-nums">
                        {certification.year}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
