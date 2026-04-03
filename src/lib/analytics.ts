/**
 * Minimal GA4 event helper. Loads gtag only when VITE_GA_MEASUREMENT_ID is set.
 * No-ops safely when ID is missing or gtag is unavailable — never throws to the app.
 */

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim()

let initStarted = false

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Call once from main.tsx. Idempotent. */
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return
  const id = GA_MEASUREMENT_ID
  if (!id || initStarted) return
  initStarted = true

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  script.onload = () => {
    try {
      gtag('js', new Date())
      gtag('config', id)
    } catch {
      /* ignore */
    }
  }
  script.onerror = () => {
    /* silent — tracking optional */
  }
  document.head.appendChild(script)
}

export type AnalyticsEventName =
  | 'homepage_line_click'
  | 'inquiry_cta_click'
  | 'interiors_chooser_click'
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
