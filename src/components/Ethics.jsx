import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Ethics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Etika Lingkungan</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <p>Transparansi dan tanggung jawab lingkungan bukanlah strategi pemasaran bagi kami, melainkan pondasi dari setiap keputusan bisnis yang kami buat.</p>
            <p><strong>Pengadaan Material yang Etis:</strong> Kami bermitra langsung dengan perkebunan rami dan pengrajin lokal untuk memastikan bahwa tidak ada deforestasi yang terlibat dalam rantai pasokan kami, serta memastikan upah yang adil di atas standar bagi setiap pengrajin.</p>
            <p><strong>Operasional Karbon Netral:</strong> Mulai dari bengkel pembuatan hingga logistik pengiriman, kami berupaya keras meminimalkan jejak karbon. Kami menyumbangkan 5% dari setiap penjualan bersih ke program pelestarian terumbu karang di kepulauan Indonesia.</p>
            <p>Kami meyakini bahwa kemewahan yang sejati seharusnya tidak mengorbankan masa depan bumi. Melainkan, ia harus hadir sebagai wujud penghormatan kita terhadap harmoni dan kelestarian alam itu sendiri.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
