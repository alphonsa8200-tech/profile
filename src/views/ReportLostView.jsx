import React, { useState } from 'react';
import { AlertCircle, Upload, CheckCircle2, ArrowLeft, Calendar, MapPin, User, Phone, Mail, FileText, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../data/mockItems';

export default function ReportLostView({ onSubmitLostItem, setActiveTab }) {
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
    const newRefId = `LST-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(newRefId);

    const newItem = {
      ...formData,
      id: newRefId,
      type: 'lost',
      timeAgo: 'Just now',
      shortDescription: formData.detailedDescription.slice(0, 90) + '...',
      status: 'searching',
      image: formData.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    };

    onSubmitLostItem(newItem);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-border shadow-soft space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Report Logged Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1939]">
              Lost Item Broadcasted
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your lost item report for <strong className="text-gray-900">{formData.name}</strong> has been registered. Reference ID: <strong className="text-brand font-mono">{referenceId}</strong>.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-gray-100 text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">Reporter:</span>
              <span className="font-semibold text-gray-800">{formData.reportedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Contact:</span>
              <span className="font-semibold text-gray-800">{formData.contactNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Location Lost:</span>
              <span className="font-semibold text-gray-800">{formData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date Lost:</span>
              <span className="font-semibold text-gray-800">{formData.date}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('gallery')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-hover transition-colors shadow-sm"
            >
              Check Found Items Gallery
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
                });
                setImagePreview(null);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Report Another Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Header & Purpose (Distinct Simple Form Layout) */}
      <div className="mb-8">
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full">
            Layout 1 — Simple Reporting Form
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1939] tracking-tight">
          Report a Lost Item
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Provide as much accurate detail as possible. This helps finders and campus authorities match your missing belonging.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-border shadow-soft space-y-8">
        
        {/* Section 1: Item Details */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">1</span>
            Item Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="name"
                required
                placeholder="e.g. Matte Black iPhone 14 Pro"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Item Category <span className="text-red-500">*</span>
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
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detailedDescription"
              required
              rows={4}
              placeholder="Describe color, brand, unique scratches, protective cover, stickers, or any visible markings..."
              value={formData.detailedDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Be specific about exterior features so good samaritans can recognize it.
            </p>
          </div>

          {/* Picture Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Upload Picture of the Lost Item
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
                    Change Image
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
                    <span className="font-bold text-brand hover:underline">Click to upload photo</span> or drag & drop
                  </div>
                  <p className="text-[11px] text-gray-400">PNG, JPG, or WEBP (Max 5MB)</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Time & Location */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">2</span>
            When & Where Was It Lost?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand" />
                <span>Date When Lost</span> <span className="text-red-500">*</span>
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
                <span>Location Where Lost</span> <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="location"
                required
                placeholder="e.g. Degree hostel lobby, cafeteria, library"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-bold">3</span>
            Your Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand" />
                <span>Full Name</span> <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="reportedBy"
                required
                placeholder="e.g. David Miller"
                value={formData.reportedBy}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand" />
                <span>Contact Number</span> <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel"
                name="contactNumber"
                required
                placeholder="+1 (555) 000-0000"
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
                <span>Email Address</span> <span className="text-red-500">*</span>
              </label>
              <input 
                type="email"
                name="email"
                required
                placeholder="david@example.com"
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
                placeholder="Secondary phone / WhatsApp"
                value={formData.altContact}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Privacy Protection:</strong> Your contact number and email will NOT be displayed publicly to prevent prank calls and fraud. They are only shared once an admin verifies an authorized match.
            </p>
          </div>
        </div>

        {/* Submit Button */}
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
            className="px-8 py-3.5 rounded-xl bg-red-600 text-white font-extrabold text-sm hover:bg-red-700 shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Submit Lost Item
          </button>
        </div>

      </form>

    </div>
  );
}

