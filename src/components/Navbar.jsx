import React, { useState } from 'react';
import { Search, PlusCircle, ShieldCheck, HelpCircle, PackageSearch, Heart, Menu, X, ArrowLeft } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, pendingClaimsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Found Items' },
    { id: 'report-lost', label: 'Report Lost' },
    { id: 'report-found', label: 'Report Found' },
    { id: 'admin', label: 'Admin Claims', badge: pendingClaimsCount },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand flex items-center justify-center text-white shadow-md shadow-brand/20 group-hover:scale-105 transition-transform">
              <PackageSearch className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C1939]">
                  Find<span className="text-brand">lost</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cardPastel-yellow text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  Official
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">Community Lost & Found Hub</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'bg-brand-50 text-brand shadow-sm font-bold' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
                >
                  {item.label}
                  {item.badge > 0 && (
                    <span className="bg-brand text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Quick Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('report-lost')}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              + Lost Item
            </button>
            <button
              onClick={() => handleNavClick('report-found')}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-brand text-white hover:bg-brand-hover shadow-sm shadow-brand/30 transition-all hover:shadow-md"
            >
              + Found Item
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-border px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all ${
                activeTab === item.id 
                  ? 'bg-brand text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {item.badge} Pending
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('report-lost')}
              className="w-full py-2.5 text-center text-xs font-bold rounded-xl border border-red-200 text-red-600 bg-red-50/50"
            >
              Report Lost
            </button>
            <button
              onClick={() => handleNavClick('report-found')}
              className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-brand text-white"
            >
              Report Found
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
