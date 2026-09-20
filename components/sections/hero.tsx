'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { usePreferences } from '@/components/providers/preferences'
import { siteProfile } from '@/content/site'
import { tr, trLines } from '@/lib/i18n'
import { localePath } from '@/lib/routes'
import { ActionLink, ExternalActionLink } from '@/components/ui/action-link'
import { GithubIcon } from '@/components/ui/icons'
import { SignalField } from '@/components/visuals/signal-field'

export function Hero() {
  const { locale, t } = usePreferences()
  const reduceMotion = useReducedMotion()
  const lines = trLines(siteProfile.headlineLines, locale)
  const github = siteProfile.socialLinks.find((link) => link.id === 'github')

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden scroll-mt-24 border-b border-line"
    >
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />

      <div className="shell relative grid gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pb-28">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{t.hero.channel}</span>
            {siteProfile.availability && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="sr-only">{t.hero.availabilityLabel}: </span>
                {tr(siteProfile.availability, locale)}
              </span>
            )}
          </div>

          <h1 id="hero-title" className="display-hero font-display">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    delay: reduceMotion ? 0 : 0.1 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {index === lines.length - 1 ? (
                    <span className="text-accent">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.45 }}
            className="prose-measure text-base leading-relaxed text-muted md:text-lg"
          >
            {tr(siteProfile.shortBio, locale)}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <ActionLink href={localePath(locale, '/projects')}>{t.actions.exploreWork}</ActionLink>
            {github && (
              <ExternalActionLink href={github.url} newTabLabel={t.a11y.opensInNewTab}>
                <GithubIcon />
                {t.actions.openGithub}
              </ExternalActionLink>
            )}
          </motion.div>

          <p aria-hidden className="eyebrow flex items-center gap-3 pt-2">
            <span className="h-px w-8 bg-line-strong" />
            {t.hero.scrollHint}
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.2 }}
          className="corner-ticks panel relative min-h-[360px] overflow-hidden lg:min-h-[520px]"
        >
          <SignalField className="absolute inset-0 h-full w-full" />

          <div className="relative flex h-full flex-col justify-between gap-8 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow">{t.hero.signalLabel}</span>
              <span className="eyebrow tabular-nums">01 / 09</span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="eyebrow">{t.hero.telemetryLabel}</span>
              <dl className="flex flex-col divide-y divide-[color:var(--border)] border-t border-line">
                {siteProfile.proofPoints.map((point) => (
                  <div
                    key={point.id}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                      {tr(point.label, locale)}
                    </dt>
                    <dd className="text-sm text-muted sm:text-end">{tr(point.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
