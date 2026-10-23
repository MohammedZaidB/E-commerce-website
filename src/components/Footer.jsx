import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: '#0d0d0f',
      borderTop: '1px solid rgba(197, 160, 89, 0.25)',
      padding: '50px 20px 24px',
      color: '#fff',
      fontSize: '13px'
    }}>
      <div className="footer-responsive-grid" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Col 1: Brand Info matching Mockup with Classic Edge Atelier */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              border: '1.5px solid #c5a059',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(197, 160, 89, 0.08)',
              borderRadius: '2px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                border: '1px solid rgba(197, 160, 89, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Cinzel, Georgia, serif',
                fontWeight: 800,
                fontSize: '15px',
                color: '#f5e2b8',
                letterSpacing: '1px',
                lineHeight: 1
              }}>
                CE
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '2.5px',
                color: '#f5e2b8',
                lineHeight: 1.1
              }}>
                CLASSIC EDGE
              </div>
              <div style={{
                fontSize: '8px',
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
                color: '#9e9a91',
                marginTop: '3px',
                fontWeight: 600
              }}>
                ATELIER · LEATHER FOOTWEAR · BAGS · ACCESSORIES
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '14px',
            textTransform: 'none',
            letterSpacing: '0.3px'
          }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><Link to="/" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Home</Link></li>
            <li><Link to="/products" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Shop</Link></li>
            <li><Link to="/about" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Contact</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Support */}
        <div>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '14px',
            textTransform: 'none',
            letterSpacing: '0.3px'
          }}>
            Customer Support
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><Link to="/about" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>FAQs</Link></li>
            <li><Link to="/wholesale-export" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Shipping Policy</Link></li>
            <li><Link to="/private-label" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Return & Refund Policy</Link></li>
            <li><Link to="/wholesale-export" style={{ color: '#a6a29a', textDecoration: 'none', fontSize: '12.5px' }}>Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Col 4: Get in Touch with exact business card details */}
        <div>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '14px',
            textTransform: 'none',
            letterSpacing: '0.3px'
          }}>
            Get in Touch
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '12.5px', color: '#a6a29a' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="classicedgeatlier@gmail.com" style={{ color: '#a6a29a', textDecoration: 'none' }}>classicedgeatlier@gmail.com</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '3px' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <a href="tel:+919443750820" style={{ color: '#a6a29a', textDecoration: 'none', display: 'block' }}>+91 9443750820</a>
                <a href="tel:+91720047992" style={{ color: '#a6a29a', textDecoration: 'none', display: 'block' }}>+91 720047992</a>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '3px', flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span style={{ lineHeight: 1.4 }}>
                No:111/A Kandrampalli Road<br />
                Cross Street, Thuthipet, Ambur<br />
                635811, Tamil Nadu, India
              </span>
            </li>
          </ul>
        </div>

        {/* Col 5: Follow Us */}
        <div>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '14px',
            textTransform: 'none',
            letterSpacing: '0.3px'
          }}>
            Follow Us
          </h4>
          <div style={{ display: 'flex', gap: '14px', color: '#a6a29a', fontSize: '16px' }}>
            <span style={{ cursor: 'pointer' }} title="Instagram">📷</span>
            <span style={{ cursor: 'pointer' }} title="Facebook">📘</span>
            <span style={{ cursor: 'pointer' }} title="YouTube">▶️</span>
            <span style={{ cursor: 'pointer' }} title="X">𝕏</span>
          </div>
        </div>
      </div>

      {/* Sub-footer Bottom Bar matching Mockup */}
      <div style={{
        maxWidth: '1240px',
        margin: '40px auto 0',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '12px',
        color: '#7a766e'
      }}>
        <div>&copy; 2026 Classic Edge Atelier. All rights reserved.</div>
        <div style={{
          fontFamily: 'Cinzel, Georgia, serif',
          fontStyle: 'italic',
          color: 'var(--gold-light, #f5e2b8)',
          letterSpacing: '0.5px'
        }}>
          Crafted Today, Legacy Tomorrow.
        </div>
      </div>
    </footer>
  );
}
