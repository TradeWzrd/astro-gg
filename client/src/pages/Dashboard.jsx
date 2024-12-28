import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import GlassyNav from "../components/GlassyNav";
import ShootingStars from "../components/ShootingStars";
import FlickeringStars from "../components/FlickeringStars";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2A0066 0%, #4B0082 100%);
  position: relative;
  color: white;
  padding: 10rem 2rem 2rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 2rem 0 3rem 0;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(45deg, #fff, #B6D5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 0.8rem 2rem;
  background: ${props => props.active ? 
    'rgba(255, 255, 255, 0.2)' : 
    'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(20, 0, 50, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: #B6D5FF;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  &:first-child { border-radius: 8px 0 0 8px; }
  &:last-child { border-radius: 0 8px 8px 0; }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #B6D5FF;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(20, 0, 50, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'change-password' && `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
  
  ${props => props.variant === 'logout' && `
    background: rgba(255, 0, 0, 0.2);
    color: white;
    border: 2px solid rgba(255, 0, 0, 0.5);
    box-shadow: 
      0 0 10px rgba(255, 0, 0, 0.4),
      0 0 20px rgba(255, 0, 0, 0.3),
      0 0 30px rgba(255, 0, 0, 0.2);
    
    &:hover {
      background: rgba(255, 0, 0, 0.3);
      box-shadow: 
        0 0 15px rgba(255, 0, 0, 0.5),
        0 0 25px rgba(255, 0, 0, 0.4),
        0 0 35px rgba(255, 0, 0, 0.3);
    }

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle at center, 
        rgba(255, 0, 0, 0.3) 0%, 
        transparent 70%
      );
      transform: rotate(-45deg);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: 1;
    }
  `}
`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = [
    { orderNo: "#15078", date: "JUNE 21,24", payment: "PAID", fulfillment: "FULFILLED", total: "₹1,000" },
    { orderNo: "#15078", date: "JUNE 21,24", payment: "CAN", fulfillment: "FULFILLED", total: "₹1,000" },
    { orderNo: "#15078", date: "JUNE 21,24", payment: "PAID", fulfillment: "FULFILLED", total: "₹1,000" },
    { orderNo: "#15078", date: "JUNE 21,24", payment: "CAN", fulfillment: "FULFILLED", total: "₹1,000" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <PageContainer>
      <GlassyNav />
      <ShootingStars />
      <FlickeringStars />

      <Title>DASHBOARD</Title>

      <TabContainer>
        <Tab 
          active={activeTab === "orders"} 
          onClick={() => setActiveTab("orders")}
        >
          YOUR ORDERS
        </Tab>
        <Tab 
          active={activeTab === "account"} 
          onClick={() => setActiveTab("account")}
        >
          ACCOUNT DETAILS
        </Tab>
      </TabContainer>

      <ContentContainer>
        {activeTab === "orders" ? (
          <Table>
            <thead>
              <tr>
                <Th>ORDER NO</Th>
                <Th>DATE</Th>
                <Th>PAYMENT STATUS</Th>
                <Th>FULFILLMENT STATUS</Th>
                <Th>TOTAL</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <Td>{order.orderNo}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.payment}</Td>
                  <Td>{order.fulfillment}</Td>
                  <Td>{order.total}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <FormGroup>
              <Label>NAME*</Label>
              <Input type="text" value={user?.name || ""} disabled />
            </FormGroup>

            <FormGroup>
              <Label>AGE*</Label>
              <Input type="number" placeholder="Enter your age" />
            </FormGroup>

            <FormGroup>
              <Label>BIRTHDATE*</Label>
              <Input type="date" />
            </FormGroup>

            <FormGroup>
              <Label>EMAIL*</Label>
              <Input type="email" value={user?.email || ""} disabled />
            </FormGroup>

            <FormGroup>
              <Label>PHONE NUMBER*</Label>
              <Input type="tel" placeholder="Enter your phone number" />
            </FormGroup>

            <FormGroup>
              <Label>PASSWORD*</Label>
              <Input type="password" value="********" disabled />
            </FormGroup>

            <Button 
              variant="change-password"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CHANGE PASSWORD
            </Button>

            <Button 
              variant="logout"
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LOGOUT
            </Button>
          </div>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default Dashboard;
