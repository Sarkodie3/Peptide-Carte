import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const MIN_ORDER_AMOUNT = 150.0; // Minimum order threshold in CAD ($150 CAD)
export const FREE_SHIPPING_THRESHOLD = 200.0; // Free express shipping threshold

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  minOrderAmount: number;
  isMinOrderMet: boolean;
  remainingForMinOrder: number;
  minOrderProgress: number; // 0 to 100 percentage
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  lastAddedProduct: Product | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('peptide_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('peptide_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    setLastAddedProduct(product);
    setIsCartOpen(true); // Open drawer so client sees item added
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const subtotal = Math.round(rawSubtotal * 100) / 100;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon === 'RESEARCH10') {
    discountAmount = Math.round(subtotal * 0.1 * 100) / 100;
  } else if (appliedCoupon === 'BULK15') {
    discountAmount = Math.round(subtotal * 0.15 * 100) / 100;
  } else if (appliedCoupon === 'CRYPTO5') {
    discountAmount = Math.round(subtotal * 0.05 * 100) / 100;
  }

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'RESEARCH10') {
      setAppliedCoupon('RESEARCH10');
      return { success: true, message: '10% Research Discount Applied!' };
    }
    if (clean === 'BULK15') {
      if (totalItems >= 10) {
        setAppliedCoupon('BULK15');
        return { success: true, message: '15% Bulk Discount Applied!' };
      } else {
        return { success: false, message: 'BULK15 requires at least 10 items in your cart.' };
      }
    }
    if (clean === 'CRYPTO5') {
      setAppliedCoupon('CRYPTO5');
      return { success: true, message: '5% Crypto Discount Applied!' };
    }
    return { success: false, message: 'Invalid promotional or research code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const isMinOrderMet = subtotal >= MIN_ORDER_AMOUNT;
  const remainingForMinOrder = Math.max(0, Math.round((MIN_ORDER_AMOUNT - subtotal) * 100) / 100);
  const minOrderProgress = Math.min(100, Math.round((subtotal / MIN_ORDER_AMOUNT) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        minOrderAmount: MIN_ORDER_AMOUNT,
        isMinOrderMet,
        remainingForMinOrder,
        minOrderProgress,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
