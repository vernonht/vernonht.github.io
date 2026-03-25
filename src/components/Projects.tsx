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
              data-aos-delay={150 + (cardIndex * 100)}
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
                  {project.tech.map((t, techIdx) => (
                    <li
                      key={t}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
