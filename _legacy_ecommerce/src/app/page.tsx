'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CategoryFilter } from '../types/product';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryRow } from '../components/CategoryRow';
import { ProductList } from '../components/ProductList';
import { PromoBanner } from '../components/PromoBanner';
import { DealsOfTheDay } from '../components/DealsOfTheDay';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';
import { ProductModal } from '../components/ProductModal';
import { Product } from '../types/product';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const heroProduct = PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-zinc-900">
      {/* Dual Header Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat as CategoryFilter)}
      />

      <main className="flex-grow space-y-2">
        {/* Hero Banner (matching reference sage/mint podium banner) */}
        <HeroBanner
          heroProduct={heroProduct}
          onQuickView={(p) => setModalProduct(p)}
        />

        {/* Best Categories (matching reference pastel squircle cards) */}
        <CategoryRow
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat as CategoryFilter)}
        />

        {/* For You / Main Product Grid (matching reference 4-col grid) */}
        <ProductList
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mid-Page Promo Banner (Up to 50% OFF) */}
        <PromoBanner
          onShopClick={() => setSelectedCategory('All')}
        />

        {/* Deals of the Day with Countdown & Sold Progress Bar */}
        <DealsOfTheDay
          products={PRODUCTS}
          onQuickView={(p) => setModalProduct(p)}
        />

        {/* Frequently Asked Questions Accordion */}
        <FAQSection />
      </main>

      {/* Deep Forest Green Footer */}
      <Footer />

      {/* Global Quick View Modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
