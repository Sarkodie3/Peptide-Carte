import React from 'react';
import { PeptideCalculator } from '../components/calculator/PeptideCalculator';
import { Calculator, Info, ShieldAlert, ArrowRight, Beaker, HelpCircle } from 'lucide-react';

interface CalculatorPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Calculator className="w-3.5 h-3.5 text-gold-400" />
            Interactive Analytical Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Peptide Reconstitution & Dilution Calculator
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Eliminate dosage math errors in your laboratory workflow. Compute exact liquid volumes, concentrations in mcg/mL, and syringe unit tick marks across standard U-100 insulin syringes.
          </p>
        </div>
      </div>

      {/* Embedded Calculator */}
      <PeptideCalculator />

      {/* Educational Reconstitution Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
            <Beaker className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Reconstitution Mathematics Demystified
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Peptides are shipped as fragile lyophilized (freeze-dried) powder cakes to preserve structural integrity. When reconstituting:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-brand-900 space-y-2 border border-slate-200">
            <p><strong>Concentration (mcg/mL)</strong> = Total Vial (mcg) ÷ Diluent (mL)</p>
            <p><strong>Dose Volume (mL)</strong> = Desired Dose (mcg) ÷ Concentration (mcg/mL)</p>
            <p><strong>Units to Draw</strong> = Dose Volume (mL) × Syringe Units/mL</p>
          </div>
          <p className="text-xs text-slate-500">
            For standard U-100 syringes, 1 mL equals 100 units (each individual tick represents 0.01 mL or 10 microliters).
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Why Use Bacteriostatic Water?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bacteriostatic Water for Injection contains 0.9% benzyl alcohol, an effective antimicrobial preservative that prevents microbial growth once the vial stopper has been punctured.
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
            <li>Preserves solution sterility for multiple research draws.</li>
            <li>Extended refrigerated stability (typically 28 days at 2°C – 8°C).</li>
            <li>Plain sterile water lacks preservatives and must be used immediately upon opening.</li>
          </ul>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop', 'Reconstitution')}
              className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1"
            >
              <span>View Available Bacteriostatic Water (3mL, 10mL, 30mL)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
