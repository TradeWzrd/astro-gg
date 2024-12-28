import React from "react";
import styled from "styled-components";
import Numrology from '../components/DownwardTriangle'; // Your existing Numrology component

// Create a StyledContainer with the same background as in Home.jsx
const StyledContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue background */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
  position: relative; /* Necessary for absolute positioning of stars */
  overflow: hidden;

  /* Add animated stars in the background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 0;
    pointer-events: none;
  }

  /* Generate stars with animation */
  .star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 3s infinite alternate;
    z-index: 0;
  }

  @keyframes twinkle {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;

// Function to generate random stars
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push(
      <div
        key={i}
        className="star"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 3}s`, // Random durations for twinkle
          animationDelay: `${Math.random() * 2}s`, // Random delays for twinkle
        }}
      ></div>
    );
  }
  return stars;
};

const NumerologyPage = () => {
  return (
    <StyledContainer>
      {generateStars()} {/* Add stars to the background */}
      <Numrology /> {/* Your existing Numrology component */}
    </StyledContainer>
  );
};

export default NumerologyPage;
