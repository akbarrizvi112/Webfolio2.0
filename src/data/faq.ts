export interface Faq {
  q: string
  a: string
}

export const faqs: readonly Faq[] = [
  {
    q: "What's your availability?",
    a: 'I take on a small number of projects at a time to stay hands-on. I currently have capacity for one new engagement and can usually start within two weeks.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely — most of my work is with early and growth-stage teams. I can plug into an existing codebase or take a product from zero to launch.',
  },
  {
    q: "What's your tech stack?",
    a: 'React, Next.js and TypeScript on the front end; Node.js, PostgreSQL and GraphQL on the back end; all shipped on AWS with Docker. I pick the right tool per problem, not per trend.',
  },
  {
    q: 'Do you take freelance work?',
    a: 'Yes. I work on both fixed-scope freelance builds and longer retainer arrangements, remotely across time zones.',
  },
  {
    q: 'How do you price projects?',
    a: 'Fixed-scope work is quoted per project after a short discovery call; ongoing work is a weekly or monthly retainer. You always know the number before we start.',
  },
]
