import React from 'react';
import { COATable } from '../components/common/COATable';
import { ShieldCheck, FileText, CheckCircle2, Award, ExternalLink, HelpCircle } from 'lucide-react';

export const LabResultsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            Independent Analytical Registry
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Laboratory Results & Certificates of Analysis (COAs)
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Direct public access to third-party analytical reports tested by HYTE Research Division. Review chromatographic purity charts, batch identifiers, and average purity scores (exceeding 99%).
          </p>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">HPLC & LC-MS Verified</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every production lot undergoes High-Performance Liquid Chromatography and Liquid Chromatography-Mass Spectrometry.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">37 Certified Reports Online</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Direct verification links directly to the analytical testing authority's independent verification portal.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Batch Traceability</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Each vial includes a physical lot number matching its online certificate for foolproof quality auditing.
            </p>
          </div>
        </div>
      </div>

      {/* COA Table Component */}
      <COATable />

      {/* Verification Notice */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-brand-700" />
          How to Verify Your Physical Vial Certificate
        </h4>
        <p className="leading-relaxed">
          Locate the batch identifier printed on your vial label (e.g., <code>PE2#00004</code>). Enter the batch into the search field above, or click "View Certificate" to access the raw analytical chromatogram hosted directly on the laboratory testing division's verification server.
        </p>
      </div>
    </div>
  );
};
