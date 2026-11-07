import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { fadeUp } from '../../lib/motion'

/**
 * Reveal-on-scroll wrapper. Fires once, honors reduced motion automatically
 * (handled globally by <MotionConfig reducedMotion="user">).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'span'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  )
}
