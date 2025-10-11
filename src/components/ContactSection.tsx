import { useState, FormEvent } from 'react'

interface ContactSectionProps {
  language: 'hr' | 'en'
}

export default function ContactSection({ language }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translations = {
    title: {
      hr: "Kontaktirajte me",
      en: "Contact Me"
    },
    subtitle: {
      hr: "Imate pitanje ili želite započeti projekt? Javite mi se!",
      en: "Have a question or want to start a project? Get in touch!"
    },
    name: {
      hr: "Ime",
      en: "Name"
    },
    email: {
      hr: "Email",
      en: "Email"
    },
    message: {
      hr: "Poruka",
      en: "Message"
    },
    send: {
      hr: "Pošalji poruku",
      en: "Send Message"
    },
    successTitle: {
      hr: "Hvala vam!",
      en: "Thank you!"
    },
    successMessage: {
      hr: "Vaša poruka je poslana. Javit ću vam se uskoro!",
      en: "Your message has been sent. I'll get back to you soon!"
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Demo alert - u production bi ovdje bio API poziv
    console.log('Form submitted:', formData)
    
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <section className="section">
        <div className="container">
          <div className="glass-panel text-center" style={{ padding: 'var(--space-3xl)', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--clr-primary)', marginBottom: 'var(--space-lg)' }}>
              {translations.successTitle[language]}
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--clr-text-light)' }}>
              {translations.successMessage[language]}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-center">{translations.title[language]}</h2>
          <p className="section-subtitle text-center">{translations.subtitle[language]}</p>
        </div>

        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-xl)' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                {translations.name[language]}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(110, 68, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-body)',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                {translations.email[language]}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(110, 68, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-body)',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                {translations.message[language]}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(110, 68, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-body)',
                  resize: 'vertical',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                {translations.send[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

