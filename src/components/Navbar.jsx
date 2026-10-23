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
      <header className="main-header">
        {/* Brand Logo with Classic Edge Atelier Monogram */}
        <Link 
          to="/" 
          className="header-brand" 
          onClick={handleLinkClick} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            border: '1.5px solid #c5a059',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(197, 160, 89, 0.08)',
            borderRadius: '2px',
            flexShrink: 0
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: '16px',
              fontWeight: 800,
              letterSpacing: '2.2px',
              color: '#f5e2b8',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              CLASSIC EDGE
            </div>
            <div 
              className="header-brand-subtitle"
              style={{
                fontSize: '8px',
                letterSpacing: '1.6px',
                textTransform: 'uppercase',
                color: '#9e9a91',
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
        <nav className="desktop-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#f5e2b8' : '#d1cdbf',
              textDecoration: 'none',
              letterSpacing: '0.8px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #c5a059' : '2px solid transparent',
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
              color: isActive ? '#f5e2b8' : '#d1cdbf',
              textDecoration: 'none',
              letterSpacing: '0.8px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #c5a059' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            Shop
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#f5e2b8' : '#d1cdbf',
              textDecoration: 'none',
              letterSpacing: '0.8px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #c5a059' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}
          >
            About Us
          </NavLink>

          <NavLink 
            to="/private-label" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#f5e2b8' : '#d1cdbf',
              textDecoration: 'none',
              letterSpacing: '0.8px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #c5a059' : '2px solid transparent',
              transition: 'all 0.2s ease'
            })}

            
          >
            Custom Orders
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#f5e2b8' : '#d1cdbf',
              textDecoration: 'none',
              letterSpacing: '0.8px',
              position: 'relative',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid #c5a059' : '2px solid transparent',
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
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search leather goods..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  background: '#1a1a20',
                  border: '1px solid #c5a059',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  color: '#fff',
                  fontSize: '12px',
                  outline: 'none',
                  width: '120px'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  background: '#c5a059', 
                  color: '#000', 
                  border: 'none', 
                  borderRadius: '4px',
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '6px 8px',
                  cursor: 'pointer' 
                }}
              >
                Go
              </button>
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)} 
                style={{ color: '#aaa', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}
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
              style={{ color: '#d1cdbf', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          )}

          {/* User Account / Partnership Quick Modal Icon */}
          <button
            type="button"
            className="header-action-btn header-account-btn"
            onClick={onOpenQuoteModal}
            title="Account / Wholesale Inquiries"
            aria-label="Wholesale Inquiries"
            style={{ color: '#d1cdbf', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Shopping Cart Icon with golden badge */}
          <NavLink 
            to="/cart" 
            className="header-action-btn header-cart-link"
            onClick={handleLinkClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#d1cdbf',
              textDecoration: 'none',
              padding: '6px'
            }}
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-6px',
              background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
              color: '#0d0d0d',
              fontWeight: 800,
              fontSize: '10px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Off-Canvas Mobile Drawer & Backdrop */}
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
              border: '1.5px solid #c5a059',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(197, 160, 89, 0.1)',
              borderRadius: '2px'
            }}>
              <span style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontWeight: 800,
                fontSize: '13px',
                color: '#f5e2b8'
              }}>
                CE
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                color: '#f5e2b8',
                lineHeight: 1.1
              }}>
                CLASSIC EDGE
              </div>
              <div style={{ fontSize: '8px', color: '#9e9a91', letterSpacing: '1px', textTransform: 'uppercase' }}>
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
                background: '#1a1a20',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '6px',
                padding: '9px 12px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                color: '#0d0d0d',
                border: 'none',
                borderRadius: '6px',
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
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/products" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Shop Catalogue</span>
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/about" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>About Atelier</span>
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/private-label" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Custom Orders & OEM</span>
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/contact" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <span>Contact Desk</span>
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>

          <NavLink 
            to="/cart" 
            onClick={handleLinkClick}
            className={({ isActive }) => `mobile-drawer-link ${isActive ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Shopping Cart</span>
              <span style={{
                background: '#c5a059',
                color: '#000',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {totalItems}
              </span>
            </div>
            <span style={{ color: '#c5a059', fontSize: '13px' }}>&rarr;</span>
          </NavLink>
        </div>

        {/* Mobile Quick Action Buttons in Drawer */}
        <div className="mobile-drawer-footer">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenQuoteModal({ enquiryType: 'Wholesale' });
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
              color: '#0b0b0d',
              padding: '12px',
              borderRadius: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Request Wholesale Quote</span>
          </button>

          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              background: '#25D366',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>💬 WhatsApp Export Desk</span>
          </a>
        </div>
      </aside>
    </>
  );
}
