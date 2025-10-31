import { useState, type FormEvent } from 'react'

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
      <section id="contact" className="Section fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-[rgba(189,166,255,0.15)] to-[rgba(110,68,255,0.1)] border border-[rgba(110,68,255,0.2)] shadow-lg">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              {translations.successTitle[language]}
            </h2>
            <p className="text-lg text-[#5A4A6B]">
              {translations.successMessage[language]}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="Section fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-lg text-[#5A4A6B]">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="rounded-2xl p-8 sm:p-10 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block mb-2 text-sm font-semibold text-[#2E2447]"
              >
                {translations.name[language]}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                placeholder={translations.name[language]}
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm font-semibold text-[#2E2447]"
              >
                {translations.email[language]}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
                placeholder={translations.email[language]}
              />
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block mb-2 text-sm font-semibold text-[#2E2447]"
              >
                {translations.message[language]}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none resize-vertical text-[#2E2447]"
                placeholder={translations.message[language]}
              />
            </div>

            <div className="text-center pt-2">
              <button 
                type="submit" 
                className="btn btn-primary w-full sm:w-auto min-w-[200px]"
              >
                {translations.send[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}