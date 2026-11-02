import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { TopBanner } from './components/layout/TopBanner';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ComplianceModal } from './components/layout/ComplianceModal';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuoteModal } from './components/common/QuoteModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { LabResultsPage } from './pages/LabResultsPage';
import { WholesalePage } from './pages/WholesalePage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PaymentShippingPage } from './pages/PaymentShippingPage';
import { TermsPage } from './pages/TermsPage';

import { Product } from './types/product';
import { getProductBySlug } from './data/productsData';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  // Global Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    if (page === 'shop') {
      if (param) {
        setShopCategory(param);
      } else {
        setShopCategory('All');
      }
      setSelectedProduct(null);
      setCurrentPage('shop');
    } else if (page === 'product') {
      if (param) {
        const found = getProductBySlug(param);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          return;
        }
      }
      setCurrentPage('shop');
    } else {
      setSelectedProduct(null);
      setCurrentPage(page);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleRequestQuote = (product: Product) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD]">
      {/* 21+ Research Compliance Entry Gate */}
      <ComplianceModal />

      {/* Slide-out Research Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => setCurrentPage('checkout')}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      {/* Top Notification Announcement Bar */}
      <TopBanner />

      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateToCOA={() => handleNavigate('lab-results')}
      />

      {/* Quote / Inquiry Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        product={quoteProduct}
        onClose={() => {
          setQuoteModalOpen(false);
          setQuoteProduct(null);
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={shopCategory}
            onSelectProduct={handleSelectProduct}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleNavigate('shop', shopCategory)}
            onNavigate={handleNavigate}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'calculator' && (
          <CalculatorPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'lab-results' && (
          <LabResultsPage />
        )}

        {currentPage === 'wholesale' && (
          <WholesalePage />
        )}

        {currentPage === 'faq' && (
          <FAQPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'payment-shipping' && (
          <PaymentShippingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'terms' && (
          <TermsPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
};

export default App;
