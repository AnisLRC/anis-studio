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

export function calculateCartTotal(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export function addToCart(cart: CartState, item: Omit<CartItem, 'quantity'>): CartState {
  const existingItem = cart.items.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    const updatedItems = cart.items.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
    const { total, itemCount } = calculateCartTotal(updatedItems)
    return { items: updatedItems, total, itemCount }
  } else {
    const newItem = { ...item, quantity: 1 }
    const updatedItems = [...cart.items, newItem]
    const { total, itemCount } = calculateCartTotal(updatedItems)
    return { items: updatedItems, total, itemCount }
  }
}

export function removeFromCart(cart: CartState, itemId: string): CartState {
  const updatedItems = cart.items.filter(item => item.id !== itemId)
  const { total, itemCount } = calculateCartTotal(updatedItems)
  return { items: updatedItems, total, itemCount }
}

export function updateQuantity(cart: CartState, itemId: string, quantity: number): CartState {
  if (quantity <= 0) {
    return removeFromCart(cart, itemId)
  }
  
  const updatedItems = cart.items.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  )
  const { total, itemCount } = calculateCartTotal(updatedItems)
  return { items: updatedItems, total, itemCount }
}


// src/lib/cart.ts
export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

const KEY = "anis_cart_v1";

export function getCart(): CartItem[] { /* ... */ }
export function addToCart(item: { id:string; title:string; price:number }, qty=1): CartItem[] { /* ... */ }
export function removeFromCart(id: string, qty=1): CartItem[] { /* ... */ }
export function clearCart(): CartItem[] { /* ... */ }
