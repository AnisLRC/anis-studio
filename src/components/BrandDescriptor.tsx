import clsx from 'clsx'

/** Exact copy: ◆ Ručni rad ◆ Interijeri ◆ Web projekti — diamonds emphasized vs. label text. */
export function BrandDescriptor({ className }: { className?: string }) {
  const labelClass =
    'text-[0.625rem] sm:text-[0.6875rem] font-normal tracking-[0.04em] text-plum/58 dark:text-pearl/52'
  const diamondClass =
    'inline-block shrink-0 align-[-0.1em] text-[1.1em] sm:text-[1.14em] font-semibold leading-none text-amethyst/70 dark:text-lavender/65'

  return (
    <p
      className={clsx(
        'm-0 flex max-w-full flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 sm:justify-start sm:gap-x-2',
        className
      )}
      aria-label="Ručni rad, Interijeri, Web projekti"
    >
      <span className={diamondClass} aria-hidden>
        ◆
      </span>
      <span className={labelClass}>Ručni rad</span>
      <span className={diamondClass} aria-hidden>
        ◆
      </span>
      <span className={labelClass}>Interijeri</span>
      <span className={diamondClass} aria-hidden>
        ◆
      </span>
      <span className={labelClass}>Web projekti</span>
    </p>
  )
}
