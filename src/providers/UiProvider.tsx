import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UiContextType {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }): JSX.Element {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleCartOpen = () => {
      setCartOpen(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cart:open', handleCartOpen);

      return () => {
        window.removeEventListener('cart:open', handleCartOpen);
      };
    }
  }, []);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const toggleCart = () => setCartOpen(prev => !prev);

  return (
    <UiContext.Provider value={{ cartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </UiContext.Provider>
  );
}

export const useUi = (): {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
} => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};
