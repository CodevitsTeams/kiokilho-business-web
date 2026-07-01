import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toteImg from '../assets/tote_bag.png';
import slingImg from '../assets/sling_bag.png';
import backpackImg from '../assets/backpack_bag.png';

export default function ProductShowcase() {
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section id="store" style={{ padding: '10rem 0', background: 'var(--surface-color)', position: 'relative' }}>
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
          
          {/* Featured Full Width: Classic Tote */}
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
          >
            <div style={{ flex: '1 1 400px', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>Kiokilho<br/>Classic Tote</h3>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>Elegan untuk keseharianmu. Paduan harmonis antara serat goni natural dengan detail jahitan jumputan yang memancarkan aura kemewahan tak lekang oleh waktu.</p>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '3rem', color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>Rp 499.000</div>
              
              <div>
                <motion.button 
                  onClick={(e) => handleAddToCart(e, { id: 1, name: "Kiokilho Classic Tote", price: "Rp 499.000", image: toteImg })}
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
                  <Plus size={18} /> Tambah ke Keranjang
                </motion.button>
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px', minHeight: '500px', background: '#000', position: 'relative', overflow: 'hidden' }}>
              <motion.img 
                variants={{
                  hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={toteImg} 
                alt="Classic Tote" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </motion.div>

          {/* Side by Side Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            
            {/* Urban Sling */}
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
            >
              <div style={{ background: '#000', height: '400px', position: 'relative', overflow: 'hidden' }}>
                <motion.img 
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={slingImg} 
                  alt="Urban Sling" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '3.5rem' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)' }}>Urban Sling</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>Praktis, dinamis, dan menawan. Cocok untuk mobilitas tinggi di perkotaan.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>Rp 349.000</div>
                  <motion.div 
                    onClick={(e) => handleAddToCart(e, { id: 2, name: "Urban Sling", price: "Rp 349.000", image: slingImg })}
                    variants={{ hover: { x: 8, color: 'var(--accent-color)' } }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease', cursor: 'pointer' }}
                  >
                    Beli <Plus size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Explorer Pack */}
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
            >
              <div style={{ background: '#000', height: '400px', position: 'relative', overflow: 'hidden' }}>
                <motion.img 
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={backpackImg} 
                  alt="Explorer Pack" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '3.5rem' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)' }}>Explorer Pack</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>Kapasitas besar dengan ketangguhan maksimal. Pendamping setia setiap petualangan.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', fontFamily: 'Outfit, sans-serif' }}>Rp 899.000</div>
                  <motion.div 
                    onClick={(e) => handleAddToCart(e, { id: 3, name: "Explorer Pack", price: "Rp 899.000", image: backpackImg })}
                    variants={{ hover: { x: 8, color: 'var(--accent-color)' } }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease', cursor: 'pointer' }}
                  >
                    Beli <Plus size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
