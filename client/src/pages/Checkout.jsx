import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaCreditCard, FaPaypal, FaShieldAlt, FaRupeeSign } from 'react-icons/fa';
import { clearCartItems } from '../Redux/CartSlice';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import { orderAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Form states for shipping and payment
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phoneNumber: user?.phoneNumber || ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNotes, setOrderNotes] = useState(location.state?.notes || '');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get order notes from cart page if available
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please log in to proceed with checkout');
      navigate('/login');
      return;
    }
    
    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
  }, [isAuthenticated, cartItems, navigate]);
  
  // Handle input changes for shipping info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  // Calculate prices
  const subtotal = totalAmount;
  const taxGST = subtotal * 0.18; // 18% GST
  const shippingCost = subtotal > 0 ? 0 : 0; // Free shipping
  const totalPrice = subtotal + taxGST + shippingCost;
  
  // Handle form submission and order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.postalCode || 
        !shippingInfo.phoneNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before checkout.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format the cart items for the order
      const orderItems = cartItems.map(item => ({
        product: item.productId, // Use productId for custom services or _id for database products
        name: item.name || item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60' // Default image if none exists
      }));
      
      // Create order data object
      const orderData = {
        orderItems,
        shippingAddress: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country,
          state: shippingInfo.state
        },
        paymentMethod,
        taxPrice: taxGST,
        shippingPrice: shippingCost,
        totalPrice,
        orderNotes,
        // For digital astrology services, mark as digital
        isDigitalOrder: true
      };
      
      // Call API to create order in database
      const response = await orderAPI.createOrder(orderData);
      
      // Get the real order ID from the response
      const orderId = response.data._id;
      
      try {
        // Since we're dealing with digital services, we can mark it as paid immediately
        // In a real payment flow, this would happen after payment gateway confirmation
        await orderAPI.updateOrderToPaid(orderId, {
          id: 'DIRECT-' + Date.now(),
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: shippingInfo.email || 'customer@example.com' // Provide fallback email
        });
      } catch (paymentError) {
        console.error('Error updating payment status:', paymentError);
        // We'll continue even if payment update fails - order was still created
      }
      
      // Clear the cart ONLY AFTER both operations succeed
      dispatch(clearCartItems());
      
      // Navigate to success page with the real order ID
      navigate('/order-success', { 
        state: { 
          orderId: orderId,
          orderAmount: totalPrice.toFixed(2)
        } 
      });
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <CheckoutContainer>
        <BackButton 
          onClick={() => navigate('/cart')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Cart
        </BackButton>
        
        <CheckoutTitle>Checkout</CheckoutTitle>
        
        <CheckoutLayout>
          <FormSection>
            <SectionTitle>Shipping Information</SectionTitle>
            <Form onSubmit={handlePlaceOrder}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name*</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phoneNumber">Phone Number*</Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={shippingInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="address">Address*</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="city">City*</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="state">State*</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="postalCode">Postal Code*</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="country">Country*</Label>
                  <Select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </Select>
                </FormGroup>
              </FormRow>
              
              <SectionTitle>Payment Method</SectionTitle>
              <PaymentMethods>
                <PaymentMethod 
                  $isActive={paymentMethod === 'card'}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <FaCreditCard />
                  <span>Credit/Debit Card</span>
                </PaymentMethod>
                
                <PaymentMethod 
                  $isActive={paymentMethod === 'paypal'}
                  onClick={() => handlePaymentMethodChange('paypal')}
                >
                  <FaPaypal />
                  <span>PayPal</span>
                </PaymentMethod>
                
                <PaymentMethod 
                  $isActive={paymentMethod === 'upi'}
                  onClick={() => handlePaymentMethodChange('upi')}
                >
                  <FaRupeeSign />
                  <span>UPI</span>
                </PaymentMethod>
              </PaymentMethods>
              
              <FormGroup>
                <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                <Textarea
                  id="orderNotes"
                  name="orderNotes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special instructions or comments about your order"
                />
              </FormGroup>
              
              <PlaceOrderButton
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </PlaceOrderButton>
            </Form>
          </FormSection>
          
          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            <OrderItems>
              {cartItems.map(item => (
                <OrderItem key={item._id}>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  </ItemInfo>
                  <ItemPrice>₹{(item.price * item.quantity).toFixed(2)}</ItemPrice>
                </OrderItem>
              ))}
            </OrderItems>
            
            <PriceSummary>
              <PriceRow>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </PriceRow>
              <PriceRow>
                <span>Tax (18% GST)</span>
                <span>₹{taxGST.toFixed(2)}</span>
              </PriceRow>
              <PriceRow>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
              </PriceRow>
              <PriceTotal>
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </PriceTotal>
            </PriceSummary>
            
            <SecureCheckout>
              <FaShieldAlt /> Secure Checkout
            </SecureCheckout>
          </OrderSummary>
        </CheckoutLayout>
      </CheckoutContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2A0066 0%, #4B0082 100%);
  position: relative;
  color: white;
  padding: 2rem;
  padding-top: 10rem; /* Further increased padding to prevent navbar overlap */
`;

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 0; /* Removed extra margin as we increased page padding */
  background: rgba(20, 0, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #B6D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
`;

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255,.9);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  background: rgba(20, 0, 50, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }
`;

const Select = styled.select`
  background: rgba(20, 0, 50, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }
  
  option {
    background: #2A0066;
  }
`;

const Textarea = styled.textarea`
  background: rgba(20, 0, 50, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const PaymentMethod = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.$isActive ? 'rgba(138, 43, 226, 0.3)' : 'rgba(20, 0, 50, 0.5)'};
  border: 1px solid ${props => props.$isActive ? '#B6D5FF' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(138, 43, 226, 0.2);
  }
`;

const PlaceOrderButton = styled(motion.button)`
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemQuantity = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const ItemPrice = styled.span`
  font-weight: 600;
`;

const PriceSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const PriceTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SecureCheckout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export default Checkout;
