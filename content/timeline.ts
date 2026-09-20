import { certifications, educationEntries } from './education'
import { leadershipEntries } from './leadership'
import type { TimelineItem } from './types'

/**
 * A single reading order for the animated timeline. Exact dates are not
 * documented for the leadership entries, so ordering is editorial (education,
 * then certifications, then leadership) rather than invented chronology.
 */
export const timelineItems: TimelineItem[] = [
  ...educationEntries.map<TimelineItem>((entry) => ({
    id: entry.id,
    kind: 'education',
    title: entry.program,
    organization: entry.institution,
    period: entry.period,
    description: entry.description ?? entry.program,
    current: false,
  })),

  ...certifications.map<TimelineItem>((certification) => ({
    id: certification.id,
    kind: 'certification',
    title: certification.title,
    organization: certification.issuer,
    period: {
      en: certification.year ?? '',
      ar: certification.year ?? '',
      sv: certification.year ?? '',
    },
    description: certification.issuer,
    current: false,
  })),

  ...leadershipEntries
    .slice()
    .sort((a, b) => a.order - b.order)
    .map<TimelineItem>((entry) => ({
      id: entry.id,
      kind: 'leadership',
      title: entry.title,
      organization: entry.organization,
      period: entry.periodLabel,
      description: entry.description,
      current: entry.current,
    })),
]
