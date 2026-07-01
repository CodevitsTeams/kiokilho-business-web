import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Legal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Informasi Legal</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Dokumen dan pemberitahuan hukum resmi Kiokilho.
          </p>
          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Entitas Bisnis/Perusahaan</h3>
            <p>
              <strong>Kiokilho</strong><br/>
              Terdaftar secara resmi di Republik Indonesia.<br/>
              Nomor Induk Berusaha (NIB): 890123456789<br/>
              Kantor Pusat: <strong><a href="https://maps.app.goo.gl/yMGxMAQ5aLsbdxNe9?g_st=ac" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Jl. Nglengkong-Ledoksari, Sumberwatu, RT04/02 Dowangsari, Sambirejo, Kec. Prambanan, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta 55572</a></strong>
            </p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Merek Dagang</h3>
            <p>
              "Kiokilho" dan semua logo, lambang, serta desain tas terkait adalah merek dagang terdaftar dari Kiokilho. Penggunaan komersial dari merek dagang kami tanpa izin tertulis dari perusahaan sangat dilarang dan dapat dikenakan tindakan hukum.
            </p>
            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Kepatuhan Lingkungan</h3>
            <p>
              Sebagai pelopor <em>premium eco-fashion</em>, kami berkomitmen teguh pada praktik keberlanjutan. Seluruh material serat goni (burlap) bersumber dari perkebunan tersertifikasi yang menerapkan praktik pertanian etis. Proses pewarnaan kain jumputan kami dijamin menggunakan pigmen bebas bahan kimia beracun yang sepenuhnya mematuhi standar keamanan lingkungan global.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
