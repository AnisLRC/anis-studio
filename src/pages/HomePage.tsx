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
    description:
      'Kreativni studio za personaliziranu ručnu izradu, lasersko rezanje i graviranje (LRC), 3D vizualizaciju interijera i izradu web stranica.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zagreb',
      addressCountry: 'HR',
    },
  },
]

export default function HomePage({ language }: HomePageProps) {
  return (
    <AnimatedPage>
      <PageSEO
        title="Ručna izrada, interijeri i web"
        description="Kreativni studio za personaliziranu ručnu izradu, lasersko rezanje i graviranje (LRC), 3D vizualizaciju interijera i izradu web stranica."
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



