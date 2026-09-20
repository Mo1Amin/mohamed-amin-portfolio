'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveal state with a safety net.
 *
 * Content must never stay invisible because an observer did not report: if the
 * element is already on screen shortly after mount and nothing has fired, it is
 * revealed anyway. Sections further down still wait for the reader to reach
 * them, so the scroll storytelling is unaffected.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-6% 0px -6% 0px' },
    )
    observer.observe(element)

    const fallback = window.setTimeout(() => {
      const rect = element.getBoundingClientRect()
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0
      if (onScreen) {
        setRevealed(true)
        observer.disconnect()
      }
    }, 900)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return { ref, revealed }
}
