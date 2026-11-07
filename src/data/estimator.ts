/**
 * Config + copy for the freelance "Real-Time Project Estimator".
 *
 * Pricing model (all amounts in PKR):
 *   price = round( typeBase × scopeMult + Σ addonPrice ) × velocityPriceMult
 *   days  = ceil( typeDays + scopeDays + Σ addonDays ) × velocityDaysMult
 *
 * The defaults (Full-Stack + 4–8 Pages + Auth + Payments + Standard pace)
 * resolve to PKR 130,750 over ~18 days. Tune the numbers to your real rates.
 */

export interface EstimatorType {
  id: string
  label: string
  sub: string
  /** Base price in PKR. */
  base: number
  /** Base working days. */
  days: number
}

export interface EstimatorScope {
  id: string
  label: string
  sub: string
  mult: number
  days: number
}

export interface EstimatorAddon {
  id: string
  label: string
  price: number
  days: number
}

export interface EstimatorVelocity {
  id: string
  label: string
  priceMult: number
  daysMult: number
}

export const estimatorTypes: readonly EstimatorType[] = [
  {
    id: 'full-stack',
    label: 'Full-Stack Web App',
    sub: 'React + Node / Postgres',
    base: 75000,
    days: 7,
  },
  {
    id: 'ai',
    label: 'AI Agent & RAG',
    sub: 'LLM, Vectors, Autonomy',
    base: 110000,
    days: 12,
  },
  {
    id: 'saas',
    label: 'Specialized SaaS MVP',
    sub: 'Booking, Subscriptions',
    base: 95000,
    days: 10,
  },
  {
    id: 'landing',
    label: 'SaaS Landing Page',
    sub: 'Framer Motion, SEO',
    base: 35000,
    days: 4,
  },
]

export const estimatorScopes: readonly EstimatorScope[] = [
  { id: 'sprint', label: '1 - 3 Pages', sub: 'Sprint MVP', mult: 1, days: 1 },
  { id: 'standard', label: '4 - 8 Pages', sub: 'Standard Scope', mult: 1.25, days: 4 },
  { id: 'full', label: '8+ Pages', sub: 'Full Product', mult: 1.6, days: 9 },
]

export const estimatorAddons: readonly EstimatorAddon[] = [
  { id: 'auth', label: 'User Auth & Roles', price: 15000, days: 3 },
  { id: 'payments', label: 'Stripe / LemonSqueezy', price: 22000, days: 4 },
  { id: 'cms', label: 'Admin Dashboard CMS', price: 30000, days: 6 },
  { id: 'ai-search', label: 'Vector Search / AI Chat', price: 40000, days: 8 },
]

export const estimatorVelocities: readonly EstimatorVelocity[] = [
  {
    id: 'standard',
    label: 'Standard Pace (Full Quality SLA)',
    priceMult: 1,
    daysMult: 1,
  },
  { id: 'priority', label: 'Priority Sprint (+25% fee)', priceMult: 1.25, daysMult: 0.7 },
]

/** Defaults that reproduce the reference estimate. */
export const estimatorDefaults = {
  typeId: 'full-stack',
  scopeId: 'standard',
  addonIds: ['auth', 'payments'] as readonly string[],
  velocityId: 'standard',
}

export interface Estimate {
  price: number
  days: number
  addonCount: number
}

export function computeEstimate(
  type: EstimatorType,
  scope: EstimatorScope,
  addons: readonly EstimatorAddon[],
  velocity: EstimatorVelocity,
): Estimate {
  const addonPrice = addons.reduce((s, a) => s + a.price, 0)
  const addonDays = addons.reduce((s, a) => s + a.days, 0)
  const rawPrice = (type.base * scope.mult + addonPrice) * velocity.priceMult
  const rawDays = (type.days + scope.days + addonDays) * velocity.daysMult
  return {
    price: Math.round(rawPrice / 50) * 50,
    days: Math.ceil(rawDays),
    addonCount: addons.length,
  }
}

export function formatPkr(value: number): string {
  return `PKR ${new Intl.NumberFormat('en-US').format(value)}`
}
