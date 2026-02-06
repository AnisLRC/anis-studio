import { ErrorBoundary } from '../ErrorBoundary'
import WebAtelierSection from '../components/WebAtelierSection'
import FAQSection from '../sections/FAQSection'
import { AnimatedPage } from '../components/AnimatedPage'

interface WebAtelierPageProps {
  language: 'hr' | 'en'
}

export default function WebAtelierPage({ language }: WebAtelierPageProps) {
  return (
    <AnimatedPage>
      <main className="space-y-10 sm:space-y-14 lg:space-y-16">
      <ErrorBoundary name="WebAtelier">
        <section id="web-atelier" className="Section">
          <WebAtelierSection language={language} />
        </section>
      </ErrorBoundary>

      {/* FAQ Section */}
      <ErrorBoundary name="FAQ">
        <FAQSection language={language} categories={['web']} />
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}

