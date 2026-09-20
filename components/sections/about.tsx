'use client'

import { usePreferences } from '@/components/providers/preferences'
import { siteProfile } from '@/content/site'
import { educationEntries } from '@/content/education'
import { tr } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { Section, SectionHeader, type HeadingLevel } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { ActionLink } from '@/components/ui/action-link'

export function AboutSection({
  showAction = true,
  level = 2,
}: {
  showAction?: boolean
  level?: HeadingLevel
}) {
  const { locale, t } = usePreferences()
  const education = educationEntries[0]

  return (
    <Section id="about">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="about"
          index={t.sections.about.index}
          label={t.sections.about.label}
          title={t.sections.about.title}
          level={level}
          action={
            showAction ? (
              <ActionLink href={localePath(locale, '/about')} variant="ghost">
                {t.nav.about}
              </ActionLink>
            ) : undefined
          }
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <Reveal>
            <p className="prose-measure text-lg leading-relaxed text-ink md:text-xl">
              {tr(siteProfile.longBio, locale)}
            </p>
          </Reveal>

          <Reveal step={1}>
            <div className="panel flex flex-col gap-8 p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <span className="eyebrow">{t.sections.skills.label}</span>
                <ul className="flex flex-wrap gap-2">
                  {siteProfile.disciplines.map((discipline, index) => (
                    <li
                      key={index}
                      className="rounded-full border border-line bg-surface-2/60 px-3 py-1.5 text-xs text-muted"
                    >
                      {tr(discipline, locale)}
                    </li>
                  ))}
                </ul>
              </div>

              {education && (
                <div className="flex flex-col gap-2 border-t border-line pt-6">
                  <span className="eyebrow">{t.education.degreeLabel}</span>
                  <p className="font-display text-lg leading-snug">
                    {tr(education.program, locale)}
                  </p>
                  <p className="text-sm text-muted">{tr(education.institution, locale)}</p>
                  <p className="font-mono text-xs text-faint">{tr(education.period, locale)}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
