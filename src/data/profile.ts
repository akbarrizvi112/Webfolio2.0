/**
 * Central profile / brand content.
 * Edit everything here first —
 * nothing in this file is hardcoded inside components.
 */

export interface NavItem {
  id: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x' | 'mail'
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const profile = {
  name: 'Akbar',
  fullName: 'Syed Muhammad Akbar Rizvi',
  brand: 'Akbar Rizvi',
  role: 'Full-Stack Web Developer',
  tagline:
    'I build modern web applications and AI-powered solutions that turn complex ideas into practical digital experiences.',
  location: 'Karachi, Pakistan',
  availability: 'Open to Freelance & Full-Time Opportunities',
  email: 'akbarrizvi112@gmail.com',
  resumeUrl: '/resume.pdf',
  calendarUrl: '',
  siteUrl: '',
  heroPortrait: '/hero-portrait.png',
  avatar: '',
} as const

export const navItems: readonly NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const socials: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/akbarrizvi112',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akbarrizvi112/',
    icon: 'linkedin',
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: 'x',
  },
  {
    label: 'Email',
    href: 'mailto:akbarrizvi112@gmail.com',
    icon: 'mail',
  },
]

export const stats: readonly Stat[] = [
  { value: 4, suffix: '', label: 'Professional Experiences' },
  { value: 2, suffix: '+', label: 'Featured Full-Stack Projects' },
  { value: 3, suffix: '', label: 'Core Development Areas' },
]

/**
 * Social accounts revealed around the "Book a Free Call" button.
 * Replace the WhatsApp number and the Facebook / Instagram handles with
 * your real ones (LinkedIn already points to your profile).
 */
export interface BookingSocial {
  label: string
  icon: 'whatsapp' | 'facebook' | 'instagram' | 'linkedin'
  href: string
  color: string
}

export const bookingSocials: readonly BookingSocial[] = [
  {
    label: 'WhatsApp',
    icon: 'whatsapp',
    href: 'https://wa.me/92XXXXXXXXXX',
    color: '#25D366',
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/',
    color: '#1877F2',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/',
    color: '#E4405F',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/akbarrizvi112/',
    color: '#0A66C2',
  },
]
