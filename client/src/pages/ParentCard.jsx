import React, { useState } from 'react';
import TriangularCarousel from '../components/TriangularCarousal'; // Assuming this is where the carousel is defined
import Cart from './Cart'; // Assuming this is the Cart component

const CartManager = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  return (
    <div>
      {/* Pass addToCart function as prop to TriangularCarousel */}
      <TriangularCarousel addToCart={addToCart}/>
      
      {/* Pass cartItems and setCartItems to Cart for display */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default CartManager;
