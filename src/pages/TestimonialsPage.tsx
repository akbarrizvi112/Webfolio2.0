import { Helmet } from 'react-helmet-async'
import { Star, Play } from 'lucide-react'
import { profile } from '../data/profile'
import { testimonials } from '../data/testimonials'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Card } from '../components/ui/Card'

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={15} className="fill-orange text-orange" aria-hidden />
      ))}
    </div>
  )
}

export function TestimonialsPage() {
  return (
    <>
      <Helmet>
        <title>Testimonials — {profile.fullName}</title>
        <meta
          name="description"
          content={`What clients and teammates say about working with ${profile.fullName}.`}
        />
      </Helmet>

      <PageHeader
        label="Testimonials"
        segments={[
          { text: 'Kind words from', tone: 'white' },
          { text: 'people I’ve shipped with.', tone: 'warm' },
        ]}
        subtitle="Feedback from founders, product leads and engineers I've collaborated with."
      />

      <section className="bg-bg-light mb-2 rounded-[28px] py-16 sm:mb-3 lg:py-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Reveal key={t.id}>
                {t.kind === 'text' ? (
                  <Card className="bg-surface-light h-full">
                    <div className="flex items-center gap-3">
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
                    <p className="text-text-dark/80 mt-4">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5">
                      <Stars />
                    </div>
                  </Card>
                ) : (
                  <a
                    href={t.videoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative block h-full min-h-[14rem] overflow-hidden rounded-3xl"
                    aria-label={`Watch video testimonial from ${t.name}`}
                  >
                    <img
                      src={t.image}
                      alt={`${t.name}, ${t.role}`}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="from-bg-dark/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
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
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
