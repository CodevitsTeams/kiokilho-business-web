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

  const handleDecline = () => {
    localStorage.setItem('kiokilho_cookie_consent', 'false');
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
            <h4 style={{ margin: 0, fontSize: '1.28rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.01em' }}>Privasi dan Penyimpanan</h4>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#a1a1a6', marginBottom: '20px' }}>
            Kami menggunakan cookie & penyimpanan lokal untuk mengamankan keranjang belanja Anda dan memastikan pengalaman berbelanja terbaik.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.button
              onClick={handleAccept}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={{
                initial: {
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  y: 0,
                  scale: 1
                },
                hover: {
                  backgroundColor: '#f8e3de',
                  boxShadow: '0 8px 24px rgba(248, 227, 222, 0.4)',
                  y: -1,
                  scale: 1.015
                }
              }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                color: '#111111',
                border: 'none',
                padding: '12px 0',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.02em',
                cursor: 'pointer'
              }}
            >
              {/* Shimmer Light Streak Effect */}
              <motion.div
                variants={{
                  initial: { x: '-100%', opacity: 0 },
                  hover: { x: '250%', opacity: 1 }
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
                  transform: 'skewX(-25deg)',
                  pointerEvents: 'none'
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Mengerti & Setuju</span>
            </motion.button>
            <motion.button
              onClick={handleDecline}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(248, 227, 222, 0.35)',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                scale: 1.015,
                y: -1
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.03)',
                color: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '0.92rem',
                letterSpacing: '0.01em',
                cursor: 'pointer'
              }}
            >
              Tolak
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
