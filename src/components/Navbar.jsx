import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CONTACT_INFO } from '../data/marketsData';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenQuoteModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setSearchVal('');
    }
  };

  return (
    <>
      {/* 1. SLIM LUXURY ANNOUNCEMENT BAR */}
      <div 
        className="announcement-bar"
        style={{
          background: '#191919',
          color: '#F8F5EF',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          padding: '8px 16px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(184, 155, 98, 0.3)',
          position: 'relative',
          zIndex: 10000
        }}
      >
        <span style={{ color: '#B89B62' }}>✦</span>
        <span>Handcrafted Leather Atelier &amp; Export Modest Wear • Direct Sourcing from India</span>
        <span style={{ color: '#B89B62' }} className="hide-mobile">✦</span>
        <span className="hide-mobile" style={{ color: '#D9C59F' }}>Middle East &amp; Global Trade Desk</span>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="main-header">
        {/* Brand Logo & Wordmark */}
        <Link 
          to="/" 
          className="header-brand" 
          onClick={handleLinkClick} 
          style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            border: '1.5px solid #B89B62',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            borderRadius: '2px',
            boxShadow: '0 2px 8px rgba(184, 155, 98, 0.15)',
            flexShrink: 0
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              border: '1px solid rgba(184, 155, 98, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 800,
              fontSize: '15px',
              color: '#B89B62',
              letterSpacing: '1px',
              lineHeight: 1
            }}>
              CE
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              fontSize: '17px',
              fontWeight: 800,
              letterSpacing: '2.5px',
              color: '#191919',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              CLASSIC EDGE
            </div>
            <div 
              className="header-brand-subtitle"
              style={{
                fontSize: '8px',
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
                color: '#77716A',
                marginTop: '3px',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              ATELIER · LEATHER FOOTWEAR · BAGS · ACCESSORIES
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Home
          </NavLink>

          <NavLink 
            to="/products" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Collections
          </NavLink>

          <NavLink 
            to="/private-label" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Custom Orders
          </NavLink>

          <NavLink 
            to="/wholesale-export" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Wholesale
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            About Us
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#B89B62' : '#191919',
              textDecoration: 'none',
              letterSpacing: '0.6px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #B89B62' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Action Icons: Search, Quote, Cart & Mobile Toggle */}
        <div className="header-actions">
          {/* Search Bar / Icon */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #B89B62',
                  borderRadius: '4px',
                  padding: '7px 12px',
                  color: '#191919',
                  fontSize: '12.5px',
                  outline: 'none',
                  width: '140px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  background: '#B89B62', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '7px 10px',
                  cursor: 'pointer' 
                }}
              >
                Go
              </button>
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)} 
                style={{ color: '#77716A', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}
                aria-label="Close search"
              >
                &times;
              </button>
            </form>
          ) : (
            <button 
              type="button" 
              className="header-action-btn header-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search catalog"
              style={{ color: '#191919', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          )}

          {/* Wholesale Quote Modal Trigger */}
          <button
            type="button"
            className="header-action-btn header-account-btn"
            onClick={onOpenQuoteModal}
            title="Wholesale & Custom Order Inquiries"
            aria-label="Wholesale Inquiries"
            style={{ color: '#191919', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Shopping Cart Icon with refined badge */}
          <NavLink 
            to="/cart" 
            className="header-action-btn header-cart-link"
            onClick={handleLinkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#191919',
              textDecoration: 'none',
              padding: '6px'
            }}
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-6px',
              background: '#B89B62',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '10px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              boxShadow: '0 2px 6px rgba(184, 155, 98, 0.4)'
            }}>
              {totalItems}
            </span>
          </NavLink>

          {/* Mobile Menu Hamburger Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* 3. OFF-CANVAS MOBILE DRAWER & BACKDROP */}
      <div 
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`} 
        onClick={() => setMobileOpen(false)} 
        aria-hidden="true"
      />

      <aside 
        className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '1.5px solid #B89B62',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              borderRadius: '2px'
            }}>
              <span style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontWeight: 800,
                fontSize: '13px',
                color: '#B89B62'
              }}>
                CE
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                color: '#191919',
                lineHeight: 1.1
              }}>
                CLASSIC EDGE
              </div>
              <div style={{ fontSize: '8px', color: '#77716A', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Luxury Leather Atelier
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="mobile-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            &times;
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div style={{ padding: '16px 20px 0' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text"
              placeholder="Search products..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{
                flex: 1,
                background: '#FFFFFF',
                border: '1px solid #E5DED3',
                borderRadius: '4px',
                padding: '9px 12px',
                color: '#191919',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#B89B62',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                padding: '0 14px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Links Navigation */}
        <div className="mobile-drawer-body">
          <NavLink 
            to="/" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Home</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/products" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Collections &amp; Catalogue</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/private-label" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Custom Orders &amp; Private Label</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/wholesale-export" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Wholesale Sourcing</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/about" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>About Atelier</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/contact" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Contact Desk</span>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/cart" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Shopping Cart</span>
              <span style={{
                background: '#B89B62',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 7px',
                borderRadius: '10px'
              }}>
                {totalItems}
              </span>
            </div>
            <span style={{ color: '#B89B62', fontSize: '13px' }}>&rarr;</span>
          </NavLink>
        </div>

        {/* Mobile Quick Action Buttons in Drawer */}
        <div className="mobile-drawer-footer" style={{ padding: '20px', borderTop: '1px solid #E5DED3', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenQuoteModal({ enquiryType: 'Wholesale' });
            }}
            className="btn-primary"
            style={{ width: '100%', fontSize: '12px' }}
          >
            <span>Request Wholesale Quote</span>
          </button>

          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}
          >
            <span>WhatsApp Export Desk</span>
          </a>
        </div>
      </aside>
    </>
  );
}
