import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">

      {/* 🔥 MAIN SPINNER */}
      <div className="spinner-wrapper">
        <div className="spinner-ring"></div>
        <div className="spinner-ring inner"></div>
      </div>

      {/* 🔥 TEXT */}
      <p className="loading-text">Loading...</p>

    </div>
  );
};

export default LoadingSpinner;