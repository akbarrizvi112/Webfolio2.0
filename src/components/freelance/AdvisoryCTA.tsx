import { useState } from 'react'
import {
  Send,
  Mail,
  Copy,
  Check,
  Lock,
  ArrowLeftRight,
  DollarSign,
  Zap,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { profile } from '../../data/profile'
import { fiverr } from '../../data/freelance'

const trust = [
  { icon: Lock, label: 'NDA Protected', tint: 'text-emerald-400' },
  { icon: ArrowLeftRight, label: 'Custom Milestones', tint: 'text-lilac' },
  { icon: DollarSign, label: 'Fixed or Hourly', tint: 'text-emerald-400' },
  { icon: Zap, label: 'Quick Kickoff', tint: 'text-lilac' },
]

export function AdvisoryCTA() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <section className="noise bg-bg-dark relative mb-2 overflow-clip rounded-[28px] py-14 text-white sm:mb-3 lg:py-20">
      <span className="noise-layer" aria-hidden />
      <div
        aria-hidden
        className="bg-violet/25 pointer-events-none absolute -top-10 right-0 h-[26rem] w-[26rem] rounded-full blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]"
      />

      <Container className="relative">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] font-semibold text-white/70 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.brand} • Direct Advisory
          </span>

          {/* Headline */}
          <h2 className="font-display mt-6 text-3xl font-black tracking-tight sm:text-[2.6rem] sm:leading-[1.05]">
            Have a project that doesn&apos;t fit a standard package?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-white/55">
            Tell me what you&apos;re building and I&apos;ll put together a{' '}
            <span className="text-lilac font-medium">tailored scope of work</span>,
            technical architecture breakdown, and fixed timeline.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={fiverr.profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1dbf73] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(29,191,115,0.7)] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#19a965]"
            >
              <Send size={16} aria-hidden />
              Message me on Fiverr
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white/15"
            >
              <Mail size={16} aria-hidden />
              Email me directly
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Divider */}
          <hr className="mt-9 border-white/10" />

          {/* Trust row */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {trust.map(({ icon: Icon, label, tint }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-wide text-white/55"
              >
                <Icon size={14} className={tint} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
