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
      overflow: 'hidden'
    }}>
      {/* Additional Epoxy Blobs for Hero */}
      <div className="epoxy-blob" style={{ 
        width: '400px', 
        height: '400px', 
        top: '20%', 
        right: '10%',
        animationDelay: '2s'
      }}></div>
      <div className="epoxy-blob" style={{ 
        width: '300px', 
        height: '300px', 
        bottom: '30%', 
        left: '5%',
        animationDelay: '6s'
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
                fontSize: 'clamp(var(--text-3xl), 5vw, var(--text-6xl))',
                fontWeight: '700',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-lg)',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
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
                fontSize: 'var(--text-xl)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--clr-text-light)',
                marginBottom: 'var(--space-2xl)',
                maxWidth: '800px',
                margin: '0 auto var(--space-2xl)'
              }}
            >
              {translations.subtitle[language]}
            </motion.p>

            {/* Artistic Slogan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                marginBottom: 'var(--space-3xl)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                flexWrap: 'wrap'
              }}>
                {sloganWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + (index * 0.1),
                      ease: 'easeOut'
                    }}
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: index === 0 ? '300' : index === 1 ? '500' : '700',
                      color: 'var(--clr-text)',
                      position: 'relative',
                      display: 'inline-block'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(189, 166, 255, 0.5)'
                    }}
                  >
                    {word}
                    {index < sloganWords.length - 1 && (
                      <span style={{ marginLeft: 'var(--space-sm)' }}>•</span>
                    )}
                  </motion.span>
                ))}
              </div>
              
              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
                style={{
                  height: '2px',
                  background: 'var(--gradient-primary)',
                  margin: 'var(--space-lg) auto 0',
                  maxWidth: '200px',
                  borderRadius: 'var(--radius-full)'
                }}
              />
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
                  boxShadow: '0 20px 40px rgba(110, 68, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreOffers}
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg) var(--space-2xl)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                {translations.exploreOffers[language]}
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: 'var(--clr-glass-hover)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestQuote}
                className="glass-panel"
                style={{
                  border: '2px solid var(--clr-primary)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg) var(--space-2xl)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: 'var(--clr-primary)',
                  background: 'var(--clr-glass)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
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


