import React from 'react';
import styled, { keyframes } from 'styled-components';

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: white;
  border-radius: 50%;
  top: ${props => props.top}vh;
  left: ${props => props.left}vw;
  animation: ${twinkle} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.2;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size/2}px rgba(255, 255, 255, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: linear-gradient(to bottom right, rgba(255,255,255,0.8), transparent);
    border-radius: 50%;
  }
`;

const generateRandomStar = () => {
  return {
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1, // 1-3px
    duration: Math.random() * 3 + 2, // 2-5s
    delay: Math.random() * 5 // 0-5s delay
  };
};

const FlickeringStars = () => {
  // Generate more stars for a denser sky
  const stars = Array.from({ length: 100 }, () => generateRandomStar());

  return (
    <StarContainer>
      {stars.map((star, index) => (
        <Star
          key={index}
          top={star.top}
          left={star.left}
          size={star.size}
          duration={star.duration}
          delay={star.delay}
        />
      ))}
    </StarContainer>
  );
};

export default FlickeringStars;
