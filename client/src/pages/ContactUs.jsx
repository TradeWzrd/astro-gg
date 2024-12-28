import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import GlassyNav from "../components/GlassyNav";
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  color: white;
  padding: 12rem 2rem 2rem;
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #B6D5FF, #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(182, 213, 255, 0.5);
    box-shadow: 0 8px 32px rgba(182, 213, 255, 0.2);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #B6D5FF;
    box-shadow: 0 0 10px rgba(182, 213, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #B6D5FF;
    box-shadow: 0 0 10px rgba(182, 213, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(182, 213, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    color: #B6D5FF;
    margin-right: 1rem;
  }
`;

const InfoText = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #FFFFFF;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(182, 213, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B6D5FF;
  transition: all 0.3s ease;
  
  &:hover {
    background: #B6D5FF;
    color: #1a103f;
    transform: translateY(-3px);
  }

  svg {
    font-size: 1.2rem;
  }
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

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <>
      <GlassyNav />
      <PageWrapper>
        <StarsContainer>
          <ShootingStars />
          <FlickeringStars />
        </StarsContainer>
        <Container>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </Title>

          <Grid>
            <ContactForm
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <TextArea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </SubmitButton>
            </ContactForm>

            <ContactInfo
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <InfoItem>
                <FaPhone />
                <InfoText>
                  <h3>Phone</h3>
                  <p>+91 123 456 7890</p>
                </InfoText>
              </InfoItem>

              <InfoItem>
                <FaEnvelope />
                <InfoText>
                  <h3>Email</h3>
                  <p>contact@astrologyservices.com</p>
                </InfoText>
              </InfoItem>

              <InfoItem>
                <FaMapMarkerAlt />
                <InfoText>
                  <h3>Location</h3>
                  <p>123 Cosmic Street, Spiritual Center<br />Mumbai, Maharashtra 400001</p>
                </InfoText>
              </InfoItem>

              <InfoItem>
                <FaWhatsapp />
                <InfoText>
                  <h3>WhatsApp</h3>
                  <p>+91 987 654 3210</p>
                </InfoText>
              </InfoItem>

              <SocialLinks>
                <SocialIcon
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebook />
                </SocialIcon>
                <SocialIcon
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter />
                </SocialIcon>
              </SocialLinks>
            </ContactInfo>
          </Grid>
        </Container>
      </PageWrapper>
    </>
  );
};

export default ContactUs;
