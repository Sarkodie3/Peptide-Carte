import React from 'react';
import { Home, ShoppingBag, Calculator, FileText, Briefcase, HelpCircle, Info, Mail, Search, ShieldAlert, X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  if (!isOpen) return null;

  const links = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop / Full Catalog', icon: ShoppingBag, badge: '56' },
    { id: 'calculator', label: 'Peptide Calculator', icon: Calculator, highlight: true },
    { id: 'lab-results', label: 'Lab Results / COAs', icon: FileText, badge: '37' },
    { id: 'wholesale', label: 'Wholesale & Bulk Orders', icon: Briefcase },
    { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle },
    { id: 'about', label: 'About Peptide Cart', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 border-l border-brand-100 animate-in slide-in-from-right duration-250">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-brand-50/50">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-brand-950 font-sans tracking-tight">
              PEPTIDE<span className="text-brand-800">CART</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-100 text-gold-800">
              🇨🇦 CA
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search button in mobile drawer */}
        <div className="p-3 border-b border-slate-100">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-600 text-sm font-medium border border-slate-200"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search products & lab reports...</span>
          </button>
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-800 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:bg-brand-50 hover:text-brand-900'
                } ${link.highlight && !isActive ? 'text-brand-800 bg-brand-50/60 font-semibold' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-300' : link.highlight ? 'text-brand-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Disclaimer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <div className="flex items-start gap-2 text-slate-600">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Research Use Only:</strong> All products are intended solely for qualified laboratory and in-vitro research.
            </p>
          </div>
          <p className="text-[10px] text-slate-400 text-center pt-2">
            © 2026 Peptide Cart Canada
          </p>
        </div>
      </div>
    </div>
  );
};
