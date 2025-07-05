import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';
import { addItemToCart } from '../Redux/CartSlice';
import ViewMoreButton from './ViewMoreButton';

const SectionContainer = styled.section`
  padding: 6rem 2rem 3rem 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(18, 0, 47, 0) 0%, rgba(41, 0, 78, 0.1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  color: white;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  padding: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 300px);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 300px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ReportCard = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
  overflow: hidden;
  border-radius: 20px;
  
  @media (max-width: 400px) {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
    border: 1px solid rgba(167, 139, 250, 0.3);
    transition: all 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(109, 40, 217, 0.3) 100%);
  }
`;

const ContentContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const ReportTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ReportDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
  flex-grow: 1;
`;

const PriceTag = styled.div`
  font-size: 1.25rem;
  color: #a78bfa;
  font-weight: 600;
  margin-bottom: 1.5rem;
  
  &::before {
    content: 'Starting at';
    display: block;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.2
    }
  }
};

const reports = [
  {
    id: "num-life-path",
    title: "Life Path Number Analysis",
    description: "Discover your life's purpose and potential through your Life Path Number. Get detailed insights about your personality traits, career paths, and life lessons.",
    price: 6999,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "num-year-forecast",
    title: "Personal Year Forecast",
    description: "Understand the energies and opportunities of your current personal year cycle. Get month-by-month predictions and guidance for making the most of your year.",
    price: 5499,
    image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "num-name-analysis",
    title: "Name Analysis Report",
    description: "Learn how your name influences your life. Get insights into your Expression, Soul Urge, and Personality numbers and how they shape your destiny.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1567767330332-9d66810dcdaf?w=500&auto=format&fit=crop&q=60"
  }
];

const NumerologyReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  // Handle adding report to cart
  const handleAddToCart = (report) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    
    dispatch(addItemToCart({
      productId: report.id,
      quantity: 1
    }));
  };
  return (
    <SectionContainer>
      <Title>Numerology Reports</Title>
      <Subtitle>
        Unlock the hidden meanings in your numbers and discover your life's path
      </Subtitle>
      <ReportsGrid>
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            variants={cardVariants}
            custom={index}
          >
            <ImageContainer>
              <img src={report.image} alt={report.title} />
            </ImageContainer>
            <ContentContainer>
              <ReportTitle>{report.title}</ReportTitle>
              <ReportDescription>{report.description}</ReportDescription>
              <PriceTag>₹{report.price.toLocaleString('en-IN')}</PriceTag>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(report)}
              >
                <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
              </Button>
            </ContentContainer>
          </ReportCard>
        ))}
      </ReportsGrid>
      <ButtonContainer>
        <ViewMoreButton to="/astrology">View All Reports</ViewMoreButton>
      </ButtonContainer>
    </SectionContainer>
  );
};

export default NumerologyReports;
