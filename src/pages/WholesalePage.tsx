import React, { useState } from 'react';
import { wholesaleData } from '../data/wholesaleData';
import { Briefcase, CheckCircle2, Send, Building2, Mail, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    peptidesNeeded: '',
    vialQuantity: '25-49',
    timeline: 'Within 2 weeks',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Briefcase className="w-3.5 h-3.5 text-gold-400" />
            Institutional & Laboratory Supply
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Wholesale & Bulk Peptide Supply
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Scalable, high-volume procurement programs tailored for academic faculties, independent clinical laboratories, and institutional researchers across North America.
          </p>
        </div>
      </div>

      {/* Tiered Discount Cards */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Volume Discount Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Automated tier savings applied to bulk research inquiries. Mix and match between different peptide sequences within a single purchase order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wholesaleData.tiers.map((tier, idx) => (
            <div
              key={tier.tier}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                idx === 1
                  ? 'bg-gradient-to-b from-brand-900 via-brand-950 to-brand-900 text-white border-brand-700 shadow-brand-lg relative overflow-hidden transform md:-translate-y-2'
                  : 'bg-white text-slate-900 border-brand-100 shadow-sm hover:shadow-brand'
              }`}
            >
              {idx === 1 && (
                <span className="absolute top-4 right-4 bg-gold-500 text-brand-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-gold">
                  Most Popular
                </span>
              )}

              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${idx === 1 ? 'text-gold-400' : 'text-brand-800'}`}>
                  {tier.quantity}
                </span>
                <h3 className="text-xl font-extrabold mt-1">{tier.tier}</h3>
                <div className={`text-3xl font-extrabold mt-4 mb-6 ${idx === 1 ? 'text-gold-400' : 'text-brand-900'}`}>
                  {tier.discount}
                </div>

                <ul className="space-y-3 text-xs">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${idx === 1 ? 'text-gold-400' : 'text-emerald-600'}`} />
                      <span className={idx === 1 ? 'text-purple-200' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100/20">
                <a
                  href="#inquiry-form"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    idx === 1
                      ? 'bg-gold-500 hover:bg-gold-400 text-brand-950 shadow-gold'
                      : 'bg-brand-800 hover:bg-brand-900 text-white'
                  }`}
                >
                  <span>Request Tier Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Process */}
      <div className="bg-white rounded-3xl border border-brand-100 p-8 sm:p-12 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900 text-center mb-10">
          How Institutional Ordering Operates
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wholesaleData.process.map((p) => (
            <div key={p.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-brand-800 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                {p.step}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wholesale Inquiry Form */}
      <div id="inquiry-form" className="bg-white rounded-3xl border border-brand-200 p-8 sm:p-12 shadow-brand">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Direct Account Setup
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Submit Wholesale Supply Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Provide your laboratory credentials and compound requirements for a formal itemized quotation.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Wholesale Inquiry Received
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong> from <strong>{formData.institution}</strong>. Our senior accounts director will reach out to <strong>{formData.email}</strong> within 2 business hours with formal invoicing and lot reservations.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Principal Investigator / Contact *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Alexander Wright"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="awright@labresearch.ca"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institution / Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="University Biochemistry Dept"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Quantity Range *</label>
                  <select
                    value={formData.vialQuantity}
                    onChange={(e) => setFormData({ ...formData, vialQuantity: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs cursor-pointer font-medium"
                  >
                    <option value="10-24">10 – 24 Vials (15% Tier)</option>
                    <option value="25-49">25 – 49 Vials (25% Tier)</option>
                    <option value="50-100">50 – 100 Vials (Bulk Custom)</option>
                    <option value="100+">100+ Vials (Enterprise Batch)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Study Timeline Requirement</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs cursor-pointer font-medium"
                  >
                    <option value="Immediate">Immediate (Within 48 hours)</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="1 month">Next month</option>
                    <option value="Quarterly standing">Quarterly standing supply</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Peptides & Quantities Requested *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.peptidesNeeded}
                  onChange={(e) => setFormData({ ...formData, peptidesNeeded: e.target.value })}
                  placeholder="e.g., 20x Tirzepatide 15mg, 15x BPC-157 10mg, 10x Bacteriostatic Water 30mL..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white font-bold text-sm shadow-brand hover:shadow-brand-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-gold-300" />
                <span>Submit Institutional Wholesale Quote Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
