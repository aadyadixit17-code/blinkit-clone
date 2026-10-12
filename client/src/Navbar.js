import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const Navbar = ({ onLoginClick, user, onLogout, searchQuery, setSearchQuery, onCartClick, location, onLocationClick }) => {
  const { totalItems } = useContext(CartContext);
  const userIconUrl = "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg";

  return (
    <nav className="navbar" style={{ backgroundColor: '#ffc107', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
      
      {/* Brand Logo & Delivery Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#333' }}>Blinkit Clone</h1>
        </Link>

        {/* Delivery Location & ETA Badge */}
        <div 
          onClick={onLocationClick}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(0,0,0,0.15)', paddingLeft: '15px' }}
        >
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚡ Delivery in 10 MINS
          </span>
          <span style={{ fontSize: '13px', color: '#333', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {location.length > 22 ? `${location.substring(0, 22)}...` : location} ▾
          </span>
        </div>
      </div>
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search for atta, dal, coke..." 
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', width: '280px', outline: 'none' }}
      />
      
      {/* Actions (Orders, Live Tracking, Login, Cart) */}
      <div className="nav-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Working My Orders Link */}
        <Link to="/orders" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#ffffff', color: '#333', border: '1px solid #ccc', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
            📦 My Orders
          </button>
        </Link>

        {/* Live Tracking Presentation Button */}
        <button 
          onClick={() => alert("⚡ Live Delivery Tracking Timer: Active upon placing an order and viewing My Orders!")}
          style={{ backgroundColor: '#ffffff', color: '#333', border: '1px solid #ccc', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
        >
          ⚡ Live Tracking
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={userIconUrl} 
              alt="User Profile" 
              style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain', border: '1px solid #ddd', backgroundColor: 'white' }} 
            />
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{user}</span>
            <button 
              className="login-btn" 
              onClick={onLogout}
              style={{ backgroundColor: 'white', color: '#333', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            className="login-btn" 
            onClick={onLoginClick}
            style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
          >
            Login
          </button>
        )}
        
        <button 
          onClick={onCartClick}
          className="cart-btn"
          style={{ 
            backgroundColor: '#16a34a', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🛒 My Cart {totalItems > 0 && <span style={{ backgroundColor: 'white', color: '#16a34a', borderRadius: '50%', padding: '2px 8px', fontSize: '12px' }}>{totalItems}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;