import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { navItems, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ButtonRouterLink } from '../ui/Button'
import { MobileMenu } from './MobileMenu'
import { cn } from '../../lib/cn'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const onFreelance = pathname === '/freelance'
  const activeSection = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Which chip is highlighted: a section on home, or the Freelance route.
  const activeKey = onHome ? activeSection : pathname === '/freelance' ? 'freelance' : ''

  return (
    <>
      <header
        className={cn(
          'pointer-events-none inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-10 lg:pt-5 xl:px-16',
          // On the freelance page the bar scrolls away with the content;
          // everywhere else it stays pinned to the viewport.
          onFreelance ? 'absolute' : 'fixed',
        )}
      >
        <div
          className={cn(
            'pointer-events-auto mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            scrolled
              ? 'bg-bg-dark/80 border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              : 'bg-bg-dark/55 border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl',
          )}
        >
          {/* Logo — profile picture */}
          <Link
            to="/"
            aria-label={`${profile.brand} — home`}
            className="group shrink-0 rounded-full p-[2px] shadow-[0_6px_22px_-6px_rgba(167,139,250,0.85)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [background:var(--signature-gradient)] hover:-translate-y-0.5"
          >
            <img
              src={profile.heroPortrait}
              alt=""
              width={40}
              height={40}
              className="block h-9 w-9 rounded-full border-2 border-[#0b0714] object-cover object-top sm:h-10 sm:w-10"
            />
          </Link>

          {/* Center links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavChip
                  key={item.id}
                  label={item.label}
                  active={activeKey === item.id}
                  // On home: smooth-scroll anchor (Lenis). Off home: go home + hash.
                  anchor={onHome ? `#${item.id}` : undefined}
                  to={onHome ? undefined : `/#${item.id}`}
                />
              ))}
              <NavChip
                label="Freelance"
                active={activeKey === 'freelance'}
                to="/freelance"
              />
            </ul>
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex shrink-0 items-center gap-2">
            <ButtonRouterLink
              to="/freelance"
              arrow
              className="hidden px-5 py-2.5 sm:inline-flex"
            >
              Let&apos;s Collaborate
            </ButtonRouterLink>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl lg:hidden"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={activeKey}
        onHome={onHome}
      />
    </>
  )
}

function NavChip({
  label,
  active,
  anchor,
  to,
}: {
  label: string
  active: boolean
  anchor?: string
  to?: string
}) {
  const className = cn(
    'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors',
    active ? 'text-white' : 'text-white/60 hover:text-white',
  )
  const chip = active && (
    <motion.span
      layoutId="nav-chip"
      className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/10"
      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
    />
  )
  return (
    <li className="relative">
      {anchor ? (
        <a href={anchor} aria-current={active ? 'true' : undefined} className={className}>
          {chip}
          {label}
        </a>
      ) : (
        <Link
          to={to ?? '/'}
          aria-current={active ? 'page' : undefined}
          className={className}
        >
          {chip}
          {label}
        </Link>
      )}
    </li>
  )
}
