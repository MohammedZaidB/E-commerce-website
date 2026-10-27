import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import PdfViewerModal from '../components/PdfViewerModal';
import ImageLightBoxModal from '../components/ImageLightBoxModal';
import { PRODUCTS, CATEGORIES, ABAYA_PDF_URL } from '../data/productsData';
import { extractAllAbayaImages } from '../utils/abayaPdfLoader';

export default function Products({ onOpenQuoteModal }) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [abayaExtractedImages, setAbayaExtractedImages] = useState({});
  const [extractedPagesCount, setExtractedPagesCount] = useState(0);

  // Modals for Real Image Zoom & Abaya PDF Viewer
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [zoomProduct, setZoomProduct] = useState(null);

  // Extract / load all 26 images from abaya.pdf progressively
  useEffect(() => {
    let isMounted = true;
    extractAllAbayaImages(ABAYA_PDF_URL, (pageNum, dataUrl) => {
      if (isMounted) {
        setAbayaExtractedImages((prev) => ({
          ...prev,
          [pageNum]: dataUrl
        }));
        setExtractedPagesCount((c) => Math.min(26, c + 1));
      }
    })
      .then((imgs) => {
        if (isMounted && imgs) {
          setAbayaExtractedImages((prev) => ({ ...prev, ...imgs }));
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Read URL query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category')?.toLowerCase();
    if (cat) {
      if (cat === 'leather' || cat === 'leather-items') setSelectedCategory('leather-items');
      else if (cat === 'abaya' || cat === 'abayas' || cat === 'abaya-collection') setSelectedCategory('abaya-collection');
      else if (cat === 'shirt' || cat === 'shirts') setSelectedCategory('shirts');
      else if (cat === 'pant' || cat === 'pants' || cat === 'paint' || cat === 'trousers') setSelectedCategory('pants');
      else if (cat === 'shoes' || cat === 'real-shoes') setSelectedCategory('real-shoes');
      else if (CATEGORIES.some(c => c.id === cat)) setSelectedCategory(cat);
    }
  }, [location.search]);

  // Filter products by category & search query + apply extracted Abaya photos
  const filteredProducts = useMemo(() => {
    return PRODUCTS.map((item) => {
      if (item.category === 'abaya-collection' && item.pdfPage) {
        const pageImg = abayaExtractedImages[item.pdfPage] || abayaExtractedImages[item.pdfPage - 1];
        if (pageImg) {
          return {
            ...item,
            image: pageImg,
            isFromAbayaPdf: true
          };
        }
      }
      return item;
    }).filter((item) => {
      let matchCat = false;
      if (selectedCategory === 'all') {
        matchCat = true;
      } else if (selectedCategory === 'leather-items') {
        // Includes all leather shoes, slippers, wallets, bags, belts and accessories
        matchCat = !!item.isRealFactoryPhoto || 
                   item.category === 'leather-shoes' || 
                   item.category === 'leather-slippers' || 
                   item.category === 'wallets' || 
                   item.category === 'bags' || 
                   item.category === 'belts' || 
                   item.category === 'other-leather-goods';
      } else if (selectedCategory === 'abaya-collection') {
        matchCat = item.category === 'abaya-collection';
      } else if (selectedCategory === 'shirts') {
        matchCat = item.category === 'shirts';
      } else if (selectedCategory === 'pants' || selectedCategory === 'paint') {
        matchCat = item.category === 'pants';
      } else if (selectedCategory === 'real-shoes') {
        matchCat = !!item.isRealFactoryPhoto;
      } else {
        matchCat = item.category === selectedCategory || (selectedCategory === 'leather-shoes' && item.isRealFactoryPhoto);
      }

      const matchSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.modelCode && item.modelCode.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, abayaExtractedImages]);

  const handleEnquire = (product) => {
    onOpenQuoteModal({
      productName: product.name,
      productCategory: product.categoryLabel,
      enquiryType: 'Wholesale',
      message: `Hello Classic Edge Atelier, we would like to enquire about bulk pricing, specifications, and sample feasibility for: ${product.name}.`
    });
  };

  const handleDownloadCatalogue = () => {
    const filename = `Classic_Edge_Atelier_Wholesale_Catalogue.html`;
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Classic Edge Atelier — Wholesale Catalogue</title>
        <style>
          body { font-family: -apple-system, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 26px; font-weight: 800; letter-spacing: 3px; color: #000; text-transform: uppercase; margin: 0; }
          .sub { font-size: 13px; color: #666; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
          .meta { background: #f7f5f0; border: 1px solid #e2ddd2; padding: 16px; border-radius: 4px; margin-bottom: 30px; font-size: 13px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          .table th { background: #1a1a1f; color: #C5A059; text-transform: uppercase; letter-spacing: 1px; }
          .contact-box { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; text-align: center; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">CLASSIC EDGE ATELIER</h1>
          <div class="sub">Leather Footwear • Bags • Accessories • Export Catalogue 2026</div>
        </div>
        <div class="meta">
          <strong>Target Markets:</strong> UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman<br>
          <strong>Country of Origin:</strong> India<br>
          <strong>WhatsApp Export Desk:</strong> +91 9443750820 | <strong>Email:</strong> classicedgeatelier@gmail.com
        </div>
        <h3>Export Carton Specifications & Packaging</h3>
        <table class="table">
          <thead>
            <tr><th>Item Code</th><th>Product Description</th><th>Carton Packaging</th><th>Terms</th></tr>
          </thead>
          <tbody>
            <tr><td>CEA-LS-101</td><td>Cap-Toe Oxford Brogue Shoes</td><td>12 Pairs / Carton</td><td>FOB/CIF on enquiry</td></tr>
            <tr><td>CEA-AS-201</td><td>Gulf Heritage Leather Slippers</td><td>24 Pairs / Carton</td><td>FOB/CIF on enquiry</td></tr>
            <tr><td>CEA-WL-301</td><td>Full-Grain Bifold Wallets</td><td>50 Units / Master Carton</td><td>FOB/CIF on enquiry</td></tr>
            <tr><td>CEA-BG-401</td><td>Executive Laptop Briefcases</td><td>6 Units / Carton</td><td>FOB/CIF on enquiry</td></tr>
            <tr><td>CEA-BL-501</td><td>Dress Belts (Solid Brass)</td><td>36 Units / Carton</td><td>FOB/CIF on enquiry</td></tr>
          </tbody>
        </table>
        <div class="contact-box">
          WhatsApp: +91 9443750820 • Email: classicedgeatelier@gmail.com
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="Product Catalogue & Real Stock Gallery | Classic Edge Atelier"
        description="Explore 31 authentic factory stock photos of handcrafted leather footwear, official Abaya PDF line sheet, bags, and luxury accessories."
      />

      {/* Page Header */}
      <section className="page-banner" style={{ background: 'linear-gradient(180deg, #16161a 0%, #0d0d0f 100%)', color: '#fff' }}>
        <div className="container text-center">
          <span className="eyebrow" style={{ color: 'var(--accent-gold, #d4a340)' }}>Direct Manufacturer & Exporter</span>
          <h1 className="page-banner-title">Authentic Product Catalogue</h1>
          <p className="page-banner-subtitle">
            Explore 31 real factory footwear styles and our complete Abaya wholesale line sheet from <strong>abaya.pdf</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              style={{
                background: selectedCategory === 'all' ? '#d4a340' : 'rgba(255, 255, 255, 0.1)',
                color: selectedCategory === 'all' ? '#0d0d0d' : '#f5e2b8',
                border: '1px solid rgba(212, 163, 64, 0.5)',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🌟 All Items</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('leather-items')}
              style={{
                background: selectedCategory === 'leather-items' ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
                color: selectedCategory === 'leather-items' ? '#000' : '#34d399',
                border: '1px solid #10b981',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>👞 Leather Items</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('abaya-collection')}
              style={{
                background: selectedCategory === 'abaya-collection' ? '#EA4335' : 'rgba(234, 67, 53, 0.15)',
                color: selectedCategory === 'abaya-collection' ? '#fff' : '#f87171',
                border: '1px solid #EA4335',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🧕 Abayas (26 Styles)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('shirts')}
              style={{
                background: selectedCategory === 'shirts' ? '#2563eb' : 'rgba(37, 99, 235, 0.15)',
                color: selectedCategory === 'shirts' ? '#fff' : '#93c5fd',
                border: '1px solid #2563eb',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>👔 Shirts</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('pants')}
              style={{
                background: selectedCategory === 'pants' ? '#7c3aed' : 'rgba(124, 58, 237, 0.15)',
                color: selectedCategory === 'pants' ? '#fff' : '#c4b5fd',
                border: '1px solid #7c3aed',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>👖 Pants & Trousers</span>
            </button>

            <button
              type="button"
              onClick={() => setPdfModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                color: '#0d0d0d',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(212, 163, 64, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>📄 View PDF (abaya.pdf)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="section-py" style={{ backgroundColor: '#faf9f6' }}>
        <div className="container">
          {/* ABAYA PDF SHOWCASE BANNER (Visible on all or when abaya selected) */}
          {(selectedCategory === 'all' || selectedCategory === 'abaya-collection') && (
            <div style={{
              background: 'linear-gradient(135deg, #1c1c20 0%, #141416 100%)',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '24px 28px',
              color: '#fff',
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    background: '#EA4335',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 800
                  }}>
                    PDF CATALOGUE (26 STYLES)
                  </span>
                  <span style={{ color: '#d4a340', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
                    ABAYA & ISLAMIC MODEST WEAR (abaya.pdf)
                  </span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', fontWeight: 700 }}>
                  Official Abaya Wholesale Line Sheet — All 26 Individual Styles
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa', lineHeight: 1.5 }}>
                  Explore all 26 separate Abaya designs extracted from <strong>abaya.pdf</strong>. Download or preview our comprehensive 28 MB Abaya catalogue featuring Dubai Nida fabrics, embroidered open-front kimonos, kaftans, and matching sheilas for Gulf export.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPdfModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #EA4335 0%, #b3261e 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.4)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>Preview PDF Online</span>
                </button>

                <a
                  href={ABAYA_PDF_URL}
                  download="Classic_Edge_Abaya_Catalogue.pdf"
                  style={{
                    background: '#222228',
                    color: '#e4e4e7',
                    border: '1px solid #444',
                    padding: '12px 18px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download PDF (28 MB)</span>
                </a>
              </div>
            </div>
          )}

          {/* LEATHER ITEMS SPOTLIGHT BANNER */}
          {selectedCategory === 'leather-items' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(212, 163, 64, 0.12) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '10px',
              padding: '16px 22px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>👞</span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#065f46' }}>
                    Authentic Leather Goods Collection — Footwear, Slippers, Wallets, Bags & Belts
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#4b5563' }}>
                    Handcrafted in Ambur, Tamil Nadu using export-grade full-grain leathers and artisan sole construction.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#10b981',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                100% Genuine Leather
              </span>
            </div>
          )}

          {/* SHIRTS SPOTLIGHT BANNER */}
          {selectedCategory === 'shirts' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.12) 100%)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              borderRadius: '10px',
              padding: '16px 22px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>👔</span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#1d4ed8' }}>
                    Export Shirting Collection — Executive Formal & Casual Resort Shirts
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#4b5563' }}>
                    100% Giza Egyptian cotton dress shirts, European pure linen resort shirts, and double-mercerised polos.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#2563eb',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                Export Garments Desk
              </span>
            </div>
          )}

          {/* PANTS SPOTLIGHT BANNER */}
          {selectedCategory === 'pants' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: '10px',
              padding: '16px 22px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>👖</span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#6d28d9' }}>
                    Pants & Trousers Collection — Executive Wool, Chinos, Linen & Denim
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#4b5563' }}>
                    Single-pleated formal trousers, stretch cotton chinos, drawstring summer linen pants, and heavy raw denim.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#7c3aed',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                Custom Tailoring Feasible
              </span>
            </div>
          )}

          {/* REAL FOOTWEAR SPOTLIGHT BANNER */}
          {(selectedCategory === 'all' || selectedCategory === 'real-shoes' || selectedCategory === 'leather-shoes') && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(212, 163, 64, 0.08) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '14px 20px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>👞</span>
                <div>
                  <strong style={{ fontSize: '13.5px', color: '#065f46' }}>
                    Authentic Factory Floor Footwear Stock (31 Real Photos)
                  </strong>
                  <div style={{ fontSize: '12px', color: '#4b5563' }}>
                    Each photo is taken directly from our production warehouse. Click on any card image to view in high-resolution zoom.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#10b981',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                Verified Manufacturer Stock
              </span>
            </div>
          )}

          {/* Filter Bar */}
          <div className="products-filter-bar">
            <div className="categories-pill-list" role="tablist" aria-label="Product categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    fontWeight: (cat.id === 'real-shoes' || cat.id === 'abaya-collection') ? 700 : 500,
                    borderColor: cat.id === 'real-shoes' ? '#10b981' : cat.id === 'abaya-collection' ? '#EA4335' : undefined
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="products-search-box">
              <svg className="products-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="products-search-input"
                placeholder="Search shoes, abayas, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search product catalogue"
              />
              <button 
                type="button" 
                className="cta"
                onClick={handleDownloadCatalogue}
                style={{ marginLeft: 12, padding: '8px 18px', fontSize: '0.85rem' }}
              >
                📥 Line Sheet
              </button>
            </div>
          </div>

          {/* Results count & status indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Showing <strong>{filteredProducts.length}</strong> items in 
              <strong> {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'All'}</strong>
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-tan)', fontWeight: 600 }}>
              • All products ready for direct unit purchase or bulk export packaging
            </span>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEnquire={handleEnquire}
                  onZoom={(prod) => setZoomProduct(prod)}
                  onViewPdf={() => setPdfModalOpen(true)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: 12, border: '1px dashed var(--color-cream-border)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-tan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px auto' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                No matching products found
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: 20 }}>
                Try adjusting your search criteria or explore our 31 real factory shoes and Abaya PDF catalog.
              </p>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Consultation Note */}
          <div style={{ marginTop: 60, padding: 32, background: 'var(--color-cream-card)', border: '1px solid var(--color-cream-border)', borderRadius: 12, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: 10, color: 'var(--color-primary-dark)' }}>
              Require Custom Sizes, Private Label Branding or Abaya Sizing Runs?
            </h3>
            <p style={{ maxWidth: 700, margin: '0 auto 20px auto', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              Our direct manufacturing capacity covers custom shoe lasting, private-label box packaging, sole branding, and bespoke Abaya embroidery specs for commercial buyers across UAE, Saudi Arabia, Qatar, and Gulf region.
            </p>
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => onOpenQuoteModal({ enquiryType: 'Customisation' })}
            >
              <span>Submit Custom Manufacturing Specification</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal for abaya.pdf */}
      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={ABAYA_PDF_URL}
        title="Official Abaya Wholesale Catalogue (abaya.pdf)"
      />

      {/* Image Lightbox Modal for Real Factory Shoe Photos */}
      <ImageLightBoxModal
        isOpen={!!zoomProduct}
        onClose={() => setZoomProduct(null)}
        image={zoomProduct?.image}
        title={zoomProduct?.name}
        specs={zoomProduct?.specs}
        price={zoomProduct?.price}
      />
    </>
  );
}
