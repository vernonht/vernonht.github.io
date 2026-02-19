import { CSSProperties } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

interface Project {
  id: number
  title: string
  description: string
  imageUrl?: string
  link?: string
  tech: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Oviato',
    description: 'Passkey-Native Wallet Infrastructure Built for Social Distribution',
    imageUrl: '/images/external-logo/oviato.jpg',
    link: 'https://oviato.com/',
    tech: ['Next.js', 'React / Vite', 'Zustand', 'TailwindCSS', 'Shadcn/ui'],
  },
  {
    id: 2,
    title: 'JurifytePro',
    description: 'CMS platform that empowers firm legal service / conveyancing operations, business expansion, management & internal controls.',
    imageUrl: '/images/external-logo/jurifytepro.webp',
    link: 'https://jurifytepro.com/',
    tech: ['Next.js', 'Context API', 'MongoDB', 'TailwindCSS', 'Antd'],
  },
  {
    id: 3,
    title: 'Cerah Future',
    description: 'CMS platform that digitalizes higher education service, tracks student records, and automates the admission process.',
    imageUrl: '/images/external-logo/Cerah-Future.jpg',
    // link: 'https://cerahfuture.com',
    tech: ['Laravel 8+', 'Vue', 'MySQL', 'Inertia.js'],
  },
  {
    id: 4,
    title: 'Agridata',
    description: 'Platform that helps farmers manage their agricultural operations, monitor crops, and build credit scores to get loans.',
    imageUrl: '/images/external-logo/Agridata.svg',
    tech: ['NestJs', 'PostgreSQL'],
  },
]

function Projects() {
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

  // Get style for project card with stagger
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

  // Get style for tech badges with micro-stagger
  const getTechBadgeStyle = (cardIndex: number, techIndex: number): CSSProperties => {
    const cardDelay = 15 + cardIndex * 12
    const techDelay = cardDelay + 20 + techIndex * 3

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
    <section id="projects" className="projects-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <h2 style={titleStyle}>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, cardIndex) => (
            <article key={project.id} className="project-card" style={getCardStyle(cardIndex)}>
              {project.imageUrl && (
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="tech-stack">
                  {project.tech.map((t, techIdx) => (
                    <li key={t} style={getTechBadgeStyle(cardIndex, techIdx)}>{t}</li>
                  ))}
                </ul>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
