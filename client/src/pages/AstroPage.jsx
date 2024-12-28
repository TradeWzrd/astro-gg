import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

// Styled Component for the stars animation
const HomeContainer = styled.div`
  background: linear-gradient(to bottom, #12002f, #29004e, #3e32c6);
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Create animated stars */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1; 
    pointer-events: none;
  }

  /* Create multiple animated stars */
  .star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 3s infinite alternate;
  }

  /* Randomize positions and opacity of stars */
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

  /* Generate random stars */
  .star:nth-child(1) {
    top: 20%; left: 15%; animation-duration: 4s;
  }
  .star:nth-child(2) {
    top: 40%; left: 30%; animation-duration: 5s;
  }
  .star:nth-child(3) {
    top: 60%; left: 45%; animation-duration: 6s;
  }
  .star:nth-child(4) {
    top: 70%; left: 60%; animation-duration: 7s;
  }
  .star:nth-child(5) {
    top: 30%; left: 80%; animation-duration: 8s;
  }

  /* Add more stars if needed */
`;

// Triangle Card Component
const TriangleCard = styled.div`
  width: 18rem;
  height: 18rem;
  background: transparent;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  border: 2px solid #6a0dad;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  margin: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    width: 16rem;
    height: 16rem;
  }

  @media (max-width: 1024px) {
    width: 15rem;
    height: 15rem;
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
  }

  @media (max-width: 480px) {
    width: 12rem;
    height: 12rem;
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 18rem;

  @media (max-width: 1200px) {
    width: 16rem;
  }

  @media (max-width: 1024px) {
    width: 15rem;
  }

  @media (max-width: 768px) {
    width: 14rem;
  }

  @media (max-width: 480px) {
    width: 12rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #5a0071;
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Component for the page
const TriangleCardPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cart/getService")
      .then((response) => {
        const filteredServices = response.data.filter(
          (service) => service.id >= 6 && service.id <= 14
        );
        setServices(filteredServices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeContainer>
      {[...Array(500)].map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 3}s`, // Random durations
            animationDelay: `${Math.random() * 2}s` // Random delays
          }}
        />
      ))}
      <Wrapper>
        {services.map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <TriangleCard onClick={() => handleCardClick(item.id)}>
              <div>{item.title.toUpperCase()}</div>
            </TriangleCard>
            <DescriptionContainer>{item.description}</DescriptionContainer>
            <Button onClick={() => handleCardClick(item.id)}>BOOK NOW</Button>
          </div>
        ))}
      </Wrapper>
    </HomeContainer>
  );
};

export default TriangleCardPage;
