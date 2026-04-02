export type SkyBackdropPriority = 'high' | 'lazy'

interface DecorativeSkyBackdropProps {
  /**
   * high: above-the-fold hero (loaded with the initial paint).
   * lazy: below-the-fold sections (browser may defer loading until near viewport).
   */
  priority?: SkyBackdropPriority
  className?: string
}

/**
 * Shared hero sky imagery for section backgrounds.
 * Uses CSS backgrounds (not `<img>`) so decorative art never shows a broken-image icon.
 *
 * Both theme variants are in the DOM; the inactive one is `display: none` via
 * Tailwind `dark:hidden` / `hidden dark:block`. A CSS background-image on a
 * `display: none` element is never fetched by the browser, so only the active
 * theme's asset is loaded at runtime.
 */
export function DecorativeSkyBackdrop({
  priority = 'lazy',
  className = '',
}: DecorativeSkyBackdropProps) {
  return (
    <>
      {/* Light theme layer (hidden in dark mode, not fetched) */}
      <div
        aria-hidden
        data-bg-priority={priority}
        className={`pointer-events-none absolute inset-0 h-full w-full dark:hidden ${className}`}
        style={{
          backgroundImage: 'url(/hero-sky-light.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // Only animate opacity transitions for smooth theme switching;
          // skip on mobile-scale sections where animation isn't visible anyway.
          transitionProperty: 'opacity',
          transitionDuration: '400ms',
          transitionTimingFunction: 'ease',
        }}
      />
      {/* Dark theme layer (hidden in light mode, not fetched) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full hidden dark:block ${className}`}
        style={{
          backgroundImage: 'url(/hero-sky-dark.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transitionProperty: 'opacity',
          transitionDuration: '400ms',
          transitionTimingFunction: 'ease',
        }}
      />
    </>
  )
}
