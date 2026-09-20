import Link from 'next/link'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localePath } from '@/lib/routes'

/**
 * Rendered for unknown routes. It cannot read the locale segment, so it uses
 * the default locale copy.
 */
export default function NotFound() {
  const t = getDictionary(defaultLocale)

  return (
    <div className="shell flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <span className="eyebrow">404</span>
      <h1 className="display-section max-w-[14ch]">{t.notFound.title}</h1>
      <p className="prose-measure text-muted">{t.notFound.body}</p>
      <Link
        href={localePath(defaultLocale)}
        className="w-fit rounded-full border border-line-strong px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        {t.notFound.action}
      </Link>
    </div>
  )
}
