import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { navItems, profile, socials } from '../../data/profile'
import { ButtonRouterLink } from '../ui/Button'
import { EASE_BRAND } from '../../lib/motion'
import { cn } from '../../lib/cn'

/** Full-screen overlay menu with staggered links, scroll lock, Esc, focus trap. */
export function MobileMenu({
  open,
  onClose,
  active,
  onHome,
}: {
  open: boolean
  onClose: () => void
  active: string
  onHome: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const links = [...navItems, { id: 'freelance', label: 'Freelance' }]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-bg-dark/95 fixed inset-0 z-[80] flex flex-col p-6 backdrop-blur-xl outline-none lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gradient font-serif text-xl font-bold italic">
              {profile.brand}
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <X size={22} aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="flex flex-col gap-1">
              {links.map((item, i) => {
                const isFreelance = item.id === 'freelance'
                // Section links scroll on home, else navigate home + hash.
                const to = isFreelance
                  ? '/freelance'
                  : onHome
                    ? undefined
                    : `/#${item.id}`
                const className = cn(
                  'font-display block py-3 text-4xl font-extrabold tracking-tight transition-colors',
                  active === item.id ? 'text-gradient' : 'text-white/80',
                )
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.5,
                      ease: EASE_BRAND,
                    }}
                  >
                    {to ? (
                      <Link to={to} onClick={onClose} className={className}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={`#${item.id}`} onClick={onClose} className={className}>
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <div className="space-y-5">
            <ButtonRouterLink to="/freelance" onClick={onClose} arrow className="w-full">
              Let&apos;s Collaborate
            </ButtonRouterLink>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-white/60 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
