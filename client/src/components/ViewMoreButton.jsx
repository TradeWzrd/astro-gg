import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledButton = styled(motion(Link))`
  display: inline-block;
  padding: 0.8rem 2rem;
  margin-top: 2rem;
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 30px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(167, 139, 250, 0.2);
    transform: translateY(-2px);
  }
`;

const ViewMoreButton = ({ to, children }) => {
  return (
    <StyledButton
      to={to}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </StyledButton>
  );
};

export default ViewMoreButton;
