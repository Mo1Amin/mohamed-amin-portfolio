import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'
import en from './en'
import ar from './ar'
import sv from './sv'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, ar, sv }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}
