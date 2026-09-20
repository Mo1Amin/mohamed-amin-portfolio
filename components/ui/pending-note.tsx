import { cn } from '@/lib/cn'

/**
 * Renders the information that is deliberately missing. The design brief
 * forbids inventing facts, so unknown fields are shown as unknown instead of
 * being hidden or filled in.
 */
export function PendingNote({
  label,
  hint,
  items,
  className,
}: {
  label: string
  hint?: string
  items: string[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface-2/40 p-5',
        className,
      )}
    >
      <p className="eyebrow">{label}</p>
      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted">
            <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-line-strong" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
