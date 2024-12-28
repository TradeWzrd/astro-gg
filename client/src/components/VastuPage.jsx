import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import vastuServices from './vastuArray';
import { FaPlus, FaMinus } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #2D1B69 0%, #1a103f 50%, #0F051D 100%);
  padding: 120px 20px 40px;
  color: white;
`;

const ServiceGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  }
`;

const ServiceTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FAQSection = styled.div`
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: ${props => props.isOpen ? '0.5rem' : '0'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0 0 10px 10px;
  margin-top: -5px;
`;

const PriceTag = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #B6D5FF;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #B6D5FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FAQItem>
      <FAQQuestion onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <span>{question}</span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </FAQQuestion>
      {isOpen && (
        <FAQAnswer
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </FAQAnswer>
      )}
    </FAQItem>
  );
};

const VastuPage = () => {
  return (
    <PageContainer>
      <PageTitle>Vastu Services</PageTitle>
      <ServiceGrid>
        {vastuServices.map((service, index) => (
          <ServiceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ServiceTitle>{service.serviceName}</ServiceTitle>
            <Description>{service.description}</Description>
            <PriceTag>{service.pricing}</PriceTag>
            <FAQSection>
              {service.faqs.map((faq, faqIndex) => (
                <FAQ key={faqIndex} question={faq.question} answer={faq.answer} />
              ))}
            </FAQSection>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </PageContainer>
  );
};

export default VastuPage;
