import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

function CartDrawer({ isOpen, onClose, apiBaseUrl = '' }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    setShowRazorpayMock(true);
  };

  const handleSimulatePayment = () => {
    setIsPaying(true);
    const mockPaymentId = `pay_test_${Math.floor(Math.random() * 1000000000)}`;

    // Save order to MongoDB backend database using dynamic apiBaseUrl
    axios.post(`${apiBaseUrl}/api/orders`, {
      items: cart,
      totalAmount: totalPrice,
      paymentId: mockPaymentId
    })
    .then(() => {
      setIsPaying(false);
      setShowRazorpayMock(false);
      setPaymentId(mockPaymentId);
      setOrderSuccess(true);
      
      if (typeof clearCart === 'function') {
        clearCart();
      }
    })
    .catch((err) => {
      console.error('Error saving order to backend:', err);
      setIsPaying(false);
      alert('Payment simulated, but failed to save order to database. Check server connection.');
    });
  };

  const handleCloseModal = () => {
    setOrderSuccess(false);
    setShowRazorpayMock(false);
    onClose();
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100vh', backgroundColor: 'white', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', zIndex: 1200, display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>My Cart</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {orderSuccess ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎉</div>
            <h3 style={{ color: '#16a34a', margin: '0 0 10px 0' }}>Order Placed Successfully!</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Thank you for shopping with Blinkit Clone. Your live delivery tracking is now active!</p>
            <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '6px', width: '100%', marginBottom: '20px', fontSize: '13px' }}>
              <strong>Payment ID:</strong> {paymentId}
            </div>
            <button 
              onClick={handleCloseModal}
              style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px 0' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                cart.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                    <div key={itemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h4>
                        <span style={{ fontSize: '13px', color: '#666' }}>₹{item.price}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={() => updateQuantity(itemId, -1)} style={{ padding: '2px 8px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                        <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(itemId, 1)} style={{ padding: '2px 8px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        <button onClick={() => removeFromCart(itemId)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }}>
                  <span>Total Amount:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button 
                  onClick={handleProceedToCheckout}
                  style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Razorpay Mock Checkout Window Overlay */}
      {showRazorpayMock && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '500px', backgroundColor: '#111827', color: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ backgroundColor: '#1f2937', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px' }}>B</div>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Blinkit Clone</span>
              </div>
              <button onClick={() => setShowRazorpayMock(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#9ca3af' }}>Price Summary</p>
                <h3 style={{ margin: 0, fontSize: '22px' }}>₹{totalPrice}</h3>
                <hr style={{ borderColor: '#374151', margin: '15px 0' }} />
                <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>Test User</p>
              </div>

              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Test Mode Payment</h4>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 20px 0' }}>Select test payment simulation to complete your order securely.</p>
                </div>
                <button 
                  onClick={handleSimulatePayment}
                  disabled={isPaying}
                  style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                >
                  {isPaying ? 'Processing...' : `Pay ₹{totalPrice} Now`}
                </button>
              </div>
            </div>
            <div style={{ backgroundColor: '#1f2937', padding: '10px 20px', textAlign: 'right', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #374151' }}>
              Secured by Razorpay Test Sandbox
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;