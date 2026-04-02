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
      <main className="min-w-0 space-y-0">
      <ErrorBoundary name="WebAtelier">
        <WebAtelierSection language={language} />
      </ErrorBoundary>

      {/* FAQ Section */}
      <ErrorBoundary name="FAQ">
        <div className="border-t border-[rgba(110,68,255,0.1)] dark:border-lavender/15">
          <FAQSection language={language} categories={['web']} />
        </div>
      </ErrorBoundary>
    </main>
    </AnimatedPage>
  )
}

