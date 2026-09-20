'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePreferences } from '@/components/providers/preferences'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { ModeToggle } from './mode-toggle'
import { CloseIcon, MenuIcon } from '@/components/ui/icons'
import { localePath, navItems, pathWithoutLocale } from '@/lib/routes'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const { locale, t } = usePreferences()
  const pathname = usePathname() ?? `/${locale}`
  const currentPath = pathWithoutLocale(pathname)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line bg-canvas/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href={localePath(locale)}
          className="group flex items-center gap-3"
          aria-label={t.nav.home}
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong bg-surface font-display text-sm font-bold tracking-tight transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
          >
            MA
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            Mohamed Amin
          </span>
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentPath.startsWith(item.path)
              return (
                <li key={item.id}>
                  <Link
                    href={localePath(locale, item.path)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                      active ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        transition={
                          reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                      />
                    )}
                    {t.nav[item.id]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <div className="hidden lg:block">
            <ModeToggle />
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-colors duration-200 hover:text-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex flex-col gap-6 py-6">
              <nav aria-label={t.a11y.mainNav}>
                <ul className="flex flex-col">
                  {navItems.map((item, index) => {
                    const active = currentPath.startsWith(item.path)
                    return (
                      <li key={item.id} className={index > 0 ? 'hairline' : undefined}>
                        <Link
                          href={localePath(locale, item.path)}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-baseline gap-4 py-3.5 font-display text-2xl tracking-tight',
                            active ? 'text-accent' : 'text-ink',
                          )}
                        >
                          <span aria-hidden className="font-mono text-[0.65rem] text-faint">
                            0{index + 1}
                          </span>
                          {t.nav[item.id]}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="flex flex-wrap items-center gap-3">
                <LocaleSwitcher onNavigate={() => setOpen(false)} />
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
