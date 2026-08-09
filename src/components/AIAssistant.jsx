import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../lib/supabase';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setDbProducts(data);
    }
    fetchProducts();
  }, []);
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

  const scrollAnimationRef = useRef(null);

  const scrollToBottom = (force = false) => {
    if (!chatRef.current) return;
    const el = chatRef.current;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;

    if (isNearBottom || force) {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      scrollAnimationRef.current = requestAnimationFrame(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
      const timer = setTimeout(() => {
        scrollToBottom(true);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    localStorage.setItem('kiokilho_ai_chat', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (textToSend) => {
    const messageContent = typeof textToSend === 'string' ? textToSend : input;
    if (!messageContent.trim()) return;

    const userMessage = messageContent.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    if (messageContent === input) {
      setInput('');
    }
    setIsLoading(true);

    try {
      const systemInstruction = `Kamu adalah asisten virtual Kiokilho, brand tas goni premium di Indonesia. Jawab pertanyaan pengguna dengan gaya bahasa yang elegan, ramah, dan profesional. Selalu bantu pengguna menemukan produk tas goni yang tepat. Jika pengguna ingin memesan produk secara langsung, butuh bantuan lebih lanjut, atau menanyakan hal yang tidak kamu ketahui, barulah arahkan mereka untuk chat ke WhatsApp kami melalui tautan [Send Message](https://wa.me/6281226841755) LANGSUNG MENYATU secara INLINE di dalam kalimat. DILARANG KERAS membuat baris baru/enter di atas maupun di bawah tautan tersebut, dan DILARANG menambahkan teks terpisah seperti "(Admin)" di luar tautan! Jangan paksa mengarahkan ke WA jika pengguna hanya bertanya santai. SANGAT PENTING 1: Kamu HANYA diizinkan untuk membahas topik seputar Kiokilho, produk tas, eco-fashion, dan pesanan. Jika ditanya di luar itu, jawab: 'Maaf, aku hanya bisa menjawab seputar produk Kiokilho.'

Informasi Perusahaan (Gunakan ini jika ditanya tentang lokasi, asal, legalitas, atau keamanan bertransaksi):
- Alamat Fisik / Toko: Jl. Nglengkong-Ledoksari, Sumberwatu, RT04/02 Dowangsari, Sambirejo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572 (Berada di kawasan wisata Candi Prambanan).
- Legalitas Usaha: Kiokilho adalah bisnis resmi berbadan hukum yang terdaftar dengan Nomor Induk Berusaha (NIB) 2104220054682. Bertransaksi dengan kami dijamin aman dan terpercaya 100%.
- Layanan & Pembayaran: Kami melayani pengiriman pesanan ke seluruh wilayah Indonesia (online/non-fisik) dan juga melayani kunjungan langsung ke toko fisik kami. Kami mendukung semua metode pembayaran (All Payment) untuk kemudahan transaksi Anda.
- Pengembang Web: Website ini dikembangkan oleh PT Kinterraforé Technologies and Innovation yang beralamat di Pacific Building Tower Office, Jl. Laksda Adisutjipto No. 157, Demangan Baru, Caturtunggal, Depok, Sleman DIY. Jika pengguna menanyakan email/kontak pengembang, WAJIB tuliskan tautan [Send Email](mailto:business@kinterratechnologies.com) LANGSUNG MENYATU secara INLINE di dalam kalimat (contoh: "...dapat menghubungi kami melalui [Send Email](mailto:business@kinterratechnologies.com) atau Instagram..."). DILARANG KERAS membuat baris baru/enter di atas maupun di bawah tautan tersebut! Instagram: @kinterratechnologies.

Berikut adalah daftar produk terkini beserta harganya:
${dbProducts.map(p => `- Nama: ${p.name}, Kategori: ${p.category}, Harga Jual: ${p.price}${p.original_price ? `, Harga Asli (Sebelum Diskon): ${p.original_price}` : ''}, Ukuran/Dimensi: ${p.dimensions || 'Tidak ada info ukuran'}, Deskripsi: ${p.description}`).join('\n')}

SANGAT PENTING 2: Jika merekomendasikan produk yang ada di daftar di atas, WAJIB bungkus namanya dengan kurung siku ganda persis seperti namanya, contoh: [[Nama Produk]]. JANGAN tambahkan tanda baca (koma/titik) atau kata penghubung ('dan') di sekitar kurung siku. Tuliskan setiap produk di baris baru (Enter) agar tampilan kartu UI rapi.`;

      const dynamicModel = genAI.getGenerativeModel({
        model: "gemini-3.1-flash-lite",
        systemInstruction
      });

      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const chat = dynamicModel.startChat({ history });
      const result = await chat.sendMessageStream(userMessage);

      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let displayedText = '';
      let targetText = '';

      // Typewriter effect interval (types 3 characters every 25ms for liquid-smooth typing without frame jitter)
      const interval = setInterval(() => {
        if (displayedText.length < targetText.length) {
          const step = Math.min(3, targetText.length - displayedText.length);
          displayedText += targetText.slice(displayedText.length, displayedText.length + step);
          setMessages(prev => {
            const newMsgs = [...prev];
            const lastIndex = newMsgs.length - 1;
            if (lastIndex >= 0 && newMsgs[lastIndex].role === 'model') {
              newMsgs[lastIndex] = {
                ...newMsgs[lastIndex],
                text: displayedText
              };
            }
            return newMsgs;
          });
        }
      }, 25);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        targetText += chunkText;
      }

      // Wait until typewriter animation catches up with the complete response
      while (displayedText.length < targetText.length) {
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      clearInterval(interval);

      // Finalize exact text state
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastIndex = newMsgs.length - 1;
        if (lastIndex >= 0 && newMsgs[lastIndex].role === 'model') {
          newMsgs[lastIndex] = {
            ...newMsgs[lastIndex],
            text: targetText
          };
        }
        return newMsgs;
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text) => {
    // Bersihkan koma, titik, baris baru, dan kata penghubung di sekitar tag produk, wa, & mailto link
    const cleanText = text
      .replace(/\]\],?\s*(dan\s*)?\[\[/gi, ']][[') // Gabungkan tag yang berdekatan
      .replace(/\]\]\s*\n/g, ']]') // Hapus enter setelah kartu
      .replace(/\n\s*\[\[/g, '[[') // Hapus enter sebelum kartu
      .replace(/\]\]\./g, ']]') // Hapus titik setelah kartu
      .replace(/\s*\n+\s*(\[.*?\]\(https?:\/\/wa\.me.*?\))/gi, ' $1') // Hapus enter & spasi ganda sebelum wa link
      .replace(/(\[.*?\]\(https?:\/\/wa\.me.*?\))\s*\n+\s*/gi, '$1 ') // Hapus enter & spasi ganda setelah wa link
      .replace(/\s*\n+\s*(\[.*?\]\(mailto:.*?\))/gi, ' $1') // Hapus enter & spasi ganda sebelum mailto link
      .replace(/(\[.*?\]\(mailto:.*?\))\s*\n+\s*/gi, '$1 '); // Hapus enter & spasi ganda setelah mailto link

    // Regex splits the text into product tags, markdown links, WA links/numbers, email addresses, bold, italic, and newlines
    const parts = cleanText.split(/(\[\[.*?\]\]|\[.*?\]\(.*?\)|https?:\/\/wa\.me\/\d+|(?:08|\+628|628)\d{8,11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*.*?\*\*|\*.*?\*|\n)/g);

    return parts.map((part, i) => {
      if (!part) return null;

      if (part.startsWith('[[') && part.endsWith(']]')) {
        const parsedName = part.slice(2, -2).trim();
        const foundProduct = dbProducts.find(p => p.name.toLowerCase() === parsedName.toLowerCase());

        const imgSrc = foundProduct ? foundProduct.image_url : null;
        const price = foundProduct ? foundProduct.price : "";
        const actualName = foundProduct ? foundProduct.name : parsedName;

        return (
          <div
            key={i}
            onClick={() => navigate(`/products?q=${encodeURIComponent(actualName)}`)}
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
                <img src={imgSrc} alt={actualName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'Playfair Display, serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                {actualName}
              </div>
              {price && <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{price}</div>}
            </div>
            <div style={{ color: 'var(--accent-color)', paddingRight: '4px', display: 'flex', alignItems: 'center' }}>
              <ArrowRight size={18} />
            </div>
          </div>
        );
      } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const label = part.slice(1, part.indexOf(']'));
        const url = part.slice(part.indexOf('](') + 2, -1);
        const isMail = url.startsWith('mailto:');
        const isWA = url.includes('wa.me') || url.includes('whatsapp.com');

        if (isWA) {
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 12px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#ffffff',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                transition: 'all 0.2s ease',
                margin: '2px 4px 2px 0',
                verticalAlign: 'middle'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
                const arrow = e.currentTarget.querySelector('.cta-arrow');
                if (arrow) arrow.style.transform = 'translateX(3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.25)';
                const arrow = e.currentTarget.querySelector('.cta-arrow');
                if (arrow) arrow.style.transform = 'translateX(0)';
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffffff" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Send Message</span>
              <ArrowRight className="cta-arrow" size={11} style={{ opacity: 0.9, transition: 'transform 0.2s ease' }} />
            </a>
          );
        }

        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 12px',
              background: 'linear-gradient(135deg, #111111 0%, #2a2a2a 100%)',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'Outfit, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
              margin: '2px 4px 2px 0',
              verticalAlign: 'middle'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            {isMail ? <Mail size={12} style={{ color: '#f8e3de' }} /> : <ExternalLink size={12} />}
            <span>{label}</span>
            <ArrowRight className="cta-arrow" size={12} style={{ opacity: 0.8, transition: 'transform 0.2s ease' }} />
          </a>
        );
      } else if (/^(?:08|\+628|628)\d{8,11}$/.test(part) || /^https?:\/\/wa\.me\/\d+$/.test(part)) {
        let cleanNumber = part.replace(/\D/g, '');
        if (cleanNumber.startsWith('08')) {
          cleanNumber = '628' + cleanNumber.slice(2);
        }
        const targetUrl = part.startsWith('http') ? part : `https://wa.me/${cleanNumber}`;

        return (
          <a
            key={i}
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 12px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'Outfit, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
              transition: 'all 0.2s ease',
              margin: '2px 4px 2px 0',
              verticalAlign: 'middle'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.25)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffffff" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Send Message</span>
            <ArrowRight className="cta-arrow" size={11} style={{ opacity: 0.9, transition: 'transform 0.2s ease' }} />
          </a>
        );
      } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={i}
            href={`mailto:${part}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 12px',
              background: 'linear-gradient(135deg, #111111 0%, #2a2a2a 100%)',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: 'Outfit, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
              margin: '0 4px',
              verticalAlign: 'middle'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
              const arrow = e.currentTarget.querySelector('.cta-arrow');
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            <Mail size={12} style={{ color: '#f8e3de' }} />
            <span>Send Email</span>
            <ArrowRight className="cta-arrow" size={12} style={{ opacity: 0.8, transition: 'transform 0.2s ease' }} />
          </a>
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
              bottom: 'clamp(15px, 5vh, 100px)',
              right: 'clamp(10px, 3vw, 30px)',
              width: 'clamp(300px, calc(100vw - 20px), 360px)',
              height: 'clamp(500px, calc(100vh - 85px), 580px)',
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
                overscrollBehavior: 'contain',
                overflowAnchor: 'auto'
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
                        maxWidth: '82%',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
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

            {/* Recommendation Chips */}
            <div style={{
              padding: '0.8rem 1rem',
              background: '#fafafa',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <style>{`
                .ai-chips::-webkit-scrollbar { display: none; }
              `}</style>
              {[
                "Apa tas yang paling laris?",
                "Rekomendasi tas ransel?",
                "Berapa harga Urban Sling?",
                "Tas terbuat dari bahan apa?",
                "Apakah bahan goninya tahan air?",
                "Bagaimana cara perawatannya?",
                "Berapa lama pengiriman?",
                "Apakah ada toko fisik?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="ai-chips"
                  style={{
                    padding: '8px 14px',
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.color = 'var(--accent-color)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div style={{
              padding: '1rem',
              background: '#ffffff',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
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
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Only visible when chat is closed) */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
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
          <MessageCircle size={28} />
        </motion.button>
      )}
    </>
  );
}
