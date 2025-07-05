import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import ReviewsSection from './components/ReviewsSection';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Cart = lazy(() => import('./pages/Cart'));
const Astrology = lazy(() => import('./pages/Astrology'));
const Numerology = lazy(() => import('./pages/Numerology'));
const Vastu = lazy(() => import('./pages/Vastu'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const Footer = lazy(() => import('./components/Footer'));
const Product = lazy(() => import('./pages/Product'));
const VastuConsultation = lazy(() => import('./pages/Product/VastuConsultation'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const Checkout = lazy(() => import('./pages/Checkout'));
const UserOrders = lazy(() => import('./pages/UserOrders'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutUs />
              <ServicesSection />
              <ReviewsSection />
              <Footer />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order/:orderId" element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } />
          <Route path="/profile/orders" element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          } />
          <Route path="/astrology" element={<Astrology />} />
          <Route path="/numerology" element={<Numerology />} />
          <Route path="/vastu" element={<Vastu />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/vastu-consultation" element={<VastuConsultation />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
