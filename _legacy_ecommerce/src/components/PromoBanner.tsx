'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

interface PromoBannerProps {
  onShopClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-100 via-indigo-50 to-blue-100 border border-sky-200/60 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Glow shape */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-lg z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
            <Tag size={12} />
            <span>SPECIAL PROMOTION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            Up to <span className="text-brand-600">50% OFF</span> on your favorite items
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Upgrade your daily setup with limited-time deals on acoustics, smartphones, and curated workspace objects.
          </p>

          <div className="pt-2">
            <a
              href="#for-you"
              onClick={onShopClick}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md group"
            >
              <span>Shop Sale Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Visual Graphic on the right */}
        <div className="relative w-64 sm:w-72 h-44 sm:h-52 z-10 flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
            alt="Promotional bags"
            fill
            sizes="300px"
            className="object-cover rounded-2xl shadow-md border border-white/60"
          />
          <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-200/80 shadow-md">
            <p className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Limited stock</p>
            <p className="text-xs font-bold text-brand-600">Use code: ELITE50</p>
          </div>
        </div>
      </div>
    </section>
  );
};

