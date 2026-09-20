'use client'

import { useId } from 'react'
import { usePreferences, type VisualMode } from '@/components/providers/preferences'
import { cn } from '@/lib/cn'

/**
 * Bold / Calm switch. Both directions share the same markup and content, so the
 * switch only changes design tokens on <html>.
 */
export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode, t } = usePreferences()
  const hintId = useId()

  const options: { id: VisualMode; label: string; description: string }[] = [
    { id: 'bold', label: t.mode.bold, description: t.mode.switchToBold },
    { id: 'calm', label: t.mode.calm, description: t.mode.switchToCalm },
  ]

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        role="group"
        aria-label={t.mode.label}
        aria-describedby={hintId}
        className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-0.5"
      >
        {options.map((option) => {
          const active = mode === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              aria-label={option.description}
              onClick={() => setMode(option.id)}
              className={cn(
                'rounded-full px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-200',
                active
                  ? 'bg-accent text-accent-fg'
                  : 'text-muted hover:text-ink',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
      <span id={hintId} className="sr-only">
        {t.mode.hint}
      </span>
    </div>
  )
}
