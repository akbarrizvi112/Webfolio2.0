import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/sections/Hero'

const About = lazy(() =>
  import('../components/sections/About').then((m) => ({ default: m.About })),
)
const Projects = lazy(() =>
  import('../components/sections/Projects').then((m) => ({ default: m.Projects })),
)
const Experience = lazy(() =>
  import('../components/sections/Experience').then((m) => ({ default: m.Experience })),
)
const Certifications = lazy(() =>
  import('../components/sections/Certifications').then((m) => ({
    default: m.Certifications,
  })),
)
const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((m) => ({
    default: m.Testimonials,
  })),
)
const FAQ = lazy(() =>
  import('../components/sections/FAQ').then((m) => ({ default: m.FAQ })),
)

const Fallback = () => <div className="min-h-[40vh]" aria-hidden />

export function HomePage() {
  const { hash } = useLocation()

  // When arriving with a hash (e.g. /#about from a detail page), scroll to the
  // section once it has mounted — sections are code-split, so retry briefly.
  useEffect(() => {
    if (!hash) return
    let tries = 0
    const id = window.setInterval(() => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.clearInterval(id)
      } else if (++tries > 20) {
        window.clearInterval(id)
      }
    }, 80)
    return () => window.clearInterval(id)
  }, [hash])

  return (
    <>
      <Hero />
      <Suspense fallback={<Fallback />}>
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
        <FAQ />
      </Suspense>
    </>
  )
}
