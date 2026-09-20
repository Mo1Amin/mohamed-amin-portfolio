import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Space_Grotesk } from 'next/font/google'
import { isLocale, locales, localeDirection, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { PreferencesProvider } from '@/components/providers/preferences'
import { PreferenceScript } from '@/components/providers/preference-script'
import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import '../globals.css'

const displayLatin = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display-latin',
  display: 'swap',
})

const bodyArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body-arabic',
  display: 'swap',
})

const monoLatin = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-latin',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)

  return {
    title: { default: t.meta.title, template: `%s — ${t.meta.title}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05070f' },
    { media: '(prefers-color-scheme: light)', color: '#f7f6f3' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const locale = rawLocale as Locale
  const dictionary = getDictionary(locale)

  // `data-theme` and `data-mode` are owned by the inline preference script
  // rather than by React: if React rendered them, hydration would overwrite a
  // stored choice. The CSS defaults to the dark Bold direction either way.
  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      suppressHydrationWarning
      className={`${displayLatin.variable} ${bodyArabic.variable} ${monoLatin.variable}`}
    >
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        {/* Runs before anything paints, so a stored theme never flashes. */}
        <PreferenceScript />
        <PreferencesProvider locale={locale} dictionary={dictionary}>
          <ScrollProgress />
          <SkipLink label={dictionary.a11y.skipToContent} />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter />
        </PreferencesProvider>
      </body>
    </html>
  )
}
