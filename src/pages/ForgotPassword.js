import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaArrowLeft,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import {useFirebase} from '../context/FirebaseContext'
import toast from 'react-hot-toast';
import './Login.css'; // Using same CSS as Login


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {resetPassword} = useFirebase()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
      
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <Link to="/login" className="back-link">
          <FaArrowLeft /> Back to Login
        </Link>

        {!isSubmitted ? (
          <>
            <h1 className="auth-title">Forgot Password?</h1>
            <p className="auth-subtitle">
              No worries! Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : (
                  <>
                    Send Reset Link
                    <FaArrowRight className="button-icon" />
                  </>
                )}
              </button>
            </form>

            <p className="auth-redirect">
              Remember your password? <Link to="/login">Sign in</Link>
            </p>
          </>
        ) : (
          /* Success State */
          <div className="success-message">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2 className="auth-title">Check Your Email</h2>
            <p className="auth-subtitle">
              We've sent a reset link to:<br />
              <strong>{email}</strong>
            </p>
            <button 
              className="auth-button"
              onClick={() => window.open('https://gmail.com', '_blank')}
            >
              Open Gmail
            </button>
            <p className="auth-redirect" style={{ marginTop: '15px' }}>
              Didn't receive it? <button 
                onClick={() => {
                  setIsSubmitted(false);
                  toast.success('Resend option coming soon!');
                }}
                style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}
              >
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;