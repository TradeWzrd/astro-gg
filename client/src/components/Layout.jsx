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
  padding-top: 160px; // Account for fixed GlassyNav
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <GlassyNav />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
