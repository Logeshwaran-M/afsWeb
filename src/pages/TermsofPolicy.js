import React from "react";
import { 
  FaGavel, FaUserCheck, FaTags, FaCreditCard, 
  FaShippingFast, FaUndoAlt, FaCopyright, FaUserShield, 
  FaEdit, FaEnvelope, FaInfoCircle 
} from "react-icons/fa";

const TermsofPolicy = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.iconCircle}>
            <FaGavel size={30} color="#4f46e5" />
          </div>
          <h1 style={styles.title}>Terms & Conditions</h1>
          <p style={styles.subtitle}>
            Please read these terms carefully before using our platform.
          </p>
          <div style={styles.metaBadge}>
            <FaInfoCircle style={{ marginRight: "6px" }} />
            Last Updated: {new Date().toDateString()}
          </div>
        </header>

        <div style={styles.mainContent}>
          {/* Section 1: Agreement */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaUserCheck style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
            </div>
            <p style={styles.text}>
              Welcome to <strong>AFS Stickering & Signages</strong>. By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use immediately.
            </p>
          </section>

          {/* Section 2: Pricing */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaTags style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>2. Pricing & Payments</h2>
            </div>
            <div style={styles.highlightBox}>
              <div style={styles.highlightItem}>
                <FaCreditCard color="#4f46e5" />
                <span>All prices are in <strong>INR (₹)</strong></span>
              </div>
              <div style={styles.highlightItem}>
                <FaEdit color="#4f46e5" />
                <span>Prices subject to change without notice</span>
              </div>
            </div>
            <p style={styles.text}>
              Full payment must be cleared via our secure payment gateways before any order processing or customization begins.
            </p>
          </section>

          {/* Section 3: Intellectual Property */}
          <section style={{ ...styles.section, background: "#f1f5f9", border: "1px dashed #cbd5e1" }}>
            <div style={styles.sectionHeader}>
              <FaCopyright style={{ ...styles.sectionIcon, color: "#1e293b" }} />
              <h2 style={styles.sectionTitle}>3. Intellectual Property</h2>
            </div>
            <p style={styles.text}>
              The "AFS Stickering & Signages" name, logo, website designs, product images, and content are the exclusive property of the company. Unauthorized reproduction, modification, or distribution is strictly prohibited.
            </p>
          </section>

          {/* Grid Layout for Minor Sections */}
          <div style={styles.grid}>
            <div style={styles.gridCard}>
              <FaShippingFast style={styles.cardIcon} />
              <h3 style={styles.cardTitle}>Shipping</h3>
              <p style={styles.cardText}>Delivery timelines are estimates. We are not liable for 3rd party logistics delays.</p>
            </div>
            <div style={styles.gridCard}>
              <FaUndoAlt style={styles.cardIcon} />
              <h3 style={styles.cardTitle}>Returns</h3>
              <p style={styles.cardText}>Customized products are non-returnable. Refer to our Refund Policy for details.</p>
            </div>
          </div>

          {/* Section 4: Liability - FIXED ICON HERE */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaUserShield style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>4. Limitation of Liability</h2>
            </div>
            <p style={styles.text}>
              AFS Stickering & Signages shall not be held responsible for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or website services.
            </p>
          </section>

          {/* Footer Contact */}
          <div style={styles.footer}>
            <div style={styles.contactContainer}>
              <FaEnvelope size={20} />
              <span>Questions about these Terms?</span>
              <a href="mailto:support@afsstickering.com" style={styles.emailLink}>
                support@afsstickering.com
              </a>
            </div>
            <p style={styles.disclaimer}>
              By continuing to use this site, you acknowledge you have read and understood these terms.
            </p>
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
    marginBottom: "4rem",
  },
  iconCircle: {
    width: "65px",
    height: "65px",
    background: "#ffffff",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "900",
    color: "#0f172a",
    margin: "0 0 0.5rem",
    letterSpacing: "-0.03em",
  },
  subtitle: {
    fontSize: "1.15rem",
    color: "#64748b",
    marginBottom: "1.5rem",
  },
  metaBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#ffffff",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "0.85rem",
    color: "#475569",
    fontWeight: "600",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  mainContent: {
    background: "#ffffff",
    padding: "3.5rem",
    borderRadius: "32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.04)",
    border: "1px solid #f1f5f9",
  },
  section: {
    marginBottom: "3rem",
    paddingBottom: "1rem",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    marginBottom: "1.25rem",
  },
  sectionIcon: {
    fontSize: "1.3rem",
    color: "#4f46e5",
  },
  sectionTitle: {
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  text: {
    color: "#475569",
    lineHeight: "1.8",
    fontSize: "1.05rem",
  },
  highlightBox: {
    display: "flex",
    gap: "1.5rem",
    margin: "1.5rem 0",
    flexWrap: "wrap",
  },
  highlightItem: {
    background: "#f8fafc",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.95rem",
    color: "#1e293b",
    fontWeight: "500",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    margin: "3rem 0",
  },
  gridCard: {
    padding: "2rem",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    textAlign: "center",
  },
  cardIcon: {
    fontSize: "1.5rem",
    color: "#4f46e5",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "0.5rem",
  },
  cardText: {
    fontSize: "0.9rem",
    color: "#64748b",
    lineHeight: "1.6",
    margin: 0,
  },
  footer: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "2.5rem",
    marginTop: "2rem",
    textAlign: "center",
  },
  contactContainer: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "1rem 2.5rem",
    background: "#4f46e5",
    borderRadius: "16px",
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: "1.5rem",
    boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)",
  },
  emailLink: {
    color: "#ffffff",
    textDecoration: "underline",
    fontWeight: "800",
  },
  disclaimer: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    fontStyle: "italic",
  }
};

export default TermsofPolicy;