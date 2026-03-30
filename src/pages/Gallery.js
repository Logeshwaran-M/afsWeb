import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

import Masonry from "react-masonry-css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Gallery = () => {

  const [show, setShow] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));

        const galleryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setImages(galleryData);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openModal = (img) => {
    setActiveImg(img);
    setShow(true);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1
  };

  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1 className="main-title">#AFS Stickering & Signages</h1>

        <p className="sub-text">
          A gallery of name plate images shared by happy customers of AFS Stickering & Signages.
          If you'd like your name plate to be featured in our #AFS Stickering & Signages series,
          take a photo and send it to us on Instagram (@_afs stickering & Signages) or on email
          (afs stickering & Signages.com).
        </p>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array(8).fill().map((_, i) => (
            <Skeleton key={i} height={250} style={{ marginBottom: "15px" }} />
          ))}
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((item) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => openModal(item.image)}
            >
              <img
                src={item.image}
                alt="gallery"
                loading="lazy"
              />

              <div className="overlay">
                <span className="view-text">View</span>
              </div>
            </div>
          ))}
        </Masonry>
      )}

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={activeImg} alt="preview" className="w-100" />
        </Modal.Body>
      </Modal>

      <style>{`
        .main-title {
          font-size: 48px;
          font-weight: 700;
        }

        .sub-text {
          max-width: 700px;
          margin: 15px auto 0;
          color: #666;
          font-size: 15px;
          line-height: 1.7;
        }

        .my-masonry-grid {
          display: flex;
          margin-left: -15px;
        }

        .my-masonry-grid_column {
          padding-left: 15px;
        }

        /* 🔥 CARD */
        .gallery-card {
          position: relative;
          margin-bottom: 15px;
          overflow: hidden;
          cursor: pointer;
          border-radius: 12px;
        }

        .gallery-card img {
          width: 100%;
          display: block;
          transition: transform 0.6s ease, filter 0.6s ease;
        }

        /* 🔥 VIDEO STYLE HOVER */
        .gallery-card:hover img {
          transform: scale(1.12);
          filter: brightness(0.7);
        }

        /* 🔥 OVERLAY */
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-card:hover .overlay {
          opacity: 1;
        }

        /* 🔥 TEXT ANIMATION */
        .view-text {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s ease;
        }

        .gallery-card:hover .view-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* 🔥 SKELETON */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        @media (max-width: 768px) {
          .skeleton-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .skeleton-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>

    </Container>
  );
};

export default Gallery;