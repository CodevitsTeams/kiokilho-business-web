import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, totalPrice, totalOriginalPrice, formatPrice } = useCart();

  const discountAmount = totalOriginalPrice - totalPrice;
  const hasDiscount = discountAmount > 0;

  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;
    
    let text = `Halo Kiokilho, saya ingin memesan koleksi eksklusif berikut:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n   Jumlah: ${item.quantity}x\n   Harga Satuan: ${item.price}\n`;
    });
    
    if (hasDiscount) {
      text += `\n*Subtotal: ${formatPrice(totalOriginalPrice)}*\n*Total Diskon: -${formatPrice(discountAmount)}*\n*Total Nilai Pesanan: ${formatPrice(totalPrice)}*\n\nApakah pesanan saya bisa segera diproses?`;
    } else {
      text += `\n*Total Nilai Pesanan: ${formatPrice(totalPrice)}*\n\nApakah pesanan saya bisa segera diproses?`;
    }
    
    window.open(`https://wa.me/6281226841755?text=${encodeURIComponent(text)}`, '_blank');
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
              <button onClick={closeCart} style={{ padding: 0, background: 'rgba(0,0,0,0.05)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        {item.originalPrice && <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'Outfit, sans-serif' }}>{item.originalPrice}</span>}
                        <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif' }}>{item.price}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#f5f5f7', borderRadius: '999px', padding: '4px 8px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: 0, color: 'var(--text-primary)', background: '#fff', borderRadius: '50%', width: 24, height: 24, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Minus size={12} /></button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: 0, color: 'var(--text-primary)', background: '#fff', borderRadius: '50%', width: 24, height: 24, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444', display: 'flex', alignItems: 'center' }}>
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
                {hasDiscount && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif' }}>{formatPrice(totalOriginalPrice)}</span>
                  </div>
                )}
                {hasDiscount && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1.05rem', color: 'var(--accent-color)' }}>
                    <span>Total Diskon</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif' }}>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span>Total Pesanan</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif' }}>{formatPrice(totalPrice)}</span>
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
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg> Selesaikan via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
