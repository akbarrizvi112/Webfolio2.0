import { useState } from 'react'
import { Star, Play } from 'lucide-react'
import { testimonials, type Testimonial } from '../../data/testimonials'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { ToneHeading } from '../ui/ToneHeading'
import { Reveal } from '../ui/Reveal'
import { Card } from '../ui/Card'
import { ViewDetails } from '../ui/ViewDetails'
import { Modal } from '../ui/Modal'

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={15} className="fill-orange text-orange" aria-hidden />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null)

  return (
    <section
      id="testimonials"
      className="bg-bg-light relative mb-2 overflow-clip rounded-[28px] py-24 sm:mb-3 lg:py-32"
    >
      <Container>
        <Reveal>
          <SectionLabel>Trusted Feedback</SectionLabel>
        </Reveal>
        <ToneHeading
          className="mt-6"
          segments={[
            { text: 'What people say after', tone: 'dark' },
            { text: 'I ship', tone: 'warm' },
            { text: 'together.', tone: 'faded' },
          ]}
        />

        <Reveal delay={1}>
          <ViewDetails to="/testimonials" className="mt-7">
            Read all testimonials
          </ViewDetails>
        </Reveal>

        <div className="mt-12 grid auto-rows-[1fr] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i % 3}>
              {t.kind === 'text' ? (
                <Card className="bg-surface-light relative h-full overflow-hidden">
                  <span
                    aria-hidden
                    className="from-lilac/40 to-peach/30 absolute -top-6 -right-6 h-24 w-24 rounded-[45%] bg-gradient-to-br blur-xl"
                  />
                  <div className="relative flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-text-dark font-semibold">{t.name}</p>
                      <p className="text-text-muted text-xs">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-text-dark/80 relative mt-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="relative mt-5">
                    <Stars />
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => setActive(t)}
                  className="group relative block h-full min-h-[14rem] w-full overflow-hidden rounded-3xl text-left"
                  aria-label={`Play video testimonial from ${t.name}`}
                >
                  <img
                    src={t.image}
                    alt={`${t.name}, ${t.role}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="from-bg-dark/85 via-bg-dark/10 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <span className="absolute right-14 bottom-4 left-4">
                    <span className="block font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/70">{t.role}</span>
                  </span>
                  <span className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full shadow-lg transition-transform duration-300 [background:var(--signature-gradient)] group-hover:scale-110">
                    <Play
                      size={16}
                      className="fill-[#160f24] text-[#160f24]"
                      aria-hidden
                    />
                  </span>
                </button>
              )}
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? `Testimonial from ${active.name}` : 'Testimonial'}
      >
        {active?.videoUrl && (
          <div className="aspect-video w-full">
            <iframe
              src={active.videoUrl}
              title={`Video testimonial from ${active.name}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </section>
  )
}
