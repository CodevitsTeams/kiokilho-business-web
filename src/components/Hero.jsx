import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import lsp1 from '../assets/lsp1-clean.png';
import lsp2 from '../assets/lsp2-clean.png';
import lsp3 from '../assets/lsp3.jpeg';
import lsp4 from '../assets/lsp4-clean.png';
import lsp5 from '../assets/lsp5.jpeg';
import ptr1 from '../assets/ptr1.jpeg';
import ptr2 from '../assets/ptr2.jpeg';
import ptr3 from '../assets/ptr3.jpeg';
import ptr4 from '../assets/ptr4.jpeg';
import ptr5 from '../assets/ptr5.jpeg';

const slide5Variants = [
  {
    kicker: "Kebanggaan Bangsa",
    title1: "Mahakarya",
    title2: "warisan bangsa.",
    lead: "Merajut karsa dan rasa dalam satu harmoni. Menjadikannya warisan kebanggaan bangsa yang melekat di setiap langkah keanggunan Anda.",
    leadMobile: "Merajut karsa dan rasa dalam satu harmoni. Menjadikannya warisan kebanggaan bangsa yang melekat di setiap langkah."
  },
  {
    kicker: "Ruh Tradisi",
    title1: "Napas budaya,",
    title2: "jiwa Nusantara.",
    lead: "Lebih dari rupa, ia denyut nadi tradisi yang terus berdetak. Membawa ruh kearifan lokal berpadu memukau di atas panggung gaya modern.",
    leadMobile: "Lebih dari rupa, ia denyut nadi tradisi yang terus berdetak. Membawa ruh kearifan lokal berpadu memukau di panggung modern."
  },
  {
    kicker: "Pesona Magis",
    title1: "Guratan pesona",
    title2: "bumi pertiwi.",
    lead: "Kecantikan dan keelokan budaya Nusantara tersirat di setiap silang jalinannya. Menghadirkan pesona magis yang senantiasa memikat.",
    leadMobile: "Keelokan budaya Nusantara tersirat di setiap silang jalinannya. Menghadirkan pesona magis yang senantiasa memikat."
  },
  {
    kicker: "Jejak Abadi",
    title1: "Merajut jejak",
    title2: "sang waktu.",
    lead: "Saksi bisu dedikasi tangan perajin dalam mengabadikan nilai luhur. Sebuah narasi keanggunan yang melampaui batas hari dan dekade.",
    leadMobile: "Saksi bisu dedikasi tangan perajin dalam mengabadikan nilai luhur. Sebuah narasi keanggunan yang melampaui batas dekade."
  },
  {
    kicker: "Estetika Klasik",
    title1: "Karya agung",
    title2: "lintas zaman.",
    lead: "Dirancang bukan untuk tren sesaat, namun perayaan estetika tak lekang. Merawat warisan kebanggaan dari satu generasi ke generasi berikutnya.",
    leadMobile: "Dirancang bukan untuk tren sesaat, namun perayaan estetika tak lekang. Merawat warisan kebanggaan dari satu generasi ke generasi berikutnya."
  },
  {
    kicker: "Keanggunan Murni",
    title1: "Lestari dalam",
    title2: "keanggunan.",
    lead: "Menjaga warisan budaya agar tak pernah padam. Membalutnya dengan aura kemewahan kelas atas yang meredefinisi gaya paripurna Anda.",
    leadMobile: "Menjaga warisan budaya agar tak padam. Membalutnya dengan aura kemewahan kelas atas yang meredefinisi gaya."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slide5VariantIndex, setSlide5VariantIndex] = useState(Math.floor(Math.random() * slide5Variants.length));

  const slides = [
    {
      image: lsp1,
      mobileImage: ptr1,
      kicker: "Eksklusif & Autentik",
      title1: "Setiap jahitan",
      title2: "membawa cerita.",
      lead: "Dirajut secara manual dengan penuh dedikasi, memadukan ketangguhan serat goni dengan keindahan motif jumputan Nusantara.",
      leadDesktop: "Eksplorasi sempurna antara keuletan serat goni dan keelokan jumputan Nusantara. Dirajut penuh dedikasi oleh artisan untuk menghadirkan keanggunan eksklusif."
    },
    {
      image: lsp2,
      mobileImage: ptr2,
      kicker: "Elegan & Mewah",
      title1: "Simfoni harmoni",
      title2: "serat natural.",
      lead: "Mewujudkan keanggunan sejati yang lahir dari material serat alam, diciptakan khusus untuk memancarkan identitas dan persona Anda.",
      leadDesktop: "Mewujudkan keanggunan sejati yang lahir dari material alam, disempurnakan oleh keterampilan perajin lokal yang teliti untuk menyempurnakan pesona gaya Anda."
    },
    {
      image: lsp3,
      mobileImage: ptr3,
      kicker: "Ikonik & Klasik",
      title1: "Definisi baru",
      title2: "kemewahan.",
      lead: "Mahakarya eksklusif yang mendefinisikan ulang standar kemewahan, dirancang khusus untuk menemani setiap momen berharga.",
      leadDesktop: "Mahakarya eksklusif yang mendefinisikan ulang standar kemewahan, dirancang khusus untuk menjadi teman setia Anda yang menemani setiap momen berharga."
    },
    {
      image: lsp4,
      mobileImage: ptr4,
      kicker: "Pesona Elite",
      title1: "Simbol prestise",
      title2: "kelas atas.",
      lead: "Lebih dari sekadar kriya, ia adalah simbol apresiasi karya seni bernilai tinggi. Merajut gaya eksklusifitas dengan kemewahan sejati.",
      leadDesktop: "Bukan sekadar kriya, melainkan cerminan apresiasi terhadap karya seni bernilai tinggi. Hadir untuk menyempurnakan gaya eksklusifitas dengan sentuhan kemewahan sejati."
    },
    {
      image: lsp5,
      mobileImage: ptr5,
      kicker: slide5Variants[slide5VariantIndex].kicker,
      title1: slide5Variants[slide5VariantIndex].title1,
      title2: slide5Variants[slide5VariantIndex].title2,
      lead: slide5Variants[slide5VariantIndex].lead,
      leadMobile: slide5Variants[slide5VariantIndex].leadMobile
    }
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [slides.length]);

  // Cycle Slide 5 variant every time the slider loops back to the start
  useEffect(() => {
    if (currentSlide === 0) {
      setSlide5VariantIndex(prev => (prev + 1) % slide5Variants.length);
    }
  }, [currentSlide]);

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
            src={isTablet && slides[currentSlide].mobileImage ? slides[currentSlide].mobileImage : slides[currentSlide].image}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" }
            }}
            alt="Tas Goni Premium Kiokilho"
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', willChange: 'transform, opacity' }}
          />
        </AnimatePresence>

        {/* Overlay to ensure text readability and fade smoothly into the white background below */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 60%, #ffffff 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 60%, #ffffff 100%)',
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
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.1 }
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))', display: 'flex', flexDirection: 'column', alignItems: 'center', willChange: 'transform, opacity' }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 25, stiffness: 120, mass: 1 } }
                }}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#e5d3b3',
                  marginBottom: '1.5rem',
                  display: 'block',
                  fontFamily: 'Outfit, sans-serif',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {slides[currentSlide].kicker}
              </motion.span>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 35, filter: 'blur(15px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 28, stiffness: 110, mass: 1.2 } }
                }}
                className="display-1-5"
                style={{ marginBottom: '1.5rem', color: '#ffffff', willChange: 'transform, opacity, filter' }}
              >
                {slides[currentSlide].title1} <br /><span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e5d3b3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{slides[currentSlide].title2}</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 25, stiffness: 120, mass: 1 } }
                }}
                className=""
                style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', marginBottom: '0', color: '#f5f5f7', willChange: 'transform, opacity, filter', maxWidth: isTablet ? '600px' : '700px', margin: '0 auto', lineHeight: 1.6, padding: '0 1rem' }}
              >
                {isMobile ? (slides[currentSlide].leadMobile || slides[currentSlide].lead) : (isTablet ? slides[currentSlide].lead : (slides[currentSlide].leadDesktop || slides[currentSlide].lead))}
              </motion.p>
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
              gap: '12px',
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#ffffff',
              padding: '5px 5px 5px 20px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '0.9rem',
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
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <ArrowUpRight size={16} strokeWidth={2} />
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
