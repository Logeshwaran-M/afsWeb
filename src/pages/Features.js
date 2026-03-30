import React from 'react';
import { Award, Palette, ShieldCheck } from 'lucide-react';

const Features = () => {
  const data = [
    {
      title: "13+ Years of Mastery",
      desc: "Since 2011, we've crafted over 150,000+ nameplates, mastering the perfect blend of durability and art.",
      icon: "/diamond.avif",
 
    },
    {
      title: "Exclusive Designs",
      desc: "Collaborating with renowned designers to launch collections that don't just look great—they start conversations.",
      icon:  "/shop.avif",
   
    },
    {
      title: "100% Love-It Guarantee",
      desc: "Satisfaction isn't just a goal; it's our standard. If you don't love it, we'll make it right—guaranteed.",
      icon: "/guarantee.avif",
     
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-extrabold text-dark display-6">Why Choose AFS?</h2>
          <div className="mx-auto bg-primary mt-2" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
        </div>

        {/* Card Grid */}
        <div className="row g-4">
          {data.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card h-100 border-0 shadow-sm p-4 text-center hover-card transition-all">
                {/* Icon Container - Perfectly Aligned */}
                <div className={`mx-auto mb-4 d-flex align-items-center justify-content-center rounded-4 ${item.bgColor}`} 
                     style={{ width: '80px', height: '80px' }}>
                <img src= {item.icon}/>
                </div>
                
                <div className="card-body p-0">
                  <h4 className="card-title fw-bold h5 mb-3">{item.title}</h4>
                  <p className="card-text text-muted lh-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hover-card {
          transition: all 0.3s ease-in-out;
          border-bottom: 3px solid transparent !important;
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.08) !important;
          border-bottom: 3px solid #0d6efd !important;
        }
      `}</style>
    </section>
  );
};

export default Features;