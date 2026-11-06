import React, { useState } from 'react';
import { Search, Plus, Sparkles, MapPin, Share2, Heart, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockItems';

export default function HomeView({ 
  items, 
  setActiveTab, 
  onSelectClaimItem, 
  onSelectDetailItem,
  onShareItem
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 sm:space-y-12">
      
      {/* Top Greeting & Header (Visual style inspired by reference screen) */}
      <section className="bg-gradient-to-b from-brand-50/60 to-transparent pt-6 sm:pt-8 pb-4 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-xs text-xs font-bold text-brand mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Community Lost & Found Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1939]">
              Hello, <span className="text-brand">Explorer</span> 👋
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Lost something important or found an item? Easily report, identify, and safely reclaim belongings through our verified community platform.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Verified Claim System
            </span>
          </div>
        </div>

        {/* 3 Prominent Action Cards (Directly matching the uploaded design mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Purple Create Advert / Report */}
          <div 
            onClick={() => setActiveTab('report-lost')}
            className="group cursor-pointer bg-[#DDD6FE] hover:bg-[#C4B5FD] p-6 sm:p-7 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1C1939] mb-1.5 flex items-center justify-between">
              Create an advert
              <ArrowRight className="w-5 h-5 text-brand group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              Report if you found or lost an item with photos and location.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[11px] font-bold bg-white/70 text-[#1C1939] px-2.5 py-1 rounded-full">
                Lost Item Report
              </span>
              <span className="text-[11px] font-bold bg-brand text-white px-2.5 py-1 rounded-full">
                Found Item Report
              </span>
            </div>
          </div>

          {/* Card 2: Pale Yellow Card - Lost & Found Items */}
          <div 
            onClick={() => setActiveTab('gallery')}
            className="group cursor-pointer bg-[#FEF08A] hover:bg-[#FDE047] p-6 sm:p-7 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-md mb-5 group-hover:scale-110 transition-transform">
              🎁
            </div>
            <h3 className="text-xl font-extrabold text-amber-950 mb-1.5 flex items-center justify-between">
              Lost & found items
              <ArrowRight className="w-5 h-5 text-amber-800 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 font-medium">
              Go through recently discovered and turned-in items.
            </p>
            <div className="mt-4">
              <span className="text-[11px] font-bold bg-white/70 text-amber-950 px-3 py-1 rounded-full">
                {items.filter(i => i.type === 'found').length} Found Items Available
              </span>
            </div>
          </div>

          {/* Card 3: Pale Mint / Map Search Card */}
          <div 
            onClick={() => setActiveTab('gallery')}
            className="group cursor-pointer bg-[#DCFCE7] hover:bg-[#BBF7D0] p-6 sm:p-7 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-xl font-extrabold text-emerald-950 mb-1.5 flex items-center justify-between">
              Search on map
              <ArrowRight className="w-5 h-5 text-emerald-800 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900/80 font-medium">
              Filter items by location radius, campus hostels, and landmarks.
            </p>
            <div className="mt-4">
              <span className="text-[11px] font-bold bg-white/70 text-emerald-950 px-3 py-1 rounded-full">
                Hostel, Library, Cafeteria
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Search Omnibar & Category Filter Pills */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-surface-border shadow-xs">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
            <input 
              type="text"
              placeholder="Search by item name, category, or location (e.g. AirPods, degree hostel)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 border-0"
            />
          </div>
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-2 sm:pt-0 sm:pl-3">
            <button
              onClick={() => setActiveTab('gallery')}
              className="px-4 py-2 bg-brand text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-brand-hover transition-colors whitespace-nowrap"
            >
              Browse All
            </button>
          </div>
        </div>

        {/* Category Pills (Matching reference UI: All, Mobile, Documents, Laptop, Keys) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected 
                    ? 'bg-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300/40' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Recently Reported Items Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1C1939]">
              Recently Reported Items
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Found items awaiting verified claims and latest lost alerts
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('gallery')}
            className="text-xs sm:text-sm font-bold text-brand hover:underline flex items-center gap-1"
          >
            <span>View All ({items.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Item Cards Grid (Adopting screenshot layout with 4:3 image, badges, location pin, share) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.slice(0, 6).map((item) => {
            const isFav = favorites[item.id];
            const isFound = item.type === 'found';

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-surface-border overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col group"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Status Tag Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                      isFound 
                        ? 'bg-brand text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-gray-700 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-xs"
                    aria-label="Save item"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Time Badge */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.timeAgo}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#1C1939] line-clamp-1 group-hover:text-brand transition-colors">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Action Buttons: Details, Share, and Claim */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => onShareItem(item)}
                      className="p-2 rounded-xl text-gray-500 hover:text-brand hover:bg-brand-50 transition-colors border border-gray-200"
                      title="Share link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectDetailItem(item)}
                      className="flex-1 py-2 text-xs font-bold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>

                    {isFound && (
                      <button
                        onClick={() => onSelectClaimItem(item)}
                        className="py-2 px-3 text-xs font-bold rounded-xl bg-brand text-white hover:bg-brand-hover shadow-xs transition-colors whitespace-nowrap"
                      >
                        Claim Item
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-brand-50 text-brand flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">No items found matching your filters</h3>
            <p className="text-xs text-gray-500">Try broadening your search term or select "All" categories.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="text-xs font-bold text-brand underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Security Reassurance Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#1C1939]">
              Safe Handover & Privacy Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Contact information is held confidentially. Verification proof is reviewed by administrators before items are handed over.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('admin')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Review Claims
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-brand text-white hover:bg-brand-hover transition-colors"
          >
            Help Center
          </button>
        </div>
      </section>

    </div>
  );
}

