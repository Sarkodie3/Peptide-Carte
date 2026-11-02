import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../data/productsData';
import { Product } from '../types/product';
import { ProductCard } from '../components/common/ProductCard';
import { Search, Filter, ArrowUpDown, Sparkles, Tag, Check, Beaker } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  onSelectProduct,
  onRequestQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'All', label: 'All Compounds', count: products.length },
    { id: 'Best Sellers', label: 'Best Sellers', count: products.filter(p => p.tags.includes('Best Sellers')).length },
    { id: 'GLP', label: 'GLP-1 Series', count: products.filter(p => p.category === 'GLP').length },
    { id: 'Non-GLP', label: 'Non-GLP Peptides', count: products.filter(p => p.category === 'Non-GLP').length },
    { id: 'Reconstitution', label: 'Supplies & Reagents', count: products.filter(p => p.category === 'Reconstitution' || p.name.includes('WATER')).length },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Best Sellers') return p.tags.includes('Best Sellers');
        if (activeCategory === 'Reconstitution') return p.category === 'Reconstitution' || p.name.includes('WATER');
        return p.category === activeCategory;
      })
      .filter((p) => {
        // Search filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.dosage.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // featured/default
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Beaker className="w-3.5 h-3.5 text-gold-400" />
            Complete Analytical Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Research Peptides & Reconstitution Catalogue
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            All 56 verified compounds synthesized to ≥ 99.0% analytical purity. Dispatched domestically across Canada in temperature-monitored, light-protected packaging.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? 'bg-brand-800 text-white border-brand-800 shadow-sm'
                  : 'bg-white text-slate-600 hover:text-brand-900 border-slate-200 hover:bg-brand-50/50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog by name, dose, or SKU..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs text-slate-600">
          <span className="font-medium">
            Showing <strong className="text-brand-950 font-bold">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No Matching Research Compounds</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No products match your current search "{searchQuery}" in category "{activeCategory}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="text-xs font-bold text-brand-800 underline hover:text-brand-950 pt-2"
          >
            Clear Filters & View All 56 Compounds
          </button>
        </div>
      )}
    </div>
  );
};
