export interface Testimonial {
  id: string
  name: string
  role: string
  /** 'text' → quote card, 'media' → photo card with optional video. */
  kind: 'text' | 'media'
  quote?: string
  rating?: number
  avatar?: string
  image?: string
  videoUrl?: string
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 't1',
    kind: 'text',
    name: 'Fuad Hasan Khan',
    role: 'Founder, Aurigle Studio',
    quote:
      'Akbar is the rare engineer who ships fast without cutting corners. Our platform has never been more stable.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70',
  },
  {
    id: 't2',
    kind: 'media',
    name: 'Robin Ahmed',
    role: 'Product Lead, Pulse',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=70',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 't3',
    kind: 'text',
    name: 'Aliya Afroj',
    role: 'CTO, Nimbus',
    quote:
      'Whenever we need a new feature or a tricky fix, Akbar responds instantly and the quality is always there.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=70',
  },
  {
    id: 't4',
    kind: 'media',
    name: 'Khadija Akter',
    role: 'Design Manager, Orbit',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=70',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 't5',
    kind: 'text',
    name: 'Daniel Osei',
    role: 'Engineering Manager, Lumen',
    quote:
      'He raised the bar for our whole team — typed everything, documented everything, and still shipped ahead of schedule.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=70',
  },
  {
    id: 't6',
    kind: 'media',
    name: 'Sara Lindqvist',
    role: 'Founder, Atlas',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=70',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]
