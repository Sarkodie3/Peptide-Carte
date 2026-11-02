import React from 'react';
import { Truck, Lock, Clock, ShieldCheck, CheckCircle2, Globe, DollarSign } from 'lucide-react';

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
            Domestic & Worldwide Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Shipping & Payment Policies
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Transparent protocols regarding order processing, Canadian domestic dispatch, international worldwide delivery, and compliant institutional settlement methods.
          </p>
        </div>
      </div>

      {/* Minimum Order Limit Notice Banner */}
      <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 flex items-center justify-between text-xs text-brand-900">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-800 flex-shrink-0" />
          <span>
            <strong>Minimum Order Requirement:</strong> $150.00 CAD across all domestic and international shipments.
          </span>
        </div>
        <span className="font-bold text-brand-950">Free Canadian Delivery at $200+ CAD</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Canadian Shipping Section */}
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
              <span className="text-lg">🇨🇦</span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Canadian Domestic Shipping</h3>
              <p className="text-xs text-slate-500">Fast transit across all Canadian provinces</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Domestic Transit Times</h4>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li><strong>Major Metropolitan Areas:</strong> 2–3 business days via Canada Post Xpresspost or Purolator.</li>
                <li><strong>Regional / Rural Provinces:</strong> 3–5 business days with full tracking.</li>
                <li><strong>Priority Overnight Air:</strong> 1–2 business days guaranteed handling.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Domestic Shipping Rates</h4>
              <p>
                Standard tracked express courier is <strong>$15.00 CAD</strong>, or completely <strong>FREE on domestic orders over $200.00 CAD</strong>. Priority cold-chain overnight is $30.00 CAD ($15.00 CAD on orders over $200).
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Zero Customs Inspection Holds</h4>
              <p>
                Because shipments originate within Canadian distribution hubs, Canadian researchers experience zero border inspection holds or import delays.
              </p>
            </div>
          </div>
        </div>

        {/* International Shipping Section */}
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-800 flex items-center justify-center">
              <Globe className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">International & Worldwide Shipping</h3>
              <p className="text-xs text-slate-500">United States, Europe, Australia & Global</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">International Transit Times</h4>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li><strong>United States:</strong> 3–5 business days via DHL Express / FedEx International Priority.</li>
                <li><strong>United Kingdom & European Union:</strong> 4–6 business days with customs clearance documentation.</li>
                <li><strong>Australia & Asia-Pacific:</strong> 5–7 business days with end-to-end telemetry.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Thermal Stability Packaging</h4>
              <p>
                All international vials are shipped lyophilized in shatter-resistant, light-shielded containers with vacuum thermal insulation, ensuring chemical stability through varied transit temperatures.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">International Rates</h4>
              <p>
                International tracked air courier starts at <strong>$35.00 CAD</strong> (discounted to $20.00 CAD on orders over $250.00 CAD). Priority insulated air is $55.00 CAD.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <DollarSign className="w-5 h-5 text-brand-800" />
          <h3 className="font-extrabold text-slate-900 text-lg">Accepted Payment Pathways</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-brand-900 text-sm block">Interac e-Transfer (Canada Domestic)</span>
            <p className="leading-relaxed">
              Standard domestic settlement across Canadian financial institutions. Instant auto-deposit with order memo reference. Funds are verified within minutes for rapid order fulfillment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50/50 border border-brand-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-brand-950 text-sm block">Cryptocurrency (5% Order Discount)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-800 text-gold-300">Fast & Global</span>
            </div>
            <p className="leading-relaxed">
              Preferred for Canadian and worldwide international laboratories. Settle instantly with your choice of <strong>USDT (TRC-20)</strong>, <strong>Bitcoin (BTC)</strong>, or <strong>Ethereum (ETH)</strong> with an automatic 5% discount applied at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
