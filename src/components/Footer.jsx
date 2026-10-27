import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/marketsData';

export default function Footer() {
  return (
    <footer 
      style={{
        background: '#141416',
        borderTop: '1px solid rgba(184, 155, 98, 0.3)',
        padding: '70px 24px 32px',
        color: '#F8F5EF',
        fontSize: '13px'
      }}
    >
      <div 
        className="footer-responsive-grid" 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}
      >
        {/* Col 1: Brand Info */}
        <div style={{ maxWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              border: '1.5px solid #B89B62',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#191919',
              borderRadius: '2px',
              flexShrink: 0
            }}>
              <span style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontWeight: 800,
                fontSize: '14px',
                color: '#B89B62',
                letterSpacing: '1px'
              }}>
                CE
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '2.5px',
                color: '#F8F5EF',
                lineHeight: 1.1
              }}>
                CLASSIC EDGE
              </div>
              <div style={{
                fontSize: '8px',
                letterSpacing: '1.6px',
                textTransform: 'uppercase',
                color: '#B89B62',
                marginTop: '3px',
                fontWeight: 600
              }}>
                ATELIER · LEATHER · TEXTILE EXPORT
              </div>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#968F87', lineHeight: 1.6, margin: '0 0 20px' }}>
            Handcrafted leather footwear, artisanal slippers, executive leather goods, and modest wear designed with refined craftsmanship and supplied directly from India for international trade.
          </p>

          <div style={{ fontSize: '11px', color: '#B89B62', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            MIDDLE EAST &amp; GLOBAL TRADE DESK
          </div>
        </div>

        {/* Col 2: Collections */}
        <div>
          <h4 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '13px',
            fontWeight: 700,
            color: '#F8F5EF',
            marginBottom: '18px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/products?category=shoes" style={{ color: '#968F87', textDecoration: 'none', transition: 'color 0.2s' }}>
                Leather Footwear (31 Styles)
              </Link>
            </li>
            <li>
              <Link to="/products?category=abaya-collection" style={{ color: '#968F87', textDecoration: 'none', transition: 'color 0.2s' }}>
                Abaya Modest Wear (26 Styles)
              </Link>
            </li>
            <li>
              <Link to="/products?category=leather-slippers" style={{ color: '#968F87', textDecoration: 'none', transition: 'color 0.2s' }}>
                Arabic Leather Slides
              </Link>
            </li>
            <li>
              <Link to="/products?category=wallets" style={{ color: '#968F87', textDecoration: 'none', transition: 'color 0.2s' }}>
                Full-Grain Wallets
              </Link>
            </li>
            <li>
              <Link to="/products?category=bags" style={{ color: '#968F87', textDecoration: 'none', transition: 'color 0.2s' }}>
                Executive Bags &amp; Belts
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Client Services */}
        <div>
          <h4 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '13px',
            fontWeight: 700,
            color: '#F8F5EF',
            marginBottom: '18px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>
            Trade Services
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/wholesale-export" style={{ color: '#968F87', textDecoration: 'none' }}>
                Wholesale Sourcing Process
              </Link>
            </li>
            <li>
              <Link to="/private-label" style={{ color: '#968F87', textDecoration: 'none' }}>
                Private Label &amp; OEM Branding
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: '#968F87', textDecoration: 'none' }}>
                Partner Tannery Inspection
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{ color: '#968F87', textDecoration: 'none' }}>
                Export Carton Specifications
              </Link>
            </li>
            <li>
              <Link to="/cart" style={{ color: '#968F87', textDecoration: 'none' }}>
                Sample Order Bag
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Atelier Desk */}
        <div>
          <h4 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '13px',
            fontWeight: 700,
            color: '#F8F5EF',
            marginBottom: '18px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>
            Official Trade Desk
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', color: '#968F87' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={15} color="#B89B62" />
              <a href="mailto:classicedgeatelier@gmail.com" style={{ color: '#968F87', textDecoration: 'none' }}>
                classicedgeatelier@gmail.com
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={15} color="#B89B62" />
              <div>
                <a href="tel:+919443750820" style={{ color: '#968F87', textDecoration: 'none' }}>
                  +91 9443750820
                </a>
                <span style={{ color: '#77716A', margin: '0 4px' }}>•</span>
                <a href="tel:+91720047992" style={{ color: '#968F87', textDecoration: 'none' }}>
                  +91 720047992
                </a>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={15} color="#B89B62" style={{ marginTop: '3px', flexShrink: 0 }} />
              <span style={{ lineHeight: 1.5 }}>
                No:111/A Kandrampalli Road<br />
                Thuthipet, Ambur 635811<br />
                Tamil Nadu, India
              </span>
            </li>
          </ul>

          <div style={{ marginTop: '20px' }}>
            <a 
              href={CONTACT_INFO.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ fontSize: '11px', padding: '8px 14px' }}
            >
              <span>WhatsApp Trade Desk</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Sub-footer Bottom Bar */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '50px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '12px',
          color: '#77716A'
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} Classic Edge Atelier. All rights reserved.
        </div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          color: '#B89B62',
          letterSpacing: '0.8px'
        }}>
          Crafted with Purpose. Designed to Last.
        </div>
      </div>
    </footer>
  );
}
