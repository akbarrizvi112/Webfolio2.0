import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'

/**
 * Infinite horizontal marquee. The track is duplicated so the loop is
 * seamless; pauses on hover; under reduced motion it becomes a static,
 * horizontally scrollable row.
 */
export function Marquee({
  children,
  speed = 38,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={cn('mask-fade-x overflow-x-auto', className)}>
        <div className="flex w-max gap-10">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn('mask-fade-x group overflow-hidden', className)}>
      <div
        className="flex w-max animate-[marquee_linear_infinite] gap-10 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 gap-10">{children}</div>
        <div className="flex shrink-0 gap-10" aria-hidden>
          {children}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}
