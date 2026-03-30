import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ReviewProvider } from './context/ReviewContext';
import { WishlistProvider } from './context/WishlistContext'; // Add this
import { FirebaseProvider } from './context/FirebaseContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import DeskNamePlates from './pages/DeskNamePlates';
import HouseNamePlates from './pages/HouseNamePlates';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import Products from './pages/Products';
import Reviews from './pages/Review';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsofPolicy from './pages/TermsofPolicy';


function App() {
  return (
    <FirebaseProvider>
      <CartProvider>
        <OrderProvider>
          <ReviewProvider>
            <WishlistProvider> {/* Add this wrapper */}
              <div className="App">
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
                <Header />
         <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/desk-nameplates" element={<DeskNamePlates />} />
  <Route path="/house-nameplates" element={<HouseNamePlates />} />


  <Route path="/product/:id" element={<ProductDetail />} />
 <Route path="/review" element={<Reviews />} />       // ✅ All reviews
<Route path="/review/:id" element={<Reviews />} />   // ✅ Product reviews
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<MyOrders />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path='/gallery' element={<Gallery/>}/>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/products" element={<Products />} />

  {/* Footer Routes */}
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/return-policy" element={<ReturnPolicy />} />
  <Route path="/shipping-policy" element={<ShippingPolicy />} />
  <Route path="/terms-of-service" element={<TermsofPolicy />} />





  {/* 🔥 KEEP THESE LAST */}
  <Route path="/:category/:subcategory" element={<Products />} />
  <Route path="/:category" element={<Products />} />
</Routes>
                <Footer />
              </div>
            </WishlistProvider>
          </ReviewProvider>
        </OrderProvider>
      </CartProvider>
    </FirebaseProvider>
  );
}

export default App;