import React from "react";
import { 
  FaTruck, FaBoxOpen, FaClock, FaMapMarkedAlt, 
  FaExclamationTriangle, FaCheckCircle, FaSearchLocation, FaEnvelope 
} from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.iconCircle}>
            <FaTruck size={32} color="#4f46e5" />
          </div>
          <h1 style={styles.title}>Shipping Policy</h1>
          <p style={styles.subtitle}>
            Fast, reliable, and transparent delivery for your business needs.
          </p>
          <div style={styles.metaBadge}>
            <FaClock style={{ marginRight: "6px" }} />
            Last Updated: {new Date().toDateString()}
          </div>
        </header>

        {/* Delivery Timeline Visualization */}
        <div style={styles.timelineContainer}>
          <div style={styles.timelineItem}>
            <div style={styles.timelineIcon}><FaBoxOpen /></div>
            <p style={styles.timelineTitle}>Order Placed</p>
            <span style={styles.timelineSub}>Instant Confirmation</span>
          </div>
          <div style={styles.timelineConnector} />
          <div style={styles.timelineItem}>
            <div style={styles.timelineIcon}><FaClock /></div>
            <p style={styles.timelineTitle}>Processing</p>
            <span style={styles.timelineSub}>1-3 Business Days</span>
          </div>
          <div style={styles.timelineConnector} />
          <div style={styles.timelineItem}>
            <div style={styles.timelineIcon}><FaTruck /></div>
            <p style={styles.timelineTitle}>Shipped</p>
            <span style={styles.timelineSub}>3-7 Business Days</span>
          </div>
        </div>

        <div style={styles.contentBody}>
          {/* Section 1: Processing Time */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaBoxOpen style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>1. Order Processing</h2>
            </div>
            <p style={styles.text}>
              All orders are processed with care to ensure quality accuracy.
            </p>
            <ul style={styles.list}>
              <li><FaCheckCircle style={styles.check} /> Standard orders ship within <strong>1-3 business days</strong>.</li>
              <li><FaCheckCircle style={styles.check} /> Customized signages may require <strong>2-4 additional days</strong> for production.</li>
              <li><FaCheckCircle style={styles.check} /> We do not process shipments on Sundays or National Holidays.</li>
            </ul>
          </section>

          {/* Section 2: Delivery Rates */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaMapMarkedAlt style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>2. Delivery Estimates & Charges</h2>
            </div>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <h3 style={styles.statValue}>3-7 Days</h3>
                <p style={styles.statLabel}>Standard Delivery</p>
              </div>
              <div style={styles.statCard}>
                <h3 style={styles.statValue}>Calculated</h3>
                <p style={styles.statLabel}>At Checkout</p>
              </div>
              <div style={styles.statCard}>
                <h3 style={styles.statValue}>Free</h3>
                <p style={styles.statLabel}>On Bulk Orders*</p>
              </div>
            </div>
          </section>

          {/* Section 3: Order Tracking */}
          <section style={{ ...styles.section, background: "#eef2ff", border: "1px solid #c7d2fe" }}>
            <div style={styles.sectionHeader}>
              <FaSearchLocation style={{ ...styles.sectionIcon, color: "#4338ca" }} />
              <h2 style={{ ...styles.sectionTitle, color: "#4338ca" }}>3. Real-Time Tracking</h2>
            </div>
            <p style={{ ...styles.text, color: "#3730a3" }}>
              Stay updated every step of the way. Once your order is dispatched, a 
              <strong> Tracking ID</strong> will be sent to your registered Email and WhatsApp.
            </p>
          </section>

          {/* Section 4: Delays & Address */}
          <div style={styles.dualGrid}>
            <div style={styles.miniCard}>
              <FaExclamationTriangle style={{ color: "#f59e0b", marginBottom: "10px" }} />
              <h4 style={styles.miniTitle}>Potential Delays</h4>
              <p style={styles.miniText}>Occasional delays may occur due to weather, logistics bottlenecks, or peak festive demand.</p>
            </div>
            <div style={styles.miniCard}>
              <FaMapMarkedAlt style={{ color: "#ef4444", marginBottom: "10px" }} />
              <h4 style={styles.miniTitle}>Address Accuracy</h4>
              <p style={styles.miniText}>Double-check your PIN code. We are not liable for non-delivery due to incorrect address inputs.</p>
            </div>
          </div>

          {/* Contact Support */}
          <div style={styles.footerContact}>
            <div style={styles.contactInner}>
              <FaEnvelope size={20} />
              <span>Questions about your shipment?</span>
              <a href="mailto:support@afsstickering.com" style={styles.mailLink}>
                support@afsstickering.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "4rem 1rem",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "3.5rem",
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    background: "#ffffff",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 0.5rem",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    marginBottom: "1.5rem",
  },
  metaBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#e2e8f0",
    padding: "6px 16px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    color: "#475569",
    fontWeight: "600",
  },
  timelineContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3rem",
    padding: "0 2rem",
    textAlign: "center",
  },
  timelineItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timelineIcon: {
    width: "45px",
    height: "45px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.75rem",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
  },
  timelineTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0",
  },
  timelineSub: {
    fontSize: "0.75rem",
    color: "#94a3b8",
  },
  timelineConnector: {
    flex: 0.5,
    height: "2px",
    background: "#cbd5e1",
    margin: "0 10px",
    marginTop: "-25px",
  },
  contentBody: {
    background: "#ffffff",
    padding: "3rem",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
    border: "1px solid #f1f5f9",
  },
  section: {
    marginBottom: "3rem",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.25rem",
  },
  sectionIcon: {
    fontSize: "1.25rem",
    color: "#4f46e5",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  text: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  check: {
    color: "#10b981",
    marginRight: "10px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  statCard: {
    background: "#f8fafc",
    padding: "1.5rem",
    borderRadius: "16px",
    textAlign: "center",
    border: "1px solid #f1f5f9",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#4f46e5",
    margin: "0 0 0.25rem",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: "600",
    margin: 0,
  },
  dualGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  miniCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
  },
  miniTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    margin: "0 0 0.5rem",
    color: "#1e293b",
  },
  miniText: {
    fontSize: "0.9rem",
    color: "#64748b",
    margin: 0,
    lineHeight: "1.6",
  },
  footerContact: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "2rem",
    textAlign: "center",
  },
  contactInner: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "1rem 2rem",
    background: "#1e293b",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "0.95rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mailLink: {
    color: "#818cf8",
    textDecoration: "none",
    fontWeight: "700",
    borderBottom: "1px solid #818cf8",
  },
};

export default ShippingPolicy;