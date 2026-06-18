import { useState, useEffect, useCallback } from 'react'
import useSectionAnalytics from '../hooks/useSectionAnalytics'

interface Project {
  id: number
  title: string
  description: string
  imageUrl?: string
  screenshots?: string[]
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
    screenshots: [
      '/images/screenshots/oviato/oviato screenshot 1.png',
      '/images/screenshots/oviato/oviato screenshot 2.png',
      '/images/screenshots/oviato/oviato screenshot 3.png',
      '/images/screenshots/oviato/oviato screenshot 4.png',
      '/images/screenshots/oviato/oviato screenshot 5.png',
    ],
  },
  {
    id: 2,
    title: 'JurifytePro',
    description:
      'CMS platform that empowers firm legal service / conveyancing operations, business expansion, management & internal controls.',
    imageUrl: '/images/external-logo/jurifytepro.webp',
    link: 'https://jurifytepro.com/',
    tech: ['Next.js', 'Context API', 'MongoDB', 'TailwindCSS', 'Antd'],
    screenshots: [
      '/images/screenshots/jurifytepro/jurifytepro screenshot 1.png',
      '/images/screenshots/jurifytepro/jurifytepro screenshot 2.png',
      '/images/screenshots/jurifytepro/jurifytepro screenshot 3.png',
      '/images/screenshots/jurifytepro/jurifytepro screenshot 4.png',
    ],
  },
  {
    id: 3,
    title: 'Cerah Future',
    description:
      'CMS platform that digitalizes higher education service, tracks student records, and automates the admission process.',
    imageUrl: '/images/external-logo/Cerah-Future.jpg',
    // link: 'https://cerahfuture.com',
    tech: ['Laravel 8+', 'Vue', 'MySQL', 'Inertia.js'],
    screenshots: [
      '/images/screenshots/cerah-future/cf screenshot 1.png',
      '/images/screenshots/cerah-future/cf screenshot 2.png',
      '/images/screenshots/cerah-future/cf screenshot 3.png',
      '/images/screenshots/cerah-future/cf screenshot 4.png',
    ],
  },
  {
    id: 4,
    title: 'Agridata',
    description:
      'Platform that helps farmers manage their agricultural operations, monitor crops, and build credit scores to get loans.',
    imageUrl: '/images/external-logo/Agridata.svg',
    tech: ['NestJs', 'PostgreSQL'],
  },
]

function Projects() {
  useSectionAnalytics({
    sectionName: 'Projects',
    sectionId: 'projects',
  })

  const [modal, setModal] = useState<{ screenshots: string[]; index: number } | null>(null)

  const closeModal = useCallback(() => setModal(null), [])

  const prev = useCallback(() => {
    setModal((m) => m && { ...m, index: (m.index - 1 + m.screenshots.length) % m.screenshots.length })
  }, [])

  const next = useCallback(() => {
    setModal((m) => m && { ...m, index: (m.index + 1) % m.screenshots.length })
  }, [])

  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal, closeModal, prev, next])

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 data-aos="fade-up">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, cardIndex) => (
            <article
              key={project.id}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={150 + cardIndex * 100}
            >
              {project.imageUrl && (
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="tech-stack">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <button
                      className="project-link screenshot-btn"
                      onClick={() => setModal({ screenshots: project.screenshots!, index: 0 })}
                    >
                      Screenshots <i className="fas fa-images"></i>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modal && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeModal} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
            <img src={modal.screenshots[modal.index]} alt={`Screenshot ${modal.index + 1}`} />
            {modal.screenshots.length > 1 && (
              <>
                <button className="image-modal-nav image-modal-prev" onClick={prev} aria-label="Previous">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="image-modal-nav image-modal-next" onClick={next} aria-label="Next">
                  <i className="fas fa-chevron-right"></i>
                </button>
                <span className="image-modal-counter">
                  {modal.index + 1} / {modal.screenshots.length}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
