import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components";
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../store/authSlice';
import { toast } from 'react-hot-toast';

const NavWrapper = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
`;

const GlassyNavContainer = styled(motion.div)`
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
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    display: ${props => props.isOpen ? 'flex' : 'none'};
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

const NavItem = styled(motion(Link))`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled(motion.div)`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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
    dispatch(logout());
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
    <NavWrapper>
      <GlassyNavContainer>
        <Logo to="/">Astrology</Logo>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/astrology">Astrology</NavItem>
          <NavItem to="/vastu">Vastu</NavItem>
          <NavItem to="/numerology">Numerology</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </NavItems>
        <IconContainer>
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
        </IconContainer>
        <MobileMenuButton onClick={toggleMobileMenu}>
          <span>☰</span>
        </MobileMenuButton>
      </GlassyNavContainer>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <NavItem to="/">Home</NavItem>
        <NavItem to="/astrology">Astrology</NavItem>
        <NavItem to="/vastu">Vastu</NavItem>
        <NavItem to="/numerology">Numerology</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </MobileMenu>
    </NavWrapper>
  );
};

export default GlassyNav;
