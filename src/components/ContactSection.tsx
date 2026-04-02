import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { submitContactInquiry } from '../lib/contactInquiries'

interface ContactSectionProps {
  language: 'hr' | 'en'
}

export default function ContactSection({ language }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (e: FormEvent) => {
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
    
    setIsSubmitting(true)

    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        language: language
      })

      // Show success toast
      toast.success(
        language === 'hr' 
          ? '✨ Hvala vam! Vaša poruka je poslana.'
          : '✨ Thank you! Your message has been sent.',
        { duration: 4000 }
      )
      
      // Reset form immediately
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      // Show error toast with specific message
      let errorMsg = language === 'hr' 
        ? 'Greška pri slanju poruke. Molimo pokušajte ponovno.'
        : 'Error sending message. Please try again.'
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('permission') || error.message.includes('policy')) {
          errorMsg = language === 'hr'
            ? 'Greška dozvola. Kontaktirajte administratora.'
            : 'Permission error. Please contact administrator.'
        } else if (error.message.includes('fetch') || error.message.includes('network')) {
          errorMsg = language === 'hr'
            ? 'Greška mreže. Provjerite internet konekciju.'
            : 'Network error. Check your internet connection.'
        }
      }
      
      toast.error(errorMsg, { duration: 5000 })
      console.error('Error submitting contact inquiry:', error)
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <section id="contact" className="Section fade-in scroll-mt-[72px]">
      <div className="mx-auto min-w-0 max-w-3xl px-4 pb-12 pt-7 sm:px-6 sm:pb-14 sm:pt-9 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-10">
          <h2 className="mb-3.5 font-heading text-2xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:mb-4 sm:text-3xl">
            {translations.title[language]}
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-plum/78 dark:text-pearl/75 sm:text-[1.0625rem]">
            {translations.subtitle[language]}
          </p>
        </div>

        <div className="fade-in rounded-3xl border border-[rgba(110,68,255,0.14)] bg-white/85 p-6 shadow-[0_8px_40px_rgba(46,36,71,0.06)] ring-1 ring-[rgba(110,68,255,0.06)] backdrop-blur-sm dark:border-lavender/18 dark:bg-white/[0.07] dark:shadow-[0_12px_48px_rgba(0,0,0,0.2)] dark:ring-lavender/10 sm:p-8 md:p-9">
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 sm:space-y-7">
            <div
              style={{ 
                animationDelay: '0.1s',
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <label 
                htmlFor="name" 
                className="mb-2 block text-sm font-semibold text-plum/90 dark:text-pearl"
              >
                {translations.name[language]}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-all duration-200 placeholder:text-plum/60 focus:ring-2 focus:ring-[--color-primary]/20 dark:bg-white/10 dark:text-pearl dark:placeholder:text-pearl/50 dark:focus:bg-white/15 ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] dark:border-lavender/20 focus:border-[--color-primary]'
                }`}
                placeholder={translations.name[language]}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">
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
                className="mb-2 block text-sm font-semibold text-plum/90 dark:text-pearl"
              >
                {translations.email[language]}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-all duration-200 placeholder:text-plum/60 focus:ring-2 focus:ring-[--color-primary]/20 dark:bg-white/10 dark:text-pearl dark:placeholder:text-pearl/50 dark:focus:bg-white/15 ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] dark:border-lavender/20 focus:border-[--color-primary]'
                }`}
                placeholder={translations.email[language]}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
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
                className="mb-2 block text-sm font-semibold text-plum/90 dark:text-pearl"
              >
                {translations.message[language]}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`min-h-[120px] w-full resize-y rounded-xl border bg-white px-4 py-3 text-base outline-none transition-all duration-200 placeholder:text-plum/60 focus:ring-2 focus:ring-[--color-primary]/20 dark:bg-white/10 dark:text-pearl dark:placeholder:text-pearl/50 dark:focus:bg-white/15 ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[rgba(110,68,255,0.2)] dark:border-lavender/20 focus:border-[--color-primary]'
                }`}
                placeholder={translations.message[language]}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="pt-2 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary min-h-[48px] w-full max-w-xs px-8 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-12 sm:py-4"
                style={{ letterSpacing: '0.02em' }}
              >
                {isSubmitting 
                  ? (language === 'hr' ? 'Šaljem...' : 'Sending...') 
                  : translations.send[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}