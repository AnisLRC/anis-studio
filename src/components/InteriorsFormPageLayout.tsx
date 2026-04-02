import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

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
        <div
          className="absolute inset-0 dark:hidden transition-opacity duration-500"
          style={{
            backgroundImage: 'url(/hero-sky-light.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block transition-opacity duration-500"
          style={{
            backgroundImage: 'url(/hero-sky-dark.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
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
        {children}
      </div>
    </section>
  )
}
