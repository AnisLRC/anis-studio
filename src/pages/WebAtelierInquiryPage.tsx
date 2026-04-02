import { useSearchParams } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import { AnimatedPage } from '../components/AnimatedPage'
import { WebAtelierFormPageLayout } from '../components/WebAtelierFormPageLayout'
import { WebProjectForm, type WebAtelierPaket } from '../components/WebProjectForm'

interface WebAtelierInquiryPageProps {
  language: 'hr' | 'en'
}

export default function WebAtelierInquiryPage({ language }: WebAtelierInquiryPageProps) {
  const [searchParams] = useSearchParams()
  const title = language === 'hr' ? 'Upit za web projekt' : 'Web project inquiry'

  const raw = searchParams.get('paket')
  const initialPaket: WebAtelierPaket | undefined =
    raw === 'start' || raw === 'pro' || raw === 'premium' ? raw : undefined

  return (
    <AnimatedPage>
      <main className="min-w-0 bg-pearl text-plum dark:bg-[#070812] dark:text-pearl">
        <ErrorBoundary name="WebAtelierUpit">
          <WebAtelierFormPageLayout language={language} title={title}>
            <div className="mx-auto min-w-0 max-w-4xl">
              <WebProjectForm language={language} hidePageTitle initialPaket={initialPaket} />
            </div>
          </WebAtelierFormPageLayout>
        </ErrorBoundary>
      </main>
    </AnimatedPage>
  )
}
