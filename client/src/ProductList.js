import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const ProductList = ({ selectedCategory = 'all', searchQuery = '', onCardClick, apiBaseUrl = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiBaseUrl]);

  // Case-insensitive filtering for both categories and search strings
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const matchesCategory =
      selectedCategory === 'all' ||
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery === '' ||
      (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading products...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Popular Products</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => {
            const productId = product._id || product.id;
            const cartItem = cart.find((item) => (item._id || item.id) === productId);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div 
                key={productId} 
                onClick={() => {
                  if (typeof onCardClick === 'function') {
                    onCardClick(product);
                  }
                }}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '15px', 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                
                <div>
                  <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>Price: ₹{product.price}</p>
                </div>

                {/* Stop propagation so clicking buttons doesn't open the modal */}
                <div style={{ marginTop: '12px' }} onClick={(e) => e.stopPropagation()}>
                  {quantity === 0 ? (
                    <button 
                      onClick={() => addToCart(product)}
                      style={{ backgroundColor: '#0c831f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
                    >
                      ADD
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0c831f', borderRadius: '4px', padding: '6px 12px', color: 'white' }}>
                      <button onClick={() => updateQuantity(productId, -1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>-</button>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{quantity}</span>
                      <button onClick={() => updateQuantity(productId, 1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;