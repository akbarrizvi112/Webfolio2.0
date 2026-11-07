import type { ReactNode } from 'react'

/**
 * Page wrapper. A small gutter + dark backdrop lets each section read as a
 * rounded panel floating with a little space around it. `overflow-x-clip`
 * guarantees no sideways scroll from full-bleed visuals (giant words, orbs,
 * marquee) without introducing a scroll container that would break sticky.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="w-full overflow-x-clip bg-[#050308] p-2 sm:p-3">{children}</div>
}
