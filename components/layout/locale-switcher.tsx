'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePreferences } from '@/components/providers/preferences'
import { locales, localeLabels } from '@/i18n/config'
import { localePath, pathWithoutLocale } from '@/lib/routes'
import { cn } from '@/lib/cn'

/**
 * Language switching keeps the current route: only the locale segment changes,
 * so a reader on a case study stays on that case study.
 */
export function LocaleSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { locale, t } = usePreferences()
  const pathname = usePathname()
  const restOfPath = pathWithoutLocale(pathname ?? `/${locale}`)

  return (
    <nav aria-label={t.a11y.languageSwitcher}>
      <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-0.5">
        {locales.map((code) => {
          const active = code === locale
          return (
            <li key={code}>
              <Link
                href={localePath(code, restOfPath)}
                hrefLang={code}
                lang={code}
                aria-current={active ? 'true' : undefined}
                onClick={onNavigate}
                className={cn(
                  'flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-200',
                  active ? 'bg-ink text-canvas' : 'text-muted hover:text-ink',
                )}
              >
                <span aria-hidden>{localeLabels[code].short}</span>
                {/* The full name is given in its own language, and `lang` on the
                    link lets a screen reader pronounce it correctly. */}
                <span className="sr-only">{localeLabels[code].native}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
