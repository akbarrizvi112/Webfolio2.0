export interface Project {
  id: string
  /** Rendered as two-font heading: kicker plain + accent serif-italic. */
  kicker: string
  accent: string
  name: string
  description: string
  tags: readonly string[]
  image: string
  liveUrl: string
  repoUrl: string
  /** CSS gradient used as the card's mesh wash. */
  wash: string
}

export const githubUrl = 'https://github.com/akbarrizvi112'

export const projects: readonly Project[] = [
  {
    id: 'medcomply',
    kicker: 'Enterprise',
    accent: 'Development',
    name: 'MedComply Platform',
    description:
      'An enterprise healthcare compliance platform featuring department-based modules for HR, Leadership, Marketing, Finance, Health & Life Safety, and Patient Care. Contributing to responsive frontend development and user experience across a modular application.',
    tags: ['React.js', 'TypeScript', 'Material UI', 'Monorepo', 'Frontend Engineering'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70',
    liveUrl: '',
    repoUrl: '',
    wash: 'radial-gradient(120% 120% at 20% 10%, #c7d2fe 0%, #e0f2fe 40%, #d1fae5 100%)',
  },
  {
    id: 'ai-interview-assistant',
    kicker: 'AI',
    accent: 'Engineering',
    name: 'AI Interview Assistant',
    description:
      'An intelligent interview preparation and assessment platform combining technical and HR interview workflows with computer vision. Evaluates interview presentation through posture, attire, body movement, confidence, and voice fluency analysis.',
    tags: ['React.js', 'Python', 'Flask', 'Rasa', 'TensorFlow', 'OpenCV', 'MobileNetV2'],
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=70',
    liveUrl: '',
    repoUrl: '',
    wash: 'radial-gradient(120% 120% at 80% 10%, #ddd6fe 0%, #e9d5ff 45%, #dbeafe 100%)',
  },

  {
    id: 'paws-pour',
    kicker: 'Web',
    accent: 'Application',
    name: 'Paws & Pour',
    description:
      'A pet and treats management platform with an interactive admin dashboard, JWT-based authentication, customer profiles, subscriptions, activity logs, and a rule management system.',
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'REST APIs', 'JWT'],
    image:
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=70',
    liveUrl: '',
    repoUrl: 'https://github.com/akbarrizvi112/paws-pour',
    wash: 'radial-gradient(120% 120% at 20% 10%, #fbcfe8 0%, #fde7d3 45%, #fef3c7 100%)',
  },
]
