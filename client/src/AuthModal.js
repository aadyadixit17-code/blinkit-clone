import React, { useState } from 'react';

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [step, setStep] = useState('EMAIL');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {step === 'EMAIL' ? (
          <>
            <h2>Login / Signup</h2>
            <input type="email" placeholder="Enter your email" />
            <button className="auth-btn" onClick={() => setStep('OTP')}>Continue</button>
          </>
        ) : (
          <>
            <h2>Verify OTP</h2>
            <p>Enter the code sent to your email</p>
            <input type="text" placeholder="Enter 4-digit OTP" maxLength="4" />
            {}
            <button className="auth-btn" onClick={() => onLoginSuccess("user@example.com")}>
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;