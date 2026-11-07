import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  Hourglass,
} from 'lucide-react'
import { certifications, type Certification } from '../../data/certifications'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE_BRAND } from '../../lib/motion'

/* ------------------------------------------------------------------ config */

const REST_ROT = [-4, 2.5, -1.5, 3.5, -2.5] // deg, cycles by index
const CARD_W = 420
const CARD_H = 300 // ~7:5
const OVERLAP = Math.round(CARD_W * 0.42) // negative margin
const PUSH = 56 // sibling shove on hover
const LIFT = 28 // hovered card rise

const monogram = (issuer: string) => {
  const words = issuer.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w))
  if (words.length >= 2) return (words[0]![0]! + words[1]![0]!).toUpperCase()
  return (words[0]?.slice(0, 2) ?? '?').toUpperCase()
}

const ariaFor = (c: Certification) =>
  c.inProgress
    ? `${c.title}, ${c.issuer}, in progress, ${c.issuedDate}. View details.`
    : `${c.title}, issued by ${c.issuer}, ${c.issuedDate}. View certificate.`

const altFor = (c: Certification) => `${c.title} certificate from ${c.issuer}`

/* ----------------------------------------------------------- issuer badge */

function IssuerBadge({ cert, size = 44 }: { cert: Certification; size?: number }) {
  if (cert.issuerLogo) {
    return (
      <img
        src={cert.issuerLogo}
        alt={`${cert.issuer} logo`}
        width={size}
        height={size}
        loading="lazy"
        className="rounded-xl object-contain"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span
      className="font-display text-lilac grid shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-black"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {monogram(cert.issuer)}
    </span>
  )
}

/* -------------------------------------------------------- in-progress bits */

function InProgressBadge() {
  return (
    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-[#3a2a00] shadow-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3a2a00]/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3a2a00]" />
      </span>
      In Progress
    </span>
  )
}

/** Shown in place of a certificate scan for in-progress tracks. */
function CertPlaceholder({ cert }: { cert: Certification }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
      style={{
        background:
          'radial-gradient(120% 120% at 30% 10%, #ede9fe 0%, #f5f3ff 55%, #faf5ff 100%)',
      }}
    >
      <span className="text-violet bg-violet/10 grid h-12 w-12 place-items-center rounded-2xl">
        <Hourglass size={22} aria-hidden />
      </span>
      <span className="font-display text-text-dark text-sm leading-snug font-black">
        {cert.title}
      </span>
      <span className="text-text-muted text-xs">
        {cert.issuer} · {cert.issuedDate}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------- stack card */

function StackCard({
  cert,
  index,
  hovered,
  containerActive,
  reduced,
  onOpen,
  onHover,
  cardRef,
}: {
  cert: Certification
  index: number
  hovered: number | null
  containerActive: boolean
  reduced: boolean
  onOpen: (i: number) => void
  onHover: (i: number | null) => void
  cardRef: (el: HTMLButtonElement | null) => void
}) {
  const active = hovered === index
  const rot = REST_ROT[index % REST_ROT.length]!

  let animate: Record<string, number | string>
  if (reduced) {
    animate = {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: hovered === null || active ? 1 : 0.55,
      filter: 'grayscale(0)',
    }
  } else if (active) {
    animate = {
      x: 0,
      y: -LIFT,
      scale: 1.1,
      rotate: 0,
      opacity: 1,
      filter: 'grayscale(0)',
    }
  } else if (hovered !== null) {
    animate = {
      x: index < hovered ? -PUSH : PUSH,
      y: 0,
      scale: 0.97,
      rotate: rot,
      opacity: 0.5,
      filter: 'grayscale(0.3)',
    }
  } else {
    animate = { x: 0, y: 0, scale: 1, rotate: rot, opacity: 1, filter: 'grayscale(0)' }
  }

  return (
    <motion.button
      ref={cardRef}
      type="button"
      aria-label={ariaFor(cert)}
      onClick={() => onOpen(index)}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      animate={animate}
      transition={{ duration: reduced ? 0.12 : 0.45, ease: EASE_BRAND }}
      style={{
        width: CARD_W,
        height: CARD_H,
        marginLeft: index === 0 ? 0 : -OVERLAP,
        zIndex: active ? 50 : index,
        willChange: containerActive ? 'transform' : undefined,
      }}
      className="focus-visible:outline-violet relative shrink-0 rounded-[12px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {/* elevated shadow (opacity-animated so nothing non-composited moves) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[12px]"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0.12 : 0.45, ease: EASE_BRAND }}
      />
      {/* clipped surface */}
      <span className="absolute inset-0 overflow-hidden rounded-[12px] border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {cert.inProgress && <InProgressBadge />}
        {cert.image ? (
          <>
            <img
              src={cert.image}
              alt={altFor(cert)}
              width={840}
              height={600}
              loading="lazy"
              className="h-full w-full bg-white object-contain"
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-left"
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
              transition={{ duration: reduced ? 0.12 : 0.45, ease: EASE_BRAND }}
            >
              <span className="font-display block text-sm leading-tight font-black text-white">
                {cert.title}
              </span>
              <span className="mt-0.5 block text-xs text-white/80">
                {cert.issuer} · {cert.issuedDate}
              </span>
            </motion.span>
          </>
        ) : (
          <CertPlaceholder cert={cert} />
        )}
      </span>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ rail card */

function RailCard({
  cert,
  index,
  onOpen,
  cardRef,
}: {
  cert: Certification
  index: number
  onOpen: (i: number) => void
  cardRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <li className="shrink-0 snap-center">
      <button
        ref={cardRef}
        type="button"
        aria-label={ariaFor(cert)}
        onClick={() => onOpen(index)}
        className="focus-visible:outline-violet relative block w-[320px] overflow-hidden rounded-[12px] border border-white/10 bg-white outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <div className="relative aspect-[7/5]">
          {cert.inProgress && <InProgressBadge />}
          {cert.image ? (
            <>
              <img
                src={cert.image}
                alt={altFor(cert)}
                width={640}
                height={457}
                loading="lazy"
                className="h-full w-full bg-white object-contain"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 text-left">
                <span className="font-display block text-sm leading-tight font-black text-white">
                  {cert.title}
                </span>
                <span className="mt-0.5 block text-xs text-white/80">
                  {cert.issuer} · {cert.issuedDate}
                </span>
              </span>
            </>
          ) : (
            <CertPlaceholder cert={cert} />
          )}
        </div>
      </button>
    </li>
  )
}

/* -------------------------------------------------------------- lightbox */

function Lightbox({
  certs,
  index,
  onClose,
  onNavigate,
}: {
  certs: readonly Certification[]
  index: number
  onClose: () => void
  onNavigate: (dir: 1 | -1) => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const cert = certs[index]!
  const titleId = `cert-dialog-${cert.id}`

  const keyHandler = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNavigate(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onNavigate(-1)
      } else if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        )
        if (f.length === 0) return
        const first = f[0]!
        const last = f[f.length - 1]!
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [onNavigate],
  )

  return (
    <motion.div
      className="fixed inset-0 z-[95] grid place-items-center bg-black/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={keyHandler}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.35, ease: EASE_BRAND }}
        className="bg-bg-dark-2 relative w-full max-w-[960px] overflow-hidden rounded-2xl text-white shadow-2xl outline-none"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
        >
          <X size={18} aria-hidden />
        </button>

        {/* Prev / next */}
        <button
          onClick={() => onNavigate(-1)}
          aria-label="Previous certificate"
          className="absolute top-1/2 left-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          onClick={() => onNavigate(1)}
          aria-label="Next certificate"
          className="absolute top-1/2 right-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
        >
          <ChevronRight size={18} aria-hidden />
        </button>

        {cert.image ? (
          <div className="mx-auto max-w-[900px]">
            <img
              src={cert.image}
              alt={altFor(cert)}
              width={900}
              height={600}
              className="max-h-[62vh] w-full bg-black object-contain"
            />
          </div>
        ) : (
          <div className="relative mx-auto flex aspect-[16/7] w-full max-w-[900px] items-center justify-center">
            {cert.inProgress && <InProgressBadge />}
            <CertPlaceholder cert={cert} />
          </div>
        )}

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <IssuerBadge cert={cert} size={48} />
            <div>
              <h3 id={titleId} className="font-display text-lg font-black tracking-tight">
                {cert.title}
              </h3>
              <p className="text-sm text-white/60">{cert.issuer}</p>
            </div>
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="text-xs text-white/40">Recipient</dt>
              <dd className="font-medium">{cert.recipient}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/40">Issued</dt>
              <dd className="font-medium">{cert.issuedDate}</dd>
            </div>
            {cert.credentialId ? (
              <div>
                <dt className="text-xs text-white/40">Credential ID</dt>
                <dd className="font-mono text-xs font-medium">{cert.credentialId}</dd>
              </div>
            ) : (
              <div>
                <dt className="text-xs text-white/40">Status</dt>
                <dd className="font-medium text-amber-400">In progress</dd>
              </div>
            )}
          </dl>
        </div>

        {cert.verifyUrl && (
          <div className="border-t border-white/10 p-5 sm:p-6">
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#160f24] shadow-[0_10px_30px_-10px_rgba(167,139,250,0.7)] [background:var(--signature-gradient)]"
            >
              <ShieldCheck size={16} aria-hidden />
              Verify credential
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------------------------------------------------- wall (self-contained) */

function CertificateWall({ certificates }: { certificates: readonly Certification[] }) {
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const useStack = isDesktop && canHover

  const [hovered, setHovered] = useState<number | null>(null)
  const [containerActive, setContainerActive] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  const total = certificates.length

  const open = useCallback((i: number) => setOpenIndex(i), [])
  const close = useCallback(() => {
    setOpenIndex((prev) => {
      if (prev !== null) {
        const el = cardRefs.current[prev]
        requestAnimationFrame(() => el?.focus())
      }
      return null
    })
  }, [])
  const navigate = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  )

  return (
    <>
      {useStack ? (
        <div
          className="mt-14 flex justify-center overflow-x-clip px-6 pt-10 pb-16"
          onMouseLeave={() => setHovered(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(null)
          }}
          onPointerEnter={() => setContainerActive(true)}
          onPointerLeave={() => setContainerActive(false)}
        >
          {certificates.map((cert, i) => (
            <StackCard
              key={cert.id}
              cert={cert}
              index={i}
              hovered={hovered}
              containerActive={containerActive}
              reduced={reduced}
              onOpen={open}
              onHover={setHovered}
              cardRef={(el) => {
                cardRefs.current[i] = el
              }}
            />
          ))}
        </div>
      ) : (
        <ul className="mt-10 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-6 py-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {certificates.map((cert, i) => (
            <RailCard
              key={cert.id}
              cert={cert}
              index={i}
              onOpen={open}
              cardRef={(el) => {
                cardRefs.current[i] = el
              }}
            />
          ))}
        </ul>
      )}

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            certs={certificates}
            index={openIndex}
            onClose={close}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------- section */

export function Certifications() {
  return (
    <section
      id="certifications"
      className="noise bg-bg-dark relative mb-2 overflow-x-clip rounded-[28px] pt-24 pb-28 text-white sm:mb-3"
    >
      <span className="noise-layer" aria-hidden />
      <div
        aria-hidden
        className="bg-violet/15 pointer-events-none absolute top-24 right-1/4 h-80 w-80 rounded-full blur-[120px]"
      />

      {/* Giant background word */}
      <div
        aria-hidden
        className="pointer-events-none overflow-hidden text-center select-none"
      >
        <span className="font-display [mask-image:linear-gradient(180deg,#000_45%,transparent)] text-[13vw] leading-none font-black tracking-tighter text-white">
          CERTIFICATES
        </span>
      </div>

      <CertificateWall certificates={certifications} />
    </section>
  )
}
