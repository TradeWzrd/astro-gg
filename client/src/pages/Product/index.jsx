import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-hot-toast';
import ShootingStars from '../../components/ShootingStars';
import FlickeringStars from '../../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c3d 0%, #4b0082 100%);
  padding: 2rem;
  color: white;
  position: relative;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  background: rgba(0, 0, 0, 0.2);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #a78bfa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffd700;
  font-size: 1.25rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.8);

    &:before {
      content: "•";
      color: #a78bfa;
      font-size: 1.5rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
`;

const RelatedProducts = styled.div`
  margin-top: 4rem;
`;

const RelatedTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 1rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: white;
    }

    .price {
      color: #a78bfa;
      font-weight: 600;
    }
  }
`;

const Product = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: 1,
      name: "Vastu Consultation Platinum",
      price: 1000,
      quantity
    }));
    toast.success("Added to cart!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Basic Consultation",
      price: 500,
      image: "/path/to/image1.jpg"
    },
    {
      id: 3,
      name: "Premium Consultation",
      price: 750,
      image: "/path/to/image2.jpg"
    },
    {
      id: 4,
      name: "Elite Consultation",
      price: 1500,
      image: "/path/to/image3.jpg"
    }
  ];

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />
      
      <ProductContainer>
        <ImageSection>
          <ProductImage src="/path/to/product-image.jpg" alt="Vastu Consultation Platinum" />
        </ImageSection>

        <InfoSection>
          <div>
            <Title>Vastu Consultation Platinum</Title>
            <Rating>{renderStars(4.5)}</Rating>
          </div>

          <Price>₹1,000</Price>

          <Description>
            Get expert Vastu consultation from our certified professionals. Our Platinum package includes
            comprehensive analysis, detailed reports, and personalized recommendations for your space.
          </Description>

          <Features>
            <li>Detailed property analysis</li>
            <li>Personalized recommendations</li>
            <li>24/7 expert support</li>
            <li>Digital report included</li>
            <li>Follow-up consultation</li>
          </Features>

          <ButtonGroup>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
            <Button
              variant="secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now
            </Button>
          </ButtonGroup>
        </InfoSection>
      </ProductContainer>

      <RelatedProducts>
        <RelatedTitle>Related Products</RelatedTitle>
        <ProductGrid>
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={product.image} alt={product.name} />
              <div className="content">
                <h3>{product.name}</h3>
                <div className="price">₹{product.price}</div>
              </div>
            </ProductCard>
          ))}
        </ProductGrid>
      </RelatedProducts>
    </PageContainer>
  );
};

export default Product;
