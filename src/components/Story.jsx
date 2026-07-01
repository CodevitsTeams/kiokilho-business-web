import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Story() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Cerita Kami</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <p>Kiokilho lahir dari persimpangan antara penghormatan terhadap warisan budaya nusantara dan visi akan masa depan fesyen yang berkelanjutan.</p>
            <p>Melihat industri fesyen yang serba cepat dan mengabaikan nilai-nilai lingkungan, pendiri kami memulai perjalanan untuk mencari antitesis dari <em>fast fashion</em>. Inspirasi itu ditemukan di Yogyakarta, pada kelembutan kain jumputan yang kaya akan filosofi, dan memadukannya dengan ketangguhan serat goni, material organik tertua di dunia.</p>
            <p>Kami tidak sekadar membuat tas; kami mengurasi sebuah gerakan. Gerakan yang membuktikan bahwa fesyen mewah, elegan, dan estetik dapat dicapai sepenuhnya melalui material yang disediakan oleh bumi, tanpa harus merusaknya.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
