import { Route, Routes } from "react-router-dom";
import React from 'react';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Astrology from "./pages/Astrology";
import Footer from "./components/Footer";
import Vastu from "./pages/Vastu";
import Numerology from "./pages/Numerology";
import RegistrationForm from "./pages/Registration";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Cart from "./pages/Cart";
import CartManager from "./pages/ParentCard";
import AstrologyPage from "./pages/TrianglePage";
import ProductPage from "./pages/ProductPage";
import VastuPage from './pages/VastuPage';
import AstroPage2 from './pages/AstroPage';
import TriangularCarousel from "./components/TriangularCarousal";
import ButtonComponent from "./pages/ButtonComponent";
import PhonePeApi from "./components/PhonePe";
import PayINComponent from "./components/PayInApi";
import AboutUs from "./pages/AboutUs"; 
import ContactUs from "./pages/ContactUs"; 
import DemoBlog from "./pages/DemoBlog";
import GlassyNav from "./components/GlassyNav";
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <div className="glow-container">
        <div className="glow-left"></div>
        <div className="glow-right"></div>
        <div className="glow-top"></div>
        <div className="glow-spot-left"></div>
        <div className="glow-spot-right"></div>
      </div>
      <div className="font-bold">
        <GlobalStyles />
        <GlassyNav />
        <Routes>
          <Route path="/bb" element={<PayINComponent/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/astrology-page/:id" element={<AstrologyPage/>}/>
          <Route path='/vastu' element={<Vastu/>}/>
          <Route path='/numerology' element={<Numerology/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/cart-manegar" element={<CartManager/>}/>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/astroSingle' element={<AstroPage2/>}/>
          <Route path="/triangle" element={<TriangularCarousel/>}/>
          <Route path="/demo-blog" element={<DemoBlog/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
