import { ErrorBoundary } from '../ErrorBoundary'
import WelcomeSection from '../sections/WelcomeSection'
import PortfolioSection from '../sections/PortfolioSection'
import InteriorsSection from '../components/InteriorsSection'
import WebAtelierSection from '../components/WebAtelierSection'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import FAQSection from '../sections/FAQSection'
import ContactSection from '../components/ContactSection'

interface HomePageProps {
  language: 'hr' | 'en'
}

export default function HomePage({ language }: HomePageProps) {
  return (
    <main className="space-y-10 sm:space-y-14 lg:space-y-16">
      <ErrorBoundary name="Welcome">
        <WelcomeSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="Portfolio">
        <PortfolioSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="Interijeri">
        <section id="interiors" className="Section">
          <InteriorsSection language={language} />
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary name="WebAtelier">
        <section id="web-atelier" className="Section">
          <WebAtelierSection language={language} />
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary name="ONama">
        <section id="about" className="Section">
          <AboutSection language={language} />
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary name="Testimonials">
        <TestimonialsSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="FAQ">
        <FAQSection language={language} />
      </ErrorBoundary>
      
      <ErrorBoundary name="Kontakt">
        <section id="contact" className="Section">
          <ContactSection language={language} />
        </section>
      </ErrorBoundary>
    </main>
  )
}

