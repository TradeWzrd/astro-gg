import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaSave, FaKey, FaBell, FaPalette, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';
import Layout from '../components/Layout';

const PageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a78bfa;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #a78bfa;
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #a78bfa;
  }

  option {
    background: #1c1c3d;
    color: white;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #a78bfa;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Button = styled(motion.button)`
  background: ${props => props.variant === 'primary' ? 
    'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)' : 
    'rgba(255, 255, 255, 0.05)'};
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
`;

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'en',
    theme: 'dark',
    notifications: true,
    twoFactor: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings functionality
    toast.success('Settings saved successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Password change functionality
    toast.success('Password changed successfully!');
  };

  return (
    <Layout>
      <PageContainer>
        <ShootingStars />
        <FlickeringStars />
        
        <Header>
          <Title>Settings</Title>
          <Description>Manage your account settings and preferences.</Description>
        </Header>

        <SettingsGrid>
          <Section>
            <SectionTitle>
              <FaShieldAlt /> Profile Settings
            </SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormGroup>
              <Button
                variant="primary"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSave /> Save Changes
              </Button>
            </Form>
          </Section>

          <Section>
            <SectionTitle>
              <FaKey /> Security
            </SectionTitle>
            <Form onSubmit={handlePasswordChange}>
              <FormGroup>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                />
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
              </FormGroup>
              <FormGroup>
                <Label>Two-Factor Authentication</Label>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    name="twoFactor"
                    checked={formData.twoFactor}
                    onChange={handleChange}
                  />
                  <span />
                </ToggleSwitch>
              </FormGroup>
              <Button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaKey /> Change Password
              </Button>
            </Form>
          </Section>

          <Section>
            <SectionTitle>
              <FaPalette /> Preferences
            </SectionTitle>
            <Form>
              <FormGroup>
                <Label>Theme</Label>
                <Select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                >
                  <option value="dark">Dark Theme</option>
                  <option value="light">Light Theme</option>
                  <option value="system">System Default</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Language</Label>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Email Notifications</Label>
                <ToggleSwitch>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                  <span />
                </ToggleSwitch>
              </FormGroup>
            </Form>
          </Section>
        </SettingsGrid>
      </PageContainer>
    </Layout>
  );
};

export default Settings;
