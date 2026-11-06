'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

interface CategoryRowProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

interface CategoryItem {
  name: string;
  categoryKey: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Footwear',
    categoryKey: 'Fashion',
    bgColor: 'bg-[#e0f2fe]',
    borderColor: 'border-[#bae6fd]',
    textColor: 'text-sky-900',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Collectibles',
    categoryKey: 'Games & Toys',
    bgColor: 'bg-[#f3e8ff]',
    borderColor: 'border-[#e9d5ff]',
    textColor: 'text-purple-900',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Living & Ceramic',
    categoryKey: 'Living',
    bgColor: 'bg-[#ffe4e6]',
    borderColor: 'border-[#fecdd3]',
    textColor: 'text-rose-900',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Minimal Fashion',
    categoryKey: 'Fashion',
    bgColor: 'bg-[#fef3c7]',
    borderColor: 'border-[#fde68a]',
    textColor: 'text-amber-900',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Audio Gear',
    categoryKey: 'Audio',
    bgColor: 'bg-[#ede9fe]',
    borderColor: 'border-[#ddd6fe]',
    textColor: 'text-indigo-900',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Smartphones',
    categoryKey: 'Smartphones',
    bgColor: 'bg-[#d1fae5]',
    borderColor: 'border-[#a7f3d0]',
    textColor: 'text-emerald-900',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80',
  },
];

export const CategoryRow: React.FC<CategoryRowProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Best Categories</h2>
        </div>

        <button
          onClick={() => onSelectCategory('All')}
          className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid of Pastel Squircles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === cat.categoryKey;

          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(isSelected ? 'All' : cat.categoryKey)}
              className={`group flex flex-col items-center p-3 rounded-2xl border transition-all text-center ${
                cat.bgColor
              } ${cat.borderColor} ${
                isSelected
                  ? 'ring-2 ring-brand-600 shadow-md scale-102'
                  : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Product Thumbnail Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2.5 bg-white/70 shadow-xs flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <span className={`text-xs font-bold truncate w-full ${cat.textColor}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

