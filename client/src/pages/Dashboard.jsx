import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../Redux/AuthSlice';
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { 
  FaUser, 
  FaShoppingBag,
  FaSignOutAlt,
  FaCreditCard, 
  FaCalendarAlt, 
  FaUsers,
  FaHome 
} from "react-icons/fa";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'products':
        return <Products />;
      case 'payments':
        return <Payments />;
      case 'bookings':
        return <Bookings />;
      case 'users':
        return <Users />;
      default:
        return (
          <>
            <StatsGrid>
              <StatCard>
                <h3>Total Orders</h3>
                <div className="value">156</div>
              </StatCard>
              <StatCard>
                <h3>Total Revenue</h3>
                <div className="value">₹45,678</div>
              </StatCard>
              <StatCard>
                <h3>Active Users</h3>
                <div className="value">1,234</div>
              </StatCard>
            </StatsGrid>

            <ActivitySection>
              <h3>Recent Activity</h3>
              <ActivityItem>
                <p>New order received from John Doe</p>
                <div className="date">2 hours ago</div>
              </ActivityItem>
              <ActivityItem>
                <p>Payment received for Order #12345</p>
                <div className="date">5 hours ago</div>
              </ActivityItem>
              <ActivityItem>
                <p>New user registration: Jane Smith</p>
                <div className="date">1 day ago</div>
              </ActivityItem>
            </ActivitySection>
          </>
        );
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
          <div>{user?.name || "User"}</div>
        </UserProfile>

        <div>
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
        </div>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard;
