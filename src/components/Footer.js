import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="section-p1">
      <div className="footer-container">
        <div className="col">
          <img src="/images/afs1.jpeg" className="logo" alt="Housenama" />
          <h4>Contact</h4>
          
          {/* Workshop Address - Only Address Now */}
          <p>
            <strong> Workshop:</strong><br />
            AFS CNC & LASER<br />
            146, 7th Cross, 19th Main Rd,<br />
            opposite BMTC Bus Depot, Sector 4,<br />
            HSR Layout, Bengaluru - 560102
          </p>
          
          <p><strong>Phone:</strong> +91 8779295624</p>
          <p><strong>Email:</strong> help@housenama.com</p>
          <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
        </div>

        <div className="col">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ's</Link>
          <Link to="/review">Reviews</Link>
        </div>

        <div className="col">
          <h4>Policies</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/return-policy">Return & Refund Policy</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>

        <div className="col">
          <h4>Blogs</h4>
          <Link to="/blog/building-in-public">Building in Public</Link>
          <Link to="/blog/handmade-in-india">Handmade in India</Link>
          <Link to="/blog/buyers-guide">Nameplate Buyer's Guide</Link>
          <Link to="/blog/naming-matters">Naming Matters</Link>
        </div>

        <div className="col install">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <button onClick={() => openSocial('https://facebook.com/housenama')} aria-label="Facebook">
              <FaFacebookF />
            </button>
            <button onClick={() => openSocial('https://instagram.com/housenama')} aria-label="Instagram">
              <FaInstagram />
            </button>
            <button onClick={() => openSocial('https://youtube.com/housenama')} aria-label="YouTube">
              <FaYoutube />
            </button>
           
          </div>

        </div>
      </div>

      <div className="copyright">
        <p>© 2026, AFS Stickering & Signages - India's #1 Nameplate Brand</p>
        <p className="small-text">Workshop: AFS CNC & LASER, HSR Layout, Bengaluru - 560102</p>
      </div>
    </footer>
  );
};

export default Footer;