import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { CartItem } from '../lib/cart'
import { getCart, addToCart as addToCartLib, removeFromCart as removeFromCartLib, updateCartItemQuantity, clearCart as clearCartLib } from '../lib/cart'

interface CartContextType {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>) => void
  remove: (itemId: string) => void
  clear: () => void
  updateQuantity: (itemId: string, quantity: number) => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // SSR-safe: Load cart only in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setItems(getCart())
      
      const handleCartUpdate = () => {
        setItems(getCart())
      }
      
      window.addEventListener('cartUpdated', handleCartUpdate)
      return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const add = (item: Omit<CartItem, 'quantity'>) => {
    addToCartLib(item)
    setItems(getCart())
  }

  const remove = (itemId: string) => {
    removeFromCartLib(itemId)
    setItems(getCart())
  }

  const clear = () => {
    clearCartLib()
    setItems([])
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    updateCartItemQuantity(itemId, quantity)
    setItems(getCart())
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, clear, updateQuantity, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

