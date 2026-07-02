import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Upload, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    original_price: '',
    category: '',
    image_url: '',
    images_array: [],
    tag: '',
    dimensions: '',
    description: '',
    long_description: ''
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) console.error(error);
    else setProducts(data || []);
    setLoading(false);
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('created_at');
    if (error) console.error(error);
    else setCategories(data || []);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
    }
  };

  const openAddModal = () => {
    setFormData({
      id: null,
      name: '',
      price: '',
      original_price: '',
      category: '',
      image_url: '',
      images_array: [],
      tag: '',
      dimensions: '',
      description: '',
      long_description: ''
    });
    setMainImageFile(null);
    setGalleryFiles([]);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      ...product,
      images_array: product.images_array || []
    });
    setMainImageFile(null);
    setGalleryFiles([]);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Produk',
      message: 'Yakin ingin menghapus mahakarya ini secara permanen?',
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) alert('Error: ' + error.message);
        else fetchProducts();
      }
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setIsSubmittingCategory(true);
    const { error } = await supabase.from('categories').insert([{ name: newCategoryName.trim() }]);
    if (error) {
      if (error.code === '23505') alert('Kategori sudah ada!');
      else alert('Error: ' + error.message);
    } else {
      setNewCategoryName('');
      fetchCategories();
    }
    setIsSubmittingCategory(false);
  };

  const handleDeleteCategory = (cat) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Apakah anda yakin akan menghapus Kategori ini?',
      message: `Menghapus kategori "${cat.name}" akan menghapus juga semua produk di dalamnya secara permanen.`,
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        // 1. Hapus semua produk yang menggunakan kategori ini
        const { error: errProducts } = await supabase.from('products').delete().eq('category', cat.name);
        if (errProducts) {
          alert('Error menghapus produk: ' + errProducts.message);
          return;
        }
        
        // 2. Hapus kategori
        const { error: errCat } = await supabase.from('categories').delete().eq('id', cat.id);
        if (errCat) alert('Error menghapus kategori: ' + errCat.message);
        else {
          fetchCategories();
          fetchProducts();
        }
      }
    });
  };

  const uploadFile = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;
      if (mainImageFile) {
        finalImageUrl = await uploadFile(mainImageFile);
      }

      let finalImagesArray = [...formData.images_array];
      if (galleryFiles.length > 0) {
        const uploadedUrls = await Promise.all(galleryFiles.map(file => uploadFile(file)));
        finalImagesArray = uploadedUrls;
      } else if (!finalImagesArray.length && finalImageUrl) {
        finalImagesArray = [finalImageUrl];
      }

      const productPayload = {
        name: formData.name,
        price: formData.price,
        original_price: formData.original_price || null,
        category: formData.category,
        image_url: finalImageUrl,
        images_array: finalImagesArray,
        tag: formData.tag || null,
        dimensions: formData.dimensions,
        description: formData.description,
        long_description: formData.long_description
      };

      if (formData.id) {
        // Update
        const { error } = await supabase.from('products').update(productPayload).eq('id', formData.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('products').insert([productPayload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = selectedCategoryFilters.length > 0 
    ? products.filter(p => selectedCategoryFilters.includes(p.category))
    : products;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', padding: 'clamp(6rem, 15vw, 10rem) clamp(1.5rem, 5vw, 10rem)' }}>
      <style>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          gap: 1.5rem;
        }
        .admin-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-family: 'Playfair Display', serif;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-family: 'Outfit', sans-serif;
        }
        .admin-table th {
          padding: 1.5rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .admin-table td {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .product-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .product-img {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          background: #f5f5f7;
          overflow: hidden;
          flex-shrink: 0;
        }
        .product-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-title {
          font-weight: 600;
          color: var(--text-primary);
        }
        .mobile-meta {
          display: none;
        }
        .btn-edit-product, .btn-delete-product {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          padding: 0.6rem;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .btn-edit-product { background: #f5f5f7; color: var(--text-secondary); }
        .btn-edit-product:hover { background: #e5e5ea; }
        .btn-delete-product { background: #fff0f0; color: red; }
        .btn-delete-product:hover { background: #ffe0e0; }
        .btn-text { display: none; }
        input, textarea, select {
          font-family: inherit;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .category-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f5f5f7;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .category-pill button {
          opacity: 0.5;
        }
        .category-pill:hover button {
          opacity: 1;
        }
        .table-container {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 5rem 1.5rem 2rem;
          }
          .table-container {
            background: transparent;
            border: none;
            border-radius: 0;
            overflow: visible;
          }
          .td-category, .td-price {
            display: none !important;
          }
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .admin-title {
            font-size: 2.2rem;
          }
          .admin-table thead {
            display: none;
          }
          .admin-table, .admin-table tbody, .admin-table tr, .admin-table td {
            display: block;
            width: 100%;
          }
          .admin-table tr {
            margin-bottom: 1rem;
            background: #ffffff;
            border-radius: 16px;
            padding: 1rem;
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          }
          .admin-table td {
            padding: 0;
            border: none;
          }
          .admin-table td::before {
            display: none;
          }
          .product-cell {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: flex-start;
          }
          .product-img {
            width: 80px;
            height: 80px;
            flex-shrink: 0;
          }
          .product-info-col {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            width: 100%;
          }
          .product-title {
            font-size: 1.1rem;
            line-height: 1.3;
          }
          .mobile-meta {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            margin-top: 0.2rem;
          }
          .mobile-cat {
            font-size: 0.85rem;
            color: var(--text-secondary);
          }
          .mobile-price {
            font-size: 1.05rem;
            font-weight: 600;
            color: var(--accent-color);
          }
          .td-action {
            margin-top: 1rem;
            padding-top: 1rem !important;
            border-top: 1px solid #f0f0f0 !important;
          }
          .btn-icon { display: none; }
          .btn-text { display: block; font-size: 0.85rem; font-weight: 600; }
          .btn-edit-product, .btn-delete-product {
            padding: 8px 20px;
            border-radius: 999px;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .modal-header, .modal-body {
            padding: 1.5rem !important;
          }
          .admin-card {
            padding: 1.5rem !important;
          }
        }
      `}</style>

      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>Kelola koleksi mahakarya dan kategori secara dinamis.</p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--text-primary)', color: 'var(--bg-color)',
            padding: '12px 24px', borderRadius: '999px', border: 'none',
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, cursor: 'pointer',
            transition: 'opacity 0.2s', width: 'max-content'
          }}
          onMouseOver={e => e.currentTarget.style.opacity = 0.8}
          onMouseOut={e => e.currentTarget.style.opacity = 1}
        >
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      {/* CATEGORY MANAGER */}
      <div className="admin-card" style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid var(--border-color)', padding: '2rem', marginBottom: '3rem', fontFamily: 'Outfit, sans-serif' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Tag size={20} /> Kelola Kategori
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          {categories.map(cat => {
            const isSelected = selectedCategoryFilters.includes(cat.name);
            return (
              <div 
                key={cat.id} 
                className="category-pill"
                onClick={() => setSelectedCategoryFilters(prev => prev.includes(cat.name) ? prev.filter(n => n !== cat.name) : [...prev, cat.name])}
                style={{
                  background: isSelected ? 'var(--text-primary)' : '#f5f5f7',
                  color: isSelected ? 'var(--bg-color)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat); }}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isSelected ? 'var(--bg-color)' : 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          {categories.length === 0 && <span style={{ color: 'var(--text-secondary)' }}>Belum ada kategori.</span>}
        </div>

        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '0.75rem', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Kategori baru..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            style={{ flex: 1, minWidth: 0, padding: '10px 16px', borderRadius: '999px', border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'Outfit, sans-serif' }}
          />
          <button
            type="submit"
            disabled={isSubmittingCategory}
            style={{ 
              flexShrink: 0, whiteSpace: 'nowrap', 
              background: 'var(--text-primary)', color: 'var(--bg-color)', 
              border: 'none', padding: '10px 24px', borderRadius: '999px', 
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, 
              cursor: isSubmittingCategory ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={e => !isSubmittingCategory && (e.currentTarget.style.opacity = 0.8)}
            onMouseOut={e => !isSubmittingCategory && (e.currentTarget.style.opacity = 1)}
          >
            {isSubmittingCategory ? '...' : 'Tambah'}
          </button>
        </form>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'Outfit, sans-serif' }}>Memuat data dari Supabase...</div>
        ) : (
          <table className="admin-table">
            <thead style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    {selectedCategoryFilters.length > 0 ? `Belum ada produk untuk kategori yang dipilih.` : 'Belum ada produk. Silakan tambah baru.'}
                  </td>
                </tr>
              ) : filteredProducts.map(product => (
                <tr key={product.id} style={{ transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td data-label="Produk" className="td-product">
                    <div className="product-cell">
                      <div className="product-img">
                        <img src={product.image_url} alt={product.name} />
                      </div>
                      <div className="product-info-col">
                        <span className="product-title">{product.name}</span>
                        <div className="mobile-meta">
                          <span className="mobile-cat">{product.category}</span>
                          <span className="mobile-price">
                            {product.original_price && <span style={{ textDecoration: 'line-through', color: '#a1a1aa', fontSize: '0.85em', marginRight: '0.5rem', fontWeight: 400 }}>{product.original_price}</span>}
                            {product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Kategori" className="td-category" style={{ color: 'var(--text-secondary)' }}>{product.category}</td>
                  <td data-label="Harga" className="td-price" style={{ color: 'var(--text-secondary)' }}>
                    {product.original_price && <span style={{ textDecoration: 'line-through', color: '#a1a1aa', fontSize: '0.85em', marginRight: '0.5rem' }}>{product.original_price}</span>}
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{product.price}</span>
                  </td>
                  <td data-label="Aksi" className="td-action" style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn-edit-product" onClick={() => openEditModal(product)}>
                        <Edit2 size={16} className="btn-icon" />
                        <span className="btn-text">Edit</span>
                      </button>
                      <button className="btn-delete-product" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={16} className="btn-icon" />
                        <span className="btn-text">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)' }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ background: '#ffffff', borderRadius: '24px', width: '90%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#f5f5f7', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100, color: 'var(--text-primary)', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.background = '#ffe0e0'; e.currentTarget.style.color = 'red'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#f5f5f7'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              >
                <span style={{ fontSize: '28px', fontWeight: 400, lineHeight: 1, marginTop: '-4px' }}>&times;</span>
              </button>

              <div className="modal-header" style={{ display: 'flex', alignItems: 'center', padding: '2rem', borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', margin: 0, color: 'var(--text-primary)', paddingRight: '2rem' }}>
                  {formData.id ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h2>
              </div>

              <div className="modal-body" data-lenis-prevent="true" style={{ padding: '2rem', overflowY: 'auto', flex: 1, overscrollBehavior: 'contain' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>

                  <div className="form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Nama Produk</label>
                      <input required name="name" value={formData.name} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Kategori</label>
                      <select required name="category" value={formData.category} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem', background: '#fff' }}>
                        <option value="" disabled>Pilih Kategori</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Harga Jual (cth: Rp 499.000)</label>
                      <input required name="price" value={formData.price} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Harga Asli (opsional)</label>
                      <input name="original_price" value={formData.original_price} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Gambar Utama</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {formData.image_url && !mainImageFile && (
                        <img src={formData.image_url} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      )}
                      <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f5f5f7', padding: '12px 16px', borderRadius: '12px', border: '1px dashed #ccc', flex: 1, minWidth: '200px' }}>
                        <Upload size={18} flexShrink={0} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {mainImageFile ? mainImageFile.name : (formData.image_url ? 'Ganti Gambar Utama' : 'Pilih Gambar Utama...')}
                        </span>
                        <input type="file" accept="image/*" onChange={handleMainImageChange} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Gambar Galeri (Bisa pilih lebih dari satu)</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {formData.images_array && formData.images_array.length > 0 && galleryFiles.length === 0 && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formData.images_array.length} gambar tersimpan</div>
                      )}
                      <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f5f5f7', padding: '12px 16px', borderRadius: '12px', border: '1px dashed #ccc', flex: 1, minWidth: '200px' }}>
                        <Upload size={18} flexShrink={0} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {galleryFiles.length > 0 ? `${galleryFiles.length} file dipilih` : 'Pilih Gambar Galeri...'}
                        </span>
                        <input type="file" multiple accept="image/*" onChange={handleGalleryChange} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Tag (opsional)</label>
                      <input name="tag" placeholder="cth: Best Seller" value={formData.tag} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dimensi</label>
                      <input required name="dimensions" placeholder="cth: 30 x 15 x 40 cm" value={formData.dimensions} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Deskripsi Singkat</label>
                    <textarea required name="description" value={formData.description} onChange={(e) => { handleInputChange(e); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} rows={3} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem', resize: 'none', overflow: 'hidden', minHeight: '80px' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Deskripsi Lengkap</label>
                    <textarea required name="long_description" value={formData.long_description} onChange={(e) => { handleInputChange(e); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} rows={5} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem', resize: 'none', overflow: 'hidden', minHeight: '120px' }} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      background: 'var(--text-primary)', color: 'var(--bg-color)',
                      padding: '16px', borderRadius: '12px', border: 'none',
                      fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    <Save size={20} /> {isSubmitting ? 'Menyimpan' : 'Simpan Produk'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirm Dialog */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
              onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ background: '#ffffff', borderRadius: '24px', width: '90%', maxWidth: '400px', position: 'relative', padding: '2.5rem', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}
            >
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: 'var(--text-primary)' }}>{confirmDialog.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>{confirmDialog.message}</p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#f5f5f7', border: 'none', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#e5e5ea'} onMouseOut={e => e.currentTarget.style.background = '#f5f5f7'}
                >
                  Batal
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'red', border: 'none', fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,0,0,0.2)', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#cc0000'} onMouseOut={e => e.currentTarget.style.background = 'red'}
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
