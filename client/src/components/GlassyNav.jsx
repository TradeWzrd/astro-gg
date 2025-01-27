import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components";
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../Redux/AuthSlice';
import { toast } from 'react-hot-toast';

const MotionNav = motion.create(styled.nav`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
`);

const MotionContainer = motion.create(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  background: rgba(18, 0, 47, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`);

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img.attrs(props => ({
  src: props.$src || '/logo.png',
  alt: props.$alt || 'Logo'
}))`
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 160px;
    left: 1rem;
    right: 1rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: rgba(18, 0, 47, 0.3);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const NavLink = motion.create(styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #a78bfa, #6d28d9);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #a78bfa;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`);

const NavIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = motion.create(styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #a78bfa;
  }
`);

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const UserMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  min-width: 150px;
`;

const MenuItem = styled(motion.div)`
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserContainer = styled.div`
  position: relative;
`;

const GlassyNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/login');
    setShowUserMenu(false);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <MotionNav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionContainer>
        <LogoContainer to="/">
          <LogoImage $src="/assets/logo.svg" $alt="Astrology Logo" />
        </LogoContainer>
        <NavItems>
          <NavLink
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/astrology"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Astrology
          </NavLink>
          <NavLink
            to="/vastu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Vastu
          </NavLink>
          <NavLink
            to="/numerology"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Numerology
          </NavLink>
          <NavLink
            to="/demo-blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </NavLink>
        </NavItems>
        <NavIconsContainer>
          <Link to="/cart">
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
            </IconButton>
          </Link>

          <UserContainer>
            <IconButton
              onClick={handleUserClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaUser size={20} />
              {isAuthenticated && <span style={{ fontSize: '0.9rem' }}>{user?.name}</span>}
            </IconButton>

            <AnimatePresence>
              {showUserMenu && isAuthenticated && (
                <UserMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate('/dashboard');
                      setShowUserMenu(false);
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <FaUser size={16} />
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    whileHover={{ x: 5 }}
                  >
                    <FaSignOutAlt size={16} />
                    Logout
                  </MenuItem>
                </UserMenu>
              )}
            </AnimatePresence>
          </UserContainer>
        </NavIconsContainer>
        <MobileMenuButton onClick={toggleMobileMenu}>
          <span>☰</span>
        </MobileMenuButton>
      </MotionContainer>

      <MobileMenu 
        $isOpen={isMobileMenuOpen}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/astrology">Astrology</NavLink>
        <NavLink to="/vastu">Vastu</NavLink>
        <NavLink to="/numerology">Numerology</NavLink>
        <NavLink to="/demo-blog">Blog</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </MobileMenu>
    </MotionNav>
  );
};

export default GlassyNav;
