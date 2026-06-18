import { useState } from 'react'
import useSectionAnalytics from '../hooks/useSectionAnalytics'
import { calculateYearsOfExperience } from '../utils/helpers'

function About() {
  useSectionAnalytics({
    sectionName: 'About',
    sectionId: 'about',
  })

  const [yearsOfExperience] = useState(() => calculateYearsOfExperience(2017, 5))

  const skillCategories = {
    Frontend: [
      'Vue.js',
      'Nuxt.js',
      'React',
      'Next.js',
      'TypeScript',
      'Storybook',
      'Webpack Module Federation (Micro Frontend)',
    ],
    Backend: ['Node.js (NestJS, ExpressJS)', 'Laravel', 'REST APIs', 'GraphQL'],
    'CI/CD': ['Harness', 'GitHub Actions', 'AWS Amplify', 'GCP cloudbuild'],
    'Data & Storage': ['PostgresDB', 'MongoDB', 'Redis', 'MySQL'],
    Testing: ['Playwright', 'Cypress', 'E2E Testing', 'Test Automation'],
    'CMS & Platform Engineering': ['Storyblok', 'Localization Platforms'],
  }

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 data-aos="fade-right">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p data-aos="fade-right" data-aos-delay="100">
              Senior Software Engineer with {yearsOfExperience}+ years of experience building
              scalable web applications, internal platforms, and developer tooling across fintech,
              mobility, and digital media industries.
            </p>
            <p data-aos="fade-right" data-aos-delay="200">
              Specialized in Vue.js, Nuxt.js, and modern frontend architecture, with hands-on
              experience spanning full-stack development, micro-frontend systems, CMS platforms, and
              performance optimization.
            </p>
            <p data-aos="fade-right" data-aos-delay="300">
              Experienced in designing and delivering customer-facing applications using React and
              Next.js, alongside building scalable solutions with Vue.js and Nuxt.js across
              enterprise and startup environments.{' '}
            </p>
            <p data-aos="fade-right" data-aos-delay="400">
              Proven track record of reducing operational costs, improving engineering productivity,
              leading large-scale migrations, and enabling cross-functional teams to ship faster
              through scalable platform solutions.
            </p>
          </div>
          <div className="skills">
            <h3 data-aos="fade-up" data-aos-delay="100">
              Skills
            </h3>
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <div key={category} className="skill-category">
                <h4 data-aos="fade-up">{category}</h4>
                <ul className="skills-list">
                  {skills.map((skill, skillIndex) => (
                    <li
                      key={skill}
                      data-aos="fade-up"
                      data-aos-delay={300 + categoryIndex * 100 + skillIndex * 50}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
