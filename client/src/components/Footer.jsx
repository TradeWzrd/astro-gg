import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaStar
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  position: relative;
  background: rgba(13, 12, 34, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 4rem 0 2rem 0;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #a78bfa;
    transform: translateY(-3px);
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #a78bfa;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;

  svg {
    color: #a78bfa;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;

const Newsletter = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  flex: 1;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #a78bfa;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -1;
`;

const Star = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: ${props => props.opacity};
`;

const Footer = () => {
  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 2
  }));

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <FooterContainer>
      <StarBackground>
        {stars.map(star => (
          <Star
            key={star.id}
            style={{ top: `${star.top}%`, left: `${star.left}%` }}
            opacity={star.opacity}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}
      </StarBackground>

      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle>About Us</FooterTitle>
            <FooterText>
              Discover the mysteries of the cosmos with our expert astrology services. 
              We provide personalized readings and spiritual guidance to help you navigate 
              life's journey.
            </FooterText>
            <SocialLinks>
              <SocialIcon 
                href="#" 
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon 
                href="#" 
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </SocialIcon>
              <SocialIcon 
                href="#" 
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </SocialIcon>
              <SocialIcon 
                href="#" 
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube />
              </SocialIcon>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink to="/about"><FaStar /> About Us</FooterLink>
            <FooterLink to="/services"><FaStar /> Our Services</FooterLink>
            <FooterLink to="/contact"><FaStar /> Contact Us</FooterLink>
            <FooterLink to="/blog"><FaStar /> Blog</FooterLink>
            <FooterLink to="/faq"><FaStar /> FAQ</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contact Info</FooterTitle>
            <ContactItem>
              <FaPhone /> +1 234 567 8900
            </ContactItem>
            <ContactItem>
              <FaEnvelope /> info@astrology.com
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt /> 123 Cosmic Street, Universe City
            </ContactItem>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Newsletter</FooterTitle>
            <FooterText>
              Subscribe to our newsletter for daily horoscopes and cosmic updates.
            </FooterText>
            <Newsletter onSubmit={handleNewsletterSubmit}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <Button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </Button>
            </Newsletter>
          </FooterSection>
        </FooterGrid>

        <BottomBar>
          <p> 2024 Astrology. All rights reserved.</p>
        </BottomBar>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
