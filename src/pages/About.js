import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About AFS</h1>
        <p>India's #1 Nameplate Brand Since 2011</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            AFS started in 2011 with a simple mission - to help every home
            and office in India have a beautiful nameplate. What began as a
            small workshop in Mumbai has now grown into India's most trusted
            nameplate brand.
          </p>
          <p>
            Over the past 13+ years, we've delivered over 1.5 lakh nameplates to
            happy customers across the country. From government officers to
            doctors, from small homes to large corporations - we've helped them
            all add that perfect finishing touch to their spaces.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Premium Quality</h3>
              <p>
                We use only the best materials - stainless steel, brass, and
                premium acrylics
              </p>
            </div>
            <div className="feature-item">
              <h3>Free Delivery</h3>
              <p>Free shipping across India on all orders</p>
            </div>
            <div className="feature-item">
              <h3>Live Preview</h3>
              <p>See your nameplate before you order</p>
            </div>
            <div className="feature-item">
              <h3>Easy Returns</h3>
              <p>7-day return policy if you're not satisfied</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-box">
            <h3>13+</h3>
            <p>Years of Excellence</p>
          </div>
          <div className="stat-box">
            <h3>1.5L+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-box">
            <h3>50K+</h3>
            <p>Nameplates Delivered</p>
          </div>
          <div className="stat-box">
            <h3>4.8</h3>
            <p>Customer Rating</p>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Workshop</h2>
          <p>
            All our nameplates are crafted with care at our state-of-the-art
            workshop in HSR Layout, Bengaluru. Each piece is personally checked
            by our team before it reaches you.
          </p>
          <p>
            <strong>Workshop Address:</strong>
            <br />
            AFS CNC & LASER
            <br />
            146, 7th Cross, 19th Main Rd,
            <br />
            opposite BMTC Bus Depot, Sector 4,
            <br />
            HSR Layout, Bengaluru - 560102
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
