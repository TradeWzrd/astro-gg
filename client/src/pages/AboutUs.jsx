import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaHeart, FaLightbulb, FaUsers, FaStar, FaMoon, FaSun } from "react-icons/fa";
import GlassyNav from "../components/GlassyNav";
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  color: white;
  padding: 12rem 2rem 2rem;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #B6D5FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const Section = styled(motion.section)`
  margin: 4rem 0;
  animation: ${fadeIn} 1s ease-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(182, 213, 255, 0.5);
    box-shadow: 0 8px 32px rgba(182, 213, 255, 0.2);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #B6D5FF;
  text-align: center;
  
  svg {
    filter: drop-shadow(0 0 10px rgba(182, 213, 255, 0.3));
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #FFFFFF;
  text-align: center;
`;

const CardText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
`;

const TeamSection = styled(Section)`
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const TeamMember = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 3px solid #B6D5FF;
  }
`;

const StarsContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  animation: twinkle ${props => props.duration}s infinite;

  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity}; }
    50% { opacity: 0.2; }
  }
`;

const AboutUs = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <GlassyNav />
      <PageWrapper>
        <StarsContainer>
          <ShootingStars />
          <FlickeringStars />
        </StarsContainer>
        <Container>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </Title>

          <Section>
            <Grid>
              <Card
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <IconWrapper>
                  <FaLightbulb />
                </IconWrapper>
                <CardTitle>Our Vision</CardTitle>
                <CardText>
                  To illuminate paths through ancient wisdom, helping individuals discover their cosmic purpose and potential through astrology, numerology, and vastu shastra.
                </CardText>
              </Card>

              <Card
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <IconWrapper>
                  <FaHeart />
                </IconWrapper>
                <CardTitle>Our Mission</CardTitle>
                <CardText>
                  To provide authentic and transformative astrological guidance, empowering people to make informed decisions and live in harmony with their cosmic destiny.
                </CardText>
              </Card>

              <Card
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <IconWrapper>
                  <FaUsers />
                </IconWrapper>
                <CardTitle>Our Values</CardTitle>
                <CardText>
                  Integrity, authenticity, and compassion guide our practice. We believe in making ancient wisdom accessible while maintaining its sacred essence.
                </CardText>
              </Card>
            </Grid>
          </Section>

          <TeamSection>
            <Title
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our Expert Team
            </Title>
            <TeamGrid>
              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <IconWrapper>
                  <FaSun />
                </IconWrapper>
                <CardTitle>Dr. Rajesh Kumar</CardTitle>
                <CardText>
                  Expert Astrologer with 20+ years of experience in Vedic Astrology and Numerology.
                </CardText>
              </TeamMember>

              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <IconWrapper>
                  <FaMoon />
                </IconWrapper>
                <CardTitle>Mrs. Priya Sharma</CardTitle>
                <CardText>
                  Specialist in Vastu Shastra and Feng Shui with expertise in modern home and office design principles.
                </CardText>
              </TeamMember>

              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <IconWrapper>
                  <FaStar />
                </IconWrapper>
                <CardTitle>Mr. Arun Verma</CardTitle>
                <CardText>
                  Numerologist and Tarot Reader with deep understanding of cosmic energies and life path numbers.
                </CardText>
              </TeamMember>
            </TeamGrid>
          </TeamSection>
        </Container>
      </PageWrapper>
    </>
  );
};

export default AboutUs;
