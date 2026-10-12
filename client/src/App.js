import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import CartPage from './CartPage';
import OrdersPage from './OrdersPage';
import CartDrawer from './CartDrawer';
import LocationModal from './LocationModal';
import AuthModal from './AuthModal';
import ProductDetailModal from './ProductDetailModal';
import CategoryNav from './CategoryNav';
import { CartProvider, useCart } from './CartContext';

function AppContent() {
  // Initialize user & token state from localStorage
  const [user, setUser] = useState(() => localStorage.getItem('user_email') || null);
  const [token, setToken] = useState(() => localStorage.getItem('jwt_token') || null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Category & Location States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('Select Location');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Product Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Access clearCart from CartContext
  const { clearCart } = useCart();

  // Handle successful login/signup
  const handleLoginSuccess = (email, jwtToken) => {
    setUser(email);
    setToken(jwtToken);
    localStorage.setItem('user_email', email);
    localStorage.setItem('jwt_token', jwtToken);
    setIsLoginOpen(false);
  };

  // Handle logout and clear cart session data
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user_email');
    localStorage.removeItem('jwt_token');
    
    // Clear cart items on logout
    if (clearCart) clearCart();
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        user={user} 
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        location={location}
        onLocationClick={() => setIsLocationOpen(true)}
      />

      {/* Category Navigation Bar */}
      <CategoryNav 
        selectedCategory={selectedCategory} 
        onSelectCategory={(cat) => setSelectedCategory(cat)} 
      />
      
      {/* Modals & Drawers */}
      {isLoginOpen && (
        <AuthModal 
          onClose={() => setIsLoginOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      <LocationModal 
        isOpen={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)} 
        onSelectLocation={(newLoc) => setLocation(newLoc)} 
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      {/* Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery} 
              onCardClick={(product) => setSelectedProduct(product)} 
            />
          } 
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;