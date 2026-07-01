import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = scrolled ? 'var(--text-primary)' : '#ffffff';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar ${scrolled ? 'glass border-bottom' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: textColor, transition: 'color 0.3s ease' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: textColor, transition: 'background 0.3s ease' }}></div>
          <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', fontFamily: 'Playfair Display, serif' }}>Kiokilho</span>
        </Link>

        {/* Links (Desktop) */}
        <div className="nav-links" style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', fontWeight: 500, color: textColor, transition: 'color 0.3s ease' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link>
          <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Koleksi</Link>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Jumputan Art</Link>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Bespoke</Link>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', color: textColor, transition: 'color 0.3s ease' }}>
          <Search size={18} style={{ cursor: 'pointer' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={openCart}>
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ position: 'absolute', top: -8, right: -8, background: 'var(--accent-color)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}
              >
                {totalItems}
              </motion.div>
            )}
          </div>
          <Menu size={18} className="mobile-menu" style={{ cursor: 'pointer', display: 'none' }} />
        </div>
      </div>
    </motion.nav>
  );
}
