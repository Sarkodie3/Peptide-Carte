import React, { useState } from 'react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onRequestQuote?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group bg-white rounded-2xl border border-brand-100/80 shadow-sm hover:shadow-brand-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Card Header & Badges */}
      <div className="relative p-4 pb-0 flex items-start justify-between z-10">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
            {product.category}
          </span>
          {product.onSale && (
            <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              Special
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>≥ 99% HPLC</span>
        </span>
      </div>

      {/* Product Image */}
      <div 
        onClick={() => onSelect(product)}
        className="relative px-6 py-4 cursor-pointer flex items-center justify-center bg-gradient-to-b from-transparent to-slate-50/50"
      >
        <div className="w-full aspect-square max-h-56 flex items-center justify-center overflow-hidden rounded-xl bg-white p-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-brand-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="bg-white/95 text-brand-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-brand-700" />
            View Specifications
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-mono text-[11px] text-slate-400">SKU: {product.sku}</span>
            <span className="text-brand-700 font-semibold bg-brand-50/80 px-2 py-0.5 rounded">
              {product.dosage}
            </span>
          </div>

          <h3 
            onClick={() => onSelect(product)}
            className="font-bold text-base text-slate-900 group-hover:text-brand-800 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-brand-950">
                {formatPrice(product.price)}
              </span>
              {product.regularPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.regularPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              CAD • In-Vitro Research
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(product)}
              className="p-2 rounded-xl text-slate-500 hover:text-brand-900 hover:bg-brand-50 border border-slate-200 transition-colors"
              title="View technical specifications"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            {/* Primary Add to Cart Button */}
            <button
              onClick={handleAdd}
              className={`font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-800 hover:bg-brand-900 text-white hover:shadow-brand transform hover:-translate-y-0.5'
              }`}
              title="Add to Research Cart"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-gold-300" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
