import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome, FaBoxOpen, FaSpinner, FaRupeeSign, FaExclamationTriangle } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import { toast } from 'react-hot-toast';
import { orderAPI } from '../services/api';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(false);
  
  // Get order details from location state
  const orderId = location.state?.orderId;
  const orderAmount = location.state?.orderAmount;
  
  // Fetch additional order details from the database
  useEffect(() => {
    // If someone navigates directly to this page without an order
    if (!orderId) {
      setError(true);
      setLoading(false);
      toast.error('Invalid order access. Please check your orders in your profile.');
      return;
    }
    
    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await orderAPI.getOrderById(orderId);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(true);
        toast.error('Could not load order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, navigate]);
  
  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <SuccessContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {loading ? (
          <LoadingSpinner>
            <FaSpinner className="spinner" />
            <p>Loading order details...</p>
          </LoadingSpinner>
        ) : error ? (
          <>
            <ErrorIcon>
              <FaExclamationTriangle />
            </ErrorIcon>
            
            <ErrorTitle>Order Information Not Found</ErrorTitle>
            
            <Message>
              <p>We couldn't find information about your order.</p>
              <p>If you've just placed an order, please check your email for confirmation or view your orders in your profile.</p>
            </Message>

            <ButtonsContainer>
              <Button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome /> Return to Home
              </Button>

              <Button
                onClick={() => navigate('/profile/orders')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBoxOpen /> View All Orders
              </Button>
            </ButtonsContainer>
          </>
        ) : (
          <>
            <CheckIcon>
              <FaCheckCircle />
            </CheckIcon>
            
            <SuccessTitle>Order Placed Successfully!</SuccessTitle>
            
            <OrderDetails>
              <OrderDetail>
                <span>Order ID:</span>
                <strong>{orderDetails?._id}</strong>
              </OrderDetail>
              
              <OrderDetail>
                <span>Date:</span>
                <strong>{new Date(orderDetails?.createdAt).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</strong>
              </OrderDetail>

              <OrderDetail>
                <span>Amount Paid:</span>
                <strong>₹{orderDetails?.totalPrice?.toFixed(2) || orderAmount || '0.00'}</strong>
              </OrderDetail>

              <OrderDetail>
                <span>Payment Method:</span>
                <strong>{orderDetails?.paymentMethod}</strong>
              </OrderDetail>

              <OrderDetail>
                <span>Payment Status:</span>
                <PaymentStatus>Paid</PaymentStatus>
              </OrderDetail>

              <OrderDetail>
                <span>Delivery Method:</span>
                <strong>Digital Delivery</strong>
              </OrderDetail>
            </OrderDetails>

            <ServiceInfo>
              <h3>Ordered Services</h3>
              {orderDetails?.orderItems?.map((item, index) => (
                <ServiceItem key={index}>
                  <ServiceName>{item.name}</ServiceName>
                  <ServicePrice>₹{item.price} × {item.quantity}</ServicePrice>
                </ServiceItem>
              ))}
            </ServiceInfo>

            <Message>
              <p>Thank you for your order! Your service will be processed shortly.</p>
              <p>You will receive a confirmation email with further details.</p>
            </Message>

            <ButtonsContainer>
              <Button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome /> Return to Home
              </Button>

              <Button
                onClick={() => navigate('/profile/orders')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBoxOpen /> View All Orders
              </Button>
            </ButtonsContainer>
          </>
        )}
      </SuccessContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0c0118, #1a0538);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 10rem; /* Further increased padding to prevent navbar overlap */
  position: relative;
  overflow-x: hidden;
`;

const SuccessContainer = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  background: rgba(30, 10, 60, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-top: 0; /* Removed extra margin as we increased page padding */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 0 1rem;
    margin-top: 0; /* Removed extra margin */
  }
`;

const CheckIcon = styled.div`
  font-size: 5rem;
  color: #69f0ae;
  margin-bottom: 1.5rem;

  svg {
    filter: drop-shadow(0 0 10px rgba(105, 240, 174, 0.5));
  }
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #d8b4fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const OrderDetails = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  span {
    color: rgba(255, 255, 255, 0.7);
  }

  strong {
    color: white;
    font-weight: 600;
  }
`;

const PaymentStatus = styled.span`
  color: #69f0ae !important;
  font-weight: 600;
  background: rgba(105, 240, 174, 0.15);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Message = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ServiceInfo = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  h3 {
    color: white;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ServiceName = styled.span`
  color: white;
  font-weight: 500;
`;

const ServicePrice = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;

  .spinner {
    font-size: 2.5rem;
    color: #a78bfa;
    animation: spin 1s linear infinite;
  }

  p {
    margin-top: 1rem;
    color: white;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Add new styled components for the error state
const ErrorIcon = styled.div`
  font-size: 5rem;
  color: #ff6b6b;
  margin-bottom: 1.5rem;

  svg {
    filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));
  }
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #ff9f9f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export default OrderSuccess;
