import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { BrandIcon, type BrandName } from './BrandIcon'
import { EASE_BRAND } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'

export interface SocialLinkItem {
  label: string
  icon: BrandName
  href: string
  color: string
}

function IconLink({ item, open }: { item: SocialLinkItem; open: boolean }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={item.label}
      tabIndex={open ? 0 : -1}
      aria-hidden={!open}
      style={{ color: item.color }}
      className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
    >
      <BrandIcon name={item.icon} size={18} />
    </a>
  )
}

/**
 * Wraps a trigger (e.g. a button). On hover or keyboard focus, the given
 * social links slide out in a row to the right of it, each linking to its
 * account. Honours reduced motion (fade only, no slide).
 */
export function SocialReveal({
  socials,
  children,
  className,
}: {
  socials: readonly SocialLinkItem[]
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  // Track input modality so a mouse click on the trigger doesn't open the
  // reveal (that should be hover-only); keyboard focus still opens it.
  const keyboard = useRef(false)

  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseDown={() => {
        keyboard.current = false
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab') keyboard.current = true
      }}
      onFocus={() => {
        if (keyboard.current) setOpen(true)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      {children}

      <div
        className={cn(
          'absolute top-1/2 left-full ml-3 flex -translate-y-1/2 items-center gap-2',
          open ? '' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        {socials.map((s, i) => (
          <motion.div
            key={s.label}
            initial={false}
            animate={{
              x: open || reduced ? 0 : -10,
              opacity: open ? 1 : 0,
              scale: open ? 1 : 0.6,
            }}
            transition={{
              duration: reduced ? 0.15 : 0.3,
              ease: EASE_BRAND,
              delay: open && !reduced ? i * 0.05 : 0,
            }}
          >
            <IconLink item={s} open={open} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
