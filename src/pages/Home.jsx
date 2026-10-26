import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../data/marketsData';
import { useCart } from '../context/CartContext';
import { REAL_SHOE_IMAGES, ABAYA_PDF_URL } from '../data/realCatalogData';

import { Award, PenTool, Package, Truck } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: 'feat-1',
    name: 'Classic Leather Shoes',
    price: '₹ 3,499',
    priceNum: 3499,
    category: 'Leather Shoes',
    image: '/mockup/shoes.jpg'
  },
  {
    id: 'feat-2',
    name: 'Premium Leather Wallet',
    price: '₹ 1,299',
    priceNum: 1299,
    category: 'Wallets',
    image: '/mockup/wallets.jpg'
  },
  {
    id: 'feat-3',
    name: 'Leather Slippers',
    price: '₹ 999',
    priceNum: 999,
    category: 'Arabic Slippers',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'feat-4',
    name: 'Leather Duffle Bag',
    price: '₹ 4,999',
    priceNum: 4999,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Home({ onOpenQuoteModal }) {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});

  const handleAddFeaturedToCart = (prod) => {
    addToCart(prod, 1);
    setAddedIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  const handleDownloadCatalogue = () => {
    const filename = `Leather_Bazaar_Wholesale_Catalogue.html`;
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Leather Bazaar — Wholesale Catalogue</title>
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
          <h1 class="title">LEATHER BAZAAR</h1>
          <div class="sub">Leather Footwear • Bags • Accessories • Export Catalogue 2026</div>
        </div>
        <div class="meta">
          <strong>Target Markets:</strong> UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman<br>
          <strong>Country of Origin:</strong> India<br>
          <strong>WhatsApp Export Desk:</strong> +91 9443750820 | <strong>Email:</strong> classicedgeatelier@gmail.com
        </div>
        <h3>Export Master Carton Breakdown</h3>
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
        title="Premium Leather Products | Wholesale & Private Label | Classic Edge Atelier"
        description="Classic Edge Atelier is an India-based supplier of leather footwear, slippers, bags, wallets, belts, and bespoke leather goods working with partner manufacturing factories. Dedicated to wholesale and private-label buyers across UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, and worldwide."
      />

      {/* 1. HERO SECTION WITH REQUESTED HEADLINE AND PROMINENT BUTTONS */}
      <section className="home-hero-section">
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Left Text Content */}
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(212, 163, 64, 0.12)',
              border: '1px solid rgba(212, 163, 64, 0.35)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              color: '#f5e2b8',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4a340' }}></span>
              <span>B2B Leather Export Supplier • India</span>
            </div>

            <h1 className="home-hero-title" style={{ fontSize: 'clamp(28px, 4.8vw, 48px)', lineHeight: 1.15, fontWeight: 800 }}>
              Premium Leather Products | Wholesale &amp; Private Label
            </h1>

            <p style={{
              fontSize: '15px',
              color: '#d4d0c7',
              lineHeight: 1.65,
              margin: '0 0 32px',
              maxWidth: '560px'
            }}>
              Classic Edge Atelier supplies handcrafted leather footwear, artisanal slippers, executive bags, wallets, belts, and bespoke leather goods working with partner manufacturing factories in India. Serving international importers, wholesalers, retail distributors, and private-label brands across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link 
                to="/products" 
                className="btn-primary"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  padding: '14px 26px',
                  textDecoration: 'none'
                }}
              >
                <span>Explore Collection</span>
                <span>&rarr;</span>
              </Link>

              <button 
                type="button" 
                onClick={() => onOpenQuoteModal({ enquiryType: 'Wholesale' })}
                className="btn-secondary"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  padding: '13px 24px',
                  cursor: 'pointer'
                }}
              >
                <span>Request Wholesale Quote</span>
              </button>
            </div>
          </div>

          {/* Right Script Tagline / Monogram Badge */}
          <div className="hero-script-tagline">
            <div style={{
              background: 'rgba(20, 20, 24, 0.88)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              borderRadius: '12px',
              padding: '24px 28px',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              maxWidth: '300px'
            }}>
              <div style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '28px',
                color: '#f5e2b8',
                fontWeight: 800,
                letterSpacing: '3px'
              }}>
                CEA
              </div>
              <div style={{
                fontSize: '11px',
                color: '#d4a340',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginTop: '4px'
              }}>
                Classic Edge Atelier
              </div>
              <div style={{
                fontSize: '11.5px',
                color: '#9e9a91',
                lineHeight: 1.5,
                marginTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '8px'
              }}>
                Supplying Importers across UAE, KSA, Qatar, Kuwait, Oman &amp; Bahrain
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "SHOP BY CATEGORY" SECTION */}
      <section style={{ backgroundColor: '#FAF7F2', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '1.8px', color: '#c5a059', fontWeight: 700, marginBottom: '6px' }}>
                Artisanal Product Range
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>
                Shop by Category
              </h2>
            </div>
            <Link to="/products" style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}>
              View All Products &rarr;
            </Link>
          </div>

          <div className="category-grid-responsive">
            {/* Category 1: Shoes */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80" 
                alt="Ladies' and Men's Leather Shoes" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Footwear &amp; Shoes</div>
                <Link 
                  to="/products?category=shoes" 
                  style={{ fontSize: '12px', color: '#8c4e26', textDecoration: 'none', fontWeight: 700 }}
                >
                  Explore Footwear &rarr;
                </Link>
              </div>
            </div>

            {/* Category 2: Wallets */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" 
                alt="Leather Wallets & Cardholders" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Leather Wallets</div>
                <Link 
                  to="/products?category=wallets" 
                  style={{ fontSize: '12px', color: '#8c4e26', textDecoration: 'none', fontWeight: 700 }}
                >
                  Explore Wallets &rarr;
                </Link>
              </div>
            </div>

            {/* Category 3: Slippers */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" 
                alt="Leather Slippers & Arabic Slides" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Leather Slippers</div>
                <Link 
                  to="/products?category=slippers" 
                  style={{ fontSize: '12px', color: '#8c4e26', textDecoration: 'none', fontWeight: 700 }}
                >
                  Explore Slippers &rarr;
                </Link>
              </div>
            </div>

            {/* Category 4: Other Leather Products */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" 
                alt="Bags, Belts & Leather Accessories" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Bags, Belts &amp; Goods</div>
                <Link 
                  to="/products?category=bags" 
                  style={{ fontSize: '12px', color: '#8c4e26', textDecoration: 'none', fontWeight: 700 }}
                >
                  Explore Accessories &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED WHOLESALE & PRIVATE-LABEL SECTION */}
      <section style={{ backgroundColor: '#ffffff', padding: '70px 20px', borderTop: '1px solid #ebe7df', borderBottom: '1px solid #ebe7df' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #141417 0%, #1c1c22 100%)',
            border: '1.5px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '16px',
            padding: '48px 36px',
            color: '#ffffff',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)'
          }}>
            <div style={{ maxWidth: '900px' }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(212, 163, 64, 0.15)',
                border: '1px solid rgba(212, 163, 64, 0.35)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#f5e2b8',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                B2B Sourcing &amp; Contract Manufacturing
              </span>

              <h2 style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 16px',
                lineHeight: 1.2
              }}>
                Wholesale &amp; Private-Label Manufacturing
              </h2>

              <p style={{
                fontSize: '14.5px',
                color: '#d4d0c7',
                lineHeight: 1.7,
                margin: '0 0 28px'
              }}>
                Classic Edge Atelier serves international commercial buyers as a specialized leather goods supplier working with partner manufacturing factories in India. We coordinate production schedules, material sourcing, and private-label requirements—enabling importers and retail brands in the GCC and worldwide to source tailored leather collections with complete confidence.
              </p>

              {/* 3 Key Pillars of Wholesale & Private Label */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f5e2b8', marginBottom: '6px' }}>
                    1. Bulk Order Supply
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#b8b4ab', margin: 0, lineHeight: 1.5 }}>
                    Supplying structured wholesale quantities for department stores, retail chains, and trade distribution networks with export master carton packaging.
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f5e2b8', marginBottom: '6px' }}>
                    2. Custom Branding Options
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#b8b4ab', margin: 0, lineHeight: 1.5 }}>
                    Logo debossing, sole stamping, custom insole branding, metal hardware finishing, and custom packaging tailored to your brand identity.
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f5e2b8', marginBottom: '6px' }}>
                    3. Partner Factory Coordination
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#b8b4ab', margin: 0, lineHeight: 1.5 }}>
                    We oversee sample feasibility, production milestones, and pre-shipment quality standards with vetted Indian manufacturing workshops.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  onClick={() => onOpenQuoteModal({ enquiryType: 'Wholesale' })}
                  className="btn-primary"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <span>Request Wholesale Quotation</span>
                </button>

                <Link 
                  to="/private-label" 
                  className="btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Explore Private Label Process &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHY CHOOSE CLASSIC EDGE ATELIER" SECTION */}
      <section style={{ backgroundColor: '#FAF7F2', padding: '70px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#c5a059', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              Built for International Trade
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(26px, 4.5vw, 36px)',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: '0 0 14px'
            }}>
              Why Choose Classic Edge Atelier
            </h2>
            <p style={{ fontSize: '14.5px', color: '#666', lineHeight: 1.6, margin: 0 }}>
              We bridge traditional Indian leather craftsmanship with professional, transparent international trade practices tailored for buyers across the GCC and global markets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {/* Pillar 1: Product Quality */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '12px',
              padding: '32px 26px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'rgba(212, 163, 64, 0.12)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                color: '#8c4e26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                <Award size={26} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '17px', color: '#1a1a1a', fontWeight: 700, margin: '0 0 10px' }}>
                Product Quality &amp; Inspection
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Every footwear and leather goods style is developed with carefully selected full-grain and top-grain leathers, durable outsoles, and thorough pre-shipment quality checks.
              </p>
            </div>

            {/* Pillar 2: Responsive Communication */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '12px',
              padding: '32px 26px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'rgba(212, 163, 64, 0.12)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                color: '#8c4e26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                <PenTool size={24} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '17px', color: '#1a1a1a', fontWeight: 700, margin: '0 0 10px' }}>
                Responsive Communication
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Direct and professional dialogue with our export desk through official email (classicedgeatelier@gmail.com) and WhatsApp (+91 9443750820) for rapid quotation evaluations.
              </p>
            </div>

            {/* Pillar 3: Flexible Sourcing */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '12px',
              padding: '32px 26px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'rgba(212, 163, 64, 0.12)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                color: '#8c4e26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                <Package size={24} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '17px', color: '#1a1a1a', fontWeight: 700, margin: '0 0 10px' }}>
                Flexible Sourcing &amp; MOQs
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Scalable production planning with partner factories allows open discussion on minimum order quantities, trial batches, and custom packaging standards.
              </p>
            </div>

            {/* Pillar 4: GCC & International Focus */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ebe7df',
              borderRadius: '12px',
              padding: '32px 26px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'rgba(212, 163, 64, 0.12)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                color: '#8c4e26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                <Truck size={24} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '17px', color: '#1a1a1a', fontWeight: 700, margin: '0 0 10px' }}>
                Target GCC Market Alignment
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Familiarity with regional preferences across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain, including traditional slides and formal dress footwear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "FEATURED PRODUCTS" SECTION */}
      <section style={{ backgroundColor: '#FAF7F2', padding: '10px 20px 70px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0
            }}>
              Featured Products
            </h2>
            <Link 
              to="/products" 
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#1a1a1a',
                textDecoration: 'none'
              }}
            >
              View All &rarr;
            </Link>
          </div>

          {/* 4 Products Grid */}
          <div className="featured-grid-responsive">
            {FEATURED_PRODUCTS.map((prod) => (
              <div 
                key={prod.id} 
                style={{
                  background: '#ffffff',
                  border: '1px solid #ebe7df',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  style={{ width: '100%', height: '190px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  padding: '16px 18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    marginBottom: '4px'
                  }}>
                    {prod.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '16px'
                  }}>
                    {prod.price}
                  </div>

                  {/* Solid Black "Add to Cart" Button matching Mockup */}
                  <button 
                    type="button" 
                    onClick={() => handleAddFeaturedToCart(prod)}
                    style={{
                      width: '100%',
                      background: addedIds[prod.id] ? '#10b981' : '#0f0f11',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '11px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: 'auto',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {addedIds[prod.id] ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Wholesale Catalogue Action Bar */}
          <div className="catalogue-action-bar">
            <div>
              <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '16px', color: '#f5e2b8', fontWeight: 700 }}>
                Wholesale Export Line Sheet & Abaya Catalogue
              </div>
              <div style={{ fontSize: '13px', color: '#a6a29a', marginTop: '4px' }}>
                Download our complete 2026 export carton specifications & 28 MB Abaya Line Sheet.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a 
                href={ABAYA_PDF_URL} 
                download="Leather_Bazaar_Abaya_Catalogue.pdf" 
                style={{
                  background: '#EA4335',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>📄 Download Abaya PDF (28 MB)</span>
              </a>
              <button 
                type="button" 
                onClick={handleDownloadCatalogue}
                style={{
                  background: '#8C4E26',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📥 Download Footwear Specs
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
