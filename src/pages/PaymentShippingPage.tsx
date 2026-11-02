import React from 'react';
import { Truck, Lock, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface PaymentShippingProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PaymentShippingPage: React.FC<PaymentShippingProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            Domestic Logistics & Policies
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Payment & Shipping Policies
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Transparent protocols regarding order processing, discreet protective packaging, domestic Canadian transit times, and institutional invoice processing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Section */}
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Shipping Information</h3>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Order Processing</h4>
              <p>
                Inquiries and verified purchase orders confirmed prior to 1:00 PM EST on business days are typically packaged and dispatched same-day. Orders confirmed over weekends or Canadian statutory holidays are processed the next business day.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Domestic Delivery Times</h4>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li><strong>Major Metropolitan Areas:</strong> 2–3 business days.</li>
                <li><strong>Regional / Rural Provinces:</strong> 3–5 business days.</li>
                <li><strong>Expedited Priority Courier:</strong> Available upon request for time-sensitive assay schedules.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Packaging Standards</h4>
              <p>
                All peptides are enclosed in shatter-resistant, light-shielded, vacuum-sealed containment with cold-pack protection where indicated, ensuring stability through typical transit variations.
              </p>
            </div>
          </div>
        </div>

        {/* Payment & Compliance Section */}
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Payment Methods & Terms</h3>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Accepted Payment Methods</h4>
              <p>
                For compliant research reference material transactions, we accept:
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600 mt-1">
                <li><strong>Interac e-Transfer:</strong> Standard instant domestic settlement across Canadian financial institutions.</li>
                <li><strong>Institutional Bank Wire / ACH:</strong> Recommended for universities and large bulk orders.</li>
                <li><strong>Cryptocurrency (USDT/BTC):</strong> Available for automated, irreversible international research settlements.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">50-Day Quality Assurance</h4>
              <p>
                Should any unopened compound fail independent chromatographic verification against our published Certificate of Analysis, our support team will provide replacement lots or full credit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
