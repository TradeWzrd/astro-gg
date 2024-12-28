import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loginUser } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import GlassyNav from '../components/GlassyNav';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #332BA3 0%, #1E0038 100%);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #B6D5FF;
  }
`;

const LoginButton = styled(motion.button)`
  padding: 1rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(45deg, #B6D5FF, #7B9EFF);
  color: #1a103f;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const DemoCredentials = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = dispatch(loginUser({ email, password }));

    if (success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(error || 'Invalid credentials');
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail('test123@gmail.com');
    setPassword('test123@gmail.com');
  };

  return (
    <PageContainer>
      <GlassyNav />
      <ShootingStars />
      <FlickeringStars />

      <LoginContainer>
        <LoginCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </InputGroup>

            <LoginButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </LoginButton>
          </Form>

          <DemoCredentials>
            <p>Demo Account:</p>
            <p>Email: test123@gmail.com</p>
            <p>Password: test123@gmail.com</p>
            <LoginButton
              onClick={fillDemoCredentials}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Fill Demo Credentials
            </LoginButton>
          </DemoCredentials>
        </LoginCard>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;
