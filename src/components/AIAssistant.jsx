import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyAWru4hFx-6P5QrxWjfmMmPkWF5O1VNjrQ");
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "Kamu adalah asisten virtual Kiokilho, brand tas goni premium di Indonesia. Jawab pertanyaan pengguna dengan gaya bahasa yang elegan, ramah, dan profesional. Selalu bantu pengguna menemukan produk tas goni yang tepat (Classic Tote, Urban Sling, Explorer Pack)."
});

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Halo! Saya asisten Kiokilho. Ada yang bisa saya bantu tentang koleksi tas goni premium kami?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
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
              bottom: '100px',
              right: '30px',
              width: '360px',
              height: '520px',
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
            <div ref={chatRef} style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: '#fafafa'
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
                  <div style={{
                    background: msg.role === 'user' ? 'var(--text-primary)' : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                    padding: '0.8rem 1.2rem',
                    borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    maxWidth: '75%',
                    border: msg.role !== 'user' ? '1px solid var(--border-color)' : 'none'
                  }}>
                    {msg.text}
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
          bottom: '30px',
          right: '30px',
          width: '65px',
          height: '65px',
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
