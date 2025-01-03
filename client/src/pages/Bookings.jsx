import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaFilter } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)' : 
    'rgba(255, 255, 255, 0.05)'};
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const BookingsTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    color: #a78bfa;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => {
    switch (props.status.toLowerCase()) {
      case 'completed':
        return 'rgba(34, 197, 94, 0.1)';
      case 'pending':
        return 'rgba(234, 179, 8, 0.1)';
      case 'cancelled':
        return 'rgba(239, 68, 68, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'completed':
        return '#22c55e';
      case 'pending':
        return '#eab308';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }};
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const UserLink = styled.a`
  color: #a78bfa;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ServiceType = styled.span`
  color: #e2e8f0;
`;

const Bookings = () => {
  const [bookings] = useState([
    {
      id: 1,
      user: 'John Doe',
      date: '2024-12-21',
      service: 'Consultation',
      status: 'Completed'
    },
    {
      id: 2,
      user: 'Alice Smith',
      date: '2024-12-22',
      service: 'Astrology Reading',
      status: 'Pending'
    },
    {
      id: 3,
      user: 'Mark Wilson',
      date: '2024-12-23',
      service: 'Horoscope Consultation',
      status: 'Completed'
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      date: '2024-12-24',
      service: 'Tarot Reading',
      status: 'Cancelled'
    }
  ]);

  const handleNewBooking = () => {
    // New booking functionality
  };

  const handleFilter = () => {
    // Filter functionality
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <Header>
        <div>
          <Title>Bookings</Title>
          <Description>Manage user bookings and services.</Description>
        </div>
        <HeaderActions>
          <ActionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFilter}
          >
            <FaFilter /> Filter
          </ActionButton>
          <ActionButton
            primary
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewBooking}
          >
            <FaCalendarPlus /> New Booking
          </ActionButton>
        </HeaderActions>
      </Header>

      <BookingsTable>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>
                  <UserLink href="#">{booking.user}</UserLink>
                </td>
                <td>{booking.date}</td>
                <td>
                  <ServiceType>{booking.service}</ServiceType>
                </td>
                <td>
                  <StatusBadge status={booking.status}>
                    {booking.status}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </BookingsTable>
    </PageContainer>
  );
};

export default Bookings;
