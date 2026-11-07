/**
 * Certifications shown on the home page.
 *
 * `image` is the certificate scan/preview. Real images live in
 * /src/assets/certificate and are imported below so Vite fingerprints them.
 * `issuerLogo` is optional; when empty the UI shows an issuer monogram.
 *
 * NOTE: titles, issuers, dates and credential IDs below are best guesses from
 * the file names — edit them to match each real certificate.
 */
import { profile } from './profile'
import metaFrontendImg from '../assets/certificate/Meta Certificate Frontend.jpeg'
import cssImg from '../assets/certificate/Css Certificate.png'
import sqlImg from '../assets/certificate/Sql Certificate.png'
import projectImg from '../assets/certificate/Project Certicate.png'
import nodeImg from '../assets/certificate/Node.js Certificate.png'
import stepGen23Img from '../assets/certificate/Step_Gen_23.jpeg'

export interface Certification {
  id: string
  title: string
  issuer: string
  /** Optional issuer logo URL; falls back to an initials monogram. */
  issuerLogo?: string
  recipient: string
  /** Issue date, or an "Expected …" string for in-progress tracks. */
  issuedDate: string
  /** Omit for in-progress certifications. */
  credentialId?: string
  /** Public verification link. Leave empty to hide the verify button. */
  verifyUrl?: string
  /** Certificate scan. Omit for in-progress certifications. */
  image?: string
  /** Marks a certification still being pursued (no image / credential yet). */
  inProgress?: boolean
}

export const certifications: readonly Certification[] = [
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Meta · Coursera',
    recipient: profile.fullName,
    issuedDate: 'Mar 2025',
    credentialId: 'META-FED-9F42A1',
    verifyUrl: '',
    image: metaFrontendImg,
  },
  {
    id: 'css',
    title: 'CSS (Basic)',
    issuer: 'HackerRank',
    recipient: profile.fullName,
    issuedDate: '2024',
    credentialId: 'HR-CSS-0000',
    verifyUrl: '',
    image: cssImg,
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    issuer: 'CodeChef',
    recipient: profile.fullName,
    issuedDate: '2025',
    credentialId: 'CC-NODE-0000',
    verifyUrl: '',
    image: nodeImg,
  },
  {
    id: 'sql',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    recipient: profile.fullName,
    issuedDate: '2024',
    credentialId: 'HR-SQL-0000',
    verifyUrl: '',
    image: sqlImg,
  },
  {
    id: 'project',
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    recipient: profile.fullName,
    issuedDate: '2024',
    credentialId: 'HR-PS-0000',
    verifyUrl: '',
    image: projectImg,
  },
  {
    id: 'stepgen-23',
    title: 'StepGen 23',
    issuer: 'StepGen',
    recipient: profile.fullName,
    issuedDate: '2023',
    credentialId: 'STEPGEN-23-0000',
    verifyUrl: '',
    image: stepGen23Img,
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
    issuer: 'Udemy',
    recipient: profile.fullName,
    issuedDate: 'Expected 2026',
    inProgress: true,
    verifyUrl: '',
  },
]
