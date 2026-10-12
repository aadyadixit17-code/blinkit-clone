import React, { useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

function CartPage({ apiBaseUrl = '' }) {
  const { cart, removeFromCart, totalPrice, clearCart } = useContext(CartContext);
  
  // Handle Razorpay Payment Gateway Checkout with Backend Order Logging
  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet connection or script tag in index.html.");
      return;
    }

    const mockPaymentId = `pay_test_${Math.floor(Math.random() * 1000000000)}`;

    try {
      // Save order to MongoDB backend database
      await axios.post(`${apiBaseUrl}/api/orders`, {
        items: cart,
        totalAmount: totalPrice,
        paymentId: mockPaymentId
      });

      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", 
        amount: totalPrice * 100, 
        currency: "INR",
        name: "Blinkit Clone",
        description: "Quick Grocery Delivery Checkout",
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id || mockPaymentId}`);
          if (typeof clearCart === 'function') clearCart();
        },
        prefill: {
          name: "Test User",
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#16a34a"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment or order saving failed:", err);
      alert("Failed to process payment. Please check your network connection.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => {
            const itemId = item._id || item.id;
            return (
              <div key={itemId || index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #eee' 
              }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{item.name}</h4>
                  <span style={{ color: '#666', fontSize: '13px' }}>₹{item.price} × {item.quantity}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</span>
                  <button 
                    onClick={() => removeFromCart(itemId)} 
                    style={{ 
                      backgroundColor: '#ff4d4f', 
                      color: 'white', 
                      border: 'none', 
                      padding: '6px 12px', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Total: ₹{totalPrice}</h3>
            
            <button 
              onClick={handleRazorpayPayment}
              style={{ 
                backgroundColor: '#16a34a', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                cursor: 'pointer' 
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;