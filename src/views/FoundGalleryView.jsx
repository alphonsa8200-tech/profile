import React, { useState } from 'react';
import { Search, MapPin, Calendar, Share2, Heart, ArrowLeft, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockItems';

export default function FoundGalleryView({ 
  items, 
  setActiveTab, 
  onSelectClaimItem, 
  onSelectDetailItem,
  onShareItem
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Only display items marked as found or all items with clear status
  const foundItems = items.filter(item => item.type === 'found');

  // Extract distinct locations for dropdown filter
  const locations = ['All', ...new Set(foundItems.map(item => item.location.split(',')[0].trim()))];

  const filteredItems = foundItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLocation = selectedLocation === 'All' || item.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4 sm:py-6">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <button
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider bg-cardPastel-yellow text-amber-950 px-3 py-1 rounded-full border border-amber-200">
              Layout 3 — Picture Gallery
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1939] tracking-tight">
            Find & Claim Your Belonging
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-xl">
            Browse discovered items turned in by good samaritans. See something that belongs to you? Click <strong>Claim This Item</strong> to start verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('report-found')}
            className="px-4 py-2.5 rounded-xl bg-brand text-white font-bold text-xs sm:text-sm hover:bg-brand-hover shadow-sm transition-all"
          >
            + Report Found Item
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="space-y-4 bg-white p-4 sm:p-5 rounded-3xl border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Text Search */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
            <input 
              type="text"
              placeholder="Search by item name, keyword, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="All">All Locations</option>
              {locations.filter(l => l !== 'All').map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills (Directly inspired by reference screen: All, Mobile, Documents, Laptop, Keys) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected 
                    ? 'bg-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300/40' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Item Cards Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isFav = favorites[item.id];
          return (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-surface-border overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            >
              {/* Item Picture Container */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-1 rounded-full shadow-xs">
                    Found Item
                  </span>
                  <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-gray-800 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Bookmark Heart */}
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-xs"
                  aria-label="Save item"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Date Badge */}
                <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>Found: {item.date}</span>
                </div>
              </div>

              {/* Item Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1C1939] line-clamp-1 group-hover:text-brand transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="font-medium truncate">{item.location}</span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  {item.custody && (
                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                      Safe Custody: {item.custody}
                    </div>
                  )}
                </div>

                {/* Buttons (Required: View Details & Claim This Item) */}
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => onShareItem(item)}
                    className="p-2.5 rounded-xl text-gray-500 hover:text-brand hover:bg-brand-50 transition-colors border border-gray-200"
                    title="Share item card"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectDetailItem(item)}
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onSelectClaimItem(item)}
                    className="flex-1 py-2.5 px-3 text-xs font-extrabold rounded-xl bg-brand text-white hover:bg-brand-hover shadow-sm shadow-brand/20 transition-all hover:scale-[1.02] text-center"
                  >
                    Claim This Item
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-lg text-gray-800">No found items match your criteria</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            If your item hasn't been listed yet, you can broadcast an alert so community members contact you when discovered.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLocation('All'); }}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 text-gray-700"
            >
              Reset Filters
            </button>
            <button 
              onClick={() => setActiveTab('report-lost')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white"
            >
              Report as Lost Item
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

