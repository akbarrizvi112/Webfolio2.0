import { Helmet } from 'react-helmet-async'
import { profile } from '../../data/profile'

const title = `${profile.fullName} — ${profile.role}`
const description = profile.tagline
const ogImage = `${profile.siteUrl}/og.png`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.fullName,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: [
    'https://github.com/akbar',
    'https://linkedin.com/in/akbar',
    'https://x.com/akbar',
  ],
}

export function Seo() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={profile.siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={profile.siteUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  )
}
