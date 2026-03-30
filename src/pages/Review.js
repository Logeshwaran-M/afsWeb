import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  getDoc
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Form, Button, Card, ProgressBar } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";

const Reviews = () => {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  // 🔥 FETCH PRODUCT NAME
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const docRef = doc(db, "products", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setProductName(snap.data().name);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 FETCH REVIEWS
  useEffect(() => {
    const fetchReviews = async () => {
      let q;

      if (id) {
        q = query(collection(db, "reviews"), where("productId", "==", id));
      } else {
        q = collection(db, "reviews");
      }

      const snapshot = await getDocs(q);

      const firebaseReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isOriginal: true
      }));

      // ✅ DUMMY REVIEWS
      const dummyReviews = [
        {
          id: "d1",
          userName: "Rahul",
          rating: 5,
          comment: "Amazing quality! Loved it 🔥",
          productName,
          isOriginal: false
        },
        {
          id: "d2",
          userName: "Priya",
          rating: 4,
          comment: "Very good but delivery was late.",
          productName,
          isOriginal: false
        },
        {
          id: "d3",
          userName: "Arun",
          rating: 5,
          comment: "Best purchase ever 😍",
          productName,
          isOriginal: false
        }
      ];

      const allReviews = [...firebaseReviews, ...dummyReviews];
      setReviews(allReviews);

      // ✅ Check already reviewed
      if (user && id) {
        const already = firebaseReviews.find(
          r => r.userId === user.uid && r.productId === id
        );
        setAlreadyReviewed(!!already);
      }
    };

    fetchReviews();
  }, [id, user, productName]);

  // ⭐ CALCULATIONS
  const totalReviews = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map(star =>
    reviews.filter(r => r.rating === star).length
  );

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  // 🔥 SUBMIT REVIEW
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Login required");
    if (!rating || !comment) return alert("Fill all fields");
    if (alreadyReviewed) return alert("Already reviewed ❌");

    try {
      const userName =
        user.displayName ||
        user.email?.split("@")[0] ||
        "User";

      const docRef = await addDoc(collection(db, "reviews"), {
        productId: id,
        productName,
        userId: user.uid,
        userName,
        rating,
        comment,
        createdAt: Timestamp.now()
      });

      setReviews(prev => [
        {
          id: docRef.id,
          productName,
          userName,
          rating,
          comment,
          isOriginal: true
        },
        ...prev
      ]);

      setAlreadyReviewed(true);
      setComment("");
      setRating(0);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">

      <h3 className="mb-4">Customer Reviews</h3>

      {/* ⭐ ADD REVIEW */}
      {id && (
        <Card className="p-4 mb-4 shadow-sm">
          <h5>Add Review</h5>

          {alreadyReviewed ? (
            <p className="text-danger">You already reviewed this product</p>
          ) : (
            <Form onSubmit={handleSubmit}>

              {/* ⭐ STAR ROW */}
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, i) => {
                  const val = i + 1;
                  return (
                    <FaStar
                      key={i}
                      size={26}
                      className="me-2"
                      color={val <= (hover || rating) ? "#ffc107" : "#ddd"}
                      onClick={() => setRating(val)}
                      onMouseEnter={() => setHover(val)}
                      onMouseLeave={() => setHover(null)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </div>

              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review..."
                className="mb-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button type="submit" variant="dark">
                Submit Review
              </Button>

            </Form>
          )}
        </Card>
      )}

      {/* ⭐ RATING SUMMARY */}
      <Card className="p-4 mb-4 shadow-sm border-0">
        <div className="row align-items-center">

          <div className="col-md-4 text-center">
            <h2>{averageRating} / 5</h2>

            <div className="d-flex justify-content-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={18}
                  color={i < Math.round(averageRating) ? "#ffc107" : "#ddd"}
                />
              ))}
            </div>

            <p className="text-muted">{totalReviews} Reviews</p>
          </div>

          <div className="col-md-8">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = ratingCounts[index];
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={star} className="d-flex align-items-center mb-2">
                  <span style={{ width: "60px" }}>{star} ⭐</span>

                  <ProgressBar
                    now={percentage}
                    style={{ flex: 1, height: "8px", marginRight: "10px" }}
                  />

                  <span>{count}</span>
                </div>
              );
            })}
          </div>

        </div>
      </Card>

      {/* ⭐ REVIEWS LIST */}
      {reviews.map((rev) => (
        <Card
          key={rev.id}
          className="mb-3 p-3 shadow-sm border-0"
          style={{
            borderRadius: "15px",
            transition: "0.3s"
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">

            <div>
              <h6 className="fw-bold mb-0">About - {rev.productName || productName}</h6>
              <small className="text-muted">by {rev.userName}</small>
            </div>

            <div className="d-flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  color={i < rev.rating ? "#ffc107" : "#ddd"}
                  className="me-1"
                />
              ))}
            </div>

          </div>

          <p className="mb-0">{rev.comment}</p>
        </Card>
      ))}

    </div>
  );
};

export default Reviews;