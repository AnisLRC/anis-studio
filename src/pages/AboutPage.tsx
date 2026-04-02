import { ErrorBoundary } from '../ErrorBoundary'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import { AnimatedPage } from '../components/AnimatedPage'

interface AboutPageProps {
  language: 'hr' | 'en'
}

export default function AboutPage({ language }: AboutPageProps) {
  const translations = {
    title: {
      hr: "✨ O Ani's Studiu",
      en: "✨ About Ani's Studio"
    }
  }

  return (
    <AnimatedPage>
      <main className="min-w-0 space-y-12 sm:space-y-14 lg:space-y-[4.25rem]">
      {/* Page Title */}
      <section className="Section fade-in relative section-with-bg overflow-x-clip">
        {/* Background wrapper */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Light mode image */}
          <div
            className="absolute inset-0 dark:hidden transition-opacity duration-500"
            style={{
              backgroundImage: "url(/hero-sky-light.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Dark mode image */}
          <div
            className="absolute inset-0 hidden dark:block transition-opacity duration-500"
            style={{
              backgroundImage: "url(/hero-sky-dark.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
        </div>
        
        <div className="relative z-10 mx-auto min-w-0 max-w-2xl px-4 py-12 text-center sm:px-6 sm:py-14 lg:py-16">
          <h1 className="break-words font-heading text-3xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
            {translations.title[language]}
          </h1>
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
        <TestimonialsSection language={language} />
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}

