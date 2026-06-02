'use client';

import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { isOpen, closeCart } = useCartDrawer();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl cart-drawer flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-serif text-xl tracking-wider">Mon Panier</h2>
          <button onClick={closeCart} className="p-1 hover:opacity-60 transition-opacity" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="text-[#6B6B6B] font-light">Votre panier est vide</p>
              <button onClick={closeCart} className="text-sm tracking-widest uppercase border-b border-[#C9A96E] text-[#C9A96E] hover:opacity-70 transition-opacity">
                Découvrir la collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-4">
                <div className="w-20 h-20 bg-[#F8F5F0] rounded flex-shrink-0 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#C9A96E] tracking-widest uppercase">{item.product.brand}</p>
                  <p className="text-sm font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{item.selectedColor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-lg leading-none hover:bg-gray-50"
                      >−</button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-lg leading-none hover:bg-gray-50"
                      >+</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{(item.product.price * item.quantity).toLocaleString('fr-FR')}€</span>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor)}
                        className="text-[#6B6B6B] hover:text-red-500 transition-colors"
                        aria-label="Supprimer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B6B6B]">Total</span>
              <span className="text-lg font-serif">{total.toLocaleString('fr-FR')}€</span>
            </div>
            <p className="text-xs text-[#6B6B6B] text-center">Livraison offerte dès 500€ d&apos;achat</p>
            <button className="w-full bg-[#1A1A1A] text-white py-3.5 text-sm tracking-widest uppercase hover:bg-[#C9A96E] transition-colors duration-300">
              Commander
            </button>
            <button onClick={closeCart} className="w-full text-center text-xs tracking-widest uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
