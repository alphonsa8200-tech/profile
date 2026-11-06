import React, { useState } from 'react';
import { ArrowLeft, Upload, ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, HelpCircle, Lock, Calendar, MapPin, Tag } from 'lucide-react';

export default function ClaimSplitView({ 
  item, 
  onBack, 
  onSubmitClaim, 
  setActiveTab 
}) {
  const [formData, setFormData] = useState({
    claimantName: '',
    claimantPhone: '',
    claimantEmail: '',
    ownershipStory: '',
    proofDocuments: [],
    serialNumber: '',
    additionalDetails: '',
  });

  const [proofPreview, setProofPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimId, setClaimId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
        setFormData(prev => ({ ...prev, proofDocuments: [reader.result] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClaimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
    setClaimId(newClaimId);

    const newClaim = {
      ...formData,
      id: newClaimId,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      itemLocation: item.location,
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      founderContact: {
        name: item.reportedBy,
        phone: item.contactNumber,
        email: item.email
      }
    };

    onSubmitClaim(newClaim);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-border shadow-soft space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <FileCheck className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Claim Dossier Submitted
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1939]">
              Ownership Claim Under Verification
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your claim for <strong className="text-gray-900">{item.name}</strong> has been forwarded to the verification administrators.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl text-left text-xs space-y-2.5 border border-gray-100 text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-400">Claim Reference:</span>
              <span className="font-mono font-bold text-brand">{claimId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Claimant:</span>
              <span className="font-semibold">{formData.claimantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Pending Admin Review
              </span>
            </div>
            <p className="text-[11px] text-gray-400 pt-2 border-t border-gray-200">
              Administrators will review your submitted proof of ownership against the item's verified records. You will receive an email status alert once approved.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('admin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-hover transition-colors shadow-sm"
            >
              View in Admin Review Portal
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4">
      
      {/* Top Breadcrumb & Status */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Found Items</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider bg-purple-100 text-brand px-3 py-1 rounded-full border border-purple-200">
              Layout 4 — Split-Screen Claim Layout
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1939] tracking-tight mt-1">
            Claim This Item
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Two-factor Ownership Verification Required</span>
        </div>
      </div>

      {/* 50/50 SPLIT-SCREEN LAYOUT: Left = Item Details, Right = Verification Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (5 Cols): Item Details Side */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-soft">
            
            {/* High-res Item Picture */}
            <div className="relative aspect-[4/3] bg-gray-100">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider bg-brand text-white px-3 py-1 rounded-full shadow-xs">
                  Found Item
                </span>
                <span className="text-xs font-bold bg-white/95 text-gray-800 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Item Dossier Info */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-gray-400">REF: {item.id}</span>
                <h2 className="text-xl font-extrabold text-[#1C1939] mt-0.5">
                  {item.name}
                </h2>
              </div>

              <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand shrink-0" />
                  <span><strong>Date Found:</strong> {item.date} ({item.timeAgo})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand shrink-0" />
                  <span><strong>Location:</strong> {item.location}</span>
                </div>
                {item.custody && (
                  <div className="flex items-center gap-2 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Current Safe Holding:</strong> {item.custody}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Public Description
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {item.detailedDescription || item.shortDescription}
                </p>
              </div>

              {/* Anti-Fraud Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Ownership Proof Standard</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  To prevent unauthorized claims, please provide details only known to the real owner (such as serial numbers, lock wallpapers, interior contents, or purchase invoices).
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (7 Cols): Ownership Verification Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-soft space-y-6">
            
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#1C1939]">
                Ownership Verification Form
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete this form to demonstrate ownership of the item on the left.
              </p>
            </div>

            {/* 1. Claimant Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[11px] flex items-center justify-center font-bold">1</span>
                Claimant's Contact Information
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Claimant's Full Name <span className="text-brand">*</span>
                </label>
                <input 
                  type="text"
                  name="claimantName"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.claimantName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Contact Number <span className="text-brand">*</span>
                  </label>
                  <input 
                    type="tel"
                    name="claimantPhone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.claimantPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-brand">*</span>
                  </label>
                  <input 
                    type="email"
                    name="claimantEmail"
                    required
                    placeholder="alex.j@example.com"
                    value={formData.claimantEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
              </div>
            </div>

            {/* 2. Ownership Narrative */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[11px] flex items-center justify-center font-bold">2</span>
                Why Does This Item Belong To You?
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Detailed Explanation & Identifying Proof <span className="text-brand">*</span>
                </label>
                <textarea
                  name="ownershipStory"
                  required
                  rows={4}
                  placeholder="Describe secret identifying details: e.g. wallpaper picture, internal pocket contents, unique scratches, sticker placement, or Bluetooth device name..."
                  value={formData.ownershipStory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </div>
            </div>

            {/* 3. Upload Proof of Ownership */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[11px] flex items-center justify-center font-bold">3</span>
                Upload Proof of Ownership
              </h4>

              <div className="border-2 border-dashed border-gray-200 hover:border-brand/50 rounded-2xl p-5 text-center transition-all bg-gray-50/50">
                {proofPreview ? (
                  <div className="space-y-3">
                    <img 
                      src={proofPreview} 
                      alt="Proof Preview" 
                      className="max-h-40 mx-auto rounded-xl object-contain shadow-xs"
                    />
                    <label className="inline-block px-3 py-1.5 text-xs font-bold text-brand bg-brand-50 hover:bg-brand-100 rounded-lg cursor-pointer">
                      Replace Document
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        className="hidden" 
                        onChange={handleProofChange}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs text-brand flex items-center justify-center mx-auto border border-gray-100">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-bold text-brand hover:underline">Upload proof of ownership</span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Photo of receipt, original box, serial number, warranty card, or personal photo with item
                    </p>
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      className="hidden" 
                      onChange={handleProofChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* 4. Additional Identifying Details (Serial Number, etc.) */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[11px] flex items-center justify-center font-bold">4</span>
                Additional Identifying Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Serial Number / IMEI (If applicable)
                  </label>
                  <input 
                    type="text"
                    name="serialNumber"
                    placeholder="e.g. Serial # or IMEI code"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Other Secret Features
                  </label>
                  <input 
                    type="text"
                    name="additionalDetails"
                    placeholder="e.g. Lock screen PIN hint, keychain brand"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
              </div>
            </div>

            {/* Submit Ownership Claim Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Back to Item
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-brand text-white font-extrabold text-sm hover:bg-brand-hover shadow-md shadow-brand/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                Submit Ownership Claim
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}

