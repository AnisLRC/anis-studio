import { ErrorBoundary } from '../ErrorBoundary'
import { AnimatedPage } from '../components/AnimatedPage'
import { InteriorsFormPageLayout } from '../components/InteriorsFormPageLayout'
import { InteriorsClientForm } from '../components/InteriorsClientForm'
import { INTERIORS_STOLAR_OPTIONS } from '../data/interiorsPublic'

interface InterijeriClientsPageProps {
  language: 'hr' | 'en'
}

export default function InterijeriClientsPage({ language }: InterijeriClientsPageProps) {
  const title = language === 'hr' ? 'Upit za klijente' : 'Client inquiry'

  return (
    <AnimatedPage>
      <main className="min-w-0">
        <ErrorBoundary name="InterijeriKlijenti">
          <InteriorsFormPageLayout language={language} title={title}>
            <div className="mx-auto max-w-4xl">
              <InteriorsClientForm stolars={INTERIORS_STOLAR_OPTIONS} language={language} />
            </div>
          </InteriorsFormPageLayout>
        </ErrorBoundary>
      </main>
    </AnimatedPage>
  )
}
