import { CSSProperties } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

function About() {
  const skillCategories = {
    Frontend: ['NuxtJs', 'VueJs', 'NextJs (React)', 'MiniApp (Alipay/TnGD)'],
    Backend: ['ExpressJs', 'NestJs', 'Laravel'],
    Others: ['MongoDB', 'Redis', 'Harness', 'Cypress', 'Playwright', 'Storybook'],
  }

  const { frame, fps, ref } = useScrollFrame({ totalFrames: 120 })

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

  // First paragraph: slide in from left (delay: 10)
  const p1Spring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: springConfigs.smooth,
  })
  const p1Style: CSSProperties = {
    opacity: p1Spring,
    transform: `translateX(${interpolate(p1Spring, [0, 1], [-60, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Second paragraph: slide in from left (delay: 18)
  const p2Spring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: springConfigs.smooth,
  })
  const p2Style: CSSProperties = {
    opacity: p2Spring,
    transform: `translateX(${interpolate(p2Spring, [0, 1], [-60, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Skills section: slide in from right (delay: 15)
  const skillsSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: springConfigs.smooth,
  })
  const skillsSectionStyle: CSSProperties = {
    opacity: skillsSpring,
    transform: `translateX(${interpolate(skillsSpring, [0, 1], [60, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Get style for skill badge with stagger
  const getSkillBadgeStyle = (categoryIndex: number, skillIndex: number): CSSProperties => {
    const baseDelay = 25 + categoryIndex * 15
    const staggerDelay = skillIndex * 4
    const totalDelay = baseDelay + staggerDelay

    const badgeSpring = spring({
      frame: Math.max(0, frame - totalDelay),
      fps,
      config: springConfigs.snappy,
    })

    return {
      opacity: badgeSpring,
      transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
      willChange: 'transform, opacity',
    }
  }

  // Get style for category header
  const getCategoryStyle = (categoryIndex: number): CSSProperties => {
    const delay = 20 + categoryIndex * 15

    const catSpring = spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: springConfigs.smooth,
    })

    return {
      opacity: catSpring,
      transform: `translateY(${interpolate(catSpring, [0, 1], [20, 0])}px)`,
      willChange: 'transform, opacity',
    }
  }

  return (
    <section id="about" className="about" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <h2 style={titleStyle}>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p style={p1Style}>
              I'm a Software Engineer at Morningstar, contributing to portfolio management
              platforms used by financial professionals. I specialize in building scalable
              frontend architectures and have experience across the full stack.
            </p>
            <p style={p2Style}>
              With a background in Information System Security from Asia Pacific University,
              I bring a security-conscious approach to development. I'm passionate about
              reducing technical debt, optimizing performance, and enabling teams to ship independently.
            </p>
          </div>
          <div className="skills" style={skillsSectionStyle}>
            <h3>Skills</h3>
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <div key={category} className="skill-category">
                <h4 style={getCategoryStyle(categoryIndex)}>{category}</h4>
                <ul className="skills-list">
                  {skills.map((skill, skillIndex) => (
                    <li key={skill} style={getSkillBadgeStyle(categoryIndex, skillIndex)}>{skill}</li>
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
