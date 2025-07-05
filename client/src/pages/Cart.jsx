import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
// Import Redux thunks
import { 
  fetchCart, 
  removeItemFromCart, 
  updateItemInCart,
  clearCartItems 
} from '../Redux/CartSlice';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2A0066 0%, #4B0082 100%);
  position: relative;
  color: white;
  padding: 2rem;
  padding-top: 10rem; /* Further increased padding to prevent navbar overlap */
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  margin: 0 0 3rem 0;
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .total {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart state from Redux store
  const { cartItems, totalAmount, loading, error } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch cart when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
      toast.error('Please login to view your cart');
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Handle quantity update
  const handleUpdateQuantity = (itemId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    
    if (newQuantity > 0) {
      dispatch(updateItemInCart({ itemId, quantity: newQuantity }));
    } else if (newQuantity === 0) {
      // If quantity becomes 0, remove the item
      handleRemoveItem(itemId);
    }
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  // Handle proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Navigate to checkout page with cart data
    navigate('/checkout', { state: { notes } });
  };

  // Clear entire cart
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is already empty');
      return;
    }
    
    dispatch(clearCartItems());
  };

  return (
    <PageContainer>
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
          <div className="loading-spinner">Loading your cart...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : cartItems.length === 0 ? (
          <EmptyCart>
            <FaShoppingCart size={50} />
            <p>Your cart is empty</p>
            <EmptyCartButton 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              Browse Products
            </EmptyCartButton>
          </EmptyCart>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item._id}>
              <ProductInfo>
                {item.image ? (
                  <ProductImage src={item.image} alt={item.name} />
                ) : (
                  <ProductImage />
                )}
                <ProductDetails>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </ProductDetails>
              </ProductInfo>
              <div>₹{item.price.toFixed(2)}</div>
              <QuantityControl>
                <IconButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                >
                  <FaMinus />
                </IconButton>
                <span>{item.quantity}</span>
                <IconButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                >
                  <FaPlus />
                </IconButton>
              </QuantityControl>
              <div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                <RemoveButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <FaTrash /> Remove
                </RemoveButton>
              </div>
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
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{totalAmount > 0 ? 'FREE' : '₹0.00'}</span>
          </div>
          <div className="summary-row">
            <span>Tax (18% GST):</span>
            <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{(totalAmount * 1.18).toFixed(2)}</span>
          </div>

          <div className="button-group">
            <ClearButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </ClearButton>
            <ProceedButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              PROCEED TO CHECKOUT
            </ProceedButton>
          </div>
        </Summary>
      </CartContainer>
    </PageContainer>
  );
};

// Additional styled components
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    width: 30px;
    text-align: center;
    font-weight: 600;
  }
`;

const RemoveButton = styled(motion.button)`
  background: none;
  border: none;
  color: rgba(255, 50, 50, 0.8);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 50, 50, 0.1);
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  
  p {
    margin: 1rem 0;
    font-size: 1.2rem;
  }
`;

const EmptyCartButton = styled(motion.button)`
  background: linear-gradient(45deg, #9c27b0, #673ab7);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
`;

const ClearButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Cart;
