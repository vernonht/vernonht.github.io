import { useMemo } from 'react'
import { calculateYearsOfExperience } from '../utils/helpers'

type CardVariant = 'accent' | 'outline' | 'filled' | 'default'

interface MasonryItem {
  id: number
  title: string
  content: string
  variant: CardVariant
  tags?: string[]
  metric?: string
  metricLabel?: string
}

const getMasonryItems = (): MasonryItem[] => [
  {
    id: 1,
    title: 'API Performance',
    content:
      'Refactored service layers at Mindvalley, cutting API requests by 70% and traffic by 50% through strategic caching and deduplication.',
    variant: 'accent',
    metric: '70%',
    metricLabel: 'fewer API calls',
  },
  {
    id: 2,
    title: 'Micro-Frontend Architecture',
    content:
      'Working with Webpack Module Federation at Morningstar to build scalable micro-frontend systems for financial platforms.',
    variant: 'default',
    tags: ['Webpack MFE', 'NuxtJs', 'Storybook'],
  },
  {
    id: 3,
    title: 'Cross-Platform Delivery',
    content:
      'Shipped features across web, backend, and MiniApp ecosystems at SOCAR Malaysia, adapting to diverse tech stacks and user needs.',
    variant: 'filled',
  },
  {
    id: 4,
    title: 'Team Enablement',
    content:
      'Built custom Storyblok CMS components that enabled 7 independent teams to ship content and features without engineering bottlenecks.',
    variant: 'outline',
    metric: '7',
    metricLabel: 'teams unblocked',
  },
  {
    id: 5,
    title: 'Localization Platform',
    content:
      'Designed and implemented a multi-language localization platform using NestJS, supporting regional expansion across Southeast Asia.',
    variant: 'default',
    tags: ['NestJS', 'i18n', 'SEA Markets'],
  },
  {
    id: 6,
    title: 'Vue.js Migration',
    content:
      'Contributing to a large-scale Vue.js migration at Morningstar, improving maintainability and long-term scalability of financial tools.',
    variant: 'accent',
  },
  {
    id: 7,
    title: 'Testing & Quality',
    content:
      'Advocate for code quality through Playwright E2E testing, Storybook component documentation, and proactive code review practices.',
    variant: 'filled',
    tags: ['Playwright', 'Cypress', 'Storybook'],
  },
  {
    id: 8,
    title: 'Passkey Wallet Infrastructure',
    content:
      'Built Oviato, a passkey-based wallet infrastructure project exploring modern authentication patterns for Web3 applications.',
    variant: 'outline',
  },
  {
    id: 9,
    title: 'Full Stack Versatility',
    content: `${calculateYearsOfExperience(2017, 5)}+ years spanning frontend frameworks, backend APIs, and DevOps tooling. Comfortable across the entire stack from UI to deployment pipelines.`,
    variant: 'default',
    tags: ['Vue', 'Nuxt', 'Next', 'Laravel', 'Express', 'NestJS'],
  },
  {
    id: 10,
    title: 'Information Security',
    content:
      'Degree in Information System Security from Asia Pacific University, bringing a security-first mindset to software development.',
    variant: 'accent',
  },
  {
    id: 11,
    title: 'Technical Debt Reduction',
    content:
      'Actively championed refactoring initiatives and code review standards to reduce technical debt and improve developer experience.',
    variant: 'outline',
  },
  {
    id: 12,
    title: 'Open Source & Side Projects',
    content:
      'Exploring agricultural data platforms, legal tech CMS systems, and higher education tools through personal and freelance projects.',
    variant: 'filled',
    tags: ['Agridata', 'JurifytePro', 'Cerah Future'],
  },
]

function Masonry() {
  const masonryItems = useMemo(() => getMasonryItems(), [])

  return (
    <section id="highlights" className="masonry-section">
      <div className="container">
        <h2 data-aos="fade-up">Highlights</h2>
        <p className="masonry-subtitle" data-aos="fade-up" data-aos-delay="100">
          Key achievements and areas of expertise across my career
        </p>
        <div className="masonry-grid">
          {masonryItems.map((item, index) => (
            <article
              key={item.id}
              className={`masonry-card masonry-card--${item.variant}`}
              data-aos="fade-up"
              data-aos-delay={160 + index * 60}
            >
              {item.metric && (
                <div className="masonry-metric">
                  <span className="masonry-metric-value">{item.metric}</span>
                  <span className="masonry-metric-label">{item.metricLabel}</span>
                </div>
              )}
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              {item.tags && (
                <ul className="masonry-tags">
                  {item.tags.map((tag, tagIndex) => (
                    <li
                      key={tag}
                      data-aos="zoom-in"
                      data-aos-delay={220 + index * 60 + tagIndex * 35}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Masonry
