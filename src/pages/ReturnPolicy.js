import React from "react";
import { 
  FaUndo, FaClipboardCheck, FaTimesCircle, FaCheckCircle, 
  FaTruckLoading, FaEnvelope, FaFileInvoice, FaInfoCircle 
} from "react-icons/fa";

const ReturnPolicy = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            <FaUndo size={32} color="#4f46e5" />
          </div>
          <h1 style={styles.title}>Return & Refund Policy</h1>
          <p style={styles.subtitle}>
            We value your satisfaction. Here’s how we handle returns and refunds.
          </p>
          <div style={styles.meta}>
            <span style={styles.badge}>
              <FaInfoCircle style={{ marginRight: "6px" }} />
              Last Updated: {new Date().toDateString()}
            </span>
          </div>
        </div>

        {/* Quick Summary / Process Flow */}
        <div style={styles.flowContainer}>
          <div style={styles.flowStep}>
            <div style={styles.stepNum}>1</div>
            <p style={styles.stepText}>Request Return</p>
          </div>
          <div style={styles.flowLine} />
          <div style={styles.flowStep}>
            <div style={styles.stepNum}>2</div>
            <p style={styles.stepText}>Quality Check</p>
          </div>
          <div style={styles.flowLine} />
          <div style={styles.flowStep}>
            <div style={styles.stepNum}>3</div>
            <p style={styles.stepText}>Refund Initiated</p>
          </div>
        </div>

        <div style={styles.mainContent}>
          {/* Section 1 & 2: Overview & Eligibility */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaClipboardCheck style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>1. Return Eligibility</h2>
            </div>
            <p style={styles.text}>
              At <strong>AFS Stickering & Signages</strong>, we strive to provide high-quality products. To be eligible for a return:
            </p>
            <div style={styles.grid}>
              <div style={styles.gridItem}>
                <FaCheckCircle color="#10b981" />
                <span>Return within <strong>7 days</strong> of delivery</span>
              </div>
              <div style={styles.gridItem}>
                <FaCheckCircle color="#10b981" />
                <span>Unused and in original condition</span>
              </div>
              <div style={styles.gridItem}>
                <FaCheckCircle color="#10b981" />
                <span>Original packaging and invoice</span>
              </div>
            </div>
          </section>

          {/* Section 3: Non-Returnable */}
          <section style={{ ...styles.section, background: "#fff1f2", border: "1px solid #fecaca" }}>
            <div style={styles.sectionHeader}>
              <FaTimesCircle style={{ ...styles.sectionIcon, color: "#e11d48" }} />
              <h2 style={{ ...styles.sectionTitle, color: "#9f1239" }}>2. Non-Returnable Items</h2>
            </div>
            <ul style={styles.list}>
              <li>Customized or personalized products (as per your design).</li>
              <li>Used or damaged items not due to our error.</li>
              <li>Products missing original labels or packaging.</li>
            </ul>
          </section>

          {/* Section 4: Refunds */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaFileInvoice style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>3. Refund Process</h2>
            </div>
            <p style={styles.text}>
              Once we receive and inspect your returned item, we will notify you about the status.
            </p>
            <div style={styles.infoBox}>
              <p><strong>Processing Time:</strong> 5-7 business days.</p>
              <p><strong>Payment Method:</strong> Credited back to the original source.</p>
              <p><strong>Note:</strong> Shipping charges are non-refundable.</p>
            </div>
          </section>

          {/* Section 5: Damage */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaTruckLoading style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>4. Damaged or Wrong Products</h2>
            </div>
            <p style={styles.text}>
              If you receive a damaged or incorrect product, please contact us within 
              <strong> 48 hours</strong> of delivery with photo/video proof.
            </p>
          </section>

          {/* Contact Footer */}
          <div style={styles.footer}>
            <div style={styles.contactCard}>
              <FaEnvelope size={24} color="#4f46e5" />
              <h3 style={styles.footerTitle}>Need Assistance?</h3>
              <p>Email our support team for quick resolutions</p>
              <a href="mailto:support@afsstickering.com" style={styles.emailBtn}>
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
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    padding: "3rem 1rem",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  iconBox: {
    width: "70px",
    height: "70px",
    background: "#ffffff",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "1rem",
    letterSpacing: "-0.025em",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    marginBottom: "1.5rem",
  },
  meta: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  badge: {
    background: "#ffffff",
    padding: "6px 16px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    color: "#475569",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  flowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3rem",
    padding: "0 2rem",
  },
  flowStep: {
    textAlign: "center",
    zIndex: 2,
  },
  stepNum: {
    width: "40px",
    height: "40px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: "0 auto 0.5rem",
  },
  stepText: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#475569",
  },
  flowLine: {
    flex: 1,
    height: "2px",
    background: "#cbd5e1",
    margin: "0 10px",
    marginTop: "-25px",
  },
  mainContent: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "2.5rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
  },
  section: {
    marginBottom: "2.5rem",
    padding: "1.5rem",
    borderRadius: "16px",
    background: "#f8fafc",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  sectionIcon: {
    fontSize: "1.5rem",
    color: "#4f46e5",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  text: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.9rem",
    color: "#334155",
    fontWeight: "500",
  },
  list: {
    paddingLeft: "1.2rem",
    color: "#991b1b",
    lineHeight: "1.8",
  },
  infoBox: {
    background: "#ffffff",
    borderLeft: "4px solid #4f46e5",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    marginTop: "1rem",
    fontSize: "0.95rem",
    color: "#1e293b",
  },
  footer: {
    marginTop: "3rem",
    textAlign: "center",
  },
  contactCard: {
    padding: "2rem",
    background: "#eef2ff",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  footerTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0.5rem 0 0",
  },
  emailBtn: {
    color: "#4f46e5",
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "1.1rem",
    marginTop: "0.5rem",
    padding: "10px 20px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
};

export default ReturnPolicy;