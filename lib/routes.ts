import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

/** Builds a locale-prefixed path, e.g. localePath('ar', '/projects') -> '/ar/projects'. */
export function localePath(locale: Locale, path: string = '/'): string {
  if (path === '/' || path === '') return `/${locale}`
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Strips the locale prefix so the language switcher can keep the reader on the
 * same route.
 */
export function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length <= 1) return '/'
  return `/${segments.slice(1).join('/')}`
}

export type NavItem = {
  id: keyof Dictionary['nav']
  path: string
  /** Anchor used when the home page is already open. */
  hash?: string
}

export const navItems: NavItem[] = [
  { id: 'about', path: '/about', hash: '#about' },
  { id: 'projects', path: '/projects', hash: '#projects' },
  { id: 'skills', path: '/skills', hash: '#skills' },
  { id: 'leadership', path: '/leadership', hash: '#leadership' },
  { id: 'contact', path: '/contact', hash: '#contact' },
]

export const homeSectionIds = [
  'hero',
  'about',
  'projects',
  'skills',
  'leadership',
  'mobile',
  'ai',
  'education',
  'contact',
] as const

export type HomeSectionId = (typeof homeSectionIds)[number]
