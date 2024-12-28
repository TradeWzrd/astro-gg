import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(180deg, rgba(18, 0, 47, 0) 0%, rgba(41, 0, 78, 0.1) 100%);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 8rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCardWrapper = styled(motion.div)`
  position: relative;
  padding-top: 8rem;
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 220px;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  z-index: 2;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    z-index: -1;
    filter: blur(1px);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, 
      rgba(0,0,0,0.2),
      rgba(0,0,0,0.1)
    );
    z-index: 1;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  width: 100%;
  position: relative;
  margin-top: 0;
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

const services = [
  {
    title: "Comprehensive Birth Chart Analysis",
    description: "Get a detailed analysis of your natal chart, including planetary positions, aspects, and houses. Understand your personality traits, strengths, and life path through Vedic astrology.",
    price: "$149",
    buttonText: "Get Your Report",
    image: "/images/birth-chart.jpg" 
  },
  {
    title: "Yearly Transit Forecast",
    description: "Discover what the stars have planned for your year ahead. Get detailed predictions about career, relationships, health, and finances based on planetary transits and dashas.",
    price: "$129",
    buttonText: "See Your Future",
    image: "/images/transit-forecast.jpg"
  },
  {
    title: "Relationship Compatibility",
    description: "Discover what the stars have planned for your year ahead. Get detailed predictions about career, relationships, health, and finances based on planetary transits and dashas.",
    price: "$99",
    buttonText: "Check Compatibility",
    image: "/images/compatibility.jpg"
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

const ServicesSection = () => {
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
              <Price>{service.price}</Price>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.buttonText}
              </Button>
            </ServiceCard>
          </ServiceCardWrapper>
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
};

export default ServicesSection;
