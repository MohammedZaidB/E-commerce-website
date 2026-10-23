import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartToast() {
  const { toastMessage, dismissToast, totalItems } = useCart();

  if (!toastMessage) return null;

  return (
    <div 
      className="cart-toast-notification"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: '#141416',
        color: '#fff',
        border: '1px solid rgba(212, 163, 64, 0.4)',
        borderRadius: '12px',
        padding: '14px 18px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 163, 64, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '420px',
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 480px) {
          .cart-toast-notification {
            left: 14px !important;
            right: 14px !important;
            bottom: 16px !important;
            max-width: calc(100vw - 28px) !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>

      {/* Product Image / Icon */}
      {toastMessage.item?.image ? (
        <img
          src={toastMessage.item.image}
          alt={toastMessage.item.name}
          style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px' }}
        />
      ) : (
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.2)',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800
        }}>
          ✓
        </div>
      )}

      {/* Message Text */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#f3c969' }}>
          Added to Cart!
        </div>
        <div style={{ fontSize: '12px', color: '#ccc', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
          {toastMessage.item?.name || toastMessage.message}
        </div>
      </div>

      {/* View Cart Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link
          to="/cart"
          onClick={dismissToast}
          style={{
            background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
            color: '#0d0d0d',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 800,
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          View Cart ({totalItems})
        </Link>
        <button
          onClick={dismissToast}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '2px 6px',
            lineHeight: 1
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
