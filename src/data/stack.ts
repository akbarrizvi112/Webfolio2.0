/** Tech stack for the hero marquee. `tint` drives the icon chip color. */
export interface StackItem {
  name: string
  short: string
  tint: string
}

export const stack: readonly StackItem[] = [
  { name: 'React', short: 'Re', tint: '#38bdf8' },
  { name: 'TypeScript', short: 'TS', tint: '#3178c6' },
  { name: 'Next.js', short: 'Nx', tint: '#0e0b16' },
  { name: 'Node.js', short: 'No', tint: '#3c873a' },
  { name: 'PostgreSQL', short: 'Pg', tint: '#336791' },
  { name: 'MongoDB', short: 'Mo', tint: '#13aa52' },
  { name: 'GraphQL', short: 'Gq', tint: '#e535ab' },
  { name: 'AWS', short: 'Aw', tint: '#ff9900' },
  { name: 'Docker', short: 'Dk', tint: '#2496ed' },
  { name: 'Tailwind', short: 'Tw', tint: '#38bdf8' },
]
