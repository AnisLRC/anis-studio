import { Link } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import InteriorsSection from '../components/InteriorsSection'
import FAQSection, { FAQ_ITEMS } from '../sections/FAQSection'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO } from '../components/PageSEO'
import { InteriorsSettingsLoading } from '../components/InteriorsSettingsLoading'
import { useSettings } from '../hooks/useSettings'

interface InterijeriPageProps {
  language: 'hr' | 'en'
}

const interiorsItems = FAQ_ITEMS.filter((item) => item.category === 'interiors')

const interiorsFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: interiorsItems.map((item) => ({
    '@type': 'Question',
    name: item.question.hr,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.hr.replace(/\n+/g, ' ').trim(),
    },
  })),
}

const unavailableCopy = {
  title: {
    hr: 'Usluga je trenutno u pripremi',
    en: 'This service is currently in preparation',
  },
  text: {
    hr: 'Ova stranica trenutno nije javno dostupna. Za upite i dogovor možete nam se javiti putem kontakt stranice.',
    en: 'This page is not publicly available at the moment. For questions or project inquiries, you can contact us through the contact page.',
  },
  button: {
    hr: 'Kontakt',
    en: 'Contact',
  },
}

export default function InterijeriPage({ language }: InterijeriPageProps) {
  const { settings, isLoading } = useSettings()
  const interiorsVisible = settings?.interiors_public_visible ?? true

  if (isLoading) {
    return <InteriorsSettingsLoading language={language} seoTitle="Interijeri" />
  }

  if (!interiorsVisible) {
    return (
      <AnimatedPage>
        <PageSEO title="Interijeri" description="" noIndex />
        <main className="min-w-0">
          <section className="Section fade-in">
            <div className="mx-auto min-w-0 max-w-xl px-4 py-20 text-center sm:px-6 sm:py-24">
              <div className="mb-6 text-5xl" aria-hidden>🏠</div>
              <h1 className="mb-4 font-heading text-2xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-3xl">
                {unavailableCopy.title[language]}
              </h1>
              <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-plum/78 dark:text-pearl/72">
                {unavailableCopy.text[language]}
              </p>
              <Link
                to="/kontakt"
                className="btn btn-primary inline-flex min-h-[48px] items-center justify-center px-8 py-3 text-base font-semibold"
              >
                {unavailableCopy.button[language]}
              </Link>
            </div>
          </section>
        </main>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage>
      <PageSEO
        title="3D vizualizacija interijera i kuhinja"
        description="3D vizualizacija interijera, kuhinja i prostora prije izvedbe. Realistični prikazi rasporeda, materijala i atmosfere — za privatne klijente koji uređuju dom i za stolare kojima treba profesionalan prikaz za prezentaciju. Fotorealistični render dostupan kao dodatna opcija."
        canonical="/interijeri"
        jsonLd={interiorsFaqJsonLd}
      />
      <main className="min-w-0">
      <ErrorBoundary name="Interijeri">
        <InteriorsSection language={language} />
      </ErrorBoundary>

      {/* FAQ — shared axis with Interiors; soft divider */}
      <ErrorBoundary name="FAQ">
        <div className="border-t border-[rgba(110,68,255,0.12)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-lavender/12 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <FAQSection language={language} categories={['interiors']} />
        </div>
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}

