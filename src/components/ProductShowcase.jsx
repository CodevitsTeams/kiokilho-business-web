import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*').order('id').limit(3);
        if (error) throw error;
        
        const formattedData = data.map(p => ({
          ...p,
          image: p.image_url,
          originalPrice: p.original_price
        }));
        
        setProducts(formattedData);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section id="store" style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: '4rem', background: 'var(--surface-color)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              color: 'var(--accent-color)',
              marginBottom: '1.5rem',
              display: 'block',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Koleksi Mahakarya
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="display-2"
          >
            Eksklusivitas dalam Genggaman.
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>
              Memuat Mahakarya dari Supabase...
            </div>
          ) : products.length >= 3 ? (
            <>
              {/* Featured Full Width: Product 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#ffffff',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'stretch',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                  cursor: 'pointer'
                }}
                whileHover="hover"
                onClick={() => navigate('/products')}
              >
                <div style={{ flex: '1 1 300px', padding: 'clamp(2rem, 5vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {products[0].name.split(' ').slice(0, 1).join(' ')}<br/>
                    {products[0].name.split(' ').slice(1).join(' ')}
                  </h3>
                  <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>{products[0].description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem' }}>
                    {products[0].originalPrice && (
                      <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>{products[0].originalPrice}</span>
                    )}
                    <div style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>{products[0].price}</div>
                  </div>
                  
                  <div>
                    <motion.button 
                      onClick={(e) => handleAddToCart(e, products[0])}
                      variants={{
                        hover: { backgroundColor: 'var(--accent-color)', color: '#ffffff', gap: '1.2rem' }
                      }}
                      style={{ 
                        background: 'var(--text-primary)', 
                        color: 'var(--bg-color)',
                        padding: '16px 36px',
                        borderRadius: '999px',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        fontFamily: 'Outfit, sans-serif',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ArrowRight size={18} /> Tambah ke Keranjang
                    </motion.button>
                  </div>
                </div>
                
                <div style={{ flex: '1 1 300px', minHeight: 'clamp(300px, 50vw, 500px)', background: '#000', position: 'relative', overflow: 'hidden' }}>
                  <motion.img 
                    variants={{ hover: { scale: 1.05 } }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={products[0].image} 
                    alt={products[0].name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              </motion.div>

              {/* Side by Side Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
                
                {/* Product 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#ffffff',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    cursor: 'pointer'
                  }}
                  whileHover="hover"
                  onClick={() => navigate('/products')}
                >
                  <div style={{ background: '#000', height: 'clamp(300px, 50vw, 400px)', position: 'relative', overflow: 'hidden' }}>
                    <motion.img 
                      variants={{ hover: { scale: 1.08 } }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={products[1].image} 
                      alt={products[1].name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)' }}>{products[1].name}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>{products[1].description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {products[1].originalPrice && (
                          <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>{products[1].originalPrice}</span>
                        )}
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>{products[1].price}</div>
                      </div>
                      <motion.div 
                        onClick={(e) => handleAddToCart(e, products[1])}
                        variants={{ hover: { x: 8, color: 'var(--accent-color)' } }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease', cursor: 'pointer' }}
                      >
                        Beli <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Product 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#ffffff',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    cursor: 'pointer'
                  }}
                  whileHover="hover"
                  onClick={() => navigate('/products')}
                >
                  <div style={{ background: '#000', height: 'clamp(300px, 50vw, 400px)', position: 'relative', overflow: 'hidden' }}>
                    <motion.img 
                      variants={{ hover: { scale: 1.08 } }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={products[2].image} 
                      alt={products[2].name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)' }}>{products[2].name}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>{products[2].description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {products[2].originalPrice && (
                          <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>{products[2].originalPrice}</span>
                        )}
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>{products[2].price}</div>
                      </div>
                      <motion.div 
                        onClick={(e) => handleAddToCart(e, products[2])}
                        variants={{ hover: { x: 8, color: 'var(--accent-color)' } }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease', cursor: 'pointer' }}
                      >
                        Beli <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>
              Tidak cukup produk ditemukan di database.
            </div>
          )}

          {/* Button to see other products */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
          >
            <button 
              onClick={() => navigate('/products')}
              style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                padding: '14px 36px',
                border: '1px solid var(--text-primary)',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--text-primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              Lihat Produk Kami Lainnya <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
