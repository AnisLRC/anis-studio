/**
 * Minimal GA4 event helper. Loads gtag only when VITE_GA_MEASUREMENT_ID is set and
 * the user has accepted analytics cookies.
 * No-ops safely when ID is missing, consent is not granted, or gtag is unavailable.
 */

export const GA_MEASUREMENT_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
)?.trim()

export const ANALYTICS_CONSENT_STORAGE_KEY = 'analytics_consent'

export type AnalyticsConsentDecision = 'accepted' | 'declined'

let initStarted = false

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Read stored analytics cookie choice (null if not chosen yet). */
export function getAnalyticsConsent(): AnalyticsConsentDecision | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    if (v === 'accepted' || v === 'declined') return v
    return null
  } catch {
    return null
  }
}

export function setAnalyticsConsent(decision: AnalyticsConsentDecision): void {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, decision)
  } catch {
    /* ignore quota / privacy mode */
  }
}

/** Idempotent GA4 bootstrap — only loads when Measurement ID exists and consent is accepted. */
function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return
  const id = GA_MEASUREMENT_ID
  if (!id || initStarted) return
  initStarted = true

  // Standard GA4 stub: push `arguments`, not a rest-array — gtag.js expects this shape.
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    const argsLike = (function () {
      return arguments
    }).apply(null, args as unknown as any)
    window.dataLayer!.push(argsLike as unknown as IArguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', id)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  script.onerror = () => {
    /* silent — tracking optional */
  }
  document.head.appendChild(script)
}

/** Call after mount / when consent changes. Safe to call repeatedly. */
export function maybeInitGoogleAnalytics(): void {
  if (!GA_MEASUREMENT_ID) return
  if (getAnalyticsConsent() !== 'accepted') return
  loadGoogleAnalytics()
}

export type AnalyticsEventName =
  | 'homepage_line_click'
  | 'inquiry_cta_click'
  | 'interiors_chooser_click'
  | 'interiors_portfolio_preview_click'
  | 'review_cta_click'
  | 'form_submit_success'

export function trackEvent(
  name: AnalyticsEventName,
  params?: Record<string, string>
): void {
  try {
    if (!GA_MEASUREMENT_ID) return
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', name, params ?? {})
  } catch {
    /* never break the app */
  }
}
