import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, ShieldAlert, MessageSquare, AlertCircle } from 'lucide-react';
import { sendNotificationEmail, ADMIN_EMAIL } from '../services/emailService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: 'Client Complaint / Order Issue Resolution',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await sendNotificationEmail({
      type: 'contact',
      subject: `[${formData.subject}] from ${formData.name}`,
      senderName: formData.name,
      senderEmail: formData.email,
      senderPhone: formData.phone,
      details: {
        subject: formData.subject,
        orderOrBatchRef: formData.orderNumber || 'Not provided',
        directAdminRecipient: ADMIN_EMAIL,
      },
      message: formData.message,
    });

    setIsSubmitting(false);
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
            Central Support & Complaints Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Client Support & Inquiries
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Have a question regarding order tracking, lot purity, or need to file a complaint or resolution request? All submissions are routed directly to our dedicated email operations desk.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Direct Communication
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Direct Email Support</span>
                  <a href={`mailto:${ADMIN_EMAIL}`} className="text-brand-800 font-semibold hover:underline">
                    {ADMIN_EMAIL}
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
                  <p className="text-slate-400 mt-0.5">Weekend emails monitored for priority resolutions</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Fulfillment Centers</span>
                  <p className="text-slate-600 font-medium">Domestic Distribution Facilities</p>
                  <p className="text-slate-400 mt-0.5">Ontario & British Columbia, Canada (Global Express Air)</p>
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

        {/* Right Column: Inquiry & Complaint Form */}
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
                  Thank you, <strong>{formData.name}</strong>. Your submission has been delivered directly to <strong className="text-brand-900">{ADMIN_EMAIL}</strong>. A support ticket has been recorded, and our team will reply promptly to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      orderNumber: '',
                      subject: 'Client Complaint / Order Issue Resolution',
                      message: '',
                    });
                  }}
                  className="pt-2 text-xs font-bold text-brand-800 underline hover:text-brand-950"
                >
                  Submit another message or complaint
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">
                    Client Inquiries & Complaints
                  </h3>
                  <span className="text-[11px] font-semibold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                    Direct to {ADMIN_EMAIL}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Order # or Batch Lot (If applicable)</label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g., PC-294810 or LOT #202410"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic / Issue Category *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs cursor-pointer font-medium"
                  >
                    <option value="Client Complaint / Order Issue Resolution">Client Complaint / Order Issue Resolution</option>
                    <option value="Order Tracking & Shipping Status">Order Tracking & Domestic / International Shipping</option>
                    <option value="HPLC Batch Report Verification">HPLC Batch Report & Purity Verification</option>
                    <option value="General Laboratory Inquiry">General Laboratory & Reconstitution Inquiry</option>
                    <option value="Wholesale & Bulk Quotation">Wholesale & Institutional Quotation</option>
                    <option value="Custom Peptide Synthesis">Custom Peptide Synthesis</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Complaint / Message Details *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify the nature of your complaint or inquiry in detail, including relevant dates, tracking numbers, or laboratory results..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white font-bold text-sm shadow-brand hover:shadow-brand-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-gold-300" />
                  <span>{isSubmitting ? 'Routing Submission...' : 'Submit Inquiry / Complaint'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
