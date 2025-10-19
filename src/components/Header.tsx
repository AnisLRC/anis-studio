import { useState } from 'react'

interface HeaderProps {
  language: 'hr' | 'en'
  onLanguageChange: (lang: 'hr' | 'en') => void
  cartItemCount: number
  onCartClick: () => void
}

export default function Header({ language, onLanguageChange, cartItemCount, onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              boxShadow: '0 4px 12px rgba(110, 68, 255, 0.3)'
            }}>
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
              className="relative text-[15px] font-medium text-[#2E2447] py-2"
            >
              <span className="after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[--color-primary] after:transition-[width] hover:after:w-full">
                {navigation[language][key]}
              </span>
            </button>
          ))}
        </div>

        {/* Right side - Cart and Language */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button onClick={onCartClick} className="relative p-2 text-[#2E2447] hover:text-[--color-primary] transition-colors" aria-label="Shopping cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[--color-primary] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
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
                  color: language === lng ? "#FFFFFF" : "#2E2447",
                  boxShadow: language === lng ? "0 2px 8px rgba(110, 68, 255, 0.3)" : "none",
                }}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen((v) => !v)} className="md:hidden p-2 text-[#2E2447] hover:text-[--color-primary] transition-colors" aria-label="Toggle mobile menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav> {/* ⟵ ovo je ispravno zatvaranje glavnog nav-a */}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 py-4">
          <nav className="Section flex flex-col gap-4">
            <button onClick={() => scrollToSection("lrc")} className="text-left text-[#2E2447] hover:text-[--color-primary] transition-colors py-2">
              {navigation[language].lrc}
            </button>
            <button onClick={() => scrollToSection("interiors")} className="text-left text-[#2E2447] hover:text-[--color-primary] transition-colors py-2">
              {navigation[language].interiors}
            </button>
            <button onClick={() => scrollToSection("web-atelier")} className="text-left text-[#2E2447] hover:text-[--color-primary] transition-colors py-2">
              {navigation[language].webAtelier}
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left text-[#2E2447] hover:text-[--color-primary] transition-colors py-2">
              {navigation[language].about}
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left text-[#2E2447] hover:text-[--color-primary] transition-colors py-2">
              {navigation[language].contact}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
