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
          <strong>WhatsApp Export Desk:</strong> +91 9443750820 | <strong>Email:</strong> classicedgeatlier@gmail.com
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
          WhatsApp: +91 9443750820 • Email: classicedgeatlier@gmail.com
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
        title="Leather Bazaar — Premium Leather Shoes, Wallets, Slippers & Accessories"
        description="Timeless Quality, Made for You. Premium leather shoes, wallets, slippers, and duffle bags crafted with care, built for everyday elegance."
      />

      {/* 1. HERO SECTION MATCHING MOCKUP */}
      <section className="home-hero-section">
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative' }}>
          {/* Left Text Content */}
          <div style={{ maxWidth: '540px' }}>
            <div style={{
              fontSize: '11px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#d4af37',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              PREMIUM LEATHER PRODUCTS
            </div>

            <h1 className="home-hero-title">
              Timeless Quality,<br />Made for You
            </h1>

            <p style={{
              fontSize: '15px',
              color: '#b8b4ab',
              lineHeight: 1.6,
              margin: '0 0 32px',
              maxWidth: '480px'
            }}>
              Classic Edge Atelier brings you premium leather shoes, wallets, slippers and more &mdash; crafted with care, built for everyday elegance.
            </p>

            <div>
              <Link 
                to="/products" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#8C4E26',
                  color: '#ffffff',
                  padding: '13px 30px',
                  borderRadius: '3px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(140, 78, 38, 0.4)',
                  transition: 'background 0.2s ease, transform 0.2s ease'
                }}
              >
                <span>SHOP NOW</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Script Tagline: "Real Leather Real Value" */}
          <div className="hero-script-tagline">
            <div style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '44px',
              color: '#ffffff',
              transform: 'rotate(-4deg)',
              letterSpacing: '1.5px',
              textShadow: '0 2px 14px rgba(0,0,0,0.8)',
              lineHeight: 1.1
            }}>
              Real Leather<br />
              <span style={{ fontSize: '40px', paddingRight: '12px' }}>Real Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "SHOP BY CATEGORY" SECTION */}
      <section style={{ backgroundColor: '#FAF7F2', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 28px',
            textAlign: 'left'
          }}>
            Shop by Category
          </h2>

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
                alt="Shoes" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Shoes</div>
                <Link 
                  to="/products?category=shoes" 
                  style={{ fontSize: '12px', color: '#555', textDecoration: 'none', fontWeight: 600 }}
                >
                  Shop Now &rarr;
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
                alt="Wallets" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Wallets</div>
                <Link 
                  to="/products?category=wallets" 
                  style={{ fontSize: '12px', color: '#555', textDecoration: 'none', fontWeight: 600 }}
                >
                  Shop Now &rarr;
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
                alt="Slippers" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Slippers</div>
                <Link 
                  to="/products?category=slippers" 
                  style={{ fontSize: '12px', color: '#555', textDecoration: 'none', fontWeight: 600 }}
                >
                  Shop Now &rarr;
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
                alt="Other Leather Products" 
                style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px 14px 20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Other Leather Products</div>
                <Link 
                  to="/products?category=bags" 
                  style={{ fontSize: '12px', color: '#555', textDecoration: 'none', fontWeight: 600 }}
                >
                  Shop Now &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "CRAFTED WITH PASSION, DESIGNED FOR YOU" SPLIT SECTION */}
      <section style={{ backgroundColor: '#FAF7F2', padding: '10px 20px 60px' }}>
        <div className="split-feature-container">
          {/* Column 1: Macro Photo of Natural Leather Grain Hides */}
          <div style={{ height: '100%' }}>
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85" 
              alt="Natural Grain Leather Hides" 
              style={{ width: '100%', height: '100%', minHeight: '380px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Column 2: Dark Box with Statement Text */}
          <div style={{
            background: '#141416',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#a1a1aa',
              fontWeight: 700,
              marginBottom: '10px'
            }}>
              ABOUT CLASSIC EDGE ATELIER
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 0 16px'
            }}>
              Crafted with Passion,<br />Designed for You
            </h2>
            <p style={{
              fontSize: '13.5px',
              color: '#b0aca3',
              lineHeight: 1.7,
              margin: '0 0 24px'
            }}>
              At Classic Edge Atelier, we manufacture high-quality leather products in Ambur, Tamil Nadu for individuals and businesses worldwide. Whether you're looking for bulk orders, custom branding, or unique designs, we're here to bring your vision to life.
            </p>
            <div>
              <Link 
                to="/about" 
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#ffffff',
                  padding: '9px 24px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>

          {/* Column 3: 2x2 Feature Grid on Light Cream Container */}
          <div className="split-features-subgrid">
            {/* Feature 1: Premium Quality */}
            <div style={{ padding: '36px 28px', borderRight: '1px solid #EBE6DC', borderBottom: '1px solid #EBE6DC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Award size={26} strokeWidth={1.4} color="#1a1a1a" style={{ marginBottom: '12px' }} />
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 5px'
              }}>
                Premium Quality
              </h4>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.4 }}>
                Only the finest leather and materials
              </p>
            </div>

            {/* Feature 2: Custom Branding */}
            <div style={{ padding: '36px 28px', borderBottom: '1px solid #EBE6DC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <PenTool size={26} strokeWidth={1.4} color="#1a1a1a" style={{ marginBottom: '12px' }} />
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 5px'
              }}>
                Custom Branding
              </h4>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.4 }}>
                Your logo, your style
              </p>
            </div>

            {/* Feature 3: Bulk Orders */}
            <div style={{ padding: '36px 28px', borderRight: '1px solid #EBE6DC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Package size={26} strokeWidth={1.4} color="#1a1a1a" style={{ marginBottom: '12px' }} />
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 5px'
              }}>
                Bulk Orders
              </h4>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.4 }}>
                For businesses & retailers
              </p>
            </div>

            {/* Feature 4: Reliable Delivery */}
            <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Truck size={26} strokeWidth={1.4} color="#1a1a1a" style={{ marginBottom: '12px' }} />
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: '0 0 5px'
              }}>
                Reliable Delivery
              </h4>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.4 }}>
                On time, every time
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
