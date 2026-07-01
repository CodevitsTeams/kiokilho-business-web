import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--surface-color)', 
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid var(--border-color)',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Belanja Produk</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Classic Tote</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Urban Sling</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Explorer Pack</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Aksesoris</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Layanan</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Garansi Seumur Hidup</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Perawatan Tas</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Program Daur Ulang</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Pengiriman</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Tentang Kiokilho</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Cerita Kami</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Karir</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Investor</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Etika Lingkungan</a></li>
            </ul>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            Hak Cipta © {new Date().getFullYear()} Kiokilho Inc. Semua hak dilindungi.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Kebijakan Privasi</a>
            <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Syarat Penggunaan</a>
            <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
