'use client'

import { usePreferences } from '@/components/providers/preferences'
import { timelineItems } from '@/content/timeline'
import { Section, SectionHeader } from '@/components/ui/section'
import { Timeline } from '@/components/ui/timeline'

/** Education, certifications, and leadership on one rail (About page). */
export function JourneySection() {
  const { t } = usePreferences()

  return (
    <Section id="journey" className="border-t border-line">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          id="journey"
          index={t.sections.journey.index}
          label={t.sections.journey.label}
          title={t.sections.journey.title}
        />
        <Timeline items={timelineItems} label={t.leadership.timelineLabel} />
      </div>
    </Section>
  )
}
