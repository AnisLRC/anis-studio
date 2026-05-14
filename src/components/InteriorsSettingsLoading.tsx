import { AnimatedPage } from './AnimatedPage'
import { PageSEO } from './PageSEO'

interface InteriorsSettingsLoadingProps {
  language: 'hr' | 'en'
  /** Visible tab title while settings resolve (matches sibling branches where sensible). */
  seoTitle: string
}

/**
 * Used by Interijeri routes while useSettings resolves — avoids an empty main area.
 * Spinner styling matches RouteFallback.
 */
export function InteriorsSettingsLoading({ language, seoTitle }: InteriorsSettingsLoadingProps) {
  const srLabel = language === 'hr' ? 'Učitavanje…' : 'Loading…'

  return (
    <AnimatedPage>
      <PageSEO title={seoTitle} description="" noIndex />
      <main className="min-w-0">
        <div
          className="flex min-h-[50vh] w-full items-center justify-center px-4 py-16"
          aria-busy="true"
          aria-live="polite"
        >
          <div
            className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--clr-primary)] border-t-transparent"
            role="status"
          />
          <span className="sr-only">{srLabel}</span>
        </div>
      </main>
    </AnimatedPage>
  )
}
