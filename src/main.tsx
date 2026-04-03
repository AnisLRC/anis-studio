import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { ErrorBoundary } from './ErrorBoundary'
import { initGoogleAnalytics } from './lib/analytics'
import { AuthProvider } from './providers/AuthProvider'
import { UiProvider } from './providers/UiProvider'
import './index.css'

initGoogleAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <UiProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UiProvider>
      </ErrorBoundary>
    </HelmetProvider>
  // </React.StrictMode>
)
