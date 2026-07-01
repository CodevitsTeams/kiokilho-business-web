import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import PressMentions from './components/PressMentions'
import Craftsmanship from './components/Craftsmanship'
import ProductShowcase from './components/ProductShowcase'
import Testimonials from './components/Testimonials'
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
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar />
      <main>
        <Hero />
        <PressMentions />
        <BentoGrid />
        <Craftsmanship />
        <ProductShowcase />
        <Testimonials />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}

export default App
