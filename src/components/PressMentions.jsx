import React from 'react';
import { motion } from 'framer-motion';

export default function PressMentions() {
  return (
    <section style={{ padding: '4rem 0', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Telah Diulas Oleh
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5rem', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', margin: 0, fontWeight: 400 }}>VOGUE</h2>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 300, margin: 0, letterSpacing: '-1px' }}>Harper's BAZAAR</h2>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontStyle: 'italic', margin: 0 }}>ELLE</h2>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, margin: 0, letterSpacing: '4px' }}>GQ</h2>
        </div>
      </div>
    </section>
  );
}
