import React, { useState } from 'react';
import { useCart, MIN_ORDER_AMOUNT, FREE_SHIPPING_THRESHOLD } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { sendNotificationEmail, ADMIN_EMAIL } from '../services/emailService';
import { saveOrderToDb } from '../services/orderStorageService';
import { 
  ShieldCheck, 
  Truck, 
  Lock, 
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
  DollarSign,
  Globe,
  Check,
  Copy,
  Coins,
  Clock,
  Package
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CRYPTO_COINS = {
  usdt: {
    symbol: 'USDT',
    name: 'USDT',
  },
  btc: {
    symbol: 'BTC',
    name: 'BTC',
  },
  eth: {
    symbol: 'ETH',
    name: 'ETH',
  },
};

export const CRYPTO_WALLETS = CRYPTO_COINS;

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

  // Destination Region Toggle: 'canada' or 'international'
  const [destinationType, setDestinationType] = useState<'canada' | 'international'>('canada');

  // Selected crypto coin if crypto payment is chosen: 'usdt' | 'btc' | 'eth'
  const [selectedCrypto, setSelectedCrypto] = useState<'usdt' | 'btc' | 'eth'>('usdt');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    organization: '',
    // Canadian Address Fields
    caAddress: '',
    caSuite: '',
    caCity: '',
    caProvince: 'ON',
    caPostalCode: '',
    // International Address Fields
    intlCountry: 'United States',
    intlAddress: '',
    intlSuite: '',
    intlCity: '',
    intlState: '',
    intlPostalCode: '',
    // Shipping & Payment Options
    shippingOption: 'standard', // 'standard' | 'priority'
    paymentMethod: 'interac', // 'interac' | 'crypto'
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

  // International Countries
  const internationalCountries = [
    'United States',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Switzerland',
    'Netherlands',
    'Italy',
    'Spain',
    'Sweden',
    'Norway',
    'Denmark',
    'Ireland',
    'New Zealand',
    'Belgium',
    'Austria',
    'Japan',
    'Singapore',
    'South Korea',
    'Other International Destination',
  ];

  // Dynamic Shipping Calculation based on Region
  let shippingCost = 15.0;
  if (destinationType === 'canada') {
    const base = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15.0;
    shippingCost = formData.shippingOption === 'priority' ? base + 15.0 : base;
  } else {
    // International shipping rates
    const baseIntl = subtotal >= 250.0 ? 20.0 : 35.0;
    shippingCost = formData.shippingOption === 'priority' ? baseIntl + 20.0 : baseIntl;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Minimum Order Verification ($150 CAD)
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
            Peptide Cart requires a minimum purchase of <strong>$150.00 CAD</strong> across all domestic and international shipments to maintain dedicated packaging and priority courier handling.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto text-xs text-amber-900 font-medium">
          Your current subtotal is <strong>{formatPrice(subtotal)} CAD</strong>. Add at least <strong>{formatPrice(remainingForMinOrder)} CAD</strong> more to unlock checkout.
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

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToResearchTerms) {
      alert('Please acknowledge and agree to the Laboratory Research Use terms.');
      return;
    }

    const orderNumber = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
    const destinationAddress =
      destinationType === 'canada'
        ? {
            country: 'Canada',
            address: formData.caAddress,
            suite: formData.caSuite,
            city: formData.caCity,
            stateProvince: formData.caProvince,
            postalCode: formData.caPostalCode,
          }
        : {
            country: formData.intlCountry,
            address: formData.intlAddress,
            suite: formData.intlSuite,
            city: formData.intlCity,
            stateProvince: formData.intlState,
            postalCode: formData.intlPostalCode,
          };

    const orderData = {
      orderNumber,
      date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }),
      destinationType,
      destinationAddress,
      items: [...cart],
      subtotal,
      discountAmount,
      shippingCost,
      finalTotal,
      paymentMethod: formData.paymentMethod,
      cryptoCoin: formData.paymentMethod === 'crypto' ? selectedCrypto : null,
      customer: { ...formData },
    };

    // Dispatches automated order notification email to peptidecart0@gmail.com
    await sendNotificationEmail({
      type: 'order',
      subject: `New Order ${orderNumber} (${formatPrice(finalTotal)} CAD) [${formData.paymentMethod === 'crypto' ? `Crypto: ${selectedCrypto.toUpperCase()}` : 'Interac'}] from ${formData.firstName} ${formData.lastName}`,
      senderName: `${formData.firstName} ${formData.lastName}`,
      senderEmail: formData.email,
      senderPhone: formData.phone,
      details: {
        orderNumber,
        itemsCount: cart.length,
        itemsSummary: cart.map(i => `${i.product.name} (${i.product.dosage}) x${i.quantity} - ${formatPrice(i.product.price * i.quantity)} CAD`).join('; '),
        finalTotal: `${formatPrice(finalTotal)} CAD`,
        paymentMethod: formData.paymentMethod === 'crypto' ? `Cryptocurrency (${selectedCrypto.toUpperCase()})` : 'Interac e-Transfer',
        paymentActionRequired: formData.paymentMethod === 'crypto'
          ? `ACTION REQUIRED: Please email the customer at ${formData.email} with your ${selectedCrypto.toUpperCase()} payment address and transfer instructions.`
          : 'Domestic Interac e-Transfer auto-deposit pending.',
        shippingDestination: destinationAddress,
      },
    });

    setGeneratedOrder(orderData);
    saveOrderToDb(orderData);
    setOrderComplete(true);
    clearCart();
  };

  // ORDER CONFIRMATION VIEW
  if (orderComplete && generatedOrder) {
    const addr = generatedOrder.destinationAddress;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-brand-100 shadow-brand p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-3 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Notification Dispatched
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Your research supply order <strong className="font-mono text-brand-950 font-bold">{generatedOrder.orderNumber}</strong> has been received and dispatched to our central fulfillment desk at <strong className="text-brand-900">{ADMIN_EMAIL}</strong>.
            </p>
          </div>

          {/* Delivery Destination Snapshot */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-700 block">Shipping Destination:</span>
              <span className="text-slate-900 font-semibold">
                {addr.address} {addr.suite ? `(${addr.suite})` : ''}, {addr.city}, {addr.stateProvince} {addr.postalCode}, <strong className="text-brand-900 font-extrabold">{addr.country}</strong>
              </span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-100 text-brand-800 uppercase tracking-wider self-start sm:self-auto">
              {generatedOrder.destinationType === 'canada' ? '🇨🇦 Domestic Canadian Courier' : '🌍 International Express Air'}
            </span>
          </div>

          {/* Payment Instructions Banner */}
          <div className="p-6 rounded-2xl bg-brand-50 border border-brand-200 space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-800" />
              <h3 className="font-bold text-base text-brand-950">
                Payment Instructions: {generatedOrder.customer.paymentMethod === 'interac' ? 'Interac e-Transfer' : `Cryptocurrency (${generatedOrder.cryptoCoin ? generatedOrder.cryptoCoin.toUpperCase() : 'USDT'})`}
              </h3>
            </div>

            {/* INTERAC E-TRANSFER VIEW */}
            {generatedOrder.customer.paymentMethod === 'interac' && (
              <div className="space-y-3 text-xs text-brand-900 leading-relaxed">
                <p>Please send an Interac e-Transfer for <strong className="font-mono text-sm">{formatPrice(generatedOrder.finalTotal)} CAD</strong> to our automated fulfillment deposit recipient:</p>
                <div className="p-4 bg-white rounded-xl border border-brand-200 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Recipient Email: <strong>{ADMIN_EMAIL}</strong></span>
                    <button
                      onClick={() => copyToClipboard(ADMIN_EMAIL)}
                      className="text-[11px] font-sans font-bold text-brand-800 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <p>Message / Order Memo: <strong>{generatedOrder.orderNumber}</strong></p>
                  <p>Security Answer (if required): <strong>peptide2026</strong></p>
                </div>
                <p className="text-[11px] text-slate-500">Orders are queued for packaging and courier handoff immediately upon e-Transfer confirmation.</p>
              </div>
            )}

            {/* CRYPTO VIEW (USDT / BTC / ETH) - INVOICE SENT VIA EMAIL */}
            {generatedOrder.customer.paymentMethod === 'crypto' && (
              <div className="space-y-3 text-xs text-brand-900 leading-relaxed">
                <div className="p-5 bg-white rounded-2xl border border-brand-200 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brand-800" />
                      <span>Payment Instructions Dispatched Via Email</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                      5% Discount Applied
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    You have selected payment via <strong>{generatedOrder.cryptoCoin ? generatedOrder.cryptoCoin.toUpperCase() : 'USDT'}</strong> for a discounted total of <strong className="font-mono text-sm text-brand-950">{formatPrice(generatedOrder.finalTotal)} CAD</strong>.
                  </p>

                  <div className="p-4 bg-purple-50/70 rounded-xl border border-brand-200 text-xs text-brand-950 space-y-1.5">
                    <div className="font-bold text-brand-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-800" />
                      <span>Deposit Wallet Address Being Emailed Directly To You</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Our fulfillment billing team has received your order and preferred coin ({generatedOrder.cryptoCoin ? generatedOrder.cryptoCoin.toUpperCase() : 'USDT'}). We will email you the official payment wallet address and deposit instructions directly shortly.
                    </p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Please check your inbox (and spam/junk folder). Once you submit the transfer, reply with your transaction hash (TXID) to fast-track fulfillment.
                    </p>
                  </div>
                </div>
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
                  <span>Shipping ({generatedOrder.destinationType === 'canada' ? 'Canada Express' : 'International Express'})</span>
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
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice Receipt</span>
              </button>

              <button
                onClick={() => onNavigate('admin-orders')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 text-brand-900 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4 text-brand-800" />
                <span>Fulfillment Desk Record</span>
              </button>
            </div>

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
            Canadian Domestic & Worldwide Delivery • Min. Order $150.00 CAD
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Main Checkout Form */}
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
                  placeholder="awright@bioresearch.com"
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
                placeholder="University Department / Analytical Research Facility"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: SEPARATE SHIPPING ADDRESS SECTIONS (Canadian vs. Other / International) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-800" />
                <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  2. Shipping Destination Address
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Select destination region below</span>
            </div>

            {/* Destination Region Toggle Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setDestinationType('canada');
                  setFormData({ ...formData, paymentMethod: 'interac' });
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  destinationType === 'canada'
                    ? 'border-brand-800 bg-brand-50/70 shadow-sm ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50 bg-white'
                }`}
              >
                <span className="text-2xl">🇨🇦</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Canadian Shipping Address
                    </span>
                    {destinationType === 'canada' && (
                      <Check className="w-3.5 h-3.5 text-brand-800" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Domestic Canadian delivery (Free on orders $200+ CAD)
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDestinationType('international');
                  setFormData({ ...formData, paymentMethod: 'crypto' });
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  destinationType === 'international'
                    ? 'border-brand-800 bg-brand-50/70 shadow-sm ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50 bg-white'
                }`}
              >
                <span className="text-2xl">🌍</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Other / International Address
                    </span>
                    {destinationType === 'international' && (
                      <Check className="w-3.5 h-3.5 text-brand-800" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    United States & Worldwide (DHL / FedEx Express)
                  </p>
                </div>
              </button>
            </div>

            {/* SUBSECTION A: CANADIAN SHIPPING ADDRESS */}
            {destinationType === 'canada' && (
              <div className="p-5 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
                  <span>🇨🇦 Canadian Domestic Shipping Details</span>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-slate-700 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.caAddress}
                    onChange={(e) => setFormData({ ...formData, caAddress: e.target.value })}
                    placeholder="100 University Avenue"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Suite / Unit / Lab</label>
                    <input
                      type="text"
                      value={formData.caSuite}
                      onChange={(e) => setFormData({ ...formData, caSuite: e.target.value })}
                      placeholder="Suite 402"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.caCity}
                      onChange={(e) => setFormData({ ...formData, caCity: e.target.value })}
                      placeholder="Toronto"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Province *</label>
                    <select
                      value={formData.caProvince}
                      onChange={(e) => setFormData({ ...formData, caProvince: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none font-medium cursor-pointer"
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
                  <label className="font-bold text-slate-700 block mb-1">Canadian Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.caPostalCode}
                    onChange={(e) => setFormData({ ...formData, caPostalCode: e.target.value.toUpperCase() })}
                    placeholder="M5J 2T3"
                    className="w-full sm:w-1/2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl uppercase font-mono focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* SUBSECTION B: OTHER / INTERNATIONAL SHIPPING ADDRESS */}
            {destinationType === 'international' && (
              <div className="p-5 rounded-2xl bg-purple-50/40 border border-brand-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
                  <Globe className="w-4 h-4 text-brand-800" />
                  <span>🌍 International & Worldwide Shipping Details</span>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-slate-700 block mb-1">Destination Country / Region *</label>
                  <select
                    value={formData.intlCountry}
                    onChange={(e) => setFormData({ ...formData, intlCountry: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none font-medium cursor-pointer"
                  >
                    {internationalCountries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-slate-700 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.intlAddress}
                    onChange={(e) => setFormData({ ...formData, intlAddress: e.target.value })}
                    placeholder="450 Research Parkway"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Suite / Lab / Department</label>
                    <input
                      type="text"
                      value={formData.intlSuite}
                      onChange={(e) => setFormData({ ...formData, intlSuite: e.target.value })}
                      placeholder="Building B, Rm 310"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.intlCity}
                      onChange={(e) => setFormData({ ...formData, intlCity: e.target.value })}
                      placeholder="Boston"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">State / Province / Region *</label>
                    <input
                      type="text"
                      required
                      value={formData.intlState}
                      onChange={(e) => setFormData({ ...formData, intlState: e.target.value })}
                      placeholder="MA / California / England"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-slate-700 block mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.intlPostalCode}
                    onChange={(e) => setFormData({ ...formData, intlPostalCode: e.target.value })}
                    placeholder="02115"
                    className="w-full sm:w-1/2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>

                <p className="text-[11px] text-slate-500 pt-1">
                  * All international packages are packed with vacuum thermal insulation to ensure stability across air cargo handling.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Shipping Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Truck className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                3. Shipping Courier Option ({destinationType === 'canada' ? 'Domestic Canada' : 'International Worldwide'})
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              {destinationType === 'canada' ? (
                <>
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
                        <span className="font-bold text-slate-900 block">Canada Post Xpresspost / Purolator Express</span>
                        <span className="text-slate-500 text-[11px]">2–5 business days across Canadian provinces</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-brand-950">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE ($200+ Order)' : '$15.00 CAD'}
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
                        <span className="text-slate-500 text-[11px]">1–2 business days guaranteed temperature control</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-brand-950">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? '$15.00 CAD' : '$30.00 CAD'}
                    </span>
                  </label>
                </>
              ) : (
                <>
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
                        <span className="font-bold text-slate-900 block">International Tracked Express (DHL / FedEx)</span>
                        <span className="text-slate-500 text-[11px]">3–6 business days with door-to-door tracking</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-brand-950">
                      {subtotal >= 250.0 ? '$20.00 CAD (Discounted)' : '$35.00 CAD'}
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
                        <span className="font-bold text-slate-900 block">International Priority Cold-Chain Air</span>
                        <span className="text-slate-500 text-[11px]">2–4 business days guaranteed insulated priority transit</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-brand-950">
                      {subtotal >= 250.0 ? '$40.00 CAD' : '$55.00 CAD'}
                    </span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Section 4: Payment Method (Interac & Crypto with USDT / BTC / ETH selector) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-brand-800" />
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                4. Payment Method Selection
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              {/* Option A: Interac e-Transfer (Canada) */}
              {destinationType === 'canada' && (
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
                        Direct domestic Canadian bank deposit. Instant confirmation with reference memo.
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                    Canada Preferred
                  </span>
                </label>
              )}

              {/* Option B: Cryptocurrency with USDT, BTC, ETH selection */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  formData.paymentMethod === 'crypto'
                    ? 'border-brand-800 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <label className="flex items-start justify-between cursor-pointer">
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
                        Instant global settlement with 5% research discount. Choose your preferred coin below.
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-gold-100 text-gold-900 font-bold px-2 py-0.5 rounded uppercase flex-shrink-0">
                    5% Off Worldwide
                  </span>
                </label>

                {/* Sub-selector for USDT, BTC, ETH */}
                {formData.paymentMethod === 'crypto' && (
                  <div className="mt-4 pt-4 border-t border-brand-200/60 space-y-3 animate-in fade-in duration-200">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                      Select Cryptocurrency Coin:
                    </span>

                    <div className="grid grid-cols-3 gap-3">
                      {(['usdt', 'btc', 'eth'] as const).map((coin) => (
                        <button
                          key={coin}
                          type="button"
                          onClick={() => setSelectedCrypto(coin)}
                          className={`py-3 px-4 rounded-xl border text-center transition-all font-bold text-xs sm:text-sm ${
                            selectedCrypto === coin
                              ? 'bg-brand-800 text-white border-brand-800 shadow-sm ring-1 ring-brand-800'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {coin.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 bg-brand-50/70 rounded-xl border border-brand-200 text-xs text-brand-900 flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-brand-800 flex-shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold text-brand-950 block">Payment Instructions Sent via Email</span>
                        <p className="text-slate-600 mt-0.5">
                          When you place your order, our billing team will email you the official <strong>{selectedCrypto.toUpperCase()}</strong> deposit address and invoice directly to <strong>{formData.email || 'your email address'}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

            {/* Destination Pill Badge */}
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">Selected Destination:</span>
              <span className="font-bold text-brand-900">
                {destinationType === 'canada' ? '🇨🇦 Canada' : `🌍 ${formData.intlCountry}`}
              </span>
            </div>

            {/* Items list snippet */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
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
                <span>
                  Estimated Shipping ({destinationType === 'canada' ? 'Canada' : 'International'})
                </span>
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
              A copy of this order will be routed to <strong className="text-slate-600">{ADMIN_EMAIL}</strong> for immediate lot fulfillment.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
