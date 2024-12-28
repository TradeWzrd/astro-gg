import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { gsap } from "gsap";
import { FaPhone, FaWhatsapp, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';
import GlassyNav from "../components/GlassyNav";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AdditionalServices from "../components/AdditionalServices";
import AboutUs from "../components/AboutUs";
import AstrologyReports from "../components/AstrologyReports";
import NumerologyReports from "../components/NumerologyReports";
import FAQs from "../components/FAQs";
import Vlogs from "../components/Vlogs";
import LoadingScreen from '../components/LoadingScreen';
import ScrollProgress from '../components/ScrollProgress';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import ReviewsSection from '../components/ReviewsSection';

const PageContainer = styled.div`
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
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

const FloatingMenu = styled(motion.div)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
`;

const FloatingButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ScrollToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const QuickContact = styled(motion.div)`
  position: fixed;
  right: 5rem;
  bottom: ${props => props.index * 4 + 2}rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  pointer-events: ${props => props.show ? 'all' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateX(${props => props.show ? '0' : '20px'});
  transition: all 0.3s ease;
  z-index: 99;
  white-space: nowrap;
`;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const starsContainer = document.querySelector('.stars-container');
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = Math.random() * 0.8 + 0.2;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      starsContainer.appendChild(star);
    }

    gsap.from('.section', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.section',
        start: 'top 80%',
      },
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleContact = (type) => {
    switch(type) {
      case 'phone':
        window.location.href = 'tel:+1234567890';
        break;
      case 'whatsapp':
        window.open('https://wa.me/1234567890', '_blank');
        break;
      case 'calendar':
        // Add your calendar booking link here
        window.open('YOUR_BOOKING_LINK', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <FlickeringStars />
      <ShootingStars />
      <ScrollProgress />
      
      <StarsContainer className="stars-container" />
      <GlassyNav />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        
        <motion.div className="section">
          <ServicesSection />
        </motion.div>

        <motion.div className="section">
          <AstrologyReports />
        </motion.div>

        <motion.div className="section">
          <NumerologyReports />
        </motion.div>

        <motion.div className="section">
          <AdditionalServices />
        </motion.div>

        <motion.div className="section">
          <AboutUs />
        </motion.div>

        <motion.div className="section">
          <ReviewsSection />
        </motion.div>

        <motion.div className="section">
          <FAQs />
        </motion.div>

        <motion.div className="section">
          <Vlogs />
        </motion.div>
      </motion.div>

      <FloatingMenu
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <QuickContact 
          show={hoveredButton === 'phone'} 
          index={2}
        >
          Call us now
        </QuickContact>
        <QuickContact 
          show={hoveredButton === 'whatsapp'} 
          index={1}
        >
          Chat on WhatsApp
        </QuickContact>
        <QuickContact 
          show={hoveredButton === 'calendar'} 
          index={0}
        >
          Book a consultation
        </QuickContact>

        <FloatingButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('phone')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('phone')}
        >
          <FaPhone />
        </FloatingButton>
        
        <FloatingButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('whatsapp')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('whatsapp')}
        >
          <FaWhatsapp />
        </FloatingButton>
        
        <FloatingButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('calendar')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('calendar')}
        >
          <FaCalendarAlt />
        </FloatingButton>
      </FloatingMenu>

      <ScrollToTop
        visible={showScrollTop}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default Home;
