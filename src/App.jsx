import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import AllProducts from './components/AllProducts'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfUse from './components/TermsOfUse'
import Legal from './components/Legal'
import DeveloperPolicy from './components/DeveloperPolicy'
import Warranty from './components/Warranty'
import Care from './components/Care'
import Recycling from './components/Recycling'
import Shipping from './components/Shipping'
import Story from './components/Story'
import Careers from './components/Careers'
import Investors from './components/Investors'
import Ethics from './components/Ethics'
import CookieConsent from './components/CookieConsent'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  useEffect(() => {
    // Clear any hash in URL that might cause jumping
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Force scroll to top immediately
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
    
    // Fallback for some browsers that trigger scroll slightly after load
    setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 100);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
          <Navbar />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/developer" element={<DeveloperPolicy />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/care" element={<Care />} />
            <Route path="/recycling" element={<Recycling />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/story" element={<Story />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
          <AIAssistant />
          <CookieConsent />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
