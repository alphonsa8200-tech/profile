'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RefreshCw, ChevronRight } from 'lucide-react';
import { Product, CategoryFilter, SortOption } from '../types/product';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

interface ProductListProps {
  products: Product[];
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery = '',
  setSearchQuery,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories: CategoryFilter[] = [
    'All',
    'Audio',
    'Smartphones',
    'Electronics',
    'Fashion',
    'Living',
    'Games & Toys',
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
        return (b.badge === 'HOT' ? 1 : 0) - (a.badge === 'HOT' ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="for-you" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header bar matching "For You" in the reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">For You</h2>
          <span className="text-xs text-zinc-400 font-mono">
            ({filteredProducts.length} items)
          </span>
        </div>

        {/* Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.slice(0, 5).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 shadow-xs">
            <SlidersHorizontal size={13} className="text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-zinc-800 font-medium outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4-column Product Grid (matching reference) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto mb-3">
            <Search size={20} />
          </div>
          <h3 className="text-sm font-bold text-zinc-900">No items found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            Try resetting your search query or choosing another category.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              if (setSearchQuery) setSearchQuery('');
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-600 text-white px-4 py-2 rounded-xl hover:bg-brand-700"
          >
            <RefreshCw size={13} />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
