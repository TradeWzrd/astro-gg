import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../pages/ButtonComponent";

const CardWidth = "18rem";
const CardHeight = "18rem";
const MobileCardWidth = "14rem";
const MobileCardHeight = "14rem";

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${CardWidth};
  margin: 0 1.5rem;
  background: rgba(46, 13, 87, 0.5);
  border-radius: 1.5rem;
  padding: 0;
  height: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: ${MobileCardWidth};
    margin: 0 1rem;
  }
`;

const TriangleCard = styled.div`
  width: 100%;
  height: ${CardHeight};
  background: transparent;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  text-align: center;
  padding-bottom: 2rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  border-radius: 1.5rem 1.5rem 0 0;

  .title {
    font-size: 1.5rem;
    letter-spacing: 1px;
    padding: 0 1rem;
  }

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: ${MobileCardHeight};
    .title {
      font-size: 1.2rem;
    }
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  min-height: 8rem;
  padding: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceContainer = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin: 1rem 0;
  
  &::before {
    content: '$';
  }
`;

const StyledButton = styled.button`
  background: rgba(106, 13, 173, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem 0 2rem 0;
  width: 80%;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(106, 13, 173, 0.5);
    transform: translateY(-2px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
`;

const SliderContainer = styled.div`
  display: flex;
  transition: transform 1s ease-in-out;
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  min-width: 100%;
  padding: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
  font-size: 1.2rem;
`;

const TriangularCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const groupSize = 3;

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

  const groupedServices = [];
  for (let i = 0; i < services.length; i += groupSize) {
    groupedServices.push(services.slice(i, i + groupSize));
  }

  const handleCardClick = (serviceName) => {
    navigate(`/product/${serviceName}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(services.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [services]);

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const getButtonText = (title) => {
    if (title.includes('Birth')) return 'Get Your Report';
    if (title.includes('Transit')) return 'See Your Future';
    return 'Check Compatibility';
  };

  return (
    <Wrapper>
      <SliderContainer
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item) => (
              <ServiceCard key={item.id}>
                <TriangleCard onClick={() => handleCardClick(item.id)}>
                  <div className="title">{item.title.toUpperCase()}</div>
                </TriangleCard>
                <DescriptionContainer>
                  {item.description}
                </DescriptionContainer>
                <PriceContainer>
                  {item.price}
                </PriceContainer>
                <StyledButton onClick={() => handleCardClick(item.id)}>
                  {getButtonText(item.title)}
                </StyledButton>
              </ServiceCard>
            ))}
          </Slide>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

export default TriangularCarousel;
