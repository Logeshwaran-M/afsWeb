import React, { useEffect, useState } from 'react';
import FeatureCard from '../components/FeatureCard';
import { FaTruck, FaPalette, FaHeart, FaRuler, FaShieldAlt, FaClock } from 'react-icons/fa';
import { subscribeToProducts } from '../services/productService';  
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';
import Features from './Features';
import NameplateCollections from './NamePlateCollection';
import LivePreview from './Livepreview';
import ReviewSlider from './DuplicateReview';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();


  useEffect(() => {
    // 🔥 Set up real-time listener for products
    const unsubscribe = subscribeToProducts((products) => {
      // Filter popular products
      const popular = products.filter(p => p.popular).slice(0, 8);
      setBestSellers(popular);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", description: "Free delivery across India" },
    { icon: <FaPalette />, title: "Unique Designs", description: "Exclusive designer collections" },
    { icon: <FaHeart />, title: "100% Love-it Guarantee", description: "Love it or we'll make it right" },
    { icon: <FaRuler />, title: "Live Preview", description: "See your nameplate before ordering" },
    { icon: <FaShieldAlt />, title: "Premium Quality", description: "Grade 304 stainless steel" },
    { icon: <FaClock />, title: "13+ Years", description: "150,000+ nameplates delivered" }
  ];


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        limit(8) // get first 8 products
      );

      const snapshot = await getDocs(q);
      const productsFromDB = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // keep all fields from Firestore
      }));

      console.log("Products fetched:", productsFromDB); // debug
      setBestSellers(productsFromDB);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Banner />
     
      <section className="welcome-section section-p1">
        <div className="container">
          <h2>Welcome to AFS</h2>
          <h3>Why buy a nameplate from us?</h3>
          <p className="subtitle">AFS - India's #1 Nameplate Brand. Personalizing homes since 2011.</p>
          
          <div className="stats">
            <div className="stat-item">
              <h4>13+ years</h4>
              <p>of excellence</p>
            </div>
            <div className="stat-item">
              <h4>150,000+</h4>
              <p>nameplates delivered</p>
            </div>
          </div>
        </div>
      </section>
 <Features/>
 <NameplateCollections/>
 <LivePreview/>
      <section className="features-section section-p1">
        <div className="container">
          <h2 className="section-title">What makes us superior?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="collections-section section-p1">
        <div className="container">
          <h2 className="section-title">Designer Name-plate Collections</h2>
          <div className="collections-grid">
            <div className="collection-item desk">
              <h3>Desk Name Plates</h3>
            </div>
            <div className="collection-item modern">
              <h3>Modern Name Plates</h3>
            </div>
            <div className="collection-item metal">
              <h3>Metal Name Plates</h3>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h4 className="fw-bold mb-0">Our Best Sellers</h4>
          <a href="/Desk/" className="text-decoration-none text-primary fw-semibold small">View All Items →</a>
        </div>

        {/* 2. Responsive Grid System */}
        <div className="row g-3 g-md-4">
      {bestSellers.map((product) => (
  <div className="col-6 col-md-4 col-lg-3" key={product.id}   onClick={() => navigate(`/product/${product.id}`)}
    style={{ cursor: "pointer" }} >
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card-hover">
      <div className="position-relative overflow-hidden">
        {product.tag && (
          <span className="position-absolute top-0 start-0 m-2 badge rounded-pill bg-dark px-2 py-1 z-3 opacity-75 x-small">
            {product.tag}
          </span>
        )}

        <div className="action-btns position-absolute top-0 end-0 m-2 d-flex flex-column gap-2 z-3">
          <button className="btn btn-light btn-sm shadow-sm rounded-circle p-0" style={{width: '30px', height: '30px'}}>
            <i className="bi bi-eye text-primary"></i>
          </button>
          <button className="btn btn-light btn-sm shadow-sm rounded-circle p-0" style={{width: '30px', height: '30px'}}>
            <i className="bi bi-play-circle text-danger"></i>
          </button>
        </div>

        <img src={product.images[0]} className="card-img-top zoom-img" alt={product.name} />
          <span className="position-absolute top-0 start-0 m-2 badge rounded-pill bg-dark px-2 py-1 z-3 opacity-75 x-small">
                    Popular
                  </span>
      </div>

      <div className="card-body p-3 d-flex flex-column">
        <h6 className="card-title text-dark fw-bold mb-1 line-clamp-2" style={{ fontSize: '0.85rem', minHeight: '2.5rem' }}>
          {product.name}
        </h6>
        <div className="mt-auto pt-2">
          <small className="text-muted">From</small>
          <span className="fs-5 fw-bold text-primary ms-1">₹{product.price}</span>
        </div>
      </div>
    </div>
  </div>
))}
        </div>
      </div>

      {/* 3. Internal Scoped Styles */}
      <style>{`
        .product-card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
        }
        .zoom-img {
          transition: transform 0.6s ease;
        }
        .product-card-hover:hover .zoom-img {
          transform: scale(1.1);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .action-btns {
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        .product-card-hover:hover .action-btns {
          opacity: 1;
          transform: translateX(0);
        }
        .x-small { font-size: 0.65rem; }
      `}</style>
    </section>
   <ReviewSlider/>
    </>
  );
};

export default Home;