import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Kebijakan Privasi</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Terakhir diperbarui: 1 Juli 2026
          </p>
          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <p>
              Di Kiokilho, privasi dan keamanan Anda adalah prioritas utama kami. Kebijakan Privasi ini mengatur dan menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan dan situs web eksklusif kami. Dengan mengakses situs ini, Anda menyetujui praktik yang diuraikan di bawah ini.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>1. Informasi yang Kami Kumpulkan</h3>
            <p>
              Untuk memberikan pengalaman berbelanja yang mulus dan personal, kami dapat mengumpulkan informasi identifikasi pribadi Anda. Ini termasuk, namun tidak terbatas pada: nama lengkap, alamat email, nomor telepon, alamat pengiriman, alamat penagihan, dan informasi pembayaran saat Anda melakukan pembelian, membuat akun, atau mendaftar ke buletin kami. Kami juga secara otomatis mengumpulkan data non-personal seperti alamat IP dan jenis peramban untuk keperluan analitik.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>2. Penggunaan Informasi</h3>
            <p>
              Informasi yang kami kumpulkan digunakan secara ketat untuk:
            </p>
            <ul style={{ paddingLeft: '1.5rem', margin: '-0.5rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Memproses, memverifikasi, dan mengirimkan pesanan Anda.</li>
              <li>Mengelola dan mengamankan akun pelanggan Anda.</li>
              <li>Meningkatkan kualitas layanan dan antarmuka situs web kami.</li>
              <li>Mengirimkan pembaruan promosi mengenai koleksi terbaru (hanya jika Anda telah memberikan persetujuan).</li>
            </ul>
            <p>
              Kami menjamin bahwa kami <strong>tidak pernah menjual, menyewakan, atau menukar</strong> data pribadi Anda kepada pihak ketiga mana pun untuk tujuan komersial mereka.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>3. Perlindungan Data dan Keamanan</h3>
            <p>
              Kami menerapkan standar keamanan industri tertinggi untuk menjaga kerahasiaan informasi pribadi Anda. Semua transaksi pembayaran diproses melalui penyedia gateway terenkripsi (SSL) yang aman, dan informasi perbankan Anda tidak pernah disimpan di server internal kami.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>4. Peringatan Penipuan dan Transaksi Resmi</h3>
            <div style={{ background: 'rgba(255, 0, 0, 0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,0,0,0.1)' }}>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>
                <strong>PENTING:</strong> Segala bentuk transaksi resmi Kiokilho HANYA dilakukan melalui situs web ini (<strong>www.kiokilho.com</strong>) atau melalui saluran komunikasi resmi yang tercantum di situs ini. 
                <br/><br/>
                Kami <strong>tidak bertanggung jawab secara hukum maupun finansial</strong> atas segala kerugian material ataupun imaterial yang diakibatkan oleh penipuan, transaksi palsu, atau pembelian yang dilakukan di luar platform resmi kami (seperti melalui akun media sosial palsu, <strong>marketplace</strong> pihak ketiga yang tidak terafiliasi, atau tautan mencurigakan). Mohon untuk selalu berhati-hati dan memverifikasi sumber sebelum melakukan pembayaran.
              </p>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>5. Hak Pengguna</h3>
            <p>
              Anda memiliki hak penuh untuk mengakses, memperbarui, atau meminta penghapusan data pribadi Anda dari sistem kami kapan saja. Jika Anda ingin menarik persetujuan atau berhenti berlangganan dari komunikasi pemasaran kami, Anda dapat melakukannya melalui tautan yang tersedia di email kami.
            </p>

            <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Jika Anda memiliki pertanyaan lebih lanjut, kecurigaan terhadap aktivitas penipuan yang mengatasnamakan Kiokilho, atau keluhan terkait Kebijakan Privasi kami, silakan hubungi tim layanan pelanggan kami di <strong>privacy@kiokilho.com</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
