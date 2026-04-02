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

