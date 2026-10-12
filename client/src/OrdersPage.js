import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:5000/api/orders')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '850px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
        📦 My Orders & Live Delivery Tracking
      </h2>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>No past orders found.</p>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>Place an order to track live delivery and view history!</p>
        </div>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
}

// Sub-component for individual Order Item with Live Timer & Mock Map UI
function OrderCard({ order }) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '25px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', marginBottom: '15px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>ORDER ID: </span>
          <strong style={{ fontSize: '13px', color: '#111827' }}>#{order._id}</strong>
        </div>
        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>
          ⚡ {order.status}
        </span>
      </div>

      {/* Live Tracking Map UI & Timer */}
      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '15px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🛵</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>Delivery Executive Assigned</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Arriving at your doorstep</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>ESTIMATED TIME</span>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#16a34a' }}>
              {timeLeft > 0 ? formatTime(timeLeft) : 'Arriving Now!'}
            </div>
          </div>
        </div>

        {/* Mock Delivery Route Visualizer */}
        <div style={{ height: '80px', backgroundColor: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <span style={{ fontSize: '20px' }}>🏬</span>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}>Store</div>
          </div>
          <div style={{ flex: 1, borderTop: '2px dashed #94a3b8', margin: '0 10px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', left: `${Math.min(100, Math.max(10, ((600 - timeLeft) / 600) * 100))}%`, transition: 'left 1s linear', fontSize: '16px' }}>
              🛵
            </span>
          </div>
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <span style={{ fontSize: '20px' }}>🏠</span>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}>Home</div>
          </div>
        </div>
      </div>

      {/* Items Summary */}
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#334155' }}>Items Included:</h4>
        {order.items && order.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569', marginBottom: '6px' }}>
            <span>{item.name} × {item.quantity}</span>
            <span style={{ fontWeight: '500' }}>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Footer Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>Payment ID: {order.paymentId || 'N/A'}</span>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>
          Total Paid: ₹{order.totalAmount}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;