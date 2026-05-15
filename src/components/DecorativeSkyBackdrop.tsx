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
 *
 * Soft aurora / nebula mist (CSS-only) sits above the PNG and below page
 * content. Dark theme uses stronger violets with `mix-blend-mode: screen`; light
 * theme stays pearl/lavender and softer. Drift animacije su ugašene (I8E-2).
 * Globalni `body::before` nosi kontinuirani shimmer; ovaj PNG je suptilna tekstura (I8E-2b).
 */
export function DecorativeSkyBackdrop({
  priority = 'lazy',
  className = '',
}: DecorativeSkyBackdropProps) {
  const skyImageStyle = {
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
    backgroundRepeat: 'no-repeat' as const,
    transitionProperty: 'opacity',
    transitionDuration: '400ms',
    transitionTimingFunction: 'ease' as const,
  }

  return (
    <>
      {/* Light theme (hidden in dark mode, not fetched) */}
      <div
        aria-hidden
        data-bg-priority={priority}
        className={`sky-backdrop-stack pointer-events-none absolute inset-0 h-full w-full overflow-hidden dark:hidden ${className}`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            ...skyImageStyle,
            backgroundImage: 'url(/hero-sky-light.png)',
          }}
        />
        <div className="sky-aurora sky-aurora--light pointer-events-none absolute inset-0">
          <span className="sky-aurora__blob sky-aurora__blob--light-a" aria-hidden />
          <span className="sky-aurora__blob sky-aurora__blob--light-b" aria-hidden />
        </div>
      </div>
      {/* Dark theme (hidden in light mode, not fetched) */}
      <div
        aria-hidden
        data-bg-priority={priority}
        className={`sky-backdrop-stack pointer-events-none absolute inset-0 hidden h-full w-full overflow-hidden dark:block ${className}`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            ...skyImageStyle,
            backgroundImage: 'url(/hero-sky-dark.png)',
          }}
        />
        <div className="sky-aurora sky-aurora--dark pointer-events-none absolute inset-0">
          <span className="sky-aurora__blob sky-aurora__blob--dark-a" aria-hidden />
          <span className="sky-aurora__blob sky-aurora__blob--dark-b" aria-hidden />
          <span className="sky-aurora__blob sky-aurora__blob--dark-c" aria-hidden />
        </div>
      </div>
    </>
  )
}
