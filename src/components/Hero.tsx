import { useState } from 'react'
import { calculateYearsOfExperience } from '../utils/helpers'

function Hero() {
  // Calculate years of experience from May 2017
  const [yearsOfExperience] = useState(() => calculateYearsOfExperience(2017, 5))

  return (
    <section className="hero">
      <div className="container">
        <h1 data-aos="fade-up" data-aos-delay="700">
          Hi, I'm <span className="highlight">Jian Hao</span>
        </h1>
        <p className="subtitle" data-aos="fade-up" data-aos-delay="900">
          Software Engineer
        </p>
        <p className="description" data-aos="fade-up" data-aos-delay="1100">
          Full stack developer with {yearsOfExperience}+ years of experience building scalable web
          applications, from micro-frontend architectures to MiniApp ecosystems.
        </p>
        <div className="cta-buttons">
          <a
            href="#experience"
            className="btn btn-primary"
            data-aos="fade-up"
            data-aos-delay="1300"
          >
            View Experience
          </a>
          {/* <a href="#contact" className="btn btn-secondary" data-aos="fade-up" data-aos-delay="1500">Get In Touch</a> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
