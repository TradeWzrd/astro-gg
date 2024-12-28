import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../pages/ButtonComponent";

// Styled components for the square card
const Square = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin: 2rem;

  &:hover {
    transform: scale(1.05);
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

const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 18rem;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  display: flex;
  transition: transform 1s ease-in-out;
`;

const Slide = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex: 1;
`;

const SquareCarousel = () => {
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
          (service) => service.id >= 15 && service.id <= 19
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

  const handleCardClick = (serviceId) => {
    navigate(`/product/${serviceId}`); // Navigate using the service ID
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
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <SliderContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item) => (
              <div key={item.id} className="flex flex-col items-center cursor-pointer">
                <Square onClick={() => handleCardClick(item?.id)}>
                  {item?.title ? item.title.toUpperCase() : "No Service Name"}
                </Square>
                <DescriptionContainer className="line-clamp-2">{item?.description}</DescriptionContainer>
                <ButtonComponent itemId={item.id}>
                BOOK NOW
              </ButtonComponent>
              </div>
            ))}
          </Slide>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

export default SquareCarousel;
