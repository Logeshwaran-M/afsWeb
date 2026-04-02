import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; // 🔥 ADDED

const Banner = () => {

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 ADDED
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const q = query(
          collection(db, "banners"),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setBanner(snapshot.docs[0].data());
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 🔥 ADDED
      }
    };

    fetchBanner();
  }, []);

  // 🔥 SHOW SPINNER
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: banner
          ? `url(${banner.image})`
          : "none",
        backgroundColor: "#ccc",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        
      }}
    >

      {/* 🔥 CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          zIndex: 2,
          maxWidth: "900px",
          padding: "0 20px"
        }}
      >
    <h1
  style={{
    fontSize: "32px",
    fontWeight: "500",
    marginBottom: "20px",
    letterSpacing: "1.5px",
    color: "#ffffff",
    lineHeight: "1.3",
     textShadow: "0px 2px 8px rgba(0,0,0,0.9)" 
  }}
>
          {banner?.title || "Give your home that finishing touch"}
        </h1>

      <p
  style={{
    fontSize: "18px",
    marginBottom: "30px",
    color: "#e0e0e0",
    letterSpacing: "1px",
     textShadow: "0px 2px 8px rgba(0,0,0,0.9)" 
  }}
>
          Premium Name Plates for Your Dream Home 
        </p>

       <button
  style={{
    padding: "14px 35px",
    border: "none",
    background: "black",
    color: "white",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "0.3s"
  }}
  onClick={() => navigate("/Desk")}
  onMouseOver={(e) => {
    e.target.style.background = "#ffffff";
    e.target.style.color = "#000000";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "#000000";
      e.target.style.color = "#ffffff";
  }}
>
  Browse our collection →
</button>
      </motion.div>

    </div>
  );
};

export default Banner;