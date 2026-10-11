import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('blinkit_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // 2. Persist cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('blinkit_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Increment quantity if item exists, otherwise push with quantity: 1
  const addToCart = (product) => {
    const productId = product._id || product.id;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => (item._id || item.id) === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 4. Decrement quantity or remove if quantity reaches 0
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          const itemId = item._id || item.id;
          if (itemId === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // 5. Complete removal
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== productId));
  };

  // 6. Calculated properties
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};