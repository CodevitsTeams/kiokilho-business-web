import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import lsp1 from '../assets/lsp1.jpeg';
import lsp2 from '../assets/lsp2.jpeg';
import lsp3 from '../assets/lsp3.jpeg';
import lsp4 from '../assets/lsp4.jpeg';
import lsp5 from '../assets/lsp5.jpeg';
import ptr1 from '../assets/ptr1.jpeg';
import ptr2 from '../assets/ptr2.jpeg';
import ptr3 from '../assets/ptr3.jpeg';
import ptr4 from '../assets/ptr4.jpeg';
import ptr5 from '../assets/ptr5.jpeg';

const slides = [
  {
    image: lsp1,
    mobileImage: ptr1,
    kicker: "Eksklusif & Autentik",
    title1: "Setiap jahitan",
    title2: "membawa cerita.",
    lead: "Dirajut secara manual dengan penuh dedikasi, memadukan ketangguhan serat goni dengan keindahan motif jumputan Nusantara."
  },
  {
    image: lsp2,
    mobileImage: ptr2,
    kicker: "Elegan & Mewah",
    title1: "Simfoni serat",
    title2: "natural.",
    lead: "Mewujudkan keanggunan sejati yang lahir dari material alam, disempurnakan oleh keterampilan tangan perajin lokal yang teliti di setiap detailnya."
  },
  {
    image: lsp3,
    mobileImage: ptr3,
    kicker: "Ikonik & Klasik",
    title1: "Definisi baru",
    title2: "kemewahan.",
    lead: "Sebuah mahakarya eksklusif yang mendefinisikan ulang standar kemewahan, dirancang khusus untuk menjadi teman setia Anda yang tak lekang oleh waktu."
  },
  {
    image: lsp4,
    mobileImage: ptr4,
    kicker: "Simbol Status",
    title1: "Menyatu dengan",
    title2: "gaya hidup.",
    lead: "Bukan sekadar tas, melainkan cerminan apresiasi Anda terhadap karya seni bernilai tinggi di setiap langkah. Hadir untuk menyempurnakan gaya eksklusif Anda."
  },
  {
    image: lsp5,
    mobileImage: ptr5,
    kicker: "Kebanggaan Bangsa",
    title1: "Pesona anggun",
    title2: "warisan bangsa.",
    lead: "Merajut karsa dan rasa dalam satu harmoni. Menjadikannya warisan kebanggaan bangsa yang melekat indah di setiap langkah keanggunan Anda."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
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
            src={isMobile && slides[currentSlide].mobileImage ? slides[currentSlide].mobileImage : slides[currentSlide].image}
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
          background: isMobile ? 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 60%, #ffffff 100%)' : 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, #ffffff 100%)',
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
              style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))' }}
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
          <button
            onClick={() => navigate('/products')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#ffffff',
              padding: '6px 6px 6px 24px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '1.05rem',
              fontWeight: 500,
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.35)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.25)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.25)';
            }}
          >
            Eksplorasi Koleksi
            <div style={{
              background: '#fdfbf7',
              color: '#1d1d1f',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <ArrowUpRight size={20} strokeWidth={2} />
            </div>
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
