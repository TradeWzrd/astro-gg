import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #6d28d9, #a78bfa);
  transform-origin: 0%;
  z-index: 1000;
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(225deg) translateX(-2px);
  }
`;

const ScrollProgress = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      {showScrollTop && (
        <ScrollIndicator
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      )}
    </>
  );
};

export default ScrollProgress;
