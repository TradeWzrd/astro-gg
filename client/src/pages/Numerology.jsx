import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaUser, FaBaby, FaClock, FaArrowUp, FaSearch, FaStar } from 'react-icons/fa';
import GlassyNav from '../components/GlassyNav';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  color: white;
  padding: 12rem 2rem 2rem;
  overflow-x: hidden;
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
`;

const ServiceTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PriceRange = styled.div`
  font-size: 1.2rem;
  color: #a78bfa;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FAQSection = styled.div`
  margin-top: auto;
`;

const FAQTitle = styled.div`
  cursor: pointer;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FAQContent = styled(motion.div)`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const SearchBar = styled(motion.div)`
  position: sticky;
  top: 80px;
  z-index: 100;
  margin: 0 auto 2rem;
  max-width: 600px;
  padding: 0 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FilterTags = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 0 1rem;
`;

const FilterTag = styled(motion.button)`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(99, 102, 241, 0.2);
  }
`;

const PopularSearchBadge = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BookingModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  width: 90%;
  max-width: 450px;
  background: linear-gradient(145deg, rgba(23, 25, 35, 0.95), rgba(30, 30, 45, 0.95));
  border-radius: 24px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.5rem;
  }

  form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #fff, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.75rem;
    font-weight: bold;
    width: 100%;
    letter-spacing: -0.5px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, ${props => props.focus ? '0.2' : '0.1'});
  background: rgba(255, 255, 255, 0.05);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  letter-spacing: 0.5px;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  ${props => props.as === 'textarea' && `
    min-height: 80px;
    resize: vertical;
  `}
`;

const ModalButton = styled(motion.button)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.9rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
`;

const SuccessNotification = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(34, 197, 94, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const StarsContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  animation: twinkle ${props => props.duration}s infinite;

  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity}; }
    50% { opacity: 0.2; }
  }
`;

const services = [
  {
    icon: <FaBriefcase />,
    title: "Business Numerology",
    description: "Unlock the potential of your business through numerical analysis. Get insights into favorable dates, naming strategies, and business decisions.",
    price: "₹2,100 - ₹5,100",
    faqs: [
      {
        q: "How can numerology help my business?",
        a: "Business numerology can help identify auspicious dates for important decisions, optimize your business name for success, and align your strategies with favorable numerical patterns."
      },
      {
        q: "What's included in the business analysis?",
        a: "Our analysis includes business name compatibility, lucky dates for major decisions, partnership compatibility, and financial timing recommendations."
      }
    ]
  },
  {
    icon: <FaUser />,
    title: "Personal Name Analysis",
    description: "Discover how your name influences your life path. Learn about your personality traits, strengths, and potential challenges.",
    price: "₹1,500 - ₹3,500",
    faqs: [
      {
        q: "Can changing my name improve my life?",
        a: "Name changes can influence your energy patterns and life experiences. We analyze potential name modifications that align better with your birth numbers and life goals."
      },
      {
        q: "What information do you need for name analysis?",
        a: "We need your full birth name, current name if different, and birth date to provide a comprehensive name analysis."
      }
    ]
  },
  {
    icon: <FaBaby />,
    title: "Newborn Name Selection",
    description: "Choose the perfect name for your child based on birth date, family numerology, and future life path predictions.",
    price: "₹2,500 - ₹4,500",
    faqs: [
      {
        q: "How do you choose a baby name?",
        a: "We consider the baby's birth date, parents' numbers, and desired life path to suggest names that will positively influence the child's future."
      },
      {
        q: "How many name options will I receive?",
        a: "You'll receive 5-10 carefully selected name options, each with a detailed analysis of its numerological significance."
      }
    ]
  },
  {
    icon: <FaClock />,
    title: "Wristwatch Analysis",
    description: "Learn how your wristwatch number can influence your daily life and decision-making abilities.",
    price: "₹1,000 - ₹2,500",
    faqs: [
      {
        q: "Does the watch number really matter?",
        a: "Yes, the numbers on your watch can create subtle influences on your timing, decision-making, and daily energy patterns."
      },
      {
        q: "What's included in watch analysis?",
        a: "We analyze your personal numbers in relation to watch numbers, suggesting optimal number combinations for your success."
      }
    ]
  }
];

const NumerologyPage = () => {
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const filters = ['All', 'Business', 'Personal', 'Family', 'Timing'];

  const toggleFilter = (filter) => {
    setActiveFilters(prev => {
      if (filter === 'All') return [];
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      }
      return [...prev.filter(f => f !== 'All'), filter];
    });
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeFilters.length === 0) return true;
    
    return activeFilters.some(filter => {
      switch (filter) {
        case 'Business': return service.title.includes('Business');
        case 'Personal': return service.title.includes('Personal');
        case 'Family': return service.title.includes('Newborn');
        case 'Timing': return service.title.includes('Watch');
        default: return true;
      }
    });
  });

  const handleBooking = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Booking submitted:', { service: selectedService, ...formData });
    setShowBookingModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''
    });
  };

  const toggleFAQ = (serviceIndex, faqIndex) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [`${serviceIndex}-${faqIndex}`]: !prev[`${serviceIndex}-${faqIndex}`]
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <GlassyNav />
      <StarsContainer>
        <ShootingStars />
        <FlickeringStars />
      </StarsContainer>
      <PageContainer>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Numerology Services
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock the hidden meanings in your numbers and discover your true potential through our comprehensive numerology services
          </Subtitle>
        </Header>

        <SearchBar
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SearchInput
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterTags>
            {filters.map(filter => (
              <FilterTag
                key={filter}
                active={activeFilters.includes(filter) || (filter === 'All' && activeFilters.length === 0)}
                onClick={() => toggleFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </FilterTag>
            ))}
          </FilterTags>
        </SearchBar>

        <ServicesGrid>
          {filteredServices.map((service, serviceIndex) => (
            <ServiceCard
              key={serviceIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {service.title === 'Business Numerology' && (
                <PopularSearchBadge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FaStar /> Popular
                </PopularSearchBadge>
              )}
              <IconWrapper>{service.icon}</IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <PriceRange>{service.price}</PriceRange>
              
              <FAQSection>
                {service.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex}>
                    <FAQTitle onClick={() => toggleFAQ(serviceIndex, faqIndex)}>
                      {faq.q}
                      {expandedFAQs[`${serviceIndex}-${faqIndex}`] ? '−' : '+'}
                    </FAQTitle>
                    <AnimatePresence>
                      {expandedFAQs[`${serviceIndex}-${faqIndex}`] && (
                        <FAQContent
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.a}
                        </FAQContent>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </FAQSection>

              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBooking(service)}
              >
                Book Consultation
              </Button>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <ScrollIndicator
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowUp />
        </ScrollIndicator>

        <AnimatePresence>
          {showBookingModal && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBookingModal(false)}
              />
              <BookingModal
                initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                style={{ 
                  position: "fixed",
                  top: "50%",
                  left: "50%"
                }}
              >
                <CloseButton
                  onClick={() => setShowBookingModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </CloseButton>
                <h2>Book {selectedService?.title}</h2>
                <form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Preferred Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Additional Message</Label>
                    <Input
                      as="textarea"
                      placeholder="Share any specific requirements or questions you have..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </FormGroup>
                  <ModalButton
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Booking
                  </ModalButton>
                </form>
              </BookingModal>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <SuccessNotification
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              ✓ Booking submitted successfully!
            </SuccessNotification>
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
};

export default NumerologyPage;
