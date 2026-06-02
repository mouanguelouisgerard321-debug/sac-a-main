'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, priceRanges } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';

function CollectionContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: null,
    colors: [],
    sort: 'featured',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    setFilters(prev => ({
      ...prev,
      brands: brand ? [brand] : [],
      categories: category ? [category] : [],
      sort: sort || 'featured',
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price < range.max);
      }
    }
    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }

    switch (filters.sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.reverse(); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters]);

  const activeFilterCount = filters.categories.length + filters.brands.length + filters.colors.length + (filters.priceRange ? 1 : 0);

  const removeFilter = (type: keyof FilterState, value: string) => {
    if (type === 'priceRange') {
      setFilters(prev => ({ ...prev, priceRange: null }));
    } else if (type !== 'sort') {
      setFilters(prev => ({ ...prev, [type]: (prev[type] as string[]).filter(v => v !== value) }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-2">Maison Luxe</p>
        <h1 className="font-serif text-4xl font-light text-[#1A1A1A]">La Collection</h1>
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 border border-[#1A1A1A] text-xs tracking-widest uppercase px-4 py-2.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <p className="text-sm text-[#6B6B6B]">{filtered.length} résultats</p>
      </div>

      {/* Active filter tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.categories.map(v => (
            <span key={v} className="flex items-center gap-1.5 text-xs border border-[#C9A96E] text-[#C9A96E] px-3 py-1.5">
              {v}
              <button onClick={() => removeFilter('categories', v)}>×</button>
            </span>
          ))}
          {filters.brands.map(v => (
            <span key={v} className="flex items-center gap-1.5 text-xs border border-[#C9A96E] text-[#C9A96E] px-3 py-1.5">
              {v}
              <button onClick={() => removeFilter('brands', v)}>×</button>
            </span>
          ))}
          {filters.colors.map(v => (
            <span key={v} className="flex items-center gap-1.5 text-xs border border-[#C9A96E] text-[#C9A96E] px-3 py-1.5">
              {v}
              <button onClick={() => removeFilter('colors', v)}>×</button>
            </span>
          ))}
          {filters.priceRange && (
            <span className="flex items-center gap-1.5 text-xs border border-[#C9A96E] text-[#C9A96E] px-3 py-1.5">
              {filters.priceRange}
              <button onClick={() => removeFilter('priceRange', '')}>×</button>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-10">
        {/* Sidebar desktop */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Mobile sidebar */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl">Filtres</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={f => { setFilters(f); setMobileFiltersOpen(false); }} />
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-sm text-[#6B6B6B]">{filtered.length} résultats</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl font-light text-[#6B6B6B]">Aucun résultat</p>
              <p className="text-sm text-[#6B6B6B] mt-2">Essayez de modifier vos filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-[#6B6B6B]">Chargement...</p></div>}>
      <CollectionContent />
    </Suspense>
  );
}
