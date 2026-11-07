/** Grouped skills for the /about detail page. */

export interface SkillGroup {
  category: string
  items: readonly string[]
}

export const skillGroups: readonly SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    category: 'Cloud & Tooling',
    items: ['AWS', 'Docker', 'GitHub Actions', 'Git', 'Vitest', 'Playwright'],
  },
]

/** Longer bio paragraphs used on the /about page. */
export const bio: readonly string[] = [
  "I'm a full stack developer who cares as much about how a product feels as how it's built. Most of my work lives at the intersection of clean architecture and polished, accessible interfaces.",
  'Over the past few years I’ve shipped analytics platforms, fintech apps and AI tooling — taking several from an empty repo to production. I’m comfortable owning a feature end to end: data model, API, UI and the deploy pipeline around it.',
  'When I’m not building, I’m usually refining a design system, reading about performance, or helping other engineers level up through reviews and pairing.',
]
