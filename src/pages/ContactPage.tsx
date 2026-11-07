import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, CalendarClock } from 'lucide-react'
import { profile, socials } from '../data/profile'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button, ButtonLink } from '../components/ui/Button'
import { BrandIcon, type BrandName } from '../components/ui/BrandIcon'

const field =
  'w-full rounded-xl border border-text-dark/10 bg-bg-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-violet'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name || 'your site'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Helmet>
        <title>Contact — {profile.fullName}</title>
        <meta name="description" content={`Get in touch with ${profile.fullName}.`} />
      </Helmet>

      <PageHeader
        label="Contact"
        segments={[
          { text: 'Let’s build', tone: 'white' },
          { text: 'something together.', tone: 'warm' },
        ]}
        subtitle={`Based in ${profile.location} · ${profile.availability}. The fastest way to reach me is below.`}
      />

      <section className="bg-bg-light mb-2 rounded-[28px] py-16 sm:mb-3 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Details */}
            <div className="space-y-4">
              <Card className="bg-surface-light flex items-center gap-4">
                <span className="bg-violet/10 text-violet grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                  <Mail size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-text-muted text-xs">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-text-dark hover:text-violet font-semibold transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </Card>
              <Card className="bg-surface-light flex items-center gap-4">
                <span className="bg-violet/10 text-violet grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                  <MapPin size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-text-muted text-xs">Location</p>
                  <p className="text-text-dark font-semibold">{profile.location}</p>
                </div>
              </Card>
              <Card className="bg-surface-light flex items-center gap-4">
                <span className="bg-violet/10 text-violet grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                  <CalendarClock size={20} aria-hidden />
                </span>
                <div>
                  <p className="text-text-muted text-xs">Availability</p>
                  <p className="text-text-dark font-semibold">{profile.availability}</p>
                </div>
              </Card>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <ButtonLink
                  href={profile.calendarUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  arrow
                >
                  Book a call
                </ButtonLink>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.icon === 'mail' ? undefined : '_blank'}
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full text-[#160f24] transition-transform duration-300 [background:var(--signature-gradient)] hover:-translate-y-0.5"
                    >
                      {s.icon === 'mail' ? (
                        <Mail size={17} aria-hidden />
                      ) : (
                        <BrandIcon name={s.icon as BrandName} size={17} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="bg-surface-light">
              <h2 className="font-display text-text-dark text-xl font-black tracking-tight">
                Send a message
              </h2>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="text-text-dark text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-text-dark text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-text-dark text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`mt-1.5 resize-none ${field}`}
                  />
                </div>
                <Button type="submit" arrow className="w-full">
                  Send message
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
