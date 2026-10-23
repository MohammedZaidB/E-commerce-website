import React from 'react';

export default function ImageLightBoxModal({ isOpen, onClose, image, title, specs, price }) {
  if (!isOpen || !image) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(5, 5, 8, 0.92)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '750px',
        width: '100%',
        background: '#141416',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #333',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212, 163, 64, 0.25)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '22px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}
        >
          &times;
        </button>

        {/* Real Photo */}
        <div style={{ background: '#0a0a0c', textAlign: 'center', padding: '10px' }}>
          <img
            src={image}
            alt={title}
            style={{
              maxHeight: '68vh',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              margin: '0 auto',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Info Box */}
        <div style={{ padding: '16px 20px', background: '#18181c', borderTop: '1px solid #282830' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{
              background: title?.toLowerCase().includes('abaya') ? 'linear-gradient(135deg, #EA4335 0%, #C5221F 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              {title?.toLowerCase().includes('abaya') ? '📄 ABAYA.PDF OFFICIAL CATALOGUE' : '📸 AUTHENTIC FACTORY STOCK PHOTO'}
            </span>
            {price && (
              <span style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '17px',
                fontWeight: 800,
                color: '#f3c969'
              }}>
                {price}
              </span>
            )}
          </div>
          <h3 style={{ margin: '0 0 6px', color: '#fff', fontSize: '18px', fontWeight: 700 }}>
            {title}
          </h3>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>
            {specs || '100% genuine export leather. Handcrafted in India for GCC & international export.'}
          </p>
        </div>
      </div>
    </div>
  );
}
