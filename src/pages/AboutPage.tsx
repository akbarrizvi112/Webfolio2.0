import { Helmet } from 'react-helmet-async'
import { profile, stats } from '../data/profile'
import { skillGroups, bio } from '../data/skills'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Counter } from '../components/ui/Counter'
import { Card } from '../components/ui/Card'
import { ButtonRouterLink } from '../components/ui/Button'

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — {profile.fullName}</title>
        <meta
          name="description"
          content={`About ${profile.fullName}, ${profile.role}.`}
        />
      </Helmet>

      <PageHeader
        label="About"
        segments={[
          { text: 'The engineer behind', tone: 'white' },
          { text: 'the work.', tone: 'warm' },
        ]}
        subtitle={profile.tagline}
      />

      <section className="bg-bg-light mb-2 rounded-[28px] py-20 sm:mb-3 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* Bio */}
            <div>
              <h2 className="font-display text-text-dark text-2xl font-black tracking-tight sm:text-3xl">
                Hi, I&apos;m {profile.name}.
              </h2>
              <div className="mt-6 space-y-4">
                {bio.map((p) => (
                  <Reveal key={p.slice(0, 16)}>
                    <p className="text-text-muted leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonRouterLink to="/projects" arrow>
                  See my work
                </ButtonRouterLink>
                <a
                  href={profile.resumeUrl}
                  className="text-text-dark border-text-dark/15 inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/[0.03]"
                >
                  Download résumé
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((s) => (
                <Reveal key={s.label}>
                  <Card className="bg-surface-light">
                    <div className="font-display text-4xl font-black tracking-tight">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="text-text-muted mt-1 text-sm">{s.label}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-16">
            <h2 className="font-display text-text-dark text-2xl font-black tracking-tight sm:text-3xl">
              Skills &amp; tools
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <Reveal key={group.category}>
                  <Card className="bg-surface-light h-full">
                    <h3 className="text-violet text-sm font-semibold tracking-wide uppercase">
                      {group.category}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border-text-dark/10 text-text-dark/80 bg-bg-light rounded-full border px-3 py-1 text-sm font-medium"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
