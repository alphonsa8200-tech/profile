'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-zinc-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center justify-between gap-3 animate-slide-down"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {toast.product ? (
              <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-700/50">
                <Image
                  src={toast.product.image}
                  alt={toast.product.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check size={16} />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-100 truncate">
                {toast.product ? toast.product.name : 'Success'}
              </p>
              <p className="text-[11px] text-zinc-400 truncate">{toast.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              href="/cart"
              className="px-2.5 py-1 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Bag</span>
              <ArrowRight size={12} />
            </Link>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
