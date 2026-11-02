import React from 'react';
import { Product } from '../types/product';
import { products } from '../data/productsData';
import { labResults } from '../data/labResultsData';
import { formatPrice } from '../utils/formatters';
import { ProductCard } from '../components/common/ProductCard';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  ExternalLink, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  AlertTriangle,
  Beaker,
  Send,
  Lock
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onNavigate: (page: string, param?: string) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onNavigate,
  onRequestQuote,
}) => {
  // Find matching lab report
  const matchedCOA = labResults.find(
    (lr) =>
      (product.coaSkuMatch && lr.batch === product.coaSkuMatch) ||
      lr.product.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(lr.product.toLowerCase())
  );

  // Related products
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.tags.includes('Best Sellers')))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-brand-800 hover:text-brand-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:underline">Shop</button>
          <span>/</span>
          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-brand-100 shadow-brand p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-square max-w-md rounded-2xl bg-gradient-to-b from-brand-50/30 to-slate-50 p-6 flex items-center justify-center border border-slate-200/80 relative overflow-hidden group">
              <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-800 text-white shadow-sm">
                {product.category}
              </span>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            {/* Quick trust stamps below image */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4 text-[11px] text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-700 flex-shrink-0" />
                <span>Express Canada Dispatch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>HPLC Purity ≥ 99.0%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Quote Trigger */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  SKU: {product.sku}
                </span>
                <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                  {product.dosage}
                </span>
                {matchedCOA && (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COA: {matchedCOA.purity}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-brand-950">
                  {formatPrice(product.price)}
                </span>
                {product.regularPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">CAD / Reference Vial</span>
              </div>
            </div>

            {/* Non-Transactional Quote CTA Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 text-white shadow-brand space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">
                    Request Research Quotation
                  </h4>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Order processing operates as an institutional inquiry workflow. Direct retail card checkout is disabled for compliance.
                  </p>
                </div>
                <Lock className="w-5 h-5 text-gold-400 flex-shrink-0" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => onRequestQuote(product)}
                  className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-brand-950 font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-gold flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Laboratory Quote</span>
                </button>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-gold-400" />
                  <span>Reconstitution Calculator</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-purple-300 pt-1 border-t border-brand-800">
                <span>Standard Dispatch: 2–5 Business Days (Canada)</span>
                <span>Bulk Savings: Up to 25% for 10+ Vials</span>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2.5 font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                Technical Specifications
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-3 p-3">
                  <span className="text-slate-500 font-medium">Analytical Purity</span>
                  <span className="col-span-2 font-bold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {product.specifications.purityStandard}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="text-slate-500 font-medium">Physical State</span>
                  <span className="col-span-2 text-slate-800 font-medium">{product.specifications.form}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="text-slate-500 font-medium">Recommended Storage</span>
                  <span className="col-span-2 text-slate-800 font-mono text-[11px]">{product.specifications.storage}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="text-slate-500 font-medium">Origin</span>
                  <span className="col-span-2 text-slate-800 font-medium">Synthesized & Packaged in Canada</span>
                </div>
                {matchedCOA && (
                  <div className="grid grid-cols-3 p-3 bg-emerald-50/50">
                    <span className="text-emerald-900 font-medium">Verified Batch</span>
                    <span className="col-span-2 flex items-center justify-between">
                      <span className="font-mono text-emerald-950 font-bold">{matchedCOA.batch} ({matchedCOA.purity})</span>
                      <a
                        href={matchedCOA.reportUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-xs font-bold text-brand-800 underline hover:text-brand-950 flex items-center gap-1"
                      >
                        <span>View Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Scientific Description */}
        <div className="mt-12 pt-8 border-t border-slate-100 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-brand-700" />
            Compound Overview & Analytical Data
          </h3>
          <div 
            className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Research Disclaimer Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Caution — For In-Vitro Research Use Only:</strong> This biochemical reference substance is synthesized strictly for controlled academic, analytical, and cellular research. It is not licensed for human administration, veterinary use, drug manufacturing, or cosmetic application.
            </p>
          </div>
        </div>
      </div>

      {/* Related Peptides */}
      {related.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900">
              Related Research Sequences
            </h3>
            <button
              onClick={() => onNavigate('shop', product.category)}
              className="text-xs font-bold text-brand-800 hover:underline"
            >
              View More {product.category} →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={(p) => onNavigate('product', p.slug)}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
