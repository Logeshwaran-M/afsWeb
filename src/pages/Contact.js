import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any queries or support</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          
          {/* AFS CNC & LASER Workshop Address */}
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Workshop Address</h3>
              <p>
                <strong>AFS CNC & LASER</strong><br />
                146, 7th Cross, 19th Main Rd,<br />
                opposite BMTC Bus Depot, Sector 4,<br />
                HSR Layout, Bengaluru,<br />
                Karnataka - 560102
              </p>
            </div>
          </div>

          <div className="info-item">
            <FaPhone className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+91 8779295624</p>
              <p>Mon - Sat, 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>help@housenama.com</p>
              <p>support@housenama.com</p>
            </div>
          </div>

          <div className="info-item">
            <FaClock className="info-icon" />
            <div>
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Map Section - Updated with AFS CNC & LASER Location */}
      <div className="map-section">
        <h2>Find Us at HSR Layout</h2>
        <div className="map-container">
          <iframe
      title="AFS CNC & LASER Exact Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.682195839763!2d77.568475!3d12.83497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6a4f8b9c8b8b%3A0x8b8b8b8b8b8b8b8b!2sAFS%20CNC%20%26%20LASER!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
        </div>
        <p className="map-address-note" style={{ textAlign: 'center', marginTop: '10px', color: '#64748b' }}>
          <FaMapMarkerAlt /> 146, 7th Cross, 19th Main Rd, opposite BMTC Bus Depot, Sector 4, HSR Layout, Bengaluru - 560102
        </p>
      </div>
    </div>
  );
};

export default Contact;