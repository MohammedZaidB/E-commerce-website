import React from 'react';

export default function PdfViewerModal({ isOpen, onClose, pdfUrl, title = 'Abaya Wholesale Catalogue (abaya.pdf)' }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(10, 10, 12, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#18181c',
        border: '1px solid #33333d',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '960px',
        height: '90vh',
        maxHeight: '900px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 163, 64, 0.2)',
        overflow: 'hidden',
        color: '#fff'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #282830',
          background: '#121214'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#EA4335',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '11px',
              color: '#fff'
            }}>
              PDF
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, letterSpacing: '0.5px' }}>
                {title}
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
                Official Classic Edge Export Modest Wear Catalogue (27.9 MB)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={pdfUrl}
              download="Classic_Edge_Abaya_Catalogue.pdf"
              style={{
                background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                color: '#0d0d0d',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '26px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '4px'
              }}
            >
              &times;
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div style={{ flex: 1, width: '100%', height: '100%', background: '#26262b', position: 'relative' }}>
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1`}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>

        {/* Footer info bar */}
        <div style={{
          padding: '12px 24px',
          background: '#121214',
          borderTop: '1px solid #282830',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          <span>
            Targeted for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain & Oman wholesale distributors.
          </span>
          <a
            href="https://wa.me/919443750820?text=Hello%20Classic%20Edge,%20I%20reviewed%20your%20Abaya%20PDF%20catalogue%20and%20would%20like%20to%20enquire%20about%20carton%20quantities."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25D366', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Discuss Abaya Order on WhatsApp &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
