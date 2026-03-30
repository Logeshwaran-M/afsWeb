import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // npm install framer-motion
import { pageContent } from './contentConfig';

const DynamicHeader = () => {
  const location = useLocation();
  
const { type } = useParams();

const content = pageContent[type] || {
  title: "All Name Plates",
  subtitle: "Explore",
  description: "Browse all products"
};
  // Fallback to default content if route isn't found
 

  return (
    <section className="py-5 bg-light mb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Title with Slide-up animation */}
            <motion.h1 
              key={`${location.pathname}-title`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="display-5 fw-bold mb-3"
              style={{ letterSpacing: '-1px' }}
            >
              {content.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.h4 
              key={`${location.pathname}-subtitle`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted mb-4 fw-normal"
            >
              {content.subtitle}
            </motion.h4>

            {/* Description with a thin left border for "premium" look */}
            <motion.p 
              key={`${location.pathname}-desc`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="lead fs-6 text-secondary ps-3 border-start border-dark border-3"
              style={{ lineHeight: '1.8' }}
            >
              {content.description}
            </motion.p>
          </div>
        </div>

        {/* Dynamic Filter Bar */}
        <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
          <div className="d-flex gap-4">
            <span className="fw-bold small text-uppercase">Filter:</span>
            {['Price', 'Shape', 'Material'].map(filter => (
              <div key={filter} className="dropdown-toggle-split cursor-pointer small text-muted">
                {filter} <i className="bi bi-chevron-down ms-1"></i>
              </div>
            ))}
          </div>
          <div className="small text-muted">
            Sort by: <span className="text-dark fw-bold">Best selling</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHeader;