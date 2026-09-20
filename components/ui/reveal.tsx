'use client'

import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger index; each step adds 70ms. */
  step?: number
}

/**
 * Scroll reveal used across the page.
 *
 * The transition is plain CSS rather than a JavaScript animation: the revealed
 * state is declarative, so the content is correct even if the browser is busy
 * or throttling frames. With reduced motion the element simply renders.
 */
export function Reveal({ children, className, step = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const { ref, revealed } = useReveal<HTMLDivElement>()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <div
      ref={ref}
      style={{ transitionDelay: revealed ? `${step * 70}ms` : '0ms' }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
