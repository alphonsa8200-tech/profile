'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long does standard and express shipping take?',
    answer:
      'Express domestic shipping takes 1–3 business days. International orders generally arrive within 4–7 business days with end-to-end tracking. All orders over $150 qualify for complimentary express delivery.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer:
      'We offer a 30-day no-questions-asked return policy on all eligible hardware, apparel, and audio items. Items must be returned in their original packaging with all included accessories.',
  },
  {
    question: 'Do all tech and audio products carry a manufacturer warranty?',
    answer:
      'Yes, all audio gear, smartphones, and electronic accessories include a 2-year full hardware warranty covering mechanical defects, driver failures, and battery degradation.',
  },
  {
    question: 'Can I use promo codes together with sale discounts?',
    answer:
      'Yes! You can enter promotional codes like MINIMAL10 or ELITE50 at checkout to receive additional discounts on top of existing deals.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-10 shadow-xs">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Everything you need to know about delivery, warranties, and orders.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-200/80 rounded-2xl overflow-hidden transition-all bg-zinc-50/50"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-zinc-900 hover:text-brand-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 ml-4 transition-transform ${
                      isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : 'text-zinc-500'
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-white pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

