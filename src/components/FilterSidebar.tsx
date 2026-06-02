'use client';

import { brands, categories, colors, priceRanges } from '@/data/products';

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: string | null;
  colors: string[];
  sort: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const colorMap: Record<string, string> = {
  Noir: '#1A1A1A',
  Beige: '#D4B896',
  Rouge: '#C0392B',
  Marine: '#1B3A5C',
  Camel: '#C19A6B',
};

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggle = (key: 'categories' | 'brands' | 'colors', value: string) => {
    const arr = filters[key];
    const newArr = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: newArr });
  };

  return (
    <aside className="w-64 flex-shrink-0">
      {/* Sort */}
      <div className="mb-8">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-4">Trier par</h3>
        <select
          value={filters.sort}
          onChange={e => onChange({ ...filters, sort: e.target.value })}
          className="w-full border border-gray-200 text-sm py-2 px-3 text-[#1A1A1A] bg-white focus:outline-none focus:border-[#C9A96E]"
        >
          <option value="featured">Populaires</option>
          <option value="newest">Nouveautés</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Meilleures notes</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-4">Catégorie</h3>
        <div className="space-y-2.5">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggle('categories', cat)}
                className="w-3.5 h-3.5 rounded-none"
              />
              <span className="text-sm text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-4">Marque</h3>
        <div className="space-y-2.5">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggle('brands', brand)}
                className="w-3.5 h-3.5 rounded-none"
              />
              <span className="text-sm text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-4">Prix</h3>
        <div className="space-y-2.5">
          {priceRanges.map(range => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.label}
                onChange={() => onChange({ ...filters, priceRange: filters.priceRange === range.label ? null : range.label })}
                className="w-3.5 h-3.5"
              />
              <span className="text-sm text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-4">Couleur</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => toggle('colors', color)}
              title={color}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                filters.colors.includes(color)
                  ? 'border-[#C9A96E] scale-110'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: colorMap[color] || '#ccc' }}
            />
          ))}
        </div>
      </div>

      {/* Reset */}
      {(filters.categories.length > 0 || filters.brands.length > 0 || filters.priceRange || filters.colors.length > 0) && (
        <button
          onClick={() => onChange({ categories: [], brands: [], priceRange: null, colors: [], sort: filters.sort })}
          className="text-xs text-[#6B6B6B] tracking-widest uppercase border-b border-[#6B6B6B] hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
        >
          Réinitialiser les filtres
        </button>
      )}
    </aside>
  );
}
