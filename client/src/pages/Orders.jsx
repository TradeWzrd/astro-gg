import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaSpinner, FaEye, FaFileDownload, FaArrowLeft, FaRupeeSign } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import { orderAPI } from '../services/api';

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's orders on component mount
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('Please log in to view your orders');
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getMyOrders();
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
        toast.error('Could not load your orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#69F0AE';
      case 'pending':
        return '#FFD54F';
      case 'processing':
        return '#64B5F6';
      case 'cancelled':
        return '#EF5350';
      case 'refunded':
        return '#BA68C8';
      default:
        return '#78909C';
    }
  };

  // Format payment method for display
  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'upi':
        return 'UPI';
      case 'bank':
        return 'Bank Transfer';
      default:
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />

      <OrdersContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <BackButton
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back
          </BackButton>
          <Title>My Orders</Title>
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
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet. Browse our services to get started.</p>
            <EmptyStateButton
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </EmptyStateButton>
          </EmptyState>
        ) : (
          <OrdersList>
            {orders.map((order) => (
              <OrderCard key={order._id}>
                <OrderHeader>
                  <OrderNumber>Order #{order._id.slice(-6)}</OrderNumber>
                  <StatusBadge style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </StatusBadge>
                </OrderHeader>

                <OrderInfo>
                  <OrderInfoItem>
                    <span>Date:</span>
                    <strong>{formatDate(order.createdAt)}</strong>
                  </OrderInfoItem>
                  <OrderInfoItem>
                    <span>Total:</span>
                    <strong><FaRupeeSign size={12} /> {order.totalPrice.toFixed(2)}</strong>
                  </OrderInfoItem>
                  <OrderInfoItem>
                    <span>Items:</span>
                    <strong>{order.orderItems.length}</strong>
                  </OrderInfoItem>
                  <OrderInfoItem>
                    <span>Payment:</span>
                    <strong>{formatPaymentMethod(order.paymentMethod)}</strong>
                  </OrderInfoItem>
                </OrderInfo>

                <OrderItems>
                  {order.orderItems.slice(0, 2).map((item, idx) => (
                    <OrderItem key={idx}>
                      <ItemImage>
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="placeholder-image"></div>
                        )}
                      </ItemImage>
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemMeta>
                          <span>Qty: {item.quantity}</span>
                          <span><FaRupeeSign size={10} /> {item.price.toFixed(2)}</span>
                        </ItemMeta>
                      </ItemDetails>
                    </OrderItem>
                  ))}
                  {order.orderItems.length > 2 && (
                    <MoreItems>+{order.orderItems.length - 2} more items</MoreItems>
                  )}
                </OrderItems>

                <ActionButtons>
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
                      onClick={() => toast.success('Downloads coming soon!')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFileDownload /> Downloads
                    </ActionButton>
                  )}
                </ActionButtons>
              </OrderCard>
            ))}
          </OrdersList>
        )}
      </OrdersContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0c0118, #1a0538);
  position: relative;
  padding: 2rem;
  overflow-x: hidden;
`;

const OrdersContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(30, 10, 60, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const BackButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: absolute;
  left: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  background: linear-gradient(to right, #fff, #d8b4fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  
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

const ErrorMessage = styled.div`
  background: rgba(255, 87, 87, 0.2);
  border: 1px solid rgba(255, 87, 87, 0.3);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  color: white;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 0;
  
  h3 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
  }
`;

const EmptyStateButton = styled(motion.button)`
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const OrderNumber = styled.h3`
  font-size: 1.2rem;
  color: white;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OrderInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  span {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  strong {
    font-size: 0.95rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(106, 90, 205, 0.3), rgba(138, 43, 226, 0.3));
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h4`
  font-size: 0.95rem;
  color: white;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const MoreItems = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding-top: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:first-child {
    background: rgba(167, 139, 250, 0.2);
    border-color: rgba(167, 139, 250, 0.3);
    
    &:hover {
      background: rgba(167, 139, 250, 0.3);
      border-color: rgba(167, 139, 250, 0.4);
    }
  }
`;

export default Orders;
