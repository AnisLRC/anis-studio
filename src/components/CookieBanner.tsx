import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  getAnalyticsConsent,
  maybeInitGoogleAnalytics,
  setAnalyticsConsent,
  type AnalyticsConsentDecision,
} from '../lib/analytics'

interface CookieBannerProps {
  language: 'hr' | 'en'
}

const copy = {
  message: {
    hr:
      'Koristimo analitičke kolačiće kako bismo razumjeli korištenje stranice i poboljšali sadržaj. Možete ih prihvatiti ili odbiti.',
    en:
      'We use analytics cookies to understand how the website is used and improve the content. You can accept or decline them.',
  },
  accept: { hr: 'Prihvaćam', en: 'Accept' },
  decline: { hr: 'Odbijam', en: 'Decline' },
  privacy: { hr: 'Politika privatnosti', en: 'Privacy policy' },
} as const

export default function CookieBanner({ language }: CookieBannerProps) {
  const location = useLocation()
  const hideOnAdmin = location.pathname.startsWith('/admin')

  const [consentState, setConsentState] = useState<AnalyticsConsentDecision | null>(() =>
    getAnalyticsConsent(),
  )

  useEffect(() => {
    maybeInitGoogleAnalytics()
  }, [])

  const showBanner = useMemo(() => {
    if (!GA_MEASUREMENT_ID || hideOnAdmin) return false
    return consentState === null
  }, [hideOnAdmin, consentState])

  const onAccept = useCallback(() => {
    setAnalyticsConsent('accepted')
    setConsentState('accepted')
    maybeInitGoogleAnalytics()
  }, [])

  const onDecline = useCallback(() => {
    setAnalyticsConsent('declined')
    setConsentState('declined')
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ANALYTICS_CONSENT_STORAGE_KEY) return
      setConsentState(getAnalyticsConsent())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!showBanner) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6"
      role="dialog"
      aria-label={language === 'hr' ? 'Kolačići i privatnost' : 'Cookies and privacy'}
      aria-live="polite"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-[rgba(110,68,255,0.18)] bg-white/92 px-4 py-4 shadow-[0_-8px_40px_rgba(46,36,71,0.12)] backdrop-blur-md dark:border-lavender/20 dark:bg-[#0f1024]/94 dark:shadow-[0_-12px_48px_rgba(0,0,0,0.35)] sm:px-5 sm:py-5">
        <p className="mb-4 text-sm leading-relaxed text-plum/85 dark:text-pearl/85 sm:text-[0.9375rem]">
          {copy.message[language]}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-shrink-0 flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              className="btn btn-primary inline-flex min-h-[44px] touch-manipulation items-center justify-center px-6 py-2.5 text-sm font-semibold"
              onClick={onAccept}
            >
              {copy.accept[language]}
            </button>
            <button
              type="button"
              className="btn btn-secondary inline-flex min-h-[44px] touch-manipulation items-center justify-center px-6 py-2.5 text-sm font-semibold"
              onClick={onDecline}
            >
              {copy.decline[language]}
            </button>
          </div>
          <Link
            to="/politika-privatnosti"
            className="text-sm font-medium text-plum underline decoration-plum/30 underline-offset-2 transition-colors hover:text-plum/85 dark:text-pearl/90 dark:decoration-pearl/30 dark:hover:text-pearl sm:whitespace-nowrap"
          >
            {copy.privacy[language]}
          </Link>
        </div>
      </div>
    </div>
  )
}
