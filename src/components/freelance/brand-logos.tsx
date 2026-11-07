import type { ReactElement, ReactNode } from 'react'
import { Code2, Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Brand assets for the freelance hero — inline SVG / CSS only, no external
 * image requests.
 *
 *  • Tech "app tiles" (React / Node / TypeScript / AI / Code) are the floating
 *    badges around the laptop.
 *  • Platform glyphs (Fiverr / Upwork / Freelancer / Contra) are single-path,
 *    currentColor marks so they can render grayscale by default and animate to
 *    their brand color on hover.
 *
 * Fiverr, Upwork and Freelancer paths are the authentic Simple Icons marks.
 * Contra is not published in Simple Icons, so its mark is a faithful "C"
 * approximation — drop an official /public/brands/contra.svg in later if you
 * want the exact asset.
 */

interface LogoProps {
  size?: number
  className?: string
}

/* ------------------------------------------------------------ Tech tiles --- */

function Tile({
  size,
  className,
  bg,
  children,
}: LogoProps & { bg: string; children: ReactNode }) {
  return (
    <span
      style={{ width: size, height: size, background: bg }}
      className={cn(
        'grid shrink-0 place-items-center rounded-[26%] text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ReactLogo({ size = 48, className }: LogoProps) {
  return (
    <Tile size={size} className={className} bg="#0b1f33">
      <svg
        width={size * 0.66}
        height={size * 0.66}
        viewBox="-11.5 -10.23 23 20.46"
        fill="none"
        aria-hidden
      >
        <circle r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </Tile>
  )
}

export function NodeLogo({ size = 48, className }: LogoProps) {
  return (
    <Tile size={size} className={className} bg="#1e2a13">
      <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 24 24" aria-hidden>
        <path d="M12 1.6 21 6.8v10.4L12 22.4 3 17.2V6.8z" fill="#539e43" />
        <text
          x="12"
          y="13.9"
          fontSize="4.6"
          fill="#fff"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
        >
          node
        </text>
      </svg>
    </Tile>
  )
}

export function TsLogo({ size = 48, className }: LogoProps) {
  return (
    <Tile size={size} className={className} bg="#3178c6">
      <span
        className="font-display leading-none font-black tracking-tight"
        style={{ fontSize: size * 0.4 }}
      >
        TS
      </span>
    </Tile>
  )
}

export function AiLogo({ size = 48, className }: LogoProps) {
  return (
    <Tile size={size} className={className} bg="linear-gradient(135deg,#8b5cf6,#3b82f6)">
      <Sparkles size={size * 0.5} aria-hidden />
    </Tile>
  )
}

export function CodeLogo({ size = 48, className }: LogoProps) {
  return (
    <Tile size={size} className={className} bg="#0e0b16">
      <Code2 size={size * 0.5} className="text-lilac" aria-hidden />
    </Tile>
  )
}

/* -------------------------------------------------------- Platform glyphs --- */

function Glyph({
  size = 28,
  className,
  viewBox = '0 0 24 24',
  d,
}: LogoProps & { viewBox?: string; d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

function FiverrGlyph(p: LogoProps) {
  return (
    <Glyph
      {...p}
      d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"
    />
  )
}

function UpworkGlyph(p: LogoProps) {
  return (
    <Glyph
      {...p}
      d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
    />
  )
}

function FreelancerGlyph(p: LogoProps) {
  return (
    <Glyph
      {...p}
      d="M14.096 3.076l1.634 2.292L24 3.076M5.503 20.924l4.474-4.374-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76 4.734.294m-3.058 7.072l3.497-6.522L0 5.13m7.064 7.485l3.303 3.548 3.643-3.57 1.13-6.652-4.439-.228Z"
    />
  )
}

/** Contra mark approximation (not in Simple Icons) — a clean "C". */
function ContraGlyph({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M16.5 6.8a7.3 7.3 0 1 0 .2 10.3"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export interface Platform {
  name: string
  color: string
  Glyph: (p: LogoProps) => ReactElement
  /** Public profile URL. Left undefined until a real profile exists. */
  url?: string
}

export const platforms: readonly Platform[] = [
  { name: 'Fiverr', color: '#1dbf73', Glyph: FiverrGlyph },
  { name: 'Upwork', color: '#14a800', Glyph: UpworkGlyph },
  { name: 'Freelancer', color: '#29b2fe', Glyph: FreelancerGlyph },
  { name: 'Contra', color: '#0e0b16', Glyph: ContraGlyph },
]
