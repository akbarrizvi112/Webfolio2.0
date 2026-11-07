import { cn } from '../../lib/cn'

/** Small pill with a gradient border used to label each section. */
export function SectionLabel({
  children,
  tone = 'light',
  className,
}: {
  children: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span
      className={cn(
        'border-gradient inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold tracking-wide',
        tone === 'dark' ? 'text-lilac' : 'text-text-dark',
        className,
      )}
      style={
        {
          ['--_bg' as string]: tone === 'dark' ? '#120b1f' : '#ffffff',
        } as React.CSSProperties
      }
    >
      <span className="bg-violet h-1.5 w-1.5 rounded-full" aria-hidden />
      {children}
    </span>
  )
}
