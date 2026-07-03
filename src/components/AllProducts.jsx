import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ShoppingCart, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toteImg from '../assets/tote_bag.png';
import slingImg from '../assets/sling_bag.png';
import backpackImg from '../assets/backpack_bag.png';

import { supabase } from '../lib/supabase';
import Lenis from 'lenis';

function ImageWithSkeleton({ src, alt, variants, transition, style, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  // Merge external animate props with our loading opacity state
  const mergedAnimate = typeof props.animate === 'object'
    ? { ...props.animate, opacity: isLoaded ? (props.animate.opacity !== undefined ? props.animate.opacity : 1) : 0 }
    : (props.animate ? props.animate : { opacity: isLoaded ? 1 : 0 });

  return (
    <>
      {!isLoaded && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: '#e0e0e0',
            zIndex: 1,
            ...style,
            width: '100%', height: '100%'
          }}
        />
      )}
      <motion.img
        ref={imgRef}
        {...props}
        animate={mergedAnimate}
        variants={variants}
        transition={transition || { duration: 0.4 }}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          ...style,
          zIndex: 2,
          position: 'relative'
        }}
      />
    </>
  );
}

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parse search query
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  const getActiveTab = () => {
    const q = searchQuery.toLowerCase();
    const foundCat = categories.find(c => q.includes(c.name.toLowerCase()));
    if (foundCat) return foundCat.name;
    return 'Semua';
  };
  const activeTab = getActiveTab();

  const handleTabClick = (cat) => {
    if (cat === 'Semua') navigate('/products');
    else navigate(`/products?q=${encodeURIComponent(cat)}`);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function loadData() {
      try {
        // Load categories
        const { data: catData, error: catError } = await supabase.from('categories').select('*').order('created_at');
        if (catError) throw catError;
        setCategories(catData || []);

        // Load products
        const { data: prodData, error: prodError } = await supabase.from('products').select('*').order('id');
        if (prodError) throw prodError;

        // Map database fields to the UI expected format
        const formattedData = prodData.map(p => ({
          ...p,
          image: p.image_url,
          images: p.images_array || [p.image_url],
          originalPrice: p.original_price, // map snake_case to camelCase
          longDescription: p.long_description // map snake_case to camelCase
        }));

        setProducts(formattedData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lenisModal;
    let rafId;

    if (selectedProduct) {
      document.body.style.overflow = 'hidden';

      // Initialize smooth scrolling for the modal ONLY on desktop
      if (window.innerWidth > 768) {
        setTimeout(() => {
          const modalContainer = document.querySelector('.product-modal-content-section');
          if (modalContainer && modalContainer.firstElementChild) {
            lenisModal = new Lenis({
              wrapper: modalContainer,
              content: modalContainer.firstElementChild,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              smoothWheel: true,
            });

            const raf = (time) => {
              lenisModal.raf(time);
              rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
          }
        }, 100);
      }

    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisModal) lenisModal.destroy();
    };
  }, [selectedProduct]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSelectedProduct(null);
  };

  return (
    <>
      <div style={{ paddingTop: '100px', paddingBottom: '100px', background: 'var(--bg-color)', minHeight: '100vh' }}>
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}
            >
              Koleksi Eksklusif
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
            >
              Temukan mahakarya yang sesuai dengan karakter Anda. Setiap tas adalah cerita yang siap Anda bawa.
            </motion.p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(1rem, 3vw, 2rem)', marginBottom: '4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            {['Semua', ...categories.map(c => c.name)].map((cat, idx) => {
              const isActive = cat === activeTab;
              return (
                <div
                  key={idx}
                  onClick={() => handleTabClick(cat)}
                  style={{
                    fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat}
                </div>
              );
            })}
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '3rem' }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>Memuat koleksi eksklusif...</p>
              </div>
            ) : error ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', color: 'red' }}>Error memuat data: {error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', marginBottom: '1rem' }}>Hasil tidak ditemukan</h3>
                <p style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>Maaf, kami tidak dapat menemukan koleksi untuk "{searchQuery}".</p>
              </div>
            ) : (
              filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  whileHover="hover"
                  onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); }}
                >
                  <div style={{ height: 'clamp(250px, 40vw, 400px)', background: '#000', position: 'relative', overflow: 'hidden' }}>
                    {product.tag && (
                      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, background: 'var(--accent-color)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {product.tag}
                      </div>
                    )}
                    <ImageWithSkeleton
                      variants={{ hover: { scale: 1.08 } }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>{product.category}</div>
                      <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{product.name}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {product.originalPrice && (
                          <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>
                            {product.originalPrice}
                          </span>
                        )}
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>
                          {product.price}
                        </div>
                      </div>
                      <motion.div
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        variants={{ hover: { x: 5, color: 'var(--accent-color)' } }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      >
                        Beli <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Product Preview Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2rem)'
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#fff',
                width: '100%',
                maxWidth: '1000px',
                maxHeight: '90vh',
                borderRadius: '32px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                position: 'relative'
              }}
              className="product-modal"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Close Button fixed to top-right of entire modal */}
              <button
                className="close-modal-btn"
                onClick={() => setSelectedProduct(null)}
                style={{ zIndex: 9999 }}
              >
                <span style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'sans-serif', lineHeight: 1 }}>✕</span>
              </button>

              {/* Modal Image Section */}
              <div className="product-modal-img-section" style={{ flex: '1 1 50%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <AnimatePresence mode="wait">
                    <ImageWithSkeleton
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={selectedProduct.images[activeImageIndex]}
                      alt={selectedProduct.name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                <div style={{
                  display: 'flex', gap: '1rem', padding: '1rem 1.5rem', background: '#fff',
                  borderTop: '1px solid var(--border-color)', overflowX: 'auto', flexWrap: 'nowrap',
                  scrollbarWidth: 'none', msOverflowStyle: 'none'
                }}>
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        flexShrink: 0,
                        width: '80px', height: '80px', padding: 0, border: activeImageIndex === idx ? '2px solid var(--text-primary)' : '1px solid var(--border-color)',
                        borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease',
                        opacity: activeImageIndex === idx ? 1 : 0.5,
                        position: 'relative'
                      }}
                    >
                      <ImageWithSkeleton src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="product-modal-content-section" data-lenis-prevent="true" style={{ flex: '1 1 50%', padding: '4rem 3rem', overflowY: isDesktop ? 'hidden' : 'auto' }}>
                <div className="lenis-modal-inner" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
                    {selectedProduct.category}
                  </div>
                  <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {selectedProduct.name}
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {selectedProduct.originalPrice && (
                      <span style={{ whiteSpace: 'nowrap', fontSize: '1.3rem', textDecoration: 'line-through', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>
                        {selectedProduct.originalPrice}
                      </span>
                    )}
                    <div style={{ whiteSpace: 'nowrap', fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>
                      {selectedProduct.price}
                    </div>
                  </div>

                  {/* Dimensions Box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '2rem', padding: '1rem 1.2rem', background: '#f9f9fb', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 600, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Dimensi:</span>
                    <span style={{ color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem' }}>{selectedProduct.dimensions}</span>
                  </div>

                  <div style={{ width: '40px', height: '2px', minHeight: '2px', flexShrink: 0, background: 'var(--accent-color)', marginBottom: '2rem' }}></div>

                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem', whiteSpace: 'pre-wrap' }}>
                    {selectedProduct.longDescription}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      style={{
                        flex: 1,
                        background: '#000',
                        color: '#fff',
                        border: 'none',
                        padding: '1.2rem',
                        borderRadius: '12px',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <ShoppingCart size={20} />
                      Masukkan Keranjang
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
