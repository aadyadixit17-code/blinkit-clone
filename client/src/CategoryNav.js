import React from 'react';

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Grocery', value: 'Grocery' },
  { name: 'Vegetables', value: 'Vegetables' },
  { name: 'Healthcare', value: 'Healthcare' },
  { name: 'Study', value: 'Study' },
  { name: 'Fashion', value: 'Fashion' }
];

function CategoryNav({ selectedCategory, onSelectCategory }) {
  return (
    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.value.toLowerCase();
        return (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: isSelected ? '2px solid #16a34a' : '1px solid #d1d5db',
              backgroundColor: isSelected ? '#f0fdf4' : '#fff',
              color: isSelected ? '#16a34a' : '#374151',
              fontWeight: isSelected ? 'bold' : 'normal',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryNav;