import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaDownload } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import { toast } from 'react-hot-toast';
import { orderAPI } from '../services/api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(false);
  
  // Get order ID from URL params or location state
  const orderIdToFetch = orderId || location.state?.orderId;
  
  // Fetch order details from the database
  useEffect(() => {
    // If no order ID, show error
    if (!orderIdToFetch) {
      setError(true);
      setLoading(false);
      toast.error('Invalid order access. Please check your orders in your profile.');
      return;
    }
    
    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await orderAPI.getOrderById(orderIdToFetch);
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
  }, [orderIdToFetch, navigate]);
  
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
      
      <DetailsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          <BackButton 
            onClick={() => navigate(-1)} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Orders
          </BackButton>
          
          <Title>Order Details</Title>
        </Header>
        
        {loading ? (
          <LoadingSpinner>
            <FaSpinner className="spinner" />
            <p>Loading order details...</p>
          </LoadingSpinner>
        ) : error ? (
          <ErrorContainer>
            <ErrorIcon>
              <FaExclamationTriangle />
            </ErrorIcon>
            <h2>Order Not Found</h2>
            <p>We couldn't find the requested order details.</p>
          </ErrorContainer>
        ) : (
          <>
            <OrderHeader>
              <OrderId>
                Order #{orderDetails?._id.substring(orderDetails?._id.length - 8)}
              </OrderId>
              <OrderStatus color={getStatusColor(orderDetails?.status)}>
                {orderDetails?.status.charAt(0).toUpperCase() + orderDetails?.status.slice(1)}
              </OrderStatus>
            </OrderHeader>
            
            <OrderInfoGrid>
              <OrderInfoSection>
                <SectionTitle>Order Information</SectionTitle>
                <InfoRow>
                  <InfoLabel>Date Placed:</InfoLabel>
                  <InfoValue>{formatDate(orderDetails?.createdAt)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Order ID:</InfoLabel>
                  <InfoValue>{orderDetails?._id}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Payment Method:</InfoLabel>
                  <InfoValue>{orderDetails?.paymentMethod}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Payment Status:</InfoLabel>
                  <InfoValue>
                    {orderDetails?.isPaid ? (
                      <StatusTag color="#2ECC71">Paid</StatusTag>
                    ) : (
                      <StatusTag color="#FFC107">Pending</StatusTag>
                    )}
                  </InfoValue>
                </InfoRow>
              </OrderInfoSection>
              
              <OrderInfoSection>
                <SectionTitle>Shipping Address</SectionTitle>
                {orderDetails?.shippingAddress ? (
                  <>
                    <InfoRow>
                      <InfoLabel>Name:</InfoLabel>
                      <InfoValue>{orderDetails?.user?.name}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Address:</InfoLabel>
                      <InfoValue>{orderDetails?.shippingAddress.address}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>City:</InfoLabel>
                      <InfoValue>{orderDetails?.shippingAddress.city}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>State:</InfoLabel>
                      <InfoValue>{orderDetails?.shippingAddress.state}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Postal Code:</InfoLabel>
                      <InfoValue>{orderDetails?.shippingAddress.postalCode}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Country:</InfoLabel>
                      <InfoValue>{orderDetails?.shippingAddress.country}</InfoValue>
                    </InfoRow>
                  </>
                ) : (
                  <p>No shipping details provided</p>
                )}
              </OrderInfoSection>
            </OrderInfoGrid>
            
            <OrderItems>
              <SectionTitle>Ordered Items</SectionTitle>
              {orderDetails?.orderItems.map((item, index) => (
                <OrderItem key={index}>
                  {item.image && (
                    <ItemImage src={item.image} alt={item.name} />
                  )}
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>Quantity: {item.quantity}</ItemMeta>
                  </ItemDetails>
                  <ItemPrice>₹{item.price.toFixed(2)}</ItemPrice>
                </OrderItem>
              ))}
            </OrderItems>
            
            <PriceSummary>
              <SectionTitle>Price Summary</SectionTitle>
              <PriceRow>
                <span>Subtotal:</span>
                <span>₹{orderDetails?.itemsPrice?.toFixed(2) || ((orderDetails?.totalPrice - orderDetails?.taxPrice) || 0).toFixed(2)}</span>
              </PriceRow>
              <PriceRow>
                <span>Tax (GST):</span>
                <span>₹{orderDetails?.taxPrice?.toFixed(2) || '0.00'}</span>
              </PriceRow>
              <PriceRow>
                <span>Shipping:</span>
                <span>₹{orderDetails?.shippingPrice?.toFixed(2) || '0.00'}</span>
              </PriceRow>
              <PriceTotal>
                <span>Total:</span>
                <span>₹{orderDetails?.totalPrice?.toFixed(2) || '0.00'}</span>
              </PriceTotal>
            </PriceSummary>
            
            {orderDetails?.orderNotes && (
              <NotesSection>
                <SectionTitle>Order Notes</SectionTitle>
                <NoteContent>{orderDetails.orderNotes}</NoteContent>
              </NotesSection>
            )}
            
            {orderDetails?.isDigitalOrder && orderDetails?.isPaid && (
              <DownloadSection>
                <DownloadButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download Report
                </DownloadButton>
              </DownloadSection>
            )}
          </>
        )}
      </DetailsContainer>
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

const DetailsContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(20, 0, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1.5rem 0;
  background: linear-gradient(45deg, #fff, #B6D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
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
  width: fit-content;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
`;

const OrderId = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #B6D5FF;
`;

const OrderStatus = styled.div`
  background: ${props => props.color ? `${props.color}20` : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.color || 'white'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
`;

const OrderInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderInfoSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  min-width: 150px;
  color: rgba(255, 255, 255, 0.7);
`;

const InfoValue = styled.span`
  font-weight: 500;
`;

const StatusTag = styled.span`
  background: ${props => props.color ? `${props.color}20` : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.color || 'white'};
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const OrderItems = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ItemMeta = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;

const PriceSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NotesSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const NoteContent = styled.p`
  white-space: pre-wrap;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const DownloadButton = styled(motion.button)`
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #E74C3C;
  margin-bottom: 1rem;
`;

export default OrderDetails; 