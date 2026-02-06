import { ErrorBoundary } from '../ErrorBoundary'
import InteriorsSection from '../components/InteriorsSection'
import FAQSection from '../sections/FAQSection'
import { AnimatedPage } from '../components/AnimatedPage'

interface InterijeriPageProps {
  language: 'hr' | 'en'
}

export default function InterijeriPage({ language }: InterijeriPageProps) {
  return (
    <AnimatedPage>
      <main className="space-y-10 sm:space-y-14 lg:space-y-16">
      <ErrorBoundary name="Interijeri">
        <section id="interiors" className="Section">
          <InteriorsSection language={language} />
        </section>
      </ErrorBoundary>

      {/* FAQ Section */}
      <ErrorBoundary name="FAQ">
        <FAQSection language={language} categories={['interiors']} />
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}

