import React from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <h4>{review.name}</h4>
          <p>{review.product}</p>
        </div>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < review.rating ? '#ffc107' : '#e4e5e9'} />
          ))}
        </div>
      </div>
      <p className="review-text">"{review.text}"</p>
    </div>
  );
};

export default ReviewCard;