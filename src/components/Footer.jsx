import React from 'react';
import { PackageSearch, ShieldCheck, HeartHandshake, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white border-t border-surface-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white shadow-sm">
                <PackageSearch className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-[#1C1939]">
                Find<span className="text-brand">lost</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              A trusted community network helping reunite lost belongings with their rightful owners safely, quickly, and with verified proof of ownership.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Identity & Proof Protected</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="text-gray-600 hover:text-brand transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="text-gray-600 hover:text-brand transition-colors">
                  Found Items Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report-lost')} className="text-gray-600 hover:text-brand transition-colors">
                  Report a Lost Item
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report-found')} className="text-gray-600 hover:text-brand transition-colors">
                  Report a Found Item
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="text-gray-600 hover:text-brand transition-colors">
                  Admin Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Verification Guidelines */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Claim Guidelines</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">•</span>
                <span>Provide specific unpublicized identifiers (e.g., serial number, hidden scratches, lock screen wallpaper).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">•</span>
                <span>Upload genuine invoices, purchase slips, or old photo proof.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">•</span>
                <span>Contact details are never published publicly to prevent scam calls.</span>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Emergency Support</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand" />
                <span>+1 (800) 555-LOST (5678)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand" />
                <span>support@findlost-hub.org</span>
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-brand flex-shrink-0" />
                <span>Degree Hostel Front Desk & Campus Security Center</span>
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('contact')}
              className="mt-4 text-xs font-bold text-brand bg-brand-50 px-3 py-2 rounded-lg hover:bg-brand-100 transition-colors w-full text-center"
            >
              Open Help Desk Form
            </button>
          </div>

        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} FindLost Platform. Designed with accessibility & safety first.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Safeguards</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Community Verification Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
