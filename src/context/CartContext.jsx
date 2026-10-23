import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('classic_edge_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('classic_edge_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, item) => {
    setToastMessage({ message, item });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, qty = 1) => {
    const numericPrice = typeof product.priceNum === 'number' 
      ? product.priceNum 
      : parseInt(String(product.price || '0').replace(/[^0-9]/g, ''), 10) || 1499;

    const formattedPrice = product.price || `₹ ${numericPrice.toLocaleString('en-IN')}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        showToast(`Updated quantity for ${product.name}`, updated[existingIndex]);
        return updated;
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          category: product.categoryLabel || product.category || 'Atelier Goods',
          image: product.image,
          price: formattedPrice,
          priceNum: numericPrice,
          quantity: qty,
          subType: product.subType || ''
        };
        showToast(`Added "${product.name}" to your cart`, newItem);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'CLASSIC10' || cleanCode === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponCode(cleanCode);
      return { success: true, message: 'Coupon applied! 10% discount added.' };
    } else if (cleanCode === 'FIRSTBUY' || cleanCode === 'GIFT15') {
      setDiscountPercent(15);
      setCouponCode(cleanCode);
      return { success: true, message: 'Special promo applied! 15% discount.' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try WELCOME10' };
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceNum * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 150;
  const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        discountAmount,
        discountPercent,
        couponCode,
        shipping,
        tax,
        finalTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        toastMessage,
        dismissToast: () => setToastMessage(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
