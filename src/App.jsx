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
          </Routes>
          <Footer />
          <AIAssistant />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
