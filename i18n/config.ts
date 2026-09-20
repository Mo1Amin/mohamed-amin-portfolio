export const locales = ['en', 'ar', 'sv'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
  sv: 'ltr',
}

/** Native names are intentionally written in their own language. */
export const localeLabels: Record<Locale, { native: string; short: string; english: string }> = {
  en: { native: 'English', short: 'EN', english: 'English' },
  ar: { native: 'العربية', short: 'ع', english: 'Arabic' },
  sv: { native: 'Svenska', short: 'SV', english: 'Swedish' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
