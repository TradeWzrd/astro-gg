import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaClock, FaVideo, FaFileAlt, FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ShootingStars from '../../components/ShootingStars';
import FlickeringStars from '../../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c3d 0%, #4b0082 100%);
  padding: 2rem;
  color: white;
  position: relative;
`;

const BreadcrumbNav = styled.nav`
  max-width: 1200px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  a {
    color: #a78bfa;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  background: rgba(0, 0, 0, 0.2);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #a78bfa;
`;

const OriginalPrice = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
`;

const Discount = styled.div`
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .stars {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #ffd700;
    font-size: 1.25rem;
  }
  
  .count {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(167, 139, 250, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a78bfa;
    font-size: 1.2rem;
  }

  .text {
    h4 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(167, 139, 250, 0.4);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  margin-top: 1rem;

  .icon {
    color: #22c55e;
    font-size: 1.5rem;
  }

  .text {
    font-size: 0.9rem;
    color: #22c55e;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #a78bfa;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #a78bfa;
`;

const VastuConsultation = () => {
  const dispatch = useDispatch();
  const [quantity] = useState(1);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart/getServiceByID/vastu-consultation');
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch service:', error);
        setError(error.message);
        setLoading(false);
        // Use fallback data if API fails
        setService({
          id: 'vastu-consultation',
          name: 'Vastu Consultation Platinum',
          description: 'Transform your space into a haven of positive energy with our premium Vastu consultation service. Our certified experts will provide comprehensive analysis and personalized recommendations to enhance the harmony and prosperity of your environment.',
          price: 1000,
          originalPrice: 2000,
          discount: 50,
          rating: 4.8,
          reviewCount: 128,
          features: [
            {
              icon: 'FaClock',
              title: '60-Min Session',
              description: 'Detailed consultation'
            },
            {
              icon: 'FaVideo',
              title: 'Video Call',
              description: 'Face-to-face guidance'
            },
            {
              icon: 'FaFileAlt',
              title: 'Detailed Report',
              description: 'Written recommendations'
            },
            {
              icon: 'FaPhoneAlt',
              title: 'Follow-up Call',
              description: '30-day support'
            }
          ],
          image: '/assets/vastu-consultation.jpg'
        });
      }
    };

    fetchService();
  }, []);

  const handleAddToCart = () => {
    if (!service) return;

    dispatch(addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      quantity
    }));
    toast.success("Added to cart!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          Loading...
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>
          Error loading service. Please try again later.
        </ErrorContainer>
      </PageContainer>
    );
  }

  if (!service) {
    return (
      <PageContainer>
        <ErrorContainer>
          Service not found.
        </ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />

      <BreadcrumbNav>
        <a href="/">Home</a> / <a href="/services">Services</a> / {service.name}
      </BreadcrumbNav>
      
      <ProductContainer>
        <ImageSection>
          <ProductImage src={service.image} alt={service.name} />
        </ImageSection>

        <InfoSection>
          <div>
            <Title>{service.name}</Title>
            <Rating>
              <div className="stars">{renderStars(service.rating)}</div>
              <div className="count">({service.reviewCount} reviews)</div>
            </Rating>
          </div>

          <PriceSection>
            <Price>₹{service.price}</Price>
            <OriginalPrice>₹{service.originalPrice}</OriginalPrice>
            <Discount>{service.discount}% OFF</Discount>
          </PriceSection>

          <Description>{service.description}</Description>

          <Features>
            {service.features.map((feature, index) => (
              <FeatureCard key={index}>
                <div className="icon">
                  {feature.icon === 'FaClock' && <FaClock />}
                  {feature.icon === 'FaVideo' && <FaVideo />}
                  {feature.icon === 'FaFileAlt' && <FaFileAlt />}
                  {feature.icon === 'FaPhoneAlt' && <FaPhoneAlt />}
                </div>
                <div className="text">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </FeatureCard>
            ))}
          </Features>

          <ButtonGroup>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
            <Button
              variant="secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now
            </Button>
          </ButtonGroup>

          <Guarantee>
            <div className="icon">✓</div>
            <div className="text">
              100% Satisfaction Guaranteed or Full Refund within 7 days
            </div>
          </Guarantee>
        </InfoSection>
      </ProductContainer>
    </PageContainer>
  );
};

export default VastuConsultation;
