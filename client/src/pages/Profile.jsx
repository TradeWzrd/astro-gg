import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../Redux/AuthSlice';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    placeOfBirth: '',
    timeOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  // Load user data when component mounts
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : '',
        placeOfBirth: user.placeOfBirth || '',
        timeOfBirth: user.timeOfBirth || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Only include password in update if it's been changed
    const updateData = { ...formData };
    if (!updateData.password) {
      delete updateData.password;
    }
    delete updateData.confirmPassword;

    try {
      const resultAction = await dispatch(updateUserProfile(updateData));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success('Profile updated successfully');
      }
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  return (
    <PageContainer>
      <ProfileContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Your Profile</h1>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <FaUser /> Full Name
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaEnvelope /> Email Address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly // Email shouldn't be changed after registration
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaPhone /> Phone Number
            </Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaCalendarAlt /> Date of Birth
            </Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaClock /> Time of Birth
            </Label>
            <Input
              type="time"
              name="timeOfBirth"
              value={formData.timeOfBirth}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaMapMarkerAlt /> Place of Birth
            </Label>
            <Input
              type="text"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </FormGroup>
          
          <Divider>Change Password (Optional)</Divider>
          
          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </FormGroup>
          
          <UpdateButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Profile'
            )}
          </UpdateButton>
        </Form>
      </ProfileContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #1c1c3d, #4b0082);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    color: white;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(138, 43, 226, 0.6);
    box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:read-only {
    background: rgba(255, 255, 255, 0.02);
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 59, 48, 0.2);
  color: #ff3b30;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const UpdateButton = styled(motion.button)`
  background: linear-gradient(to right, #9c27b0, #673ab7);
  color: white;
  border: none;
  padding: 1rem 0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default Profile;
