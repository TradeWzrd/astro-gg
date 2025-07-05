import React from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px 0px rgba(255, 255, 255, 0.8),
                0 0 30px 5px rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 25px 3px rgba(255, 255, 255, 0.9),
                0 0 50px 8px rgba(255, 255, 255, 0.5);
  }
`;

const shootingStar = keyframes`
  0% {
    transform: translate(0, 0) rotate(-45deg) scale(0);
    opacity: 0;
  }
  5% {
    transform: translate(0, 0) rotate(-45deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-200vh, 200vh) rotate(-45deg) scale(0.2);
    opacity: 0;
  }
`;

const StarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1; /* Restored original value */
  overflow: hidden;
`;

const Star = styled.div.attrs(props => ({
  style: {
    top: `${props.$top}vh`,
    right: `${props.$right}vw`,
    animationDuration: `${props.$duration}s`,
    animationDelay: `${props.$delay}s`
  }
}))`
  position: absolute;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,1) 0%,
    rgba(255,255,255,0.8) 20%,
    rgba(255,255,255,0) 100%
  );
  animation: ${shootingStar} linear infinite;
  opacity: 0;
  transform-origin: right;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: white;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    animation: ${glow} 2s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255,255,255,0.3) 0%,
      rgba(255,255,255,0.1) 50%,
      rgba(255,255,255,0) 100%
    );
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const generateRandomPosition = () => ({
  $top: Math.random() * 100, // 0-100vh
  $right: Math.random() * 30 - 10, // -10 to 20vw (starts slightly off-screen)
  $duration: Math.random() * 3 + 5, // 5-8 seconds
  $delay: Math.random() * 30 // 0-30 seconds delay
});

const ShootingStars = () => {
  const stars = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    ...generateRandomPosition()
  }));

  return (
    <StarContainer>
      {stars.map(star => (
        <Star key={star.id} {...star} />
      ))}
    </StarContainer>
  );
};

export default ShootingStars;
