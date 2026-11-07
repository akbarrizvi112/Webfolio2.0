# CLAUDE.md

Guidance for working in this repo (an award-style single-page developer portfolio).

## Stack

- React 19 + Vite 8 + TypeScript (strict). Tailwind CSS v4 via `@tailwindcss/postcss`.
- Motion (`motion/react`) for animation, Lenis for smooth scroll, lucide-react icons,
  react-helmet-async for SEO.
- Internal imports use **relative paths** (no `@/` alias — Vite 8's dev resolver did not
  apply it reliably here).
- Content lives in typed `src/data/*.ts`. Never hardcode copy in components.

## Commands

- `npm run dev` — dev server
- `npm run build` — `tsc --noEmit` then Vite build
- `npm run typecheck` / `npm run lint` / `npm run format`

## Design system

### Color & type

- Tokens are defined once in `src/styles/globals.css` under `@theme` (colors, fonts,
  easing) plus raw CSS vars for gradients. Use token utilities (`bg-bg-dark`,
  `text-violet`, `font-display`…), not hardcoded hex.
- Custom utilities: `.text-gradient`, `.text-gradient-warm`, `.border-gradient`,
  `.noise` / `.noise-layer`, `.mask-fade-x`.

### Shape and depth

- **Layout is full-bleed: sections span the full viewport width with no outer frame,
  margins or rounded section corners. Content is aligned inside `<Container>` (max-w
  1440px, responsive px). Rounded corners apply to cards, pills and media only.**
- Dark/light contrast between adjacent sections marks where one ends and the next
  begins — sections stack directly with no gaps.
- Soft shadows (`0 10px 40px -12px rgba(80,40,140,0.18)`), glass surfaces
  (`bg-white/5 backdrop-blur-xl`), blurred gradient orbs, subtle SVG noise on dark
  sections.

### Full-bleed elements

- Hero background image and light streaks, the tech marquee, the giant "PROJECTS" word
  and the footer wordmark are intentionally full-bleed and clipped at the edges.
- **Never use `w-screen` / `100vw`** on elements inside scrolling content — it causes a
  horizontal scrollbar on Windows. Put `w-full` on a full-width parent instead.
  `PageFrame` carries `overflow-x-clip` as the safety net.

### Motion

- One easing everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE_BRAND` in
  `src/lib/motion.ts`); durations 0.5–0.9s.
- Reveal-on-scroll via `<Reveal>` (whileInView, once). Scroll-linked effects use only
  transform/opacity. Everything honors `prefers-reduced-motion`
  (`<MotionConfig reducedMotion="user">`; Lenis/parallax/marquee self-disable).

## Accessibility & responsiveness

- Semantic landmarks, one `h1`, visible focus rings, skip link, keyboard-operable
  nav/accordion/modal.
- Must stay clean at 360, 768, 1024, 1440, 1920px with no horizontal scroll
  (`document.documentElement.scrollWidth === window.innerWidth`).
