import React from 'react';
import { motion } from 'framer-motion';
import artisanImg from '../assets/arts3.png';

export default function Craftsmanship() {
  return (
    <section id="jumputan-art" className="dark-section" style={{ padding: '4rem 0', background: '#0a0a0a', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6rem' }}>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 300px' }}
          >
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#e5d3b3', // Gold-ish
              marginBottom: '1.5rem',
              display: 'block',
              fontFamily: 'Outfit, sans-serif'
            }}>
              Behind The Seams
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontFamily: 'Playfair Display, serif', marginBottom: '2rem', lineHeight: 1.15 }}>
              Dedikasi dalam<br />setiap anyaman.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#a1a1a6', marginBottom: '2rem', lineHeight: 1.8 }}>
              Bukan sekadar produksi masal. Setiap mahakarya Kiokilho melewati lebih dari 72 jam proses pengerjaan tangan yang menuntut tingkat presisi dan kesabaran luar biasa.
            </p>
            <p style={{ fontSize: '1.15rem', color: '#a1a1a6', marginBottom: '3.5rem', lineHeight: 1.8 }}>
              Pengrajin ahli kami memadukan teknik tenun goni tradisional dengan seni lukis jumputan yang diwariskan secara turun-temurun, menciptakan tekstur dan pola autentik yang mustahil diduplikasi oleh mesin manapun.
            </p>
            <div style={{ display: 'flex', gap: '4rem', borderTop: '1px solid #222', paddingTop: '2.5rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#e5d3b3', marginBottom: '0.5rem' }}>72+</div>
                <div style={{ fontSize: '0.85rem', color: '#a1a1a6', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Outfit, sans-serif' }}>Jam Pengerjaan</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#e5d3b3', marginBottom: '0.5rem' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: '#a1a1a6', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Outfit, sans-serif' }}>Handmade</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 300px', position: 'relative' }}
          >
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
              <img src={artisanImg} alt="Artisan Craftsmanship" style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', transform: 'scale(1.02)' }} />
            </div>
            {/* Ambient glow behind image */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(229, 211, 179, 0.1) 0%, rgba(0,0,0,0) 60%)',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              pointerEvents: 'none'
            }}></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
