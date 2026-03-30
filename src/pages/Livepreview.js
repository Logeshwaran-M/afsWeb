import React, { useState, useEffect } from 'react';

const LivePreview = () => {
  const [surname, setSurname] = useState('');
  const [names, setNames] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(true);

  const targetSurname = "Agrawals";
  const targetNames = "Sachin &";

  useEffect(() => {
    if (!isAutoTyping) return;

    const runTypingAnimation = () => {
      // Reset fields before starting
      setNames('');
      setSurname('');

      let nameIndex = 0;
      let surnameIndex = 0;

      // 1. Type the Names
      const nameTimer = setInterval(() => {
        setNames(targetNames.slice(0, nameIndex + 1));
        nameIndex++;
        
        if (nameIndex >= targetNames.length) {
          clearInterval(nameTimer);
          
          // 2. Short pause then type Surname
          setTimeout(() => {
            const surnameTimer = setInterval(() => {
              setSurname(targetSurname.slice(0, surnameIndex + 1));
              surnameIndex++;
              if (surnameIndex >= targetSurname.length) clearInterval(surnameTimer);
            }, 100);
          }, 200);
        }
      }, 100);
    };

    // Initial run
    runTypingAnimation();

    // Loop every 5 seconds
    const loopInterval = setInterval(runTypingAnimation, 5000);

    return () => {
      clearInterval(loopInterval);
    };
  }, [isAutoTyping]);

  // Stop auto-typing if the user interacts with the inputs
  const handleUserChange = (setter, value) => {
    setIsAutoTyping(false);
    setter(value);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container shadow-lg rounded-5 overflow-hidden border-0 bg-white">
        <div className="row g-0">
          
          {/* Left Side: Preview */}
          <div className="col-lg-7 position-relative d-flex align-items-center justify-content-center p-5 overflow-hidden" 
               style={{ minHeight: '450px', background: '#222' }}>
            
            <div className="nameplate-card shadow-2xl d-flex flex-column align-items-center justify-content-center p-4 text-center">
              <div className="border-bottom border-dark border-2 mb-2 px-3">
                <p className={`mb-0 text-uppercase small fw-bold text-dark ${isAutoTyping ? 'typing-cursor' : ''}`} 
                   style={{ fontSize: '0.75rem', letterSpacing: '3px', minHeight: '1.2rem' }}>
                  {names}
                </p>
              </div>
              <h2 className="display-4 fw-normal mb-0" 
                  style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a', minHeight: '4.5rem' }}>
                {surname}
              </h2>
              <div className="mt-3 opacity-75">
                <svg width="200" height="30" viewBox="0 0 200 30" fill="black">
                   <circle cx="20" cy="15" r="3" /> <circle cx="180" cy="15" r="3" />
                   <path d="M40 15 L160 15" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side: Inputs */}
          <div className="col-lg-5 p-5 bg-white">
            <div className="mb-4">
              <h2 className="fw-bold">Live Preview</h2>
              <span className={`badge ${isAutoTyping ? 'bg-primary' : 'bg-secondary'} mb-2`}>
                {isAutoTyping ? 'Auto-Demo Mode' : 'Customizing'}
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Names</label>
              <input 
                type="text" 
                className="form-control form-control-lg bg-light border-0" 
                value={names}
                onChange={(e) => handleUserChange(setNames, e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Surname</label>
              <input 
                type="text" 
                className="form-control form-control-lg bg-light border-0" 
                value={surname}
                onChange={(e) => handleUserChange(setSurname, e.target.value)}
              />
            </div>


          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
        .nameplate-card {
          background: #e0e0e0;
          background-image: linear-gradient(145deg, #ffffff, #c2c2c2);
          width: 85%;
          max-width: 450px;
          border-radius: 4px;
          border: 1px solid #999;
          box-shadow: 10px 10px 20px #111;
        }
        .typing-cursor::after {
          content: '|';
          animation: blink 0.8s infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
};

export default LivePreview;