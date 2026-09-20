import type { Locale } from './copy';

/**
 * Preference primitives shared by the server-rendered inline script and the
 * client provider.
 *
 * This module deliberately has no 'use client' directive: importing these keys
 * from a client module would turn them into client references, and the inline
 * script would be generated with stubs instead of the real strings.
 */
export type Theme = 'dark' | 'light';
export type Mode = 'bold' | 'calm';

export const LOCALE_KEY = 'locale';
export const THEME_KEY = 'theme';
export const MODE_KEY = 'mode';

export const locales: readonly Locale[] = ['en', 'ar', 'sv'];
export const themes: readonly Theme[] = ['dark', 'light'];
export const modes: readonly Mode[] = ['bold', 'calm'];

export const defaultLocale: Locale = 'en';
export const defaultTheme: Theme = 'dark';
export const defaultMode: Mode = 'bold';

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
