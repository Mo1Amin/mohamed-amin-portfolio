'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Vars = { accent: string; muted: string }

function readVars(): Vars {
  const styles = getComputedStyle(document.documentElement)
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#4d8dff',
    muted: styles.getPropertyValue('--text-muted').trim() || '#6d7894',
  }
}

/**
 * Pointer-aware dot field behind the hero.
 *
 * It is decorative: it carries no information, it is hidden from assistive
 * technology, it renders a static grid when the reader prefers reduced motion,
 * and the animation loop stops whenever the field is off-screen or the tab is
 * hidden.
 */
export function SignalField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let frame = 0
    let running = true
    let visible = true
    let vars = readVars()

    const pointer = { x: -9999, y: -9999, active: false }
    const spacing = 26
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const columns = Math.ceil(width / spacing)
      const rows = Math.ceil(height / spacing)
      const t = reduceMotion ? 0 : time / 1600

      for (let column = 0; column <= columns; column += 1) {
        for (let row = 0; row <= rows; row += 1) {
          const x = column * spacing + spacing / 2
          const y = row * spacing + spacing / 2

          const wave = reduceMotion ? 0.35 : (Math.sin(column * 0.35 + t) + Math.cos(row * 0.3 - t)) * 0.25 + 0.4

          let influence = 0
          if (pointer.active) {
            const dx = x - pointer.x
            const dy = y - pointer.y
            const distance = Math.hypot(dx, dy)
            influence = Math.max(0, 1 - distance / 190)
          }

          const radius = 0.7 + wave * 0.9 + influence * 2.6
          const alpha = 0.16 + wave * 0.14 + influence * 0.75

          context.beginPath()
          context.fillStyle = influence > 0.08 ? vars.accent : vars.muted
          context.globalAlpha = Math.min(alpha, 0.95)
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }
      }
      context.globalAlpha = 1
    }

    const loop = (time: number) => {
      if (!running) return
      draw(time)
      if (!reduceMotion && visible) frame = window.requestAnimationFrame(loop)
    }

    const start = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = event.pointerType === 'mouse'
      if (reduceMotion) draw(0)
    }

    const onPointerLeave = () => {
      pointer.active = false
      if (reduceMotion) draw(0)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        if (visible) start()
        else window.cancelAnimationFrame(frame)
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      vars = readVars()
      if (reduceMotion) draw(0)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode'],
    })

    const onResize = () => {
      resize()
      draw(performance.now())
    }

    const onVisibilityChange = () => {
      visible = !document.hidden
      if (visible) start()
      else window.cancelAnimationFrame(frame)
    }

    resize()
    draw(0)
    if (!reduceMotion) start()

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
