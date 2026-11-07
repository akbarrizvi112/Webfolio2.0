import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { EASE_BRAND } from '../../lib/motion'
import { cn } from '../../lib/cn'
import type { Faq } from '../../data/faq'

type Variant = 'dark' | 'cards'

/** Accessible single-open accordion with animated height and rotating icon. */
export function Accordion({
  items,
  variant = 'dark',
}: {
  items: readonly Faq[]
  variant?: Variant
}) {
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const isCards = variant === 'cards'

  return (
    <div className={isCards ? 'space-y-3' : 'divide-y divide-white/10'}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-btn-${i}`
        const panelId = `${baseId}-panel-${i}`
        return (
          <div
            key={item.q}
            className={
              isCards
                ? cn(
                    'overflow-hidden rounded-2xl bg-white shadow-[0_10px_34px_-16px_rgba(80,40,140,0.3)] transition-shadow duration-300',
                    isOpen &&
                      'ring-violet/30 shadow-[0_18px_48px_-18px_rgba(139,92,246,0.45)] ring-1',
                  )
                : undefined
            }
          >
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 text-left font-semibold',
                  isCards
                    ? 'text-text-dark px-5 py-4 text-[0.95rem] sm:px-6'
                    : 'py-5 text-[0.975rem] text-white',
                )}
              >
                {item.q}
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full',
                    isCards ? 'bg-violet/10' : 'bg-white/10',
                  )}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_BRAND }}
                    className="grid place-items-center"
                  >
                    <Plus
                      size={16}
                      className={isCards ? 'text-violet' : 'text-lilac'}
                      aria-hidden
                    />
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_BRAND }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      isCards
                        ? 'text-text-muted px-5 pb-5 sm:px-6'
                        : 'pr-12 pb-5 text-white/65',
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
