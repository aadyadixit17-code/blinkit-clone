import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function ProductCard({ product, onCardClick }) {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);

  const cartItem = cart.find(item => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div 
      className="product-card" 
      onClick={() => onCardClick(product)}
      style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '15px', width: '180px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer' }}
    >
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        style={{ height: '120px', width: '100%', objectFit: 'contain', marginBottom: '10px' }} 
      />
      
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{product.name}</h3>
        <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>Price: ₹{product.price}</p>
      </div>
      
      {/* Stop click propagation on buttons so clicking ADD doesn't trigger the modal */}
      <div style={{ marginTop: '12px' }} onClick={(e) => e.stopPropagation()}>
        {quantity === 0 ? (
          <button 
            className="add-btn"
            onClick={() => addToCart(product)}
            style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '8px 0', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ADD
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16a34a', borderRadius: '8px', padding: '4px 8px', color: 'white' }}>
            <button onClick={() => updateQuantity(product._id, -1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '24px' }}>-</button>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{quantity}</span>
            <button onClick={() => updateQuantity(product._id, 1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '24px' }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;