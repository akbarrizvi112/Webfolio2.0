export interface Role {
  id: string
  company: string
  role: string
  period: string
  bullets: readonly string[]
}

export const experience: readonly Role[] = [
  {
    id: 'medcomply',
    company: 'MedComply Platform',
    role: 'Full-Stack Web Developer',
    period: 'Jun 2026 — Present',
    bullets: [
      'Engineered and maintained responsive, reusable web interfaces for an enterprise healthcare compliance and risk management platform using React, TypeScript, Vite, and Material UI.',
      'Developed web experiences across Admin, Client, and Compliance Connect modules.',
      'Integrated React and TypeScript interfaces with NestJS REST APIs, delivering new features and resolving UI and functional defects.',
      'Collaborated with cross-functional teams in a monorepo environment using Git-based development workflows.',
    ],
  },
  {
    id: 'paws-pour',
    company: 'Paws & Pour',
    role: 'Web Developer',
    period: 'Mar 2026 — Jun 2026',
    bullets: [
      'Developed a responsive pet management web dashboard featuring pet profiles, treat inventory, subscriptions, and safety logs.',
      'Built reusable React 19 and TypeScript components with Tailwind CSS and interactive Recharts visualizations.',
      'Implemented client-side routing and Axios-based API integration with a modular web application architecture.',
    ],
  },
  {
    id: 'ssgc',
    company: 'Sui Southern Gas Company',
    role: 'Web Development Intern',
    period: 'Internship',
    bullets: [
      'Collaborated with a two-person development team to build an outsourced US WebProfessionals website.',
      'Developed website interfaces using HTML, CSS, JavaScript, and Bootstrap.',
      'Implemented responsive Bootstrap layouts for consistent experiences across desktop, tablet, and mobile devices.',
    ],
  },
  {
    id: '110-solutions',
    company: '110 Solutions',
    role: 'Web Developer',
    period: 'Experience',
    bullets: [
      'Developed a responsive website using HTML, CSS, and JavaScript to establish a functional digital presence.',
      'Implemented interactive JavaScript features and adaptive layouts to improve cross-device usability.',
      'Collaborated within a three-person development team on website development.',
    ],
  },
]
