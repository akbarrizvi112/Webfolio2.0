import { motion } from 'motion/react'
import { Rocket, Gauge, MapPin, Sparkles, Quote } from 'lucide-react'
import { profile, stats } from '../../data/profile'
import { stack } from '../../data/stack'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { ToneHeading } from '../ui/ToneHeading'
import { Reveal } from '../ui/Reveal'
import { Counter } from '../ui/Counter'
import { EASE_BRAND } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Reveal + hover-lift wrapper for the bento cards. */
function BentoCard({
  children,
  className,
  index,
}: {
  children: React.ReactNode
  className?: string
  index: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_BRAND }}
      whileHover={reduced ? undefined : { y: -6 }}
      className={
        'group relative overflow-hidden rounded-3xl shadow-[0_10px_40px_-12px_rgba(80,40,140,0.18)] transition-shadow duration-300 hover:shadow-[0_26px_70px_-20px_rgba(139,92,246,0.45)] ' +
        (className ?? '')
      }
    >
      {children}
    </motion.div>
  )
}

/** Gentle floating wrapper for the portrait accent chips. */
function Float({
  children,
  className,
  delay = 0,
  amount = 10,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  amount?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, ease: EASE_BRAND }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -amount, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function About() {
  const reduced = useReducedMotion()

  return (
    <section
      id="about"
      className="bg-bg-light relative mb-2 overflow-clip rounded-[28px] py-20 sm:mb-3 lg:py-24"
    >
      {/* Decorative orbs */}
      <motion.div
        aria-hidden
        className="from-lilac/50 to-peach/40 absolute -top-10 -right-16 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl"
        animate={reduced ? undefined : { y: [0, 24, 0], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="from-violet/20 to-pink/20 absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr blur-3xl"
        animate={reduced ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative">
        {/* Top: heading (left) + portrait (right) */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <SectionLabel>About</SectionLabel>
            </Reveal>

            <ToneHeading
              className="mt-6"
              segments={[
                { text: 'Building', tone: 'warm' },
                { text: 'scalable products,', tone: 'dark' },
                { text: 'Shipping', tone: 'warm' },
                { text: 'clean code. I turn complex problems into', tone: 'dark' },
                { text: 'fast, reliable, delightful software.', tone: 'faded' },
              ]}
            />

            <Reveal delay={1}>
              <p className="text-text-muted mt-6 max-w-xl text-lg">
                {profile.tagline} Based in {profile.location} and{' '}
                {profile.availability.toLowerCase()}.
              </p>
            </Reveal>
          </div>

          {/* Portrait with floating accent chips */}
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="relative overflow-hidden rounded-[32px] p-[3px] shadow-[0_30px_80px_-30px_rgba(139,92,246,0.5)] [background:var(--signature-gradient)]">
                <img
                  src={profile.heroPortrait}
                  alt={`${profile.fullName}, ${profile.role}`}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="aspect-[4/5] w-full rounded-[30px] object-cover object-[center_18%]"
                />
              </div>

              {/* availability chip */}
              <Float
                className="absolute -top-4 -left-4 sm:-left-8"
                delay={0.15}
                amount={9}
              >
                <div className="text-text-dark flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Available for work
                </div>
              </Float>

              {/* role chip */}
              <Float
                className="absolute top-1/3 -right-3 sm:-right-6"
                delay={0.35}
                amount={12}
              >
                <div className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <span className="grid h-9 w-9 place-items-center rounded-xl text-[#160f24] [background:var(--signature-gradient)]">
                    <Sparkles size={18} aria-hidden />
                  </span>
                  <div className="leading-tight">
                    <p className="text-text-muted text-xs">Focused on</p>
                    <p className="text-text-dark text-sm font-bold">Full-Stack · AI</p>
                  </div>
                </div>
              </Float>

              {/* location chip */}
              <Float className="absolute -bottom-4 left-6" delay={0.5} amount={10}>
                <div className="text-text-dark flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md">
                  <MapPin size={15} className="text-violet" aria-hidden />
                  {profile.location}
                </div>
              </Float>
            </div>
          </Reveal>
        </div>

        {/* Bento stats — compact row of three + a short quote banner */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {/* Card A — iridescent */}
          <BentoCard index={0} className="bg-surface-light p-6">
            <div className="relative z-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl text-[#160f24] transition-transform duration-300 [background:var(--signature-gradient)] group-hover:scale-110">
                <Rocket size={18} aria-hidden />
              </span>
              <div className="font-display mt-6 text-4xl font-black tracking-tight">
                <Counter value={stats[0]?.value ?? 0} suffix={stats[0]?.suffix ?? ''} />
              </div>
              <p className="text-text-muted mt-1 text-sm">{stats[0]?.label}</p>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[conic-gradient(from_120deg,#c4b5fd,#f0a6ca,#fdba8c,#93c5fd,#c4b5fd)] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
            />
          </BentoCard>

          {/* Card B — dark, tech cluster */}
          <BentoCard index={1} className="bg-bg-dark relative p-6 text-white">
            <div
              aria-hidden
              className="from-violet/40 via-pink/30 to-orange/40 pointer-events-none absolute inset-x-0 -bottom-8 h-24 bg-gradient-to-r blur-2xl"
            />
            <div className="relative z-10">
              <div className="flex -space-x-2.5">
                {stack.slice(0, 4).map((s) => (
                  <span
                    key={s.name}
                    title={s.name}
                    className="border-bg-dark grid h-8 w-8 place-items-center rounded-full border-2 text-[0.55rem] font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ background: s.tint }}
                  >
                    {s.short}
                  </span>
                ))}
                <span className="border-bg-dark grid h-8 w-8 place-items-center rounded-full border-2 bg-white/10 text-[0.65rem] font-bold backdrop-blur">
                  +{stack.length - 4}
                </span>
              </div>
              <div className="font-display mt-5 text-4xl font-black tracking-tight">
                <Counter value={stats[1]?.value ?? 0} suffix={stats[1]?.suffix ?? ''} />
              </div>
              <p className="mt-1 text-sm text-white/60">{stats[1]?.label}</p>
            </div>
          </BentoCard>

          {/* Card C — peach */}
          <BentoCard
            index={2}
            className="bg-gradient-to-br from-[#fde7d3] to-[#fbcfe8] p-6"
          >
            <span className="text-orange grid h-10 w-10 place-items-center rounded-xl bg-white/50 transition-transform duration-300 group-hover:scale-110">
              <Gauge size={18} aria-hidden />
            </span>
            <div className="text-gradient-warm font-display mt-6 text-4xl font-black tracking-tight">
              <Counter value={stats[2]?.value ?? 0} suffix={stats[2]?.suffix ?? ''} />
            </div>
            <p className="text-text-dark/70 mt-1 text-sm font-medium">
              {stats[2]?.label}
            </p>
          </BentoCard>
        </div>

        {/* Quote banner */}
        <BentoCard
          index={3}
          className="relative mt-4 flex items-center gap-5 p-6 text-white sm:p-8"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(110%_140%_at_15%_0%,#8b5cf6_0%,#ec4899_40%,#fb923c_70%,#1a1030_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(80%_120%_at_90%_10%,rgba(147,197,253,0.55),transparent_55%)] mix-blend-screen"
          />
          <span className="noise-layer" aria-hidden />
          <Quote
            size={28}
            className="relative z-10 shrink-0 fill-white/90 text-white/90"
            aria-hidden
          />
          <p className="font-display relative z-10 max-w-3xl text-lg leading-snug font-bold sm:text-xl">
            From enterprise compliance platforms to AI assistants — I ship products people
            genuinely rely on.
          </p>
        </BentoCard>
      </Container>
    </section>
  )
}
