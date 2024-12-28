import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #1c1c3d, #4b0082);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  color: #ffcc00;
  font-weight: bold;
`;

const BackButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #4b0082;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #6c63ff;
    transform: scale(1.1);
  }
`;

const AstrologyDetails = () => {
  const { id } = useParams(); // Capture the dynamic ID from the URL
  const navigate = useNavigate();

  // Services array (should match the one used in the carousel)
  const services = [
    { id: 1, title: "Fitness", description: "Stay fit with personalized plans.", price: 199.99 },
    { id: 2, title: "Meditation", description: "Achieve peace with guided sessions.", price: 149.99 },
    { id: 3, title: "Yoga", description: "Boost flexibility and strength.", price: 249.99 },
  ];

  // Find the service by ID
  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    return (
      <PageContainer>
        <Title>Service Not Found</Title>
        <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>{service.title}</Title>
      <Description>{service.description}</Description>
      <Price>Price: ${service.price}</Price>
      <BackButton onClick={() => navigate(-1)}>Back to Services</BackButton>
    </PageContainer>
  );
};

export default AstrologyDetails;
