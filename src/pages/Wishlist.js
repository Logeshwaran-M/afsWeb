import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Row,Col } from 'react-bootstrap';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaTrash, 
  FaArrowLeft,
  FaShare,
  FaTimes,
  FaBolt,
  FaGift
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import './Wishlist.css';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const navigate = useNavigate();
  const { 
    wishlistItems, 
    removeFromWishlist, 
    clearWishlist,
    moveToCart,
    getWishlistCount 
  } = useWishlist();
  const { addToCart } = useCart();
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Sort items
  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.addedAt) - new Date(a.addedAt);
      case 'oldest':
        return new Date(a.addedAt) - new Date(b.addedAt);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };


  useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      // Grab 4 products ordered by createdAt (latest first)
      const productsQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(4)
      );

      const snapshot = await getDocs(productsQuery);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRelatedProducts(products);
    } catch (error) {
      console.error("Failed to fetch related products:", error);
    }
  };

  if (wishlistItems.length > 0) {
    fetchRelatedProducts();
  }
}, [wishlistItems]);

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      toast.error('No items selected');
      return;
    }

    if (window.confirm(`Remove ${selectedItems.length} item(s) from wishlist?`)) {
      selectedItems.forEach(id => {
        const item = wishlistItems.find(item => item.id === id);
        removeFromWishlist(id, item?.name);
      });
      setSelectedItems([]);
    }
  };

  const handleMoveSelectedToCart = () => {
    if (selectedItems.length === 0) {
      toast.error('No items selected');
      return;
    }

    selectedItems.forEach(id => {
      const item = wishlistItems.find(item => item.id === id);
      if (item) {
        moveToCart(id, addToCart);
      }
    });
    setSelectedItems([]);
  };

  const handleShareWishlist = () => {
    setShareModal(true);
  };

  const generateShareLink = () => {
    // In a real app, you'd generate a unique link
    const items = wishlistItems.map(item => item.name).join(', ');
    return `Check out my wishlist: ${items}`;
  };

  const copyShareLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    toast.success('Wishlist copied to clipboard!');
    setShareModal(false);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="empty-content"
        >
          <div className="empty-icon">
            <FaHeart />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items here and shop them later!</p>
          <div className="empty-actions">
            <button className="btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
            <button className="btn-secondary" onClick={() => navigate('/best-sellers')}>
              View Best Sellers
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1>
            My Wishlist 
            <span className="wishlist-count">({getWishlistCount()} items)</span>
          </h1>
        </div>
        
        <div className="header-actions">
          <button className="share-btn" onClick={handleShareWishlist}>
            <FaShare /> Share Wishlist
          </button>
          {wishlistItems.length > 0 && (
            <button className="clear-btn" onClick={clearWishlist}>
              <FaTrash /> Clear All
            </button>
          )}
        </div>
      </div>

      {wishlistItems.length > 0 && (
        <>
          {/* Bulk Actions */}
          <div className="wishlist-bulk-actions">
            <div className="bulk-select">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedItems.length === wishlistItems.length}
                  onChange={handleSelectAll}
                />
                <span>Select All ({wishlistItems.length})</span>
              </label>
              {selectedItems.length > 0 && (
                <span className="selected-count">{selectedItems.length} selected</span>
              )}
            </div>

            <div className="bulk-buttons">
              <button 
                className="bulk-move-btn"
                onClick={handleMoveSelectedToCart}
                disabled={selectedItems.length === 0}
              >
                <FaShoppingCart /> Move to Cart ({selectedItems.length})
              </button>
              <button 
                className="bulk-remove-btn"
                onClick={handleRemoveSelected}
                disabled={selectedItems.length === 0}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>

          {/* Sort Bar */}
          <div className="wishlist-sort">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </>
      )}

      {/* Wishlist Items Grid */}
      <div className="wishlist-grid">
        <AnimatePresence>
          {sortedItems.map((item) => (
            <motion.div
              key={item.id}
              className="wishlist-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="card-select">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>

              <div className="card-image" onClick={() => handleViewProduct(item.id)}>
                <img src={item.images[0]} alt={item.name} />
                {item.popular && <span className="popular-badge">Popular</span>}
              </div>

              <div className="card-content">
                <h3 onClick={() => handleViewProduct(item.id)}>{item.name}</h3>
                
                <div className="card-price">
                  <span className="current-price">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">₹{item.originalPrice}</span>
                  )}
                </div>

                {item.inStock === false && (
                  <div className="out-of-stock">Out of Stock</div>
                )}

                <div className="card-actions">
                  <button 
                    className="cart-btn"
                    onClick={() => moveToCart(item.id, addToCart)}
                    disabled={item.inStock === false}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                  
                  <button 
                    className="buy-btn"
                    onClick={() => {
                      addToCart(item);
                      navigate('/cart');
                    }}
                    disabled={item.inStock === false}
                  >
                    <FaBolt /> Buy Now
                  </button>
                </div>

                <div className="card-footer">
                  <span className="added-date">
                    Added: {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id, item.name)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Recommended Products */}
    {wishlistItems.length > 0 && relatedProducts.length > 0 && (
  <section className="recommended-section mt-5">
    <h4 className="mb-3">You May Also Like</h4>
    <Row>
      {relatedProducts.map((p) => (
        <Col key={p.id} xs={6} md={4} lg={3} className="mb-4">
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  </section>
)}

      {/* Share Modal */}
      <AnimatePresence>
        {shareModal && (
          <motion.div 
            className="share-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShareModal(false)}
          >
            <motion.div 
              className="share-modal"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="share-modal-header">
                <h3>Share Your Wishlist</h3>
                <button className="close-btn" onClick={() => setShareModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="share-modal-content">
                <p>Share your wishlist with friends and family!</p>
                
                <div className="share-link">
                  <input 
                    type="text" 
                    value={generateShareLink()} 
                    readOnly 
                  />
                  <button onClick={copyShareLink}>Copy</button>
                </div>

                <div className="share-social">
                  <button className="social-btn whatsapp">
                    WhatsApp
                  </button>
                  <button className="social-btn facebook">
                    Facebook
                  </button>
                  <button className="social-btn twitter">
                    Twitter
                  </button>
                  <button className="social-btn email">
                    Email
                  </button>
                </div>

                <div className="share-gift">
                  <FaGift />
                  <span>Someone special? Gift these items!</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;