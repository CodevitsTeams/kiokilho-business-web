import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toteImg from '../assets/tote_bag.png';
import slingImg from '../assets/sling_bag.png';
import backpackImg from '../assets/backpack_bag.png';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-3.1-flash-lite",
  systemInstruction: "Kamu adalah asisten virtual Kiokilho, brand tas goni premium di Indonesia. Jawab pertanyaan pengguna dengan gaya bahasa yang elegan, ramah, dan profesional. Selalu bantu pengguna menemukan produk tas goni yang tepat. Untuk informasi lebih detail mengenai apa pun, kamu WAJIB mengarahkan pengguna untuk chat ke nomor WhatsApp kami di 081234567890 (dengan menyebut nama Mbak Vera). SANGAT PENTING 1: Kamu HANYA diizinkan untuk membahas topik seputar Kiokilho, produk tas, eco-fashion, dan pesanan. Jika ditanya di luar itu, jawab: 'Maaf, aku hanya bisa menjawab seputar produk Kiokilho.' SANGAT PENTING 2: Jika merekomendasikan produk (Classic Tote, Urban Sling, atau Explorer Pack), WAJIB bungkus namanya dengan kurung siku ganda, contoh: [[Classic Tote]]. JANGAN tambahkan tanda baca (koma/titik) atau kata penghubung ('dan') di sekitar kurung siku. Tuliskan setiap produk di baris baru (Enter) agar tampilan kartu UI rapi."
});

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('kiokilho_ai_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      { role: 'model', text: 'Halo! Saya asisten Kiokilho. Ada yang bisa saya bantu tentang koleksi tas goni premium kami?' }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate(); // For generative UI navigation

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    localStorage.setItem('kiokilho_ai_chat', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessageStream(userMessage);
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        setMessages(prev => {
          const newMsgs = [...prev];
          const lastIndex = newMsgs.length - 1;
          newMsgs[lastIndex] = { 
            ...newMsgs[lastIndex], 
            text: newMsgs[lastIndex].text + chunkText 
          };
          return newMsgs;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text) => {
    // Bersihkan koma, titik, baris baru, dan kata penghubung di sekitar tag produk
    const cleanText = text
      .replace(/\]\],?\s*(dan\s*)?\[\[/gi, ']][[') // Gabungkan tag yang berdekatan
      .replace(/\]\]\s*\n/g, ']]') // Hapus enter setelah kartu
      .replace(/\n\s*\[\[/g, '[[') // Hapus enter sebelum kartu
      .replace(/\]\]\./g, ']]'); // Hapus titik setelah kartu

    // Regex splits the text but keeps the matched delimiters in the resulting array
    const parts = cleanText.split(/(\[\[.*?\]\]|\*\*.*?\*\*|\*.*?\*|\n)/g);
    
    return parts.map((part, i) => {
      if (!part) return null;
      
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const productName = part.slice(2, -2);
        
        let imgSrc = null;
        let price = "";
        if (productName.toLowerCase().includes('tote')) { imgSrc = toteImg; price = "Rp 499.000"; }
        else if (productName.toLowerCase().includes('sling')) { imgSrc = slingImg; price = "Rp 349.000"; }
        else if (productName.toLowerCase().includes('explorer') || productName.toLowerCase().includes('pack')) { imgSrc = backpackImg; price = "Rp 899.000"; }

        return (
          <div 
            key={i} 
            onClick={() => navigate(`/products?q=${encodeURIComponent(productName)}`)}
            style={{ 
              margin: '6px 0', 
              padding: '10px', 
              background: '#fafafa', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            {imgSrc && (
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#000' }}>
                <img src={imgSrc} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'Playfair Display, serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                {productName}
              </div>
              {price && <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{price}</div>}
            </div>
            <div style={{ color: 'var(--accent-color)', paddingRight: '4px', display: 'flex', alignItems: 'center' }}>
              <ArrowRight size={18} />
            </div>
          </div>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      } else if (part === '\n') {
        return <br key={i} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: 'clamp(20px, 10vh, 100px)',
              right: 'clamp(10px, 3vw, 30px)',
              width: 'clamp(300px, calc(100vw - 20px), 360px)',
              height: 'clamp(450px, calc(100vh - 120px), 520px)',
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.2rem 1.5rem',
              background: 'var(--text-primary)',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Bot size={22} />
                <span style={{ fontWeight: 600, fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Kiokilho Assistant</span>
              </div>
              <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </div>

            {/* Chat Area */}
            <div 
              ref={chatRef} 
              data-lenis-prevent="true"
              style={{
                flex: 1,
                overflowY: 'auto',
                background: '#fafafa',
                padding: '1.5rem',
                overscrollBehavior: 'contain'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  gap: '0.8rem',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: msg.role === 'user' ? 'var(--accent-color)' : 'var(--text-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    style={{
                      background: msg.role === 'user' ? 'var(--text-primary)' : '#ffffff',
                      color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      maxWidth: '75%',
                      border: msg.role !== 'user' ? '1px solid var(--border-color)' : 'none'
                    }}
                  >
                    {renderMessage(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--text-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Bot size={16} color="#fff" />
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mengetik balasan...</div>
                </div>
              )}
              </div>
            </div>

            {/* Input Area */}
            <div style={{
              padding: '1rem',
              background: '#ffffff',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan sesuatu..."
                style={{
                  flex: 1,
                  padding: '0.8rem 1.2rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem'
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0
                }}
              >
                <Send size={18} style={{ marginLeft: '3px' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 'clamp(20px, 5vh, 30px)',
          right: 'clamp(10px, 3vw, 30px)',
          width: 'clamp(55px, 15vw, 65px)',
          height: 'clamp(55px, 15vw, 65px)',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000,
          padding: 0
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </>
  );
}
