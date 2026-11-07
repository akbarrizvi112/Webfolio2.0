import { useMemo, useState } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { GigCard } from './GigCard'
import {
  gigs,
  gigTiers,
  gigCategories,
  currencies,
  type GigCategoryId,
} from '../../data/freelance'
import { cn } from '../../lib/cn'

type Filter = GigCategoryId | 'all'

export function GigsSection() {
  const [filter, setFilter] = useState<Filter>('all')
  const [currencyIndex, setCurrencyIndex] = useState(0)
  const currency = currencies[currencyIndex] ?? currencies[0]!

  const visible = useMemo(
    () => (filter === 'all' ? gigs : gigs.filter((g) => g.categoryId === filter)),
    [filter],
  )

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: `All Services (${gigs.length})` },
    ...gigCategories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ]

  return (
    <section
      id="gigs"
      className="bg-bg-light mt-24 mb-2 scroll-mt-24 rounded-[28px] pt-12 pb-16 sm:mb-3 lg:mt-28 lg:pt-16 lg:pb-24"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-text-dark text-3xl font-black tracking-tight sm:text-4xl">
              Production Gigs &amp; Delivery Packages
            </h2>
            <p className="text-text-muted mt-3 text-base">
              Fixed-scope packages you can order directly with a click. Switch currency or
              tiers anytime.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            {/* Currency switch */}
            <div
              role="group"
              aria-label="Display currency"
              className="inline-flex rounded-full border border-[color:var(--border-light)] bg-white p-1 shadow-sm"
            >
              {currencies.map((c, i) => (
                <button
                  key={c.code}
                  type="button"
                  aria-pressed={i === currencyIndex}
                  onClick={() => setCurrencyIndex(i)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
                    i === currencyIndex
                      ? 'bg-violet text-white'
                      : 'text-text-muted hover:text-text-dark',
                  )}
                >
                  {c.code}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl border border-[color:var(--border-light)] bg-white/70 p-1.5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={filter === t.id}
                  onClick={() => setFilter(t.id)}
                  className={cn(
                    'rounded-xl px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
                    filter === t.id
                      ? 'bg-violet text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.7)]'
                      : 'text-text-muted hover:text-text-dark hover:bg-black/[0.03]',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gigs */}
        <div className="mt-10 grid gap-5">
          {visible.map((gig) => (
            <Reveal key={gig.id}>
              <GigCard gig={gig} tiers={gigTiers[gig.id] ?? []} currency={currency} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
