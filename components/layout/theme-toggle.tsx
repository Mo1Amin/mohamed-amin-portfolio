'use client'

import { usePreferences } from '@/components/providers/preferences'
import { MoonIcon, SunIcon } from '@/components/ui/icons'

export function ThemeToggle() {
  const { theme, toggleTheme, t } = usePreferences()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
