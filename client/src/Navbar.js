import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, user, onLogout }) => {
  
  const userIconUrl = "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg";

  return (
    <nav className="navbar" style={{ backgroundColor: '#ffc107', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#333' }}>Blinkit Clone</h1>
      </Link>
      
      <input 
        type="text" 
        placeholder="Search for atta, dal, coke..." 
        className="search-input"
        style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', width: '300px' }}
      />
      
      <div className="nav-buttons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {}
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
        
        <Link 
          to="/cart" 
          className="cart-btn"
          style={{ textDecoration: 'none', backgroundColor: '#6200ea', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}
        >
          My Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;