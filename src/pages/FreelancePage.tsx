import { Helmet } from 'react-helmet-async'
import { profile } from '../data/profile'
import { GigsSection } from '../components/freelance/GigsSection'
import { ProjectEstimator } from '../components/freelance/ProjectEstimator'
import { AdvisoryCTA } from '../components/freelance/AdvisoryCTA'

export function FreelancePage() {
  return (
    <>
      <Helmet>
        <title>Freelance — {profile.fullName}</title>
        <meta
          name="description"
          content={`Hire ${profile.fullName} on Fiverr — full-stack web application gigs with clear packages, pricing and delivery.`}
        />
      </Helmet>

      <GigsSection />
      <ProjectEstimator />
      <AdvisoryCTA />
    </>
  )
}
