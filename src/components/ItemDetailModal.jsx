import React from 'react';
import { X, MapPin, Calendar, User, Phone, Mail, ShieldCheck, Share2, ArrowRight } from 'lucide-react';

export default function ItemDetailModal({ 
  item, 
  onClose, 
  onClaim, 
  onShare 
}) {
  if (!item) return null;

  const isFound = item.type === 'found';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 my-8">
        
        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-gray-100 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs ${
              isFound ? 'bg-brand' : 'bg-red-500'
            }`}>
              {item.type} Item
            </span>
            <span className="text-xs font-bold bg-white/95 text-gray-800 px-3 py-1 rounded-full shadow-xs">
              {item.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
            Reference: {item.id}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1C1939]">
              {item.name}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-brand" />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-brand" />
                {item.date} ({item.timeAgo})
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              Detailed Description
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {item.detailedDescription || item.shortDescription}
            </p>
          </div>

          {/* Custody Information */}
          {item.custody && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Current Custody: <strong>{item.custody}</strong></span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onShare(item)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-brand font-bold text-xs flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Item Link</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-xs"
              >
                Close
              </button>
              
              {isFound && (
                <button
                  onClick={() => {
                    onClose();
                    onClaim(item);
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-brand text-white font-extrabold text-xs sm:text-sm hover:bg-brand-hover shadow-md shadow-brand/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Claim This Item</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

