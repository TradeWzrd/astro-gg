import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const HeroContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  margin-bottom: 2rem;
`;

const SolarSystem = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: scale(1.5);
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    transform: scale(0.9);
  }
`;

const Sun = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd200 0%, #f7971e 100%);
  box-shadow: 0 0 80px rgba(247, 151, 30, 0.8),
              0 0 120px rgba(247, 151, 30, 0.4);
  transform: translate(-50%, -50%);
`;

const createPlanetStyles = (orbitSize, planetSize, revolutionTime) => {
  const orbit = keyframes`
    from { transform: rotate(0deg) translateX(${orbitSize/2}px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(${orbitSize/2}px) rotate(-360deg); }
  `;

  return {
    Orbit: styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      height: ${orbitSize}px;
      width: ${orbitSize}px;
      margin-top: -${orbitSize/2}px;
      margin-left: -${orbitSize/2}px;
      animation: ${rotate} ${revolutionTime}s linear infinite;
      z-index: ${Math.floor(orbitSize)};
    `,
    Planet: styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      height: ${planetSize}px;
      width: ${planetSize}px;
      margin-top: -${planetSize/2}px;
      margin-left: -${planetSize/2}px;
      border-radius: 50%;
      background-color: #fff;
      animation: ${orbit} ${revolutionTime}s linear infinite;
    `
  };
};

// Planet configurations - Increased revolution times by 50% for more serene movement
const mercuryStyles = createPlanetStyles(100, 6, 4.35); 
const venusStyles = createPlanetStyles(140, 10, 11.1); 
const earthStyles = createPlanetStyles(200, 8, 18); 
const marsStyles = createPlanetStyles(260, 8, 33.75); 
const jupiterStyles = createPlanetStyles(420, 24, 213); 
const saturnStyles = createPlanetStyles(540, 16, 531); 
const uranusStyles = createPlanetStyles(640, 14, 1512); 
const neptuneStyles = createPlanetStyles(780, 14, 2965.5); 

const HeroContent = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  width: 100%;
  padding: 0 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: rgba(147, 51, 234, 0.3);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.2rem 2.8rem;
  border-radius: 9999px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background: rgba(147, 51, 234, 0.5);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(147, 51, 234, 0.3);
  }

  .icon {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StatBox = styled.div`
  text-align: center;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  animation-delay: ${props => props.delay}s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .number {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, #fff, #B6D5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 1rem;
    opacity: 0.9;
    letter-spacing: 1px;
  }

  .plus {
    color: #B6D5FF;
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>Celestial Guidance</Title>
        <Subtitle>Discover Your Path Through The Stars</Subtitle>
        <ButtonsContainer>
          <Button>
            Get Your Reading
            <span className="icon">✨</span>
          </Button>
          <Button>
            Learn More
            <span className="icon">🔮</span>
          </Button>
        </ButtonsContainer>

        <StatsContainer>
          <StatBox delay={0.3}>
            <div className="number">
              5000<span className="plus">+</span>
            </div>
            <div className="label">Happy Clients</div>
          </StatBox>

          <StatBox delay={0.4}>
            <div className="number">
              15<span className="plus">+</span>
            </div>
            <div className="label">Years Experience</div>
          </StatBox>

          <StatBox delay={0.5}>
            <div className="number">
              4000<span className="plus">+</span>
            </div>
            <div className="label">5-Star Reviews</div>
          </StatBox>
        </StatsContainer>
      </HeroContent>
      
      <SolarSystem>
        <Sun />
        
        <mercuryStyles.Orbit>
          <mercuryStyles.Planet style={{ background: '#b5b5b5' }} />
        </mercuryStyles.Orbit>

        <venusStyles.Orbit>
          <venusStyles.Planet style={{ background: '#ffd700' }} />
        </venusStyles.Orbit>

        <earthStyles.Orbit>
          <earthStyles.Planet style={{ background: '#4b67ff' }} />
        </earthStyles.Orbit>

        <marsStyles.Orbit>
          <marsStyles.Planet style={{ background: '#ff4b4b' }} />
        </marsStyles.Orbit>

        <jupiterStyles.Orbit>
          <jupiterStyles.Planet style={{ background: '#ffb04b' }} />
        </jupiterStyles.Orbit>

        <saturnStyles.Orbit>
          <saturnStyles.Planet style={{ background: '#f4d03f' }} />
        </saturnStyles.Orbit>

        <uranusStyles.Orbit>
          <uranusStyles.Planet style={{ background: '#4bffd3' }} />
        </uranusStyles.Orbit>

        <neptuneStyles.Orbit>
          <neptuneStyles.Planet style={{ background: '#4b67ff' }} />
        </neptuneStyles.Orbit>
      </SolarSystem>
    </HeroContainer>
  );
};

export default HeroSection;
