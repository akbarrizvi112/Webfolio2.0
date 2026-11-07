import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Hero background reel (in /public). Swap the file to change it. */
const HERO_VIDEO = '/reel_final.mp4'

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      className="bg-bg-dark relative mb-2 min-h-[100svh] overflow-clip rounded-[28px] sm:mb-3"
    >
      {/* Visually hidden heading keeps a single, meaningful h1 for SEO / a11y. */}
      <h1 className="sr-only">
        {profile.fullName} — {profile.role}
      </h1>

      {reduced ? (
        <img
          src={profile.heroPortrait}
          alt={`${profile.fullName}, ${profile.role}`}
          width={800}
          height={800}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          src={HERO_VIDEO}
          poster={profile.heroPortrait}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </section>
  )
}
