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
    <section id="contact" className="section">
      <div className="container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          Kontakt
        </h2>
        <p className="text-white/80 mb-6">Opiši ideju i javit ćemo se s prijedlogom i cijenom.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60"
            placeholder="Ime i prezime"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-white/60"
            placeholder="Poruka"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary" type="submit">Pošalji upit</button>
        </form>
      </div>
    </section>
  )
}

