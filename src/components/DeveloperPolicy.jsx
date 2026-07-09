import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DeveloperPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '2rem' }}>Kebijakan Developer</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Informasi mengenai pengembangan dan pengelolaan teknis platform Kiokilho.
          </p>
          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
            <p>
              Platform e-commerce eksklusif Kiokilho dirancang, dikembangkan, dan dipelihara dengan standar industri perangkat lunak tertinggi. Kebijakan ini menguraikan batasan, tanggung jawab teknis, dan hak kekayaan intelektual yang melekat pada pengembangan ekosistem digital ini.
            </p>
            
            <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(0,0,0,0.03)', marginTop: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>Mitra Pengembang Resmi</h3>
              <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                Keseluruhan ekosistem digital ini, yang mencakup rekayasa arsitektur perangkat lunak, desain antarmuka (UI/UX) yang intuitif, hingga pengelolaan infrastruktur komputasi awan, dirancang dan direalisasikan secara eksklusif oleh:
              </p>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-color)' }}>PT Kinteraforé Technologies and Innovation</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <strong style={{ minWidth: '90px' }}>Email:</strong>
                  <a href="mailto:hello@kinterafore.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>hello@kinterafore.com</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <strong style={{ minWidth: '90px' }}>Instagram:</strong>
                  <a href="https://instagram.com/kinterafore" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                    @kinterafore
                    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'translateY(1px)' }}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill="#0095F6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>1. Hak Kekayaan Intelektual (HAKI)</h3>
            <p>
              Kode sumber (<em>source code</em>), struktur basis data, pustaka animasi, dan aset antarmuka sistem sepenuhnya berada di bawah perlindungan hak cipta. Segala bentuk rekayasa balik (<em>reverse engineering</em>), penyalinan data (<em>scraping</em>), penguraian kode, atau penyalinan infrastruktur logika tanpa lisensi tertulis dari PT Kinteraforé Technologies and Innovation merupakan pelanggaran kekayaan intelektual berat yang akan ditindak melalui jalur hukum internasional dan yurisdiksi Republik Indonesia.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>2. Integritas Keamanan dan Infrastruktur</h3>
            <p>
              Pengembang bertanggung jawab atas pemeliharaan peladen (<em>server</em>) berkinerja tinggi, jaminan waktu aktif (<em>uptime</em>), serta enkripsi transmisi data menggunakan protokol kriptografi mutakhir. Namun, pengembang berhak melakukan pemeliharaan sistem terencana (<em>maintenance</em>) yang dapat mengakibatkan penghentian layanan sementara demi optimalisasi dan pembaruan keamanan jaringan.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>3. Batasan Tanggung Jawab Teknis</h3>
            <p>
              PT Kinteraforé Technologies and Innovation bertindak murni sebagai arsitek dan penyedia solusi teknologi. Kami <strong>tidak memegang tanggung jawab</strong> atas dinamika operasional bisnis Kiokilho, termasuk namun tidak terbatas pada: manajemen inventaris produk, kelambatan logistik, proses pengembalian dana (<em>refund</em>), kualitas fisik produk, atau perselisihan transaksional antara penjual dan pembeli. Segala keluhan non-teknis harus disalurkan langsung kepada manajemen Kiokilho.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>4. Pelaporan Celah Keamanan (Bug Bounty)</h3>
            <p>
              Jika Anda merupakan pakar keamanan siber atau peneliti yang menemukan celah kerentanan (<em>vulnerability</em>) pada sistem kami, kami sangat menghargai laporan Anda yang dilakukan secara etis. Silakan laporkan temuan teknis Anda secara langsung ke email bisnis kami (<strong>privacy@kinterafore.com</strong>) sebelum mempublikasikannya ke ruang publik. Eksploitasi celah keamanan untuk tujuan destruktif akan dilaporkan secara tegas ke otoritas siber berwenang.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>5. Regulasi Penggunaan AI Assistant</h3>
            <p>
              Sistem AI Assistant yang terintegrasi di platform ini menggunakan model pembelajaran mesin canggih yang dirancang untuk memberikan informasi terkait produk. Algoritma AI dikonfigurasi secara ketat untuk tidak mengumpulkan, menyimpan, atau mengekstraksi data sensitif pengguna (seperti detail kartu kredit atau kata sandi) selama percakapan. Segala bentuk rekayasa prompt (<em>prompt injection</em>) atau upaya penyalahgunaan bot untuk aktivitas di luar koridor bisnis Kiokilho sangat dilarang.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>6. Pengumpulan Data Analitik (Telemetry and Cookies)</h3>
            <p>
              Untuk tujuan optimalisasi performa dan analisis metrik pengguna, infrastruktur kami secara pasif mengumpulkan data telemetri non-personal melalui penggunaan <em>Cookies</em> dan <em>Local Storage</em>. Data teknis yang dikumpulkan (seperti tipe peramban, durasi sesi, dan interaksi antarmuka) sepenuhnya dianonimkan (<em>anonymized</em>) dan diproses secara internal tanpa melibatkan broker data pihak ketiga.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>7. Kepatuhan Standar Privasi Data</h3>
            <p>
              Sebagai arsitek platform, PT Kinteraforé Technologies and Innovation merancang arsitektur basis data yang tunduk pada kerangka kerja privasi global serta mengacu pada Undang-Undang Pelindungan Data Pribadi (UU PDP) di Indonesia. Seluruh proses penyimpanan identitas pelanggan dilakukan di dalam <em>bucket</em> terenkripsi dengan protokol <em>Row Level Security (RLS)</em> yang sangat ketat untuk mencegah kebocoran data (<em>data breach</em>).
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>8. Ketersediaan Layanan (Service Level Agreement)</h3>
            <p>
              Kami berkomitmen untuk menjaga tingkat ketersediaan platform (<em>uptime</em>) secara maksimal melalui redundansi server. Namun, kami tidak memberikan jaminan absolut terhadap gangguan layanan yang disebabkan oleh faktor eksternal di luar kendali teknis kami (<em>force majeure</em>), seperti kegagalan infrastruktur tulang punggung internet (<em>backbone</em>), bencana alam, atau serangan siber berskala masif (<em>DDoS</em>).
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>9. Integrasi Sistem Pihak Ketiga (Third-Party APIs)</h3>
            <p>
              Platform e-commerce ini mengintegrasikan berbagai layanan pihak ketiga, termasuk namun tidak terbatas pada antarmuka kecerdasan buatan (<em>AI API</em>), pemrosesan pembayaran (<em>payment gateway</em>), dan agregator logistik pengiriman. Syarat penggunaan dan protokol keamanan dari layanan tersebut sepenuhnya tunduk pada penyedia masing-masing. PT Kinteraforé Technologies and Innovation dibebaskan dari tanggung jawab atas kerugian finansial maupun operasional yang timbul akibat malfungsi sistem pihak ketiga tersebut.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>10. Amandemen Kebijakan dan Revisi Arsitektur</h3>
            <p>
              PT Kinteraforé Technologies and Innovation memiliki hak prerogatif untuk melakukan revisi, ekspansi, atau depresiasi pada arsitektur sistem maupun pada klausul Kebijakan Developer ini kapan saja tanpa pemberitahuan sebelumnya (<em>prior notice</em>). Pembaruan teknis akan diterapkan secara bergulir (<em>rolling release</em>) demi menjaga relevansi teknologi dan keamanan platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
