import { ErrorBoundary } from '../ErrorBoundary'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'

interface AboutPageProps {
  language: 'hr' | 'en'
}

export default function AboutPage({ language }: AboutPageProps) {
  const translations = {
    title: {
      hr: "✨ O Ani's Studiu",
      en: "✨ About Ani's Studio"
    },
    testimonialsTitle: {
      hr: "Što kažu klijenti",
      en: "What Our Clients Say"
    }
  }

  return (
    <main className="space-y-10 sm:space-y-14 lg:space-y-16">
      {/* Page Title */}
      <section className="Section fade-in">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
              {translations.title[language]}
            </h1>
          </div>
        </div>
      </section>

      {/* About Section Content */}
      <ErrorBoundary name="ONama">
        <div className="[&_h2]:sr-only">
          <AboutSection language={language} />
        </div>
      </ErrorBoundary>

      {/* Testimonials Section */}
      <ErrorBoundary name="Testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
              {translations.testimonialsTitle[language]}
            </h2>
          </div>
          <TestimonialsSection language={language} />
        </div>
      </ErrorBoundary>
    </main>
  )
}

