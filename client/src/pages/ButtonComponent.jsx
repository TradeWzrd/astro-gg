import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Keyframes for the bubble animation
const bubble = keyframes`
  0% {
    transform: translateY(100%) scale(1); /* Start from the bottom */
    opacity: 0.7;
  }
  50% {
    transform: translateY(-40px) scale(1.2); /* Move upwards */
    opacity: 0.5;
  }
  100% {
    transform: translateY(-80px) scale(0.8); /* End near the top */
    opacity: 0;
  }
`;
// Styled Button Component with navy blue gradient background
const Button = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(45deg, #001f3d, #003366, #004b8d); /* Navy blue gradient */
  color: white;
  font-weight: bold;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Optional: adds some depth to the button */

  &:hover p {
    color: #00b0ff; /* Change text color on hover */
  }
`;


// Styled bubble element with random position and animation
const Bubble = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${bubble} 5s ease-in-out infinite;
  width: ${(props) => `${props.size}px`}; /* Use passed size */
  height: ${(props) => `${props.size}px`}; /* Use passed size */
  left: ${(props) => `${props.left}%`};
  bottom: ${(props) => `${props.bottom}%`};
  animation-delay: ${(props) => `${props.delay}s`};
`;

// Text inside the button
const ButtonText = styled.p`
  font-size: 16px;
  color: white; /* Default text color */
  transition: color 0.3s ease;

  &:hover {
    color: #00b0ff; /* Hover text color */
  }
`;

const ButtonComponent = ({ itemId }) => {
  const nav = useNavigate();

  // Handle click to navigate
  const handleCardClick = (id) => {
    nav(`/product/${id}`); // Navigate dynamically with itemId
  };

  // Generate random values for the bubbles
  const randomBubbles = Array.from({ length: 6 }).map(() => ({
    size: Math.random() * 15 + 5, // Random size
    left: Math.random() * 100, // Random left position
    bottom: Math.random() * 100, // Random bottom position
    delay: Math.random() * 2, // Random animation delay
  }));

  return (
    <Button rel="noopener" onClick={() => handleCardClick(itemId)}>
      {/* Bubble elements with dynamic random properties */}
      {randomBubbles.map((bubbleProps, index) => (
        <Bubble key={index} {...bubbleProps} />
      ))}
      <ButtonText>Get started</ButtonText>
    </Button>
  );
};

export default ButtonComponent;
