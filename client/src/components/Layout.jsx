import React from 'react';
import styled from 'styled-components';
import GlassyNav from './GlassyNav';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
<<<<<<< HEAD
  /* Use padding-top to create space for the navbar */
  padding-top: 100px; /* Adjust based on navbar height */
  transition: padding-top 0.3s ease;

  @media (max-width: 768px) {
    padding-top: 80px; /* Slightly less padding on mobile */
  }
  
  &.with-alternate-padding {
    padding-top: 0; /* For pages that handle their own padding */
  }
`;

const Layout = ({ children, alternateSpacing = false }) => {
  return (
    <LayoutContainer>
      <GlassyNav />
      <MainContent className={alternateSpacing ? 'with-alternate-padding' : ''}>
=======
  padding-top: 160px; // Account for fixed GlassyNav
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <GlassyNav />
      <MainContent>
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
