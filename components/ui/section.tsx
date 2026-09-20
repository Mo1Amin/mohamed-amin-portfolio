import type { ReactNode } from 'react'
import { Reveal } from './reveal'
import { cn } from '@/lib/cn'

export function Section({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative scroll-mt-24 py-[var(--section-space)]', className)}
    >
      {children}
    </section>
  )
}

export type HeadingLevel = 1 | 2

export function SectionHeader({
  id,
  index,
  label,
  title,
  lede,
  action,
  level = 2,
}: {
  id: string
  index: string
  label: string
  title: string
  lede?: string
  action?: ReactNode
  /** A section becomes the page heading when it is the subject of its own route. */
  level?: HeadingLevel
}) {
  const Heading = level === 1 ? 'h1' : 'h2'

  return (
    <header className="flex flex-col gap-6">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-10 bg-accent" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal step={1}>
          <Heading
            id={`${id}-title`}
            className={level === 1 ? 'display-hero max-w-[14ch]' : 'display-section max-w-[16ch]'}
          >
            {title}
          </Heading>
        </Reveal>
        {action && <Reveal step={2}>{action}</Reveal>}
      </div>

      {lede && (
        <Reveal step={2}>
          <p className="prose-measure text-base leading-relaxed text-muted md:text-lg">{lede}</p>
        </Reveal>
      )}
    </header>
  )
}
