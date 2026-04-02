export type SkyBackdropPriority = 'high' | 'lazy'

interface DecorativeSkyBackdropProps {
  /**
   * high: above-the-fold / LCP candidates (eager, fetchPriority high).
   * lazy: defer loading until near viewport.
   */
  priority?: SkyBackdropPriority
  className?: string
}

/**
 * Shared hero sky imagery for section backgrounds.
 * Uses real img elements so the browser can lazy-load, decode off-main-thread, and reserve layout via width/height.
 */
export function DecorativeSkyBackdrop({
  priority = 'lazy',
  className = '',
}: DecorativeSkyBackdropProps) {
  const high = priority === 'high'
  return (
    <>
      <img
        src="/hero-sky-light.png"
        alt=""
        width={1920}
        height={1080}
        sizes="100vw"
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover dark:hidden transition-opacity duration-500 ${className}`}
        loading={high ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={high ? 'high' : 'low'}
      />
      <img
        src="/hero-sky-dark.png"
        alt=""
        width={1920}
        height={1080}
        sizes="100vw"
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover hidden dark:block transition-opacity duration-500 ${className}`}
        loading={high ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={high ? 'high' : 'low'}
      />
    </>
  )
}
