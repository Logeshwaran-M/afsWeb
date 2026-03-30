import React from 'react';
import Slider from "react-slick";
import { Container, Row, Col } from 'react-bootstrap';

// Import slick-carousel css
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ReviewSlider = () => {
  // Mock Data for 10 reviews
  const reviews = [
  {
    id: 1,
    userName: "Siva",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "5 Stars - Very good",
    imgUrl: "https://via.placeholder.com/150?text=Product+1"
  },
  {
    id: 2,
    userName: "Isha",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Excellent quality and finish!",
    imgUrl: "https://via.placeholder.com/150?text=Product+2"
  },
  {
    id: 3,
    userName: "Arun Kumar",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "The gold lettering looks premium.",
    imgUrl: "https://via.placeholder.com/150?text=Product+3"
  },
  {
    id: 4,
    userName: "Priya M.",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Perfect for my new home door.",
    imgUrl: "https://via.placeholder.com/150?text=Product+4"
  },
  {
    id: 5,
    userName: "Rahul Singh",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Fast delivery and great packaging.",
    imgUrl: "https://via.placeholder.com/150?text=Product+5"
  },
  {
    id: 6,
    userName: "Meera",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "5 Stars - Highly recommended!",
    imgUrl: "https://via.placeholder.com/150?text=Product+6"
  },
  {
    id: 7,
    userName: "Deepak",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "The marble effect is very realistic.",
    imgUrl: "https://via.placeholder.com/150?text=Product+7"
  },
  {
    id: 8,
    userName: "Anjali",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Beautiful design, easy to install.",
    imgUrl: "https://via.placeholder.com/150?text=Product+8"
  },
  {
    id: 9,
    userName: "Vikram",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Exactly what I was looking for.",
    imgUrl: "https://via.placeholder.com/150?text=Product+9"
  },
  {
    id: 10,
    userName: "Suresh",
    stars: "★★★★★",
    ratingText: "5 Stars",
    comment: "Great value for the price.",
    imgUrl: "https://via.placeholder.com/150?text=Product+10"
  }
];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Container className="py-5 bg-white text-center">
      {/* Header Section */}
      <div className="mb-5">
        <h2 className="fw-normal mb-1">Real Customers. Real Reviews.</h2>
        <div className="text-warning fs-4">★★★★★</div>
        <p className="text-muted small">
          from 5612 reviews 
          <span className="ms-1 text-success">✔</span>
        </p>
      </div>

      {/* Slider Section */}
      <Slider {...settings} className="review-slider">
        {reviews.map((rev, index) => (
          <div key={index} className="px-3">
            <div className="d-flex flex-column align-items-center">
              <div className="text-warning mb-1 fs-5">{rev.stars}</div>
              <div className="fw-bold small">{rev.ratingText}</div>
              <div className="text-muted small mb-4">{rev.comment}</div>
              
              <div className="mt-auto">
                <p className="small text-secondary mb-2">{rev.userName}</p>
                {/* <img 
                  src={rev.image} 
                  alt="Review" 
                  className="rounded shadow-sm"
                  style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                /> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .review-slider .slick-track {
          display: flex !important;
          align-items: center;
        }
        .slick-prev:before, .slick-next:before {
          color: #ddd !important;
          font-size: 30px;
        }
        .slick-prev { left: -40px; }
        .slick-next { right: -40px; }
      `}</style>
    </Container>
  );
};

export default ReviewSlider;