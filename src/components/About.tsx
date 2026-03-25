function About() {
  const skillCategories = {
    Frontend: ['NuxtJs', 'VueJs', 'NextJs (React)', 'MiniApp (Alipay/TnGD)'],
    Backend: ['ExpressJs', 'NestJs', 'Laravel'],
    Others: ['MongoDB', 'Redis', 'Harness', 'Cypress', 'Playwright', 'Storybook'],
  }

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 data-aos="fade-right">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p data-aos="fade-right" data-aos-delay="100">
              I'm a Software Engineer at Morningstar, contributing to portfolio management platforms
              used by financial professionals. I specialize in building scalable frontend
              architectures and have experience across the full stack.
            </p>
            <p data-aos="fade-right" data-aos-delay="200">
              With a background in Information System Security from Asia Pacific University, I bring
              a security-conscious approach to development. I'm passionate about reducing technical
              debt, optimizing performance, and enabling teams to ship independently.
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
