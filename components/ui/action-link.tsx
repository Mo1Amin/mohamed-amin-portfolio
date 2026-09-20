import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from './icons'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'quiet'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg hover:brightness-110 border border-transparent glow-accent',
  ghost: 'border border-line-strong text-ink hover:border-accent hover:text-accent',
  quiet: 'border border-transparent text-muted hover:text-ink',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  icon?: ReactNode
}

const baseClass =
  'group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition-[filter,color,border-color,transform] duration-200'

export function ActionLink({
  href,
  children,
  variant = 'primary',
  className,
  icon,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={cn(baseClass, variants[variant], className)}>
      {children}
      {icon ?? <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />}
    </Link>
  )
}

export function ExternalActionLink({
  href,
  children,
  variant = 'ghost',
  className,
  newTabLabel,
}: CommonProps & { href: string; newTabLabel: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(baseClass, variants[variant], className)}
    >
      {children}
      <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="sr-only">{newTabLabel}</span>
    </a>
  )
}
