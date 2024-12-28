import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 6rem 0;
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

const ServiceCardWrapper = styled(motion.div)`
  position: relative;
  padding-top: 8rem;
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(180deg);
  width: 100%;
  height: 220px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
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
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
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

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 500px; /* Fixed height for all cards */
  max-width: 400px; /* Max width to maintain consistency */
  width: 100%; /* Full width within container */
  box-sizing: border-box;
  justify-content: space-between; /* Distribute content evenly */

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  min-height: 60px; /* Ensure consistent title height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  flex-grow: 1; /* Allow description to take available space */
  display: flex;
  align-items: center;
  text-align: center;
  min-height: 120px; /* Consistent minimum height */
`;

const ServicePrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #B6D5FF;
  margin-bottom: 1.5rem;
`;

const ServiceButton = styled.button`
  background: rgba(147, 51, 234, 0.3);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem; /* Reduced padding */
  border-radius: 9999px;
  font-size: 1rem; /* Slightly smaller font */
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px; /* Reduced max-width */
  align-self: center;

  &:hover {
    background: rgba(147, 51, 234, 0.5);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(147, 51, 234, 0.3);
  }
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AdditionalServices = () => {
  const services = [
    {
      title: "Vastu Consultation ",
      description: "Get expert guidance on harmonizing your living or workspace through ancient Vastu principles. Our consultation includes detailed analysis and practical recommendations.",
      price: "$199",
      buttonText: "Book Consultation",
      image: "/images/vastu.jpg"
    },
    {
      title: "Gemstone Recommendation",
      description: "Discover the perfect gemstones aligned with your birth chart. Includes detailed analysis of suitable stones and their benefits for your specific case.",
      price: "$79",
      buttonText: "Get Recommendations",
      image: "/images/gemstone.jpg"
    },
    {
      title: "Career Guidance",
      description: "Get astrological insights into your career path, including favorable periods for changes, business ventures, and professional growth opportunities.",
      price: "$149",
      buttonText: "Explore Career Path",
      image: "/images/career.jpg"
    }
  ];

  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Additional Services
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Explore our specialized services designed to enhance your life's harmony
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
            key={index}
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
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPHBhdGggZD0iTTM1IDM1SDY1VjY1SDM1VjM1WiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNNDAgNTBINjBNNTAgNDBWNjAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+';
                }}
              />
            </IconContainer>
            <ServiceCard>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServicePrice>{service.price}</ServicePrice>
              <ServiceButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.buttonText}
              </ServiceButton>
            </ServiceCard>
          </ServiceCardWrapper>
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
};

export default AdditionalServices;
