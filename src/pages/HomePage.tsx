import React from 'react';
import { products } from '../data/productsData';
import { labResults } from '../data/labResultsData';
import { Product } from '../types/product';
import { ProductCard } from '../components/common/ProductCard';
import { PeptideCalculator } from '../components/calculator/PeptideCalculator';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Beaker, 
  CheckCircle2, 
  Calculator, 
  FileText, 
  Search, 
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onRequestQuote,
}) => {
  // Best sellers selection
  const bestSellers = products.filter(
    (p) =>
      p.tags.includes('Best Sellers') ||
      p.slug.includes('glow-70') ||
      p.slug.includes('bpc-157-10mg') ||
      p.slug.includes('tirzepatide-15mg') ||
      p.slug.includes('retatrutide-20mg') ||
      p.slug.includes('ghk-cu-50mg') ||
      p.slug.includes('semaglutide-10mg')
  ).slice(0, 8);

  const featuredCOAs = labResults.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-brand-50/70 via-white to-[#FAFAFD] border-b border-brand-100/50">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200/60 text-brand-900 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Third-Party HPLC Batch Verified • Canada Domestic & Worldwide Dispatch</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Pure. Tested. <br />
                <span className="bg-gradient-to-r from-brand-900 via-brand-700 to-gold-600 bg-clip-text text-transparent">
                  Peptides.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Your premier laboratory destination for verified research peptides, GLP sequences, and biochemical reconstitution reagents. Fully backed by independent HPLC analytical reports with domestic Canadian fulfillment and worldwide express air delivery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white font-bold px-7 py-3.5 rounded-xl shadow-brand hover:shadow-brand-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm border border-brand-700/60"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Explore Catalog (80 Compounds)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('calculator')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-brand-900 font-bold px-6 py-3.5 rounded-xl border border-slate-300 hover:border-brand-300 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-brand-700" />
                  <span>Peptide Calculator</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                  <span className="font-extrabold text-base text-brand-950 block">≥ 99.0%</span>
                  <span className="text-[11px] text-slate-500 font-medium">HPLC Purity Minimum</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                  <span className="font-extrabold text-base text-brand-950 block">🇨🇦 & 🌍</span>
                  <span className="text-[11px] text-slate-500 font-medium">Domestic & Global Courier</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                  <span className="font-extrabold text-base text-brand-950 block">37 COAs</span>
                  <span className="text-[11px] text-slate-500 font-medium">Verified HYTE Reports</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                  <span className="font-extrabold text-base text-brand-950 block">50 Days</span>
                  <span className="text-[11px] text-slate-500 font-medium">Quality Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Featured Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl border border-brand-200/70 p-6 shadow-brand-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Analytical Batch Highlight
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    99.77% HPLC
                  </span>
                </div>

                {/* Featured item visual */}
                <div className="py-6 text-center">
                  <div className="w-48 h-48 mx-auto flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-brand-50/40 to-slate-50">
                    <img
                      src="https://peptidecart.is/wp-content/uploads/2025/10/file_00000000dfb481fa83f81e7d825aeefb.png"
                      alt="GLOW 70mg Multi-Peptide Blend"
                      className="max-h-full object-contain drop-shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>

                  <span className="text-xs font-mono text-slate-400 mt-2 block">
                    BATCH: PE2#00007 • HYTE Research Division
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    GLOW 70 Multi-Peptide Blend
                  </h3>
                  <p className="text-xs text-brand-800 font-semibold">
                    GHK-Cu 50 mg • TB-500 10 mg • BPC-157 10 mg
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs text-slate-400">Verified CAD Price</span>
                      <div className="text-xl font-extrabold text-brand-950">$129.99 CAD</div>
                    </div>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="w-4 h-4 text-gold-300" />
                    </button>
                  </div>
                </div>

                <div className="bg-brand-50/70 p-3 rounded-xl border border-brand-100 text-[11px] text-brand-900 flex items-center justify-between">
                  <span>Third-party HPLC certificate verified:</span>
                  <button
                    onClick={() => onNavigate('lab-results')}
                    className="font-bold underline text-brand-800 hover:text-brand-950"
                  >
                    View Batch Certificate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Categorized In-Vitro Repository
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Explore By Research Field
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Structured high-purity compounds organized for targeted cellular, metabolic, and peptide reconstitution experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GLP-1 & Multi-Agonists */}
          <div 
            onClick={() => onNavigate('shop', 'GLP')}
            className="group cursor-pointer bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-brand transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100/80 text-brand-800 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-brand-800" />
              </div>
              <span className="text-xs font-mono text-brand-700 font-semibold">11 Formulations</span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mt-1">
                GLP & Metabolic Agonists
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Tirzepatide, Semaglutide, Retatrutide, and Cagrilintide lyophilized reference standards with verified milligram titration.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-800 group-hover:translate-x-1 transition-transform">
              <span>View GLP Catalog</span>
              <ArrowRight className="w-4 h-4 text-gold-500" />
            </div>
          </div>

          {/* Card 2: Cellular & Tissue Repair */}
          <div 
            onClick={() => onNavigate('shop', 'Non-GLP')}
            className="group cursor-pointer bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-brand transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100/80 text-brand-800 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                <Beaker className="w-6 h-6 text-brand-800" />
              </div>
              <span className="text-xs font-mono text-brand-700 font-semibold">41 Formulations</span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mt-1">
                Cellular & Tissue Peptides
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                BPC-157, TB-500, GHK-Cu, NAD+, Epithalon, MOTS-c, and proprietary peptide synergy blends for analytical investigation.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-800 group-hover:translate-x-1 transition-transform">
              <span>View Non-GLP Catalog</span>
              <ArrowRight className="w-4 h-4 text-gold-500" />
            </div>
          </div>

          {/* Card 3: Reconstitution & Solvents */}
          <div 
            onClick={() => onNavigate('shop', 'Reconstitution')}
            className="group cursor-pointer bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl border border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-brand transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100/80 text-brand-800 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-brand-800" />
              </div>
              <span className="text-xs font-mono text-brand-700 font-semibold">Reagents & Tools</span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mt-1">
                Reconstitution Supplies
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Sterile bacteriostatic water (3 mL, 10 mL, 30 mL) and interactive dosage calculator for precise reconstitution dilution.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-800 group-hover:translate-x-1 transition-transform">
              <span>View Reagents & Tools</span>
              <ArrowRight className="w-4 h-4 text-gold-500" />
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              High-Demand Research Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Featured Best Sellers
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-brand-800 hover:text-brand-950 flex items-center gap-1 group"
          >
            <span>View All 80 Compounds</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>
      </section>

      {/* INTERACTIVE PEPTIDE CALCULATOR TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PeptideCalculator />
      </section>

      {/* THIRD-PARTY LABORATORY VERIFICATION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                HYTE Research Division Verified
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Analytical Transparency. <br />
                <span className="text-gold-400">Zero Guesswork.</span>
              </h2>
              <p className="text-sm text-purple-200/80 leading-relaxed">
                We believe scientific validity demands uncompromised transparency. Every synthesized batch is independently tested with High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('lab-results')}
                  className="bg-gold-500 hover:bg-gold-400 text-brand-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-gold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Browse All 37 Lab COA Reports</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">
                Recent Analytical Batch Records
              </span>
              <div className="space-y-2.5">
                {featuredCOAs.map((coa) => (
                  <div
                    key={coa.id}
                    className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{coa.product}</strong>
                        <span className="font-mono text-[10px] bg-brand-800/80 text-purple-200 px-2 py-0.5 rounded border border-brand-700/60">
                          {coa.batch}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px] block mt-0.5">
                        {coa.lab} • Tested {coa.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="font-extrabold text-gold-400 text-sm">
                        {coa.purity}
                      </span>
                      <a
                        href={coa.reportUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Verify Report
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHOLESALE & BULK ORDERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-100 p-8 sm:p-12 shadow-brand flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Institutional & Volume Tier
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Wholesale & Laboratory Bulk Orders
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipping universities, clinical research facilities, and independent laboratories across North America with tiered volume discounts starting at 10+ vials (up to 25% savings).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('wholesale')}
              className="bg-brand-800 hover:bg-brand-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-brand transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>View Wholesale Tiers</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Contact Scientific Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
