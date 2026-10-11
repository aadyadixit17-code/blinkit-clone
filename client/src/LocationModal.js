import React, { useState } from 'react';

function LocationModal({ isOpen, onClose, onSelectLocation }) {
  const [addressInput, setAddressInput] = useState('');

  if (!isOpen) return null;

  const handleSave = (locationName) => {
    onSelectLocation(locationName);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Select Delivery Location</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Detect Location Button */}
        <button 
          onClick={() => handleSave("Connaught Place, New Delhi")}
          style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
        >
          📍 Use Current Location
        </button>

        <p style={{ textDecoration: 'underline', textAlign: 'center', color: '#888', margin: '10px 0', fontSize: '12px' }}>OR ENTER MANUALLY</p>

        {/* Input Form */}
        <input 
          type="text" 
          placeholder="Enter house no, street, locality..."
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        <button 
          onClick={() => addressInput.trim() && handleSave(addressInput)}
          style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export default LocationModal;