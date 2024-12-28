import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #12002f 0%, #29004e 50%, #3e32c6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSymbol = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid transparent;
  }

  &::before {
    width: 100%;
    height: 100%;
    border-top-color: #a78bfa;
    border-right-color: #a78bfa;
    animation: rotate 1.5s linear infinite;
  }

  &::after {
    width: 75%;
    height: 75%;
    border-bottom-color: #fff;
    border-left-color: #fff;
    animation: rotate 1s linear infinite reverse;
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const LoadingText = styled(motion.p)`
  position: absolute;
  bottom: 30%;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingSymbol />
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Connecting with the cosmos...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen;
