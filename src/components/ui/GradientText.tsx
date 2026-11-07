import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Inline text with the signature or warm gradient fill. */
export function GradientText({
  children,
  variant = 'signature',
  as: Tag = 'span',
  className,
}: {
  children: ReactNode
  variant?: 'signature' | 'warm'
  as?: ElementType
  className?: string
}) {
  return (
    <Tag
      className={cn(
        variant === 'warm' ? 'text-gradient-warm' : 'text-gradient',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
