import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHashtag, FaInfinity, FaCompass } from 'react-icons/fa';

const SectionContainer = styled.section`
  padding: 8rem 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(18, 0, 47, 0) 0%, rgba(41, 0, 78, 0.1) 100%);
  min-height: 100vh;
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
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  height: 100%;
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
  height: 100%;
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
    icon: <FaHashtag />,
    title: "Life Path Number Analysis",
    description: "Discover your core life purpose and destiny through a comprehensive birth date analysis. Understand your personality traits, strengths, and life lessons through numerology.",
    price: "$99",
    buttonText: "Get Your Number",
  },
  {
    icon: <FaInfinity />,
    title: "Yearly Numerology Forecast",
    description: "Get detailed predictions for your personal year cycles. Learn about upcoming opportunities, challenges, and the best timing for major life decisions.",
    price: "$79",
    buttonText: "See Your Year",
  },
  {
    icon: <FaCompass />,
    title: "Name Numerology Report",
    description: "Analyze the vibrational energy of your name and its influence on your life. Includes destiny number, soul urge number, and personality number interpretations.",
    price: "$69",
    buttonText: "Analyze Name",
  }
];

const NumerologyReports = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Numerology Reports
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Unlock the hidden meanings in your numbers and discover your life's path
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
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {report.buttonText}
              </Button>
            </ContentContainer>
          </ReportCard>
        ))}
      </ReportsGrid>
    </SectionContainer>
  );
};

export default NumerologyReports;
