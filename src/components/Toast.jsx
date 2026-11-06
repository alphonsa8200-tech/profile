import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-brand" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    error: 'bg-red-50 border-red-200 text-red-950',
    info: 'bg-brand-50 border-brand-200 text-brand-dark',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl ${bgStyles[type]} max-w-md`}>
        {icons[type]}
        <span className="text-xs sm:text-sm font-semibold">{message}</span>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 ml-2 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

