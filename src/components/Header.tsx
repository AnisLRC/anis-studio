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
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/crystal.svg" 
              alt="Ani's Studio" 
              className="w-8 h-8"
            />
            <span className="font-heading text-xl font-semibold text-primary">
              Ani's Studio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('lrc')}
              className="text-text hover:text-primary transition-colors"
            >
              {navigation[language].lrc}
            </button>
            <button 
              onClick={() => scrollToSection('interiors')}
              className="text-text hover:text-primary transition-colors"
            >
              {navigation[language].interiors}
            </button>
            <button 
              onClick={() => scrollToSection('web-atelier')}
              className="text-text hover:text-primary transition-colors"
            >
              {navigation[language].webAtelier}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-text hover:text-primary transition-colors"
            >
              {navigation[language].about}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-text hover:text-primary transition-colors"
            >
              {navigation[language].contact}
            </button>
          </nav>

          {/* Right side - Cart and Language */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative p-2 text-text hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-glass rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('hr')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  language === 'hr' 
                    ? 'bg-primary text-white' 
                    : 'text-text hover:text-primary'
                }`}
              >
                HR
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  language === 'en' 
                    ? 'bg-primary text-white' 
                    : 'text-text hover:text-primary'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('lrc')}
                className="text-left text-text hover:text-primary transition-colors py-2"
              >
                {navigation[language].lrc}
              </button>
              <button 
                onClick={() => scrollToSection('interiors')}
                className="text-left text-text hover:text-primary transition-colors py-2"
              >
                {navigation[language].interiors}
              </button>
              <button 
                onClick={() => scrollToSection('web-atelier')}
                className="text-left text-text hover:text-primary transition-colors py-2"
              >
                {navigation[language].webAtelier}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-text hover:text-primary transition-colors py-2"
              >
                {navigation[language].about}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-text hover:text-primary transition-colors py-2"
              >
                {navigation[language].contact}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
