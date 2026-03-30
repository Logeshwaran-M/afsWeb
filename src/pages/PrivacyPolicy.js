import React, { useState, useEffect } from "react";
import { 
  FaShieldAlt, FaLock, FaUserSecret, FaDatabase, 
  FaCookieBite, FaHandPaper, FaEnvelope, FaPrint, FaClock 
} from 'react-icons/fa';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  // Update active section on scroll for the sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => window.print();

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left Sidebar Navigation - Hidden on Mobile */}
        <aside style={styles.sidebar}>
          <div style={styles.stickyNav}>
            <h3 style={styles.navTitle}>Contents</h3>
            <ul style={styles.navList}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    style={{
                      ...styles.navLink,
                      color: activeSection === item.id ? "#4f46e5" : "#64748b",
                      fontWeight: activeSection === item.id ? "700" : "400",
                      borderLeft: activeSection === item.id ? "3px solid #4f46e5" : "3px solid transparent"
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={handlePrint} style={styles.printBtn}>
              <FaPrint /> Print Policy
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={styles.content}>
          <div style={styles.header}>
            <div style={styles.iconCircle}>
              <FaShieldAlt size={30} color="#4f46e5" />
            </div>
            <h1 style={styles.title}>Privacy Policy</h1>
            <div style={styles.meta}>
              <span style={styles.badge}><FaClock style={{marginRight: '5px'}}/> Last Updated: {new Date().toDateString()}</span>
              <span style={styles.badge}><FaLock style={{marginRight: '5px'}}/> Secure Document</span>
            </div>
          </div>

          <p style={styles.intro}>
            At <strong>AFS Stickering & Signages</strong>, we value your trust. This policy outlines our commitment to being transparent about the data we collect and how we protect your personal information.
          </p>

          <section id="intro" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaHandPaper style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>1. Introduction</h2>
            </div>
            <p>Welcome to AFS Stickering & Signages. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
          </section>

          <section id="collection" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaUserSecret style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
            </div>
            <div style={styles.gridList}>
              <div style={styles.listItem}><span style={styles.bullet}>•</span> Personal details (Name, Email, Phone Number)</div>
              <div style={styles.listItem}><span style={styles.bullet}>•</span> Shipping & Billing Address</div>
              <div style={styles.listItem}><span style={styles.bullet}>•</span> Order and transaction details</div>
              <div style={styles.listItem}><span style={styles.bullet}>•</span> Usage data (browser, device, IP address)</div>
            </div>
          </section>

          <section id="usage" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaDatabase style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
            </div>
            <p>We process your data to provide a seamless experience:</p>
            <ul style={styles.ul}>
              <li>To process and deliver your orders accurately.</li>
              <li>To improve our products and website performance.</li>
              <li>To communicate important updates and marketing offers.</li>
              <li>To ensure website security and fraud prevention.</li>
            </ul>
          </section>

          <section id="sharing" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaLock style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>4. Sharing of Information</h2>
            </div>
            <p>We do not sell your personal data. We only share information with trusted partners:</p>
            <div style={styles.infoBox}>
              <strong>Note:</strong> We share data with Payment Gateways (for transactions) and Shipping Partners (for delivery) to fulfill our contractual obligations to you.
            </div>
          </section>

          <section id="cookies" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaCookieBite style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>5. Cookies & Tracking</h2>
            </div>
            <p>Our website uses cookies to enhance user experience, analyze traffic, and personalize content. You can manage cookie preferences in your browser settings.</p>
          </section>

          <section id="contact" style={styles.section}>
            <div style={styles.sectionHeader}>
              <FaEnvelope style={styles.sectionIcon} />
              <h2 style={styles.sectionTitle}>6. Contact Us</h2>
            </div>
            <div style={styles.contactCard}>
              <p>For any privacy-related inquiries, please reach out to our compliance team:</p>
              <h3 style={styles.emailText}>support@afsstickering.com</h3>
              <p style={{fontSize: '0.85rem', color: '#94a3b8'}}>We typically respond within 24-48 business hours.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const navItems = [
  { id: "intro", label: "1. Introduction" },
  { id: "collection", label: "2. Data Collection" },
  { id: "usage", label: "3. Usage Policy" },
  { id: "sharing", label: "4. Data Sharing" },
  { id: "cookies", label: "5. Cookies" },
  { id: "contact", label: "6. Contact Us" },
];

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    padding: "3rem 1rem",
    fontFamily: "'Inter', sans-serif",
    color: "#334155",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    gap: "3rem",
  },
  sidebar: {
    width: "250px",
    display: "none", // Responsive: hidden on mobile by default
    "@media (min-width: 1024px)": {
      display: "block",
    },
  },
  stickyNav: {
    position: "sticky",
    top: "2rem",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    padding: "1.5rem",
    borderRadius: "16px",
    border: "1px solid #ffffff",
  },
  navTitle: {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#94a3b8",
    marginBottom: "1rem",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navLink: {
    display: "block",
    padding: "0.5rem 0 0.5rem 1rem",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
  },
  content: {
    flex: 1,
    background: "#ffffff",
    padding: "3rem",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
    lineHeight: "1.8",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "2rem",
  },
  iconCircle: {
    width: "70px",
    height: "70px",
    background: "#eef2ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: "-1px",
    margin: 0,
  },
  meta: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  badge: {
    fontSize: "0.8rem",
    background: "#f1f5f9",
    color: "#64748b",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  intro: {
    fontSize: "1.1rem",
    color: "#475569",
    textAlign: "center",
    marginBottom: "3rem",
  },
  section: {
    marginBottom: "3.5rem",
    scrollMarginTop: "2rem",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.2rem",
  },
  sectionIcon: {
    color: "#4f46e5",
    fontSize: "1.4rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  gridList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  listItem: {
    background: "#f8fafc",
    padding: "1rem",
    borderRadius: "12px",
    fontSize: "0.95rem",
    border: "1px solid #f1f5f9",
  },
  bullet: {
    color: "#4f46e5",
    fontWeight: "bold",
    marginRight: "8px",
  },
  ul: {
    paddingLeft: "1.5rem",
    color: "#475569",
  },
  infoBox: {
    background: "linear-gradient(to right, #4f46e5 0%, #7c3aed 100%)",
    color: "#ffffff",
    padding: "1.5rem",
    borderRadius: "16px",
    fontSize: "0.95rem",
    marginTop: "1rem",
  },
  contactCard: {
    background: "#f1f5f9",
    padding: "2rem",
    borderRadius: "20px",
    textAlign: "center",
    marginTop: "1.5rem",
  },
  emailText: {
    color: "#4f46e5",
    fontSize: "1.4rem",
    fontWeight: "800",
    margin: "0.5rem 0",
  },
  printBtn: {
    marginTop: "1.5rem",
    width: "100%",
    padding: "0.8rem",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "opacity 0.2s",
  },
};

export default PrivacyPolicy;