import React, { useState, useEffect } from 'react';
import { X, Package, Mail, Copy, Check, Clock, MapPin, CreditCard, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredOrders, updateOrderStatus, StoredOrder } from '../../services/orderStorageService';
import { ADMIN_EMAIL, generateOrderMailtoUri } from '../../services/emailService';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyOrder = (order: StoredOrder) => {
    const text = `--- PEPTIDE CART ORDER DISPATCH ---
Order Number: ${order.orderNumber}
Date: ${new Date(order.date).toLocaleString()}
Customer: ${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Payment: ${order.customer.paymentMethod === 'interac' ? 'Interac e-Transfer' : `Crypto (${order.cryptoCoin ? order.cryptoCoin.toUpperCase() : 'USDT'})`}
Total: $${order.finalTotal.toFixed(2)} CAD
Shipping Address: ${order.destinationAddress.address} ${order.destinationAddress.suite || ''}, ${order.destinationAddress.city}, ${order.destinationAddress.stateProvince} ${order.destinationAddress.postalCode}, ${order.destinationAddress.country}
Items:
${order.items.map(i => ` - ${i.product.name} (${i.product.dosage}) x${i.quantity} = $${(i.product.price * i.quantity).toFixed(2)} CAD`).join('\n')}
-----------------------------------`;

    navigator.clipboard.writeText(text);
    setCopiedId(order.orderNumber);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleStatusChange = (orderNumber: string, newStatus: StoredOrder['status']) => {
    updateOrderStatus(orderNumber, newStatus);
    loadOrders();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center border border-gold-400/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex flex-wrap items-center gap-2">
                Central Order Fulfillment Desk
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 font-normal">
                  peptidecart0@gmail.com • peptide0@gmail.com
                </span>
              </h2>
              <p className="text-xs text-slate-300">Live order repository & courier fulfillment queue</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Refresh Orders"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-Time Storage Notice */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
          <Package className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Real-Time Fulfillment Database:</strong> All orders placed on the website are instantly logged here with complete customer contact details, itemized lots, and delivery addresses. You can copy the full courier dispatch summary or forward it directly to your email with 1 click.
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-700">No Orders in Queue</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Orders placed by researchers through the checkout interface will appear here automatically with full shipping and payment specifications.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Showing <strong>{orders.length}</strong> recorded order{orders.length > 1 ? 's' : ''}</span>
              </div>

              {orders.map((order) => (
                <div key={order.orderNumber} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-4 shadow-sm">
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-extrabold text-brand-950">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-extrabold text-brand-900">
                        ${order.finalTotal.toFixed(2)} CAD
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderNumber, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          order.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : order.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending Payment">Pending Payment</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer & Destination Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-800" />
                        <span>Delivery Destination</span>
                      </div>
                      <p className="text-slate-700 leading-snug">
                        {order.destinationAddress.address} {order.destinationAddress.suite || ''}
                      </p>
                      <p className="text-slate-700 font-medium">
                        {order.destinationAddress.city}, {order.destinationAddress.stateProvince} {order.destinationAddress.postalCode}
                      </p>
                      <p className="text-brand-900 font-bold uppercase text-[11px]">
                        {order.destinationAddress.country} ({order.destinationType === 'canada' ? '🇨🇦 Canada Post Courier' : '🌍 International Express Air'})
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-brand-800" />
                        <span>Payment & Contact</span>
                      </div>
                      <p className="text-slate-900 font-semibold">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-slate-600 font-mono text-[11px]">
                        {order.customer.email} {order.customer.phone ? `• ${order.customer.phone}` : ''}
                      </p>
                      <div className="pt-0.5">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-900 border border-brand-200">
                          {order.customer.paymentMethod === 'interac'
                            ? 'Interac e-Transfer (peptidecart0@gmail.com)'
                            : `Crypto: ${order.cryptoCoin ? order.cryptoCoin.toUpperCase() : 'USDT'}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                    <div className="p-2.5 bg-slate-100 font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                      Ordered Research Lots
                    </div>
                    <div className="divide-y divide-slate-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-2.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-900">
                            {item.product.name} ({item.product.dosage})
                          </span>
                          <div className="font-mono text-slate-700 text-[11px]">
                            Qty: <strong className="text-slate-900">{item.quantity}</strong> × ${item.product.price.toFixed(2)} = <strong className="text-brand-950 font-bold">${(item.product.price * item.quantity).toFixed(2)} CAD</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex justify-between font-mono text-[11px] text-slate-600">
                      <span>Subtotal: ${order.subtotal.toFixed(2)} | Shipping: ${order.shippingCost.toFixed(2)}</span>
                      <span className="font-bold text-slate-900 text-xs">Total: ${order.finalTotal.toFixed(2)} CAD</span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleCopyOrder(order)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === order.orderNumber ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Order Summary</span>
                        </>
                      )}
                    </button>

                    <a
                      href={generateOrderMailtoUri({
                        type: 'order',
                        subject: `Order ${order.orderNumber} ($${order.finalTotal.toFixed(2)} CAD)`,
                        senderName: `${order.customer.firstName} ${order.customer.lastName}`,
                        senderEmail: order.customer.email,
                        senderPhone: order.customer.phone,
                        details: {
                          orderNumber: order.orderNumber,
                          finalTotal: `$${order.finalTotal.toFixed(2)} CAD`,
                          shippingAddress: order.destinationAddress,
                          itemsSummary: order.items.map(i => `${i.product.name} x${i.quantity}`).join(', '),
                          paymentMethod: order.customer.paymentMethod,
                        },
                      })}
                      className="px-3 py-1.5 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-gold-400" />
                      <span>Forward to Mail Client</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Peptide Cart Fulfillment Hub • Real-time Data Synchronization</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
