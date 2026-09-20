'use client';
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { copy, type Locale } from './copy';
import {
  LOCALE_KEY, MODE_KEY, THEME_KEY,
  defaultLocale, defaultMode, defaultTheme,
  dirFor, isLocale,
  type Mode, type Theme,
} from './settings';

type PreferencesValue = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: (typeof copy)[Locale];
  theme: Theme;
  mode: Mode;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
};

const PreferencesContext = createContext<PreferencesValue | null>(null);

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore: the preference simply will not persist.
  }
}

// React does not render lang/dir/data-theme/data-mode, so hydration clears what
// the inline script set. This runs during the hydration commit, before paint.
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setModeState] = useState<Mode>(defaultMode);

  useBeforePaint(() => {
    const storedLocale = read(LOCALE_KEY);
    const storedTheme = read(THEME_KEY);
    const storedMode = read(MODE_KEY);

    const nextLocale = isLocale(storedLocale) ? storedLocale : defaultLocale;
    const nextTheme: Theme = storedTheme === 'light' ? 'light' : defaultTheme;
    const nextMode: Mode = storedMode === 'calm' ? 'calm' : defaultMode;

    setLocaleState(nextLocale);
    setThemeState(nextTheme);
    setModeState(nextMode);

    const root = document.documentElement;
    root.lang = nextLocale;
    root.dir = dirFor(nextLocale);
    root.dataset.theme = nextTheme;
    root.dataset.mode = nextMode;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    document.documentElement.dir = dirFor(next);
    write(LOCALE_KEY, next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    write(THEME_KEY, next);
  }, []);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    document.documentElement.dataset.mode = next;
    write(MODE_KEY, next);
  }, []);

  const value = useMemo<PreferencesValue>(
    () => ({ locale, dir: dirFor(locale), t: copy[locale], theme, mode, setLocale, setTheme, setMode }),
    [locale, theme, mode, setLocale, setTheme, setMode],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesValue {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider');
  return value;
}
