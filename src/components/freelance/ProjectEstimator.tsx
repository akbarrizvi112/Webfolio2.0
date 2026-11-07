import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { BarChart3, Check, CheckCircle2 } from 'lucide-react'
import { Container } from '../ui/Container'
import { profile } from '../../data/profile'
import {
  estimatorTypes,
  estimatorScopes,
  estimatorAddons,
  estimatorVelocities,
  estimatorDefaults,
  computeEstimate,
  formatPkr,
} from '../../data/estimator'
import { EASE_BRAND } from '../../lib/motion'
import { cn } from '../../lib/cn'

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-text-muted mb-3 text-[11px] font-bold tracking-[0.1em] uppercase">
      {children}
    </p>
  )
}

export function ProjectEstimator() {
  const [typeId, setTypeId] = useState(estimatorDefaults.typeId)
  const [scopeId, setScopeId] = useState(estimatorDefaults.scopeId)
  const [addonIds, setAddonIds] = useState<readonly string[]>(estimatorDefaults.addonIds)
  const [velocityId, setVelocityId] = useState(estimatorDefaults.velocityId)

  const { type, scope, velocity, selectedAddons, estimate } = useMemo(() => {
    const type = estimatorTypes.find((t) => t.id === typeId) ?? estimatorTypes[0]!
    const scope = estimatorScopes.find((s) => s.id === scopeId) ?? estimatorScopes[0]!
    const velocity =
      estimatorVelocities.find((v) => v.id === velocityId) ?? estimatorVelocities[0]!
    const selectedAddons = estimatorAddons.filter((a) => addonIds.includes(a.id))
    return {
      type,
      scope,
      velocity,
      selectedAddons,
      estimate: computeEstimate(type, scope, selectedAddons, velocity),
    }
  }, [typeId, scopeId, addonIds, velocityId])

  const toggleAddon = (id: string) =>
    setAddonIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const reset = () => {
    setTypeId(estimatorDefaults.typeId)
    setScopeId(estimatorDefaults.scopeId)
    setAddonIds(estimatorDefaults.addonIds)
    setVelocityId(estimatorDefaults.velocityId)
  }

  const bookHref = useMemo(() => {
    const subject = `Custom project — ${type.label}`
    const body = [
      `Hi ${profile.name},`,
      '',
      "Here's the scope I configured with the estimator:",
      `• Type: ${type.label}`,
      `• Scope: ${scope.label}`,
      `• Add-ons: ${selectedAddons.map((a) => a.label).join(', ') || 'None'}`,
      `• Delivery: ${velocity.label}`,
      `• Estimated timeline: ~${estimate.days} days`,
      `• Estimated investment: ${formatPkr(estimate.price)}`,
      '',
      'Can we discuss next steps?',
    ].join('\n')
    return `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }, [type, scope, selectedAddons, velocity, estimate])

  const summary = [
    { label: 'Selected Type', value: type.label },
    { label: 'Scope', value: scope.label },
    { label: 'Selected Addons', value: `${estimate.addonCount} Selected` },
    { label: 'Timeline', value: `Approx ${estimate.days} Days` },
  ]

  return (
    <section
      className="relative mb-2 overflow-clip rounded-[28px] py-16 sm:mb-3 lg:py-24"
      style={{ background: 'linear-gradient(180deg,#f4f2fc 0%,#eceefb 100%)' }}
    >
      <div
        aria-hidden
        className="bg-violet/10 pointer-events-none absolute top-10 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-violet bg-violet/10 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-[0.15em] uppercase">
            <BarChart3 size={13} aria-hidden />
            Real-Time Project Estimator
          </span>
          <h2 className="font-display text-text-dark mt-4 text-3xl font-black tracking-tight text-balance sm:text-4xl">
            Estimate Your Custom Project in 30 Seconds
          </h2>
          <p className="text-text-muted mt-3">
            Configure your technical needs to calculate an instant investment estimate and
            delivery timeline.
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-light mt-10 rounded-[28px] border border-[color:var(--border-light)] p-5 shadow-[0_20px_60px_-24px_rgba(80,40,140,0.25)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
            {/* ---------------------------------------- Configurator --- */}
            <div>
              {/* 1. Application type */}
              <div>
                <GroupLabel>1. Select Application Type</GroupLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {estimatorTypes.map((t) => {
                    const on = t.id === typeId
                    return (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setTypeId(t.id)}
                        className={cn(
                          'rounded-xl border p-4 text-left transition-colors',
                          on
                            ? 'border-violet bg-violet/[0.06] ring-violet/30 ring-1'
                            : 'hover:border-violet/40 border-[color:var(--border-light)] bg-white',
                        )}
                      >
                        <span className="font-display text-text-dark block text-sm font-bold">
                          {t.label}
                        </span>
                        <span className="text-text-muted mt-1 block font-mono text-[11px]">
                          {t.sub}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Scope */}
              <div className="mt-7">
                <GroupLabel>2. UI Scope &amp; Page Count</GroupLabel>
                <div className="grid grid-cols-3 gap-2">
                  {estimatorScopes.map((s) => {
                    const on = s.id === scopeId
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setScopeId(s.id)}
                        className={cn(
                          'rounded-xl border px-2 py-3 text-center transition-colors',
                          on
                            ? 'border-violet bg-violet/[0.06] ring-violet/30 ring-1'
                            : 'hover:border-violet/40 border-[color:var(--border-light)] bg-white',
                        )}
                      >
                        <span className="text-text-dark block text-sm font-semibold">
                          {s.label}
                        </span>
                        <span className="text-text-muted mt-0.5 block font-mono text-[11px]">
                          {s.sub}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. Add-ons */}
              <div className="mt-7">
                <GroupLabel>3. Key Technical Add-ons</GroupLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {estimatorAddons.map((a) => {
                    const on = addonIds.includes(a.id)
                    return (
                      <button
                        key={a.id}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggleAddon(a.id)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors',
                          on
                            ? 'border-violet bg-violet/[0.06]'
                            : 'hover:border-violet/40 border-[color:var(--border-light)] bg-white',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors',
                            on
                              ? 'border-violet bg-violet text-white'
                              : 'border-[color:var(--border-light)] bg-white',
                          )}
                        >
                          {on && <Check size={13} strokeWidth={3} aria-hidden />}
                        </span>
                        <span>
                          <span className="text-text-dark block text-sm font-semibold">
                            {a.label}
                          </span>
                          <span className="text-text-muted mt-0.5 block font-mono text-[11px]">
                            +{formatPkr(a.price)}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Velocity */}
              <div className="mt-7">
                <GroupLabel>4. Delivery Velocity</GroupLabel>
                <div
                  role="radiogroup"
                  aria-label="Delivery velocity"
                  className="flex flex-wrap gap-x-6 gap-y-3"
                >
                  {estimatorVelocities.map((v) => {
                    const on = v.id === velocityId
                    return (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setVelocityId(v.id)}
                        className="text-text-dark/80 inline-flex items-center gap-2 text-sm font-medium"
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 place-items-center rounded-full border transition-colors',
                            on ? 'border-violet' : 'border-text-faded',
                          )}
                        >
                          {on && <span className="bg-violet h-2 w-2 rounded-full" />}
                        </span>
                        {v.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* -------------------------------------- Live summary --- */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-violet/15 bg-violet/[0.05] rounded-2xl border p-5">
                <div className="flex items-center justify-between">
                  <span className="text-text-dark text-[11px] font-bold tracking-[0.1em] uppercase">
                    Live Scope Summary
                  </span>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>

                <dl className="mt-4 space-y-2.5">
                  {summary.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <dt className="text-text-muted">{row.label}:</dt>
                      <dd className="text-text-dark text-right font-semibold">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Estimate */}
                <div className="bg-surface-light mt-4 rounded-xl border border-[color:var(--border-light)] p-4">
                  <p className="text-text-muted text-[10px] font-bold tracking-[0.12em] uppercase">
                    Estimated Investment
                  </p>
                  <motion.p
                    key={estimate.price}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_BRAND }}
                    className="font-display text-text-dark mt-1 text-3xl font-black tracking-tight"
                  >
                    {formatPkr(estimate.price)}
                  </motion.p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <CheckCircle2 size={14} aria-hidden />
                    Includes 30-day bug warranty
                  </p>
                </div>

                <a
                  href={bookHref}
                  className="mt-5 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,47,208,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [background:linear-gradient(135deg,#7c3aed,#4f2fd0)] hover:-translate-y-0.5"
                >
                  Book this Custom Scope
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="text-text-muted hover:text-violet mx-auto mt-3 block text-xs font-medium transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
