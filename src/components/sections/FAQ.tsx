import { profile } from '../../data/profile'
import { faqs } from '../../data/faq'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { ToneHeading } from '../ui/ToneHeading'
import { Reveal } from '../ui/Reveal'
import { Accordion } from '../ui/Accordion'
import { ButtonLink } from '../ui/Button'
import { ViewDetails } from '../ui/ViewDetails'
import { SocialReveal } from '../ui/SocialReveal'
import { bookingSocials } from '../../data/profile'

export function FAQ() {
  return (
    <section
      id="contact"
      className="noise bg-bg-dark-2 relative mb-2 overflow-clip rounded-[28px] py-24 text-white sm:mb-3 lg:py-32"
    >
      <span className="noise-layer" aria-hidden />
      {/* violet radial glow */}
      <div
        aria-hidden
        className="bg-violet/20 pointer-events-none absolute top-0 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      {/* holographic glass object top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-4 right-6 hidden h-48 w-48 rotate-12 md:block"
      >
        <div className="absolute inset-0 rounded-[44%] bg-[conic-gradient(from_140deg,#c4b5fd,#f0a6ca,#fdba8c,#93c5fd,#a78bfa,#c4b5fd)] opacity-70 blur-2xl" />
        <div className="absolute inset-9 rounded-[40%] border border-white/40 bg-white/10 shadow-[inset_0_1px_12px_rgba(255,255,255,0.35)] backdrop-blur-md" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionLabel tone="dark">Frequently Asked Questions</SectionLabel>
        </Reveal>
        <ToneHeading
          as="h2"
          className="mt-6"
          segments={[
            { text: 'Got questions?', tone: 'white' },
            { text: "Let's talk", tone: 'warm' },
            { text: 'about your project.', tone: 'white' },
          ]}
        />

        <Reveal delay={1}>
          <div className="mt-7 flex flex-wrap gap-3">
            <ViewDetails to="/freelance" tone="dark">
              Freelance services
            </ViewDetails>
            <ViewDetails to="/contact" tone="dark">
              Contact me
            </ViewDetails>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Book a call card with iridescent wave */}
          <Reveal>
            <div className="text-text-dark relative flex h-full min-h-[22rem] flex-col justify-between rounded-3xl bg-gradient-to-b from-[#dcccf7] via-[#c9b4ef] to-[#b7a0e6] p-8 shadow-[0_24px_60px_-24px_rgba(80,40,140,0.5)]">
              {/* iridescent wave — clipped to the card, but the card itself
                  stays overflow-visible so the social reveal isn't cut off */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div className="absolute -bottom-16 -left-10 h-56 w-[130%] rounded-[45%] bg-[conic-gradient(from_200deg,#c4b5fd,#f0a6ca,#fdba8c,#93c5fd,#a78bfa,#c4b5fd)] opacity-80 blur-2xl" />
                <div className="absolute right-4 -bottom-6 h-28 w-40 rounded-[50%] bg-[conic-gradient(from_0deg,#f472b6,#fdba74,#a78bfa,#f472b6)] opacity-60 blur-xl" />
              </div>

              <div className="relative z-10">
                <img
                  src={profile.heroPortrait}
                  alt=""
                  aria-hidden
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-white object-cover object-[center_20%] shadow-lg"
                />
                <h3 className="font-display mt-6 text-2xl font-black tracking-tight">
                  Book a 15-min call
                </h3>
                <p className="text-text-dark/70 mt-2 text-sm">
                  Have an idea or a role in mind? Grab a free slot and let&apos;s see if
                  we&apos;re a fit — no pressure.
                </p>
              </div>
              <SocialReveal
                socials={bookingSocials}
                className="relative z-10 mt-8 self-start"
              >
                <ButtonLink
                  href={profile.calendarUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  arrow
                >
                  Book a Free Call
                </ButtonLink>
              </SocialReveal>
            </div>
          </Reveal>

          {/* Accordion — white cards */}
          <Reveal delay={1}>
            <Accordion items={faqs} variant="cards" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
