<<<<<<< HEAD
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet, Navigate, useLocation } from "react-router-dom";
=======
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from "react-router-dom";
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
import React from 'react';
import Home from "./pages/Home";
import Astrology from "./pages/Astrology";
import AstroPage from "./pages/AstroPage";
import Vastu from "./pages/Vastu";
import Numerology from "./pages/Numerology";
import RegistrationForm from "./pages/Registration";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
import ProductPage from "./pages/ProductPage";
import TriangularCarousel from "./components/TriangularCarousal";
import DemoBlog from "./pages/DemoBlog";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PayInApi from "./components/PayInApi";
import GlassyNav from "./components/GlassyNav";
import Footer from "./components/Footer";
<<<<<<< HEAD
import AdminServices from "./pages/AdminServices";
import ServiceEdit from "./pages/ServiceEdit";
import GlobalStyles from './styles/GlobalStyles';
import ProtectedRoute from "./components/ProtectedRoute";
=======
import GlobalStyles from './styles/GlobalStyles';
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';

// Layout component that includes the navigation and footer
const Layout = () => {
<<<<<<< HEAD
  // Get current location to check if we're on the dashboard
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
<<<<<<< HEAD
      flexDirection: 'column',
      zIndex: 0 // Base z-index for the layout
    }}>
      <GlobalStyles />
      {/* Only show the navigation if NOT on dashboard */}
      {!isDashboard && <GlassyNav />}
      <main style={{ 
        flex: 1, 
        position: 'relative', 
        zIndex: 2, // Increased to ensure content is visible
        display: 'block',
        width: '100%'
      }}>
        <Outlet />
      </main>
      {/* Only show the footer if NOT on dashboard */}
      {!isDashboard && <Footer />}
=======
      flexDirection: 'column'
    }}>
      <GlobalStyles />
      <GlassyNav />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
    </div>
  );
};

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="bb" element={<PayInApi />} />
      <Route path="astrology" element={<Astrology />} />
      <Route path="astrology-page/:id" element={<AstroPage />} />
      <Route path="vastu" element={<Vastu />} />
      <Route path="numerology" element={<Numerology />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route path="login" element={<LoginForm />} />
<<<<<<< HEAD
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
      <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="order/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="profile/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
=======
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="cart" element={<Cart />} />
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="triangle" element={<TriangularCarousel />} />
      <Route path="demo-blog" element={<DemoBlog />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
<<<<<<< HEAD
      
      {/* Admin Routes */}
      <Route path="admin-services" element={<ProtectedRoute adminOnly={true}><AdminServices /></ProtectedRoute>} />
      <Route path="service-edit/:id" element={<ProtectedRoute adminOnly={true}><ServiceEdit /></ProtectedRoute>} />
=======
>>>>>>> 2cd4a7384779fc1db615500d9a9239eb0f7d899c
    </Route>
  ),
  {
    basename: '/',
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_prependBasename: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
