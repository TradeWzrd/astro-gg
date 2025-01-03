import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loginUser } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import ShootingStars from '../components/ShootingStars';
import FlickeringStars from '../components/FlickeringStars';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1c1c3d 0%, #4b0082 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
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
  position: relative;
`;

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Input = styled.input`
  padding: 1rem 1rem 1rem 2.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #a78bfa;
    box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 2.3rem;
  color: rgba(255, 255, 255, 0.5);
`;

const LoginButton = styled(motion.button)`
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(167, 139, 250, 0.4);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 1rem;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const SocialButton = styled(motion.button)`
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1.5rem;
  text-decoration: none;
  font-size: 0.9rem;

  span {
    color: #a78bfa;
    font-weight: 600;
    margin-left: 0.3rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPassword = styled(Link)`
  color: #a78bfa;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  display: block;
  margin-top: -1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const DemoCredentials = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #a78bfa;
  font-size: 0.9rem;

  h4 {
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
  }
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

    try {
      const success = await dispatch(loginUser({ email, password }));
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(error || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ShootingStars />
      <FlickeringStars />

      <LoginContainer>
        <LoginCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Welcome Back</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>
                <FaEnvelope /> Email Address
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
            </InputGroup>

            <InputGroup>
              <Label>
                <FaLock /> Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <InputIcon>
                <FaLock />
              </InputIcon>
            </InputGroup>

            <ForgotPassword to="/forgot-password">
              Forgot your password?
            </ForgotPassword>

            <LoginButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </LoginButton>
          </Form>

          <DemoCredentials>
            <h4>Demo Accounts</h4>
            <p>Admin - admin@demo.com / admin123</p>
            <p>User - test123@gmail.com / test123</p>
          </DemoCredentials>

          <Divider>Or continue with</Divider>

          <SocialLogin>
            <SocialButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGoogle /> Google
            </SocialButton>
            <SocialButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFacebook /> Facebook
            </SocialButton>
          </SocialLogin>

          <RegisterLink to="/register">
            Don't have an account?<span>Create one now</span>
          </RegisterLink>
        </LoginCard>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;
