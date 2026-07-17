import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import CartPage from './CartPage';
import { CartProvider } from './CartContext';
import AuthModal from './AuthModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null); 

  return (
    <CartProvider>
      <Router>
        {}
        <Navbar 
          onLoginClick={() => setIsLoginOpen(true)} 
          user={user} 
          onLogout={() => setUser(null)}
        />
        
        {}
        {isLoginOpen && (
          <AuthModal 
            onClose={() => setIsLoginOpen(false)} 
            onLoginSuccess={(email) => { setUser(email); setIsLoginOpen(false); }} 
          />
        )}
        
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;