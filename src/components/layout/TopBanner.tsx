import React from 'react';
import { Truck, ShieldCheck, Award, Lock, ShoppingBag } from 'lucide-react';

export const TopBanner: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white text-xs py-2 px-4 border-b border-brand-800/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 mx-auto md:mx-0 flex-wrap justify-center text-[11px] md:text-xs">
          <span className="flex items-center gap-1.5 font-medium text-purple-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            🇨🇦 Ships Directly From Canada — No Customs Delays
          </span>
          <span className="hidden sm:inline-block text-brand-400">•</span>
          <span className="hidden sm:flex items-center gap-1.5 text-gold-300 font-semibold">
            <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
            Minimum Order: $150.00 CAD
          </span>
          <span className="hidden lg:inline-block text-brand-400">•</span>
          <span className="hidden lg:flex items-center gap-1.5 text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            HPLC Third-Party Verified (≥ 99% Purity)
          </span>
          <span className="hidden xl:inline-block text-brand-400">•</span>
          <span className="hidden xl:flex items-center gap-1.5 text-purple-200">
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            Free Express Delivery on Orders $200+
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-gold-300 font-medium">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-gold-400" />
            Secure Verification
          </span>
          <span className="text-brand-500">|</span>
          <span className="text-purple-300">Currency: <strong className="text-white">CAD ($)</strong></span>
        </div>
      </div>
    </aside>
  );
};
