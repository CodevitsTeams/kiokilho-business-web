import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('kiokilho_cookie_consent');
    if (!hasConsented) {
      // Show with a slight delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kiokilho_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '12px',
            right: '12px',
            zIndex: 9999,
            maxWidth: '380px',
            background: 'rgba(25, 25, 25, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            color: '#f5f5f7',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🍪</span>
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>Privasi dan Penyimpanan</h4>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#a1a1a6', marginBottom: '20px' }}>
            Kami menggunakan cookie & penyimpanan lokal untuk mengamankan keranjang belanja Anda dan memastikan pengalaman berbelanja terbaik.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleAccept}
              style={{
                flex: 1,
                background: '#ffffff',
                color: '#1d1d1f',
                border: 'none',
                padding: '10px 0',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.background = '#e5d3b3';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              Mengerti & Setuju
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
