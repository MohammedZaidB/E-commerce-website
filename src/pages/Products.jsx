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
      <section className="page-banner" style={{ background: '#F8F5EF', borderBottom: '1px solid #E5DED3', padding: '60px 20px', color: '#191919' }}>
        <div className="container text-center" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            ATELIER CATALOGUE • EXPORT READY
          </div>
          <h1 
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 700,
              color: '#191919',
              margin: '0 0 14px'
            }}
          >
            Collections &amp; Portfolio
          </h1>
          <p style={{ fontSize: '15px', color: '#77716A', maxWidth: '640px', margin: '0 auto 30px', lineHeight: 1.6 }}>
            Explore 31 authentic factory footwear styles, our complete 26-design Abaya wholesale line sheet from <strong>abaya.pdf</strong>, and handcrafted leather accessories.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'leather-items', label: 'Leather Footwear & Goods' },
              { id: 'abaya-collection', label: 'Abayas (26 Styles)' },
              { id: 'shirts', label: 'Shirts' },
              { id: 'pants', label: 'Pants & Trousers' },
              { id: 'wallets', label: 'Wallets' },
              { id: 'bags', label: 'Bags & Accessories' }
            ].map(tab => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  style={{
                    background: isActive ? '#191919' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#191919',
                    border: isActive ? '1px solid #191919' : '1px solid #E5DED3',
                    padding: '8px 18px',
                    borderRadius: '24px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(25, 25, 25, 0.12)' : 'none'
                  }}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPdfModalOpen(true)}
              className="btn-gold"
              style={{
                padding: '8px 18px',
                borderRadius: '24px',
                fontSize: '12.5px',
                fontWeight: 600
              }}
            >
              <span>📄 View abaya.pdf</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="section-py" style={{ backgroundColor: '#F8F5EF', padding: '60px 20px 90px' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* ABAYA PDF SHOWCASE BANNER (Visible on all or when abaya selected) */}
          {(selectedCategory === 'all' || selectedCategory === 'abaya-collection') && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '8px',
              padding: '28px 32px',
              color: '#191919',
              marginBottom: '36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 4px 16px rgba(25, 25, 25, 0.04)'
            }}>
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    background: '#B89B62',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.8px'
                  }}>
                    PDF CATALOGUE (26 STYLES)
                  </span>
                  <span style={{ color: '#77716A', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.5px' }}>
                    ABAYA &amp; ISLAMIC MODEST WEAR (abaya.pdf)
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                  Official Abaya Wholesale Line Sheet — All 26 Individual Styles
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#77716A', lineHeight: 1.6 }}>
                  Explore all 26 separate Abaya designs extracted directly from <strong>abaya.pdf</strong>. Preview our comprehensive 28 MB Abaya catalogue featuring Dubai Nida fabrics, embroidered open-front kimonos, kaftans, and matching sheilas for Gulf export.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setPdfModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '12.5px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>Preview PDF Online</span>
                </button>

                <a
                  href={ABAYA_PDF_URL}
                  download="Classic_Edge_Abaya_Catalogue.pdf"
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '12.5px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '8px',
              padding: '20px 26px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(25, 25, 25, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  👞
                </div>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#191919' }}>
                    Authentic Leather Goods Collection — Footwear, Slippers, Wallets, Bags &amp; Belts
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#77716A' }}>
                    Handcrafted in Ambur, Tamil Nadu using export-grade full-grain leathers and artisan sole construction.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#B89B62',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '2px',
                letterSpacing: '0.5px'
              }}>
                EXPORT READY
              </span>
            </div>
          )}

          {/* SHIRTS SPOTLIGHT BANNER */}
          {selectedCategory === 'shirts' && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '8px',
              padding: '20px 26px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(25, 25, 25, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>👔</span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#191919' }}>
                    Export Shirting Collection — Executive Formal &amp; Casual Resort Shirts
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#77716A' }}>
                    100% Giza Egyptian cotton dress shirts, European pure linen resort shirts, and double-mercerised polos.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#B89B62',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '2px',
                letterSpacing: '0.5px'
              }}>
                EXPORT GARMENTS DESK
              </span>
            </div>
          )}

          {/* PANTS SPOTLIGHT BANNER */}
          {selectedCategory === 'pants' && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '8px',
              padding: '20px 26px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(25, 25, 25, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>👖</span>
                <div>
                  <strong style={{ fontSize: '14.5px', color: '#191919' }}>
                    Pants &amp; Trousers Collection — Executive Wool, Chinos, Linen &amp; Denim
                  </strong>
                  <div style={{ fontSize: '12.5px', color: '#77716A' }}>
                    Single-pleated formal trousers, stretch cotton chinos, drawstring summer linen pants, and heavy raw denim.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#B89B62',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '2px',
                letterSpacing: '0.5px'
              }}>
                CUSTOM TAILORING FEASIBLE
              </span>
            </div>
          )}

          {/* REAL FOOTWEAR SPOTLIGHT BANNER */}
          {(selectedCategory === 'all' || selectedCategory === 'real-shoes' || selectedCategory === 'leather-shoes') && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '8px',
              padding: '18px 24px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(25, 25, 25, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  👞
                </div>
                <div>
                  <strong style={{ fontSize: '14px', color: '#191919' }}>
                    Authentic Factory Floor Footwear Stock (31 Real Photos)
                  </strong>
                  <div style={{ fontSize: '12px', color: '#77716A' }}>
                    Each photo is taken directly from our production warehouse. Click on any card image to view in high-resolution zoom.
                  </div>
                </div>
              </div>
              <span style={{
                background: '#191919',
                border: '1px solid #B89B62',
                color: '#F8F5EF',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '2px',
                letterSpacing: '0.5px'
              }}>
                VERIFIED MAKER STOCK
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
