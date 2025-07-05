import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, updateAdminStatus } from '../Redux/AuthSlice';
import { orderAPI, serviceAPI } from '../services/api';
import api from '../services/api';
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { 
  FaUser, 
  FaShoppingBag,
  FaSignOutAlt,
  FaCreditCard, 
  FaCalendarAlt, 
  FaUsers,
  FaHome,
  FaUserEdit,
  FaGlobe,
  FaStar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaSave,
  FaCalendar,
  FaBox,
  FaDownload,
  FaCheck,
  FaClock,
  FaTimes
} from "react-icons/fa";
import ShootingStars from "../components/ShootingStars";
import FlickeringStars from "../components/FlickeringStars";
import Products from '../pages/Products';
import Payments from '../pages/Payments';
import Bookings from '../pages/Bookings';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import OrderDetailsModal from '../components/OrderDetailsModal';
import EnhancedAdminDashboard from '../components/EnhancedAdminDashboard';

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
  // Check for admin privileges using either isAdmin property or role field
  const isAdmin = user?.isAdmin || user?.role === 'admin' || false;
  const isAstrologer = user?.role === 'astrologer' || false;
  const userRole = isAdmin ? 'admin' : (isAstrologer ? 'astrologer' : 'user'); // Determine role
  
  // For debugging
  useEffect(() => {
    console.log('User object:', user);
    console.log('Admin status:', isAdmin, 'Role:', user?.role);
  }, [user]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [adminEnabled, setAdminEnabled] = useState(user?.isAdmin || false);
  
  // Dashboard data states
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    recentActivity: [],
  });
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);
  
  // Astrologer dashboard data states
  const [astrologerData, setAstrologerData] = useState({
    todaySessions: 0,
    weeklyEarnings: 0,
    clientRating: 0,
    pendingReviews: 0,
    upcomingSessions: [],
    recentMessages: []
  });
  const [astrologerDataLoading, setAstrologerDataLoading] = useState(false);
  
  // User dashboard data states
  const [userData, setUserData] = useState({
    myOrders: 0,
    savedReadings: 0,
    upcomingSessions: 0,
    loyaltyPoints: 0,
    recentActivity: []
  });
  const [userDataLoading, setUserDataLoading] = useState(false);
  
  // Services management state
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'astrology',
    image: '',
    featured: false,
    faqs: []
  });
  const [serviceFormErrors, setServiceFormErrors] = useState({});
  
  // Orders management state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const enableAdminMode = () => {
    // Get current user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo) {
      // Add isAdmin flag
      userInfo.isAdmin = true;
      
      // Save back to localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      // Update Redux state using the proper action
      dispatch(updateAdminStatus(userInfo));
      
      setAdminEnabled(true);
      toast.success('Admin mode enabled! Refresh the page to see all admin features.');
    } else {
      toast.error('Could not enable admin mode. Try logging in again.');
    }
  };
  
  // Fetch admin dashboard data
  const fetchAdminDashboardData = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError(null);
      
      // Fetch total orders
      const ordersResponse = await orderAPI.getAllOrders();
      
      // Fetch all users (for active users count) if admin
      const usersResponse = await api.get('/users');
      
      // Check if ordersResponse.data is valid and determine the orders array
      // API might return data in different formats (direct array or nested in a property)
      const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : 
                    (ordersResponse.data?.orders || []);
      
      // Check if usersResponse.data is valid
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : 
                   (usersResponse.data?.users || []);
      
      // Calculate total revenue from orders
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalPrice || 0);
      }, 0);
      
      // Get recent activity (from orders, user registrations, etc.)
      // Sort orders by date (most recent first) and take the 5 most recent
      const recentOrders = orders.length > 0 ? 
        [...orders]
          .filter(order => order && order.createdAt) // Ensure only valid orders with dates
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5) : [];
      
      setDashboardData({
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        activeUsers: users.length,
        recentActivity: recentOrders.map(order => ({
          id: order._id || 'unknown',
          type: 'order',
          message: `New order received from ${order.user?.name || 'Customer'}`,
          date: new Date(order.createdAt),
          timeAgo: getTimeAgo(new Date(order.createdAt))
        }))
      });
      
      setDashboardLoading(false);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setDashboardError('Failed to fetch dashboard data');
      setDashboardLoading(false);
    }
  };
  
  // Fetch astrologer dashboard data
  const fetchAstrologerData = async () => {
    try {
      setAstrologerDataLoading(true);
      
      // Get astrologer sessions
      const sessionsResponse = await api.get('/astrologer/sessions');
      
      // Get earnings data
      const earningsResponse = await api.get('/astrologer/earnings');
      
      // Calculate today's sessions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todaySessions = sessionsResponse.data.filter(session => 
        new Date(session.date) >= today
      ).length;
      
      // For demo purposes, if API calls fail, use realistic dummy data
      setAstrologerData({
        todaySessions: sessionsResponse.data ? todaySessions : 3,
        weeklyEarnings: earningsResponse.data?.weeklyEarnings || 12500,
        clientRating: earningsResponse.data?.rating || 4.8,
        pendingReviews: earningsResponse.data?.pendingReviews || 5,
        upcomingSessions: sessionsResponse.data || [
          { client: 'Priya Sharma', type: 'Birth Chart Reading', time: 'Today, 3:00 PM' },
          { client: 'Raj Malhotra', type: 'Career Consultation', time: 'Today, 5:30 PM' },
          { client: 'Ananya & Vikram', type: 'Compatibility Analysis', time: 'Tomorrow, 10:00 AM' }
        ],
        recentMessages: [
          { from: 'Meera Patel', subject: 'Question about birth chart', time: '1 hour ago' },
          { from: 'Arjun Singh', subject: 'Follow-up', time: '3 hours ago' },
          { from: 'Neha Gupta', subject: 'Booking request', time: 'Yesterday' }
        ]
      });
      
      setAstrologerDataLoading(false);
    } catch (error) {
      console.error('Astrologer data fetch error:', error);
      // Set fallback data if API fails
      setAstrologerData({
        todaySessions: 3,
        weeklyEarnings: 12500,
        clientRating: 4.8,
        pendingReviews: 5,
        upcomingSessions: [
          { client: 'Priya Sharma', type: 'Birth Chart Reading', time: 'Today, 3:00 PM' },
          { client: 'Raj Malhotra', type: 'Career Consultation', time: 'Today, 5:30 PM' },
          { client: 'Ananya & Vikram', type: 'Compatibility Analysis', time: 'Tomorrow, 10:00 AM' }
        ],
        recentMessages: [
          { from: 'Meera Patel', subject: 'Question about birth chart', time: '1 hour ago' },
          { from: 'Arjun Singh', subject: 'Follow-up', time: '3 hours ago' },
          { from: 'Neha Gupta', subject: 'Booking request', time: 'Yesterday' }
        ]
      });
      setAstrologerDataLoading(false);
    }
  };
  
  // Fetch user dashboard data
  const fetchUserData = async () => {
    try {
      setUserDataLoading(true);
      
      // Get user orders
      const ordersResponse = await orderAPI.getMyOrders();
      
      // For demo purposes, if API calls fail, use realistic dummy data
      setUserData({
        myOrders: ordersResponse.data?.length || 5,
        savedReadings: 3,
        upcomingSessions: 1,
        loyaltyPoints: 250,
        recentActivity: ordersResponse.data ? ordersResponse.data.slice(0, 3).map(order => ({
          id: order._id,
          type: order.orderItems[0]?.name || 'Order',
          date: new Date(order.createdAt).toLocaleDateString(),
        })) : [
          { type: 'Birth Chart Reading with Astrologer Sharma', date: 'May 1, 2025' },
          { type: 'Purchased Premium Gemstone Package', date: 'April 25, 2025' },
          { type: 'Completed Personality Quiz', date: 'April 20, 2025' }
        ]
      });
      
      setUserDataLoading(false);
    } catch (error) {
      console.error('User data fetch error:', error);
      // Set fallback data if API fails
      setUserData({
        myOrders: 5,
        savedReadings: 3,
        upcomingSessions: 1,
        loyaltyPoints: 250,
        recentActivity: [
          { type: 'Birth Chart Reading with Astrologer Sharma', date: 'May 1, 2025' },
          { type: 'Purchased Premium Gemstone Package', date: 'April 25, 2025' },
          { type: 'Completed Personality Quiz', date: 'April 20, 2025' }
        ]
      });
      setUserDataLoading(false);
    }
  };
  
  // Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };
  
  // Fetch services from API
  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const response = await serviceAPI.getServices();
      setServices(response.data);
      setServicesLoading(false);
    } catch (error) {
      setServicesError('Failed to fetch services');
      setServicesLoading(false);
    }
  };
  
  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await orderAPI.getAllOrders();
      console.log('Orders API response:', response.data);
      
      // Ensure we have an array of orders, handle different response structures
      let ordersArray = [];
      if (Array.isArray(response.data)) {
        ordersArray = response.data;
      } else if (response.data && Array.isArray(response.data.orders)) {
        ordersArray = response.data.orders;
      } else if (response.data && typeof response.data === 'object') {
        // If it's an object but not an array, it might be a single order
        ordersArray = [response.data];
      }
      
      setOrders(ordersArray);
      setOrdersLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrdersError('Failed to load orders');
      setOrdersLoading(false);
      // Set orders to empty array to prevent filter errors
      setOrders([]);
    }
  };
  
  // Handle service form submission
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const errors = {};
    if (!serviceFormData.name.trim()) errors.name = 'Name is required';
    if (!serviceFormData.description.trim()) errors.description = 'Description is required';
    if (!serviceFormData.price) errors.price = 'Price is required';
    
    if (Object.keys(errors).length > 0) {
      setServiceFormErrors(errors);
      return;
    }
    
    try {
      // Prepare service data
      let serviceData = {
        ...serviceFormData,
        // Add default image if empty
        image: serviceFormData.image || 'https://source.unsplash.com/random/300x200/?astrology',
      };
      
      // Convert price to number if possible
      if (!isNaN(Number(serviceFormData.price))) {
        serviceData.price = Number(serviceFormData.price);
      }
      
      // Generate slug if not provided
      if (!serviceData.slug) {
        serviceData.slug = serviceFormData.name.toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove non-word chars
          .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      }
      
      if (selectedService) {
        // Update existing service
        await serviceAPI.updateService(selectedService._id, serviceData);
        toast.success('Service updated successfully');
      } else {
        // Create new service
        await serviceAPI.createService(serviceData);
        toast.success('Service created successfully');
      }
      
      // Reset form and refresh services
      setShowServiceForm(false);
      setSelectedService(null);
      setServiceFormData({
        name: '',
        description: '',
        price: '',
        category: 'astrology',
        image: '',
        featured: false,
        faqs: []
      });
      fetchServices();
      
    } catch (err) {
      console.error('Error saving service:', err);
      toast.error(err.response?.data?.message || 'Failed to save service');
    }
  };
  
  // Handle editing a service
  const handleEditService = (service) => {
    setSelectedService(service);
    setServiceFormData({
      name: service.name,
      description: service.description,
      price: typeof service.price === 'number' ? service.price.toString() : service.price,
      category: service.category,
      image: service.image,
      featured: service.featured,
      faqs: service.faqs || []
    });
    setShowServiceForm(true);
  };
  
  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceAPI.deleteService(serviceId);
        toast.success('Service deleted successfully');
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
        toast.error('Failed to delete service');
      }
    }
  };

  // Load appropriate data based on user role and selected page
  useEffect(() => {
    // Redirect if trying to access unauthorized pages
    if (!isAdmin && ['products', 'payments', 'users'].includes(currentPage)) {
      setCurrentPage('dashboard');
      toast.error('You do not have permission to access this page');
    } else if (!isAstrologer && ['astrology-sessions', 'client-history'].includes(currentPage)) {
      setCurrentPage('dashboard');
      toast.error('You do not have permission to access this page');
    }
    
    // Fetch data for specific pages
    if (currentPage === 'services') {
      fetchServices();
    }
    if (currentPage === 'payments') {
      fetchOrders();
    }
    
    // Fetch dashboard data when landing on dashboard
    if (currentPage === 'dashboard') {
      if (isAdmin) {
        fetchAdminDashboardData();
      } else if (isAstrologer) {
        fetchAstrologerData();
      } else {
        fetchUserData();
      }
    }
  }, [currentPage, isAdmin, isAstrologer]);

  // Render dashboard content based on user role and selected page
  const renderContent = () => {
    // If on dashboard home page, show role-specific dashboard
    if (currentPage === 'dashboard') {
      return renderRoleDashboard();
    }
    
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'products':
        // Only allow access if admin
        return isAdmin ? <Products /> : null;
      case 'payments':
        // Only allow access if admin
        return isAdmin ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Payments</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setOrderStatusFilter('all')}
                  style={{
                    background: orderStatusFilter === 'all' ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <FaFilter style={{ marginRight: '5px' }} /> All
                </button>
                <button
                  onClick={() => setOrderStatusFilter('completed')}
                  style={{
                    background: orderStatusFilter === 'completed' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <FaCheck style={{ marginRight: '5px' }} /> Completed
                </button>
                <button
                  onClick={() => setOrderStatusFilter('pending')}
                  style={{
                    background: orderStatusFilter === 'pending' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <FaClock style={{ marginRight: '5px' }} /> Pending
                </button>
                <button
                  onClick={() => setOrderStatusFilter('failed')}
                  style={{
                    background: orderStatusFilter === 'failed' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <FaTimes style={{ marginRight: '5px' }} /> Failed
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <FaDownload style={{ marginRight: '5px' }} /> Export
                </button>
              </div>
            </div>
            <p>Track all payments and manage your billing details.</p>
            
            {ordersLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <FaSpinner style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
              </div>
            ) : ordersError ? (
              <div style={{ color: 'red', padding: '1rem' }}>{ordersError}</div>
            ) : orders.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No orders found. Create some orders to see them here.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>User</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Amount</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter(order => {
                        if (orderStatusFilter === 'all') return true;
                        return order.status === orderStatusFilter;
                      })
                      .map(order => (
                        <tr key={order._id}>
                          <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {order.user?.name || 'Anonymous'}
                          </td>
                          <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            ₹{order.totalPrice?.toFixed(2) || 0}
                          </td>
                          <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <span style={{
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              backgroundColor: 
                                order.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' :
                                order.status === 'pending' ? 'rgba(245, 158, 11, 0.2)' :
                                'rgba(239, 68, 68, 0.2)',
                              color:
                                order.status === 'completed' ? '#10B981' :
                                order.status === 'pending' ? '#F59E0B' :
                                '#EF4444'
                            }}>
                              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                style={{
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  border: 'none',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: '4px',
                                  color: '#6366F1',
                                  cursor: 'pointer'
                                }}
                              >
                                View
                              </button>
                              {order.status !== 'completed' && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await orderAPI.updateOrderStatus(order._id, 'completed');
                                      toast.success('Order marked as completed');
                                      fetchOrders();
                                    } catch (error) {
                                      toast.error('Failed to update order status');
                                    }
                                  }}
                                  style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    border: 'none',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '4px',
                                    color: '#10B981',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Complete
                                </button>
                              )}
                              {(order.status === 'pending' || order.status === 'failed') && (
                                <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this order?')) {
                                      orderAPI.deleteOrder(order._id)
                                        .then(() => {
                                          toast.success('Order deleted');
                                          fetchOrders();
                                        })
                                        .catch(() => toast.error('Failed to delete order'));
                                    }
                                  }}
                                  style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: 'none',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '4px',
                                    color: '#EF4444',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null;
      case 'bookings':
        return <Bookings />;
      case 'users':
        // Only allow access if admin
        return isAdmin ? <Users /> : null;
      case 'services':
        // Services management UI
        return isAdmin ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'white', margin: 0 }}>Service Management</h2>
              {!showServiceForm && (
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setServiceFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: 'astrology',
                      image: '',
                      featured: false,
                      faqs: []
                    });
                    setShowServiceForm(true);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaPlus /> Create New Service
                </button>
              )}
            </div>
            
            {showServiceForm ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ marginTop: 0 }}>{selectedService ? 'Edit Service' : 'Create New Service'}</h3>
                <form onSubmit={handleServiceSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Service Name*
                      </label>
                      <input 
                        type="text" 
                        value={serviceFormData.name}
                        onChange={(e) => setServiceFormData({...serviceFormData, name: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${serviceFormErrors.name ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      {serviceFormErrors.name && (
                        <p style={{ color: '#ef4444', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                          {serviceFormErrors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Price*
                      </label>
                      <input 
                        type="text" 
                        value={serviceFormData.price}
                        onChange={(e) => setServiceFormData({...serviceFormData, price: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${serviceFormErrors.price ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        placeholder="E.g. 5999 or ₹5,000 – ₹10,000"
                      />
                      {serviceFormErrors.price && (
                        <p style={{ color: '#ef4444', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                          {serviceFormErrors.price}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Category*
                      </label>
                      <select
                        value={serviceFormData.category}
                        onChange={(e) => setServiceFormData({...serviceFormData, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      >
                        <option value="astrology">Astrology</option>
                        <option value="numerology">Numerology</option>
                        <option value="vastu">Vastu</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Image URL
                      </label>
                      <input 
                        type="text" 
                        value={serviceFormData.image}
                        onChange={(e) => setServiceFormData({...serviceFormData, image: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        placeholder="https://example.com/image.jpg"
                      />
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>
                        Leave empty for a default placeholder image
                      </small>
                    </div>
                    
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        Description*
                      </label>
                      <textarea 
                        value={serviceFormData.description}
                        onChange={(e) => setServiceFormData({...serviceFormData, description: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${serviceFormErrors.description ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: '8px',
                          color: 'white',
                          minHeight: '100px',
                          resize: 'vertical'
                        }}
                        placeholder="Detailed description of the service..."
                      />
                      {serviceFormErrors.description && (
                        <p style={{ color: '#ef4444', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                          {serviceFormErrors.description}
                        </p>
                      )}
                    </div>
                    
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input 
                          type="checkbox" 
                          checked={serviceFormData.featured}
                          onChange={(e) => setServiceFormData({...serviceFormData, featured: e.target.checked})}
                          style={{ width: '18px', height: '18px' }}
                        />
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Featured</span>
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                    <button 
                      type="button"
                      onClick={() => setShowServiceForm(false)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FaSave /> {selectedService ? 'Update Service' : 'Create Service'}
                    </button>
                  </div>
                </form>
              </div>
            ) : servicesLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <FaSpinner style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
                <p>Loading services...</p>
              </div>
            ) : servicesError ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                <p>{servicesError}</p>
                <button
                  onClick={fetchServices}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '1rem'
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : !services || services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                <p>No services found. Create your first service to get started!</p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {Array.isArray(services) ? services.map(service => (
                  <div 
                    key={service._id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={service.image || 'https://source.unsplash.com/random/300x150/?astrology'} 
                        alt={service.name}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://source.unsplash.com/random/300x150/?universe';
                        }}
                      />
                      {service.featured && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(79, 70, 229, 0.8)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          Featured
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: service.active ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {service.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    
                    <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: 'auto' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>{service.name}</h3>
                        <p style={{ 
                          margin: '0 0 1rem', 
                          color: 'rgba(255, 255, 255, 0.7)',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: '1.4'
                        }}>
                          {service.description}
                        </p>
                      </div>
                      
                      <div style={{ marginTop: '1rem' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '0.75rem'
                        }}>
                          <span style={{ fontWeight: 'bold', color: '#a78bfa' }}>
                            {typeof service.price === 'number' 
                              ? `₹${service.price.toLocaleString('en-IN')}` 
                              : service.price
                            }
                          </span>
                          <span style={{
                            padding: '4px 8px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            textTransform: 'capitalize'
                          }}>
                            {service.category}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleEditService(service)}
                            style={{
                              flex: 1,
                              background: 'rgba(79, 70, 229, 0.1)',
                              color: '#818cf8',
                              border: 'none',
                              padding: '0.5rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service._id)}
                            style={{
                              flex: 1,
                              background: 'rgba(220, 38, 38, 0.1)',
                              color: '#ef4444',
                              border: 'none',
                              padding: '0.5rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : <p style={{ padding: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>Invalid services data</p>}
              </div>
            )}
          </div>
        ) : null;
      case 'astrology-sessions':
        // Only allow access if astrologer
        return isAstrologer ? (
          <div>
            <h2>Astrology Sessions</h2>
            <div style={{ marginBottom: '20px' }}>
              <p>Manage your upcoming astrology sessions and availability</p>
            </div>
            <StatsGrid>
              <StatCard>
                <h3>Upcoming Sessions</h3>
                <div className="value">5</div>
              </StatCard>
              <StatCard>
                <h3>Completed Sessions</h3>
                <div className="value">28</div>
              </StatCard>
              <StatCard>
                <h3>Available Slots</h3>
                <div className="value">12</div>
              </StatCard>
            </StatsGrid>
          </div>
        ) : null;
      case 'client-history':
        // Only allow access if astrologer
        return isAstrologer ? (
          <div>
            <h2>Client History</h2>
            <div style={{ marginBottom: '20px' }}>
              <p>View your client history and previous readings</p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '8px' }}>
              <h3>Recent Clients</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Client</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Session Type</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '10px' }}>John Doe</td>
                    <td style={{ padding: '10px' }}>Birth Chart Reading</td>
                    <td style={{ padding: '10px' }}>May 2, 2025</td>
                    <td style={{ padding: '10px' }}><span style={{ color: '#10B981' }}>Completed</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '10px' }}>Sarah Johnson</td>
                    <td style={{ padding: '10px' }}>Compatibility Analysis</td>
                    <td style={{ padding: '10px' }}>April 28, 2025</td>
                    <td style={{ padding: '10px' }}><span style={{ color: '#10B981' }}>Completed</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px' }}>Michael Smith</td>
                    <td style={{ padding: '10px' }}>Career Forecast</td>
                    <td style={{ padding: '10px' }}>April 25, 2025</td>
                    <td style={{ padding: '10px' }}><span style={{ color: '#10B981' }}>Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null;
      default:
        return renderRoleDashboard();
    }
  };

  // Render role-specific dashboard content
    const renderRoleDashboard = () => {
    if (isAdmin) {
      return <EnhancedAdminDashboard />;
    } else if (isAstrologer) {
      return (
        <>
          <h2>Astrologer Dashboard</h2>
          {astrologerDataLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <FaSpinner style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
              <p>Loading your dashboard...</p>
            </div>
          ) : (
            <>
              <StatsGrid>
                <StatCard>
                  <h3>Today's Sessions</h3>
                  <div className="value">{astrologerData.todaySessions}</div>
                </StatCard>
                
                <StatCard>
                  <h3>This Week's Earnings</h3>
                  <div className="value">₹{astrologerData.weeklyEarnings.toLocaleString()}</div>
                </StatCard>
                
                <StatCard>
                  <h3>Client Rating</h3>
                  <div className="value">{astrologerData.clientRating} ★</div>
                </StatCard>
                
                <StatCard>
                  <h3>Pending Reviews</h3>
                  <div className="value">{astrologerData.pendingReviews}</div>
                </StatCard>
              </StatsGrid>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <ActivitySection>
                  <h3>Upcoming Sessions</h3>
                  {astrologerData.upcomingSessions.length > 0 ? (
                    astrologerData.upcomingSessions.map((session, index) => (
                      <ActivityItem key={index}>
                        <p><strong>{session.type}</strong> with {session.client}</p>
                        <div className="date">{session.time}</div>
                      </ActivityItem>
                    ))
                  ) : (
                    <p style={{ opacity: 0.7, padding: '1rem 0' }}>No upcoming sessions</p>
                  )}
                </ActivitySection>
                
                <ActivitySection>
                  <h3>Recent Client Messages</h3>
                  {astrologerData.recentMessages.length > 0 ? (
                    astrologerData.recentMessages.map((message, index) => (
                      <ActivityItem key={index}>
                        <p>{message.subject} from {message.from}</p>
                        <div className="date">{message.time}</div>
                      </ActivityItem>
                    ))
                  ) : (
                    <p style={{ opacity: 0.7, padding: '1rem 0' }}>No recent messages</p>
                  )}
                </ActivitySection>
              </div>
            </>
          )}
        </>
      );
    } else {
      // Regular user dashboard
      return (
        <>
          <h2>My Dashboard</h2>
          {userDataLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <FaSpinner style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
              <p>Loading your dashboard...</p>
            </div>
          ) : (
            <>
              <StatsGrid>
                <StatCard>
                  <h3>My Orders</h3>
                  <div className="value">{userData.myOrders}</div>
                </StatCard>
                
                <StatCard>
                  <h3>Saved Readings</h3>
                  <div className="value">{userData.savedReadings}</div>
                </StatCard>
                
                <StatCard>
                  <h3>Upcoming Sessions</h3>
                  <div className="value">{userData.upcomingSessions}</div>
                </StatCard>
                
                <StatCard>
                  <h3>Loyalty Points</h3>
                  <div className="value">{userData.loyaltyPoints}</div>
                </StatCard>
              </StatsGrid>

              <ActivitySection>
                <h3>Recent Activity</h3>
                {userData.recentActivity.length > 0 ? (
                  userData.recentActivity.map((activity, index) => (
                    <ActivityItem key={index}>
                      <p>{activity.type}</p>
                      <div className="date">{activity.date}</div>
                    </ActivityItem>
                  ))
                ) : (
                  <p style={{ opacity: 0.7, padding: '1rem 0' }}>No recent activity</p>
                )}
              </ActivitySection>
            </>
          )}
        </>
      );
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <UserProfile>
          <Avatar>
            <FaUser />
          </Avatar>
          <h3>{user?.name || 'User'}</h3>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            {user?.isAdmin ? 'Administrator' : 'User'}
          </div>
        </UserProfile>

        <div>
          <NavItem
            $isActive={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          >
            <FaHome /> Dashboard
          </NavItem>
          <NavItem
            $isActive={currentPage === 'profile'}
            onClick={() => setCurrentPage('profile')}
          >
            <FaUserEdit /> Profile
          </NavItem>
          {/* User always sees bookings */}
          <NavItem
            $isActive={currentPage === 'bookings'}
            onClick={() => setCurrentPage('bookings')}
          >
            <FaCalendarAlt /> Bookings
          </NavItem>
          
          {/* Role-specific menu items */}
          {isAdmin && (
            <>
              <NavItem
                $isActive={currentPage === 'products'}
                onClick={() => setCurrentPage('products')}
              >
                <FaShoppingBag /> Products
              </NavItem>
              <NavItem
                $isActive={currentPage === 'services'}
                onClick={() => {
                  setCurrentPage('services');
                  fetchServices(); // Load services when clicking on the tab
                }}
              >
                <FaStar /> Services
              </NavItem>
              <NavItem
                $isActive={currentPage === 'payments'}
                onClick={() => setCurrentPage('payments')}
              >
                <FaCreditCard /> Payments
              </NavItem>
              <NavItem
                $isActive={currentPage === 'users'}
                onClick={() => setCurrentPage('users')}
              >
                <FaUsers /> Users
              </NavItem>
            </>
          )}
          
          {/* Astrologer-only menu items */}
          {isAstrologer && (
            <>
              <NavItem
                $isActive={currentPage === 'astrology-sessions'}
                onClick={() => setCurrentPage('astrology-sessions')}
              >
                <FaCalendar /> My Sessions
              </NavItem>
              <NavItem
                $isActive={currentPage === 'client-history'}
                onClick={() => setCurrentPage('client-history')}
              >
                <FaBox /> Client History
              </NavItem>
            </>
          )}
          {/* Home button to navigate to the main site */}
          <NavItem onClick={() => navigate('/')}>
            <FaGlobe /> Main Site
          </NavItem>
          <NavItem onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </NavItem>
        </div>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setShowOrderModal(false)} 
          onOrderUpdated={fetchOrders}
        />
      )}
    </PageContainer>
  );
};

export default Dashboard;
