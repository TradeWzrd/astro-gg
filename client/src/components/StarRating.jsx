import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  color: #FFD700;
  gap: 2px;
`;

const RatingText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-left: 4px;
`;

const StarRating = ({ rating }) => {
  return (
    <StarsContainer>
      <StarsWrapper>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={16}
            style={{
              opacity: index < rating ? 1 : 0.3
            }}
          />
        ))}
      </StarsWrapper>
      <RatingText>{rating}/5</RatingText>
    </StarsContainer>
  );
};

export default StarRating;
