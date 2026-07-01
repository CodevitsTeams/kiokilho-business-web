import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, totalPrice, formatPrice } = useCart();

  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;
    
    let text = `Halo Kiokilho, saya ingin memesan koleksi eksklusif berikut:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n   Jumlah: ${item.quantity}x\n   Harga Satuan: ${item.price}\n`;
    });
    text += `\n*Total Nilai Pesanan: ${formatPrice(totalPrice)}*\n\nApakah pesanan saya bisa segera diproses?`;
    
    window.open(`https://wa.me/6281359426149?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 999998
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: '100%',
              maxWidth: '450px',
              background: '#fff',
              zIndex: 999999,
              boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ padding: '2.5rem 2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)' }}>Keranjang</h2>
              <button onClick={closeCart} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '3rem', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>
                  Keranjang eksklusif Anda masih kosong.
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div layout key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '16px', background: '#f5f5f7', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.name}</h4>
                      <div style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>{item.price}</div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#f5f5f7', borderRadius: '999px', padding: '4px 8px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: '#fff', borderRadius: '50%', width: 24, height: 24, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Minus size={12} /></button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: '#fff', borderRadius: '50%', width: 24, height: 24, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444', display: 'flex', alignItems: 'center' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)', background: '#fff', boxShadow: '0 -10px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Pesanan</span>
                  <span style={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  onClick={handleCheckoutWA}
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    padding: '1.2rem',
                    borderRadius: '16px',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <MessageCircle size={22} /> Selesaikan via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
