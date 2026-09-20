import type { TranslationLines, TranslationMap } from '@/content/types'
import { defaultLocale, type Locale } from '@/i18n/config'

export type Translated = {
  value: string
  /** True when the requested locale had no copy and English was used instead. */
  isFallback: boolean
}

/**
 * Fallback policy: use the requested locale when it has content, otherwise fall
 * back to English. A translated block must never render empty.
 */
export function translate(map: TranslationMap, locale: Locale): Translated {
  const requested = map[locale]?.trim()
  if (requested) return { value: requested, isFallback: false }

  const fallback = map[defaultLocale]?.trim() ?? ''
  return { value: fallback, isFallback: true }
}

export function tr(map: TranslationMap, locale: Locale): string {
  return translate(map, locale).value
}

export function trLines(lines: TranslationLines, locale: Locale): string[] {
  const requested = lines[locale]
  if (requested && requested.length > 0) return requested
  return lines[defaultLocale] ?? []
}

export function trList(maps: TranslationMap[], locale: Locale): string[] {
  return maps.map((map) => tr(map, locale)).filter(Boolean)
}
