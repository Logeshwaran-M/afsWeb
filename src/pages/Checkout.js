import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../services/orderService';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaLock, FaMapMarkerAlt, FaUser, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: 'KA',
    pincode: '',
    phone: '',
    paymentMethod: 'razorpay',
    shippingMethod: 'standard'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        setUser(currentUser);
        setFormData(prev => ({ ...prev, email: currentUser.email || '' }));
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setShippingCost(formData.shippingMethod === 'express' ? 100 : 0);
  }, [formData.shippingMethod]);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email) return toast.error("Email required");
    if (!formData.firstName || !formData.lastName) return toast.error("Enter full name");
    if (!formData.address1) return toast.error("Address required");
    if (!formData.city) return toast.error("City required");
    if (!/^\d{6}$/.test(formData.pincode)) return toast.error("Invalid PIN code");
    if (!/^\d{10}$/.test(formData.phone)) return toast.error("Invalid phone number");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!user || !user.uid) return toast.error("User not logged in");

    setIsProcessing(true);
    try {
      const subtotal = getCartTotal();
      const total = subtotal + shippingCost;

      const safeCartItems = cartItems.map(item => ({
        id: item.id || '',
        name: item.name || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || '',
        customName: item.customName || '',
        designation: item.designation || '',
        size: item.size || ''
      }));

      const orderNote = location.state?.note || '';

      const orderData = {
        userId: user.uid,
        orderNumber: `ORD-${Date.now()}`,
        customer: {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone
        },
        shipping: {
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          method: formData.shippingMethod,
          cost: shippingCost
        },
        items: safeCartItems,
        note: orderNote,
        payment: {
          method: formData.paymentMethod,
          status: formData.paymentMethod === "cod" ? "pending" : "paid",
          subtotal,
          shipping: shippingCost,
          total
        },
        status: "pending",
        createdAt: new Date().toISOString()
      };

      const savedOrder = await saveOrder(user, orderData); 
      if (savedOrder) {
        toast.success("Order placed successfully");
        clearCart();
        navigate("/order-confirmation", { state: { orderId: savedOrder.id } });
      } else throw new Error("Order could not be saved");
    } catch (error) {
      console.error(error);
      toast.error("Order failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const total = getCartTotal() + shippingCost;

  return (
    <Container className="checkout-page py-5">
      <Row>
        {/* Checkout Form */}
        <Col lg={7} className="mb-4">
          <Card className="p-4 shadow-sm">
            <Button variant="link" className="mb-3 p-0 text-decoration-none" onClick={() => navigate('/cart')}>
              <FaArrowLeft /> Back to Cart
            </Button>

            <h2 className="mb-4">Checkout</h2>

            {/* Contact Section */}
            <h5><FaUser className="me-2"/> Contact</h5>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Delivery Section */}
            <h5 className="mt-4"><FaMapMarkerAlt className="me-2"/> Delivery</h5>
            <Form.Group className="mb-2">
              <Form.Control type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="text" name="address1" placeholder="Address" value={formData.address1} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}/>
            </Form.Group>

            <Button variant="success" className="w-100 mt-3" onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay ₹${total}`}
            </Button>

            <div className="d-flex align-items-center mt-3 text-muted">
              <FaLock className="me-2"/> Secure Checkout
            </div>
          </Card>
        </Col>

        {/* Cart Summary / Product Details */}
        <Col lg={5}>
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3">Your Order</h4>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} width={60} height={60} className="rounded me-3"/>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    {item.customName && <small>Name: {item.customName}</small>}<br/>
                    {item.designation && <small>Designation: {item.designation}</small>}<br/>
                    {item.size && <small>Size: {item.size}</small>}
                  </div>
                  <div className="fw-bold">₹{item.price * item.quantity}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr/>
            <div className="d-flex justify-content-between fw-bold mb-2">
              <span>Subtotal</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{shippingCost > 0 ? `₹${shippingCost}` : 'Free'}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mb-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;