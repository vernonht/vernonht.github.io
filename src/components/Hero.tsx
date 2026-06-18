import { useState } from 'react'
import { calculateYearsOfExperience } from '../utils/helpers'
import TriangleCanvas from './animated/TriangleCanvas'
import useSectionAnalytics from '../hooks/useSectionAnalytics'

function Hero() {
  // Calculate years of experience from May 2017
  const [yearsOfExperience] = useState(() => calculateYearsOfExperience(2017, 5))
  useSectionAnalytics({
    sectionName: 'Hero',
    sectionId: 'hero',
  })

  return (
    <section id="hero" className="hero">
      <TriangleCanvas />
      <div className="container">
        <h1 data-aos="fade-up" data-aos-delay="700">
          Hi, I'm <span className="highlight">Jian Hao</span>
        </h1>
        <p className="subtitle" data-aos="fade-up" data-aos-delay="900">
          Software Engineer
        </p>
        <p className="description" data-aos="fade-up" data-aos-delay="1100">
          Full stack developer with {yearsOfExperience}+ years of experience building scalable web
          applications, from micro-frontend systems to production-grade backend infrastructure and
          CI/CD optimization.
        </p>
        <div className="cta-buttons">
          <a href="#about" className="btn btn-primary" data-aos="fade-up" data-aos-delay="1300">
            My Experience
          </a>
          {/* <a href="#contact" className="btn btn-secondary" data-aos="fade-up" data-aos-delay="1500">Get In Touch</a> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
