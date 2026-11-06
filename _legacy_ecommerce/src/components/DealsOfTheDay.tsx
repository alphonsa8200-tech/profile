'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Timer, Zap, Plus, Check, Star } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface DealsOfTheDayProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const DealsOfTheDay: React.FC<DealsOfTheDayProps> = ({ products, onQuickView }) => {
  const { addItem } = useCart();
  const [addedMap, setAddedMap] = useState<{ [key: string]: boolean }>({});

  // Countdown timer simulation (hours, mins, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const dealProducts = products.filter((p) => p.isDealOfTheDay || (p.discountPercent && p.discountPercent >= 18)).slice(0, 3);

  return (
    <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header with Countdown Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Deals Of The Day</h2>
          <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
            Limited
          </span>
        </div>

        {/* Live Timer Badges */}
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 bg-white border border-zinc-200 px-3.5 py-1.5 rounded-2xl shadow-xs self-start sm:self-auto">
          <Timer size={14} className="text-rose-500" />
          <span>Ends in:</span>
          <span className="font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded-md">
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          <span className="font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded-md">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
          <span className="font-mono font-bold bg-zinc-900 text-white px-2 py-0.5 rounded-md">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>
      </div>

      {/* Grid of Deal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dealProducts.map((product) => {
          const sold = product.soldCount || 42;
          const total = product.availableStock || 60;
          const progress = Math.min(100, Math.round((sold / total) * 100));

          return (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              className="bg-white rounded-2xl border border-zinc-200/80 p-4 hover:border-brand-500/60 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full bg-zinc-50 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    -{product.discountPercent || 20}%
                  </span>
                </div>

                {/* Rating & Category */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span className="uppercase text-[10px] font-mono tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                    <Star size={12} className="fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                  {product.tagline}
                </p>

                {/* Sold Stock Progress */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[11px] text-zinc-500 font-medium">
                    <span>Sold: {sold} items</span>
                    <span className="text-rose-600 font-semibold">Only {total - sold} left</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-brand-500 h-full rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold font-mono text-zinc-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-mono text-zinc-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleAdd(e, product)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    addedMap[product.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-500 hover:bg-brand-600 text-white'
                  }`}
                >
                  {addedMap[product.id] ? (
                    <>
                      <Check size={14} />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Claim Deal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

