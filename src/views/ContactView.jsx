import React, { useState } from 'react';
import { Mail, Phone, User, Send, CheckCircle2, ShieldCheck, MapPin, ArrowLeft, MessageSquare } from 'lucide-react';

export default function ContactView({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    subject: 'General Inquiry',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider bg-brand-50 text-brand px-3 py-1 rounded-full border border-brand/20">
            Layout 6 — Contact & Community Assistance
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1939] tracking-tight">
          Contact Us & Help Center
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-xl">
          Have a question about a lost belonging, need help verifying a claim, or wish to report suspicious activity? Reach out to our community support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Contact Information & Safe Handover Policy (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-surface-border shadow-soft space-y-5">
            <h3 className="font-extrabold text-base text-[#1C1939]">
              Physical Help Desks
            </h3>
            
            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">Central Campus Lost & Found</strong>
                  <span>Main Administration Building, Counter #4, Ground Floor</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cardPastel-yellow text-amber-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">Degree Hostel Reception Desk</strong>
                  <span>Hostel Block B Entrance Lobby (24/7 safe custodian)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">Helpline & WhatsApp</strong>
                  <span>+1 (800) 555-LOST (5678)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-brand flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold">Email Inquiries</strong>
                  <span>support@findlost-hub.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Bridge Guarantee Box */}
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200/70 text-xs text-amber-950 space-y-2.5">
            <div className="flex items-center gap-2 font-extrabold text-sm text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Contact Privacy Guarantee</span>
            </div>
            <p className="leading-relaxed">
              To protect both lost item reporters and honest finders, personal phone numbers and email addresses are securely recorded in the database but <strong>held confidential</strong>.
            </p>
            <p className="leading-relaxed">
              Direct contact details are only released to the respective parties once an institutional administrator verifies proof of ownership.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form (7 cols) */}
        <div className="md:col-span-7">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl p-8 border border-surface-border shadow-soft text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1C1939]">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                Thank you for contacting us, <strong>{formData.name}</strong>. A support officer will review your query and respond to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', message: '', subject: 'General Inquiry' });
                }}
                className="px-6 py-2.5 rounded-xl bg-brand text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-soft space-y-5">
              <h3 className="text-base font-extrabold text-[#1C1939] pb-2 border-b border-gray-100">
                Send a Message
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand" />
                  <span>Your Full Name</span> <span className="text-brand">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand" />
                    <span>Phone Number</span> <span className="text-brand">*</span>
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand" />
                    <span>Email Address</span> <span className="text-brand">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Urgent Lost Belonging Alert">Urgent Lost Belonging Alert</option>
                  <option value="Claim Verification Assistance">Claim Verification Assistance</option>
                  <option value="Report False Claim or Abuse">Report False Claim or Abuse</option>
                  <option value="Physical Handover Appointment">Physical Handover Appointment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-brand" />
                  <span>Message Box</span> <span className="text-brand">*</span>
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type your message, item reference code, or question here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand text-white font-extrabold text-sm hover:bg-brand-hover shadow-md shadow-brand/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}

