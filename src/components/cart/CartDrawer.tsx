import React, { useState } from 'react';
import { useCart, MIN_ORDER_AMOUNT, FREE_SHIPPING_THRESHOLD } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Tag, 
  Truck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToShop,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    subtotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    isMinOrderMet,
    remainingForMinOrder,
    minOrderProgress,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) setCouponInput('');
  };

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15.0;
  const estimatedTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-brand-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-brand-950 to-brand-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-800/80 text-gold-400 flex items-center justify-center border border-brand-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                  <span>Research Cart</span>
                  <span className="text-xs bg-gold-500/20 text-gold-300 font-bold px-2 py-0.5 rounded-full border border-gold-400/30">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </h3>
                <p className="text-[11px] text-purple-200">Domestic Canadian Express Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-purple-300 hover:text-white hover:underline transition-colors px-2 py-1"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Minimum Order Limit Bar ($150 CAD Requirement) */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 font-bold">
                {isMinOrderMet ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                )}
                <span className={isMinOrderMet ? 'text-emerald-900' : 'text-amber-900'}>
                  {isMinOrderMet
                    ? 'Minimum Order Reached ($150.00 CAD)'
                    : `Minimum Order: $150.00 CAD`}
                </span>
              </div>
              <span className="font-mono font-bold text-slate-700">
                {minOrderProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isMinOrderMet
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-amber-500 to-brand-700'
                }`}
                style={{ width: `${minOrderProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 mt-2">
              {isMinOrderMet ? (
                <span className="text-emerald-700 font-semibold">
                  ✓ Ready for checkout. Subtotal is {formatPrice(subtotal)} CAD.
                </span>
              ) : (
                <span>
                  Add <strong className="text-brand-900 font-bold">{formatPrice(remainingForMinOrder)} CAD</strong> more to unlock checkout.
                </span>
              )}
            </p>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto border border-brand-100">
                  <ShoppingBag className="w-8 h-8 text-brand-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    Select research peptides or reconstitution supplies from our catalog to begin your order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-brand transition-all inline-flex items-center gap-1.5"
                >
                  <span>Browse 56 Research Compounds</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-brand-200 transition-all flex items-center gap-3 group shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-brand-800">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className="font-mono">{item.product.sku}</span>
                      <span>•</span>
                      <span className="font-semibold text-brand-800 bg-brand-50 px-1.5 py-0.2 rounded">
                        {item.product.dosage}
                      </span>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-bold text-xs text-slate-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-extrabold text-xs text-brand-950 font-mono">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-slate-400">
                            {formatPrice(item.product.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-4">
              {/* Promo Code Accordion/Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gold-50 border border-gold-200 text-xs">
                    <div className="flex items-center gap-1.5 text-gold-900 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-gold-700" />
                      <span>Code: <strong className="font-mono">{appliedCoupon}</strong> (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon: RESEARCH10"
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl uppercase text-xs focus:outline-none focus:ring-1 focus:ring-brand-700"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-200 hover:bg-brand-800 hover:text-white font-bold rounded-xl transition-colors text-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className={`text-[11px] mt-1 ${couponMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold font-mono text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Canadian Express Shipping</span>
                  </span>
                  <span className="font-mono font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-brand-950 text-lg">
                    {formatPrice(estimatedTotal)} CAD
                  </span>
                </div>
              </div>

              {/* Minimum Limit Lock Notice */}
              {!isMinOrderMet && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="leading-snug text-[11px]">
                    <strong>Minimum Order: $150.00 CAD.</strong> Current subtotal is {formatPrice(subtotal)}. Add {formatPrice(remainingForMinOrder)} CAD more to proceed to checkout.
                  </p>
                </div>
              )}

              {/* Checkout Action Button */}
              <button
                disabled={!isMinOrderMet}
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateToCheckout();
                }}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isMinOrderMet
                    ? 'bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white shadow-brand hover:shadow-brand-lg transform hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                {isMinOrderMet ? (
                  <>
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>Proceed to Checkout ({formatPrice(estimatedTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Checkout Locked (Min. $150 CAD)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 py-1"
              >
                Continue Browsing Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
