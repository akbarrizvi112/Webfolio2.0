import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'motion/react'
import { useLenis } from '../hooks/useLenis'
import { EASE_BRAND } from '../lib/motion'

function LenisProvider({ children }: { children: ReactNode }) {
  useLenis()
  return <>{children}</>
}

/** App-wide providers: SEO head manager, smooth scroll, motion defaults. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user" transition={{ ease: EASE_BRAND, duration: 0.7 }}>
        <LenisProvider>{children}</LenisProvider>
      </MotionConfig>
    </HelmetProvider>
  )
}
