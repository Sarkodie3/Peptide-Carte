import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, ShieldAlert, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Laboratory Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Mail className="w-3.5 h-3.5 text-gold-400" />
            Direct Support Line
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Laboratory Support
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Have a question regarding analytical lot purity, domestic shipping schedules, or bulk quotes? Our scientific team is here to assist.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Contact Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Email Support</span>
                  <a href="mailto:support@peptidecart.is" className="text-brand-800 font-semibold hover:underline">
                    support@peptidecart.is
                  </a>
                  <p className="text-slate-400 mt-0.5">Average response: Under 2 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Operating Hours</span>
                  <p className="text-slate-600 font-medium">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                  <p className="text-slate-400 mt-0.5">Weekend email inquiries processed Monday morning</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Fulfillment Centers</span>
                  <p className="text-slate-600 font-medium">Domestic Distribution Facilities</p>
                  <p className="text-slate-400 mt-0.5">Ontario & British Columbia, Canada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Compliance Notice */}
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Inquiry Protocol Notice</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Peptide Cart exclusively responds to questions regarding chemical purity, handling, analytical specifications, and institutional order status. We cannot provide advice regarding in-vivo dosing, clinical protocols, or human application.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-brand">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A support ticket has been opened. Our representative will reply directly to <strong>{formData.email}</strong> promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="pt-2 text-xs font-bold text-brand-800 underline hover:text-brand-950"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Send a Direct Message
                </h3>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Michael Lee"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mlee@biocore.ca"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic / Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs cursor-pointer font-medium"
                  >
                    <option value="General Laboratory Inquiry">General Laboratory Inquiry</option>
                    <option value="HPLC Batch Report Verification">HPLC Batch Report Verification</option>
                    <option value="Order Tracking & Shipping">Domestic Shipping & Dispatch</option>
                    <option value="Wholesale & Bulk Quotation">Wholesale & Institutional Quotation</option>
                    <option value="Custom Peptide Synthesis">Custom Peptide Synthesis</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message Details *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include relevant product SKUs, batch numbers, or study parameters..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white font-bold text-sm shadow-brand hover:shadow-brand-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-300" />
                  <span>Send Laboratory Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
