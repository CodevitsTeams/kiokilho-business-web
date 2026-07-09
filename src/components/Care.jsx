import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Care() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Perawatan Tas</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <p>Tas Kiokilho Anda adalah sebuah karya seni yang membutuhkan perawatan khusus agar pesonanya tetap bertahan. Eksplorasi perpaduan sempurna antara keindahan alam dan dedikasi tangan artisan ini diciptakan secara eksklusif untuk menyuarakan pesona, identitas, dan karakter Anda.</p>
            <p><strong>Pembersihan Rutin:</strong> Gunakan sikat berbulu sangat halus atau kain microfiber kering untuk membersihkan debu dari serat goni secara berkala. Jangan gunakan deterjen berbahan kimia keras atau merendam tas di dalam air.</p>
            <p><strong>Perawatan Motif Jumputan:</strong> Kain jumputan kami diwarnai menggunakan teknik tradisional dengan pigmen alami. Jauhkan dari paparan sinar matahari langsung dalam waktu lama untuk menjaga intensitas warna. Jika terkena percikan air, segera tepuk-tepuk lembut dengan kain kering, jangan digosok.</p>
            <p><strong>Menjaga Bentuk Tas:</strong> Saat tidak digunakan, isilah bagian dalam tas dengan kertas tisu bebas asam (acid-free paper) atau bantalan tas untuk mempertahankan struktur aslinya. Hindari menumpuk barang berat di atas tas.</p>
            <p><strong>Penanganan Noda:</strong> Jika tas terkena noda membandel, jangan dicuci menggunakan mesin cuci. Bawalah ke layanan pembersihan tas profesional (bag spa) yang berpengalaman menangani material serat alam dan kain tradisional.</p>
            <p><strong>Perawatan Aksesori Logam (Hardware):</strong> Hindari kontak langsung perangkat keras (resleting, logo, atau pengait) dengan parfum, lotion, atau bahan kimia lainnya agar kilau dan lapisan warnanya tetap terjaga sempurna.</p>
            <p><strong>Penyimpanan Ideal:</strong> Simpan tas Anda di dalam <em>dust bag</em> eksklusif Kiokilho yang telah kami sertakan. Letakkan di dalam lemari yang sejuk, kering, dan berventilasi baik, serta hindari kelembaban ekstrem.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
