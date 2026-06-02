'use client';

import Link from 'next/link';
import { products, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-6">Nouvelle Collection 2024</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-tight mb-6">
              L&apos;Élégance<br />
              <em className="italic text-[#C9A96E]">Redéfinie</em>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Une sélection exclusive des pièces les plus convoitées des plus grandes maisons de couture. Chanel, Hermès, Louis Vuitton, Dior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collection"
                className="inline-block bg-[#C9A96E] text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
              >
                Découvrir la Collection
              </Link>
              <Link
                href="/collection?sort=newest"
                className="inline-block border border-white/30 text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-300"
              >
                Nouveautés
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center opacity-20">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="0.3">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
        </div>
      </section>

      {/* Featured section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Sélection</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1A1A1A]">Pièces Emblématiques</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/collection"
            className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300"
          >
            Voir toute la collection
          </Link>
        </div>
      </section>

      {/* Brands section */}
      <section className="bg-[#F8F5F0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Partenaires</p>
            <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">Nos Maisons</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map(brand => (
              <Link
                key={brand}
                href={`/collection?brand=${encodeURIComponent(brand)}`}
                className="font-serif text-lg md:text-xl tracking-[0.15em] text-[#6B6B6B] hover:text-[#C9A96E] transition-colors duration-300 font-light"
              >
                {brand.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
              title: 'Authenticité Garantie',
              desc: 'Chaque pièce est authentifiée par nos experts avant mise en vente.',
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              ),
              title: 'Livraison Offerte',
              desc: 'Livraison express gratuite dès 500€ d\'achat, partout en France.',
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
              ),
              title: 'Retour Gratuit',
              desc: '30 jours pour changer d\'avis, retour entièrement pris en charge.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F8F5F0] flex items-center justify-center">
                {icon}
              </div>
              <h3 className="font-serif text-lg font-light">{title}</h3>
              <p className="text-sm text-[#6B6B6B] font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Newsletter</p>
          <h2 className="font-serif text-3xl text-white font-light mb-4">L&apos;Art de l&apos;Exclusivité</h2>
          <p className="text-gray-400 text-sm font-light mb-8">
            Recevez en avant-première nos nouvelles arrivées et offres exclusives.
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#C9A96E] text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
