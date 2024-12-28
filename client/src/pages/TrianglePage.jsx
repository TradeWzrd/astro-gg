import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // Redux for user info
import { useNavigate } from "react-router-dom"; // Navigation
import axios from "axios"; // For API requests
import { addToCart } from "../Redux/CartSlice"; // Add to Cart action

// Styled components
const Container = styled.div`
  padding: 2rem;
  background: radial-gradient(circle, #3a0078, #1e003e 80%);
  min-height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  /* Animated cosmic stars background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/path/to/stars.png') repeat; /* Add a starry background */
    opacity: 0.1;
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: #ffcb74; /* Golden tone */
  background: linear-gradient(90deg, #ffcb74, #ffd700);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 5rem;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 6rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 450px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 15px;
  width: 100%;
  position: relative;
  z-index: 1;

  /* Premium glassmorphism styles */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1);

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.15);
  }
`;

const TriangleCard = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 250px solid #6a0dad;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
  }

  h2 {
    position: absolute;
    bottom: 10px;
    color: white;
    font-size: 1.5rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      bottom: 5px;
    }
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff6347;
  margin-top: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
  line-height: 1.6;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #6a0dad, #9b51e0);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(90deg, #5a0071, #8431c8);
    box-shadow: 0 4px 15px rgba(154, 50, 255, 0.6);
  }
`;

const AstrologyPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBookNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartItem = {
      user_id: user.userId,
      item_id: 103,
      title: "Astrology Service",
      description: "Get insights into celestial alignments.",
      price: 399.99,
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 200) {
        console.log("Item added to cart successfully!");
        dispatch(addToCart(cartItem));
        alert("Service booked successfully!");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const service = {
    title: "Astrology Consultation",
    description: "Explore the mysteries of the cosmos with personalized astrology readings.",
    price: 399.99,
  };

  return (
    <Container>
      <Title>Astrology Services</Title>
      <Card>
        <TriangleCard></TriangleCard>
        <Price>${service.price}</Price>
        <Description>{service.description}</Description>
        <Button onClick={handleBookNow}>Book Now</Button>
      </Card>
    </Container>
  );
};

export default AstrologyPage;
