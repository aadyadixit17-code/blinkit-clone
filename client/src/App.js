import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import CartPage from './CartPage';
import CartDrawer from './CartDrawer';
import LocationModal from './LocationModal';
import AuthModal from './AuthModal';
import ProductDetailModal from './ProductDetailModal';
import CategoryNav from './CategoryNav'; // IMPORT CATEGORY NAV
import { CartProvider } from './CartContext';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Category & Location States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState('Select Location');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Product Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <Router>
        {/* Navigation Bar */}
        <Navbar 
          onLoginClick={() => setIsLoginOpen(true)} 
          user={user} 
          onLogout={() => setUser(null)}
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
            onLoginSuccess={(email) => { setUser(email); setIsLoginOpen(false); }} 
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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;