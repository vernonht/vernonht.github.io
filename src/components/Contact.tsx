import { useState, FormEvent, CSSProperties } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../hooks/useScrollFrame'

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { frame, fps, ref } = useScrollFrame({ totalFrames: 100 })

  // Title: fade up
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

  // Intro text: fade up (delay: 8)
  const introSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: springConfigs.smooth,
  })
  const introStyle: CSSProperties = {
    opacity: introSpring,
    transform: `translateY(${interpolate(introSpring, [0, 1], [40, 0])}px)`,
    willChange: 'transform, opacity',
  }

  // Get style for form fields with stagger (8 frames between fields)
  const getFieldStyle = (fieldIndex: number): CSSProperties => {
    const delay = 16 + fieldIndex * 8

    const fieldSpring = spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: springConfigs.smooth,
    })

    return {
      opacity: fieldSpring,
      transform: `translateY(${interpolate(fieldSpring, [0, 1], [30, 0])}px)`,
      willChange: 'transform, opacity',
    }
  }

  // Submit button: scale in (after all form fields)
  const buttonSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: springConfigs.snappy,
  })
  const buttonStyle: CSSProperties = {
    opacity: buttonSpring,
    transform: `scale(${interpolate(buttonSpring, [0, 1], [0.8, 1])})`,
    willChange: 'transform, opacity',
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <h2 style={titleStyle}>Get In Touch</h2>
        <p className="contact-intro" style={introStyle}>
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group" style={getFieldStyle(0)}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group" style={getFieldStyle(1)}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group" style={getFieldStyle(2)}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              disabled={status === 'loading'}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={buttonStyle}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="form-status success">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="form-status error">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
