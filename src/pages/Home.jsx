import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CONTACT_INFO } from '../data/marketsData';
import { useCart } from '../context/CartContext';
import { REAL_SHOE_IMAGES, ABAYA_PDF_URL } from '../data/realCatalogData';
import { 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Download, 
  Check, 
  Layers, 
  Clock, 
  Mail, 
  ChevronRight 
} from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: 'feat-1',
    name: 'Executive Cap-Toe Formal Oxford',
    price: '₹ 3,499',
    priceNum: 3499,
    category: 'Leather Footwear',
    subType: 'Handcrafted Oxford',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-RSH-03'
  },
  {
    id: 'feat-2',
    name: 'Belted A-Line Abaya',
    price: '₹ 1,600',
    priceNum: 1600,
    category: 'Abaya Collection',
    subType: 'Luxury Dubai Abayas',
    image: 'https://images.unsplash.com/photo-1585728748178-f742f56d4a71?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-ABY-001'
  },
  {
    id: 'feat-3',
    name: 'Traditional Hand-Stitched Leather Slipper',
    price: '₹ 1,499',
    priceNum: 1499,
    category: 'Leather Slippers',
    subType: 'Gulf Heritage Slide',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-RSH-06'
  },
  {
    id: 'feat-4',
    name: 'Heritage Full-Grain Leather Duffle Bag',
    price: '₹ 4,999',
    priceNum: 4999,
    category: 'Leather Bags',
    subType: 'Weekend Duffle',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-BAG-01'
  }
];

const FEATURED_COLLECTIONS = [
  {
    title: 'Leather Footwear',
    subtitle: '31 Authentic Factory Shoes',
    description: 'Blake-welted dress brogues, executive Oxfords, casual drivers, and heavy lug derbys.',
    link: '/products?category=shoes',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    tag: 'FACTORY DIRECT'
  },
  {
    title: 'Abaya & Modest Wear',
    subtitle: '26 Line Sheet Designs',
    description: 'Dubai original Nida fabrics, embroidered open kimonos, kaftans, and lightweight sheilas.',
    link: '/products?category=abaya-collection',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    tag: 'abaya.pdf CATALOGUE'
  },
  {
    title: 'Bags & Accessories',
    subtitle: 'Full-Grain Artisan Goods',
    description: 'Executive briefcases, weekend duffles, solid brass dress belts, and RFID bifold wallets.',
    link: '/products?category=bags',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    tag: 'HAND FINISHED'
  },
  {
    title: 'Arabian Leather Slides',
    subtitle: 'Regional Gulf Preference',
    description: 'Ergonomic slip-on leather footwear engineered with arch-contour footbeds for daily ease.',
    link: '/products?category=leather-slippers',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    tag: 'HERITAGE LINE'
  }
];

export default function Home({ onOpenQuoteModal }) {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleAddFeaturedToCart = (prod) => {
    addToCart(prod, 1);
    setAddedIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setNewsletterStatus({ type: 'success', text: 'Thank you for subscribing to Classic Edge Atelier updates.' });
    setNewsletterEmail('');
  };

  const handleDownloadCatalogue = () => {
    const filename = `Classic_Edge_Atelier_Wholesale_Catalogue.html`;
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Classic Edge Atelier — Wholesale Master Export Catalogue</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #191919; max-width: 860px; margin: 0 auto; line-height: 1.6; background: #FAF8F5; }
          .header { text-align: center; border-bottom: 2px solid #B89B62; padding-bottom: 24px; margin-bottom: 30px; }
          .title { font-family: Georgia, serif; font-size: 28px; font-weight: 700; letter-spacing: 3px; color: #191919; text-transform: uppercase; margin: 0; }
          .sub { font-size: 13px; color: #77716A; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
          .meta { background: #FFFFFF; border: 1px solid #E5DED3; padding: 18px 24px; border-radius: 4px; margin-bottom: 30px; font-size: 13px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; background: #FFFFFF; }
          .table th, .table td { border: 1px solid #E5DED3; padding: 12px 16px; text-align: left; }
          .table th { background: #191919; color: #F8F5EF; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; }
          .contact-box { margin-top: 40px; border-top: 1px solid #E5DED3; padding-top: 24px; text-align: center; font-size: 13px; color: #77716A; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">CLASSIC EDGE ATELIER</h1>
          <div class="sub">Luxury Leather Footwear • Bags • Accessories • Abayas • Export Catalogue 2026</div>
        </div>
        <div class="meta">
          <strong>Key Target Markets:</strong> UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman &amp; Worldwide<br>
          <strong>Country of Origin:</strong> India (Partner Manufacturer Tanneries &amp; Ateliers)<br>
          <strong>WhatsApp Trade Desk:</strong> ${CONTACT_INFO.primaryPhone} | <strong>Email:</strong> ${CONTACT_INFO.primaryEmail}
        </div>
        <h3>Export Master Carton Breakdown</h3>
        <table class="table">
          <thead>
            <tr><th>Item Code</th><th>Product Description</th><th>Carton Packaging</th><th>Terms</th></tr>
          </thead>
          <tbody>
            <tr><td>CEA-LS-101</td><td>Cap-Toe Oxford Brogue Shoes</td><td>12 Pairs / Carton</td><td>FOB/CIF on discussion</td></tr>
            <tr><td>CEA-AS-201</td><td>Gulf Heritage Leather Slippers</td><td>24 Pairs / Carton</td><td>FOB/CIF on discussion</td></tr>
            <tr><td>CEA-WL-301</td><td>Full-Grain Bifold Wallets</td><td>50 Units / Master Carton</td><td>FOB/CIF on discussion</td></tr>
            <tr><td>CEA-BG-401</td><td>Executive Laptop Briefcases</td><td>6 Units / Carton</td><td>FOB/CIF on discussion</td></tr>
            <tr><td>CEA-AB-501</td><td>Dubai Nida Designer Abayas</td><td>24 Units / Carton</td><td>FOB/CIF on discussion</td></tr>
          </tbody>
        </table>
        <div class="contact-box">
          Official Trade Desk: ${CONTACT_INFO.primaryEmail} • WhatsApp: ${CONTACT_INFO.primaryPhone}<br>
          Classic Edge Atelier — Handcrafted Luxury Sourcing
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
        title="Classic Edge Atelier — Luxury Leather Footwear, Handcrafted Bags & Abayas"
        description="Classic Edge Atelier is an India-based manufacturer and exporter of luxury leather footwear, authentic factory shoes, wallets, bags, belts and Abayas for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman and international trade."
      />

      {/* 1. EDITORIAL LUXURY HERO SECTION */}
      <section 
        className="home-hero-luxury"
        style={{
          backgroundColor: '#F8F5EF',
          borderBottom: '1px solid #E5DED3',
          padding: '70px 24px 80px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Left Text Content */}
          <div style={{ maxWidth: '620px' }}>
            <div className="eyebrow">
              CLASSIC EDGE ATELIER • LUXURY EXPORT MAISON
            </div>

            <h1 
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(36px, 5.2vw, 58px)',
                lineHeight: 1.12,
                fontWeight: 700,
                color: '#191919',
                margin: '0 0 22px',
                letterSpacing: '-0.5px'
              }}
            >
              Crafted with Purpose. <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#B89B62' }}>Designed to Last.</span>
            </h1>

            <p 
              style={{
                fontSize: '16px',
                color: '#77716A',
                lineHeight: 1.7,
                margin: '0 0 34px',
                maxWidth: '540px'
              }}
            >
              Discover thoughtfully crafted leather footwear, artisanal accessories, and bespoke modest wear that bring together timeless design, quality materials, and contemporary elegance. Sourced directly from premier Indian ateliers for the Middle East and global connoisseurs.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link 
                to="/products" 
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>Explore the Collection</span>
                <ArrowRight size={16} />
              </Link>

              <button 
                type="button" 
                onClick={() => onOpenQuoteModal({ enquiryType: 'Wholesale' })}
                className="btn-secondary"
              >
                <span>Request Wholesale Quote</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div 
              style={{
                display: 'flex',
                gap: '28px',
                marginTop: '44px',
                paddingTop: '32px',
                borderTop: '1px solid #E5DED3',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#191919' }}>
                  31+
                </div>
                <div style={{ fontSize: '11.5px', color: '#77716A', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                  Factory Shoe Styles
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#191919' }}>
                  26
                </div>
                <div style={{ fontSize: '11.5px', color: '#77716A', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                  Abaya Line Designs
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#191919' }}>
                  GCC
                </div>
                <div style={{ fontSize: '11.5px', color: '#77716A', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                  Compliant Trade Logistics
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Showcase */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(25, 25, 25, 0.12)',
                border: '1px solid #E5DED3',
                background: '#FFFFFF'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1100&q=85" 
                alt="Classic Edge Atelier Handcrafted Leather Shoe" 
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Subtle gradient vignette */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(25, 25, 25, 0.6) 0%, rgba(25, 25, 25, 0) 50%)'
                }}
              />

              {/* Caption Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B89B62', fontWeight: 700, marginBottom: '4px' }}>
                  ATELIER CRAFTSMANSHIP
                </div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 600 }}>
                  Blake-Welted Derby in Burnished Mahogany
                </div>
              </div>
            </div>

            {/* Floating Brand Monogram Pill */}
            <div 
              style={{
                position: 'absolute',
                top: '-16px',
                right: '24px',
                background: '#FFFFFF',
                border: '1px solid #E5DED3',
                borderRadius: '4px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(25, 25, 25, 0.08)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                border: '1.5px solid #B89B62',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: '13px',
                fontWeight: 800,
                color: '#B89B62'
              }}>
                CE
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#191919', letterSpacing: '0.5px' }}>CLASSIC EDGE</div>
                <div style={{ fontSize: '10px', color: '#77716A', textTransform: 'uppercase' }}>Export Grade • India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS SECTION */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '90px 24px', borderBottom: '1px solid #E5DED3' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow">CURATED PORTFOLIO</div>
              <h2 
                style={{
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  fontWeight: 700,
                  color: '#191919',
                  margin: 0
                }}
              >
                Featured Collections
              </h2>
            </div>
            <Link 
              to="/products" 
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#191919',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                letterSpacing: '0.5px'
              }}
            >
              <span>Explore All Categories</span>
              <ArrowRight size={14} color="#B89B62" />
            </Link>
          </div>

          {/* 4 Large Image-Led Collection Cards */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {FEATURED_COLLECTIONS.map((col, idx) => (
              <Link
                key={idx}
                to={col.link}
                style={{
                  background: '#F8F5EF',
                  border: '1px solid #E5DED3',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="collection-card-luxury"
              >
                {/* Image with subtle zoom */}
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={col.image} 
                    alt={col.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    className="col-img"
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#191919',
                    color: '#F8F5EF',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    padding: '3px 8px',
                    borderRadius: '2px'
                  }}>
                    {col.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '11px', color: '#B89B62', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '6px' }}>
                    {col.subtitle}
                  </div>
                  <h3 
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#191919',
                      margin: '0 0 8px'
                    }}
                  >
                    {col.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#77716A', lineHeight: 1.5, margin: '0 0 16px', flex: 1 }}>
                    {col.description}
                  </p>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#191919',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    letterSpacing: '0.5px'
                  }}>
                    <span>View Collection</span>
                    <ArrowRight size={13} color="#B89B62" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section style={{ backgroundColor: '#F8F5EF', padding: '90px 24px', borderBottom: '1px solid #E5DED3' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow">SIGNATURE SELECTION</div>
              <h2 
                style={{
                  fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  fontWeight: 700,
                  color: '#191919',
                  margin: 0
                }}
              >
                Featured Atelier Products
              </h2>
            </div>
            <Link 
              to="/products" 
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#191919',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <span>View Complete Catalogue</span>
              <ArrowRight size={14} color="#B89B62" />
            </Link>
          </div>

          {/* Product Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {FEATURED_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5DED3',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(25, 25, 25, 0.03)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Image Container */}
                <div style={{ height: '220px', background: '#EDE5D8', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#191919',
                    border: '1px solid #B89B62',
                    color: '#F8F5EF',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.6px',
                    padding: '2px 7px',
                    borderRadius: '2px'
                  }}>
                    {prod.modelCode}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#77716A', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
                    {prod.subType}
                  </div>
                  <h3 
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#191919',
                      margin: '0 0 8px',
                      lineHeight: 1.3
                    }}
                  >
                    {prod.name}
                  </h3>
                  <div 
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#191919',
                      marginBottom: '18px'
                    }}
                  >
                    {prod.price}
                  </div>

                  {/* Add to Cart & Enquire button */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '8px', marginTop: 'auto' }}>
                    <button 
                      type="button" 
                      onClick={() => handleAddFeaturedToCart(prod)}
                      style={{
                        background: addedIds[prod.id] ? '#128C7E' : '#191919',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '11px',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      {addedIds[prod.id] ? (
                        <>
                          <Check size={14} />
                          <span>Added ✓</span>
                        </>
                      ) : (
                        <span>Add to Cart</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal({ productName: prod.name, enquiryType: 'Wholesale' })}
                      style={{
                        background: 'transparent',
                        color: '#191919',
                        border: '1px solid #E5DED3',
                        borderRadius: '2px',
                        padding: '11px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wholesale Catalogue Action Banner */}
          <div 
            style={{
              marginTop: '48px',
              background: '#FFFFFF',
              border: '1px solid #E5DED3',
              borderRadius: '6px',
              padding: '28px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 4px 16px rgba(25, 25, 25, 0.04)'
            }}
          >
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#191919', fontWeight: 700 }}>
                Wholesale Export Line Sheet &amp; Abaya Catalogue
              </div>
              <div style={{ fontSize: '13px', color: '#77716A', marginTop: '4px' }}>
                Download our complete 2026 master export carton specifications &amp; 28 MB Abaya Line Sheet.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a 
                href={ABAYA_PDF_URL} 
                download="Classic_Edge_Abaya_Catalogue.pdf" 
                className="btn-gold"
                style={{ padding: '11px 20px', fontSize: '12px' }}
              >
                <Download size={14} />
                <span>Download Abaya PDF (28 MB)</span>
              </a>

              <button 
                type="button" 
                onClick={handleDownloadCatalogue}
                className="btn-secondary"
                style={{ padding: '11px 20px', fontSize: '12px' }}
              >
                <span>Download Footwear Specs</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND STORY & CRAFTSMANSHIP SECTION */}
      <section style={{ backgroundColor: '#EDE5D8', padding: '90px 24px', borderBottom: '1px solid #E5DED3' }}>
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '60px'
          }}
        >
          {/* Left Workshop Imagery */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid #E5DED3',
                boxShadow: '0 16px 40px rgba(25, 25, 25, 0.08)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80" 
                alt="Classic Edge Atelier Leather Workshop"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Overlay Quote Badge */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                background: '#FFFFFF',
                border: '1px solid #E5DED3',
                borderRadius: '4px',
                padding: '16px 22px',
                maxWidth: '280px',
                boxShadow: '0 8px 24px rgba(25, 25, 25, 0.08)'
              }}
            >
              <div style={{ fontSize: '11px', color: '#B89B62', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
                ATELIER PHILOSOPHY
              </div>
              <p style={{ fontSize: '12px', color: '#191919', fontStyle: 'italic', margin: '4px 0 0', lineHeight: 1.5 }}>
                "Precision welt-stitching, hand-selected full-grain hides, and uncompromising devotion to longevity."
              </p>
            </div>
          </div>

          {/* Right Text Description */}
          <div>
            <div className="eyebrow">OUR HERITAGE &amp; PROMISE</div>
            <h2 
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.2,
                fontWeight: 700,
                color: '#191919',
                margin: '0 0 20px'
              }}
            >
              Refined Indian Craftsmanship. <br />
              Tailored for Global Trade.
            </h2>

            <p style={{ fontSize: '15px', color: '#77716A', lineHeight: 1.7, margin: '0 0 18px' }}>
              Classic Edge Atelier stands as a specialized leather and textile maison operating directly from India. Collaborating closely with partner tanneries and manufacturing facilities, we translate traditional Indian artisan heritage into impeccably executed commercial exports.
            </p>

            <p style={{ fontSize: '15px', color: '#77716A', lineHeight: 1.7, margin: '0 0 28px' }}>
              Whether crafting Blake-stitched executive brogues, traditional Gulf leather slides, or couture-embellished Nida abayas, our production oversight guarantees consistent sizing, premium material integrity, and transparent fulfillment tailored for wholesalers across the UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, and worldwide.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-primary">
                <span>Discover Our Story</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/private-label" className="btn-secondary">
                <span>Private Label Details</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS OF TRUST & SERVICE */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '90px 24px', borderBottom: '1px solid #E5DED3' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>INTERNATIONAL TRADE ASSURANCE</div>
            <h2 
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: 700,
                color: '#191919',
                margin: '0 0 14px'
              }}
            >
              Why Importers Partner with Classic Edge
            </h2>
            <p style={{ fontSize: '14.5px', color: '#77716A', lineHeight: 1.6, margin: 0 }}>
              We bridge authentic artisan manufacturing with structured international commerce, transparent pricing, and responsive regional communication.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Pillar 1 */}
            <div 
              style={{
                background: '#F8F5EF',
                border: '1px solid #E5DED3',
                borderRadius: '6px',
                padding: '32px 24px',
                boxShadow: '0 4px 14px rgba(25, 25, 25, 0.02)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  border: '1px solid rgba(184, 155, 98, 0.35)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Award size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#191919', fontWeight: 700, margin: '0 0 10px' }}>
                Full-Grain Quality Standard
              </h3>
              <p style={{ fontSize: '13px', color: '#77716A', lineHeight: 1.6, margin: 0 }}>
                Every footwear and leather goods style is developed with carefully selected full-grain and top-grain leathers, durable outsoles, and strict pre-shipment quality checks.
              </p>
            </div>

            {/* Pillar 2 */}
            <div 
              style={{
                background: '#F8F5EF',
                border: '1px solid #E5DED3',
                borderRadius: '6px',
                padding: '32px 24px',
                boxShadow: '0 4px 14px rgba(25, 25, 25, 0.02)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  border: '1px solid rgba(184, 155, 98, 0.35)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#191919', fontWeight: 700, margin: '0 0 10px' }}>
                Private Label Customization
              </h3>
              <p style={{ fontSize: '13px', color: '#77716A', lineHeight: 1.6, margin: 0 }}>
                Debossed logo branding, bespoke footbed stamping, custom hardware plating, and customized export cartons tailored for your retail chain or private brand.
              </p>
            </div>

            {/* Pillar 3 */}
            <div 
              style={{
                background: '#F8F5EF',
                border: '1px solid #E5DED3',
                borderRadius: '6px',
                padding: '32px 24px',
                boxShadow: '0 4px 14px rgba(25, 25, 25, 0.02)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  border: '1px solid rgba(184, 155, 98, 0.35)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Layers size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#191919', fontWeight: 700, margin: '0 0 10px' }}>
                Flexible Trial Batches &amp; MOQs
              </h3>
              <p style={{ fontSize: '13px', color: '#77716A', lineHeight: 1.6, margin: 0 }}>
                Scalable manufacturing coordination permits reasonable minimum quantities for trial collections, retail tests, and full commercial volume re-orders.
              </p>
            </div>

            {/* Pillar 4 */}
            <div 
              style={{
                background: '#F8F5EF',
                border: '1px solid #E5DED3',
                borderRadius: '6px',
                padding: '32px 24px',
                boxShadow: '0 4px 14px rgba(25, 25, 25, 0.02)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  background: 'rgba(184, 155, 98, 0.15)',
                  border: '1px solid rgba(184, 155, 98, 0.35)',
                  color: '#B89B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Globe size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#191919', fontWeight: 700, margin: '0 0 10px' }}>
                Dedicated Middle East Desk
              </h3>
              <p style={{ fontSize: '13px', color: '#77716A', lineHeight: 1.6, margin: 0 }}>
                Direct communication through official WhatsApp and email desk with swift quotation evaluation for buyers in UAE, KSA, Qatar, Kuwait, Oman, and Bahrain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER & BESPOKE INQUIRY SECTION */}
      <section style={{ backgroundColor: '#F8F5EF', padding: '80px 24px' }}>
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid #E5DED3',
            borderRadius: '8px',
            padding: '48px 40px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(25, 25, 25, 0.04)'
          }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>TRADE DESK &amp; VIP DISPATCH</div>
          <h2 
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.8vw, 34px)',
              fontWeight: 700,
              color: '#191919',
              margin: '0 0 12px'
            }}
          >
            Connect with Classic Edge Atelier
          </h2>
          <p style={{ fontSize: '14px', color: '#77716A', maxWidth: '560px', margin: '0 auto 30px', lineHeight: 1.6 }}>
            Subscribe to receive new leather footwear prototype arrivals, seasonal abaya releases, and international wholesale export line sheets.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input 
              type="email"
              placeholder="Enter your professional or business email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                background: '#F8F5EF',
                border: '1px solid #E5DED3',
                borderRadius: '2px',
                padding: '13px 16px',
                fontSize: '13px',
                color: '#191919',
                outline: 'none'
              }}
              required
            />
            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '13px 24px' }}
            >
              <span>Subscribe</span>
            </button>
          </form>

          {newsletterStatus && (
            <div 
              style={{
                marginTop: '16px',
                fontSize: '13px',
                fontWeight: 600,
                color: newsletterStatus.type === 'success' ? '#128C7E' : '#B91C1C'
              }}
            >
              {newsletterStatus.text}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
