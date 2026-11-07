import { Fragment } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { EASE_BRAND } from '../../lib/motion'

export type Tone = 'gradient' | 'warm' | 'dark' | 'faded' | 'white'

export interface ToneSegment {
  text: string
  tone: Tone
}

const toneClass: Record<Tone, string> = {
  gradient: 'text-gradient',
  warm: 'text-gradient-warm',
  dark: 'text-text-dark',
  faded: 'text-text-faded',
  white: 'text-white',
}

/**
 * Multi-tone section heading. Words animate in with a stagger as the
 * heading scrolls into view (fade + rise), the signature pattern used
 * across About / Experience / Testimonials / FAQ.
 */
export function ToneHeading({
  segments,
  className,
  as = 'h2',
}: {
  segments: readonly ToneSegment[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const MotionTag = motion[as]
  let wordIndex = 0

  return (
    <MotionTag
      className={cn(
        'max-w-3xl font-extrabold text-balance',
        'text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08]',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {segments.map((seg, si) => {
        const words = seg.text.split(' ')
        return (
          <Fragment key={si}>
            {words.map((word, wi) => {
              const i = wordIndex++
              return (
                <motion.span
                  key={`${si}-${wi}`}
                  className={cn('inline-block', toneClass[seg.tone])}
                  variants={{
                    hidden: { opacity: 0, y: '0.3em' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE_BRAND },
                    },
                  }}
                  custom={i}
                >
                  {word}
                  {wi < words.length - 1 ? ' ' : ''}
                </motion.span>
              )
            })}{' '}
          </Fragment>
        )
      })}
    </MotionTag>
  )
}
