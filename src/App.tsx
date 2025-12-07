import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { useCart } from './lib/cart.store'
import { ErrorBoundary } from './ErrorBoundary'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import AdminDashboard from './components/AdminDashboard'
import { useGlobalScrollAnimations } from './hooks/useGlobalScrollAnimations'
import { useThemeStore } from './lib/theme.store'
import HomePage from './pages/HomePage'
import LRCPage from './pages/LRCPage'
import AdminSettingsPage from './pages/AdminSettingsPage'
import AdminLrcInquiriesPage from './pages/AdminLrcInquiriesPage'
import AdminInteriorsProjectsPage from './pages/AdminInteriorsProjectsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminRoute from './components/AdminRoute'
import { AdminAuthProvider } from './providers/AdminAuthProvider'

export default function App() {
  const [language, setLanguage] = useState<'hr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'hr' | 'en') || 'hr'
    }
    return 'hr'
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartCount = useCart(s => s.totalQty)
  const { theme, initializeTheme } = useThemeStore()
  const isDark = theme === 'dark'

  // Globalni scroll animacije
  useGlobalScrollAnimations()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-slate-950 text-slate-50 transition-colors duration-300'
          : 'min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300'
      }
    >
        <BrowserRouter>
        <AdminAuthProvider>
          <ErrorBoundary name="Header">
            <Header 
              language={language}
              onLanguageChange={setLanguage}
              cartItemCount={cartCount}
              onCartClick={() => setIsCartOpen(true)}
            />
          </ErrorBoundary>
          
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/lrc" element={<LRCPage language={language} />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminSettingsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/lrc-inquiries"
              element={
                <AdminRoute>
                  <AdminLrcInquiriesPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/interiors-projects"
              element={
                <AdminRoute>
                  <AdminInteriorsProjectsPage />
                </AdminRoute>
              }
            />
          </Routes>

          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>

          <ErrorBoundary name="CartDrawer">
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              language={language}
            />
          </ErrorBoundary>

          {/* Auth Modals */}
          <ErrorBoundary name="LoginModal">
            <LoginModal language={language} />
          </ErrorBoundary>
          <ErrorBoundary name="RegisterModal">
            <RegisterModal language={language} />
          </ErrorBoundary>

          {/* Admin Dashboard (dev only) */}
          {import.meta.env.DEV && (
            <section id="admin" className="Section border-t border-slate-200 bg-slate-50/60 py-12 mt-12 text-slate-900">
              <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Admin pregled (dev only)
                </h2>
                <p className="mb-6 text-sm text-slate-600">
                  Ovo je test verzija admin nadzorne ploče, vidljiva samo u development okruženju.
                </p>
                <AdminDashboard />
              </div>
            </section>
          )}
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  )
}
