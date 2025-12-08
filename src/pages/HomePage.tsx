import { ErrorBoundary } from '../ErrorBoundary'
import WelcomeSection from '../sections/WelcomeSection'
import PortfolioSection from '../sections/PortfolioSection'
import TestimonialsSection from '../sections/TestimonialsSection'

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
      
      <ErrorBoundary name="Testimonials">
        <TestimonialsSection language={language} />
      </ErrorBoundary>
    </main>
  )
}



