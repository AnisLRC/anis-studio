import { useState, type FormEvent } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUi } from '../providers/UiProvider'

interface RegisterModalProps {
  language: 'hr' | 'en'
}

export default function RegisterModal({ language }: RegisterModalProps) {
  const { register, isLoading } = useAuth()
  const { modals, closeModal, openModal } = useUi()
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isOpen = modals['register'] || false

  const translations = {
    title: {
      hr: 'Registracija',
      en: 'Sign Up'
    },
    name: {
      hr: 'Ime',
      en: 'Name'
    },
    email: {
      hr: 'Email',
      en: 'Email'
    },
    password: {
      hr: 'Lozinka',
      en: 'Password'
    },
    confirmPassword: {
      hr: 'Potvrdi lozinku',
      en: 'Confirm Password'
    },
    submit: {
      hr: 'Registriraj se',
      en: 'Sign Up'
    },
    cancel: {
      hr: 'Odustani',
      en: 'Cancel'
    },
    switchToLogin: {
      hr: 'Već imate račun? Prijavite se',
      en: 'Already have an account? Sign in'
    },
    errors: {
      passwordMismatch: {
        hr: 'Lozinke se ne podudaraju',
        en: 'Passwords do not match'
      },
      invalidEmail: {
        hr: 'Molimo unesite validan email',
        en: 'Please enter a valid email'
      },
      passwordTooShort: {
        hr: 'Lozinka mora imati najmanje 6 znakova',
        en: 'Password must be at least 6 characters'
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validacija
    if (formData.password !== formData.confirmPassword) {
      setError(translations.errors.passwordMismatch[language])
      return
    }

    if (formData.password.length < 6) {
      setError(translations.errors.passwordTooShort[language])
      return
    }

    if (!formData.email.includes('@')) {
      setError(translations.errors.invalidEmail[language])
      return
    }

    setIsSubmitting(true)

    try {
      await register(formData.name, formData.email, formData.password)
      closeModal('register')
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    } catch (err) {
      setError(language === 'hr' ? 'Greška pri registraciji' : 'Registration error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSwitchToLogin = () => {
    closeModal('register')
    setTimeout(() => {
      openModal('login')
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[1060] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal('register')
        }
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ animation: 'fade-in 0.2s ease-out' }}
      />

      {/* Modal */}
      <div 
        className="relative glass-morphism rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
        style={{ animation: 'fade-in-up 0.3s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={() => closeModal('register')}
          className="absolute top-4 right-4 p-2 text-plum/80 dark:text-pearl/70 hover:text-[--color-primary] transition-colors rounded-lg hover:bg-[rgba(110,68,255,0.05)] dark:hover:bg-[rgba(189,166,255,0.15)]"
          aria-label={language === 'hr' ? 'Zatvori' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-plum/90 dark:text-pearl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {translations.title[language]}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="register-name" className="block mb-2 text-sm font-semibold text-plum/90 dark:text-pearl">
              {translations.name[language]}
            </label>
            <input
              type="text"
              id="register-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] dark:border-lavender/20 dark:border-lavender/20 bg-white/90 dark:bg-white/10 dark:bg-white/10 focus:bg-white dark:focus:bg-white/15 dark:focus:bg-white dark:focus:bg-white/15/15 focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-plum/90 dark:text-pearl placeholder:text-plum/60 dark:placeholder:text-pearl/50"
              placeholder={translations.name[language]}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="register-email" className="block mb-2 text-sm font-semibold text-plum/90 dark:text-pearl">
              {translations.email[language]}
            </label>
            <input
              type="email"
              id="register-email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] dark:border-lavender/20 bg-white/90 dark:bg-white/10 focus:bg-white dark:focus:bg-white/15 focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-plum/90 dark:text-pearl"
              placeholder={translations.email[language]}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="register-password" className="block mb-2 text-sm font-semibold text-plum/90 dark:text-pearl">
              {translations.password[language]}
            </label>
            <input
              type="password"
              id="register-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] dark:border-lavender/20 bg-white/90 dark:bg-white/10 focus:bg-white dark:focus:bg-white/15 focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-plum/90 dark:text-pearl"
              placeholder={translations.password[language]}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="register-confirm-password" className="block mb-2 text-sm font-semibold text-plum/90 dark:text-pearl">
              {translations.confirmPassword[language]}
            </label>
            <input
              type="password"
              id="register-confirm-password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] dark:border-lavender/20 bg-white/90 dark:bg-white/10 focus:bg-white dark:focus:bg-white/15 focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-plum/90 dark:text-pearl"
              placeholder={translations.confirmPassword[language]}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading 
              ? (language === 'hr' ? 'Registriranje...' : 'Signing up...')
              : translations.submit[language]
            }
          </button>

          {/* Switch to login */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="text-sm text-plum/80 dark:text-pearl/70 hover:text-[--color-primary] transition-colors"
            >
              {translations.switchToLogin[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

