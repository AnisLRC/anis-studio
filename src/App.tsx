import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import CartDrawer from './components/CartDrawer'
import { useCart } from './lib/cart.store'
import { ErrorBoundary } from './ErrorBoundary'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
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

// Routes component with AnimatePresence
function AnimatedRoutes({
  language,
  cartCount,
  onLanguageChange,
  onCartClick
}: {
  language: 'hr' | 'en'
  cartCount: number
  onLanguageChange: (lang: 'hr' | 'en') => void
  onCartClick: () => void
}) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          element={
            <MainLayout
              language={language}
              onLanguageChange={onLanguageChange}
              cartItemCount={cartCount}
              onCartClick={onCartClick}
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
    </AnimatePresence>
  )
}

export default function App() {
  const { initializeTheme } = useThemeStore()
  
  const [language, setLanguage] = useState<'hr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'hr' | 'en') || 'hr'
    }
    return 'hr'
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartCount = useCart(s => s.totalQty)

  // Globalni scroll animacije
  useGlobalScrollAnimations()

  // Initialize theme on app mount
  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  return (
    <div className="min-h-screen">
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(110, 68, 255, 0.2)',
            borderRadius: '1rem',
            boxShadow: '0 8px 32px rgba(110, 68, 255, 0.15)',
            color: 'var(--color-ink)',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#6E44FF',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Development warning banner when Supabase is not configured */}
      {/* Banner sakriven jer je fixed i prikazuje se na svim stranicama */}
      {/* {import.meta.env.DEV && !isSupabaseConfigured && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-3 text-center text-sm shadow-lg">
          <strong>⚠️ Development Mode:</strong> Supabase not configured. Check .env.local file. Forms will use fallback mode.
        </div>
      )} */}

      <BrowserRouter>
        <AdminAuthProvider>
          <AnimatedRoutes
            language={language}
            cartCount={cartCount}
            onLanguageChange={setLanguage}
            onCartClick={() => setIsCartOpen(true)}
          />

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
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  )
}
