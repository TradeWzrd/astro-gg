import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isLoaded ? 1 : 0};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isLoaded ? 0 : 1};
`;

const LazyImage = ({ src, alt, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    // Create new image object
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <ImageContainer height={height}>
      <StyledImage
        src={currentSrc}
        alt={alt}
        isLoaded={isLoaded}
      />
      <Placeholder isLoaded={isLoaded} />
    </ImageContainer>
  );
};

export default LazyImage;
