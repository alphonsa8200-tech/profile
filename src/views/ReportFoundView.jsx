import React, { useState } from 'react';
import { Upload, CheckCircle2, ArrowLeft, Calendar, MapPin, User, Phone, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockItems';

export default function ReportFoundView({ onSubmitFoundItem, setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile',
    image: '',
    detailedDescription: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    reportedBy: '',
    contactNumber: '',
    email: '',
    altContact: '',
    custody: 'I have the item with me',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRefId = `FND-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(newRefId);

    const newItem = {
      ...formData,
      id: newRefId,
      type: 'found',
      timeAgo: 'Just now',
      shortDescription: formData.detailedDescription.slice(0, 95) + '...',
      status: 'available',
      image: formData.image || 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    };

    onSubmitFoundItem(newItem);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-border shadow-soft space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-50 px-3 py-1 rounded-full border border-brand/20">
              Thank You Good Samaritan!
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1939]">
              Found Item Listed in Gallery
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your report for <strong className="text-gray-900">{formData.name}</strong> is live. When the owner submits a claim with proof of ownership, administrators will review it.
            </p>
          </div>

          <div className="bg-cardPastel-yellow/50 p-4 rounded-2xl text-left text-xs space-y-2 border border-amber-200/50 text-amber-950">
            <div className="flex justify-between">
              <span className="text-amber-800/70">Found Item Ref:</span>
              <span className="font-mono font-bold text-brand">{referenceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800/70">Founder Name:</span>
              <span className="font-semibold">{formData.reportedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800/70">Location Found:</span>
              <span className="font-semibold">{formData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800/70">Safely Held At:</span>
              <span className="font-semibold">{formData.custody}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('gallery')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-hover transition-colors shadow-sm"
            >
              View in Found Gallery
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  category: 'Mobile',
                  image: '',
                  detailedDescription: '',
                  date: new Date().toISOString().split('T')[0],
                  location: '',
                  reportedBy: '',
                  contactNumber: '',
                  email: '',
                  altContact: '',
                  custody: 'I have the item with me',
                });
                setImagePreview(null);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Report Another Found Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Header (Layout 2) */}
      <div className="mb-8">
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-brand-50 text-brand px-3 py-1 rounded-full border border-brand/20">
            Layout 2 — Found Item Submission
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1939] tracking-tight">
          Report a Found Item
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Thank you for helping reunite an item with its owner! Fill in where and what you found.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-border shadow-soft space-y-8">
        
        {/* Section 1: Item Details */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">1</span>
            Found Item Description
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Item Name <span className="text-brand">*</span>
              </label>
              <input 
                type="text"
                name="name"
                required
                placeholder="e.g. Apple AirPods Pro (3rd Gen)"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category <span className="text-brand">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Description of the Item <span className="text-brand">*</span>
            </label>
            <textarea
              name="detailedDescription"
              required
              rows={4}
              placeholder="Describe condition, color, brand, any visible characteristics (tip: keep secret identifying numbers hidden for ownership test)..."
              value={formData.detailedDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
          </div>

          {/* Picture Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Upload Picture of the Found Item
            </label>
            <div className="border-2 border-dashed border-gray-200 hover:border-brand/50 rounded-2xl p-6 text-center transition-all bg-gray-50/50">
              {imagePreview ? (
                <div className="space-y-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-xl object-contain shadow-xs"
                  />
                  <label className="inline-block px-4 py-1.5 text-xs font-bold text-brand bg-brand-50 hover:bg-brand-100 rounded-lg cursor-pointer">
                    Change Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer block space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs text-brand flex items-center justify-center mx-auto border border-gray-100">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-brand hover:underline">Click to upload photo</span> of found item
                  </div>
                  <p className="text-[11px] text-gray-400">Clear picture showing general appearance</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200/50">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Safety Tip: Do not photograph credit card numbers, passwords, or full sensitive national ID numbers.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Date, Location & Safe Custody */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">2</span>
            Location & Custody
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand" />
                <span>Date When Found</span> <span className="text-brand">*</span>
              </label>
              <input 
                type="date"
                name="date"
                required
                max={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>Location Where Found</span> <span className="text-brand">*</span>
              </label>
              <input 
                type="text"
                name="location"
                required
                placeholder="e.g. Degree hostel bench, library desk 4"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Current Safe Custody / Storage Location
            </label>
            <input 
              type="text"
              name="custody"
              placeholder="e.g. Kept with me / Handed to Campus Security / Kept at Hostel Reception"
              value={formData.custody}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
          </div>
        </div>

        {/* Section 3: Good Samaritan Contact */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">3</span>
            Name & Contact of Person Who Found It
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand" />
                <span>Your Name</span> <span className="text-brand">*</span>
              </label>
              <input 
                type="text"
                name="reportedBy"
                required
                placeholder="e.g. Marcus Vance"
                value={formData.reportedBy}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand" />
                <span>Contact Number</span> <span className="text-brand">*</span>
              </label>
              <input 
                type="tel"
                name="contactNumber"
                required
                placeholder="+1 (555) 441-2309"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand" />
                <span>Email Address</span> <span className="text-brand">*</span>
              </label>
              <input 
                type="email"
                name="email"
                required
                placeholder="marcus@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>Alternative Contact (Optional)</span>
              </label>
              <input 
                type="tel"
                name="altContact"
                placeholder="Secondary phone"
                value={formData.altContact}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Found Item Button */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="text-xs font-bold text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-brand text-white font-extrabold text-sm hover:bg-brand-hover shadow-md shadow-brand/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Submit Found Item
          </button>
        </div>

      </form>
    </div>
  );
}

