'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Headphones,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery = '',
  setSearchQuery,
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const pathname = usePathname();
  const { totalItems, favorites } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);

  useEffect(() => {
    if (totalItems === 0) return;
    setBadgeBump(true);
    const timer = setTimeout(() => setBadgeBump(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  const navCategories = [
    'All',
    'Smartphones',
    'Audio',
    'Electronics',
    'Fashion',
    'Living',
    'Games & Toys',
  ];

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setCategoryDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-40">
      {/* Top Emerald Utility Strip */}
      <div className="bg-brand-900 text-brand-100 text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-brand-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-brand-300" />
            <span>Winter Mega Sale is live! Up to 50% Off.</span>
          </span>
          <span className="hidden md:inline text-brand-400">|</span>
          <span className="hidden md:inline text-brand-200">
            Free Worldwide Express delivery on orders &gt; $150
          </span>
        </div>

        <div className="flex items-center gap-4 font-medium">
          <span className="hidden sm:flex items-center gap-1 text-brand-200 hover:text-white cursor-pointer transition-colors">
            <PhoneCall size={11} />
            <span>+1 (800) 456-7890</span>
          </span>
          <span className="text-brand-300">USD $</span>
          <span className="text-brand-300">English</span>
        </div>
      </div>

      {/* Main Header (Logo, Central Search, Action Icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-zinc-700 hover:text-zinc-950"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-bold text-base tracking-tighter">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-zinc-900 flex items-center gap-1">
                ELITE<span className="text-brand-600 font-medium">.STORE</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Central Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="flex items-center w-full bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryClick(e.target.value)}
              className="bg-transparent text-xs text-zinc-600 font-medium outline-none pr-2 border-r border-zinc-200 cursor-pointer"
            >
              {navCategories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search products, brands and essentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none"
            />

            <button
              className="w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-xs"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Right Actions: Wishlist, Cart & Profile */}
        <div className="flex items-center gap-3">
          {/* Wishlist Link */}
          <Link
            href="/#for-you"
            className="p-2 text-zinc-600 hover:text-brand-600 hover:bg-zinc-50 rounded-full transition-colors relative"
            title="Wishlist"
          >
            <Heart size={20} className={favorites.length > 0 ? 'fill-red-500 text-red-500' : ''} />
            {favorites.length > 0 && (
              <span className="absolute 0 top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
              pathname === '/cart'
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200'
            }`}
          >
            <div className="relative">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2.5 min-w-[17px] h-[17px] px-1 text-[10px] font-mono font-bold rounded-full flex items-center justify-center transition-transform ${
                    pathname === '/cart'
                      ? 'bg-white text-brand-700'
                      : 'bg-brand-600 text-white'
                  } ${badgeBump ? 'scale-125' : 'scale-100'}`}
                >
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold">
              Cart
            </span>
          </Link>

          {/* Sign In button */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-zinc-200">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
              <User size={15} />
            </div>
            <span className="text-xs font-medium text-zinc-700">Account</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center w-full bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-2 text-xs text-zinc-900 placeholder:text-zinc-400 outline-none"
          />
          <button className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center">
            <Search size={13} />
          </button>
        </div>
      </div>

      {/* Secondary Horizontal Nav Links Strip */}
      <nav className="border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {/* Category Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-1.5 rounded-lg font-semibold transition-colors mr-2"
              >
                <Menu size={14} />
                <span>All Categories</span>
                <ChevronDown size={13} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-zinc-100 shadow-xl rounded-xl py-2 z-50 animate-scale-up">
                  {navCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCategoryClick(c)}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-brand-50 hover:text-brand-700 transition-colors ${
                        selectedCategory === c
                          ? 'font-bold text-brand-600 bg-brand-50/50'
                          : 'text-zinc-700'
                      }`}
                    >
                      {c === 'All' ? 'All Products' : c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                pathname === '/' && selectedCategory === 'All'
                  ? 'text-brand-700 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Home
            </Link>

            {navCategories.filter(c => c !== 'All').map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === c
                    ? 'text-brand-700 font-bold bg-brand-50'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {c}
              </button>
            ))}

            <Link
              href="/#deals"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-rose-600 hover:text-rose-700 whitespace-nowrap font-semibold"
            >
              <span>Deals</span>
              <span className="bg-rose-100 text-rose-600 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                Hot
              </span>
            </Link>

            <Link
              href="/cart"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                pathname === '/cart' ? 'text-brand-700 font-bold' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Bag
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-zinc-500 py-2">
            <Headphones size={13} className="text-brand-600" />
            <span>24/7 Dedicated Support</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white px-4 py-4 space-y-2 animate-slide-down">
          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2">
            Categories
          </p>
          {navCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                handleCategoryClick(c);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg flex items-center justify-between"
            >
              <span>{c === 'All' ? 'All Products' : c}</span>
              {selectedCategory === c && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-100">
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-brand-700"
            >
              Go to Shopping Bag ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
