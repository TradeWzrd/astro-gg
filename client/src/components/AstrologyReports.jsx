import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaMoon, FaChartLine, FaHeart, FaSun, FaUserFriends } from 'react-icons/fa';

const SectionContainer = styled.section`
  padding: 8rem 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(18, 0, 47, 0) 0%, rgba(41, 0, 78, 0.1) 100%);
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ReportCard = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 350px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  border-radius: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
    border: 1px solid rgba(167, 139, 250, 0.3);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: rgba(167, 139, 250, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  &:hover::before {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(109, 40, 217, 0.3) 100%);
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(109, 40, 217, 0.2);
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
  flex: 1;
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
  flex: 1;
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

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const reports = [
  {
    icon: <FaStar />,
    title: "Comprehensive Birth Chart Report",
    description: "Get a detailed 20+ page analysis of your birth chart, including planetary positions, houses, aspects, and life path predictions. Understand your core personality, strengths, and potential challenges.",
    price: "$149",
    buttonText: "Get Full Report",
  },
  {
    icon: <FaChartLine />,
    title: "Yearly Forecast Report",
    description: "A thorough analysis of your year ahead with monthly breakdowns. Covers career, relationships, finances, and personal growth through transit and progression analysis.",
    price: "$129",
    buttonText: "See Your Year Ahead",
  },
  {
    icon: <FaHeart />,
    title: "Relationship Compatibility Report",
    description: "In-depth synastry analysis comparing two birth charts. Understand relationship dynamics, strengths, challenges, and long-term potential through astrological compatibility.",
    price: "$99",
    buttonText: "Check Compatibility",
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
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const AstrologyReports = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Astrology Reports
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Discover deep insights about your life path through our detailed astrological reports
      </Subtitle>
      <ReportsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {reports.map((report, index) => (
          <ReportCard
            key={report.title}
            variants={cardVariants}
            custom={index}
          >
            <ImageContainer>
              {report.icon}
            </ImageContainer>
            <ContentContainer>
              <ReportTitle>{report.title}</ReportTitle>
              <ReportDescription>{report.description}</ReportDescription>
              <PriceTag>{report.price}</PriceTag>
              <ButtonContainer>
                <Button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {report.buttonText}
                </Button>
              </ButtonContainer>
            </ContentContainer>
          </ReportCard>
        ))}
      </ReportsGrid>
    </SectionContainer>
  );
};

export default AstrologyReports;
