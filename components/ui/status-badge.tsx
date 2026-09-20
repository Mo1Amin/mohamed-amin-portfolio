import type { ProjectStatus } from '@/content/types'
import { CheckIcon, ClockIcon, LockIcon, SparkIcon } from './icons'
import { cn } from '@/lib/cn'

const iconByStatus = {
  published: CheckIcon,
  coming_soon: ClockIcon,
  in_development: SparkIcon,
  private: LockIcon,
  pending: ClockIcon,
} as const

/** Status never depends on colour alone: every badge carries an icon and a label. */
export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ProjectStatus
  label: string
  className?: string
}) {
  const Icon = iconByStatus[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]',
        status === 'published'
          ? 'border-signal/40 text-signal'
          : status === 'in_development'
            ? 'border-accent/40 text-accent'
            : 'border-line-strong text-muted',
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}
