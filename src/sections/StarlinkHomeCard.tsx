import { Link } from 'react-router-dom'
import { STARLINK_HR_PATH } from '../config/starlinkHr'

interface StarlinkHomeCardProps {
  language: 'hr' | 'en'
}

const copy = {
  label: {
    hr: 'Informativni vodič',
    en: 'Informational guide',
  },
  title: {
    hr: 'Razmišljate o Starlinku?',
    en: 'Considering Starlink?',
  },
  text: {
    hr: 'Pročitajte jednostavan vodič na hrvatskom i provjerite što je važno znati prije narudžbe.',
    en: 'Read a simple guide and learn what is important to check before ordering.',
  },
  button: {
    hr: 'Otvori vodič',
    en: 'Open the guide',
  },
} as const

/**
 * Discrete homepage strip — not a fourth studio service card.
 */
export default function StarlinkHomeCard({ language }: StarlinkHomeCardProps) {
  return (
    <section
      className="px-4 sm:px-6"
      aria-labelledby="starlink-home-card-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 rounded-2xl border border-[rgba(110,68,255,0.1)] bg-white/35 px-5 py-5 backdrop-blur-sm dark:border-lavender/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-plum/50 dark:text-pearl/55">
              {copy.label[language]}
            </p>
            <h2
              id="starlink-home-card-heading"
              className="mt-1 font-heading text-lg font-bold tracking-tight text-plum/90 dark:text-pearl sm:text-xl"
            >
              {copy.title[language]}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-plum/72 dark:text-pearl/70">
              {copy.text[language]}
            </p>
          </div>
          <Link
            to={STARLINK_HR_PATH}
            className="btn btn-secondary inline-flex min-h-[44px] w-full shrink-0 items-center justify-center !whitespace-normal px-5 py-2.5 text-sm sm:w-auto"
          >
            {copy.button[language]}
          </Link>
        </div>
      </div>
    </section>
  )
}
