import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

/** "View details" link shown on home sections, routing to the full page. */
export function ViewDetails({
  to,
  children = 'View details',
  tone = 'light',
  className,
}: {
  to: string
  children?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
        tone === 'dark'
          ? 'border-white/15 text-white hover:bg-white/10'
          : 'border-text-dark/15 text-text-dark hover:bg-black/[0.04]',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={16}
        strokeWidth={2.5}
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  )
}
