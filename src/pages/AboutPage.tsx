import React from 'react';
import { ShieldCheck, Award, Beaker, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-brand-800 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/30">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            North American Scientific Heritage
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About Peptide Cart
          </h1>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Advancing biomedical research through uncompromising synthesis standards, open chromatographic verification, and reliable domestic Canadian & international distribution.
          </p>
        </div>
      </div>

      {/* Mission Narrative */}
      <div className="bg-white rounded-3xl border border-brand-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-4 text-slate-600 leading-relaxed text-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Our Purpose & Scientific Philosophy
          </h2>
          <p>
            At <strong>Peptide Cart</strong>, we set out with a clear, uncompromising mission: to make high-quality, verified research peptides accessible, transparent, and completely reliable for laboratories and researchers across Canada, the United States, and worldwide.
          </p>
          <p>
            What began as an analytical, science-driven initiative has matured into a trusted repository for university departments, biochemical investigators, and biotechnology facilities. In an emerging industry where purity claims are too often unverified, we distinguish ourselves by publishing complete, third-party HPLC and Mass Spectrometry records for every single batch we distribute.
          </p>
          <p>
            We believe innovation in peptide science must be matched by equal integrity in quality assurance. That means no guessing, no batch variability, and no shortcuts.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900 text-sm">Chromatographic Rigor</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every production run is evaluated by HYTE Research Division using HPLC and LC-MS to verify purity standards ≥ 99.0%.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Truck className="w-6 h-6 text-brand-700" />
            <h4 className="font-bold text-slate-900 text-sm">Domestic Canadian Logistics</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              All stock is maintained within Canadian borders, eliminating international customs seizures and maintaining cold-chain integrity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Beaker className="w-6 h-6 text-gold-600" />
            <h4 className="font-bold text-slate-900 text-sm">Research Community Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We provide free open access to reconstitution calculators, technical protocols, and dedicated account support for bulk studies.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Assurance Workflow */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white tracking-tight">
          How Every Vial is Verified
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
            <span className="font-mono text-gold-400 font-bold text-sm">STAGE 01</span>
            <h5 className="font-bold text-white text-sm">Solid-Phase Synthesis</h5>
            <p className="text-slate-400 leading-relaxed">
              Automated high-fidelity peptide synthesizer ensures exact amino acid sequence ordering and maximal crude yield.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
            <span className="font-mono text-gold-400 font-bold text-sm">STAGE 02</span>
            <h5 className="font-bold text-white text-sm">Preparative HPLC Purification</h5>
            <p className="text-slate-400 leading-relaxed">
              Reverse-phase chromatography isolates target fraction, removing truncated sequences and synthesis artifacts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
            <span className="font-mono text-gold-400 font-bold text-sm">STAGE 03</span>
            <h5 className="font-bold text-white text-sm">Blind Third-Party Testing</h5>
            <p className="text-slate-400 leading-relaxed">
              Independent laboratory analyzes randomized samples, certifying purity, solubility, and moisture content before release.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs">
          <span className="text-slate-400">Want to inspect real batch chromatograms?</span>
          <button
            onClick={() => onNavigate('lab-results')}
            className="bg-gold-500 hover:bg-gold-400 text-brand-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-gold flex items-center gap-1.5"
          >
            <span>Explore 37 Verified COAs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
