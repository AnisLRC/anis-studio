import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import LRCSection from './components/LRCSection'
import Header from './components/Header'

export default function App() {
  const [language, setLanguage] = useState<'hr' | 'en'>('hr')
  const [cartItemCount, setCartItemCount] = useState(0)

  const handleLanguageChange = (newLanguage: 'hr' | 'en') => {
    setLanguage(newLanguage)
  }

  const handleExploreOffers = () => {
    const lrcSection = document.querySelector('#lrc')
    if (lrcSection) {
      lrcSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRequestQuote = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCartClick = () => {
    // Handle cart drawer opening
    console.log('Cart clicked')
  }

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItemCount(cart.length)
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    handleCartUpdate() // Initial load
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  return (
    <>
      <Header 
        language={language}
        onLanguageChange={handleLanguageChange}
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
      />
      
      <HeroSection 
        language={language}
        onExploreOffers={handleExploreOffers}
        onRequestQuote={handleRequestQuote}
      />
      
      <LRCSection language={language} />
      
      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            O studiju
          </h2>
          <p className="text-white/85 max-w-3xl">
            Spajamo ručni rad i moderne tehnologije: epoxy i drvene suvenire,
            3D vizualizacije interijera i web stranice s fokusom na estetiku i prodaju.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="badge">epoxy</span>
            <span className="badge">wood</span>
            <span className="badge">3D interijer</span>
            <span className="badge">web dizajn</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Kontakt
          </h2>
          <p className="text-white/80 mb-6">Opiši ideju i javit ćemo se s prijedlogom i cijenom.</p>

          <form className="space-y-4">
            <input
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              placeholder="Ime i prezime"
              type="text"
              name="name"
            />
            <input
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              placeholder="Email"
              type="email"
              name="email"
            />
            <textarea
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-white/60"
              placeholder="Poruka"
              name="message"
            />
            <button className="btn btn-primary" type="submit">Pošalji upit</button>
          </form>
        </div>
      </section>
    </>
  )
}
