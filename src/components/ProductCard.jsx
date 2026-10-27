import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onEnquire, onZoom, onViewPdf }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const isZoomable = Boolean(onZoom);

  return (
    <article className="product-card" style={{ position: 'relative' }}>
      {/* Compact Product Image Container */}
      <div 
        className="product-image-container"
        style={{ cursor: isZoomable ? 'pointer' : 'default' }}
        onClick={() => {
          if (isZoomable) {
            onZoom(product);
          }
        }}
        title="Click to view full image zoom"
      >
        <img 
          src={product.image} 
          alt={`Classic Edge ${product.name}`} 
          className={`product-image ${product.category === 'abaya-collection' ? 'abaya-fit' : ''}`}
          loading="lazy"
        />

        {/* Real Factory Photo Badge */}
        {product.isRealFactoryPhoto && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: '#191919',
            border: '1px solid #B89B62',
            color: '#F8F5EF',
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            padding: '3px 8px',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2
          }}>
            <span style={{ color: '#B89B62' }}>✦</span>
            <span>ATELIER SAMPLE</span>
          </div>
        )}

        {/* Abaya PDF Badge */}
        {product.category === 'abaya-collection' && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: '#B89B62',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            padding: '3px 8px',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2
          }}>
            <span>📄 {product.modelCode || 'ABAYA'}</span>
          </div>
        )}

        {/* Zoom Hint Icon */}
        {isZoomable && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(25,25,25,0.7)',
            color: '#fff',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            zIndex: 2
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        )}
      </div>

      {/* Product Content with short 2-3 line detail */}
      <div className="product-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px', gap: '8px' }}>
          <span className="product-subtag" style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.subType}
          </span>
          <span className="product-price-badge" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            {product.price || '₹ 2,499'}
          </span>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Short 2-3 line detail as requested */}
        <p className="product-desc" title={product.description}>
          {product.description}
        </p>

        {/* Model Code & Specs line */}
        <div className="product-model-code">
          <span>{product.modelCode || 'CE-EXPORT'}</span>
          <span style={{ background: 'none', color: '#77716A', padding: 0 }}>
            {product.pdfReference ? `• ${product.pdfReference}` : '• Ready Export Stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="product-actions-grid">
          <button 
            type="button" 
            className="product-card-btn"
            onClick={handleAddToCart}
            style={{
              background: isAdded ? '#128C7E' : '#191919',
              color: '#FFFFFF',
              fontWeight: 600,
              border: isAdded ? '1px solid #128C7E' : '1px solid #191919',
              borderRadius: '2px',
              transition: 'all 0.2s ease'
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Added ✓</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button 
            type="button" 
            className="product-card-btn"
            onClick={() => onEnquire(product)}
            style={{
              background: '#FFFFFF',
              color: '#191919',
              border: '1px solid #E5DED3',
              borderRadius: '2px',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            aria-label={`Enquire about wholesale ${product.name}`}
          >
            <span>Enquire</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
