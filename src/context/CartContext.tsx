'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; color: string }
  | { type: 'REMOVE_ITEM'; productId: string; color: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; color: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id && item.selectedColor === action.color
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { items: newItems };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1, selectedColor: action.color }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (item) => !(item.product.id === action.productId && item.selectedColor === action.color)
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => !(item.product.id === action.productId && item.selectedColor === action.color)
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId && item.selectedColor === action.color
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, color?: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        dispatch({ type: 'LOAD_CART', items: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, color?: string) => {
    dispatch({ type: 'ADD_ITEM', product, color: color || product.color });
  };

  const removeItem = (productId: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId, color });
  };

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, color, quantity });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
