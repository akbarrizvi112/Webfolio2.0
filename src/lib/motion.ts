import type { Variants, Transition } from 'motion/react'

/** The single brand easing used across the whole site. */
export const EASE_BRAND = [0.22, 1, 0.36, 1] as const

export const transition = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_BRAND,
})

/** Simple fade + rise, used by <Reveal> and most on-scroll entrances. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE_BRAND },
  }),
}

/** Container that staggers its children. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

/** Line that masks up from below (hero headline). */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE_BRAND },
  }),
}
