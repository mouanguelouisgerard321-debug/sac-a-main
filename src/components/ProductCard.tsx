'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/produit/${product.id}`} className="group block">
      <div
        className="relative overflow-hidden bg-[#F8F5F0]"
        style={{ aspectRatio: '3/4' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Placeholder image */}
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <div className="flex flex-col items-center gap-3 text-[#C9A96E] opacity-40">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              <line x1="12" y1="12" x2="12" y2="17"/>
              <line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
            </svg>
            <span className="text-xs tracking-widest uppercase font-light">{product.brand}</span>
          </div>
        </div>

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-[#C9A96E] text-white text-xs px-2 py-1 tracking-wider">
            -{discount}%
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Ajouter aux favoris"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isWishlisted ? '#C9A96E' : 'none'} stroke={isWishlisted ? '#C9A96E' : '#1A1A1A'} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* Add to cart button */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#1A1A1A] text-white text-xs py-3 tracking-[0.15em] uppercase hover:bg-[#C9A96E] transition-colors duration-300"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E]">{product.brand}</p>
        <p className="text-sm font-light text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors">{product.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1A1A1A]">{product.price.toLocaleString('fr-FR')}€</span>
          {product.originalPrice && (
            <span className="text-xs text-[#6B6B6B] line-through">{product.originalPrice.toLocaleString('fr-FR')}€</span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill={star <= Math.round(product.rating) ? '#C9A96E' : 'none'} stroke="#C9A96E" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-[#6B6B6B]">({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
}
