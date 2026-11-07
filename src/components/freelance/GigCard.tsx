import { useState } from 'react'
import {
  Check,
  Minus,
  Clock,
  RefreshCw,
  FileText,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Star,
} from 'lucide-react'
import type { Gig, GigTier, Currency } from '../../data/freelance'
import { formatPrice } from '../../data/freelance'
import { cn } from '../../lib/cn'

/**
 * Fiverr-style gig card: cover art, tags and social proof on the left, a
 * Basic / Standard / Premium package panel on the right. Tier selection,
 * the tier comparison and the copy-URL state all live per-card.
 */
export function GigCard({
  gig,
  tiers,
  currency,
}: {
  gig: Gig
  tiers: readonly GigTier[]
  currency: Currency
}) {
  const popularIndex = tiers.findIndex((t) => t.popular)
  const [active, setActive] = useState(popularIndex === -1 ? 0 : popularIndex)
  const [imgOk, setImgOk] = useState(true)
  const [compareOpen, setCompareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const tier = tiers[active]

  if (!tier) return null

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(gig.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  const meta = [
    { icon: Clock, label: tier.delivery },
    { icon: RefreshCw, label: tier.revisions },
    { icon: FileText, label: tier.pages },
  ]

  return (
    <article className="bg-surface-light rounded-3xl border border-[color:var(--border-light)] p-4 shadow-[0_10px_40px_-12px_rgba(80,40,140,0.18)] sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ------------------------------------------------- Left column --- */}
        <div className="flex flex-col">
          <p className="text-text-muted font-mono text-[11px] tracking-wide">
            {gig.category}
          </p>
          <h3 className="font-display text-text-dark mt-1.5 text-xl font-black tracking-tight sm:text-[1.6rem]">
            {gig.title}
          </h3>

          {/* Cover */}
          <div
            className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-black/5"
            style={{ background: gig.wash }}
          >
            {imgOk && (
              <img
                src={gig.image}
                alt={`${gig.title} — gig cover`}
                loading="lazy"
                onError={() => setImgOk(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />

            {gig.sellerBadge && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#1dbf73] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                <ShieldCheck size={12} aria-hidden />
                {gig.sellerBadge}
              </span>
            )}

            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {gig.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-text-muted mt-4 text-sm leading-relaxed">
            {gig.description}
          </p>

          {/* Footer row */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <button
              type="button"
              onClick={() => setCompareOpen((v) => !v)}
              aria-expanded={compareOpen}
              className="text-violet hover:text-violet/80 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              <BookOpen size={15} aria-hidden />
              Compare all {tiers.length} package tiers
            </button>
            {gig.completedOrders && (
              <span className="text-text-muted text-sm">{gig.completedOrders}</span>
            )}
          </div>

          {/* Comparison table */}
          {compareOpen && (
            <div className="mt-4 overflow-hidden rounded-xl border border-[color:var(--border-light)]">
              <div className="grid grid-cols-3 divide-x divide-[color:var(--border-light)]">
                {tiers.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'p-3 text-left transition-colors',
                      i === active ? 'bg-violet/[0.06]' : 'hover:bg-black/[0.02]',
                    )}
                  >
                    <span className="text-text-muted block text-[11px] font-semibold tracking-wide uppercase">
                      {t.label}
                    </span>
                    <span className="font-display text-text-dark mt-1 block text-sm font-black">
                      {formatPrice(t.priceUsd, currency)}
                    </span>
                    <span className="text-text-muted mt-1 block text-xs">
                      {t.delivery}
                    </span>
                    <span className="text-text-muted block text-xs">{t.pages}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --------------------------------------------- Package panel --- */}
        <div className="border-violet/10 bg-violet/[0.04] rounded-2xl border p-4 sm:p-5">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label={`${gig.title} packages`}
            className="grid grid-cols-3 gap-1 rounded-full bg-white/70 p-1 shadow-inner"
          >
            {tiers.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full py-2 text-sm font-semibold transition-colors duration-200',
                  i === active
                    ? 'bg-surface-light text-text-dark shadow-[0_2px_10px_-4px_rgba(80,40,140,0.35)]'
                    : 'text-text-muted hover:text-text-dark',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Name + popular */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-text-muted text-xs font-bold tracking-[0.12em] uppercase">
              {tier.name}
            </span>
            {tier.popular && (
              <span className="text-violet bg-violet/10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                <Star size={11} className="fill-violet" aria-hidden />
                Most Popular
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-text-dark text-[2.1rem] leading-none font-black tracking-tight">
              {formatPrice(tier.priceUsd, currency)}
            </span>
            <span className="text-text-muted text-sm">{tier.priceNote}</span>
          </div>

          <p className="text-text-muted mt-3 text-sm leading-relaxed">
            {tier.description}
          </p>

          {/* Meta */}
          <div className="border-violet/10 text-text-dark/75 mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border bg-white/60 px-3 py-2.5 text-[13px] font-medium">
            {meta.map(({ icon: Icon, label }, i) => (
              <span key={label} className="inline-flex items-center gap-x-2">
                {i > 0 && (
                  <span className="text-text-faded" aria-hidden>
                    ·
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Icon size={14} className="text-violet" aria-hidden />
                  {label}
                </span>
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="mt-4 grid gap-2.5">
            {tier.features.map((f) => (
              <li
                key={f.label}
                className={cn(
                  'flex items-start gap-2 text-sm',
                  f.included ? 'text-text-dark/85' : 'text-text-faded line-through',
                )}
              >
                {f.included ? (
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-500"
                    aria-hidden
                  />
                ) : (
                  <Minus
                    size={16}
                    className="text-text-faded mt-0.5 shrink-0"
                    aria-hidden
                  />
                )}
                {f.label}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={gig.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,47,208,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [background:linear-gradient(135deg,#7c3aed,#4f2fd0)] hover:-translate-y-0.5"
          >
            Continue on Fiverr
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>

          <button
            type="button"
            onClick={copyUrl}
            className="text-text-muted hover:text-violet mx-auto mt-3 block text-xs font-medium transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Direct Fiverr URL'}
          </button>
        </div>
      </div>
    </article>
  )
}
