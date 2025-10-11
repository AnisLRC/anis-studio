import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import LRCSection from './components/LRCSection'
import InteriorsSection from './components/InteriorsSection'
import WebAtelierSection from './components/WebAtelierSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { getCart, removeFromCart, updateQuantity, clearCart, calculateCartTotal, type CartItem } from './lib/cart'
import './App.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo')

export default function App() {
  const [language, setLanguage] = useState<'hr' | 'en'>(() => {
    const saved = localStorage.getItem('anis_language')
    return (saved === 'hr' || saved === 'en') ? saved : 'hr'
  })
  
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Load cart from localStorage
  useEffect(() => {
    loadCartFromStorage()
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartFromStorage()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('anis_language', language)
  }, [language])

  const loadCartFromStorage = () => {
    const items = getCart()
    const { total, itemCount } = calculateCartTotal(items)
    setCartItems(items)
    setCartTotal(total)
    setCartItemCount(itemCount)
  }

  const handleLanguageChange = (lang: 'hr' | 'en') => {
    setLanguage(lang)
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
    loadCartFromStorage()
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity)
    loadCartFromStorage()
  }

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) {
        console.error('Stripe not loaded')
        return
      }

      // In a real app, you would call your backend to create a Stripe checkout session
      // For demo purposes, we'll just show an alert
      const message = language === 'hr' 
        ? `Demo checkout: ${cartItemCount} artikala, ukupno €${cartTotal.toFixed(2)}\n\n(U produkcijskoj verziji, ovdje bi se otvorila Stripe naplata.)`
        : `Demo checkout: ${cartItemCount} items, total €${cartTotal.toFixed(2)}\n\n(In production, this would open Stripe payment.)`
      
      alert(message)
      
      // Clear cart after "purchase"
      clearCart()
      loadCartFromStorage()
      setIsCartOpen(false)
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  const handleExploreOffers = () => {
    const lrcSection = document.getElementById('lrc')
    if (lrcSection) {
      lrcSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRequestQuote = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="epoxy-background">
      {/* Epoxy background blobs */}
      <div className="epoxy-blob" />
      <div className="epoxy-blob" />
      <div className="epoxy-blob" />

      {/* Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
      />

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }}>
        <HeroSection
          language={language}
          onExploreOffers={handleExploreOffers}
          onRequestQuote={handleRequestQuote}
        />

        <LRCSection language={language} />

        <InteriorsSection language={language} />

        <WebAtelierSection language={language} />

        <AboutSection language={language} />

        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        total={cartTotal}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        language={language}
      />
    </div>
  )
}
