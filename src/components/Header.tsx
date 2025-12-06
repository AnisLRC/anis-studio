import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { useUi } from '../providers/UiProvider'
import { useThemeStore } from '../lib/theme.store'

interface HeaderProps {
  language: 'hr' | 'en'
  onLanguageChange: (lang: 'hr' | 'en') => void
  cartItemCount: number
  onCartClick: () => void
}

export default function Header({ language, onLanguageChange, cartItemCount, onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const { openModal } = useUi()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const navigation = {
    hr: {
      lrc: 'LRC',
      interiors: 'Interijeri',
      webAtelier: 'Web Atelier',
      about: 'O nama',
      contact: 'Kontakt'
    },
    en: {
      lrc: 'LRC',
      interiors: 'Interiors',
      webAtelier: 'Web Atelier',
      about: 'About',
      contact: 'Contact'
    }
  }

  const authLabels = {
    hr: {
      login: 'Prijava',
      register: 'Registracija',
      logout: 'Odjava'
    },
    en: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 header-glass bg-slate-50/80 dark:bg-slate-50/80 text-slate-900 border-b border-slate-200/60 dark:border-slate-200/60 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex items-center justify-between py-2 sm:py-2.5">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-lg sm:text-xl hover:scale-110 hover:shadow-[0_6px_16px_rgba(110,68,255,0.4)] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(110, 68, 255, 0.3)',
            }}
          >
            ✨
          </div>
          <span 
            className="font-bold text-slate-800"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              letterSpacing: '-0.02em'
            }}
          >
            Ani's Studio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {(['lrc', 'interiors', 'webAtelier', 'about', 'contact'] as const).map((key) => {
            if (key === 'lrc') {
              return (
                <Link
                  key={key}
                  to="/lrc"
                  className="relative text-[15px] font-medium py-2 transition-colors duration-200 text-slate-800 hover:text-violet-700"
                >
                  <span className="after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[--color-primary] after:transition-[width] after:duration-300 hover:after:w-full">
                    {navigation[language][key]}
                  </span>
                </Link>
              )
            }
            return (
              <button
                key={key}
                onClick={() => scrollToSection(key === "webAtelier" ? "web-atelier" : key)}
                className="relative text-[15px] font-medium py-2 transition-colors duration-200 text-slate-800 hover:text-violet-700"
              >
                <span className="after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[--color-primary] after:transition-[width] after:duration-300 hover:after:w-full">
                  {navigation[language][key]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right side - Auth, Cart, Language */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Auth Buttons - Desktop */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => navigate('/admin/login')}
                className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-[rgba(110,68,255,0.05)] text-slate-800 hover:text-violet-700"
                aria-label={authLabels[language].login}
              >
                {authLabels[language].login}
              </button>
              <button
                onClick={() => openModal('register')}
                className="px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                  boxShadow: '0 2px 8px rgba(110, 68, 255, 0.3)'
                }}
                aria-label={authLabels[language].register}
              >
                {authLabels[language].register}
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="hidden sm:block px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-[rgba(110,68,255,0.05)] text-slate-800 hover:text-violet-700"
              aria-label={authLabels[language].logout}
            >
              {authLabels[language].logout}
            </button>
          )}

          {/* Cart Button - Elegant Design */}
          <button 
            onClick={onCartClick} 
            className="relative group p-2 sm:p-2.5 transition-all duration-300 rounded-xl hover:bg-gradient-to-br hover:from-[rgba(110,68,255,0.08)] hover:to-[rgba(189,166,255,0.08)] hover:shadow-md hover:scale-105 active:scale-95 hover:-translate-y-0.5 text-slate-800" 
            aria-label={language === 'hr' ? 'Košarica' : 'Shopping cart'}
            style={{
              background: cartItemCount > 0 ? 'linear-gradient(135deg, rgba(110,68,255,0.06) 0%, rgba(189,166,255,0.06) 100%)' : 'transparent'
            }}
          >
            {/* Shopping Cart Icon - Elegant Design */}
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-[--color-primary] cart-icon-float" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              {/* Shopping Cart Body */}
              <path 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.4 2.925-6.346a48.524 48.524 0 00-8.563-1.593M12 3v6m0 0v6m0-6h6m-6 0H6"
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:stroke-[--color-primary] transition-colors duration-300"
                style={{ stroke: 'currentColor', opacity: 0.7 }}
              />
              
              {/* Cart Wheels - Left */}
              <g className="cart-wheel-left">
                <circle 
                  cx="7" 
                  cy="20" 
                  r="2.2" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="group-hover:stroke-[--color-primary] transition-colors duration-300 cart-wheel"
                  style={{ opacity: 0.6 }}
                />
                <circle 
                  cx="7" 
                  cy="20" 
                  r="0.8" 
                  fill="currentColor"
                  className="group-hover:fill-[--color-primary] transition-colors duration-300"
                  style={{ opacity: 0.7 }}
                />
              </g>
              
              {/* Cart Wheels - Right */}
              <g className="cart-wheel-right">
                <circle 
                  cx="17" 
                  cy="20" 
                  r="2.2" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="group-hover:stroke-[--color-primary] transition-colors duration-300 cart-wheel"
                  style={{ opacity: 0.6 }}
                />
                <circle 
                  cx="17" 
                  cy="20" 
                  r="0.8" 
                  fill="currentColor"
                  className="group-hover:fill-[--color-primary] transition-colors duration-300"
                  style={{ opacity: 0.7 }}
                />
              </g>
              
              {/* Animated Items in Cart - Subtle */}
              {cartItemCount > 0 && (
                <>
                  <circle cx="9" cy="10" r="1.2" fill="currentColor" className="cart-item-1" style={{ opacity: 0.6 }} />
                  <circle cx="13" cy="9" r="1.2" fill="currentColor" className="cart-item-2" style={{ opacity: 0.6 }} />
                  <circle cx="16" cy="11" r="1.2" fill="currentColor" className="cart-item-3" style={{ opacity: 0.6 }} />
                </>
              )}
            </svg>
            
            {/* Badge - Elegant Design */}
            {cartItemCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center px-1.5 text-[10px] font-extrabold text-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-cart-badge z-10"
                style={{
                  background: "linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)",
                  boxShadow: "0 2px 8px rgba(255, 71, 87, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.9)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
            
            {/* Subtle Pulse effect */}
            {cartItemCount > 0 && (
              <span 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cart-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(110, 68, 255, 0.12) 0%, transparent 70%)",
                }}
              />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden min-[360px]:flex rounded-full border border-violet-200/60 bg-white/70 dark:bg-white/70 px-3 py-1 shadow-sm hover:bg-violet-50 transition"
          >
            <span className="text-xs font-medium text-slate-800">
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </span>
          </button>

          {/* Language Toggle */}
          <div
            className="hidden min-[360px]:flex items-center backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "12px",
              padding: "3px",
              gap: "4px",
              border: "1px solid rgba(110, 68, 255, 0.15)",
            }}
          >
            {(["hr", "en"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => onLanguageChange(lng)}
                className="sm:px-4 sm:py-1.5 sm:text-sm"
                style={{
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  transition: "all 200ms ease",
                  border: "none",
                  cursor: "pointer",
                  background: language === lng ? "linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)" : "transparent",
                  boxShadow: language === lng ? "0 2px 8px rgba(110, 68, 255, 0.3)" : "none",
                }}
                aria-label={language === lng ? (language === 'hr' ? 'Odabran hrvatski' : 'Selected English') : (lng === 'hr' ? 'Prebaci na hrvatski' : 'Switch to English')}
                aria-pressed={language === lng}
              >
                <span
                  className={
                    language === lng
                      ? "text-sm font-semibold text-white"
                      : "text-sm font-semibold text-slate-800 dark:text-slate-400"
                  }
                >
                  {lng.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Touch-friendly */}
          <button 
            onClick={() => setIsMobileMenuOpen((v) => !v)} 
            className="md:hidden mobile-menu-button p-2.5 active:scale-95 transition-all rounded-lg hover:bg-[rgba(110,68,255,0.05)] active:bg-[rgba(110,68,255,0.1)] text-slate-800 hover:text-violet-700" 
            aria-label={language === 'hr' ? 'Otvorite meni' : 'Toggle menu'}
            aria-expanded={isMobileMenuOpen}
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Touch-friendly */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t py-3 sm:py-4 backdrop-blur-sm mobile-menu-enter border-slate-200/60 bg-white/95 dark:bg-white/95">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col gap-2">
            {(['lrc', 'interiors', 'webAtelier', 'about', 'contact'] as const).map((key) => {
              if (key === 'lrc') {
                return (
                  <Link
                    key={key}
                    to="/lrc"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-menu-item text-left px-3 py-2.5 active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg font-medium text-slate-800 hover:text-violet-700 active:text-violet-700"
                    style={{ minHeight: '48px' }}
                  >
                    {navigation[language][key]}
                  </Link>
                )
              }
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key === "webAtelier" ? "web-atelier" : key)}
                  className="mobile-menu-item text-left px-3 py-2.5 active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg font-medium text-slate-800 hover:text-violet-700 active:text-violet-700"
                  style={{ minHeight: '48px' }}
                >
                  {navigation[language][key]}
                </button>
              )
            })}
            {/* Mobile Auth Buttons - Touch-friendly */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-3 sm:pt-4 border-t mt-1 border-slate-200/60">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="mobile-menu-item text-left px-4 py-3 text-sm font-medium active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg text-slate-800 hover:text-violet-700 active:text-violet-700"
                  style={{ minHeight: '48px' }}
                >
                  {authLabels[language].login}
                </button>
                <button
                  onClick={() => openModal('register')}
                  className="mobile-menu-item text-left px-4 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-200 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                    boxShadow: '0 2px 8px rgba(110, 68, 255, 0.3)',
                    minHeight: '48px'
                  }}
                >
                  {authLabels[language].register}
                </button>
              </div>
            ) : (
              <button
                onClick={logout}
                className="mobile-menu-item text-left px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg text-slate-800 hover:text-violet-700 active:text-violet-700"
                style={{ minHeight: '48px' }}
              >
                {authLabels[language].logout}
              </button>
            )}
          </nav>
        </div>
      )}

      <style>{`
        .cart-icon-float {
          transform-origin: center;
        }
        
        .group:hover .cart-icon-float {
          animation: cart-float 2s ease-in-out infinite;
        }
        
        @keyframes cart-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
        }
        
        .cart-wheel {
          transform-origin: center;
          animation: wheel-rotate 1.5s linear infinite;
          animation-play-state: paused;
        }
        
        .group:hover .cart-wheel {
          animation-play-state: running;
        }
        
        @keyframes wheel-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .cart-item-1 {
          animation: item-bounce 1.8s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .cart-item-2 {
          animation: item-bounce 1.8s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        .cart-item-3 {
          animation: item-bounce 1.8s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        
        @keyframes item-bounce {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-2px) scale(1.05); opacity: 0.7; }
        }
        
        @keyframes cart-badge-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes cart-pulse {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-cart-badge {
          animation: cart-badge-bounce 0.6s ease-out;
        }
        
        .cart-pulse {
          animation: cart-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .cart-icon-float,
          .cart-wheel,
          .cart-item-1,
          .cart-item-2,
          .cart-item-3,
          .animate-cart-badge,
          .cart-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  )
}