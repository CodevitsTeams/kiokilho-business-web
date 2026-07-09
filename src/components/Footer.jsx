import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Globe, Mail, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [products, setProducts] = useState([]);
  const [fallbackCategory, setFallbackCategory] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase.from('products').select('id, name').limit(5);
        if (!error && data) {
          setProducts(data);
          if (data.length < 5) {
            const { data: catData } = await supabase.from('categories').select('id, name').limit(1);
            if (catData && catData.length > 0) {
              setFallbackCategory(catData[0]);
            }
          }
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
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          marginBottom: '4rem'
        }}>
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }} className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={24} style={{ color: 'var(--text-primary)' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '-0.05em' }}>kiokilho</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Kiokilho adalah brand yang mendefinisikan ulang kemewahan modern melalui koleksi tas premium yang memadukan desain timeless, material eksklusif, dan keahlian tangan tingkat tinggi.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)' }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}>
                <Globe size={20} />
              </a>
              <a href="mailto:kiokilho@gmail.com" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }} onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)' }} onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}>
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Belanja Produk</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {products.length > 0 && products.length < 5 && (
                <li><Link to="/products" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Semua Produk</Link></li>
              )}
              {products.map((prod) => (
                <li key={prod.id}>
                  <Link to={`/products?q=${encodeURIComponent(prod.name)}`} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>
                    {prod.name}
                  </Link>
                </li>
              ))}
              {products.length > 0 && products.length < 5 && fallbackCategory && (
                <li><Link to={`/products?category=${encodeURIComponent(fallbackCategory.name)}`} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>{fallbackCategory.name} Collection</Link></li>
              )}
              {products.length === 0 && (
                <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Memuat...</span></li>
              )}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Tentang Kiokilho</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/story" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Cerita Kami</Link></li>
              <li><Link to="/careers" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Karir</Link></li>
              <li><Link to="/investors" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Investor</Link></li>
              <li><Link to="/ethics" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Etika Lingkungan</Link></li>
              <li><Link to="/care" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>Perawatan Tas</Link></li>
            </ul>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Informasi Bisnis</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span className="address-mobile"><strong>Kiokilho Handcraft &amp; Ecoprint</strong><br />Jl. Nglengkong-Ledoksari, Sumberwatu, RT04/02 Dowangsari, Sambirejo, Kec. Prambanan, Sleman, Provinsi Daerah Istimewa Yogyakarta 55572</span>
                <span className="address-ipad-only"><strong>Kiokilho Handcraft &amp; Ecoprint</strong><br />Jl. Nglengkong-Ledoksari, Sumberwatu, RT04/02<br />Dowangsari, Sambirejo, Kec. Prambanan, Sleman,<br />Provinsi Daerah Istimewa Yogyakarta 55572</span>
                <span className="address-desktop"><strong>Kiokilho Handcraft &amp; Ecoprint</strong><br />Jl. Raya Nglengkong-Ledoksari, Sumberwatu, RT04/02 Dowangsari, Desa/Kelurahan Sambirejo, Kec. Prambanan, Sleman, DIY 55572</span>
              </li>
              <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} style={{ flexShrink: 0 }} /> <a href="mailto:kiokilho@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>kiokilho@gmail.com</a>
              </li>
              <li style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} style={{ flexShrink: 0 }} /> <a href="tel:+6281226841755" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+62 812-2684-1755</a>
              </li>
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
