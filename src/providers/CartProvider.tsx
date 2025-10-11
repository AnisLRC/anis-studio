import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCart, addToCart, removeFromCart, clearCart, subtotal, type CartItem } from '../lib/cart';

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  refresh: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial load
    setItems(getCart());

    // Listen for storage changes and cart updates
    const handleStorageChange = () => {
      setItems(getCart());
    };

    const handleCartUpdate = () => {
      setItems(getCart());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('cart:updated', handleCartUpdate);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cart:updated', handleCartUpdate);
      };
    }
  }, []);

  const add = (item: CartItem) => {
    addToCart(item, item.quantity);
    setItems(getCart());
  };

  const remove = (id: string) => {
    removeFromCart(id);
    setItems(getCart());
  };

  const clear = () => {
    clearCart();
    setItems([]);
  };

  const refresh = () => {
    setItems(getCart());
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal(items);

  return (
    <CartContext.Provider value={{ items, count, total, add, remove, clear, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  refresh: () => void;
} => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export type { CartItem } from '../lib/cart';
