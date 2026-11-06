'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Truck,
  Sparkles,
  Lock,
  X,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    promoCode,
    discountAmount,
    shipping,
    total,
    freeShippingThreshold,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Checkout form state
  const [checkoutData, setCheckoutData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107',
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (!couponInput.trim()) return;

    const res = applyPromoCode(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setIsCheckingOut(false);
    setOrderComplete(true);

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#18181b', '#ca8a04', '#10b981', '#3b82f6'],
      });
    } catch {
      // ignore
    }

    clearCart();
  };

  // Progress toward free shipping
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb & Heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors mb-4 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Continue Shopping</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
                Shopping Bag
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Review your items and proceed to seamless checkout.
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-zinc-400 hover:text-red-500 transition-colors self-start sm:self-auto"
              >
                Clear entire bag
              </button>
            )}
          </div>
        </div>

        {orderComplete ? (
          /* Order Confirmed Screen */
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-sm animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <Check size={32} />
            </div>
            <span className="text-xs font-mono tracking-wider uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
              Order Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 mt-4 tracking-tight">
              Thank you for your order!
            </h2>
            <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto leading-relaxed">
              We've received your order and sent a confirmation receipt to{' '}
              <span className="font-medium text-zinc-900">{checkoutData.email}</span>.
            </p>

            <div className="bg-zinc-50 rounded-2xl p-4 my-6 text-left border border-zinc-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Order Reference:</span>
                <span className="font-mono font-semibold text-zinc-900">{orderId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Delivery Address:</span>
                <span className="text-zinc-900 text-right">
                  {checkoutData.address}, {checkoutData.city}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Estimated Delivery:</span>
                <span className="text-zinc-900 font-medium">2 - 3 business days</span>
              </div>
            </div>

            <Link
              href="/"
              onClick={() => setOrderComplete(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors"
            >
              <span>Return to Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-12 sm:p-20 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={28} />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Your bag is empty</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added anything yet. Explore our curated selection of acoustics, tech, and everyday essentials.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 bg-brand-600 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* Main Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Items & Free Shipping Progress */}
            <div className="lg:col-span-7 space-y-6">
              {/* Free Shipping Meter */}
              <div className="bg-white rounded-2xl border border-zinc-200/70 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 flex-shrink-0">
                    <Truck size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="text-xs font-medium text-zinc-900">
                        {shippingRemaining === 0 ? (
                          <span className="text-brand-700 font-semibold flex items-center gap-1">
                            <Sparkles size={13} className="text-brand-600" />
                            Congratulations! You've unlocked Complimentary Express Shipping.
                          </span>
                        ) : (
                          <>
                            Add <span className="font-mono font-semibold">${shippingRemaining}</span> more to unlock Free Express Shipping
                          </>
                        )}
                      </p>
                      <span className="text-[11px] font-mono text-zinc-400 ml-2">
                        {shippingProgress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          shippingRemaining === 0 ? 'bg-emerald-500' : 'bg-brand-600'
                        }`}
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-zinc-200/80 divide-y divide-zinc-100 overflow-hidden shadow-xs">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || idx}`}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors"
                  >
                    {/* Product Thumbnail + Info */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200/50">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm font-semibold text-zinc-900 truncate">
                          {item.product.name}
                        </h3>

                        {item.selectedColor && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs text-zinc-500">Color:</span>
                            <span className="text-xs font-medium text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-md">
                              {item.selectedColor}
                            </span>
                          </div>
                        )}

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-xs font-mono font-medium text-zinc-700">
                            ${item.product.price} each
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                      {/* Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-xl px-2 py-1 bg-zinc-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                          }
                          className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-semibold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                          }
                          className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <span className="text-sm font-semibold font-mono text-zinc-950 min-w-[70px] text-right">
                        ${item.product.price * item.quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor)}
                        className="p-2 text-zinc-400 hover:text-red-600 rounded-lg transition-colors"
                        aria-label="Remove item"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Summary & Promo Code */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-7 shadow-xs">
                <h2 className="text-base font-semibold text-zinc-950 tracking-tight pb-4 border-b border-zinc-100">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div className="py-4 border-b border-zinc-100">
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-emerald-600" />
                        <span className="text-xs font-mono font-bold text-zinc-900">
                          {promoCode}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-medium">Applied</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-zinc-400 hover:text-zinc-700 text-xs"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. ELITE10 or ELITE50)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder:text-zinc-400 focus:outline-none focus:border-brand-500"
                        />
                        <button
                          type="submit"
                          className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-500">{couponError}</p>
                      )}
                      {couponSuccess && (
                        <p className="text-[11px] text-emerald-600">{couponSuccess}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3 py-4 border-b border-zinc-100 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-mono text-zinc-900 font-medium">${subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({promoCode})</span>
                      <span className="font-mono">-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-600">
                    <span className="flex items-center gap-1">
                      <span>Shipping</span>
                      {shipping === 0 && (
                        <span className="text-[10px] bg-brand-50 text-brand-700 px-1.5 py-0.2 rounded font-medium">
                          Free
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-zinc-900 font-medium">
                      {shipping === 0 ? '$0' : `$${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Estimated Tax</span>
                    <span className="font-mono text-zinc-900 font-medium">
                      ${Math.round((subtotal - discountAmount) * 0.07)}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 pb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-semibold text-zinc-950">Total Amount</span>
                    <p className="text-[11px] text-zinc-400">Includes all applicable duties &amp; taxes</p>
                  </div>
                  <span className="text-2xl font-bold font-mono text-zinc-950">
                    ${total + Math.round((subtotal - discountAmount) * 0.07)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.99]"
                >
                  <Lock size={15} className="text-brand-200 group-hover:text-white transition-colors" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Assurance Badges */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-zinc-600" />
                    Encrypted Checkout
                  </span>
                  <span>·</span>
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal Dialog */}
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCheckingOut(false)}
            />

            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 z-10 shadow-2xl border border-zinc-100 my-8">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                  Express Checkout
                </span>
                <h3 className="text-xl font-semibold text-zinc-950">Shipping &amp; Payment</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Complete your order of {totalItems} items (${total + Math.round((subtotal - discountAmount) * 0.07)}).
                </p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Email for Receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={checkoutData.email}
                    onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                    className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.city}
                      onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                      className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.zip}
                      onChange={(e) => setCheckoutData({ ...checkoutData, zip: e.target.value })}
                      className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Payment Method
                  </label>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-900">💳 Card ending in 4242</span>
                    <span className="text-zinc-400 font-mono">12/28</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    <span>Pay ${total + Math.round((subtotal - discountAmount) * 0.07)}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
