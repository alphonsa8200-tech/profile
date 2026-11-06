'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Plus, Check, Star, Eye } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem, favorites, toggleFavorite } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFav = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200/80 p-3.5 hover:border-brand-500/50 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header: Badge & Heart */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div>
          {product.badge ? (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white shadow-xs ${
                product.badge === 'HOT'
                  ? 'bg-rose-500'
                  : product.badge === 'SALE'
                  ? 'bg-amber-500'
                  : product.badge === 'BESTSELLER'
                  ? 'bg-indigo-600'
                  : 'bg-brand-600'
              }`}
            >
              {product.badge}
            </span>
          ) : (
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              {product.category}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isFav
              ? 'bg-rose-50 text-rose-500'
              : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} className={isFav ? 'fill-rose-500' : ''} />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full rounded-xl bg-zinc-50 overflow-hidden cursor-pointer flex items-center justify-center mb-3"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-2 group-hover:scale-108 transition-transform duration-300 ease-out"
        />

        {/* Quick View Button overlay on hover */}
        <div
          className={`absolute inset-x-3 bottom-3 flex justify-center transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 backdrop-blur-md text-zinc-900 py-1.5 px-3 rounded-lg text-xs font-semibold shadow-md hover:bg-brand-600 hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mb-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-zinc-400 text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-brand-600 cursor-pointer line-clamp-2 transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Green Circular Add to Cart Button */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-zinc-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold font-mono text-zinc-950">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] font-mono text-zinc-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.discountPercent && (
              <span className="text-[10px] text-emerald-600 font-medium">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Circular Green Action Button */}
          <button
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs ${
              justAdded
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-brand-500 hover:bg-brand-600 text-white hover:scale-105 active:scale-95'
            }`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
