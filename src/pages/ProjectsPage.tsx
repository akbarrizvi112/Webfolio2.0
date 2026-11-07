import { Helmet } from 'react-helmet-async'
import { profile } from '../data/profile'
import { projects, githubUrl } from '../data/projects'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { BrandIcon } from '../components/ui/BrandIcon'

export function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects — {profile.fullName}</title>
        <meta name="description" content={`Selected projects by ${profile.fullName}.`} />
      </Helmet>

      <PageHeader
        label="Projects"
        segments={[
          { text: 'Things I have', tone: 'white' },
          { text: 'designed & built.', tone: 'warm' },
        ]}
        subtitle="A closer look at recent work — the problem, the stack, and what shipped."
      />

      <section className="bg-bg-light mb-2 rounded-[28px] py-16 sm:mb-3 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.id}>
                <article
                  className="overflow-clip rounded-[24px] border border-white/40 p-6 shadow-[0_18px_60px_-28px_rgba(80,40,140,0.35)] sm:p-8"
                  style={{ background: project.wash }}
                >
                  <div
                    className={
                      'grid items-stretch gap-8 lg:grid-cols-2 ' +
                      (i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : '')
                    }
                  >
                    <div className="flex flex-col">
                      <h2 className="font-display text-text-dark text-2xl font-black tracking-tight sm:text-3xl">
                        {project.kicker}{' '}
                        <span className="text-violet font-serif font-normal italic">
                          {project.accent}
                        </span>
                      </h2>
                      <p className="text-text-dark/80 mt-1 text-lg font-semibold">
                        {project.name}
                      </p>
                      <p className="text-text-dark/70 mt-4">{project.description}</p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border-text-dark/10 text-text-dark/80 rounded-full border bg-white/50 px-3 py-1 text-xs font-medium backdrop-blur"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      {(project.liveUrl || project.repoUrl) && (
                        <div className="mt-auto flex flex-wrap gap-3 pt-7">
                          {project.liveUrl && (
                            <ButtonLink
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              arrow
                              className="px-5 py-2.5 text-[#160f24]"
                            >
                              Live
                            </ButtonLink>
                          )}
                          {project.repoUrl && (
                            <ButtonLink
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              variant="ghost"
                              className="px-5 py-2.5"
                            >
                              <BrandIcon name="github" size={16} /> Code
                            </ButtonLink>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="group relative min-h-[16rem] overflow-hidden rounded-2xl border border-white/50 shadow-lg">
                      <img
                        src={project.image}
                        alt={`${project.name} interface`}
                        loading="lazy"
                        width={1200}
                        height={800}
                        className="absolute inset-0 h-full w-full object-cover saturate-[1.12] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.5),rgba(236,72,153,0.22)_45%,rgba(253,186,140,0.45))] mix-blend-soft-light"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1030]/35 to-transparent"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <ButtonLink
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              arrow
            >
              <BrandIcon name="github" size={16} /> View all on GitHub
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
