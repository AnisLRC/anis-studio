import { ErrorBoundary } from '../ErrorBoundary'
import { AnimatedPage } from '../components/AnimatedPage'
import { InteriorsFormPageLayout } from '../components/InteriorsFormPageLayout'
import { InteriorsCarpenterForm } from '../components/InteriorsCarpenterForm'

interface InterijeriStolariPageProps {
  language: 'hr' | 'en'
}

export default function InterijeriStolariPage({ language }: InterijeriStolariPageProps) {
  const title =
    language === 'hr' ? 'Upit za stolare i studije' : 'Inquiry for carpenters & furniture studios'

  return (
    <AnimatedPage>
      <main className="min-w-0">
        <ErrorBoundary name="InterijeriStolari">
          <InteriorsFormPageLayout language={language} title={title}>
            <div className="mx-auto max-w-4xl">
              <InteriorsCarpenterForm language={language} />
            </div>
          </InteriorsFormPageLayout>
        </ErrorBoundary>
      </main>
    </AnimatedPage>
  )
}
