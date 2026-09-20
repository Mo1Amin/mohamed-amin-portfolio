'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { localeDirection, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import {
  MODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  defaultMode,
  defaultTheme,
  themes,
  visualModes,
  type Theme,
  type VisualMode,
} from '@/lib/preferences'

export type { Theme, VisualMode }

type PreferencesValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: Dictionary
  theme: Theme
  mode: VisualMode
  setTheme: (theme: Theme) => void
  setMode: (mode: VisualMode) => void
  toggleTheme: () => void
  toggleMode: () => void
}

const PreferencesContext = createContext<PreferencesValue | null>(null)

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    if (value && (allowed as readonly string[]).includes(value)) return value as T
  } catch {
    // Storage can be unavailable (private mode, blocked cookies): ignore.
  }
  return fallback
}

/**
 * React owns neither `data-theme` nor `data-mode` on <html>, so hydration
 * clears what the inline script set. This runs during the hydration commit,
 * before the browser paints, and puts the stored preference back.
 */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function PreferencesProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  // Dark-first Bold defaults, matching what the server renders.
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mode, setModeState] = useState<VisualMode>(defaultMode)

  useBeforePaint(() => {
    const storedTheme = readStored<Theme>(THEME_STORAGE_KEY, themes, defaultTheme)
    const storedMode = readStored<VisualMode>(MODE_STORAGE_KEY, visualModes, defaultMode)

    setThemeState(storedTheme)
    setModeState(storedMode)
    document.documentElement.setAttribute('data-theme', storedTheme)
    document.documentElement.setAttribute('data-mode', storedMode)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies): ignore.
    }
  }, [])

  const setMode = useCallback((next: VisualMode) => {
    setModeState(next)
    document.documentElement.setAttribute('data-mode', next)
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable: ignore.
    }
  }, [])

  const value = useMemo<PreferencesValue>(
    () => ({
      locale,
      dir: localeDirection[locale],
      t: dictionary,
      theme,
      mode,
      setTheme,
      setMode,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      toggleMode: () => setMode(mode === 'bold' ? 'calm' : 'bold'),
    }),
    [locale, dictionary, theme, mode, setTheme, setMode],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences(): PreferencesValue {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider')
  return value
}
