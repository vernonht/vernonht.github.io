import { CSSProperties, useState } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../hooks/useScrollFrame'
import { calculateYearsOfExperience } from '../utils/helpers'

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

function Hero() {
  const { frame, fps, ref } = useScrollFrame({ totalFrames: 90 })

  // Calculate years of experience from May 2017
  const [yearsOfExperience] = useState(() => calculateYearsOfExperience(2017, 5))

  // Title: fade up with snappy spring (delay: 0)
  const titleSpring = spring({
    frame,
    fps,
    config: springConfigs.snappy,
  })
  const titleStyle: CSSProperties = {
    opacity: titleSpring,
    transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Subtitle: fade up (delay: 10 frames)
  const subtitleSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: springConfigs.smooth,
  })
  const subtitleStyle: CSSProperties = {
    opacity: subtitleSpring,
    transform: `translateY(${interpolate(subtitleSpring, [0, 1], [40, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Description: fade up (delay: 20 frames)
  const descSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: springConfigs.smooth,
  })
  const descStyle: CSSProperties = {
    opacity: descSpring,
    transform: `translateY(${interpolate(descSpring, [0, 1], [40, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // CTA button 1: slide in from left (delay: 30 frames)
  const btn1Spring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: springConfigs.snappy,
  })
  const btn1Style: CSSProperties = {
    opacity: btn1Spring,
    transform: `translateX(${interpolate(btn1Spring, [0, 1], [-60, 0])}px)`,
    willChange: 'transform, opacity',
  }

  return (
    <section className="hero" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <h1 style={titleStyle}>Hi, I'm <span className="highlight">Jian Hao</span></h1>
        <p className="subtitle" style={subtitleStyle}>Software Engineer</p>
        <p className="description" style={descStyle}>
          Full stack developer with {yearsOfExperience}+ years of experience building scalable web applications,
          from micro-frontend architectures to MiniApp ecosystems.
        </p>
        <div className="cta-buttons">
          <a href="#experience" className="btn btn-primary" style={btn1Style}>View Experience</a>
          {/* <a href="#contact" className="btn btn-secondary" style={btn2Style}>Get In Touch</a> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
