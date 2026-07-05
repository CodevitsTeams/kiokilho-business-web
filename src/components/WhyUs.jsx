import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Scissors, Infinity, Star, MessageCircle, ShieldCheck } from 'lucide-react';

const whyUsData = [
  {
    id: '01',
    title: "MATERIAL EKSKLUSIF",
    desc: "Perpaduan serat goni premium dan kain jumputan otentik, menciptakan mahakarya dengan tekstur tak tertandingi yang tidak akan Anda temukan di tempat lain.",
    icon: <Star size={20} color="#e5d3b3" />
  },
  {
    id: '02',
    title: "KEAHLIAN ARTISANAL",
    desc: "100% dikerjakan oleh tangan pengrajin lokal berpengalaman. Ketelitian ekstrem di setiap jahitan yang mustahil diduplikasi oleh mesin produksi massal manapun.",
    icon: <Scissors size={20} color="#e5d3b3" />
  },
  {
    id: '03',
    title: "DESAIN TIMELESS",
    desc: "Siluet arsitektural yang dirancang secara matang agar tetap relevan dan elegan melintasi berbagai era, tanpa termakan oleh tren mode sesaat.",
    icon: <Infinity size={20} color="#e5d3b3" />
  },
  {
    id: '04',
    title: "SUSTAINABLE & ETIS",
    desc: "Komitmen mutlak pada keramahan lingkungan. Kami memberdayakan komunitas perajin lokal untuk masa depan industri mode yang lebih baik dan manusiawi.",
    icon: <Leaf size={20} color="#e5d3b3" />
  },
  {
    id: '05',
    title: "SENTUHAN EKSKLUSIF",
    desc: "Sebuah perjalanan yang dirancang khusus untuk Anda. Dari tahap konsultasi privat hingga pengiriman eksklusif, asisten personal kami siap mendampingi setiap langkah Anda mendapatkan mahakarya impian.",
    icon: <MessageCircle size={20} color="#e5d3b3" />
  },
  {
    id: '06',
    title: "JAMINAN PARIPURNA",
    desc: "Hubungan kita tidak berakhir saat karya diterima. Kami mendedikasikan panduan perawatan khusus dan dukungan penuh untuk memastikan mahakarya Anda tetap memukau melintasi generasi.",
    icon: <ShieldCheck size={20} color="#e5d3b3" />
  }
];

export default function WhyUs() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="filosofi"
      className="dark-section"
      style={{
        padding: 'clamp(4rem, 10vw, 10rem) 0',
        background: '#0a0a0a',
        color: '#ffffff',
        position: 'relative'
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');`}
      </style>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header Section */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#666',
              marginBottom: '1.5rem',
              display: 'block',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Filosofi Kiokilho
          </motion.span>
          <motion.h2
            className="whyus-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#e5d3b3',
              letterSpacing: '0.02em'
            }}
          >
            Merajut elegansi absolut. Sebuah harmoni antara seni, tradisi, dan kemewahan masa depan dalam setiap mahakarya kriya.
          </motion.h2>
        </div>

        {/* Accordion List */}
        <div style={{ borderTop: '1px solid #222' }}>
          {whyUsData.map((item, index) => {
            const isActive = hoveredIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isActive ? null : index)}
                style={{
                  borderBottom: '1px solid #222',
                  padding: '2.5rem 0',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Background Hover Glow Effect */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(229, 211, 179, 0.04) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Row Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'clamp(1rem, 3vw, 2rem)'
                  }}>
                    <span style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontFamily: 'Outfit, sans-serif',
                      color: isActive ? '#e5d3b3' : '#444',
                      transition: 'color 0.5s ease',
                      fontWeight: 300,
                      width: 'clamp(35px, 8vw, 60px)',
                      flexShrink: 0
                    }}>
                      {item.id}
                    </span>
                    <h3 style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      color: isActive ? '#fff' : '#666',
                      transition: 'color 0.5s ease',
                      margin: 0
                    }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="accordion-content-inner" style={{
                          paddingTop: '2rem',
                          paddingLeft: 'clamp(0px, 5vw, calc(60px + 2rem))',
                          maxWidth: '800px',
                          display: 'flex',
                          gap: '1.5rem',
                          alignItems: 'flex-start'
                        }}>
                          <div style={{
                            padding: '0.75rem',
                            border: '1px solid rgba(229, 211, 179, 0.2)',
                            borderRadius: '50%',
                            display: 'flex',
                            flexShrink: 0
                          }}>
                            {item.icon}
                          </div>
                          <p style={{
                            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
                            lineHeight: 1.8,
                            color: '#a1a1a6',
                            fontFamily: 'Playfair Display, serif',
                            fontStyle: 'italic',
                            margin: 0
                          }}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
