import { useThemeStore } from '../lib/theme.store'

interface WelcomeSectionProps {
  language?: 'hr' | 'en'
}

export default function WelcomeSection({ language = 'hr' }: WelcomeSectionProps) {
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'
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
      className={
        isDark
          ? 'relative min-h-[60vh] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
          : 'relative min-h-[60vh] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-b from-violet-50 via-white to-violet-50/70'
      }
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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-slate-900 dark:text-slate-50">
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

        {/* CTA kartice */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {/* LRC Shop */}
          <button
            type="button"
            onClick={() => scrollToSection('lrc')}
            className={
              "flex items-center gap-3 rounded-2xl px-6 py-4 border transition-transform duration-300 hover:scale-[1.02] " +
              (isDark
                ? "bg-slate-900 text-slate-50 border-violet-500 shadow-lg shadow-violet-900/50"
                : "bg-violet-50 text-violet-900 border-violet-400 shadow-xl shadow-violet-300"
              )
            }
          >
            <span className="text-2xl">🎨</span>
            <div className="flex flex-col items-start">
              <span 
                className="font-semibold"
                style={{ color: isDark ? '#f9fafb' : '#1f2933' }}
              >
                {translations.buttons[language].lrc}
              </span>
              <span 
                className="text-sm"
                style={{ color: isDark ? '#e5e7eb' : '#4b5563' }}
              >
                {language === 'hr' ? 'Ručno rađeni pokloni i dekoracije' : 'Handmade gifts and decor'}
              </span>
            </div>
          </button>

          {/* Interijeri */}
          <button
            type="button"
            onClick={() => scrollToSection('interiors')}
            className={
              "flex items-center gap-3 rounded-2xl px-6 py-4 border transition-transform duration-300 hover:scale-[1.02] " +
              (isDark
                ? "bg-slate-900 text-slate-50 border-violet-500 shadow-lg shadow-violet-900/50"
                : "bg-violet-50 text-violet-900 border-violet-400 shadow-xl shadow-violet-300"
              )
            }
          >
            <span className="text-2xl">🏠</span>
            <div className="flex flex-col items-start">
              <span 
                className="font-semibold"
                style={{ color: isDark ? '#f9fafb' : '#1f2933' }}
              >
                {translations.buttons[language].interiors}
              </span>
              <span 
                className="text-sm"
                style={{ color: isDark ? '#e5e7eb' : '#4b5563' }}
              >
                {language === 'hr' ? '3D vizualizacije i nacrti po mjeri' : '3D renders and custom designs'}
              </span>
            </div>
          </button>

          {/* Web Atelier */}
          <button
            type="button"
            onClick={() => scrollToSection('web-atelier')}
            className={
              "flex items-center gap-3 rounded-2xl px-6 py-4 border transition-transform duration-300 hover:scale-[1.02] " +
              (isDark
                ? "bg-slate-900 text-slate-50 border-violet-500 shadow-lg shadow-violet-900/50"
                : "bg-violet-50 text-violet-900 border-violet-400 shadow-xl shadow-violet-300"
              )
            }
          >
            <span className="text-2xl">💻</span>
            <div className="flex flex-col items-start">
              <span 
                className="font-semibold"
                style={{ color: isDark ? '#f9fafb' : '#1f2933' }}
              >
                {translations.buttons[language].webAtelier}
              </span>
              <span 
                className="text-sm"
                style={{ color: isDark ? '#e5e7eb' : '#4b5563' }}
              >
                {language === 'hr' ? 'Web stranice i online projekti po mjeri' : 'Websites and online projects'}
              </span>
            </div>
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
