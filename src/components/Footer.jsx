import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase.from('products').select('id, name').limit(4);
        if (!error && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading products for footer:", err);
      }
    }
    loadProducts();
  }, []);

  return (
    <footer style={{ 
      background: 'var(--surface-color)', 
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid var(--border-color)'
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
              {products.map((prod) => (
                <li key={prod.id}>
                  <Link to={`/products?q=${encodeURIComponent(prod.name)}`} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>
                    {prod.name}
                  </Link>
                </li>
              ))}
              {products.length === 0 && (
                <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Memuat...</span></li>
              )}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Layanan</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/warranty" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Garansi Seumur Hidup</Link></li>
              <li><Link to="/care" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Perawatan Tas</Link></li>
              <li><Link to="/recycling" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Program Daur Ulang</Link></li>
              <li><Link to="/shipping" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Pengiriman</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Tentang Kiokilho</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/story" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Cerita Kami</Link></li>
              <li><Link to="/careers" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Karir</Link></li>
              <li><Link to="/investors" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Investor</Link></li>
              <li><Link to="/ethics" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Etika Lingkungan</Link></li>
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
            Hak Cipta © {new Date().getFullYear()} Kiokilho, Semua hak dilindungi.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>Kebijakan Privasi</Link>
            <Link to="/terms" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>Syarat Penggunaan</Link>
            <Link to="/legal" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>Legal</Link>
            <Link to="/developer" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}>Kebijakan Developer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
