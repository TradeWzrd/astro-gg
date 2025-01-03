import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserPlus, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
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

const UsersTable = styled.div`
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
  background: ${props => props.status === 'Active' ? 
    'rgba(34, 197, 94, 0.1)' : 
    'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.status === 'Active' ? 
    '#22c55e' : 
    '#ef4444'};
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const UserEmail = styled.a`
  color: #a78bfa;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 4px;
  color: #a78bfa;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(167, 139, 250, 0.1);
  }
`;

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      registered: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      registered: '2024-02-02',
      status: 'Inactive'
    },
    {
      id: 3,
      name: 'Mark Wilson',
      email: 'mark.wilson@example.com',
      registered: '2024-03-11',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      registered: '2024-04-19',
      status: 'Active'
    }
  ]);

  const handleAddUser = () => {
    // Add user functionality
  };

  const handleFilter = () => {
    // Filter functionality
  };

  const handleEditUser = (userId) => {
    // Edit user functionality
  };

  const handleDeleteUser = (userId) => {
    // Delete user functionality
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <Header>
        <div>
          <Title>Users</Title>
          <Description>Manage user accounts and their details.</Description>
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
            onClick={handleAddUser}
          >
            <FaUserPlus /> Add User
          </ActionButton>
        </HeaderActions>
      </Header>

      <UsersTable>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <UserEmail href={`mailto:${user.email}`}>
                    {user.email}
                  </UserEmail>
                </td>
                <td>{user.registered}</td>
                <td>
                  <StatusBadge status={user.status}>
                    {user.status}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButtons>
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditUser(user.id)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </UsersTable>
    </PageContainer>
  );
};

export default Users;
