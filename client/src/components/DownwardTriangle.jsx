import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import ButtonComponent from "../pages/ButtonComponent";

// Styled Components for Downward Triangle Carousel
const DownwardTriangle = styled.div`
  width: 18rem;
  height: 18rem;
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent for glass effect */
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3); /* Subtle border for depth */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 2rem;
  &:hover {
    transform: translateY(-10px); /* Lift effect on hover */
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
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

  @media (max-width: 768px) {
    width: 14rem;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  justify-content: center; /* Center items horizontally */
  gap: 2rem; /* Space between items */
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically for smaller screens */
    align-items: center; /* Center items */
    gap: 1.5rem;
  }
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
  justify-content: center; /* Ensure cards are centered */
  gap: 2rem; /* Space between cards */
`;

const DownwardCarousel = () => {
  const navigate = useNavigate();
  const groupSize = 3; // Number of items per slide
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state for API

  // Fetch services from the API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cart/getService")
      .then((response) => {
        // Filter services with IDs between 24 and 27
        const filteredServices = response.data.filter(
          (service) => service.id >= 24 && service.id <= 27
        );
        setServices(filteredServices); // Store filtered services in state
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  // Group services into chunks of 'groupSize'
  const groupedServices = [];
  for (let i = 0; i < services.length; i += groupSize) {
    groupedServices.push(services.slice(i, i + groupSize));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(services.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds for each slide

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [services]);

  const handleBookNow = (item) => {
    navigate(`/product/${item.id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  return (
    <Wrapper>
      <SliderContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item) => (
              <div key={item.id} className="flex flex-col items-center cursor-pointer">
                <DownwardTriangle onClick={() => navigate(`/product/${item.id}`)}>
                  <div>{item.title.toUpperCase()}</div>
                </DownwardTriangle>
                <DescriptionContainer className="line-clamp-2">{item.description}</DescriptionContainer>
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

export default DownwardCarousel;
