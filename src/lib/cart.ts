// Cart types and utilities

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  tags: string[]
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

const KEY = "anis_cart_v1"

export function calculateCartTotal(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export function addToCart(item: Omit<CartItem, 'quantity'>): CartItem[] {
  const currentCart = getCart()
  const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id)
  
  if (existingItemIndex !== -1) {
    currentCart[existingItemIndex].quantity += 1
  } else {
    currentCart.push({ ...item, quantity: 1 })
  }
  
  saveCart(currentCart)
  return currentCart
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
  const itemIndex = currentCart.findIndex(item => item.id === itemId)
  
  if (itemIndex !== -1) {
    currentCart[itemIndex].quantity = quantity
    saveCart(currentCart)
  }
  
  return currentCart
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function clearCart(): CartItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify([]))
  }
  return []
}

function saveCart(items: CartItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(items))
  }
}
