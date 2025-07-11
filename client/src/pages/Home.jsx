import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhone, FaWhatsapp, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';
// Removed unused import
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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled.div`
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
<<<<<<< HEAD
  z-index: 1;
  overflow-y: auto; /* Changed to auto */
  display: block; /* Ensure it's a block element */
  isolation: isolate; /* Create a new stacking context */
=======
  z-index: 0;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
<<<<<<< HEAD
  z-index: 5; /* Increased to ensure it's above background elements */
  width: 100%;
  pointer-events: auto;
  display: block;
  /* Make sure content is visible and interactive */
  isolation: isolate; /* Create new stacking context */
=======
  z-index: 1;
  width: 100%;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
`;

const StarsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
<<<<<<< HEAD
  z-index: 0; /* Restored to 0 */
=======
  z-index: 0;
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
`;

const FloatingMenu = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
`;

const MenuButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ScrollToTopButton = styled(motion.button).attrs(props => ({
  style: {
    opacity: props.$isVisible ? 1 : 0,
    pointerEvents: props.$isVisible ? 'auto' : 'none'
  }
}))`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const QuickContact = styled(motion.div).attrs(props => ({
  style: {
    opacity: props.$show ? 1 : 0,
    transform: `translateX(${props.$show ? '0' : '20px'})`,
    pointerEvents: props.$show ? 'auto' : 'none'
  }
}))`
  position: absolute;
  right: calc(100% + 1rem);
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
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
    if (starsContainer) {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
      }
    }

    // Simplified scroll animation without using ScrollTrigger for now
    // This ensures sections are always visible, even if animations don't trigger
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      // Make sure all sections are visible by default
      section.style.opacity = 1;
      section.style.visibility = 'visible';
      section.style.display = 'block';
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
      
<<<<<<< HEAD
      {/* Background elements */}
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      <StarsContainer className="stars-container" />
      <FlickeringStars />
      <ShootingStars />
      <ScrollProgress />
      
      <ContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        
        {/* Services Section with direct rendering instead of motion wrappers */}
        <div className="section" style={{marginTop: '3rem', paddingTop: '3rem'}}>
          <ServicesSection />
        </div>

        <div className="section">
          <AstrologyReports />
        </div>

        <div className="section">
          <NumerologyReports />
        </div>

        <div className="section">
          <AdditionalServices />
        </div>

        <div className="section">
          <AboutUs />
        </div>

        <div className="section">
          <ReviewsSection />
        </div>

        <div className="section">
          <FAQs />
        </div>

        <div className="section">
          <Vlogs />
<<<<<<< HEAD
        </div>
=======
        </motion.div>
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      </ContentWrapper>

      <FloatingMenu
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <QuickContact 
          $show={hoveredButton === 'phone'} 
          index={2}
        >
          Call us now
        </QuickContact>
        <QuickContact 
          $show={hoveredButton === 'whatsapp'} 
          index={1}
        >
          Chat on WhatsApp
        </QuickContact>
        <QuickContact 
          $show={hoveredButton === 'calendar'} 
          index={0}
        >
          Book a consultation
        </QuickContact>

        <MenuButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('phone')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('phone')}
        >
          <FaPhone />
        </MenuButton>
        
        <MenuButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('whatsapp')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('whatsapp')}
        >
          <FaWhatsapp />
        </MenuButton>
        
        <MenuButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredButton('calendar')}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={() => handleContact('calendar')}
        >
          <FaCalendarAlt />
        </MenuButton>
      </FloatingMenu>

      <ScrollToTopButton
        $isVisible={showScrollTop}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        initial={false}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowUp />
      </ScrollToTopButton>
    </PageContainer>
  );
};

export default Home;
