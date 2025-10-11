import { useState, useEffect } from 'react'
import Header from './components/Header.tsx'
import HeroSection from './components/HeroSection.tsx'
import LRCSection from './components/LRCSection.tsx'
import InteriorsSection from './components/InteriorsSection.tsx'
import WebAtelierSection from './components/WebAtelierSection.tsx'
import AboutSection from './components/AboutSection.tsx'
import ContactSection from './components/ContactSection.tsx'
import Footer from './components/Footer.tsx'
import CartDrawer from './components/CartDrawer.tsx'
import { getCart, removeFromCart, updateCartItemQuantity, type CartItem } from './lib/cart'
import { createCheckoutSession, cartItemsToStripeItems } from './lib/stripe'

export default function App() {
  const [language, setLanguage] = useState<'hr' | 'en'>(() => {
    return (localStorage.getItem('language') as 'hr' | 'en') || 'hr'
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart())
    }
    
    updateCart()
    window.addEventListener('cartUpdated', updateCart)
    
    return () => window.removeEventListener('cartUpdated', updateCart)
  }, [])

  const handleCheckout = async () => {
    try {
      const stripeItems = cartItemsToStripeItems(cartItems)
      const sessionId = await createCheckoutSession({
        items: stripeItems,
        success_url: `${window.location.origin}/checkout-success`,
        cancel_url: `${window.location.origin}`,
        metadata: {
          language: language
        }
      })
      console.log('Checkout session created:', sessionId)
      alert(language === 'hr' 
        ? 'Preusmjeravanje na Stripe...'
        : 'Redirecting to Stripe...')
    } catch (error) {
      console.error('Checkout error:', error)
      alert(language === 'hr' 
        ? 'Došlo je do greške pri plaćanju. Molimo pokušajte ponovno.'
        : 'An error occurred during checkout. Please try again.')
    }
  }

  const scrollToWebAtelier = () => {
    const section = document.getElementById('web-atelier')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const section = document.getElementById('contact')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="epoxy-background">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <section className="section">
          <div className="container">
            <HeroSection 
              language={language}
              onExploreOffers={scrollToWebAtelier}
              onRequestQuote={scrollToContact}
            />
          </div>
        </section>
        
        <section id="lrc" className="section" style={{ scrollMarginTop: '80px' }}>
          <div className="container">
            <LRCSection language={language} />
          </div>
        </section>
        
        <section id="interiors" className="section" style={{ scrollMarginTop: '80px' }}>
          <div className="container">
            <InteriorsSection language={language} />
          </div>
        </section>
        
        <section id="web-atelier" className="section" style={{ scrollMarginTop: '80px' }}>
          <div className="container">
            <WebAtelierSection language={language} />
          </div>
        </section>
        
        <section id="about" className="section" style={{ scrollMarginTop: '80px' }}>
          <div className="container">
            <AboutSection language={language} />
          </div>
        </section>
        
        <section id="contact" className="section" style={{ scrollMarginTop: '80px' }}>
          <div className="container">
            <ContactSection language={language} />
          </div>
        </section>
      </main>

      <Footer language={language} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        language={language}
      />
    </div>
  )
}
