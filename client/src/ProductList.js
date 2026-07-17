import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ padding: '20px' }}>
      
      {}
      {/* Category Selection Buttons */}
<div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
  {['all', 'vegetables', 'grocery', 'healthcare', 'study', 'fashion'].map((cat) => (
    <button 
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        backgroundColor: selectedCategory === cat ? '#16a34a' : 'white',
        color: selectedCategory === cat ? 'white' : 'black',
        textTransform: 'capitalize',
        cursor: 'pointer'
      }}
    >
      {cat}
    </button>
  ))}
</div>

      <h2>Popular Products</h2>
      
      {}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px' 
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;