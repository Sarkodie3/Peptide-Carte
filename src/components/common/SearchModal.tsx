import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { products } from '../../data/productsData';
import { labResults } from '../../data/labResultsData';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCOA: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateToCOA,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.sku.toLowerCase().includes(trimmed) ||
          p.dosage.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : products.slice(0, 4); // default featured

  const matchedLabs = trimmed
    ? labResults.filter(
        (l) =>
          l.product.toLowerCase().includes(trimmed) ||
          l.batch.toLowerCase().includes(trimmed) ||
          l.notes.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-brand-200 overflow-hidden relative z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-brand-700 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 80 peptides, dosages, SKUs, or batch COAs..."
            className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Products Section */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand-600" />
                {trimmed ? `Matching Compounds (${matchedProducts.length})` : 'Popular Peptides'}
              </span>
            </div>

            {matchedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-brand-50/80 transition-colors border border-transparent hover:border-brand-100 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 flex-shrink-0 border border-slate-100 flex items-center justify-center">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded">
                          {p.dosage}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {p.sku}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-brand-800">
                        {p.name}
                      </h4>
                      <p className="text-xs font-extrabold text-brand-950">
                        {formatPrice(p.price)} CAD
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center">
                No catalog compounds found matching "{query}".
              </p>
            )}
          </div>

          {/* Lab Results Section (if query matches) */}
          {matchedLabs.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gold-600" />
                  Verified Lab COA Reports ({matchedLabs.length})
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCOA();
                  }}
                  className="text-xs font-semibold text-brand-700 hover:underline flex items-center gap-1"
                >
                  <span>View All 37 COAs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                {matchedLabs.map((l) => (
                  <div
                    key={l.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs gap-3 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">{l.product}</span>
                        <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                          {l.batch}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{l.notes}</span>
                    </div>

                    <a
                      href={l.reportUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg border border-brand-200 flex-shrink-0"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{l.purity}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
          Search across 80 research peptides & 37 HYTE analytical batch records
        </div>
      </div>
    </div>
  );
};
