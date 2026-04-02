
import React from 'react';
// Note: Replace these import paths with your actual asset paths.
// import deskImage from './assets/images/desk_name_plate.png';
// import modernImage from './assets/images/modern_circle_name_plate.png';
// import metalImage from './assets/images/metal_floating_name_plate.png';

const collections = [
  {
    title: "Signature Desk Collections",
    desc: "Make your mark in the office with curated wood and stone pieces.",
    // image: deskImage, 
    label: "View Executive Range",
    link: "/Desk",
    image:"https://housenama.com/cdn/shop/products/komoda-modern-brass-door-numbers-and-letters-housenama-1.jpg?v=1736847907&width=823"
  },
  {
    title: "Contemporary Entrances",
    desc: "Bold geometric shapes and premium finishes for the modern home.",
    // image: modernImage,
    label: "Explore Modern Designs",
    link: "/House",
    image:"https://housenama.com/cdn/shop/products/warli-stainless-steel-name-plate-housenama-1.jpg?v=1736847598&width=823"
  },
  {
    title: "Minimalist Metal Works",
    desc: "Floating script designs, precision-cut for a sleek, industrial look.",
    // image: metalImage,
    label: "Discover Floating Metal",
    link: "/House",
    image:"https://housenama.com/cdn/shop/products/gulshan-steel-name-plate-housenama-1.jpg?v=1736847996&width=823"
  }
];

const NameplateCollections = () => {
  return (
    <section className="py-5 bg-stone-50">
      <div className="container py-lg-5">
        
        {/* Modern Header Design */}
        <div className="row mb-5 justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="display-6 fw-extrabold text-stone-900 mb-2">
              Curated Nameplate Collections
            </h2>
            <p className="lead text-stone-600">
              Hand-picked designs tailored to every style and surface.
            </p>
          </div>
        </div>

        {/* Collection Cards */}
        <div className="row g-4 g-lg-5">
          {collections.map((item, index) => (
            <div className="col-lg-4" key={index}>
              <a href={item.link} className="card h-100 border-0 shadow-sm rounded-4 text-decoration-none group-card">
                
                {/* Visual Container */}
                <div className="position-relative overflow-hidden rounded-top-4" style={{ height: '380px' }}>
                  {/* Image with Zoom-on-Hover Effect */}
                  <img 
                    src={item.image /* item.image would go here */} 
                    alt={item.title} 
                    className="w-100 h-100 object-fit-cover group-image"
                    // Placeholder for when you replace the images:
                    style={{ backgroundColor: index === 1 ? '#d6d3d1' : (index === 2 ? '#b69a71' : '#f5f5f4')}}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="position-absolute bottom-0 start-0 w-100 h-50 bg-gradient-overlay"></div>
                </div>

                {/* Content Container */}
                <div className="card-body p-4 pt-4 d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="h4 fw-bold text-stone-900 mb-2 serif-title">
                      {item.title}
                    </h3>
                    <p className="card-text text-stone-600 mb-4 lh-lg">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Refined Link */}
                  <div className="text-stone-950 fw-semibold d-flex align-items-center group-link">
                    {item.label}
                    <span className="ms-2 transition-all link-arrow">→</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Custom Styles for a Premium Look */
        
        /* Serif font for titles - use a high-quality free font */
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&display=swap');
        
        .serif-title {
          font-family: 'Crimson Pro', serif;
        }

        .transition-all {
          transition: all 0.3s ease-in-out;
        }

        /* Hover Zoom Effect */
        .group-card:hover .group-image {
          transform: scale(1.08);
        }

        .group-image {
          transition: transform 0.5s ease;
        }

        /* Link arrow movement on hover */
        .group-card:hover .link-arrow {
          transform: translateX(6px);
        }

        /* Gradient overlay for better image-to-text separation */
        .bg-gradient-overlay {
          background: linear-gradient(180deg, rgba(28, 25, 23, 0) 0%, rgba(28, 25, 23, 0.4) 100%);
        }

        /* Base colors based on the image's palette */
        .text-stone-600 { color: #57534e; }
        .text-stone-900 { color: #1c1917; }
        .text-stone-950 { color: #0c0a09; }
        .bg-stone-50 { background-color: #f7f7f7; }

      `}</style>
    </section>
  );
};

export default NameplateCollections;