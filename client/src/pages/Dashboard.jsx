import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaUser, FaShoppingBag, FaCog, FaSignOutAlt, FaEdit, FaKey } from "react-icons/fa";
import GlassyNav from "../components/GlassyNav";
import ShootingStars from "../components/ShootingStars";
import FlickeringStars from "../components/FlickeringStars";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c3d 0%, #4b0082 100%);
  position: relative;
  color: white;
  display: flex;
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const UserName = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-align: center;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.active ? 'rgba(167, 139, 250, 0.1)' : 'transparent'};
  border: none;
  border-radius: 12px;
  color: ${props => props.active ? '#a78bfa' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  font-size: 1rem;

  &:hover {
    background: rgba(167, 139, 250, 0.1);
    color: #a78bfa;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #a78bfa;
`;

const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  &:first-child { border-radius: 12px 0 0 12px; }
  &:last-child { border-radius: 0 12px 12px 0; }
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  ${props => props.status === 'PAID' && `
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  `}
  
  ${props => props.status === 'CAN' && `
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  `}

  ${props => props.status === 'FULFILLED' && `
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a78bfa;
    box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(167, 139, 250, 0.4);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
    
    &:hover {
      background: rgba(239, 68, 68, 0.2);
    }
  `}
`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <StatsGrid>
              <StatCard
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatLabel>Total Orders</StatLabel>
                <StatValue>24</StatValue>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatLabel>Active Orders</StatLabel>
                <StatValue>3</StatValue>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatLabel>Total Spent</StatLabel>
                <StatValue>₹12,400</StatValue>
              </StatCard>
            </StatsGrid>
            <ContentContainer>
              <Title>Recent Orders</Title>
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
                      <Td><StatusBadge status={order.payment}>{order.payment}</StatusBadge></Td>
                      <Td><StatusBadge status={order.fulfillment}>{order.fulfillment}</StatusBadge></Td>
                      <Td>{order.total}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ContentContainer>
          </>
        );

      case "orders":
        return (
          <ContentContainer>
            <Title>Your Orders</Title>
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
                    <Td><StatusBadge status={order.payment}>{order.payment}</StatusBadge></Td>
                    <Td><StatusBadge status={order.fulfillment}>{order.fulfillment}</StatusBadge></Td>
                    <Td>{order.total}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentContainer>
        );

      case "account":
        return (
          <ContentContainer>
            <Title>Account Settings</Title>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" value={user?.name || ""} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input type="email" value={user?.email || ""} disabled />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="Enter your phone number" />
            </FormGroup>

            <FormGroup>
              <Label>Date of Birth</Label>
              <Input type="date" />
            </FormGroup>

            <Button variant="primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <FaEdit /> Update Profile
            </Button>

            <Button variant="secondary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <FaKey /> Change Password
            </Button>

            <Button 
              variant="danger"
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt /> Logout
            </Button>
          </ContentContainer>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />

      <Sidebar>
        <UserProfile>
          <Avatar>
            <FaUser />
          </Avatar>
          <UserName>{user?.name || "User"}</UserName>
          <UserEmail>{user?.email || "user@example.com"}</UserEmail>
        </UserProfile>

        <NavMenu>
          <NavItem
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            <FaCog /> Overview
          </NavItem>
          <NavItem
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          >
            <FaShoppingBag /> Orders
          </NavItem>
          <NavItem
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            <FaUser /> Account
          </NavItem>
        </NavMenu>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard;
