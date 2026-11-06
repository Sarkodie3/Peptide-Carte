import React, { useState } from 'react';
import { ShieldCheck, Truck, Lock, Mail, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenAdminOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminOrders }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#180E29] to-[#0F081C] text-slate-300 pt-16 pb-12 border-t border-brand-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter / Discount Offer Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 rounded-2xl p-6 sm:p-10 border border-brand-700/60 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-400/30 mb-3">
                Exclusive Research Offer
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                GET <span className="text-gold-400">10% OFF</span> YOUR INITIAL STUDY ORDER
              </h3>
              <p className="text-sm text-purple-200/80 mt-2">
                Be the first to receive notifications regarding verified batch restocks, newly sequenced peptides, and analytical lab updates.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-md">
              {subscribed ? (
                <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-white text-sm">Welcome to Peptide Cart!</p>
                    <p>Use research coupon code <strong className="text-gold-300 font-mono tracking-wider">RESEARCH10</strong> at inquiry confirmation.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter institutional or lab email..."
                      required
                      className="w-full bg-brand-950/80 border border-brand-700/60 text-white placeholder-purple-300/50 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-brand-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-gold flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-purple-300/60 mt-2 text-center lg:text-left">
                By subscribing, you agree to receive analytical and catalog updates. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-white/10">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-800/80 text-gold-400 flex items-center justify-center flex-shrink-0 border border-brand-700/50">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Secure Verification</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Safe, confidential inquiry processing and encrypted verification protocol for academic and private labs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-800/80 text-gold-400 flex items-center justify-center flex-shrink-0 border border-brand-700/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Canada & Global Express Dispatch</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Discreet, temperature-conscious packaging dispatched across Canadian provinces and worldwide via DHL / FedEx International Priority.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-800/80 text-gold-400 flex items-center justify-center flex-shrink-0 border border-brand-700/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Third-Party HPLC Tested</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every batch certified by HYTE Research Division with HPLC analysis verifying ≥ 99.0% minimum purity.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-white/10 text-sm">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-800 to-brand-700 flex items-center justify-center text-gold-400 border border-brand-600/40">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 0 1 1-4 0" />
                  <circle cx="12" cy="15" r="1.5" fill="#C9A962" stroke="none" />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight font-sans">
                PEPTIDE<span className="text-brand-400">CART</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted laboratory source for analytical research peptides, GLP sequences, and laboratory reconstitution accessories. Transparent science, verified purity, and domestic Canada & international delivery.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Email: <a href="mailto:peptidecart0@gmail.com" className="text-gold-400 hover:underline">peptidecart0@gmail.com</a> • <a href="mailto:peptide0@gmail.com" className="text-gold-400 hover:underline">peptide0@gmail.com</a></p>
              <p>Location: Fulfillment Hubs in Canada • Global Air Dispatch</p>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-900 flex items-center justify-between">
              <span>Catalog</span>
              <span className="text-[10px] text-gold-400">80 Items</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-gold-300 transition-colors">
                  All Research Compounds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Best Sellers')} className="hover:text-gold-300 transition-colors">
                  Best Sellers (GLOW, BPC-157, Semaglutide)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'GLP')} className="hover:text-gold-300 transition-colors">
                  GLP-1 & Multi-Agonist Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Non-GLP')} className="hover:text-gold-300 transition-colors">
                  Cellular & Tissue Repair Peptides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Reconstitution')} className="hover:text-gold-300 transition-colors">
                  Bacteriostatic Water & Diluents
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Support & Science */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-900">
              Science & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('calculator')} className="text-purple-200 font-semibold hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  Peptide Reconstitution Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab-results')} className="text-purple-200 font-semibold hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  Lab Results / 37 COA Reports
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-gold-300 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('payment-shipping')} className="hover:text-gold-300 transition-colors">
                  Payment & Shipping Policies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-gold-300 transition-colors">
                  Contact Laboratory Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Wholesale */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-900">
              Institutional
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold-300 transition-colors">
                  About Peptide Cart Canada
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wholesale')} className="hover:text-gold-300 transition-colors">
                  Wholesale & Bulk Orders (Up to 25% Off)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-gold-300 transition-colors">
                  Terms of Use & Research Agreement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-gold-300 transition-colors">
                  Privacy Policy & Data Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Legal Disclaimer */}
        <div className="pt-8 pb-4 text-xs text-slate-400 leading-relaxed border-b border-white/5">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-950/90 border border-brand-900/60">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-200 uppercase tracking-wide text-[11px]">
                Mandatory Laboratory Research Disclaimer
              </p>
              <p className="text-[11px] text-slate-400">
                All products distributed by Peptide Cart are strictly intended for <em>in-vitro</em> laboratory research, analytical calibration, and educational biochemical testing. They are strictly not intended for human or animal consumption, diagnostic use, or therapeutic treatment. Purchasers must be qualified researchers, affiliated with registered educational institutions or analytical laboratories, and fully assume responsibility for compliance with all relevant provincial, federal, and international regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Peptide Cart (peptidecart.is). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300">Terms of Use</button>
            <span>•</span>
            <button onClick={() => onNavigate('payment-shipping')} className="hover:text-slate-300">Shipping Terms</button>
            <span>•</span>
            <button onClick={() => onNavigate('lab-results')} className="hover:text-slate-300">COA Registry</button>
            {onOpenAdminOrders && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdminOrders}
                  className="text-slate-400 hover:text-gold-400 transition-colors font-medium flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-gold-400" />
                  <span>Fulfillment Desk</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
