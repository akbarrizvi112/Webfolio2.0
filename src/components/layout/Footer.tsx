import { Mail, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile, socials } from '../../data/profile'
import { projects } from '../../data/projects'
import { Container } from '../ui/Container'
import { BrandIcon, type BrandName } from '../ui/BrandIcon'

const quickLinks = [
  { to: '/#about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/#experience', label: 'Experience' },
  { to: '/#testimonials', label: 'Testimonials' },
  { to: '/freelance', label: 'Freelance' },
  { to: '/#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-bg-light relative overflow-clip rounded-[28px] pt-20">
      <Container>
        <div className="grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              aria-label={`${profile.brand} — home`}
              className="group inline-block rounded-full p-[2px] shadow-[0_6px_22px_-6px_rgba(167,139,250,0.85)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [background:var(--signature-gradient)] hover:-translate-y-0.5"
            >
              <img
                src={profile.heroPortrait}
                alt={profile.fullName}
                width={56}
                height={56}
                className="block h-14 w-14 rounded-full border-2 border-white object-cover object-top"
              />
            </Link>
            <p className="text-text-muted mt-4 max-w-xs text-sm">{profile.tagline}</p>
            <div className="mt-5 flex gap-3">
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

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className="text-text-dark text-sm font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-text-muted hover:text-violet text-sm transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Projects */}
          <nav aria-label="Projects">
            <h2 className="text-text-dark text-sm font-semibold">Projects</h2>
            <ul className="mt-4 space-y-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/projects"
                    className="text-text-muted hover:text-violet text-sm transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-text-dark text-sm font-semibold">Contact</h2>
            <ul className="text-text-muted mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-violet transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.location}</li>
              <li className="text-violet">{profile.availability}</li>
            </ul>
          </div>
        </div>

        <div className="border-text-dark/10 flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-text-dark hover:text-violet inline-flex items-center gap-1 text-xs font-medium transition-colors"
          >
            Back to top <ArrowUp size={13} aria-hidden />
          </button>
        </div>
      </Container>
    </footer>
  )
}
