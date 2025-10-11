// Cart types and utilities

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  tags: string[]
}

const CART_KEY = 'anis_cart_v1'

// Get cart from localStorage
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Save cart to localStorage
function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save cart:', error)
  }
}

// Add item to cart
export function addToCart(item: Omit<CartItem, 'quantity'>): CartItem[] {
  const cart = getCart()
  const existingItem = cart.find(cartItem => cartItem.id === item.id)
  
  let updatedCart: CartItem[]
  
  if (existingItem) {
    updatedCart = cart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  } else {
    updatedCart = [...cart, { ...item, quantity: 1 }]
  }
  
  saveCart(updatedCart)
  return updatedCart
}

// Remove item from cart completely
export function removeFromCart(itemId: string): CartItem[] {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.id !== itemId)
  saveCart(updatedCart)
  return updatedCart
}

// Update item quantity
export function updateCartItemQuantity(itemId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(itemId)
  }
  
  const cart = getCart()
  const updatedCart = cart.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  )
  
  saveCart(updatedCart)
  return updatedCart
}

// Clear entire cart
export function clearCart(): CartItem[] {
  saveCart([])
  return []
}

// Calculate cart totals
export function calculateCartTotal(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}
