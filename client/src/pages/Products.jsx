import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
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

const AddButton = styled(motion.button)`
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
`;

const ProductTable = styled.div`
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

const StockBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => props.inStock ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.inStock ? '#22c55e' : '#ef4444'};
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: #a78bfa;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;

  &:hover {
    background: rgba(167, 139, 250, 0.1);
  }
`;

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Astrology Book',
      price: '$15.99',
      stock: true,
      lastUpdated: '2024-12-01'
    },
    {
      id: 2,
      name: 'Horoscope Report',
      price: '$25.00',
      stock: true,
      lastUpdated: '2024-12-10'
    },
    {
      id: 3,
      name: 'Tarot Card Set',
      price: '$12.50',
      stock: false,
      lastUpdated: '2024-12-15'
    },
    {
      id: 4,
      name: 'Crystal Healing Kit',
      price: '$35.00',
      stock: true,
      lastUpdated: '2024-12-20'
    }
  ]);

  const handleAddProduct = () => {
    // Add product functionality
  };

  const handleEditProduct = (id) => {
    // Edit product functionality
  };

  const handleDeleteProduct = (id) => {
    // Delete product functionality
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <Header>
        <Title>Products</Title>
        <AddButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddProduct}
        >
          <FaPlus /> Add Product
        </AddButton>
      </Header>

      <ProductTable>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <StockBadge inStock={product.stock}>
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                  </StockBadge>
                </td>
                <td>{product.lastUpdated}</td>
                <td>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ProductTable>
    </PageContainer>
  );
};

export default Products;
