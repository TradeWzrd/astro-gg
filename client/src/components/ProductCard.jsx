import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { toast } from 'react-hot-toast';

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Price = styled.div`
  font-size: 1.8rem;
  color: #B6D5FF;
  font-weight: 600;
`;

const AddToCartButton = styled(motion.button)`
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  border: none;
  padding: 1rem;
  border-radius: 10px;
  color: #1a103f;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ProductCard = ({ id, title, description, price, image }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name: title,
      description,
      price,
      image
    }));
    toast.success('Added to cart!');
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <img 
          src={image} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover', 
            borderRadius: '10px' 
          }} 
        />
      )}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>₹{price.toFixed(2)}</Price>
      <AddToCartButton
        onClick={handleAddToCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add to Cart
      </AddToCartButton>
    </Card>
  );
};

export default ProductCard;
