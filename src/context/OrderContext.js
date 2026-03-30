import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);
  const [searchedOrders, setSearchedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  // 🔥 Load orders for logged-in user
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) return;

      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));

      const snapshot = await getDocs(q);

      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(orderList);

    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Load orders when user logs in
  useEffect(() => {
    fetchOrders();
  }, []);

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Search orders
  const searchOrders = (searchTerm) => {

    if (!searchTerm) {
      setSearchedOrders([]);
      return [];
    }

    const filtered = orders.filter(order =>
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone?.includes(searchTerm) ||
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchedOrders(filtered);
    return filtered;
  };

  // Update order status (Admin use)
  const updateOrderStatus = async (orderId, status) => {

    try {

      const orderRef = doc(db, "orders", orderId);

      await updateDoc(orderRef, {
        status: status,
        updatedAt: new Date().toISOString()
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );

      toast.success(`Order status updated to ${status}`);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {

    try {

      const orderRef = doc(db, "orders", orderId);

      await updateDoc(orderRef, {
        status: "cancelled",
        updatedAt: new Date().toISOString()
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );

      toast.success("Order cancelled");

    } catch (error) {
      console.error(error);
      toast.error("Cancel failed");
    }
  };

  // Track order
  const trackOrder = (orderId) => {
    const order = getOrderById(orderId);
    return order?.timeline || [];
  };

  const clearSearch = () => {
    setSearchedOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        searchedOrders,
        loading,
        fetchOrders,
        getOrderById,
        searchOrders,
        updateOrderStatus,
        cancelOrder,
        trackOrder,
        clearSearch
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};