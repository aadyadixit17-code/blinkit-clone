import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        style={{ 
          height: '120px', 
          width: '100%', 
          objectFit: 'contain', 
          marginBottom: '10px' 
        }} 
      />
      
      <h3 style={{ fontSize: '14px', fontWeight: 'bold' }}>{product.name}</h3>
      
      <p style={{ color: '#6b7280', fontSize: '12px' }}>
        Price: ₹{product.price}
      </p>
      
      <button 
        className="add-btn"
        onClick={() => addToCart(product)}
        style={{
          marginTop: '10px',
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default ProductCard;