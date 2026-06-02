'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';

export default function Header() {
  const { itemCount } = useCart();
  const { openCart } = useCartDrawer();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-[#1A1A1A] font-light">
              MAISON LUXE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/collection" className="text-sm tracking-widest uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Collection
            </Link>
            <Link href="/collection?brand=Chanel" className="text-sm tracking-widest uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Marques
            </Link>
            <Link href="/collection?sort=newest" className="text-sm tracking-widest uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Nouveautés
            </Link>
          </nav>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 hover:opacity-70 transition-opacity"
            aria-label="Panier"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-4">
          <Link href="/collection" className="block text-sm tracking-widest uppercase text-[#6B6B6B]" onClick={() => setMenuOpen(false)}>
            Collection
          </Link>
          <Link href="/collection" className="block text-sm tracking-widest uppercase text-[#6B6B6B]" onClick={() => setMenuOpen(false)}>
            Marques
          </Link>
          <Link href="/collection?sort=newest" className="block text-sm tracking-widest uppercase text-[#6B6B6B]" onClick={() => setMenuOpen(false)}>
            Nouveautés
          </Link>
        </div>
      )}
    </header>
  );
}
