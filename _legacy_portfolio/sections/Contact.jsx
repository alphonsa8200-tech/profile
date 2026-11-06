import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject.";
    if (!formData.message.trim()) {
      errs.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate sending time & transition to success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleMailtoDirect = () => {
    const mailtoUrl = `mailto:${personalInfo.socials.email.address}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Alphonsa,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socials.email.address);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          tag="GET IN TOUCH"
          title="Let's Build Something Meaningful Together."
          subtitle="I'm always interested in exploring new opportunities, connecting with people, and learning through meaningful collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Details & Availability */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-subtle">
              <h3 className="text-xl font-bold text-primary mb-2">
                Let's Talk Tech & Ideas
              </h3>
              <p className="text-sm text-primary-muted leading-relaxed mb-6">
                Whether you have an entry-level opportunity, an interesting project idea, or simply wish to say hello, feel free to reach out directly.
              </p>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F3F5F7] border border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary-subtle">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${personalInfo.socials.email.address}`}
                      className="text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors truncate block"
                    >
                      {personalInfo.socials.email.address}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-primary-muted hover:text-accent hover:bg-white transition-colors"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F3F5F7] border border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary-subtle">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-primary">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                {/* Status / Availability */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Current Status
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                      {personalInfo.statusBadge}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-bold text-primary tracking-wider uppercase mb-3">
                  Online Profiles
                </p>
                <SocialLinks iconSize="w-4 h-4" showLabels={true} />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-subtle relative overflow-hidden">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    Message Prepared!
                  </h3>
                  <p className="text-sm text-primary-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-primary">{formData.name}</span>! You can also click below to open your preferred email client directly to dispatch this message to Alphonsa.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleMailtoDirect}
                    >
                      Send via Email Client (Direct)
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Write Another Note
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <h3 className="font-bold text-lg text-primary">Send a Direct Message</h3>
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className={`w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border text-sm text-primary placeholder:text-primary-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          errors.name ? 'border-red-400 bg-red-50/20' : 'border-border focus:border-accent'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. jane@company.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border text-sm text-primary placeholder:text-primary-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-border focus:border-accent'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full Stack Developer Opportunity / Project Discussion"
                      className={`w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border text-sm text-primary placeholder:text-primary-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                        errors.subject ? 'border-red-400 bg-red-50/20' : 'border-border focus:border-accent'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the role, project collaboration, or opportunity..."
                      className={`w-full px-4 py-3 rounded-2xl bg-[#FAFAF8] border text-sm text-primary placeholder:text-primary-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-y ${
                        errors.message ? 'border-red-400 bg-red-50/20' : 'border-border focus:border-accent'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={Send}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>

                  {/* Informational integration note */}
                  <p className="text-[11px] text-center text-primary-subtle pt-2">
                    Note: To connect this form directly to an automated inbox service, you can configure EmailJS or Formspree in this component.
                  </p>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

