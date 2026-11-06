'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface HeroBannerProps {
  heroProduct: Product;
  onQuickView: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ heroProduct, onQuickView }) => {
  const { addItem } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#54976a] via-[#6ca781] to-[#88b998] text-white shadow-lg">
        {/* Subtle decorative leaf/glow blur shapes */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-brand-900/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[380px] sm:min-h-[420px] p-6 sm:p-10 md:p-12 relative z-10 gap-8">
          {/* Left Text Content */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white border border-white/30 shadow-xs">
              <Sparkles size={13} className="text-emerald-200" />
              <span>LIMITED WINTER SALE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              NEW ARRIVALS <br />
              <span className="text-emerald-100 font-light">WINTER SALE</span>
            </h1>

            <p className="text-xs sm:text-sm text-emerald-50 max-w-lg leading-relaxed font-normal opacity-95">
              Discover cutting-edge acoustics, flagship tech, and refined everyday lifestyle objects crafted for modern living.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#for-you"
                className="bg-white hover:bg-emerald-50 text-brand-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>Shop Now</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => onQuickView(heroProduct)}
                className="bg-brand-900/30 hover:bg-brand-900/50 backdrop-blur-md text-white border border-white/20 font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-colors"
              >
                Quick View
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-[11px] text-emerald-100 font-medium">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-emerald-300" />
                <span>Instant dispatch</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-300" />
                <span>2-Year Warranty</span>
              </span>
            </div>
          </div>

          {/* Right Hero Product on Podium Graphic */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Podium Base */}
              <div className="absolute bottom-4 inset-x-8 h-12 bg-white/20 backdrop-blur-md rounded-[50%] border border-white/30 shadow-2xl" />

              {/* Main Headphones / Hero Image */}
              <div
                onClick={() => onQuickView(heroProduct)}
                className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer group transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain drop-shadow-2xl"
                />

                {/* Floating Price Tag Pill */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-zinc-900 py-1.5 px-3 rounded-2xl shadow-lg border border-white/80 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Save 22%</span>
                  <span className="text-sm font-bold font-mono text-brand-700">
                    ${heroProduct.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

