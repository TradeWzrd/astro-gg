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

const Star = styled.div.attrs(props => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    top: `${props.$top}vh`,
    left: `${props.$left}vw`,
    animationDuration: `${props.$duration}s`,
    animationDelay: `${props.$delay}s`,
    boxShadow: `0 0 ${props.$size * 2}px ${props.$size/2}px rgba(255, 255, 255, 0.3)`
  }
}))`
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.2;
  animation: ${twinkle} ease-in-out infinite;

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

const generateRandomStar = () => ({
  $top: Math.random() * 100,
  $left: Math.random() * 100,
  $size: Math.random() * 2 + 1, // 1-3px
  $duration: Math.random() * 3 + 2, // 2-5s
  $delay: Math.random() * 5 // 0-5s delay
});

const FlickeringStars = () => {
  // Generate stars for a dense sky
  const stars = Array.from({ length: 100 }, generateRandomStar);

  return (
    <StarContainer>
      {stars.map((star, index) => (
        <Star
          key={index}
          {...star}
        />
      ))}
    </StarContainer>
  );
};

export default FlickeringStars;
