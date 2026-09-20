'use client'

import { usePreferences } from '@/components/providers/preferences'
import { siteProfile } from '@/content/site'
import { tr } from '@/lib/i18n'

/** The short credibility strip from the design brief, held to one quiet line. */
export function ProofStrip() {
  const { locale } = usePreferences()

  return (
    <div className="border-b border-line bg-surface/40">
      <ul className="shell flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
        {siteProfile.disciplines.map((discipline, index) => (
          <li key={index} className="flex items-center gap-6">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              {tr(discipline, locale)}
            </span>
            {index < siteProfile.disciplines.length - 1 && (
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent/60" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
