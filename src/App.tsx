import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartDrawer from './components/CartDrawer'
import { useCart } from './lib/cart.store'
import { ErrorBoundary } from './ErrorBoundary'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import AdminDashboard from './components/AdminDashboard'
import { useGlobalScrollAnimations } from './hooks/useGlobalScrollAnimations'
import { useThemeStore } from './lib/theme.store'
import { isSupabaseConfigured } from './lib/supabase'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LRCPage from './pages/LRCPage'
import InterijeriPage from './pages/InterijeriPage'
import WebAtelierPage from './pages/WebAtelierPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import AdminSettingsPage from './pages/AdminSettingsPage'
import AdminLrcInquiriesPage from './pages/AdminLrcInquiriesPage'
import AdminInteriorsProjectsPage from './pages/AdminInteriorsProjectsPage'
import AdminInteriorsProjectDetailPage from './pages/AdminInteriorsProjectDetailPage'
import AdminLoginPage from './pages/AdminLoginPage'
import PublicProjectVrPage from './pages/PublicProjectVrPage'
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
      {/* Development warning banner when Supabase is not configured */}
      {import.meta.env.DEV && !isSupabaseConfigured && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-3 text-center text-sm shadow-lg">
          <strong>⚠️ Development Mode:</strong> Supabase not configured. Check .env.local file. Forms will use fallback mode.
        </div>
      )}

      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            <Route
              element={
                <MainLayout
                  language={language}
                  onLanguageChange={setLanguage}
                  cartItemCount={cartCount}
                  onCartClick={() => setIsCartOpen(true)}
                />
              }
            >
              <Route path="/" element={<HomePage language={language} />} />
              <Route path="/lrc" element={<LRCPage language={language} />} />
              <Route path="/interijeri" element={<InterijeriPage language={language} />} />
              <Route path="/web-atelier" element={<WebAtelierPage language={language} />} />
              <Route path="/o-nama" element={<AboutPage language={language} />} />
              <Route path="/kontakt" element={<ContactPage language={language} />} />
              <Route path="/faq" element={<FAQPage language={language} />} />
              <Route path="/vr/:projectId" element={<PublicProjectVrPage />} />
            </Route>

            {/* Admin routes - no public header/footer */}
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
            <Route
              path="/admin/interiors-projects/:id"
              element={
                <AdminRoute>
                  <AdminInteriorsProjectDetailPage />
                </AdminRoute>
              }
            />
          </Routes>

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
