import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <div className="confirmation-card">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. We'll send you an email with order details.</p>
        <p className="order-number">Order #: HOUSENAMA{Math.floor(Math.random() * 1000000)}</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          <FaHome /> Continue Shopping
        </button>        <button className="btn-secondary" onClick={() => navigate('/orders')}>
          View My Orders
        </button>      </div>
    </div>
  );
};

export default OrderConfirmation;