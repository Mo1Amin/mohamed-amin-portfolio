'use client'

import Link from 'next/link'
import { usePreferences } from '@/components/providers/preferences'
import { siteProfile } from '@/content/site'
import { tr } from '@/lib/i18n'
import { localePath, navItems } from '@/lib/routes'
import { ArrowUpRightIcon, GithubIcon } from '@/components/ui/icons'

export function SiteFooter() {
  const { locale, t } = usePreferences()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-canvas-deep">
      <div className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-20">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{siteProfile.displayName}</span>
          <p className="prose-measure font-display text-2xl leading-tight">
            {tr(siteProfile.role, locale)}
          </p>
          <p className="max-w-sm text-sm text-muted">{t.footer.builtWith}</p>
        </div>

        <nav aria-label={t.a11y.mainNav}>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href={localePath(locale)} className="text-muted transition-colors hover:text-ink">
                {t.nav.home}
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={localePath(locale, item.path)}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {t.nav[item.id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2.5 text-sm">
            {siteProfile.socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                >
                  <GithubIcon />
                  {tr(link.label, locale)}
                  <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="sr-only">{t.a11y.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-faint">{t.footer.localeNote}</p>
          <p className="text-xs text-faint">{t.footer.directionNote}</p>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteProfile.displayName}. {t.footer.rights}
        </p>
        <a href="#main" className="transition-colors hover:text-ink">
          {t.actions.backToTop}
        </a>
      </div>
    </footer>
  )
}
