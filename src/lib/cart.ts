// Cart types and utilities

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  tags?: string[]
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
}

// SSR-safe localStorage helpers
const CART_KEY = 'anis_cart_v1'

function isClient(): boolean {
  return typeof window !== 'undefined'
}

export function getCart(): CartItem[] {
  if (!isClient()) return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]): void {
  if (!isClient()) return
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }))
  } catch (err) {
    console.error('Failed to save cart:', err)
  }
}

export function calculateCartTotal(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export function addToCart(item: Omit<CartItem, 'quantity'>, qty = 1): CartItem[] {
  const currentCart = getCart()
  const existingItem = currentCart.find(cartItem => cartItem.id === item.id)
  
  let updatedCart: CartItem[]
  if (existingItem) {
    updatedCart = currentCart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + qty }
        : cartItem
    )
  } else {
    updatedCart = [...currentCart, { ...item, quantity: qty }]
  }
  
  saveCart(updatedCart)
  return updatedCart
}

export function removeFromCart(itemId: string): CartItem[] {
  const currentCart = getCart()
  const updatedCart = currentCart.filter(item => item.id !== itemId)
  saveCart(updatedCart)
  return updatedCart
}

export function updateQuantity(itemId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(itemId)
  }
  
  const currentCart = getCart()
  const updatedCart = currentCart.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  )
  saveCart(updatedCart)
  return updatedCart
}

export function clearCart(): CartItem[] {
  saveCart([])
  return []
}

export function subtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// Helper for creating CartState from items
export function createCartState(items: CartItem[]): CartState {
  const { total, itemCount } = calculateCartTotal(items)
  return { items, total, itemCount }
}
