import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  
  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px 0',
              borderBottom: '1px solid #eee' 
            }}>
              <span>{item.name} - ₹{item.price}</span>
              
              <button 
                onClick={() => removeFromCart(item._id)} 
                style={{ 
                  backgroundColor: '#ff4d4f', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
          
          <h3 style={{ marginTop: '20px' }}>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;