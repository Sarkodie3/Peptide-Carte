import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';

export const ComplianceModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('peptide_cart_verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('peptide_cart_verified', 'true');
    setIsOpen(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-brand-200 relative overflow-hidden">
        {/* Top header accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-800 via-gold-500 to-brand-900" />

        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Research Verification & Compliance
          </h3>
          <p className="text-xs text-brand-800 font-semibold uppercase tracking-wider mt-1">
            Peptide Cart Canada — In-Vitro Biochemical Repository
          </p>
        </div>

        <div className="my-5 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              I confirm that I am at least <strong>21 years of age</strong> and legally authorized to acquire biochemical reference materials.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              I understand that all products listed are strictly intended for <strong>in-vitro laboratory, analytical, and academic research</strong>.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              Under no circumstances are these compounds for human, animal, agricultural, cosmetic, or therapeutic consumption.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExit}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
          >
            Leave Website
          </button>
          <button
            onClick={handleConfirm}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white font-bold text-sm shadow-brand hover:shadow-brand-lg transition-all"
          >
            I Confirm & Agree
          </button>
        </div>

        <p className="text-[10px] text-slate-400 text-center mt-4">
          By proceeding, you agree to our Terms of Use and acknowledge non-transactional compliance.
        </p>
      </div>
    </div>
  );
};
