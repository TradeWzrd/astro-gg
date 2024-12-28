import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import GlassyNav from '../components/GlassyNav';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2A0066 0%, #4B0082 100%);
  position: relative;
  color: white;
  padding: 10rem 2rem 2rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 2rem 0 3rem 0;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(45deg, #fff, #B6D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(20, 0, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NotesSection = styled.div`
  margin-top: 2rem;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  background: rgba(20, 0, 50, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  padding: 1rem;
  resize: none;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }
`;

const Summary = styled.div`
  margin-top: 2rem;
  text-align: right;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const ProceedButton = styled(motion.button)`
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
`;

const Cart = () => {
  const [notes, setNotes] = useState('');
  const [cartItems, setCartItems] = useState([]);  // Local state for cart items
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);  // Loading state for async operations
  const user = useSelector((state) => state.auth.user); // Assuming user is stored in auth slice

  console.log("user id cart", user);

  // Fetch cart items from the server when user is logged in
  const fetchCartItems = async () => {
    setLoading(true);  // Set loading to true when the fetch starts
    try {
      const response = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
      const cartData = response.data;
      console.log("Fetched Cart Data:", cartData);

      if (cartData && cartData.length > 0) {
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);  // Set loading to false after the fetch operation
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion");
      return;
    }

    try {
      // API call to delete item from cart
      const response = await axios.delete(`http://localhost:4000/api/cart/delete/${cart_item_id}`);
      if (response.status === 200) {
        console.log(`Item with cart_item_id: ${cart_item_id} removed successfully`);
        
        // After removing, refetch the updated cart data from the server
        const updatedCart = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        setCartItems(updatedCart.data); // Update local state with fresh data from the server
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  React.useEffect(() => {
    if (user && user.userId) {
      fetchCartItems();
    }
  }, [user]);

  React.useEffect(() => {
    const calculateTotal = () => {
      if (cartItems.length === 0) {
        setTotalAmount(0);  // Set to 0 if no items
      } else {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(newTotal);
      }
    };
    calculateTotal();
  }, [cartItems]);

  return (
    <PageContainer>
      <GlassyNav />
      <ShootingStars />
      <FlickeringStars />

      <Title>MY CART</Title>

      <CartContainer>
        <CartHeader>
          <div>PRODUCT</div>
          <div>PRICE</div>
          <div>QUANTITY</div>
          <div>TOTAL</div>
        </CartHeader>

        {loading ? (
          <div>Loading...</div>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <CartItem key={index}>
              <ProductInfo>
                <ProductImage />
                <ProductDetails>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ActionButtons>
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(item.cart_item_id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </ActionButtons>
                </ProductDetails>
              </ProductInfo>
              <div>₹{item.price.toFixed(2)}</div>
              <div>{item.quantity}</div>
              <div>₹{(item.price * item.quantity).toFixed(2)}</div>
            </CartItem>
          ))
        )}

        <NotesSection>
          <h3>Add Notes</h3>
          <NotesTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions or notes..."
          />
        </NotesSection>

        <Summary>
          <h2>Subtotal: Rs. {calculateSubtotal().toFixed(2)}</h2>
          <p>Taxes and shipping calculated at checkout</p>
          <ProceedButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            PROCEED TO BUY
          </ProceedButton>
        </Summary>
      </CartContainer>
    </PageContainer>
  );
};

export default Cart;
