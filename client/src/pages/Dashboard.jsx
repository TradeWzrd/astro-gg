import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  FaUser, 
  FaShoppingBag, 
  FaCog, 
  FaSignOutAlt, 
  FaEdit, 
  FaKey, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaUsers,
  FaHome 
} from "react-icons/fa";
import GlassyNav from "../components/GlassyNav";
import ShootingStars from "../components/ShootingStars";
import FlickeringStars from "../components/FlickeringStars";
import Products from '../pages/Products';
import Payments from '../pages/Payments';
import Bookings from '../pages/Bookings';
import Users from '../pages/Users';

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

const StyledNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  border: none;
  background: ${({ $isActive }) => $isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${({ $isActive }) => $isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const NavItem = ({ children, $isActive, ...props }) => (
  <StyledNavItem $isActive={$isActive} {...props}>
    {children}
  </StyledNavItem>
);

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.1rem;
    color: #a78bfa;
    margin-bottom: 1rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const ActivitySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;

  h3 {
    color: #a78bfa;
    margin-bottom: 1rem;
  }
`;

const ActivityItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }

  .date {
    color: #a78bfa;
    font-size: 0.9rem;
  }
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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isAdmin] = useState(user?.role === 'admin');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 120,
    totalPayments: 2450.50,
    totalBookings: 80,
    activeProducts: 45
  };

  const recentActivities = [
    { id: 1, text: "New payment received from John Doe", date: "2024-12-21" },
    { id: 2, text: "Booking confirmed for Alice Smith", date: "2024-12-22" },
    { id: 3, text: "New product added: Tarot Card Set", date: "2024-12-20" },
    { id: 4, text: "User Mark Wilson updated account details", date: "2024-12-18" }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <h2>Dashboard</h2>
            <p>Overview of key metrics and recent activities.</p>

            <StatsGrid>
              <StatCard>
                <h3>Total Users</h3>
                <div className="value">{stats.totalUsers}</div>
              </StatCard>
              <StatCard>
                <h3>Total Payments</h3>
                <div className="value">${stats.totalPayments}</div>
              </StatCard>
              <StatCard>
                <h3>Total Bookings</h3>
                <div className="value">{stats.totalBookings}</div>
              </StatCard>
              <StatCard>
                <h3>Active Products</h3>
                <div className="value">{stats.activeProducts}</div>
              </StatCard>
            </StatsGrid>

            <ActivitySection>
              <h3>Recent Activities</h3>
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id}>
                  <p>{activity.text}</p>
                  <span className="date">{activity.date}</span>
                </ActivityItem>
              ))}
            </ActivitySection>
          </>
        );
      case 'products':
        return <Products />;
      case 'payments':
        return <Payments />;
      case 'bookings':
        return <Bookings />;
      case 'users':
        return <Users />;
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
            <FaUser size={40} />
          </Avatar>
          <h3>{user?.name || "Admin User"}</h3>
          <span>{user?.email}</span>
        </UserProfile>

        <nav>
          <NavItem 
            $isActive={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          >
            <FaHome /> Dashboard
          </NavItem>
          <NavItem 
            $isActive={currentPage === 'products'}
            onClick={() => setCurrentPage('products')}
          >
            <FaShoppingBag /> Products
          </NavItem>
          <NavItem 
            $isActive={currentPage === 'payments'}
            onClick={() => setCurrentPage('payments')}
          >
            <FaCreditCard /> Payments
          </NavItem>
          <NavItem 
            $isActive={currentPage === 'bookings'}
            onClick={() => setCurrentPage('bookings')}
          >
            <FaCalendarAlt /> Bookings
          </NavItem>
          <NavItem 
            $isActive={currentPage === 'users'}
            onClick={() => setCurrentPage('users')}
          >
            <FaUsers /> Users
          </NavItem>
          <NavItem onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </NavItem>
        </nav>
      </Sidebar>

      <ContentWrapper>
        <MainContent>
          {renderContent()}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Dashboard;
