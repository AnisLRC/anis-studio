import { DecorativeSkyBackdrop } from '../components/DecorativeSkyBackdrop'
import TestimonialMarquee from '../components/TestimonialMarquee'

interface TestimonialsSectionProps {
  language: 'hr' | 'en'
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const translations = {
    title: {
      hr: 'Što kažu naši kupci',
      en: 'What Our Customers Say',
    },
    subtitle: {
      hr: 'Povjerenje naših kupaca je naš najveći uspjeh.',
      en: "Our customers' trust is our greatest success.",
    },
    helperHover: {
      hr: 'Za čitanje, zadrži pokazivač iznad recenzije.',
      en: 'To read, keep your pointer over a review.',
    },
  }

  return (
    <section id="testimonials" className="section-with-bg relative overflow-x-clip px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
      {/* Background wrapper */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <DecorativeSkyBackdrop priority="lazy" />
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-6xl">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-3 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-3.5 sm:text-3xl md:text-4xl">
            <span className="mr-2">💬</span>
            {translations.title[language]}
          </h2>
          <p className="mx-auto max-w-2xl px-1 text-base leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-lg">
            {translations.subtitle[language]}
          </p>
          <p
            className="mx-auto mt-3.5 hidden max-w-2xl px-1 text-center text-xs font-normal leading-relaxed tracking-wide text-plum/45 dark:text-pearl/42 sm:mt-4 sm:text-[0.8125rem] [@media(hover:hover)_and_(pointer:fine)]:block"
          >
            {translations.helperHover[language]}
          </p>
        </div>

        <TestimonialMarquee language={language} />
      </div>
    </section>
  )
}
