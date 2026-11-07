import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Generic rounded surface with the soft brand shadow. */
export function Card({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 shadow-[0_10px_40px_-12px_rgba(80,40,140,0.18)]',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
