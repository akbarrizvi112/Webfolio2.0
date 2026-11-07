import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Layers, Zap, TrendingUp } from 'lucide-react'
import { Container } from '../ui/Container'
import { ButtonLink, ButtonRouterLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE_BRAND } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { ReactLogo, NodeLogo, TsLogo, AiLogo, platforms } from './brand-logos'

const techChips = [
  { label: 'React', Logo: ReactLogo },
  { label: 'TypeScript', Logo: TsLogo },
  { label: 'Node.js', Logo: NodeLogo },
]

const trust = [
  { icon: Layers, label: 'Full-Stack Development' },
  { icon: Zap, label: 'Fast Delivery' },
  { icon: TrendingUp, label: 'Scalable Solutions' },
]

/** Floating badge with a gentle idle bob (disabled for reduced motion). */
function Floating({
  className,
  delay = 0,
  reduced,
  children,
}: {
  className?: string
  delay?: number
  reduced: boolean
  children: ReactNode
}) {
  return (
    <motion.div
      className={cn('absolute drop-shadow-[0_14px_28px_rgba(80,40,140,0.28)]', className)}
      animate={reduced ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function FreelanceHero({ servicesHref = '#gigs' }: { servicesHref?: string }) {
  const reduced = useReducedMotion()

  return (
    <section className="bg-bg-light relative mb-2 overflow-clip rounded-[28px] pt-28 pb-14 sm:mb-3 lg:pt-32 lg:pb-20">
      {/* Ambient lavender / blue lighting */}
      <div
        aria-hidden
        className="bg-violet/15 pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-0 h-[26rem] w-[26rem] rounded-full bg-sky-400/10 blur-[130px]"
      />

      <Container className="relative">
        <Reveal>
          <Link
            to="/"
            className="text-text-muted hover:text-text-dark mb-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={15} aria-hidden /> Back to home
          </Link>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------------------------------------------------- Copy --- */}
          <div>
            <Reveal>
              <span className="text-text-dark inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white/80 px-3.5 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for Freelance Projects
              </span>
            </Reveal>

            <motion.h1
              className="font-display text-text-dark mt-6 text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.98] font-black tracking-tight"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
            >
              {["Let's Build", 'Something', 'Remarkable.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={cn('inline-block', i === 2 && 'text-gradient')}
                    variants={{
                      hidden: { y: '110%' },
                      visible: {
                        y: '0%',
                        transition: { duration: 0.8, ease: EASE_BRAND },
                      },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <Reveal delay={1}>
              <p className="text-text-muted mt-5 max-w-lg text-lg">
                I&apos;m Akbar — a Full-Stack Developer &amp; Generative AI Engineer. I
                build modern, responsive and scalable digital experiences using React,
                Next.js, Node.js and cutting-edge AI technologies.
              </p>
            </Reveal>

            {/* Tech chips */}
            <Reveal delay={2}>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {techChips.map(({ label, Logo }) => (
                  <span
                    key={label}
                    className="text-text-dark inline-flex items-center gap-2 rounded-full border border-[color:var(--border-light)] bg-white py-1.5 pr-3.5 pl-1.5 text-sm font-medium shadow-sm"
                  >
                    <Logo size={22} />
                    {label}
                  </span>
                ))}
                <span className="text-text-muted text-sm">and more…</span>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={servicesHref} arrow>
                  Explore My Services
                </ButtonLink>
                <ButtonRouterLink to="/contact" variant="ghost" arrow>
                  Let&apos;s Talk
                </ButtonRouterLink>
              </div>
            </Reveal>

            {/* Trust indicators */}
            <Reveal delay={4}>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[color:var(--border-light)] pt-6">
                {trust.map(({ icon: Icon, label }, i) => (
                  <span key={label} className="flex items-center gap-x-5">
                    {i > 0 && (
                      <span className="bg-text-faded hidden h-4 w-px sm:inline-block" />
                    )}
                    <span className="text-text-dark/75 inline-flex items-center gap-2 text-sm font-medium">
                      <Icon size={17} className="text-violet" aria-hidden />
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* -------------------------------------------------- Visual --- */}
          <motion.div
            className="relative mx-auto hidden aspect-square w-full max-w-md md:block"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_BRAND, delay: 0.1 }}
          >
            {/* Soft glow plate */}
            <div
              aria-hidden
              className="from-violet/25 absolute inset-10 rounded-full bg-gradient-to-br to-sky-300/25 blur-3xl"
            />

            {/* Orbit lines */}
            <motion.svg
              viewBox="0 0 400 400"
              className="text-violet/25 absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <ellipse
                cx="200"
                cy="200"
                rx="185"
                ry="140"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="150"
                ry="178"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                className="text-sky-400/25"
              />
            </motion.svg>

            {/* Laptop */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
              <div className="overflow-hidden rounded-xl border border-black/10 bg-[#0d0a16] shadow-[0_30px_70px_-20px_rgba(80,40,140,0.5)]">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[11px] text-white/40">app.tsx</span>
                </div>
                <pre className="overflow-hidden px-4 py-3.5 font-mono text-[11.5px] leading-relaxed">
                  <code>
                    <span className="text-[#c792ea]">export default</span>{' '}
                    <span className="text-[#82aaff]">function</span>{' '}
                    <span className="text-[#ffcb6b]">App</span>
                    <span className="text-white/70">() {'{'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-[#c792ea]">return</span>{' '}
                    <span className="text-white/70">(</span>
                    {'\n'}
                    {'    '}
                    <span className="text-white/40">&lt;</span>
                    <span className="text-[#f07178]">Product</span>
                    {'\n'}
                    {'      '}
                    <span className="text-[#c3e88d]">stack</span>
                    <span className="text-white/40">=</span>
                    <span className="text-[#c3e88d]">&quot;react·node&quot;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-[#c3e88d]">ai</span>
                    <span className="text-white/40">=</span>
                    <span className="text-[#ffcb6b]">{'{true}'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-white/40">/&gt;</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white/70">)</span>
                    {'\n'}
                    <span className="text-white/70">{'}'}</span>
                  </code>
                </pre>
              </div>
              {/* Laptop base */}
              <div className="relative -mx-5 h-2.5 rounded-b-xl bg-gradient-to-b from-[#d8d4de] to-[#a7a2b2]">
                <span className="absolute top-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-b-md bg-black/15" />
              </div>
            </div>

            {/* Floating tech badges */}
            <Floating className="top-1 right-2" delay={0} reduced={reduced}>
              <ReactLogo size={60} className="rounded-2xl" />
            </Floating>
            <Floating className="top-10 left-0" delay={0.9} reduced={reduced}>
              <AiLogo size={54} className="rounded-2xl" />
            </Floating>
            <Floating className="top-1/2 -left-2" delay={1.5} reduced={reduced}>
              <TsLogo size={48} className="rounded-2xl" />
            </Floating>
            <Floating className="bottom-6 left-8" delay={0.5} reduced={reduced}>
              <NodeLogo size={52} className="rounded-2xl" />
            </Floating>

            {/* Decorative code glyphs */}
            <Floating
              className="text-violet/50 right-10 bottom-2 font-mono text-xl font-bold"
              delay={1.1}
              reduced={reduced}
            >
              &lt;/&gt;
            </Floating>

            {/* Minimal plant */}
            <div className="absolute right-1 bottom-0">
              <svg width="46" height="52" viewBox="0 0 46 52" aria-hidden>
                <path d="M23 30c-6-2-9-8-8-15 5 1 9 5 9 12" fill="#86c05a" />
                <path d="M23 30c5-3 7-9 5-15-4 2-7 6-6 13" fill="#6aa84f" />
                <path d="M23 32c0-5 2-9 6-11-0 5-2 9-6 11" fill="#a7d68a" />
                <path
                  d="M14 31h18l-2 18a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2z"
                  fill="#d98b6a"
                />
                <rect x="13" y="29" width="20" height="4" rx="2" fill="#c97a58" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------- Platform strip --- */}
        <Reveal delay={2}>
          <div className="mt-14 flex flex-col gap-5 border-t border-[color:var(--border-light)] pt-8 sm:flex-row sm:items-center sm:gap-10">
            <span className="text-text-muted text-xs font-semibold tracking-wide uppercase">
              Find me on freelance platforms
            </span>
            <div className="flex flex-wrap items-center gap-7">
              {platforms.map(({ name, color, Glyph, url }) => {
                const content = (
                  <Glyph
                    size={30}
                    className="text-text-faded transition-colors duration-300 group-hover:[color:var(--bc)]"
                  />
                )
                return url ? (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={name}
                    style={{ ['--bc' as string]: color }}
                    className="group transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <span
                    key={name}
                    aria-label={name}
                    title={name}
                    style={{ ['--bc' as string]: color }}
                    className="group"
                  >
                    {content}
                  </span>
                )
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
