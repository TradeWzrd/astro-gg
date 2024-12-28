import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  background: linear-gradient(to right, #1c1c3d, #4b0082);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`;

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DownwardTriangleCard = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(to bottom right, #4b0082, #6c63ff);
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-weight: bold;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  color: white;
  font-size: 1rem;
`;

const BookNowButton = styled.button`
  margin-top: 1rem;
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

// Service Page Component
const DownwardTriangleServicePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBookNow = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const price = String(item.price);
    const cartItem = {
      user_id: user.userId,
      item_id: item.id,
      title: item.title,
      description: item.description,
      price,
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 200) {
        dispatch(addToCart(cartItem));
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const services = [
    { id: 101, title: "Numerology", description: "Discover the secrets of your numbers.", price: 299.99 },
    { id: 102, title: "Astrology", description: "Understand your life through the stars.", price: 399.99 },
    { id: 103, title: "Vastu Shastra", description: "Align your home with cosmic energy.", price: 499.99 },
  ];

  return (
    <PageContainer>
      <Title>Our Numerolgy Services</Title>
      <GridContainer>
        {services.map((item) => (
          <ServiceCard key={item.id}>
            {/* Downward Triangular Card */}
            <DownwardTriangleCard onClick={() => navigate(`/astrology/${item.id}`)}>
              {item.title.toUpperCase()}
            </DownwardTriangleCard>
            {/* Service Description */}
            <Description>{item.description}</Description>
            {/* Booking Button */}
            <BookNowButton onClick={() => handleBookNow(item)}>BOOK NOW</BookNowButton>
          </ServiceCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default DownwardTriangleServicePage;
