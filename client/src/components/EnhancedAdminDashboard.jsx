import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { 
  FaUser, FaShoppingBag, FaRupeeSign, FaChartLine,
  FaUsers, FaBoxOpen, FaUserClock
} from 'react-icons/fa';
import { orderAPI } from '../services/api';
import {
  DashboardContainer,
  DashboardItem,
  StatCardComponent,
  RevenueChart,
  CategoryChart,
  OrderStatusComponent,
  RecentOrders,
  TopProducts
} from './AdminDashboardComponents';

// Generate mock data for demonstration
const generateMockData = () => {
  // Revenue data for last 7 days
  const revenueData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    revenueData.push({
      name: format(date, 'dd MMM'),
      revenue: Math.floor(Math.random() * 15000) + 5000
    });
  }
  
  // Category data
  const categoryData = [
    { name: 'Astrology', value: 45 },
    { name: 'Numerology', value: 25 },
    { name: 'Vastu', value: 15 },
    { name: 'Gemstones', value: 10 },
    { name: 'Consultations', value: 5 }
  ];
  
  // Order status data
  const orderStatusData = [
    { name: 'Completed', count: 28 },
    { name: 'Processing', count: 12 },
    { name: 'Pending', count: 8 },
    { name: 'Cancelled', count: 2 }
  ];
  
  // Recent orders
  const recentOrders = [
    { id: '8be76e', customer: 'Priya Sharma', amount: 9999.00, date: '2 hours ago' },
    { id: '3016ab', customer: 'Rohit Verma', amount: 12980.00, date: '5 hours ago' },
    { id: '5df31c', customer: 'Anjali Desai', amount: 5499.00, date: '1 day ago' },
    { id: '7c24de', customer: 'Vikram Singh', amount: 8499.00, date: '1 day ago' },
    { id: '9ae56f', customer: 'Neha Kapoor', amount: 6999.00, date: '2 days ago' }
  ];
  
  // Top products
  const topProducts = [
    { name: 'Birth Chart Analysis', category: 'Astrology', sales: 45 },
    { name: 'Yearly Transit Forecast', category: 'Astrology', sales: 32 },
    { name: 'Vastu Consultation', category: 'Vastu', sales: 28 },
    { name: 'Numerology Report', category: 'Numerology', sales: 22 },
    { name: 'Gemstone Recommendation', category: 'Gemstones', sales: 18 }
  ];
  
  return {
    revenueData,
    categoryData,
    orderStatusData,
    recentOrders,
    topProducts
  };
};

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-top: -1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const EnhancedAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [realOrdersCount, setRealOrdersCount] = useState(0);
  const [realRevenue, setRealRevenue] = useState(0);
  const [realUsersCount, setRealUsersCount] = useState(0);
  const [dashboardData, setDashboardData] = useState(() => generateMockData());
  
  useEffect(() => {
    // Attempt to fetch real data from API, but use mock data as fallback
    const fetchRealData = async () => {
      try {
        setLoading(true);
        
        // Fetch real orders data
        const ordersResponse = await orderAPI.getAllOrders();
        
        // Get actual orders
        const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : 
                      (ordersResponse.data?.orders || []);
        
        // Calculate real total revenue
        const totalRevenue = orders.reduce((sum, order) => {
          return sum + (order.totalPrice || 0);
        }, 0);
        
        setRealOrdersCount(orders.length);
        setRealRevenue(totalRevenue);
        
        // Try to get users count (may not work if API doesn't support it)
        try {
          const usersResponse = await fetch('/api/users');
          const usersData = await usersResponse.json();
          setRealUsersCount(Array.isArray(usersData) ? usersData.length : 0);
        } catch (error) {
          console.error('Failed to fetch users count:', error);
          // Use mock data for users
          setRealUsersCount(32);
        }
        
      } catch (error) {
        console.error('Failed to fetch real data:', error);
        // Keep using mock data
      } finally {
        setLoading(false);
      }
    };
    
    fetchRealData();
  }, []);
  
  // Use real data if available, otherwise use mock data
  const ordersCount = realOrdersCount > 0 ? realOrdersCount : 50;
  const totalRevenue = realRevenue > 0 ? realRevenue : 534980;
  const usersCount = realUsersCount > 0 ? realUsersCount : 32;
  
  return (
    <div>
      <SectionTitle>Admin Dashboard</SectionTitle>
      <SectionSubtitle>Welcome back! Here's what's happening with your store today.</SectionSubtitle>
      
      {/* Key metrics */}
      <DashboardContainer>
        <DashboardItem>
          <StatCardComponent 
            title="Total Revenue" 
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={<FaRupeeSign />}
            iconBg="rgba(139, 92, 246, 0.2)"
            iconColor="#8b5cf6"
            change={12.5}
            period="last month"
          />
        </DashboardItem>
        
        <DashboardItem>
          <StatCardComponent 
            title="Orders" 
            value={ordersCount}
            icon={<FaShoppingBag />}
            iconBg="rgba(59, 130, 246, 0.2)"
            iconColor="#3b82f6"
            change={8.2}
            period="last month"
          />
        </DashboardItem>
        
        <DashboardItem>
          <StatCardComponent 
            title="Users" 
            value={usersCount}
            icon={<FaUsers />}
            iconBg="rgba(16, 185, 129, 0.2)"
            iconColor="#10b981"
            change={5.1}
            period="last month"
          />
        </DashboardItem>
        
        <DashboardItem>
          <StatCardComponent 
            title="Avg. Order Value" 
            value={`₹${Math.round(totalRevenue / ordersCount).toLocaleString()}`}
            icon={<FaChartLine />}
            iconBg="rgba(236, 72, 153, 0.2)"
            iconColor="#ec4899"
            change={3.2}
            period="last month"
          />
        </DashboardItem>
      </DashboardContainer>
      
      {/* Charts and analysis */}
      <DashboardContainer>
        <DashboardItem $span={8}>
          <RevenueChart data={dashboardData.revenueData} />
        </DashboardItem>
        
        <DashboardItem $span={4}>
          <CategoryChart data={dashboardData.categoryData} />
        </DashboardItem>
      </DashboardContainer>
      
      {/* Orders and products */}
      <DashboardContainer>
        <DashboardItem $span={4}>
          <OrderStatusComponent statusData={dashboardData.orderStatusData} />
        </DashboardItem>
        
        <DashboardItem $span={4}>
          <RecentOrders orders={dashboardData.recentOrders} />
        </DashboardItem>
        
        <DashboardItem $span={4}>
          <TopProducts products={dashboardData.topProducts} />
        </DashboardItem>
      </DashboardContainer>
      
      {/* User activity section */}
      <DashboardContainer>
        <DashboardItem $span={6}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#a78bfa', marginBottom: '1rem' }}>New Users</h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1rem' 
            }}>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: '0.5rem' 
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaUser color="white" />
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>User {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardItem>
        
        <DashboardItem $span={6}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#a78bfa', marginBottom: '1rem' }}>Quick Actions</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
              gap: '1rem' 
            }}>
              {[
                { label: 'Add Product', icon: <FaBoxOpen /> },
                { label: 'New Order', icon: <FaShoppingBag /> },
                { label: 'Add User', icon: <FaUserClock /> },
                { label: 'View Reports', icon: <FaChartLine /> }
              ].map((action, i) => (
                <button key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s'
                }}>
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </DashboardItem>
      </DashboardContainer>
    </div>
  );
};

export default EnhancedAdminDashboard; 