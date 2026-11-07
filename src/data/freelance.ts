
/** Content for the dedicated /freelance page. */

import fullStackGigImage from '../assets/fullstack_gig_image.png'
import gymFitnessImage from '../assets/gym_fitness_image.jfif'
import aiAssistantImage from '../assets/ai assistant.png'

export type ServiceIcon =
  | 'layout'
  | 'server'
  | 'cpu'
  | 'gauge'
  | 'palette'
  | 'wrench'

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

/* -------------------------------------------------------------- Currency --- */

// Fiverr uses USD as its package pricing currency.
// Other currencies are only for Webfolio display.

export interface Currency {
  code: string
  rate: number
}

export const USD_TO_PKR = 280

export const currencies: readonly Currency[] = [
  { code: 'USD', rate: 1 },
  { code: 'PKR', rate: USD_TO_PKR },
]

export function formatPrice(
  priceUsd: number,
  currency: Currency,
): string {
  const value = Math.round(priceUsd * currency.rate)

  return currency.code === 'USD'
    ? `$${value.toLocaleString('en-US')}`
    : `PKR ${value.toLocaleString('en-US')}`
}

/* ----------------------------------------------------------------- Gigs --- */

export type GigCategoryId =
  | 'full-stack'
  | 'saas'
  | 'ai'
  | 'landing'

export interface GigCategory {
  id: GigCategoryId
  label: string
}

export const gigCategories: readonly GigCategory[] = [
  { id: 'full-stack', label: 'Full-Stack Development' },
  { id: 'saas', label: 'SaaS & Custom Software' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'landing', label: 'Landing Pages & Performance' },
]

export interface GigFeature {
  label: string
  included: boolean
}

export interface GigTier {
  id: 'basic' | 'standard' | 'premium'
  label: string
  name: string

  /** Fiverr package price in USD. */
  priceUsd: number

  priceNote: string
  description: string
  delivery: string
  revisions: string
  pages: string
  features: readonly GigFeature[]
  popular?: boolean
}

export interface Gig {
  id: string
  categoryId: GigCategoryId
  category: string
  title: string
  image: string
  wash: string
  tags: readonly string[]
  description: string

  /** Only display verified Fiverr profile information. */
  sellerBadge?: string
  completedOrders?: string

  url: string
}

/* ------------------------------------------------------------- Fiverr --- */

export const fiverr = {
  profileUrl: 'https://www.fiverr.com/akbarrizvi570',
  handle: '@akbarrizvi',
} as const

/* ------------------------------------------------------------- Services --- */

export const services: readonly Service[] = [
  {
    icon: 'layout',
    title: 'Full-Stack Web Development',
    description:
      'Complete web applications built with React, Next.js, Node.js and NestJS. From product architecture and frontend experiences to secure backend APIs and deployment.',
  },
  {
    icon: 'server',
    title: 'Backend & SaaS Engineering',
    description:
      'Scalable backend systems, multi-tenant architecture, microservices, REST and GraphQL APIs, authentication, PostgreSQL and MongoDB integrations.',
  },
  {
    icon: 'cpu',
    title: 'AI & RAG Development',
    description:
      'Intelligent AI assistants, document Q&A systems, retrieval-augmented generation, vector databases and agentic workflows integrated into real applications.',
  },
  {
    icon: 'palette',
    title: 'Frontend & UI Engineering',
    description:
      'Modern, responsive and interactive interfaces using React, Next.js, Tailwind CSS and Framer Motion, with accessibility and performance in mind.',
  },
  {
    icon: 'gauge',
    title: 'Performance Optimization',
    description:
      'Improve application speed, API response times, database queries, frontend rendering, Core Web Vitals and overall system reliability.',
  },
  {
    icon: 'wrench',
    title: 'API & Third-Party Integration',
    description:
      'Secure integrations for payment gateways, authentication providers, external APIs, AI models, email services and business automation.',
  },
]

/* --------------------------------------------------------------- Process --- */

export const process: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description:
      'We discuss your business requirements, target users, technical expectations, scope and delivery timeline before starting.',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description:
      'I define the application structure, database design, API contracts and user experience to establish a scalable foundation.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description:
      'I build your solution using clean, maintainable code, integrate the required services and test the important user workflows.',
  },
  {
    step: '04',
    title: 'Deployment & Handover',
    description:
      'Your application is prepared for deployment with source code, documentation and a clear handover process.',
  },
]

/* --------------------------------------------------------------- Gig data --- */

export const gigs: readonly Gig[] = [
  {
    id: 'full-stack-web-app',
    categoryId: 'full-stack',
    category: 'Programming & Tech › Software Development',
    title: 'Full stack web application with React and Node.js',
    image: fullStackGigImage,
    wash:
      'radial-gradient(120% 120% at 20% 10%, #c7d2fe 0%, #e0f2fe 40%, #ddd6fe 100%)',
    tags: [
      'React',
      'Node.js',
      'TypeScript',
      'Full Stack',
      'PostgreSQL',
    ],
    description:
      'I will build a modern, responsive full-stack web application using React, Next.js, Node.js or NestJS. Get clean architecture, secure APIs, database integration, authentication and scalable application development tailored to your business.',
    url:
      'https://www.fiverr.com/akbarrizvi570/build-a-full-stack-web-application-using-react-and-nodejs',
  },

  {
    id: 'gym-management-system',
    categoryId: 'saas',
    category: 'Programming & Tech › Website Development',
    title: 'Gym management software and fitness booking system',
    image: gymFitnessImage,
    wash:
      'radial-gradient(120% 120% at 80% 10%, #fed7aa 0%, #fdba8c 45%, #fef3c7 100%)',
    tags: [
      'Gym Website',
      'Gym Software',
      'Booking System',
      'React',
      'Dashboard',
    ],
    description:
      'I will develop custom gym management software and fitness booking platforms with membership management, trainer profiles, class scheduling, online bookings, payments and administration dashboards.',
    url:
      'https://www.fiverr.com/akbarrizvi570/setup-gym-management-software-and-fitness-booking-system',
  },

  {
    id: 'saas-dashboard',
    categoryId: 'saas',
    category: 'Programming & Tech › Software Development',
    title: 'Custom SaaS dashboard with multi-tenant architecture',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
    wash:
      'radial-gradient(120% 120% at 20% 10%, #a5b4fc 0%, #c7d2fe 45%, #e0e7ff 100%)',
    tags: [
      'SaaS Development',
      'Multi Tenant',
      'Next.js',
      'NestJS',
      'Dashboard',
    ],
    description:
      'I will build scalable SaaS applications with multi-tenant architecture, organization management, role-based access control, subscription billing, secure APIs and real-time analytics dashboards using Next.js, NestJS and PostgreSQL.',
    url: 'https://www.fiverr.com/akbarrizvi570',
  },

  {
    id: 'ai-assistant',
    categoryId: 'ai',
    category: 'Programming & Tech › AI Development',
    title: 'AI chatbot and RAG assistant integrated into your app',
    image: aiAssistantImage,
    wash:
      'radial-gradient(120% 120% at 80% 10%, #ddd6fe 0%, #e9d5ff 45%, #dbeafe 100%)',
    tags: [
      'AI Chatbot',
      'RAG',
      'LangChain',
      'Python',
      'AI Agent',
    ],
    description:
      'I will develop intelligent AI chatbots, RAG assistants and agentic AI workflows using Python, LangChain, LangGraph, LLMs and vector databases. Integrate document Q&A, knowledge retrieval and AI automation directly into your application.',
    url: 'https://www.fiverr.com/akbarrizvi570',
  },

  {
    id: 'landing-page',
    categoryId: 'landing',
    category: 'Programming & Tech › Website Development',
    title: 'High-converting landing page with 95+ Lighthouse score',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70',
    wash:
      'radial-gradient(120% 120% at 20% 10%, #fbcfe8 0%, #fde7d3 45%, #fef3c7 100%)',
    tags: [
      'Landing Page',
      'React',
      'Next.js',
      'Tailwind CSS',
      'SEO',
    ],
    description:
      'I will create a premium, responsive landing page using React, Next.js and Tailwind CSS. Get modern UI, smooth animations, SEO optimization, fast loading and conversion-focused sections tailored to your business.',
    url: 'https://www.fiverr.com/akbarrizvi570',
  },
]

/* ---------------------------------------------------------- Feature helpers --- */

const ok = (label: string): GigFeature => ({
  label,
  included: true,
})

const no = (label: string): GigFeature => ({
  label,
  included: false,
})

/* -------------------------------------------------------------- Gig tiers --- */

// All prices below are USD.
// Basic = accessible entry package.
// Standard = recommended package.
// Premium = advanced custom solution.
//
// Large or unclear requirements should use a custom Fiverr offer.

export const gigTiers: Record<string, readonly GigTier[]> = {
  /* ==========================================================
     1. FULL-STACK WEB APPLICATION
  ========================================================== */

  'full-stack-web-app': [
    {
      id: 'basic',
      label: 'Basic',
      name: 'Starter Application',
      priceUsd: 99,
      priceNote: 'fixed price',
      description:
        'A responsive starter web application with up to 3 pages, reusable React components and one core API integration.',
      delivery: '7-day delivery',
      revisions: '2 Revisions',
      pages: '3 pages',
      features: [
        ok('Responsive React frontend'),
        ok('Up to 3 pages'),
        ok('One core API integration'),
        ok('Reusable components'),
        ok('Source code delivery'),
        no('Authentication & authorization'),
        no('Database-driven backend'),
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      name: 'Professional Web App',
      priceUsd: 249,
      priceNote: 'fixed price',
      description:
        'A complete full-stack application with up to 6 pages, backend APIs, database integration, authentication and core business functionality.',
      delivery: '15-day delivery',
      revisions: '3 Revisions',
      pages: '6 pages',
      popular: true,
      features: [
        ok('Everything in Basic'),
        ok('Node.js / NestJS backend'),
        ok('PostgreSQL or MongoDB'),
        ok('Authentication & user roles'),
        ok('Up to 5 core API endpoints'),
        ok('Form and database integration'),
        ok('Git repository + source code'),
        no('Complex microservices architecture'),
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      name: 'Advanced Full-Stack',
      priceUsd: 499,
      priceNote: 'fixed price',
      description:
        'An advanced full-stack solution with up to 10 pages, custom backend modules, secure authentication, integrations and deployment assistance.',
      delivery: '30-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 10 pages',
      features: [
        ok('Everything in Standard'),
        ok('Advanced backend modules'),
        ok('Role-based permissions'),
        ok('Third-party API integrations'),
        ok('Admin dashboard'),
        ok('Database optimization basics'),
        ok('Deployment assistance'),
        ok('Technical documentation'),
      ],
    },
  ],

  /* ==========================================================
     2. GYM MANAGEMENT SOFTWARE
  ========================================================== */

  'gym-management-system': [
    {
      id: 'basic',
      label: 'Basic',
      name: 'Gym Starter',
      priceUsd: 99,
      priceNote: 'fixed price',
      description:
        'A professional gym website with up to 3 pages, gym information, membership pricing and a contact form.',
      delivery: '5-day delivery',
      revisions: '2 Revisions',
      pages: '3 pages',
      features: [
        ok('Modern gym website'),
        ok('Responsive layout'),
        ok('Gym introduction section'),
        ok('Membership pricing section'),
        ok('Contact form'),
        ok('Source code'),
        no('Member management'),
        no('Online booking system'),
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      name: 'Gym Pro',
      priceUsd: 249,
      priceNote: 'fixed price',
      description:
        'A multi-page fitness website with class scheduling, trainer profiles, membership plans and booking functionality.',
      delivery: '12-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 6 pages',
      popular: true,
      features: [
        ok('Everything in Basic'),
        ok('Trainer profiles'),
        ok('Class scheduling interface'),
        ok('Membership management UI'),
        ok('Booking form integration'),
        ok('Admin management interface'),
        ok('Database integration'),
        no('Advanced payment workflows'),
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      name: 'Gym Management System',
      priceUsd: 499,
      priceNote: 'fixed price',
      description:
        'A custom gym management MVP with member records, membership plans, bookings, payment integration and an administration dashboard.',
      delivery: '25-day delivery',
      revisions: '3 Revisions',
      pages: 'Complete MVP',
      features: [
        ok('Everything in Standard'),
        ok('Member management'),
        ok('Membership tracking'),
        ok('Booking management'),
        ok('Payment gateway integration'),
        ok('Admin dashboard'),
        ok('Role-based access'),
        ok('Deployment assistance'),
      ],
    },
  ],

  /* ==========================================================
     3. MULTI-TENANT SAAS DASHBOARD
  ========================================================== */

  'saas-dashboard': [
    {
      id: 'basic',
      label: 'Basic',
      name: 'SaaS MVP',
      priceUsd: 199,
      priceNote: 'fixed price',
      description:
        'A single-tenant SaaS dashboard MVP with authentication, up to 3 core modules and a clean analytics overview.',
      delivery: '12-day delivery',
      revisions: '2 Revisions',
      pages: '3 modules',
      features: [
        ok('Modern SaaS dashboard UI'),
        ok('Authentication'),
        ok('User profile management'),
        ok('Up to 3 CRUD modules'),
        ok('Database integration'),
        ok('Basic analytics overview'),
        ok('Responsive design'),
        no('Multi-tenant architecture'),
        no('Subscription billing'),
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      name: 'Scale SaaS',
      priceUsd: 499,
      priceNote: 'fixed price',
      description:
        'A multi-tenant SaaS MVP with organization management, tenant isolation, role-based permissions, subscription billing integration and analytics.',
      delivery: '30-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 6 modules',
      popular: true,
      features: [
        ok('Everything in Basic'),
        ok('Multi-tenant architecture'),
        ok('Organization management'),
        ok('Tenant-aware data isolation'),
        ok('Role-based access control'),
        ok('Stripe integration'),
        ok('Up to 6 business modules'),
        ok('API integration'),
        no('Advanced microservices infrastructure'),
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      name: 'Enterprise SaaS',
      priceUsd: 999,
      priceNote: 'fixed price',
      description:
        'An advanced SaaS application with modular backend architecture, advanced tenant permissions, audit logging, billing workflows and deployment setup.',
      delivery: '45-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 10 modules',
      features: [
        ok('Everything in Standard'),
        ok('Advanced tenant management'),
        ok('Advanced RBAC'),
        ok('Audit logging'),
        ok('Advanced subscription workflows'),
        ok('Advanced analytics'),
        ok('API documentation'),
        ok('CI/CD setup'),
        ok('Cloud deployment assistance'),
      ],
    },
  ],

  /* ==========================================================
     4. AI CHATBOT & RAG ASSISTANT
  ========================================================== */

  'ai-assistant': [
    {
      id: 'basic',
      label: 'Basic',
      name: 'AI Chatbot Starter',
      priceUsd: 149,
      priceNote: 'fixed price',
      description:
        'An AI chatbot with a responsive chat interface, one LLM provider and basic prompt engineering.',
      delivery: '7-day delivery',
      revisions: '2 Revisions',
      pages: '1 chatbot',
      features: [
        ok('Responsive AI chat interface'),
        ok('One LLM provider integration'),
        ok('Prompt engineering'),
        ok('Conversation handling'),
        ok('Basic backend API'),
        ok('Source code'),
        no('Document ingestion'),
        no('Vector database'),
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      name: 'RAG Knowledge Assistant',
      priceUsd: 349,
      priceNote: 'fixed price',
      description:
        'A retrieval-augmented AI assistant that answers questions from your documents using embeddings, vector search and contextual retrieval.',
      delivery: '18-day delivery',
      revisions: '3 Revisions',
      pages: 'RAG pipeline',
      popular: true,
      features: [
        ok('Everything in Basic'),
        ok('Document ingestion pipeline'),
        ok('Text splitting and embeddings'),
        ok('Vector database integration'),
        ok('Semantic retrieval'),
        ok('Document question answering'),
        ok('Source citations'),
        ok('Application API integration'),
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      name: 'Agentic AI System',
      priceUsd: 699,
      priceNote: 'fixed price',
      description:
        'An advanced agentic AI solution with tool calling, multi-step workflows, memory, retrieval and integrations with your existing application.',
      delivery: '30-day delivery',
      revisions: '3 Revisions',
      pages: 'AI agent system',
      features: [
        ok('Everything in Standard'),
        ok('LangChain / LangGraph workflows'),
        ok('Tool-using AI agents'),
        ok('Agent memory'),
        ok('Multi-step task execution'),
        ok('External API integrations'),
        ok('Basic evaluation and guardrails'),
        ok('Deployment assistance'),
        ok('Technical documentation'),
      ],
    },
  ],

  /* ==========================================================
     5. LANDING PAGE DEVELOPMENT
  ========================================================== */

  'landing-page': [
    {
      id: 'basic',
      label: 'Basic',
      name: 'Launch Page',
      priceUsd: 79,
      priceNote: 'fixed price',
      description:
        'A modern, responsive single-page website with a professional hero section, essential business content and a contact form.',
      delivery: '4-day delivery',
      revisions: '2 Revisions',
      pages: '1 page',
      features: [
        ok('Custom landing page'),
        ok('Responsive design'),
        ok('Hero and CTA section'),
        ok('Contact form'),
        ok('Basic on-page SEO'),
        ok('Source code'),
        no('Advanced animations'),
        no('Analytics integration'),
      ],
    },
    {
      id: 'standard',
      label: 'Standard',
      name: 'Professional Landing',
      priceUsd: 179,
      priceNote: 'fixed price',
      description:
        'A premium multi-section landing page with custom UI, smooth animations, responsive design, SEO and performance optimization.',
      delivery: '7-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 3 pages',
      popular: true,
      features: [
        ok('Everything in Basic'),
        ok('Custom UI design'),
        ok('Up to 3 pages'),
        ok('Framer Motion animations'),
        ok('SEO optimization'),
        ok('Analytics integration'),
        ok('Image optimization'),
        ok('Performance optimization'),
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      name: 'Complete Launch Kit',
      priceUsd: 349,
      priceNote: 'fixed price',
      description:
        'A complete business launch website with up to 5 pages, advanced interactions, blog/CMS integration, SEO and conversion-focused layouts.',
      delivery: '14-day delivery',
      revisions: '3 Revisions',
      pages: 'Up to 5 pages',
      features: [
        ok('Everything in Standard'),
        ok('Up to 5 custom pages'),
        ok('Blog or CMS integration'),
        ok('Advanced animations'),
        ok('Lead generation forms'),
        ok('Advanced SEO setup'),
        ok('Schema markup'),
        ok('Performance optimization'),
        ok('Deployment assistance'),
      ],
    },
  ],
}

/* --------------------------------------------------------- Pricing helpers --- */

/** Get packages for a specific gig. */
export function getGigTiers(
  gigId: string,
): readonly GigTier[] {
  return gigTiers[gigId] ?? []
}

/** Find a particular package. */
export function getGigTier(
  gigId: string,
  tierId: GigTier['id'],
): GigTier | undefined {
  return getGigTiers(gigId).find(
    (tier) => tier.id === tierId,
  )
}

/** Calculate Fiverr seller earnings before withdrawal costs and taxes. */
export function calculateSellerEarnings(
  priceUsd: number,
): number {
  return Number((priceUsd * 0.8).toFixed(2))
}

/** Calculate the value received after Fiverr's standard 20% seller share. */
export function getPackageEarnings(
  tier: GigTier,
): number {
  return calculateSellerEarnings(tier.priceUsd)
}

/** Format a package price in the selected display currency. */
export function formatGigPrice(
  tier: GigTier,
  currency: Currency,
): string {
  return formatPrice(tier.priceUsd, currency)
}
