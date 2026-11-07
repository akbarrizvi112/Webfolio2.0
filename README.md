<<<<<<< HEAD
# Webfolio2.0
=======
# Akbar — Webfolio

A premium, single-page developer portfolio built with React, TypeScript, Tailwind
CSS v4 and Motion. Dark/light alternating sections, a gradient-driven design system,
scroll-linked animation, and a fully responsive, accessible layout.

## Tech stack

- **React 19** + **Vite 8** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens) via `@tailwindcss/postcss`
- **Motion** (`motion/react`) for animation, **Lenis** for smooth scroll
- **lucide-react** icons, **react-helmet-async** for SEO, **clsx** + **tailwind-merge**
- **ESLint** + **Prettier**

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

### Scripts

| Script              | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start Vite dev server with HMR                   |
| `npm run build`     | Type-check (`tsc --noEmit`) then build to `dist` |
| `npm run preview`   | Preview the production build locally             |
| `npm run typecheck` | Type-check only                                  |
| `npm run lint`      | Lint JS/MJS config files                         |
| `npm run format`    | Format the codebase with Prettier                |

> **Linting note:** TypeScript/TSX files are checked by `tsc --noEmit` (strict mode
> catches unused vars, implicit `any`, etc). `typescript-eslint` is temporarily
> omitted because it does not yet support the installed TypeScript 7.0 API — re-add
> it to `eslint.config.js` once upstream support lands.

## Editing content

**All copy and data live in `src/data/` — you should never need to touch the
components to change content.**

| File                   | Contents                                             |
| ---------------------- | ---------------------------------------------------- |
| `data/profile.ts`      | Name, role, tagline, email, socials, nav, hero stats |
| `data/stack.ts`        | Tech badges in the hero marquee                      |
| `data/projects.ts`     | Project cards (title, description, tags, links, img) |
| `data/experience.ts`   | Timeline roles and impact bullets                    |
| `data/testimonials.ts` | Text + video testimonial cards                       |
| `data/faq.ts`          | FAQ accordion items                                  |

Each file is fully typed, so your editor will guide you and the build will fail if a
required field is missing.

## Swapping images

Images are referenced by URL in the data files (currently Unsplash placeholders) and
in a couple of spots in the sections. To use your own:

1. Drop files into `public/` (e.g. `public/hero.webp`) and reference them as
   `/hero.webp`, **or** paste a hosted URL.
2. Update the relevant field — e.g. `profile.heroPortrait`, each `project.image`,
   `testimonials[].image/avatar`, and the workspace image in
   `components/sections/About.tsx`.
3. Update the preload in `index.html` (`<link rel="preload" as="image" ...>`) to match
   your hero image so the LCP stays fast.

**Assets to add before going live:**

- `public/resume.pdf` — linked as `/resume.pdf`
- `public/og.png` — 1200×630 social share image (referenced in `Seo.tsx`)
- `public/favicon.svg` — already included (swap for your own mark)

Also update `profile.siteUrl`, the social `sameAs` URLs in `components/sections/Seo.tsx`,
`public/robots.txt`, and `public/sitemap.xml` with your real domain.

## Design system

Tokens are defined once in `src/styles/globals.css` under `@theme` (colors, fonts,
easing) plus a few raw CSS variables for gradients. Custom utilities: `.text-gradient`,
`.text-gradient-warm`, `.border-gradient`, `.noise` / `.noise-layer`, `.mask-fade-x`.

Motion is centralized in `src/lib/motion.ts` (one easing, shared variants). Everything
honors `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">`, and Lenis /
parallax / marquee disable themselves under reduced motion.

## Project structure

```
src/
  app/            App.tsx, providers.tsx
  components/
    ui/           Button, Pill, SectionLabel, ToneHeading, Card, Marquee,
                  Accordion, Modal, Counter, Reveal, Container, BrandIcon…
    layout/       Navbar, MobileMenu, Footer, PageFrame
    sections/     Hero, About, Projects, Experience, Testimonials, FAQ, Seo
  data/           typed content
  hooks/          useActiveSection, useReducedMotion, useMediaQuery, useLenis
  lib/            cn.ts, motion.ts
  styles/         globals.css (tokens + utilities)
```

Internal imports use relative paths (the `@/` alias was dropped because Vite 8's dev
resolver did not apply it reliably on this toolchain).

## Deploy

### Vercel

1. Push to GitHub and import the repo in Vercel.
2. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
3. Deploy.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- (Add a `public/_redirects` with `/* /index.html 200` if you add client routing.)

Any static host works — the output in `dist/` is plain static files.
>>>>>>> a103b92 (Update Webfolio portfolio)
