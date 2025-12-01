interface WelcomeSectionProps {
  language?: 'hr' | 'en'
}

export default function WelcomeSection({ language = 'hr' }: WelcomeSectionProps) {
  const translations = {
    slogan: {
      hr: "Svaka ideja je Bitna!",
      en: "Every idea Matters!"
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
      className="relative min-h-[60vh] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-b from-violet-50 via-white to-violet-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50"
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
        <h1 className="hero-slogan mb-6 sm:mb-8">
          <span 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
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
            className="hero-star text-3xl sm:text-4xl md:text-5xl lg:text-6xl ml-2 sm:ml-3"
            aria-hidden="true"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(110, 68, 255, 0.5))'
            }}
          >
            ✨
          </span>
        </h1>

        {/* Tri CTA gumba - Mobile-First */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 w-full sm:w-auto">
          {/* LRC Shop */}
          <button
            onClick={() => scrollToSection('lrc')}
            className="hero-button glass-morphism px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 group w-full sm:w-auto text-slate-800 dark:text-slate-50"
            style={{
              minWidth: '160px',
              minHeight: '44px'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">🎨</span>
              <span>{translations.buttons[language].lrc}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          {/* Interijeri */}
          <button
            onClick={() => scrollToSection('interiors')}
            className="hero-button glass-morphism px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 group w-full sm:w-auto text-slate-800 dark:text-slate-50"
            style={{
              minWidth: '160px',
              minHeight: '44px'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">🏠</span>
              <span>{translations.buttons[language].interiors}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          {/* Web Atelier */}
          <button
            onClick={() => scrollToSection('web-atelier')}
            className="hero-button glass-morphism px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 group w-full sm:w-auto text-slate-800 dark:text-slate-50"
            style={{
              minWidth: '160px',
              minHeight: '44px'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">💻</span>
              <span>{translations.buttons[language].webAtelier}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator (opcionalno) */}
      <div 
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ animation: 'float 2s ease-in-out infinite' }}
      >
        <div className="w-6 h-10 border-2 border-[rgba(110,68,255,0.3)] dark:border-[rgba(189,166,255,0.4)] rounded-full flex items-start justify-center p-2">
          <div 
            className="w-1.5 h-3 bg-[rgba(110,68,255,0.5)] dark:bg-[rgba(189,166,255,0.6)] rounded-full"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
