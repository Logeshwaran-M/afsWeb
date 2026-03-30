import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge
} from "react-bootstrap";
import { addDoc } from "firebase/firestore";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { FaStar } from "react-icons/fa";
import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Modal } from "react-bootstrap";

const ProductDetails = () => {

  const defaultReviews = [
    {
      id: "1",
      userName: "Rahul",
      rating: 5,
      comment: "Amazing quality! Loved the design 😍"
    },
    {
      id: "2",
      userName: "Priya",
      rating: 4,
      comment: "Very nice product, looks premium."
    },
    {
      id: "3",
      userName: "Arjun",
      rating: 5,
      comment: "Perfect gift! Highly recommended 👍"
    }
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState(defaultReviews);
  const [mainImage, setMainImage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [designation, setDesignation] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const previewRef = useRef(null);
  const [hover, setHover] = useState(0);
  const isCustomizing = customerName || designation;
  const [errors, setErrors] = useState({
    customerName: false,
    designation: false,
  });
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const [imageHeadings, setImageHeadings] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const carouselRef = useRef(null);



  // FETCH PRODUCT + RELATED + IMAGE HEADINGS
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          // ✅ ADD HERE ONLY (CORRECT PLACE)
          if (productData.sizes) {
            setSizes(productData.sizes);
            setSelectedSize(0); // 🔥 default select first size
          }

          // Set image headings from product data
          if (productData.imageHeadings && Array.isArray(productData.imageHeadings)) {
            setImageHeadings(productData.imageHeadings);
          }

          // set main image
          if (productData.images?.length > 0) {
            setMainImage(productData.images[0]);
            setSelectedImageIndex(0);
          }

          // related products
          const q = query(
            collection(db, "products"),
            where("category", "==", productData.category)
          );

          const snapshot = await getDocs(q);

          const related = snapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .filter(item => item.id !== id);

          setRelatedProducts(related);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  // FETCH REVIEWS
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("productId", "==", id)
      );

      const snapshot = await getDocs(q);

      const firebaseReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // ✅ combine default + firebase
      setReviews([...defaultReviews, ...firebaseReviews]);
    };

    fetchReviews();
  }, [id]);

  // Update main image when customizing
  useEffect(() => {
    if (!product) return;

    if (customerName || designation) {
      // 🔥 Switch to 2nd image (custom view)
      setMainImage(product.images[2] || product.images[0]);
    } else {
      // 🔥 Back to original
      setMainImage(product.images[0]);
    }
  }, [customerName, designation, product]);

  const handlePreview = async () => {
    if (!previewRef.current) return;

    try {
      setShowPreviewModal(true);
    } catch (err) {
      console.error("Preview error:", err);
      toast.error("Cannot generate preview. Image may be blocked by CORS.");
    }
  };

  const handleAddToCart = async () => {
    // RESET ERRORS
    setErrors({ customerName: false, designation: false });

    let hasError = false;

    if (!customerName.trim()) {
      setErrors(prev => ({ ...prev, customerName: true }));
      hasError = true;
    }

    if (!designation.trim()) {
      setErrors(prev => ({ ...prev, designation: true }));
      hasError = true;
    }

    if (hasError) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        logging: true,
      });

      const image = canvas.toDataURL("image/png");

      const selectedSizeData = sizes[selectedSize];

      const cartItem = {
        id: product.id,
        name: product.name,
        price: (product.price || 0) + (selectedSizeData?.price || 0),
        basePrice: product.price,
        size: selectedSizeData?.label,
        dimensions: selectedSizeData?.dimensions,
        categoryId: selectedSizeData?.categoryId,
        categoryName: selectedSizeData?.categoryName,
        customName: customerName,
        designation: designation,
        image: mainImage || product?.images?.[0],
        quantity: 1
      };

      addToCart(cartItem);
      toast.success('Added to cart ✅');
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Cannot add to cart. Preview image failed.");
    }
  };

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.comment) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const reviewData = {
        productId: id,
        userName: newReview.name,
        productName: product?.name,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      setReviews((prev) => [
        { id: docRef.id, ...reviewData },
        ...prev
      ]);

      setNewReview({
        name: "",
        rating: 5,
        comment: ""
      });

      toast.success("Review added successfully ✅");

    } catch (error) {
      console.error(error);
      toast.error("Failed to add review ❌");
    }
  };

  // Handle image heading click
  const handleImageHeadingClick = (index) => {
    setSelectedImageIndex(index);
    if (product?.images?.[index]) {
      setMainImage(product.images[index]);
    }
  };

  const selectedSizeData = sizes[selectedSize];
  const total =
    Number(product?.price || 0) +
    Number(selectedSizeData?.price || 0);

  return (
    <Container className="py-5">
      <Row className="g-5">

        {/* LEFT IMAGE */}
        <Col md={7}>
          <div className="image-preview-wrapper" ref={previewRef}>
            <div className="image-preview-wrapper" ref={previewRef}>
              {/* 👉 Show ORIGINAL image (no text) */}
              {!isCustomizing && (
                <img
                  src={mainImage || product?.images?.[0]}
                  className="img-fluid"
                  alt="original"
                />
              )}

              {/* 👉 Show CUSTOM image (with text) */}
              {isCustomizing && (
                <div style={{ position: "relative" }}>
                  <img
                    src={mainImage || product?.images?.[2] || product?.images?.[0]}
                    className="img-fluid"
                    alt="custom"
                  />

                  {/* 🔥 TEXT ONLY HERE */}
                  <div
                    style={{
                      position: "absolute",
                      top: product?.textPositions?.fields?.[0]?.top || "50%",
                      left: product?.textPositions?.fields?.[0]?.left || "50%",
                      transform: "translate(-50%, -90%) skewX(-10deg) ",
                      color: "gold",
                      textAlign: "center"
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      {customerName || "Your Name"}
                    </h4>
                    <p style={{ margin: 0 }}>
                      {designation || "Your Designation"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Headings Section */}
          {imageHeadings.length > 0 && (
            <Row className="mt-3 mb-3">
              <Col>
                <h6 className="mb-2">Select Design:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {imageHeadings.map((heading, idx) => (
                    heading && heading.trim() !== "" && (
                      <Button
                        key={idx}
                        variant={selectedImageIndex === idx ? "dark" : "outline-dark"}
                        size="sm"
                        onClick={() => handleImageHeadingClick(idx)}
                        className="mb-2"
                      >
                        {heading}
                      </Button>
                    )
                  ))}
                </div>
              </Col>
            </Row>
          )}

          {/* Thumbnail Images */}
          <Row className="g-2">
            {product?.images?.map((img, i) => (
              <Col xs={3} key={i}>
                <img
                  src={img}
                  className="img-fluid thumb-img"
                  onClick={() => {
                    setMainImage(img);
                    setSelectedImageIndex(i);
                  }}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </Col>
            ))}
            <Row>
              <Col>
                <img
                  src="https://housenama.com/cdn/shop/files/excelus-office-desk-name-plate-indian-army-housenama-3.jpg?v=1736848274&width=1100"
                  className="img-fluid thumb-img"
                  alt=""
                  style={{ cursor: "pointer", width: "300px" }}
                />
              </Col>
            </Row>
          </Row>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={5}>
          <Badge bg="dark" className="mb-2">Trending</Badge>

          <h2 className="fw-bold">{product?.name}</h2>

          {/* ⭐ Rating (simple) */}
          <div className="text-warning mb-2">
            {"★".repeat(5)}
            <span className="text-muted ms-2">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="d-flex align-items-center gap-3">
            <h3 className="fw-bold">
              ₹{total}
            </h3>
            <Badge bg="success">35% OFF</Badge>
          </div>

          <hr />

          <h6 className="mb-2">Size</h6>

          <div className="d-flex flex-column gap-2 mb-3">
            {sizes.length > 0 ? (
              sizes.map((s, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "30px",
                    border: selectedSize === index ? "2px solid black" : "1px solid #ccc",
                    background: selectedSize === index ? "black" : "white",
                    color: selectedSize === index ? "white" : "black",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "0.3s"
                  }}
                >
                  {s.label} i.e. {s.dimensions}
                </div>
              ))
            ) : (
              <p>No sizes available</p>
            )}
          </div>
          <hr />

          <h6>Customize Your Name Plate</h6>

          <hr />

          {/* NAME FIELD */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
              placeholder="Enter Name"
              maxLength={50}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {errors.customerName && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>

          {/* DESIGNATION FIELD */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Designation</label>
            <input
              type="text"
              className={`form-control ${errors.designation ? "is-invalid" : ""}`}
              placeholder="Enter Designation"
              maxLength={50}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            {errors.designation && (
              <div className="invalid-feedback">Designation is required</div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <Button variant="dark" onClick={handlePreview}>
              👁 Preview Design
            </Button>
            <Button variant="dark" size="lg" onClick={handleAddToCart}>
              <FaShoppingCart className="me-2" />
              Add to Cart
            </Button>

            <Button
              variant="outline-dark"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              <span className="ms-2">Wishlist</span>
            </Button>
          </div>

          <div className="mt-4">
            <p>{product?.description}</p>
          </div>

        </Col>
      </Row>

      {/* 🔥 RELATED PRODUCTS */}
      <Row className="mt-5">
        <h4>You May Also Like</h4>
        {relatedProducts.slice(0, 4).map((p) => (
          <Col key={p.id} xs={6} md={4} lg={3} className="mb-4">
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>

      {/* Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Design</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={mainImage || product?.images?.[0]}
              alt="Preview"
              className="img-fluid"
            />
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '20px'
              }}
            >
              {customerName || "Your Name"}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'gray',
                fontSize: '16px'
              }}
            >
              {designation || "Your Designation"}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreviewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col md={8}>
          <h4 className="mb-3">Customer Reviews</h4>

          {/* ADD REVIEW FORM */}
          <Card className="review-card p-4 mb-4">
            <h5 className="fw-bold mb-3">Write a Review</h5>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control custom-input"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />
            </div>

            {/* STAR RATING */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Rating</label>

              <div style={{ display: "flex", gap: "8px", fontSize: "28px", cursor: "pointer" }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hover || newReview.rating);

                  return (
                    <FaStar
                      key={star}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      style={{
                        color: isActive ? "#ffc107" : "#ddd",
                        transition: "0.2s",
                        transform: isActive ? "scale(1.1)" : "scale(1)"
                      }}
                    />
                  );
                })}
              </div>

              <small style={{ color: "#666" }}>
                {newReview.rating} / 5
              </small>
            </div>

            {/* COMMENT */}
            <div className="mb-3">
              <label className="form-label">Your Review</label>
              <textarea
                placeholder="Share your experience..."
                className="form-control custom-input"
                rows={3}
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
            </div>

            {/* BUTTON */}
            <Button className="submit-btn btn-dark w-100" onClick={handleAddReview}>
              Submit Review
            </Button>
          </Card>

          {/* REVIEWS LIST */}
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.slice(0, 5).map((rev) => (
              <Card
                key={rev.id}
                className="mb-3 p-3 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <strong style={{ fontSize: "15px" }}>{rev.userName}</strong>
                  <div style={{ fontSize: "13px", color: "#888" }}>
                    {rev.productName || product?.name}
                  </div>
                  <div className="text-warning" style={{ fontSize: "14px" }}>
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>
                </div>

                <p className="mb-0 text-muted mt-2" style={{ fontSize: "14px" }}>
                  {rev.comment}
                </p>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;