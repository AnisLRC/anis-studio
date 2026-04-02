export type SkyBackdropPriority = 'high' | 'lazy'

interface DecorativeSkyBackdropProps {
  /**
   * high: above-the-fold / LCP candidates (hint for future preload tuning).
   * lazy: below-the-fold sections.
   */
  priority?: SkyBackdropPriority
  className?: string
}

/**
 * Shared hero sky imagery for section backgrounds.
 * Uses CSS backgrounds (not `<img>`) so decorative art never shows a broken-image icon
 * or intrinsic-size strip; behavior matches the original pre–code-split implementation.
 */
export function DecorativeSkyBackdrop({
  priority = 'lazy',
  className = '',
}: DecorativeSkyBackdropProps) {
  return (
    <>
      <div
        aria-hidden
        data-bg-priority={priority}
        className={`pointer-events-none absolute inset-0 h-full w-full dark:hidden transition-opacity duration-500 ${className}`}
        style={{
          backgroundImage: 'url(/hero-sky-light.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full hidden dark:block transition-opacity duration-500 ${className}`}
        style={{
          backgroundImage: 'url(/hero-sky-dark.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  )
}
