import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/Kiokilho_transparent.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const darkSections = document.querySelectorAll('.dark-section');
      let overDark = false;
      const navHeight = 80;
      
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom >= navHeight) {
          overDark = true;
        }
      });
      setIsOverDarkSection(overDark);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jika bukan di halaman beranda (misal halaman Koleksi), paksa navbar selalu dalam state "scrolled" agar teks berwarna gelap
  const isHomePage = location.pathname === '/';
  const effectiveScrolled = isHomePage ? scrolled : true;

  const textColor = isOverDarkSection ? '#ffffff' : (effectiveScrolled ? 'var(--text-primary)' : '#ffffff');
  
  const navBackground = isOverDarkSection 
    ? 'rgba(10, 10, 10, 0.7)' 
    : (effectiveScrolled ? 'var(--glass-bg)' : 'transparent');
    
  const navBorder = isOverDarkSection 
    ? '1px solid rgba(255,255,255,0.05)' 
    : (effectiveScrolled ? '1px solid var(--border-color)' : '1px solid transparent');

  const getWhatsAppUrl = () => {
    const now = new Date();
    // Gunakan zona waktu WIB (Asia/Jakarta)
    const wibOptions = { timeZone: 'Asia/Jakarta', hour: 'numeric', hour12: false };
    const wibHour = parseInt(new Intl.DateTimeFormat('en-US', wibOptions).format(now), 10);
    
    let greeting = 'pagi';
    if (wibHour >= 11 && wibHour < 15) {
      greeting = 'siang';
    } else if (wibHour >= 15 && wibHour < 18) {
      greeting = 'sore';
    } else if (wibHour >= 18 || wibHour < 3) {
      greeting = 'malam';
    }
    
    const waText = `Hai kak selamat ${greeting}, aku boleh tanya-tanya tentang produk Kiokilho?`;
    return `https://wa.me/6281226841755?text=${encodeURIComponent(waText)}`;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        transition: 'all 0.3s ease',
        background: navBackground,
        backdropFilter: effectiveScrolled || isOverDarkSection ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: effectiveScrolled || isOverDarkSection ? 'blur(20px)' : 'none',
        borderBottom: navBorder,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img 
            src={logoImg} 
            alt="Kiokilho" 
            style={{ 
              height: '32px', 
              objectFit: 'contain', 
              transition: 'all 0.3s ease',
              filter: textColor === '#ffffff' ? 'brightness(0) invert(1)' : 'none'
            }} 
          />
        </Link>

        {/* Links (Desktop) */}
        <div className="nav-links mobile-hidden" style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', fontWeight: 500, color: textColor, transition: 'color 0.3s ease' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link>
          <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Koleksi</Link>
          <Link 
            to="/#filosofi" 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('filosofi')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Filosofi
          </Link>
          <Link 
            to="/#bespoke" 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('bespoke')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Bespoke
          </Link>
          <Link 
            to="/#jumputan-art" 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('jumputan-art')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Jumputan Heritage
          </Link>
          <Link 
            to="/#testimonial" 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('testimonial')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Testimoni
          </Link>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', color: textColor, transition: 'color 0.3s ease' }}>
          <Search size={18} style={{ cursor: 'pointer' }} onClick={() => setIsSearchOpen(true)} />
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
          <a
            href={getWhatsAppUrl()}
            target="_blank" 
            rel="noopener noreferrer"
            className="mobile-hidden"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#25D366', 
              color: '#1d1d1f',
              padding: '6px 6px 6px 16px',
              borderRadius: '50px',
              fontSize: '0.95rem',
              fontWeight: 500,
              fontFamily: 'Outfit, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.2)',
              transition: 'transform 0.2s ease',
              marginLeft: '0.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            WhatsApp
            <div style={{
              background: '#fdfbf7',
              color: '#1d1d1f',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
          </a>
          <Menu onClick={() => setIsMobileMenuOpen(true)} size={24} className="mobile-block" style={{ cursor: 'pointer', display: 'none' }} />
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid var(--border-color)',
              zIndex: 1001
            }}
          >
            <div style={{ maxWidth: '800px', width: '100%', padding: '0 2rem', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={22} style={{ position: 'absolute', left: '3rem', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Cari koleksi (misal: tote, sling)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    if (searchQuery.trim()) {
                      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery('');
                    }
                  }
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 3.5rem',
                  fontSize: '1.2rem',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontFamily: 'Playfair Display, serif'
                }}
              />
              <button onClick={() => setIsSearchOpen(false)} style={{ position: 'absolute', right: '3rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 0, display: 'flex' }}>
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              background: 'var(--bg-color)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <img src={logoImg} alt="Kiokilho" style={{ height: '28px', filter: 'brightness(0)' }} />
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-primary)', cursor: 'pointer' }}>
                <X size={32} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Beranda</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Koleksi</Link>
              <Link to="/#filosofi" onClick={() => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  setTimeout(() => document.getElementById('filosofi')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }
              }} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Filosofi</Link>
              <Link to="/#bespoke" onClick={() => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  setTimeout(() => document.getElementById('bespoke')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }
              }} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Bespoke</Link>
              <Link to="/#jumputan-art" onClick={() => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  setTimeout(() => document.getElementById('jumputan-art')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }
              }} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Jumputan Heritage</Link>
              <Link to="/#testimonial" onClick={() => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  setTimeout(() => document.getElementById('testimonial')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }
              }} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Testimoni</Link>
            </div>

            <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '1rem', background: '#25D366', color: '#1d1d1f', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
