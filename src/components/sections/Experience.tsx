import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { Download } from 'lucide-react'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { ToneHeading } from '../ui/ToneHeading'
import { Reveal } from '../ui/Reveal'
import { Card } from '../ui/Card'
import { ButtonLink } from '../ui/Button'
import { cn } from '../../lib/cn'

export function Experience() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 60%', 'end 70%'],
  })

  return (
    <section
      id="experience"
      className="bg-bg-light relative mb-2 overflow-clip rounded-[28px] py-24 sm:mb-3 lg:py-32"
    >
      <Container>
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
        </Reveal>
        <ToneHeading
          className="mt-6"
          segments={[
            { text: 'A track record of', tone: 'dark' },
            { text: 'shipping', tone: 'warm' },
            { text: 'work that', tone: 'dark' },
            { text: 'moves the numbers.', tone: 'faded' },
          ]}
        />

        <Reveal delay={1}>
          <ButtonLink
            href={profile.resumeUrl}
            download
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7"
          >
            <Download size={16} aria-hidden /> Download résumé
          </ButtonLink>
        </Reveal>

        <div ref={container} className="relative mt-14">
          {/* Timeline rail */}
          <div className="bg-text-dark/10 absolute top-0 left-4 h-full w-px md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="h-full w-full origin-top [background:var(--signature-gradient)]"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <ul className="space-y-10">
            {experience.map((role, i) => {
              const left = i % 2 === 0
              return (
                <li key={role.id} className="relative">
                  {/* Node */}
                  <span className="bg-violet ring-bg-light absolute top-6 left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 md:left-1/2" />
                  <div
                    className={cn(
                      'pl-12 md:w-1/2 md:pl-0',
                      left ? 'md:pr-12' : 'md:ml-auto md:pl-12',
                    )}
                  >
                    <Reveal>
                      <Card className="bg-surface-light">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-display text-text-dark text-xl font-extrabold tracking-tight">
                            {role.company}
                          </h3>
                          <span className="border-text-dark/10 bg-bg-light text-text-muted rounded-full border px-3 py-1 text-xs font-medium">
                            {role.period}
                          </span>
                        </div>
                        <p className="text-violet mt-1 font-medium">{role.role}</p>
                        <ul className="mt-4 space-y-2">
                          {role.bullets.map((b) => (
                            <li key={b} className="text-text-muted flex gap-2 text-sm">
                              <span className="bg-peach mt-2 h-1 w-1 shrink-0 rounded-full" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Reveal>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
