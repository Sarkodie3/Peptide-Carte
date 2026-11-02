import React, { useState } from 'react';
import { useCart, MIN_ORDER_AMOUNT, FREE_SHIPPING_THRESHOLD } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { 
  ShieldCheck, 
  Truck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Printer, 
  AlertTriangle,
  Send,
  Zap,
  DollarSign
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    cart,
    subtotal,
    isMinOrderMet,
    remainingForMinOrder,
    discountAmount,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    organization: '',
    address: '',
    suite: '',
    city: '',
    province: 'ON',
    postalCode: '',
    shippingOption: 'standard', // 'standard' | 'priority'
    paymentMethod: 'interac', // 'interac' | 'crypto' | 'wire'
    orderNotes: '',
    agreeToResearchTerms: false,
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<any>(null);

  // Canadian provinces
  const provinces = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' },
  ];

  // Shipping cost calculation
  const baseShippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15.0;
  const shippingCost = formData.shippingOption === 'priority' ? baseShippingCost + 15.0 : baseShippingCost;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  // If cart is empty or minimum order requirement ($150) is not met:
  if (!isMinOrderMet && !orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Minimum Order Requirement: $150.00 CAD
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Peptide Cart requires a minimum subtotal of <strong>$150.00 CAD</strong> for all analytical research shipments. Your current cart subtotal is <strong>{formatPrice(subtotal)} CAD</strong>.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto text-xs text-amber-900 font-medium">
          Add at least <strong>{formatPrice(remainingForMinOrder)} CAD</strong> more in compounds or supplies to proceed to checkout.
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('shop')}
            className="bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-brand transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Catalog & Add Items</span>
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToResearchTerms) {
      alert('Please acknowledge and agree to the Laboratory Research Use terms.');
      return;
    }

    const orderNumber = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderNumber,
      date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      subtotal,
      discountAmount,
      shippingCost,
      finalTotal,
      customer: { ...formData },
    };

    setGeneratedOrder(orderData);
    setOrderComplete(true);
    clearCart();
  };

  // ORDER CONFIRMATION VIEW
  if (orderComplete && generatedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-brand-100 shadow-brand p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-3 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Logged
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Your research supply order <strong className="font-mono text-brand-950 font-bold">{generatedOrder.orderNumber}</strong> has been registered. An itemized invoice and fulfillment tracking link has been sent to <strong>{generatedOrder.customer.email}</strong>.
            </p>
          </div>

          {/* Payment Instructions Banner */}
          <div className="p-6 rounded-2xl bg-brand-50 border border-brand-200 space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-800" />
              <h3 className="font-bold text-base text-brand-950">
                Payment Instructions: {generatedOrder.customer.paymentMethod === 'interac' ? 'Interac e-Transfer' : generatedOrder.customer.paymentMethod === 'crypto' ? 'Cryptocurrency' : 'Bank Wire / ACH'}
              </h3>
            </div>

            {generatedOrder.customer.paymentMethod === 'interac' && (
              <div className="space-y-2 text-xs text-brand-900 leading-relaxed">
                <p>Please send an Interac e-Transfer for <strong className="font-mono text-sm">{formatPrice(generatedOrder.finalTotal)} CAD</strong> to our automated fulfillment deposit recipient:</p>
                <div className="p-3 bg-white rounded-xl border border-brand-200 font-mono text-xs space-y-1">
                  <p>Recipient Email: <strong>payments@peptidecart.is</strong></p>
                  <p>Message / Memo: <strong>{generatedOrder.orderNumber}</strong></p>
                  <p>Security Answer (if required): <strong>peptide2026</strong></p>
                </div>
                <p className="text-[11px] text-slate-500">Orders are queued for packing and courier handoff immediately upon e-Transfer auto-deposit confirmation.</p>
              </div>
            )}

            {generatedOrder.customer.paymentMethod === 'crypto' && (
              <div className="space-y-2 text-xs text-brand-900 leading-relaxed">
                <p>Cryptocurrency checkout active. Please remit the equivalent of <strong className="font-mono text-sm">{formatPrice(generatedOrder.finalTotal)} CAD</strong> in USDT (TRC-20 / ERC-20) or Bitcoin:</p>
                <div className="p-3 bg-white rounded-xl border border-brand-200 font-mono text-xs break-all">
                  <p>USDT (TRC-20): <strong>TX8vK2hP4mZ7bQ9jL1rE6wN3yC5tA8sD</strong></p>
                  <p className="mt-1">Order Memo: <strong>{generatedOrder.orderNumber}</strong></p>
                </div>
              </div>
            )}

            {generatedOrder.customer.paymentMethod === 'wire' && (
              <div className="space-y-2 text-xs text-brand-900 leading-relaxed">
                <p>Institutional invoice details have been dispatched to <strong>{generatedOrder.customer.email}</strong> with full banking routing instructions.</p>
              </div>
            )}
          </div>

          {/* Itemized Receipt Table */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Itemized Order Summary</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3 pl-4">Product</th>
                    <th className="p-3 text-center">Dosage</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right pr-4">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {generatedOrder.items.map((item: any) => (
                    <tr key={item.product.id}>
                      <td className="p-3 pl-4 font-bold text-slate-900">{item.product.name}</td>
                      <td className="p-3 text-center text-slate-500">{item.product.dosage}</td>
                      <td className="p-3 text-center font-mono font-bold text-slate-700">{item.quantity}</td>
                      <td className="p-3 text-right pr-4 font-mono font-bold text-brand-950">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-4 bg-slate-50/70 border-t border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">{formatPrice(generatedOrder.subtotal)}</span>
                </div>
                {generatedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(generatedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-mono">{generatedOrder.shippingCost === 0 ? 'FREE' : formatPrice(generatedOrder.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-brand-950 pt-2 border-t border-slate-200">
                  <span>Total Amount Due</span>
                  <span className="font-mono">{formatPrice(generatedOrder.finalTotal)} CAD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold shadow-brand transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Shopping Catalog</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout & Order Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified domestic Canadian research delivery • Minimum Order $150.00 CAD
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Main Checkout Grid */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                1. Researcher & Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Dr. Alexander"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Wright"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email for Delivery Tracking *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="awright@bioresearch.ca"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (416) 555-0192"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Institution or Laboratory Affiliation (Optional)</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="University Biochemistry Dept / Analytical Lab"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Canadian Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                2. Canadian Shipping Address
              </h2>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Street Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="100 University Avenue"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Suite / Unit / Lab</label>
                <input
                  type="text"
                  value={formData.suite}
                  onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                  placeholder="Lab Suite 402"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Toronto"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Province *</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none font-medium cursor-pointer"
                >
                  {provinces.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                      {prov.name} ({prov.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Postal Code *</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.toUpperCase() })}
                placeholder="M5J 2T3"
                className="w-full sm:w-1/2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Shipping Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Truck className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                3. Shipping Option
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.shippingOption === 'standard'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="standard"
                    checked={formData.shippingOption === 'standard'}
                    onChange={() => setFormData({ ...formData, shippingOption: 'standard' })}
                    className="text-brand-800 focus:ring-brand-700"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Express Tracked Domestic Courier</span>
                    <span className="text-slate-500 text-[11px]">2–5 business days across Canada</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-brand-950">
                  {baseShippingCost === 0 ? 'FREE ($200+ Order)' : '$15.00 CAD'}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.shippingOption === 'priority'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="priority"
                    checked={formData.shippingOption === 'priority'}
                    onChange={() => setFormData({ ...formData, shippingOption: 'priority' })}
                    className="text-brand-800 focus:ring-brand-700"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Priority Cold-Chain Overnight Air</span>
                    <span className="text-slate-500 text-[11px]">1–2 business days guaranteed priority handling</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-brand-950">
                  {baseShippingCost === 0 ? '$15.00 CAD' : '$30.00 CAD'}
                </span>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                4. Payment Method
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'interac'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="interac"
                    checked={formData.paymentMethod === 'interac'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'interac' })}
                    className="mt-1 text-brand-800 focus:ring-brand-700"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Interac e-Transfer (Canada Direct)</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed">
                      Instant Canadian bank transfer. Payment details and recipient email provided upon checkout completion.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                  Fastest
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'crypto'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={formData.paymentMethod === 'crypto'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
                    className="mt-1 text-brand-800 focus:ring-brand-700"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Cryptocurrency (USDT / BTC / ETH)</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed">
                      Autonomous confidential settlement. Remittance address provided on final confirmation.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-gold-100 text-gold-900 font-bold px-2 py-0.5 rounded uppercase">
                  5% Off
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'wire'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wire"
                    checked={formData.paymentMethod === 'wire'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                    className="mt-1 text-brand-800 focus:ring-brand-700"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Institutional Bank Wire / ACH Transfer</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed">
                      Recommended for university purchase orders and bulk orders exceeding $1,000 CAD.
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-brand sticky top-24 space-y-6">
            <h2 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-brand-800 font-semibold">{cart.length} unique items</span>
            </h2>

            {/* Items list snippet */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 flex-shrink-0 flex items-center justify-center">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">{item.product.name}</h4>
                    <span className="text-[11px] text-slate-500">{item.product.dosage} • Qty: {item.quantity}</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedCoupon})</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono font-medium">
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-extrabold text-brand-950 pt-3 border-t border-slate-200">
                <span>Total Due</span>
                <span className="font-mono text-xl">{formatPrice(finalTotal)} CAD</span>
              </div>
            </div>

            {/* Minimum Order Check Confirmation */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Minimum order requirement of <strong>$150.00 CAD</strong> satisfied.
              </span>
            </div>

            {/* Research Terms Agreement Checkbox */}
            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToResearchTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToResearchTerms: e.target.checked })}
                  className="mt-0.5 rounded text-brand-800 focus:ring-brand-700"
                />
                <span className="leading-snug text-[11px]">
                  I confirm that all purchased items are exclusively for <strong>in-vitro laboratory and analytical research</strong>. Under no conditions are products intended for human or animal application.
                </span>
              </label>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={!formData.agreeToResearchTerms}
              className={`w-full py-4 rounded-xl font-extrabold text-sm shadow-brand transition-all flex items-center justify-center gap-2 ${
                formData.agreeToResearchTerms
                  ? 'bg-gradient-to-r from-brand-800 to-brand-900 hover:from-brand-900 hover:to-brand-950 text-white cursor-pointer hover:shadow-brand-lg transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 text-gold-400" />
              <span>Place Research Order ({formatPrice(finalTotal)} CAD)</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center">
              All orders dispatched from domestic Canadian hubs with vacuum cold-chain protection.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
