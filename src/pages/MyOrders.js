import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER ORDERS (SUBCOLLECTION)
 useEffect(() => {
  const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch orders from users/{uid}/orders
      const ordersRef = collection(db, "users", user.uid, "orders");
      const snapshot = await getDocs(ordersRef);

      const userOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort latest first
      userOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribeAuth();
}, []);

  // 🔥 FILTER
  const filteredOrders = orders.filter(order => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  // 🔥 STATUS UI
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaClock className="status-icon confirmed" />;
      case "processing":
        return <FaBox className="status-icon processing" />;
      case "shipped":
        return <FaTruck className="status-icon shipped" />;
      case "delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      case "cancelled":
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaBox />;
    }
  };

  const getStatusText = (status) => {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Order";
  };

  return (
    <div className="my-orders-page">
      {/* HEADER */}
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Your order history</p>
      </div>

      {/* FILTER */}
      {orders.length > 0 && (
        <div className="orders-filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="loader">Loading orders...</div>
      ) : (
        <div className="orders-list">
          <AnimatePresence>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="order-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* HEADER */}
                  <div className="order-header">
                    <div>
                      <strong>Order ID:</strong> {order.id}
                      <br />
                      <small>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : ""}
                      </small>
                    </div>

                    <div className="order-status">
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="order-items-preview">
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="preview-item">
                        <img src={item.image} alt="" />
                        <div>
                          <p>{item.name}</p>
                          <small>x{item.quantity}</small>
                          <h6 className="mt-2">Name-{item.customName}</h6>
                            <h6>Designation-{item.designation}</h6>
                        </div>
                      </div>
                    ))}

                    {order.items?.length > 3 && (
                      <div className="more-items">
                        +{order.items.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="order-footer">
                    <strong>₹{order.payment?.total}</strong>

                    <button
                      className="action-btn view"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FaEye /> View
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-orders">
                <h2>No Orders Found</h2>
                <p>You haven't placed any orders yet</p>
                <button onClick={() => navigate("/")}>
                  Start Shopping
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 🔥 ORDER DETAILS MODAL */}
     <AnimatePresence>
  {selectedOrder && (
    <motion.div
      className="order-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedOrder(null)}
    >
      <motion.div
        className="order-modal modern-modal"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="modal-header">
          <h4>Order Details</h4>
          <button onClick={() => setSelectedOrder(null)}>✕</button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary-box">
          <div>
            <p>Order ID</p>
            <strong>{selectedOrder.id}</strong>
          </div>
          <div>
            <p>Date</p>
            <strong>
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </strong>
          </div>
          <div>
            <p>Status</p>
            <span className={`status-badge ${selectedOrder.status}`}>
              {selectedOrder.status}
            </span>
          </div>
        </div>

        {/* ITEMS */}
        <div className="modal-items">
          <h5>Items</h5>

          {selectedOrder.items.map((item, i) => (
            <div key={i} className="modal-item-card">
              <img src={item.image} alt="" />

              <div className="item-info">
                <h6>{item.name}</h6>

                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                {item.customName && <p>Name: {item.customName}</p>}
                {item.designation && <p>Designation: {item.designation}</p>}

                <span className="qty">Qty: {item.quantity}</span>
              </div>

              <div className="item-price">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* PRICE */}
        <div className="price-section">
          <div>
            <span>Subtotal</span>
            <span>₹{selectedOrder.payment?.subtotal}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>₹{selectedOrder.payment?.shipping}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <strong>₹{selectedOrder.payment?.total}</strong>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button
            className="btn-dark"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>
        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default MyOrders;