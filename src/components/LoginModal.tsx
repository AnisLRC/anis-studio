import { useState, FormEvent } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUi } from '../providers/UiProvider'

interface LoginModalProps {
  language: 'hr' | 'en'
}

export default function LoginModal({ language }: LoginModalProps) {
  const { login, isLoading } = useAuth()
  const { modals, closeModal, openModal } = useUi()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isOpen = modals['login'] || false

  const translations = {
    title: {
      hr: 'Prijava',
      en: 'Login'
    },
    email: {
      hr: 'Email',
      en: 'Email'
    },
    password: {
      hr: 'Lozinka',
      en: 'Password'
    },
    submit: {
      hr: 'Prijavi se',
      en: 'Sign In'
    },
    cancel: {
      hr: 'Odustani',
      en: 'Cancel'
    },
    switchToRegister: {
      hr: 'Nemate račun? Registrirajte se',
      en: "Don't have an account? Sign up"
    },
    error: {
      hr: 'Pogrešan email ili lozinka',
      en: 'Invalid email or password'
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(formData.email, formData.password)
      closeModal('login')
      setFormData({ email: '', password: '' })
    } catch (err) {
      setError(translations.error[language])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSwitchToRegister = () => {
    closeModal('login')
    setTimeout(() => {
      openModal('register')
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[1060] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal('login')
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
        className="relative glass-morphism rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl"
        style={{ animation: 'fade-in-up 0.3s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={() => closeModal('login')}
          className="absolute top-4 right-4 p-2 text-[#5A4A6B] hover:text-[--color-primary] transition-colors rounded-lg hover:bg-[rgba(110,68,255,0.05)]"
          aria-label={language === 'hr' ? 'Zatvori' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
          {translations.title[language]}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block mb-2 text-sm font-semibold text-[#2E2447]">
              {translations.email[language]}
            </label>
            <input
              type="email"
              id="login-email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
              placeholder={translations.email[language]}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block mb-2 text-sm font-semibold text-[#2E2447]">
              {translations.password[language]}
            </label>
            <input
              type="password"
              id="login-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(110,68,255,0.2)] bg-white/90 focus:bg-white focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 transition-all duration-200 outline-none text-[#2E2447]"
              placeholder={translations.password[language]}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
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
              ? (language === 'hr' ? 'Prijavljivanje...' : 'Signing in...')
              : translations.submit[language]
            }
          </button>

          {/* Switch to register */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleSwitchToRegister}
              className="text-sm text-[#5A4A6B] hover:text-[--color-primary] transition-colors"
            >
              {translations.switchToRegister[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

