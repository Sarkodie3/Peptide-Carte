import React, { useState } from 'react';
import { faqData, FAQItem } from '../data/faqData';
import { HelpCircle, ChevronDown, Search, Truck, ShieldCheck, Award, MessageSquare } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'Shipping & Fulfillment', 'Product Quality & Verification', 'Orders & Inquiries'];

  const filteredFaqs = faqData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            Knowledge Base & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Find immediate answers regarding Canadian shipping timelines, purity verification standards, storage guidelines, and laboratory ordering.
          </p>
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xl font-bold text-brand-950 block">🇨🇦 Canada</span>
          <span className="text-xs text-slate-500">Ships Domestically</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xl font-bold text-brand-950 block">≥ 99%</span>
          <span className="text-xs text-slate-500">HPLC Purity Standard</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xl font-bold text-brand-950 block">50 Days</span>
          <span className="text-xs text-slate-500">Satisfaction Guarantee</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xl font-bold text-brand-950 block">24/7</span>
          <span className="text-xs text-slate-500">Encrypted Inquiries</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand-50 text-brand-800' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 mt-1">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help CTA Box */}
      <div className="bg-brand-50 rounded-3xl p-8 border border-brand-100 text-center space-y-3">
        <MessageSquare className="w-8 h-8 text-brand-800 mx-auto" />
        <h3 className="font-bold text-slate-900 text-base">Have an Unanswered Technical Question?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Our scientific analytical support team is ready to provide guidance regarding chromatography, stability, or custom synthesis.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          Contact Laboratory Support
        </button>
      </div>
    </div>
  );
};
