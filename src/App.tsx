import { useState } from 'react'
import Header from './components/Header'
import HomeHero from './sections/HomeHero'
import ProcessSection from './sections/ProcessSection'
import LRCSection from './components/LRCSection'
import InteriorsSection from './components/InteriorsSection'
import WebAtelierSection from './components/WebAtelierSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { useCart } from './lib/cart.store'
import { ErrorBoundary } from './ErrorBoundary'
import WelcomeSection from './sections/WelcomeSection'

export default function App() {
  const [language, setLanguage] = useState<'hr' | 'en'>(() => {
    return (localStorage.getItem('language') as 'hr' | 'en') || 'hr'
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartCount = useCart(s => s.totalQty)

  return (
    <div className="min-h-screen">
      <ErrorBoundary name="Header">
        <Header 
          language={language}
          onLanguageChange={setLanguage}
          cartItemCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      </ErrorBoundary>
      
      <main>
        <ErrorBoundary name="Hero">
          <HomeHero />
        </ErrorBoundary>
        
        <ErrorBoundary name="Welcome">
          <WelcomeSection />
        </ErrorBoundary>
        
        <ErrorBoundary name="LRC">
          <section id="lrc" className="Section">
            <LRCSection language={language} />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary name="Interijeri">
          <section id="interiors" className="Section">
            <InteriorsSection language={language} />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary name="WebAtelier">
          <section id="web-atelier" className="Section">
            <WebAtelierSection language={language} />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary name="Process">
          <ProcessSection />
        </ErrorBoundary>
        
        <ErrorBoundary name="ONama">
          <section id="about" className="Section">
            <AboutSection language={language} />
          </section>
        </ErrorBoundary>
        
        <ErrorBoundary name="Kontakt">
          <section id="contact" className="Section">
            <ContactSection language={language} />
          </section>
        </ErrorBoundary>
      </main>

      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>

      <ErrorBoundary name="CartDrawer">
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          language={language}
        />
      </ErrorBoundary>
    </div>
  )
}
