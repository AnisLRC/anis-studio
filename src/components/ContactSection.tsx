import { useState } from 'react'

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
      hr: "Kontaktirajte nas",
      en: "Contact Us"
    },
    subtitle: {
      hr: "Imate pitanje ili želite započeti projekt? Javite nam se!",
      en: "Have a question or want to start a project? Let us know!"
    },
    nameLabel: {
      hr: "Ime",
      en: "Name"
    },
    emailLabel: {
      hr: "Email",
      en: "Email"
    },
    messageLabel: {
      hr: "Poruka",
      en: "Message"
    },
    namePlaceholder: {
      hr: "Vaše ime",
      en: "Your name"
    },
    emailPlaceholder: {
      hr: "vas.email@primjer.com",
      en: "your.email@example.com"
    },
    messagePlaceholder: {
      hr: "Opišite svoj projekt ili pitanje...",
      en: "Describe your project or question..."
    },
    submitButton: {
      hr: "Pošalji poruku",
      en: "Send Message"
    },
    successMessage: {
      hr: "Hvala! Vaša poruka je poslana. Javit ćemo vam se uskoro.",
      en: "Thank you! Your message has been sent. We'll get back to you soon."
    },
    contactInfo: {
      hr: {
        email: "Email: ani@anisstudio.com",
        location: "Lokacija: Županja, Hrvatska",
        hours: "Radno vrijeme: Pon-Pet, 9:00-17:00"
      },
      en: {
        email: "Email: ani@anisstudio.com",
        location: "Location: Županja, Croatia",
        hours: "Working hours: Mon-Fri, 9:00-17:00"
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Demo: Just show success message
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2>{translations.title[language]}</h2>
          <p className="section-subtitle">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="glass-panel" style={{ padding: 'var(--space-xl)', maxWidth: '800px', margin: '0 auto' }}>
            {isSubmitted ? (
              <div className="text-center" style={{ padding: 'var(--space-3xl)' }}>
                <div style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-lg)' }}>
                  ✓
                </div>
                <p style={{ 
                  fontSize: 'var(--text-lg)', 
                  color: 'var(--clr-primary)',
                  fontWeight: '600'
                }}>
                  {translations.successMessage[language]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{translations.nameLabel[language]}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={translations.namePlaceholder[language]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{translations.emailLabel[language]}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={translations.emailPlaceholder[language]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{translations.messageLabel[language]}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={translations.messagePlaceholder[language]}
                    rows={6}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    {translations.submitButton[language]}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info-grid">
            <div className="glass-panel text-center" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>
                📧
              </div>
              <p style={{ color: 'var(--clr-text-light)', fontSize: 'var(--text-sm)' }}>
                {translations.contactInfo[language].email}
              </p>
            </div>

            <div className="glass-panel text-center" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>
                📍
              </div>
              <p style={{ color: 'var(--clr-text-light)', fontSize: 'var(--text-sm)' }}>
                {translations.contactInfo[language].location}
              </p>
            </div>

            <div className="glass-panel text-center" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>
                🕐
              </div>
              <p style={{ color: 'var(--clr-text-light)', fontSize: 'var(--text-sm)' }}>
                {translations.contactInfo[language].hours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

