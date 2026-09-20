'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Decorative reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 120,
    damping: reduceMotion ? 100 : 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-[0_50%] bg-accent rtl:origin-[100%_50%]"
    />
  )
}
