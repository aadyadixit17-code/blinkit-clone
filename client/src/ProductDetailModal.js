import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function ProductDetailModal({ product, onClose }) {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);

  if (!product) return null;

  // Robustly handle both _id and id
  const productId = product._id || product.id;
  const cartItem = cart.find(item => (item._id || item.id) === productId);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '420px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative' }}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#666' }}>✕</button>

        {/* Product Image */}
        <div style={{ textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '12px', padding: '20px', marginBottom: '15px' }}>
          <img src={product.imageUrl} alt={product.name} style={{ height: '180px', objectFit: 'contain' }} />
        </div>

        {/* Details */}
        <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category || 'Grocery'}</span>
        <h2 style={{ fontSize: '20px', margin: '4px 0 8px 0', color: '#111' }}>{product.name}</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a', margin: '0 0 15px 0' }}>₹{product.price}</p>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#333' }}>Product Highlights</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
            <li>Freshly sourced and quality checked</li>
            <li>Guaranteed 10-minute delivery</li>
            <li>Store in a cool and dry place</li>
          </ul>
        </div>

        {/* Add/Quantity Button */}
        <div>
          {quantity === 0 ? (
            <button 
              onClick={() => addToCart(product)}
              style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              ADD TO CART
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16a34a', borderRadius: '8px', padding: '8px 16px', color: 'white' }}>
              <button onClick={() => updateQuantity(productId, -1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{quantity} in cart</span>
              <button onClick={() => updateQuantity(productId, 1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}>+</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductDetailModal;