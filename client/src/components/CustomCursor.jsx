import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorOuter = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(167, 139, 250, 0.5);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorInner = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #a78bfa;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5
    }
  };

  const innerVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0
    }
  };

  return (
    <>
      <CursorOuter
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <CursorInner
        variants={innerVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  );
};

export default CustomCursor;
