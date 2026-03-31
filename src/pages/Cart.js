import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // ✅ New state for order note
  const [orderNote, setOrderNote] = useState('');

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Pass the note along with cart items to checkout page
    navigate('/checkout', { state: { note: orderNote } });
  };

  const handleShowPreview = (item) => {
    setPreviewItem(item);
    setShowPreview(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart section-p1">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button className="btn-primary" onClick={() => window.location.href = '/'}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="cart-section section-p1">
      <h2>Shopping Cart</h2>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <motion.div
              key={item.uniqueId}
              className="cart-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="cart-image-wrapper" style={{ position: 'relative' }}>
                <img src={item.image} alt={item.name} />
                <button
                  className="preview-btn"
                  onClick={() => handleShowPreview(item)}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Preview
                </button>
              </div>

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹ {item.price}</p>

                {item.customName && <p><strong>Name:</strong> {item.customName}</p>}
                {item.designation && <p><strong>Designation:</strong> {item.designation}</p>}
                {item.size && <p><strong>Size:</strong> {item.size}</p>}

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}>+</button>
                </div>
              </div>

              <div className="item-total">
                <p>₹ {item.price * item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.uniqueId)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal ({getCartCount()} items)</span>
            <span>₹ {getCartTotal()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          {/* ✅ New Order Note Input */}
          <div className="order-note">
            <label htmlFor="orderNote"><strong>Note to your order:</strong></label>
            <textarea
              id="orderNote"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Add a note for your order (optional)"
              rows={3}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div className="summary-item total">
            <span>Total</span>
            <span>₹ {getCartTotal()}</span>
          </div>

          <button
            className="btn-primary checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Modal for Nameplate Preview */}
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Nameplate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {previewItem && (
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              <img
                src={previewItem.image}
                alt={previewItem.name}
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <div
                style={{
                  position: "absolute",
                  top: previewItem?.textPosition?.top || "50%",
                  left: previewItem?.textPosition?.left || "50%",
                  transform: "translate(-50%, -90%)",
                  color: "gold",
                  textAlign: "center"
                }}
              >
                <h4>{previewItem.customName}</h4>
                <p>{previewItem.designation}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Cart;