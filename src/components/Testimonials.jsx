import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "Tas goni ini benar-benar karya seni. Jahitan tangannya sangat rapi dan detail jumputannya memukau. Kualitas premium yang sesungguhnya.",
    author: "Rina S.",
    role: "Fashion Enthusiast",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Classic Tote ini tidak hanya ramah lingkungan, tapi juga sangat kuat untuk bawaan sehari-hari saya ke kantor. Terasa sangat berkelas.",
    author: "Budi T.",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Saya sangat kagum dengan Explorer Pack. Desainnya rugged tapi tetap terasa mewah. Bahan goninya sangat tebal dan berkualitas.",
    author: "Sarah W.",
    role: "Traveler",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Urban Sling jadi tas andalan saya sekarang. Sangat praktis namun tetap menarik perhatian. Kombinasi goni dan jumputan yang brilian.",
    author: "Andika P.",
    role: "Entrepreneur",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Mendukung produk ramah lingkungan yang punya estetika semewah ini adalah kebanggaan. Sangat direkomendasikan!",
    author: "Diana M.",
    role: "Eco-Lifestyle Advocate",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Sentuhan jumputannya memberi karakter yang tidak bisa ditemukan di tas bermerk lainnya. Benar-benar eksklusif dan autentik.",
    author: "Reza K.",
    role: "Architect",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "Setiap membawa Tote Bag Kiokilho, saya selalu ditanya beli di mana. Tas ini bukan sekadar wadah, tapi sebuah mahakarya.",
    author: "Maya L.",
    role: "Art Curator",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  // Duplicate array to create a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section style={{ padding: '8rem 0', background: 'var(--bg-color)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em',
            color: 'var(--accent-color)',
            marginBottom: '1rem',
            display: 'block',
            fontFamily: 'Outfit, sans-serif'
          }}>Suara Pelanggan</span>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>Dipercaya oleh mereka yang menghargai kualitas.</h2>
        </motion.div>
      </div>

      <div style={{ position: 'relative', width: '100vw', left: 'calc(-50vw + 50%)' }}>
        {/* Fading edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(to right, var(--bg-color) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(to left, var(--bg-color) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}></div>

        <motion.div 
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            ease: 'linear',
            duration: 50,
            repeat: Infinity,
          }}
          style={{ 
            display: 'flex', 
            gap: '2rem',
            width: 'fit-content',
            paddingLeft: '2rem'
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                width: '400px',
                flexShrink: 0,
                background: 'var(--surface-color-light)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                  ))}
                </div>
                <p style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: '1.2rem', 
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  marginBottom: '2rem'
                }}>
                  "{testimonial.text}"
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={testimonial.img} 
                  alt={testimonial.author} 
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }} 
                />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{testimonial.author}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
