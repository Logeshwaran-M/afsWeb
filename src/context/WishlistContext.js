import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add to wishlist
  const addToWishlist = (product) => {
    setLoading(true);
    
    try {
      const existing = wishlistItems.find(item => item.id === product.id);
      
      if (existing) {
        toast.error(`${product.name} is already in your wishlist`, {
          icon: '❤️',
        });
        return false;
      }

      const wishlistItem = {
        ...product,
        addedAt: new Date().toISOString()
      };

      setWishlistItems(prev => [wishlistItem, ...prev]);
      
      toast.success(`${product.name} added to wishlist!`, {
        icon: '❤️',
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
        },
      });
      
      return true;
    } catch (error) {
      toast.error('Failed to add to wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (productId, productName) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast.success(`${productName || 'Item'} removed from wishlist`, {
      icon: '💔',
      duration: 3000,
    });
  };

  // Check if in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id, product.name);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
  };

  // Move to cart
  const moveToCart = (productId, addToCart) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      addToCart(item);
      removeFromWishlist(productId, item.name);
      toast.success('Item moved to cart', {
        icon: '🛒',
      });
    }
  };

  // Get wishlist items
  const getWishlistItems = () => {
    return wishlistItems;
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      getWishlistCount,
      clearWishlist,
      moveToCart,
      getWishlistItems
    }}>
      {children}
    </WishlistContext.Provider>
  );
};