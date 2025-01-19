import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from "react-router-dom";
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
import ProductPage from "./pages/ProductPage";
import TriangularCarousel from "./components/TriangularCarousal";
import DemoBlog from "./pages/DemoBlog";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PayInApi from "./components/PayInApi";
import GlassyNav from "./components/GlassyNav";
import Footer from "./components/Footer";
import GlobalStyles from './styles/GlobalStyles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';

// Layout component that includes the navigation and footer
const Layout = () => {
  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <GlobalStyles />
      <GlassyNav />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
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
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="triangle" element={<TriangularCarousel />} />
      <Route path="demo-blog" element={<DemoBlog />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
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
