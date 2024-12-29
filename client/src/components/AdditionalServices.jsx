import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionContainer = styled.section`
  padding: 3rem 0 6rem 0;
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

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  
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
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  height: 200px;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  z-index: 2;
  margin-bottom: 20px;
  
  @media (max-width: 400px) {
    width: 200px;
    height: 160px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transform: scale(1.5);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.6);
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
  align-items: center;
  justify-content: center;
  text-align: center;
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
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  text-align: center;
  max-width: 90%;
`;

const ServicePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #A78BFA;
  margin: 1rem 0;
  text-align: center;
`;

const ServiceButton = styled.button`
  background: rgba(167, 139, 250, 0.1);
  color: #A78BFA;
  border: 1px solid rgba(167, 139, 250, 0.5);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    background: rgba(167, 139, 250, 0.2);
    border-color: #A78BFA;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const ViewMoreButton = styled(Link)`
  background: rgba(167, 139, 250, 0.1);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
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
      title: "Vastu Consultation",
      description: "Get expert guidance on harmonizing your living or workspace through ancient Vastu principles. Our consultation includes detailed analysis and practical recommendations.",
      price: "$199",
      buttonText: "Book Consultation",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
    },
    {
      title: "Gemstone Recommendation",
      description: "Discover the perfect gemstones aligned with your birth chart. Includes detailed analysis of suitable stones and their benefits for your specific case.",
      price: "$79",
      buttonText: "Get Recommendations",
      image: "https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg"
    },
    {
      title: "Career Guidance",
      description: "Get astrological insights into your career path, including favorable periods for changes, business ventures, and professional growth opportunities.",
      price: "$149",
      buttonText: "Get Career Guidance",
      image: "https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg"
    }
  ];

  return (
    <SectionContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Additional Services
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore our specialized astrological services tailored to your needs
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <IconContainer>
              <img 
                src={service.image} 
                alt={service.title}
                loading="lazy"
              />
            </IconContainer>
            <ServiceCard>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServicePrice>Starting at {service.price}</ServicePrice>
              <ServiceButton>{service.buttonText}</ServiceButton>
            </ServiceCard>
          </ServiceCardWrapper>
        ))}
      </ServicesGrid>

      <ButtonContainer>
        <ViewMoreButton to="/services">View All Services</ViewMoreButton>
      </ButtonContainer>
    </SectionContainer>
  );
};

export default AdditionalServices;
