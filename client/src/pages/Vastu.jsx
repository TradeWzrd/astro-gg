import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaPlus, FaMinus, FaArrowRight, FaHome, FaBuilding, FaStore, FaWarehouse, FaPrayingHands, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import GlassyNav from '../components/GlassyNav';
import { serviceAPI } from '../services/api';
import { addItemToCart } from '../Redux/CartSlice';
import { productAPI } from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #2D1B69 0%, #1a103f 50%, #0F051D 100%);
  padding: 160px 20px 40px;
  color: white;
  position: relative;
  overflow: hidden;
`;

const ServiceGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(182, 213, 255, 0.1) 0%,
      rgba(123, 158, 255, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(182, 213, 255, 0.5);
    box-shadow: 0 8px 32px rgba(182, 213, 255, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #B6D5FF;
  text-align: center;
  
  svg {
    filter: drop-shadow(0 0 10px rgba(182, 213, 255, 0.3));
  }
`;

const ServiceTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(45deg, #B6D5FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FAQSection = styled.div`
  margin-top: 2rem;
  position: relative;
  z-index: 3;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(182, 213, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: ${props => props.isOpen ? '0.5rem' : '0'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 4;

  &:hover {
    background: rgba(182, 213, 255, 0.15);
    transform: translateX(5px);
  }

  span {
    flex: 1;
    margin-right: 1rem;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(182, 213, 255, 0.05);
  border-radius: 0 0 10px 10px;
  margin-top: -5px;
  border-left: 3px solid #B6D5FF;
  position: relative;
  z-index: 3;
`;

const PriceTag = styled(motion.div)`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #B6D5FF;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
  }
`;

const BookNowButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.1rem;
  position: relative;
  z-index: 10;
  pointer-events: auto !important;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(182, 213, 255, 0.3);
  }

  svg {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  margin: 2rem 0 3rem;
  background: linear-gradient(45deg, #B6D5FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  position: relative;
  z-index: 2;
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: stars 20s linear infinite;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
      radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
  }

  @keyframes stars {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

const getServiceIcon = (serviceName) => {
  switch (serviceName) {
    case "Business/Profession Vastu":
      return <FaBuilding />;
    case "Home Vastu":
      return <FaHome />;
    case "Rental Shop/Small Business Vastu":
      return <FaStore />;
    case "Office Vastu":
      return <FaWarehouse />;
    case "Devta Activation Vastu":
      return <FaPrayingHands />;
    default:
      return <FaHome />;
  }
};

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <FAQItem>
      <FAQQuestion onClick={toggleFAQ} isOpen={isOpen}>
        <span>{question}</span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </FAQQuestion>
      <AnimatePresence>
        {isOpen && (
          <FAQAnswer
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.25 },
              height: { duration: 0.4 }
            }}
          >
            {answer}
          </FAQAnswer>
        )}
      </AnimatePresence>
    </FAQItem>
  );
};

const ServiceCardComponent = ({ service, serviceId, index, isService, isProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const isAdmin = user?.isAdmin;

  // Generate a unique productId based on the service ID or name
  const productId = serviceId || ('vastu-' + service.serviceName.toLowerCase().replace(/\s+/g, '-'));

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    
    // Handle different price formats
    let priceValue = 7999; // Default price
    
    if (typeof service.pricing === 'number') {
      priceValue = service.pricing;
    } else if (typeof service.pricing === 'string') {
      try {
        // Parse the pricing string to extract the first number
        const priceStr = service.pricing.split('–')[0].trim();
        const numericValue = priceStr.replace(/[^\d]/g, '');
        if (numericValue) {
          priceValue = parseInt(numericValue, 10);
        }
      } catch (error) {
        console.log('Error parsing price:', error);
        // Continue with default price if parsing fails
      }
    }
    
    dispatch(addItemToCart({
      productId,
      quantity: 1
    }));
    
    toast.success(`${service.serviceName} added to cart`);
  };
  
  const handleEdit = () => {
    if (isService) {
      navigate(`/admin/service-edit/${serviceId}`);
    } else if (isProduct) {
      navigate(`/dashboard?tab=products&edit=${serviceId}`);
    }
  };
  return (
    <ServiceCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <ServiceIcon>
        {getServiceIcon(service.serviceName)}
      </ServiceIcon>
      <ServiceTitle>{service.serviceName}</ServiceTitle>
      <Description>{service.description}</Description>
      <PriceTag
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        {service.pricing}
      </PriceTag>
      <FAQSection>
        {service.faqs.map((faq, faqIndex) => (
          <FAQ key={faqIndex} question={faq.question} answer={faq.answer} />
        ))}
      </FAQSection>
      <div style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <BookNowButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          onClick={handleAddToCart}
          as="button"
          type="button"
        >
          <FaShoppingCart style={{ marginRight: '10px' }} /> Add to Cart
        </BookNowButton>
        
        {isAdmin && serviceId && (
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <BookNowButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              as="button"
              type="button"
              style={{ background: 'linear-gradient(45deg, #10B981, #059669)' }}
            >
              {isService ? 'Edit Service' : 'Edit Product'}
            </BookNowButton>
          </div>
        )}
      </div>
    </ServiceCard>
  );
};

const Vastu = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesAndProducts = async () => {
      try {
        setLoading(true);
        // Fetch both services and products in parallel
        const [servicesResponse, productsResponse] = await Promise.all([
          serviceAPI.getServices({ category: 'vastu' }),
          productAPI.getProducts('', '', 'vastu')
        ]);
        
        console.log('Services response:', servicesResponse.data);
        console.log('Products response:', productsResponse.data);
        
        setServices(servicesResponse.data.services || []);
        setProducts(productsResponse.data.products || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vastu data:', err);
        setError('Failed to load vastu data: ' + (err.message || 'Unknown error'));
        setLoading(false);
        // Fallback to empty arrays if API fails
        setServices([]);
        setProducts([]);
      }
    };

    fetchServicesAndProducts();
  }, []);

  return (
    <PageContainer>
      <GlassyNav />
      <StarBackground />
      <PageTitle>Vastu Services</PageTitle>
      <ServiceGrid>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '3rem' }}>
            <FaSpinner style={{ fontSize: '2rem', color: 'white', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : error ? (
          <div style={{ color: 'white', textAlign: 'center', padding: '3rem' }}>
            {error}
          </div>
        ) : services.length === 0 && products.length === 0 ? (
          <div style={{ color: 'white', textAlign: 'center', padding: '3rem' }}>
            No vastu services found.
          </div>
        ) : (
          <>
            {/* Display Services */}
            {services.map((service, index) => (
              <ServiceCardComponent 
                key={service._id} 
                service={{
                  serviceName: service.name,
                  description: service.description,
                  pricing: service.price,
                  faqs: service.faqs,
                  image: service.image
                }} 
                serviceId={service._id}
                index={index}
                isService={true}
              />
            ))}
            
            {/* Display Products */}
            {products.map((product, index) => (
              <ServiceCardComponent 
                key={product._id} 
                service={{
                  serviceName: product.name,
                  description: product.description,
                  pricing: product.price,
                  faqs: [],
                  image: product.images && product.images.length > 0 ? product.images[0].url : ''
                }} 
                serviceId={product._id}
                index={index + services.length}
                isProduct={true}
              />
            ))}
          </>
        )}
      </ServiceGrid>
    </PageContainer>
  );
};

export default Vastu;