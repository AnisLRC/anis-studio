import { ErrorBoundary } from '../ErrorBoundary'
import WelcomeSection from '../sections/WelcomeSection'
import PortfolioSection from '../sections/PortfolioSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import ContactSection from '../sections/ContactSection'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO, SITE_URL } from '../components/PageSEO'

interface HomePageProps {
  language: 'hr' | 'en'
}

const HR_ORG_DESCRIPTION =
  "Ani's Studio izrađuje 3D vizualizacije interijera, kuhinja i prostora prije izvedbe — fotorealistični prikazi rasporeda, materijala i atmosfere za privatne klijente, stolare i male interijer projekte."

const EN_ORG_DESCRIPTION =
  "Ani's Studio creates 3D interior visualizations and photorealistic previews of kitchens and spaces before execution — helping clients, carpenters and small interior projects present layouts, materials and atmosphere clearly."

export default function HomePage({ language }: HomePageProps) {
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: "Ani's Studio",
      url: SITE_URL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: "Ani's Studio",
      url: SITE_URL,
      description: language === 'hr' ? HR_ORG_DESCRIPTION : EN_ORG_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zagreb',
        addressCountry: 'HR',
      },
    },
  ]

  const seoTitle =
    language === 'hr'
      ? "3D vizualizacija interijera i kuhinja — Ani's Studio"
      : "3D interior visualizations — Ani's Studio"

  const seoDescription = language === 'hr' ? HR_ORG_DESCRIPTION : EN_ORG_DESCRIPTION

  return (
    <AnimatedPage>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <main className="min-w-0 space-y-10 sm:space-y-12 lg:space-y-14">
      <ErrorBoundary name="Welcome">
        <WelcomeSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="Portfolio">
        <PortfolioSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="Testimonials">
        <TestimonialsSection language={language} />
      </ErrorBoundary>

      <ErrorBoundary name="Contact">
        <ContactSection language={language} />
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}



