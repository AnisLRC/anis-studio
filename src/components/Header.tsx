import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUi } from '../providers/UiProvider'

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
    <header className="sticky top-0 z-50 header-glass">
      <nav className="Section flex items-center justify-between py-5 sm:py-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 4px 12px rgba(110, 68, 255, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          className="hover:scale-110 hover:shadow-[0_6px_16px_rgba(110,68,255,0.4)]"
          >
            ✨
          </div>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#2E2447',
            letterSpacing: '-0.02em'
          }}>
            Ani's Studio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {(['lrc', 'interiors', 'webAtelier', 'about', 'contact'] as const).map((key) => (
            <button
              key={key}
              onClick={() => scrollToSection(key === "webAtelier" ? "web-atelier" : key)}
              className="relative text-[15px] font-medium text-[#5A4A6B] py-2 transition-colors duration-200 hover:text-[--color-primary]"
            >
              <span className="after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[--color-primary] after:transition-[width] after:duration-300 hover:after:w-full">
                {navigation[language][key]}
              </span>
            </button>
          ))}
        </div>

        {/* Right side - Auth, Cart, Language */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Auth Buttons - Desktop */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => openModal('login')}
                className="px-4 py-2 text-sm font-medium text-[#5A4A6B] hover:text-[--color-primary] transition-colors duration-200 rounded-lg hover:bg-[rgba(110,68,255,0.05)]"
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
              className="hidden sm:block px-4 py-2 text-sm font-medium text-[#5A4A6B] hover:text-[--color-primary] transition-colors duration-200 rounded-lg hover:bg-[rgba(110,68,255,0.05)]"
              aria-label={authLabels[language].logout}
            >
              {authLabels[language].logout}
            </button>
          )}

          {/* Cart Button - Elegant Design */}
          <button 
            onClick={onCartClick} 
            className="relative group p-2.5 text-[#5A4A6B] transition-all duration-300 rounded-xl hover:bg-gradient-to-br hover:from-[rgba(110,68,255,0.08)] hover:to-[rgba(189,166,255,0.08)] hover:shadow-md hover:scale-105 active:scale-95 hover:-translate-y-0.5" 
            aria-label={language === 'hr' ? 'Košarica' : 'Shopping cart'}
            style={{
              background: cartItemCount > 0 ? 'linear-gradient(135deg, rgba(110,68,255,0.06) 0%, rgba(189,166,255,0.06) 100%)' : 'transparent'
            }}
          >
            {/* Shopping Cart Icon - Elegant Design */}
            <svg 
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-[--color-primary] cart-icon-float" 
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

          {/* Language Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              borderRadius: "12px",
              padding: "4px",
              gap: "4px",
              border: "1px solid rgba(110, 68, 255, 0.15)",
            }}
          >
            {(["hr", "en"] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => onLanguageChange(lng)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  transition: "all 200ms ease",
                  border: "none",
                  cursor: "pointer",
                  background: language === lng ? "linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)" : "transparent",
                  color: language === lng ? "#FFFFFF" : "#5A4A6B",
                  boxShadow: language === lng ? "0 2px 8px rgba(110, 68, 255, 0.3)" : "none",
                }}
                aria-label={language === lng ? (language === 'hr' ? 'Odabran hrvatski' : 'Selected English') : (lng === 'hr' ? 'Prebaci na hrvatski' : 'Switch to English')}
                aria-pressed={language === lng}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Touch-friendly */}
          <button 
            onClick={() => setIsMobileMenuOpen((v) => !v)} 
            className="md:hidden mobile-menu-button p-2.5 text-[#5A4A6B] hover:text-[--color-primary] active:scale-95 transition-all rounded-lg hover:bg-[rgba(110,68,255,0.05)] active:bg-[rgba(110,68,255,0.1)]" 
            aria-label={language === 'hr' ? 'Otvorite meni' : 'Toggle menu'}
            aria-expanded={isMobileMenuOpen}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
        <div className="md:hidden border-t border-white/20 py-4 bg-white/95 backdrop-blur-sm mobile-menu-enter">
          <nav className="Section flex flex-col gap-2">
            {(['lrc', 'interiors', 'webAtelier', 'about', 'contact'] as const).map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key === "webAtelier" ? "web-atelier" : key)}
                className="mobile-menu-item text-left text-[#5A4A6B] hover:text-[--color-primary] active:text-[--color-primary] active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg font-medium"
                style={{ minHeight: '48px' }}
              >
                {navigation[language][key]}
              </button>
            ))}
            {/* Mobile Auth Buttons - Touch-friendly */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                <button
                  onClick={() => openModal('login')}
                  className="mobile-menu-item text-left px-4 py-3 text-sm font-medium text-[#5A4A6B] hover:text-[--color-primary] active:text-[--color-primary] active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg"
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
                className="mobile-menu-item text-left px-4 py-3 text-sm font-medium text-[#5A4A6B] hover:text-[--color-primary] active:text-[--color-primary] active:bg-[rgba(110,68,255,0.05)] transition-all rounded-lg"
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