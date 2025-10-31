interface WelcomeSectionProps {
  language?: 'hr' | 'en'
}

export default function WelcomeSection({ language = 'hr' }: WelcomeSectionProps) {
  const translations = {
    slogan: {
      hr: "Svaka ideja je bitna",
      en: "Every idea matters"
    },
    buttons: {
      hr: {
        lrc: "LRC Shop",
        interiors: "Interijeri",
        webAtelier: "Web Atelier"
      },
      en: {
        lrc: "LRC Shop",
        interiors: "Interiors",
        webAtelier: "Web Atelier"
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="welcome" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(1200px 800px at 50% 20%, rgba(110, 68, 255, 0.08), transparent 70%),
          radial-gradient(1000px 600px at 80% 80%, rgba(189, 166, 255, 0.06), transparent 60%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 246, 255, 0.98) 100%)
        `
      }}
    >
      {/* Particle efekti pozadine */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Glavni sadržaj */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Dinamički slogan */}
        <h1 className="hero-slogan mb-8 sm:mb-12">
          <span 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #6E44FF 0%, #BDA6FF 50%, #6E44FF 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            {translations.slogan[language]}
          </span>
          <span 
            className="hero-star text-4xl sm:text-5xl md:text-6xl lg:text-7xl ml-2 sm:ml-3"
            aria-hidden="true"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(110, 68, 255, 0.5))'
            }}
          >
            ✨
          </span>
        </h1>

        {/* Tri CTA gumba - Mobile-First */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 w-full sm:w-auto">
          {/* LRC Shop */}
          <button
            onClick={() => scrollToSection('lrc')}
            className="hero-button glass-morphism px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 group w-full sm:w-auto"
            style={{
              minWidth: '180px',
              minHeight: '48px',
              color: '#2E2447'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">🎨</span>
              <span>{translations.buttons[language].lrc}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          {/* Interijeri */}
          <button
            onClick={() => scrollToSection('interiors')}
            className="hero-button glass-morphism px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 group w-full sm:w-auto"
            style={{
              minWidth: '180px',
              minHeight: '48px',
              color: '#2E2447'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">🏠</span>
              <span>{translations.buttons[language].interiors}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          {/* Web Atelier */}
          <button
            onClick={() => scrollToSection('web-atelier')}
            className="hero-button glass-morphism px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 group w-full sm:w-auto"
            style={{
              minWidth: '180px',
              minHeight: '48px',
              color: '#2E2447'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">💻</span>
              <span>{translations.buttons[language].webAtelier}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator (opcionalno) */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ animation: 'float 2s ease-in-out infinite' }}
      >
        <div className="w-6 h-10 border-2 border-[rgba(110,68,255,0.3)] rounded-full flex items-start justify-center p-2">
          <div 
            className="w-1.5 h-3 bg-[rgba(110,68,255,0.5)] rounded-full"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
