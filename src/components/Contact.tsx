import { useState, FormEvent } from 'react'

const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
    <section id="contact" className="contact">
      <div className="container">
        <h2 data-aos="fade-up">Get In Touch</h2>
        <p className="contact-intro" data-aos="fade-up" data-aos-delay="100">
          I'm currently open to new opportunities. Whether you have a question or just want to say
          hi, I'll do my best to get back to you!
        </p>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="form-group" data-aos="fade-up" data-aos-delay="180">
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
          <div className="form-group" data-aos="fade-up" data-aos-delay="240">
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
          <div className="form-group" data-aos="fade-up" data-aos-delay="300">
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'loading'}
            data-aos="zoom-in"
            data-aos-delay="380"
          >
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
