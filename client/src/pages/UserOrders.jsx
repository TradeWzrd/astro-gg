import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSpinner, FaArrowLeft, FaEye, FaDownload } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import { toast } from 'react-hot-toast';
import { orderAPI } from '../services/api';

const UserOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getMyOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your orders. Please try again later.');
        toast.error('Could not load your orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Get status badge color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFC107';
      case 'processing':
        return '#3498DB';
      case 'completed':
        return '#2ECC71';
      case 'cancelled':
        return '#E74C3C';
      case 'refunded':
        return '#9B59B6';
      default:
        return '#95A5A6';
    }
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <Title>My Orders</Title>
      
      <OrdersContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <BackButton 
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back
          </BackButton>
        </Header>

        {loading ? (
          <LoadingContainer>
            <FaSpinner className="spinner" />
            <p>Loading your orders...</p>
          </LoadingContainer>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : orders.length === 0 ? (
          <EmptyState>
            <p>You haven't placed any orders yet.</p>
            <ExploreButton
              onClick={() => navigate('/astrology')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </ExploreButton>
          </EmptyState>
        ) : (
          <OrdersList>
            {orders.map((order) => (
              <OrderCard key={order._id}>
                <OrderHeader>
                  <OrderId>Order #{order._id.substring(order._id.length - 8)}</OrderId>
                  <OrderDate>{formatDate(order.createdAt)}</OrderDate>
                </OrderHeader>
                
                <OrderItems>
                  {order.orderItems.map((item, index) => (
                    <OrderItem key={index}>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>₹{item.price.toFixed(2)} × {item.quantity}</ItemPrice>
                    </OrderItem>
                  ))}
                </OrderItems>
                
                <OrderFooter>
                  <OrderTotal>
                    <span>Total:</span>
                    <strong>₹{order.totalPrice.toFixed(2)}</strong>
                  </OrderTotal>
                  
                  <OrderStatus color={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </OrderStatus>
                  
                  <OrderActions>
                    <ActionButton
                      onClick={() => navigate(`/order/${order._id}`, { 
                        state: { orderId: order._id } 
                      })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye /> View Details
                    </ActionButton>
                    
                    {order.isDigitalOrder && order.isPaid && (
                      <ActionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaDownload /> Download
                      </ActionButton>
                    )}
                  </OrderActions>
                </OrderFooter>
              </OrderCard>
            ))}
          </OrdersList>
        )}
      </OrdersContainer>
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
  padding-top: 10rem; /* Increased padding to prevent navbar overlap */
`;

const OrdersContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 1rem; /* Reduced margin as we increased page padding */
  background: rgba(20, 0, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
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
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 auto;
  padding-top: 0;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #B6D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  position: relative;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .spinner {
    font-size: 2rem;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ExploreButton = styled(motion.button)`
  background: linear-gradient(45deg, #7B9EFF, #B6D5FF);
  color: #1a103f;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const OrderId = styled.span`
  font-weight: 600;
  color: #B6D5FF;
`;

const OrderDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemPrice = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const OrderTotal = styled.div`
  span {
    color: rgba(255, 255, 255, 0.7);
    margin-right: 0.5rem;
  }
  
  strong {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const OrderStatus = styled.div`
  background: ${props => props.color ? `${props.color}20` : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.color || 'white'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default UserOrders; 