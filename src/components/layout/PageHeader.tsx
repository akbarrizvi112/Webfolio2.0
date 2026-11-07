import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { ToneHeading, type ToneSegment } from '../ui/ToneHeading'
import { Reveal } from '../ui/Reveal'

/** Dark rounded hero panel shared by every detail page. */
export function PageHeader({
  label,
  segments,
  subtitle,
}: {
  label: string
  segments: readonly ToneSegment[]
  subtitle: string
}) {
  return (
    <section className="noise bg-bg-dark relative mb-2 overflow-clip rounded-[28px] pt-32 pb-16 text-white sm:mb-3 lg:pt-36 lg:pb-20">
      <span className="noise-layer" aria-hidden />
      <div
        aria-hidden
        className="bg-violet/20 pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <Container className="relative">
        <Reveal>
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden /> Back to home
          </Link>
        </Reveal>
        <SectionLabel tone="dark">{label}</SectionLabel>
        <ToneHeading as="h1" className="mt-6" segments={segments} />
        <Reveal delay={1}>
          <p className="mt-6 max-w-2xl text-lg text-white/65">{subtitle}</p>
        </Reveal>
      </Container>
    </section>
  )
}
