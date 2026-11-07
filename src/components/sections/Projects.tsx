import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { projects, githubUrl, type Project } from '../../data/projects'
import { Container } from '../ui/Container'
import { ButtonLink } from '../ui/Button'
import { BrandIcon } from '../ui/BrandIcon'
import { ViewDetails } from '../ui/ViewDetails'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function ProjectCard({
  project,
  index,
  total,
  progress,
  reduced,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  reduced: boolean
}) {
  const targetScale = 1 - (total - index) * 0.04
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div
      className="sticky"
      style={{ top: reduced ? 'auto' : `calc(7rem + ${index * 1.75}rem)` }}
    >
      <motion.article
        style={{
          scale: reduced ? 1 : scale,
          background: project.wash,
        }}
        className="origin-top overflow-hidden rounded-[28px] border border-white/40 p-6 shadow-[0_24px_70px_-24px_rgba(80,40,140,0.45)] sm:p-9"
      >
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: text */}
          <div className="flex flex-col">
            <h3 className="font-display text-text-dark text-3xl font-black tracking-tight sm:text-4xl">
              {project.kicker}{' '}
              <span className="text-violet font-serif font-normal italic">
                {project.accent}
              </span>
            </h3>
            <p className="text-text-dark/80 mt-1 text-lg font-semibold">{project.name}</p>
            <p className="text-text-dark/70 mt-4 max-w-md">{project.description}</p>

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

          {/* Right: mockup — tinted to the brand palette for color cohesion */}
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
      </motion.article>
    </div>
  )
}

export function Projects() {
  const reduced = useReducedMotion()
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="noise bg-bg-dark relative mb-2 overflow-clip rounded-[28px] pt-24 pb-28 sm:mb-3"
    >
      <span className="noise-layer" aria-hidden />
      {/* top glow */}
      <div className="from-orange/25 pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent" />

      {/* Giant background word */}
      <div
        aria-hidden
        className="pointer-events-none overflow-hidden text-center select-none"
      >
        <span className="font-display [mask-image:linear-gradient(180deg,#000_45%,transparent)] text-[18vw] leading-none font-black tracking-tighter text-white">
          PROJECTS
        </span>
      </div>

      <Container className="relative -mt-[6vw]">
        <div ref={container} className="flex flex-col gap-6 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <ViewDetails to="/projects" tone="dark">
            View all projects
          </ViewDetails>
          <ButtonLink
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            variant="glass"
            arrow
          >
            <BrandIcon name="github" size={16} /> View all on GitHub
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
