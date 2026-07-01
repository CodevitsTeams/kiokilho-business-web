import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import slide1Lifestyle from '../assets/burlap_bag_lifestyle.png';
import slide2 from '../assets/hero_slide_2.png';
import slide3 from '../assets/hero_slide_3.png';
import slide4Lifestyle from '../assets/bag_lifestyle_4.png';
import slide5Lifestyle from '../assets/bag_eco_lifestyle_5_alt.png';

const slides = [
  {
    image: slide1Lifestyle,
    kicker: "Eksklusif & Autentik",
    title1: "Setiap jahitan",
    title2: "membawa cerita.",
    lead: "Dirajut secara manual dengan penuh dedikasi, memadukan ketangguhan serat goni dengan keindahan motif jumputan Nusantara."
  },
  {
    image: slide2,
    kicker: "Elegan & Mewah",
    title1: "Simfoni serat",
    title2: "natural.",
    lead: "Mewujudkan keanggunan sejati yang lahir dari material alam, disempurnakan oleh keterampilan tangan perajin lokal yang teliti di setiap detailnya."
  },
  {
    image: slide3,
    kicker: "Ikonik & Klasik",
    title1: "Definisi baru",
    title2: "kemewahan.",
    lead: "Sebuah mahakarya eksklusif yang mendefinisikan ulang standar kemewahan, dirancang khusus untuk menjadi teman setia Anda yang tak lekang oleh waktu."
  },
  {
    image: slide4Lifestyle,
    kicker: "Simbol Status",
    title1: "Menyatu dengan",
    title2: "gaya hidup.",
    lead: "Bukan sekadar tas, melainkan cerminan apresiasi Anda terhadap karya seni bernilai tinggi di setiap langkah."
  },
  {
    image: slide5Lifestyle,
    kicker: "Langkah Berkelanjutan",
    title1: "Kemewahan yang",
    title2: "peduli bumi.",
    lead: "Tampil memukau sekaligus menjaga kelestarian alam. Koleksi ramah lingkungan kami adalah wujud cinta pada generasi mendatang."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Full Background Image Slider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: '#000'
      }}>
        <AnimatePresence>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            alt="Tas Goni Premium Kiokilho" 
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
        </AnimatePresence>

        {/* Overlay to ensure text readability and fade smoothly into the white background below */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, #ffffff 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* We use a fixed minHeight wrapper so the button doesn't jump up and down during text transition */}
        <div style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                color: '#e5d3b3',
                marginBottom: '1.5rem',
                display: 'block',
                fontFamily: 'Outfit, sans-serif'
              }}>{slides[currentSlide].kicker}</span>

              <h1 
                className="display-1"
                style={{ marginBottom: '1.5rem', color: '#ffffff' }}
              >
                {slides[currentSlide].title1} <br /><span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e5d3b3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{slides[currentSlide].title2}</span>
              </h1>

              <p 
                className="lead"
                style={{ marginBottom: '0', color: '#f5f5f7' }}
              >
                {slides[currentSlide].lead}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}
        >
          <button style={{ 
            background: '#ffffff', 
            color: '#1d1d1f', 
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            Eksplorasi Koleksi
          </button>
        </motion.div>

        {/* Carousel indicators */}
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginTop: '4rem' }}>
          {slides.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '30px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
