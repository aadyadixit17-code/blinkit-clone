import React, { useState } from 'react';
import axios from 'axios';

const AuthModal = ({ onClose, onLoginSuccess, apiBaseUrl = '' }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignup 
      ? `${apiBaseUrl}/api/auth/register` 
      : `${apiBaseUrl}/api/auth/login`;

    try {
      const response = await axios.post(endpoint, { email, password });
      setLoading(false);
      
      if (response.data.success) {
        // Pass email and jwt token up to App.js
        onLoginSuccess(response.data.email, response.data.token);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="modal-content" style={{ width: '400px', backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
        
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#666' }}>×</button>
        
        <h2 style={{ margin: '0 0 10px 0', fontSize: '22px', color: '#111' }}>
          {isSignup ? 'Create Personal Account' : 'Login / Signup'}
        </h2>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#666' }}>
          {isSignup ? 'Sign up with your email to start shopping.' : 'Enter your email and password to access your account.'}
        </p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '5px' }}>Email Address</label>
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#444', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              required
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '5px' }}
          >
            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Continue')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#666' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            style={{ color: '#16a34a', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isSignup ? 'Login here' : 'Sign up'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;