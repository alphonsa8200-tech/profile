'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Truck, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="bg-brand-900 text-white mt-16 border-t border-brand-800">
      {/* 4 Feature Badges Strip */}
      <div className="border-b border-brand-800/80 bg-brand-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-800/60 flex items-center justify-center text-brand-300 flex-shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Free Express Delivery</h4>
              <p className="text-[11px] text-brand-200">On all orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-800/60 flex items-center justify-center text-brand-300 flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">2-Year Warranty</h4>
              <p className="text-[11px] text-brand-200">Full hardware guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-800/60 flex items-center justify-center text-brand-300 flex-shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">30-Day Hassle Returns</h4>
              <p className="text-[11px] text-brand-200">Easy refunds &amp; exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-800/60 flex items-center justify-center text-brand-300 flex-shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">24/7 Dedicated Care</h4>
              <p className="text-[11px] text-brand-200">Expert support anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-base">
                E
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                ELITE<span className="text-brand-400 font-light">.STORE</span>
              </span>
            </div>

            <p className="text-xs text-brand-200 max-w-sm leading-relaxed">
              Premium consumer electronics, studio acoustic equipment, and modern lifestyle essentials designed with pure restraint and modern reliability.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubmit} className="pt-2 max-w-md">
              <span className="block text-xs font-semibold text-white mb-2">
                Subscribe for exclusive member drops &amp; flash sales
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-brand-950/60 border border-brand-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-brand-300 focus:outline-none focus:border-brand-400 w-full"
                />
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-400 text-brand-950 font-bold px-4 py-2.5 rounded-xl transition-colors text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  {subscribed ? (
                    <>
                      <Check size={14} />
                      <span>Joined</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-brand-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/#for-you" className="hover:text-white transition-colors">
                  Audio &amp; Sound
                </Link>
              </li>
              <li>
                <Link href="/#for-you" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/#deals" className="hover:text-white transition-colors">
                  Deals Of The Day
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              My Account
            </h4>
            <ul className="space-y-2 text-xs text-brand-200">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Order Tracking
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Wishlist &amp; Saved
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Account Settings
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Gift Cards
                </span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-brand-200">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Help Center &amp; Contact
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Shipping &amp; Delivery Terms
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Warranty Registration
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy &amp; Security
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-300">
          <p>© {new Date().getFullYear()} ELITE.STORE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Notice</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
