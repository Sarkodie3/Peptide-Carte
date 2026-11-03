import React from 'react';
import { Search, Menu, X, FileText, Calculator, ShoppingBag, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop', badge: '80 Items' },
    { id: 'calculator', label: 'Peptide Calculator', icon: Calculator, highlight: true },
    { id: 'lab-results', label: 'Lab Results / COAs', icon: FileText },
    { id: 'wholesale', label: 'Wholesale & Bulk' },
    { id: 'faq', label: 'FAQ' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-brand-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Peptide Cart Homepage"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-800 to-brand-700 flex items-center justify-center shadow-brand text-gold-400 group-hover:scale-105 transition-transform duration-200 border border-brand-600/30">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 0 1 1-4 0" />
                <circle cx="12" cy="15" r="1.5" fill="#C9A962" stroke="none" />
                <path d="M10 12h4" stroke="#C9A962" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-brand-950 font-sans">
                  PEPTIDE<span className="text-brand-800">CART</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 border border-gold-300">
                  Global
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-widest text-slate-500 uppercase -mt-1">
                Canada & Worldwide Laboratory Supply
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 relative ${
                    isActive
                      ? 'text-brand-900 bg-brand-50/80 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-brand-800 hover:bg-slate-50'
                  } ${item.highlight ? 'text-brand-800 font-semibold' : ''}`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-brand-600' : 'text-slate-400'}`} />}
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-brand-100 text-brand-700 font-semibold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-800 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search + Cart Trigger + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-brand-900 hover:bg-brand-50 transition-colors flex items-center gap-2 border border-slate-200 text-xs sm:text-sm font-medium"
              title="Search catalog & lab reports"
              aria-label="Search catalog & lab reports"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-brand hover:shadow-brand-lg transition-all transform hover:-translate-y-0.5 border border-brand-700/60 group"
              title="View Research Cart"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              
              {totalItems > 0 && (
                <span className="bg-gold-500 text-brand-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center -ml-0.5 shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-brand-900 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
