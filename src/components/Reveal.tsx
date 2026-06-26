import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Animation delay in seconds. */
  delay?: number
  /** Initial vertical offset in px. */
  y?: number
  /** Initial horizontal offset in px. */
  x?: number
  /** Fraction of the element that must be visible before triggering. */
  amount?: number
  once?: boolean
}

/**
 * Fades + slides its children into view as they enter the viewport. Falls back
 * to a static render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  amount = 0.3,
  once = false,
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
