'use client';

import { createContext, useContext, useState } from 'react';

interface CartDrawerContextValue {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | undefined>(undefined);

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CartDrawerContext.Provider value={{ isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error('useCartDrawer must be used within CartDrawerProvider');
  return ctx;
}
