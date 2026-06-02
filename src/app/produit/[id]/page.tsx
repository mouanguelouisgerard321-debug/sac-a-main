'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.color);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { openCart } = useCartDrawer();

  const related = products.filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category)).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedColor);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const colorMap: Record<string, string> = {
    Noir: '#1A1A1A',
    Beige: '#D4B896',
    Rouge: '#C0392B',
    Marine: '#1B3A5C',
    Camel: '#C19A6B',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] tracking-wider mb-8">
        <Link href="/" className="hover:text-[#C9A96E] transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/collection" className="hover:text-[#C9A96E] transition-colors">Collection</Link>
        <span>/</span>
        <span className="text-[#1A1A1A]">{product.name}</span>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <div className="aspect-square bg-[#F8F5F0] flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-4 text-[#C9A96E] opacity-30">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
            <span className="text-sm tracking-widest uppercase font-light">{product.brand}</span>
          </div>
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-[#C9A96E] text-white text-xs px-3 py-1 tracking-wider">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2">{product.brand}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A] mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1,2,3,4,5].map(star => (
                <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.round(product.rating) ? '#C9A96E' : 'none'} stroke="#C9A96E" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#6B6B6B]">{product.rating} ({product.reviews} avis)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-light text-[#1A1A1A]">{product.price.toLocaleString('fr-FR')}€</span>
            {product.originalPrice && (
              <span className="text-lg text-[#6B6B6B] line-through">{product.originalPrice.toLocaleString('fr-FR')}€</span>
            )}
          </div>

          {/* Material */}
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B] mb-1">Matière</p>
            <p className="text-sm text-[#1A1A1A]">{product.material}</p>
          </div>

          {/* Color selector */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">
              Couleur — <span className="text-[#1A1A1A] normal-case tracking-normal">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-[#C9A96E] scale-110' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: colorMap[color] || '#ccc' }}
                />
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 text-sm tracking-[0.2em] uppercase transition-colors duration-300 mb-4 ${
              added
                ? 'bg-green-700 text-white'
                : 'bg-[#C9A96E] text-white hover:bg-[#1A1A1A]'
            }`}
          >
            {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
          </button>

          <button className="w-full border border-[#1A1A1A] py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 mb-8">
            Ajouter aux favoris
          </button>

          {/* Description */}
          <div className="border-t border-gray-100 pt-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B] mb-3">Description</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed font-light">{product.description}</p>
          </div>

          {/* Features */}
          <div className="mt-6 border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Catégorie', value: product.category },
              { label: 'Couleur principale', value: product.color },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-1">{label}</p>
                <p className="text-sm text-[#1A1A1A]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24">
          <div className="text-center mb-10">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-2">Vous aimerez aussi</p>
            <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">Pièces Similaires</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
