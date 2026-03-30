import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsWishlist(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    const result = toggleWishlist(product);
    setIsWishlist(result);
  };

  return (
    <motion.div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
    >
      <div className="product-image-container">
        {product.popular && <span className="popular-badge">Popular</span>}
        
        <button 
          className={`wishlist-icon ${isWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          {isWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>

      <div className="image-wrapper">
  <img 
    src={product.images[0]} 
    alt={product.name} 
    className="img primary-img" 
  />
  
  {product.images[1] && (
    <img 
      src={product.images[1]} 
      alt={product.name} 
      className="img secondary-img" 
    />
  )}
</div>

        {/* Hover Overlay Actions */}
        <AnimatePresence>
           <span className="position-absolute top-0 start-0 m-2 badge rounded-pill bg-dark px-2 py-1 z-3 opacity-75 x-small">
                    Popular
                  </span>
        </AnimatePresence>
      </div>

      <div className="card p-3">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="rating-row">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < (product.rating || 5) ? "star-filled" : "star-empty"} />
          ))}
          <span className="review-count">({product.reviews || 0})</span>
        </div>

        <div className="price-row">
          <span className="currency">From</span>
          <span className="amount">₹ {product.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;