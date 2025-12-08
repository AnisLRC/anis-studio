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
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})

  const translations = {
    title: {
      hr: "📧 Kontaktirajte me",
      en: "📧 Contact Me"
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
    },
    errors: {
      nameRequired: {
        hr: "Ime je obavezno",
        en: "Name is required"
      },
      nameMinLength: {
        hr: "Ime mora imati najmanje 2 znaka",
        en: "Name must be at least 2 characters"
      },
      emailRequired: {
        hr: "Email je obavezan",
        en: "Email is required"
      },
      emailInvalid: {
        hr: "Molimo unesite valjanu email adresu",
        en: "Please enter a valid email address"
      },
      messageRequired: {
        hr: "Poruka je obavezna",
        en: "Message is required"
      },
      messageMinLength: {
        hr: "Poruka mora imati najmanje 10 znakova",
        en: "Message must be at least 10 characters"
      }
    }
  }

  const validateForm = (): { isValid: boolean; errors: typeof errors; firstErrorField: string | null } => {
    const newErrors: {
      name?: string
      email?: string
      message?: string
    } = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = translations.errors.nameRequired[language]
    } else if (formData.name.trim().length < 2) {
      newErrors.name = translations.errors.nameMinLength[language]
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = translations.errors.emailRequired[language]
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = translations.errors.emailInvalid[language]
      }
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = translations.errors.messageRequired[language]
    } else if (formData.message.trim().length < 10) {
      newErrors.message = translations.errors.messageMinLength[language]
    }

    const firstErrorField = Object.keys(newErrors)[0] || null
    
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
      firstErrorField
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validation = validateForm()
    setErrors(validation.errors)
    
    if (!validation.isValid) {
      // Focus first error field
      if (validation.firstErrorField) {
        setTimeout(() => {
          const field = document.getElementById(validation.firstErrorField!)
          if (field) {
            field.focus()
            field.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
      return
    }
    
    // Demo alert - u production bi ovdje bio API poziv
    setIsSubmitted(true)
    setErrors({})
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name as keyof typeof formData
    setFormData(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }))
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }))
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="Section fade-in">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
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
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            {translations.title[language]}
          </h2>
          <p className="text-base text-[#5A4A6B]">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="rounded-2xl p-5 sm:p-8 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              style={{ 
                animationDelay: '0.1s',
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <label 
                htmlFor="name" 
                className="block mb-1.5 text-sm font-medium text-[#2E2447]"
              >
                {translations.name[language]}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 text-sm rounded-xl border bg-white focus:bg-white focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] focus:border-[--color-primary]'
                }`}
                placeholder={translations.name[language]}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div
              style={{ 
                animationDelay: '0.2s',
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <label 
                htmlFor="email" 
                className="block mb-1.5 text-sm font-medium text-[#2E2447]"
              >
                {translations.email[language]}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 text-sm rounded-xl border bg-white focus:bg-white focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447] ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] focus:border-[--color-primary]'
                }`}
                placeholder={translations.email[language]}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div
              style={{ 
                animationDelay: '0.3s',
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <label 
                htmlFor="message" 
                className="block mb-1.5 text-sm font-medium text-[#2E2447]"
              >
                {translations.message[language]}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2.5 text-sm rounded-xl border bg-white focus:bg-white focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none resize-none text-[#2E2447] ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] focus:border-[--color-primary]'
                }`}
                placeholder={translations.message[language]}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="text-center pt-2">
              <button 
                type="submit" 
                className="btn btn-primary px-12 py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                style={{ letterSpacing: '0.02em' }}
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