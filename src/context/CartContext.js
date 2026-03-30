import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Lazy load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add item to cart
  const addToCart = (product) => {
    const uniqueId =
      product.id +
      '-' +
      (product.customName || '') +
      '-' +
      (product.designation || '');

    setCartItems((prev) => {
      const existing = prev.find((item) => item.uniqueId === uniqueId);

      if (existing) {
        // Increment quantity if same product + text combo exists
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      // Add new product if it doesn't exist
      return [...prev, { ...product, quantity: product.quantity || 1, uniqueId }];
    });

    toast.success('Added to cart ✅');
  };

  // Remove item from cart
  const removeFromCart = (uniqueId) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    toast.success('Removed from cart!');
  };

  // Update quantity of an item
  const updateQuantity = (uniqueId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared!');
  };

  // Add order to orders history
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    toast.success('Order saved to history!');
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get total quantity
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        clearCart,
        orders,
        addOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};