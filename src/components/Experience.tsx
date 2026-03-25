interface ExperienceItem {
  id: number
  title: string
  company: string
  period: string
  highlights: string[]
  tech: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Morningstar',
    period: 'Nov 2024 - Present',
    highlights: [
      'Contributing to portfolio management platforms used by financial professionals',
      'Supporting large-scale Vue.js migration, improving maintainability and scalability',
      'Working within micro-frontend architecture using Webpack MFE',
    ],
    tech: ['NuxtJs', 'Webpack MFE', 'Storybook', 'Playwright'],
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Mindvalley',
    period: 'Aug 2022 - Oct 2024',
    highlights: [
      'Developed custom Storyblok CMS components enabling 7 teams to ship independently',
      'Refactored API service layers, cutting API requests by 70% and traffic by 50%',
      'Actively reduced technical debt through code reviews and refactoring initiatives',
    ],
    tech: ['NuxtJs', 'VueJs', 'Storyblok'],
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'SOCAR Malaysia',
    period: 'Mar 2019 - May 2022',
    highlights: [
      'Built internal operations admin panel streamlining daily workflows',
      'Implemented localization platform using NestJS for multi-language support',
      'Delivered features across web, backend, and MiniApp ecosystems',
    ],
    tech: ['NuxtJs', 'VueJs', 'Laravel', 'ExpressJs', 'NestJs', 'MiniApp'],
  },
  {
    id: 4,
    title: 'Senior Software Engineer',
    company: 'Jobstore Group Berhad',
    period: 'May 2017 - Feb 2019',
    highlights: [
      'Developed web applications using Vue.js and modern JavaScript',
      'Built RESTful APIs with Laravel',
      'Worked with component libraries including Bootstrap 4 & Element-UI',
    ],
    tech: ['VueJs', 'Laravel', 'jQuery', 'Bootstrap', 'Element-UI'],
  },
]

function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 data-aos="fade-up">Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp, cardIndex) => (
            <article
              key={exp.id}
              className="experience-card"
              data-aos="fade-up"
              data-aos-delay={150 + (cardIndex * 100)}
            >
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <ul className="highlights">
                {exp.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <ul className="tech-stack">
                {exp.tech.map((t, techIdx) => (
                  <li
                    key={t}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
