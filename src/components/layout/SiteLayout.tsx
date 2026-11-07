import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Seo } from '../sections/Seo'
import { PageFrame } from './PageFrame'
import { Navbar } from './Navbar'

const Footer = lazy(() => import('./Footer').then((m) => ({ default: m.Footer })))

/**
 * Reset scroll to the top when the path changes with no hash. Hash targets
 * (e.g. navigating to /#about from a detail page) are handled on the home
 * page itself, since its sections mount lazily.
 */
function RouteScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

/** App shell shared by the home page and every detail page. */
export function SiteLayout() {
  return (
    <>
      <Seo />
      <RouteScroll />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <PageFrame>
        <Navbar />
        <main id="main">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
            <Outlet />
          </Suspense>
        </main>
        <Suspense fallback={<div className="min-h-[30vh]" aria-hidden />}>
          <Footer />
        </Suspense>
      </PageFrame>
    </>
  )
}
