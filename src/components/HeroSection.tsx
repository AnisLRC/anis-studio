import { motion } from 'framer-motion'

interface HeroSectionProps {
  language: 'hr' | 'en'
  onExploreOffers: () => void
  onRequestQuote: () => void
}

export default function HeroSection({ language, onExploreOffers, onRequestQuote }: HeroSectionProps) {
  const translations = {
    title: {
      hr: "Ani's Studio — Ručno izrađena umjetnost, interijeri i digitalni dizajn na jednom mjestu.",
      en: "Ani's Studio — Handmade art, interiors & digital design in one place."
    },
    subtitle: {
      hr: "Fuzija zanatskih vještina i moderne tehnologije — suveniri, 3D interijeri i web stranice koje prodaju.",
      en: "A fusion of craftsmanship and modern technology — souvenirs, 3D interiors, and websites that sell."
    },
    slogan: {
      hr: "Svaka Ideja je Bitna!",
      en: "Every Idea Matters!"
    },
    exploreOffers: {
      hr: "Pogledaj ponudu",
      en: "Explore Offers"
    },
    requestQuote: {
      hr: "Zatraži ponudu",
      en: "Request a Quote"
    }
  }

  const sloganWords = translations.slogan[language].split(' ')

  return (
    <section id="hero" className="section" style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 30% 50%, rgba(189, 166, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(110, 68, 255, 0.1) 0%, transparent 50%)',
      paddingTop: '80px'
    }}>
      {/* Floating Crystal Decorations */}
      <div style={{ 
        position: 'absolute',
        width: '400px', 
        height: '400px', 
        top: '15%', 
        right: '10%',
        background: 'radial-gradient(circle, rgba(189, 166, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '0s',
        pointerEvents: 'none'
      }}></div>
      <div style={{ 
        position: 'absolute',
        width: '350px', 
        height: '350px', 
        bottom: '20%', 
        left: '8%',
        background: 'radial-gradient(circle, rgba(110, 68, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 10s ease-in-out infinite',
        animationDelay: '2s',
        pointerEvents: 'none'
      }}></div>

      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'var(--space-4xl)',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                lineHeight: '1.2',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
                color: '#2E2447',
                textAlign: 'center',
                letterSpacing: '-0.02em'
              }}
            >
              {translations.title[language]}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.6',
                color: '#5A4A6B',
                marginBottom: '3rem',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              {translations.subtitle[language]}
            </motion.p>

            {/* Artistic Slogan with Shimmer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                marginBottom: '3rem',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.15) 0%, rgba(110, 68, 255, 0.15) 100%)',
                borderRadius: '999px',
                border: '2px solid rgba(110, 68, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Shimmer Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  animation: 'shimmer 3s infinite',
                  pointerEvents: 'none'
                }}></div>
                
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  fontFamily: 'Poppins, sans-serif',
                  background: 'linear-gradient(135deg, #6E44FF 0%, #BDA6FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  position: 'relative',
                  zIndex: 1
                }}>
                  ✨ {translations.slogan[language]} ✨
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                display: 'flex',
                gap: 'var(--space-lg)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(110, 68, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreOffers}
                style={{
                  background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(110, 68, 255, 0.3)',
                  transition: 'all 300ms ease',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {translations.exploreOffers[language]}
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(110, 68, 255, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestQuote}
                style={{
                  border: '2px solid #6E44FF',
                  borderRadius: '16px',
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#6E44FF',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'all 300ms ease',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {translations.requestQuote[language]}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              position: 'absolute',
              top: '20%',
              right: '5%',
              width: '100px',
              height: '100px',
              background: 'var(--gradient-epoxy)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-4xl)',
              filter: 'blur(1px)',
              opacity: 0.3
            }}
          >
            🎨
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: '80px',
              height: '80px',
              background: 'var(--gradient-epoxy)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              filter: 'blur(1px)',
              opacity: 0.3
            }}
          >
            ✨
          </motion.div>
        </div>
      </div>
    </section>
  )
}


