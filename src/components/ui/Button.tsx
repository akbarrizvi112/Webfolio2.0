import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'gradient' | 'glass' | 'ghost'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  /** show a trailing arrow that slides on hover */
  arrow?: boolean
  className?: string
}

const variants: Record<Variant, string> = {
  gradient:
    'text-[#160f24] [background:var(--signature-gradient)] shadow-[0_10px_30px_-10px_rgba(167,139,250,0.7)] hover:shadow-[0_14px_40px_-8px_rgba(240,166,202,0.75)]',
  glass:
    'text-white bg-white/10 border border-white/15 backdrop-blur-xl hover:bg-white/15',
  ghost:
    'text-text-dark bg-transparent border border-[color:var(--border-light)] hover:bg-black/[0.03]',
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 will-change-transform'

function Arrow() {
  return (
    <ArrowUpRight
      size={16}
      strokeWidth={2.5}
      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden
    />
  )
}

/** Internal/anchor link styled as a button (href, hashes, external). */
export function ButtonLink({
  children,
  variant = 'gradient',
  arrow = false,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<'a'>) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </a>
  )
}

export function Button({
  children,
  variant = 'gradient',
  arrow = false,
  className,
  ...props
}: BaseProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

/** Client-side router link styled as a button (for in-app navigation). */
export function ButtonRouterLink({
  children,
  variant = 'gradient',
  arrow = false,
  className,
  ...props
}: BaseProps & LinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}
