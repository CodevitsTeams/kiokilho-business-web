import React from 'react';
import { motion } from 'framer-motion';
import imgGoni from '../assets/burlap_texture.png';
import imgJumputan from '../assets/jumputan_texture.png';
import imgHardware from '../assets/hero_slide_5.png';

const features = [
  {
    title: "Serat Goni Pilihan",
    description: "Kuat dan berestetika tinggi. Dipilih dari material terbaik untuk durabilitas maksimal.",
    delay: 0.1,
    image: imgGoni
  },
  {
    title: "Jumputan Nusantara",
    description: "Aksen jumputan tradisional yang memberikan sentuhan keanggunan dalam setiap mahakarya.",
    delay: 0.2,
    image: imgJumputan
  },
  {
    title: "Ramah Lingkungan",
    description: "100% material biodegradable yang menawan sekaligus baik untuk bumi kita.",
    delay: 0.3,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Desain Ergonomis",
    description: "Nyaman dipakai seharian berkat strap presisi yang menyesuaikan bentuk postur Anda.",
    delay: 0.4,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Proses Handmade",
    description: "Dikerjakan dengan ketelitian tingkat tinggi oleh perajin ahli yang berdedikasi.",
    delay: 0.5,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Durabilitas Tinggi",
    description: "Material tangguh yang dirancang untuk bertahan melintasi berbagai kondisi dan generasi.",
    delay: 0.6,
    image: imgHardware
  }
];

export default function BentoGrid() {
  return (
    <section id="mac" style={{ padding: '10rem 0', background: 'var(--bg-color)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em',
            color: 'var(--accent-color)',
            marginBottom: '1rem',
            display: 'block',
            fontFamily: 'Outfit, sans-serif'
          }}>Keunggulan Produk</span>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>Inovasi dari Alam.</h2>
          <p className="lead" style={{ maxWidth: '600px', margin: '0 auto' }}>Dirancang untuk keindahan estetika, dibuat dengan ketangguhan untuk bertahan lama.</p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--surface-color)',
                borderRadius: '32px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                cursor: 'pointer',
              }}
              whileHover="hover"
            >
              {/* Image Section */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                <motion.img 
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={feature.image} 
                  alt={feature.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Text Section */}
              <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  marginBottom: '1rem', 
                  fontFamily: 'Playfair Display, serif',
                  color: 'var(--text-primary)'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.6,
                  fontSize: '1.05rem'
                }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
