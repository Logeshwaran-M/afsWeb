import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // Get average rating for a product
  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((total, review) => total + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  // Get rating counts (for distribution chart)
  const getRatingCounts = (productId) => {
    const productReviews = reviews[productId] || [];
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    productReviews.forEach(review => {
      counts[review.rating]++;
    });
    
    return counts;
  };

  // Add a new review
  const addReview = (productId, reviewData) => {
    setLoading(true);
    
    try {
      const newReview = {
        id: Date.now().toString(),
        ...reviewData,
        productId,
        createdAt: new Date().toISOString(),
        helpful: 0,
        verified: true // You can set this based on actual purchase
      };

      setReviews(prev => ({
        ...prev,
        [productId]: [newReview, ...(prev[productId] || [])]
      }));

      toast.success('Thank you for your review!');
      return newReview;
    } catch (error) {
      toast.error('Failed to submit review');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mark review as helpful
  const markHelpful = (productId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId].map(review => 
        review.id === reviewId 
          ? { ...review, helpful: (review.helpful || 0) + 1 }
          : review
      )
    }));
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      loading,
      getProductReviews,
      getAverageRating,
      getRatingCounts,
      addReview,
      markHelpful
    }}>
      {children}
    </ReviewContext.Provider>
  );
};