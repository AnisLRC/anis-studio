import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { DecorativeSkyBackdrop } from './DecorativeSkyBackdrop'

interface InteriorsFormPageLayoutProps {
  language: 'hr' | 'en'
  title: string
  children: ReactNode
}

export function InteriorsFormPageLayout({ language, title, children }: InteriorsFormPageLayoutProps) {
  const backLabel = language === 'hr' ? 'Natrag na Interijere' : 'Back to Interiors'

  return (
    <section className="Section fade-in relative section-with-bg min-h-[min(100dvh,auto)]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <DecorativeSkyBackdrop priority="high" />
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="mb-8">
          <Link
            to="/interijeri"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[--color-primary] transition-colors hover:underline dark:text-lavender"
          >
            <span aria-hidden>←</span>
            {backLabel}
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:text-3xl">
            {title}
          </h1>
        </div>
        <div className="mx-auto min-w-0 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-[rgba(110,68,255,0.12)] bg-white/50 shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)]">
            <div className="p-6 sm:p-8 md:p-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
