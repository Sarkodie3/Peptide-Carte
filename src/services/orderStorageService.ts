// Order & Inquiry Persistent Storage Service for Peptide Cart
// Ensures every placed order and client inquiry is saved and accessible

export interface StoredOrder {
  orderNumber: string;
  date: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      dosage: string;
      price: number;
    };
    quantity: number;
  }>;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  finalTotal: number;
  destinationType: 'canada' | 'international';
  destinationAddress: {
    address: string;
    suite?: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  cryptoCoin: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyInstitution?: string;
    paymentMethod: 'interac' | 'crypto';
    orderNotes?: string;
  };
  status: 'Pending Payment' | 'Processing' | 'Completed' | 'Shipped';
}

const STORAGE_KEY = 'peptidecart_orders_db';

const DEFAULT_ORDERS: StoredOrder[] = [
  {
    orderNumber: 'PC-583244',
    date: new Date().toISOString(),
    items: [
      {
        product: {
          id: 'ss-31-10mg',
          name: 'SS-31 10 mg',
          dosage: '10 mg',
          price: 49.99,
        },
        quantity: 4,
      },
    ],
    subtotal: 199.96,
    discountAmount: 0,
    shippingCost: 15.00,
    finalTotal: 214.96,
    destinationType: 'canada',
    destinationAddress: {
      address: '1692 85th street, osoyoo,BC (Mayor street)',
      suite: '',
      city: 'Kelowna',
      stateProvince: 'BC',
      postalCode: '110',
      country: 'Canada',
    },
    cryptoCoin: null,
    customer: {
      firstName: 'Customer',
      lastName: '',
      email: 'asongsehqueentin291@gmail.com',
      phone: 'Not provided',
      paymentMethod: 'interac',
    },
    status: 'Pending Payment',
  },
];

export const saveOrderToDb = (order: any): void => {
  try {
    const existing = getStoredOrders();
    const index = existing.findIndex(o => o.orderNumber === order.orderNumber);
    if (index >= 0) {
      existing[index] = { ...existing[index], ...order };
    } else {
      existing.unshift({
        ...order,
        date: order.date || new Date().toISOString(),
        status: order.status || 'Pending Payment',
      });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save order to localStorage:', e);
  }
};

export const getStoredOrders = (): StoredOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with default order and save
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to read orders from localStorage:', e);
    return DEFAULT_ORDERS;
  }
};

export const updateOrderStatus = (orderNumber: string, status: StoredOrder['status']): void => {
  try {
    const orders = getStoredOrders();
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
      order.status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  } catch (e) {
    console.error('Failed to update order status:', e);
  }
};
