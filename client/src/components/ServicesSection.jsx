import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addItemToCart } from '../Redux/CartSlice';
import ViewMoreButton from './ViewMoreButton';

const SectionContainer = styled.section`
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(180deg, rgba(18, 0, 47, 0) 0%, rgba(41, 0, 78, 0.1) 100%);
  contain: content;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  contain: content;
`;

const SectionSubtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 8rem;
  contain: content;
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  contain: content;
  
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

const ServiceCardWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 220px;
  margin-bottom: 1rem;
  contain: content;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  height: 200px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 2;
  margin-bottom: 30px;
  
  @media (max-width: 400px) {
    width: 200px;
    height: 160px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transform: rotate(180deg) scale(1.5);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: rotate(180deg) scale(1.6);
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
    border: 1px solid rgba(167, 139, 250, 0.3);
    transition: all 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(109, 40, 217, 0.3) 100%);
  }
`;

const ServiceCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  z-index: 1;
  margin-top: 30px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  flex-grow: 1;
  text-align: center;
`;

const Price = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
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

const services = [
  {
    id: "birth-chart-analysis",
    title: "Comprehensive Birth Chart Analysis",
    description: "Get a detailed analysis of your natal chart, including planetary positions, aspects, and houses. Understand your personality traits, strengths, and life path through Vedic astrology.",
    price: 9999,  // Price in Rupees
    buttonText: "Add to Cart",
    image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60" // Celestial image
  },
  {
    id: "yearly-transit",
    title: "Yearly Transit Forecast",
    description: "Discover what the stars have planned for your year ahead. Get detailed predictions about career, relationships, health, and finances based on planetary transits and dashas.",
    price: 8499,  // Price in Rupees
    buttonText: "Add to Cart",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&auto=format&fit=crop&q=60" // Night sky with stars
  },
  {
    id: "relationship-compatibility",
    title: "Relationship Compatibility",
    description: "Discover how compatible you are with your partner based on your birth charts. Get insights into your relationship dynamics, strengths, challenges, and growth opportunities.",
    price: 6999,  // Price in Rupees
    buttonText: "Add to Cart",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&auto=format&fit=crop&q=60" // Galaxy image
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ServicesSection = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Handle add to cart functionality
  const handleAddToCart = (service) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    
    dispatch(addItemToCart({
      productId: service.id,
      quantity: 1
    }));
    
    // We don't need to show toast here since the thunk already handles it
  };
  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What We Offer
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Explore our specialized astrological services designed to illuminate your path
      </SectionSubtitle>
      <ServicesGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <ServiceCardWrapper
            key={service.title}
            variants={cardVariants}
            custom={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <IconContainer>
              <img 
                src={service.image} 
                alt={service.title}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNDAgNTBINjBNNTAgNDBWNjAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'; // Placeholder SVG
                }}
              />
            </IconContainer>
            <ServiceCard>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <Price>₹{service.price.toLocaleString('en-IN')}</Price>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(service)}
              >
                {service.buttonText}
              </Button>
            </ServiceCard>
          </ServiceCardWrapper>
        ))}
      </ServicesGrid>
      <ButtonContainer>
        <ViewMoreButton to="/vastu">View All Services</ViewMoreButton>
      </ButtonContainer>
    </SectionContainer>
  );
});

export default ServicesSection;
