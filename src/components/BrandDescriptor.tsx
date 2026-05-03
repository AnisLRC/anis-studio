import clsx from 'clsx'

const DESCRIPTOR_COPY = {
  hr: {
    labels: ['3D vizualizacije', 'Interijeri', 'Vizualna prezentacija'] as const,
    ariaLabel: '3D vizualizacije, Interijeri, Vizualna prezentacija',
  },
  en: {
    labels: ['3D Visualizations', 'Interiors', 'Visual Presentation'] as const,
    ariaLabel: '3D Visualizations, Interiors, Visual Presentation',
  },
} as const

/** Interiors-first tagline — optional `language` (footer defaults to Croatian). */
export function BrandDescriptor({
  className,
  language = 'hr',
}: {
  className?: string
  language?: 'hr' | 'en'
}) {
  const labelClass =
    'text-[0.625rem] sm:text-[0.6875rem] font-normal tracking-[0.04em] text-plum/58 dark:text-pearl/52'
  const diamondClass =
    'inline-block shrink-0 align-[-0.1em] text-[1.1em] sm:text-[1.14em] font-semibold leading-none text-amethyst/70 dark:text-lavender/65'

  const { labels, ariaLabel } = DESCRIPTOR_COPY[language]

  return (
    <p
      className={clsx(
        'm-0 flex max-w-full flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 sm:justify-start sm:gap-x-2',
        className
      )}
      aria-label={ariaLabel}
    >
      {labels.map((label) => (
        <span key={label} className="contents">
          <span className={diamondClass} aria-hidden>
            ◆
          </span>
          <span className={labelClass}>{label}</span>
        </span>
      ))}
    </p>
  )
}
