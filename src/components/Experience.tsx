import { CSSProperties } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

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
  const { frame, fps, ref } = useScrollFrame({ totalFrames: 150 })

  // Section title: fade up
  const titleSpring = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  })
  const titleStyle: CSSProperties = {
    opacity: titleSpring,
    transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Get style for experience card with stagger (12 frames between cards)
  const getCardStyle = (cardIndex: number): CSSProperties => {
    const delay = 15 + cardIndex * 12

    const cardSpring = spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: springConfigs.snappy,
    })

    return {
      opacity: cardSpring,
      transform: `scale(${interpolate(cardSpring, [0, 1], [0.9, 1])}) translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
      willChange: 'transform, opacity',
    }
  }

  // Get style for highlight items with stagger
  const getHighlightStyle = (cardIndex: number, highlightIndex: number): CSSProperties => {
    const cardDelay = 15 + cardIndex * 12
    const highlightDelay = cardDelay + 10 + highlightIndex * 6

    const highlightSpring = spring({
      frame: Math.max(0, frame - highlightDelay),
      fps,
      config: springConfigs.smooth,
    })

    return {
      opacity: highlightSpring,
      transform: `translateX(${interpolate(highlightSpring, [0, 1], [-30, 0])}px)`,
      willChange: 'transform, opacity',
    }
  }

  // Get style for tech badges with micro-stagger
  const getTechBadgeStyle = (cardIndex: number, techIndex: number): CSSProperties => {
    const cardDelay = 15 + cardIndex * 12
    const techDelay = cardDelay + 25 + techIndex * 3

    const techSpring = spring({
      frame: Math.max(0, frame - techDelay),
      fps,
      config: springConfigs.snappy,
    })

    return {
      opacity: techSpring,
      transform: `scale(${interpolate(techSpring, [0, 1], [0.7, 1])})`,
      willChange: 'transform, opacity',
    }
  }

  return (
    <section id="experience" className="experience" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <h2 style={titleStyle}>Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp, cardIndex) => (
            <article key={exp.id} className="experience-card" style={getCardStyle(cardIndex)}>
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="period">{exp.period}</p>
              <ul className="highlights">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} style={getHighlightStyle(cardIndex, idx)}>{highlight}</li>
                ))}
              </ul>
              <ul className="tech-stack">
                {exp.tech.map((t, techIdx) => (
                  <li key={t} style={getTechBadgeStyle(cardIndex, techIdx)}>{t}</li>
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
