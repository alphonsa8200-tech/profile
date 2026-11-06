'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, Check, ShieldCheck, RefreshCw, Truck, Heart, Plus, Minus } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem, favorites, toggleFavorite } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Sync state when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || product.image);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : '');
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const isFav = favorites.includes(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-zinc-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 md:p-8 bg-zinc-50/70 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-zinc-200/60 shadow-inner">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full z-10 shadow-sm transition-all ${
                  isFav
                    ? 'bg-red-50 text-red-500'
                    : 'bg-white/80 backdrop-blur-sm text-zinc-600 hover:bg-white hover:text-zinc-950'
                }`}
                aria-label="Favorite"
              >
                <Heart size={18} className={isFav ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-zinc-900 ring-2 ring-zinc-900/10'
                        : 'border-transparent hover:border-zinc-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-zinc-200/70 text-center">
              <div className="flex flex-col items-center gap-1 text-[11px] text-zinc-600">
                <Truck size={16} className="text-zinc-800" />
                <span>Free shipping &gt;$150</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-zinc-600">
                <RefreshCw size={16} className="text-zinc-800" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-zinc-600">
                <ShieldCheck size={16} className="text-zinc-800" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-zinc-700 font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">{product.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold font-mono text-zinc-950">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-zinc-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Feature Highlights */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-900 tracking-wider uppercase">
                    Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-zinc-900">Finish:</span>
                    <span className="text-zinc-500 font-mono">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          selectedColor === color.name
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                            : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-zinc-200 rounded-xl px-3 py-2 sm:w-32 bg-zinc-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-zinc-500 hover:text-zinc-950 disabled:opacity-30 transition-colors"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-mono font-semibold text-zinc-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-600 hover:bg-brand-700 text-white active:scale-[0.99]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>
                    <span className="text-brand-200 font-mono text-xs">·</span>
                    <span className="font-mono">${product.price * quantity}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
