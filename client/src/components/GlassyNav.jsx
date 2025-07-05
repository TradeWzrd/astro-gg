import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components";
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../Redux/AuthSlice';
import { toast } from 'react-hot-toast';

const MotionNav = motion.create(styled.nav`
  position: fixed;
  top: ${props => props.$scrolled ? '0' : '1rem'};
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.$scrolled ? '0.25rem' : '0.5rem'};
  transition: all 0.3s ease;
`);

const MotionContainer = motion.create(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.$scrolled ? '0.5rem 2rem' : '0.75rem 2rem'};
  border-radius: ${props => props.$scrolled ? '0' : '16px'};
  backdrop-filter: blur(12px);
  background: ${props => props.$scrolled ? 'rgba(18, 0, 47, 0.9)' : 'rgba(18, 0, 47, 0.3)'};
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: ${props => props.$scrolled ? '0.5rem 1rem' : '0.75rem 1rem'};
    border-radius: ${props => props.$scrolled ? '0' : '12px'};
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
  height: ${props => props.$scrolled ? '30px' : '36px'};
  width: auto;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: ${props => props.$scrolled ? '1.5rem' : '2rem'};
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
    top: ${props => props.$scrolled ? '60px' : '80px'};
    left: 1rem;
    right: 1rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: rgba(18, 0, 47, 0.8);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }
`;

const NavLink = motion.create(styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: ${props => props.$scrolled ? '0.9rem' : '1rem'};
  position: relative;
  padding: 0.5rem 0.8rem;
  transition: all 0.3s ease;
  opacity: ${props => props.$isActive ? '1' : '0.8'};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #a78bfa, #6d28d9);
    transform: scaleX(${props => props.$isActive ? '1' : '0'});
    transform-origin: ${props => props.$isActive ? 'left' : 'right'};
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #a78bfa;
    opacity: 1;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1rem;

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
  padding: ${props => props.$scrolled ? '0.3rem' : '0.5rem'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${props => props.$scrolled ? '0.9rem' : '1rem'};
  transition: all 0.3s ease;

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
  width: ${props => props.$scrolled ? '16px' : '20px'};
  height: ${props => props.$scrolled ? '16px' : '20px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$scrolled ? '0.7rem' : '0.8rem'};
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const UserMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(18, 0, 47, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  min-width: 150px;
  z-index: 1001;
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

const UserName = styled.span`
  font-size: ${props => props.$scrolled ? '0.8rem' : '0.9rem'};
  margin-left: 0.5rem;
  transition: all 0.3s ease;
  display: ${props => props.$scrolled ? 'none' : 'inline'};
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const GlassyNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Determine if scrolled down enough to change navbar style
      setScrolled(currentScrollPos > 50);
      
      // Determine visibility based on scroll direction
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(visible);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <MotionNav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      $scrolled={scrolled}
    >
      <MotionContainer $scrolled={scrolled}>
        <LogoContainer to="/">
          <LogoImage $src="/assets/logo.svg" $alt="Astrology Logo" $scrolled={scrolled} />
        </LogoContainer>
        <NavItems $scrolled={scrolled}>
          <NavLink
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/")}
          >
            Home
          </NavLink>
          <NavLink
            to="/astrology"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/astrology")}
          >
            Astrology
          </NavLink>
          <NavLink
            to="/vastu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/vastu")}
          >
            Vastu
          </NavLink>
          <NavLink
            to="/numerology"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/numerology")}
          >
            Numerology
          </NavLink>
          <NavLink
            to="/demo-blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/demo-blog")}
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/about")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            $scrolled={scrolled}
            $isActive={isActive("/contact")}
          >
            Contact
          </NavLink>
        </NavItems>
        <NavIconsContainer>
          <Link to="/cart">
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              $scrolled={scrolled}
            >
              <FaShoppingCart size={scrolled ? 18 : 20} />
              {cartItemCount > 0 && <CartCount $scrolled={scrolled}>{cartItemCount}</CartCount>}
            </IconButton>
          </Link>

          <UserContainer>
            <IconButton
              onClick={handleUserClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              $scrolled={scrolled}
            >
              <FaUser size={scrolled ? 18 : 20} />
              {isAuthenticated && (
                <UserName $scrolled={scrolled}>{user?.name}</UserName>
              )}
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
                    onClick={() => {
                      navigate('/profile/orders');
                      setShowUserMenu(false);
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <FaUser size={16} />
                    My Orders
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
        $scrolled={scrolled}
      >
        <NavLink to="/" $isActive={isActive("/")} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/astrology" $isActive={isActive("/astrology")} onClick={() => setIsMobileMenuOpen(false)}>Astrology</NavLink>
        <NavLink to="/vastu" $isActive={isActive("/vastu")} onClick={() => setIsMobileMenuOpen(false)}>Vastu</NavLink>
        <NavLink to="/numerology" $isActive={isActive("/numerology")} onClick={() => setIsMobileMenuOpen(false)}>Numerology</NavLink>
        <NavLink to="/demo-blog" $isActive={isActive("/demo-blog")} onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
        <NavLink to="/about" $isActive={isActive("/about")} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" $isActive={isActive("/contact")} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
      </MobileMenu>
    </MotionNav>
  );
};

export default GlassyNav;
