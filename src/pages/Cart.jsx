import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import PaymentModal from '../components/PaymentModal';

export default function Cart() {
  const {
    cartItems,
    totalItems,
    subtotal,
    discountAmount,
    couponCode,
    shipping,
    tax,
    finalTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon
  } = useCart();

  const navigate = useNavigate();

  // Checkout info form
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [promoInput, setPromoInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const result = applyCoupon(promoInput);
    setCouponMessage(result);
  };

  const validateCheckoutForm = () => {
    const errors = {};
    if (!customer.fullName.trim()) errors.fullName = 'Please enter your name.';
    if (!customer.email.trim() || !customer.email.includes('@')) {
      errors.email = 'Please provide a valid Gmail/email address for your receipt.';
    }
    if (!customer.phone.trim() || customer.phone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number.';
    }
    if (!customer.address.trim()) errors.address = 'Please enter your shipping address.';
    if (!customer.city.trim()) errors.city = 'Please enter city.';
    if (!customer.pincode.trim() || customer.pincode.length < 5) {
      errors.pincode = 'Please enter valid PIN code.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!validateCheckoutForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    setPaymentModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Shopping Cart & Real-Time Checkout | Classic Edge Atelier"
        description="Review your luxury leather items, select quantities, and proceed to secure real-time payment with Google Pay, Cards, and Net Banking."
      />

      <div style={{ maxWidth: '1240px', margin: '30px auto 80px', padding: '0 16px' }}>
        {/* Breadcrumb & Title */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#888' }}>Home</Link> / <Link to="/products" style={{ color: '#888' }}>Catalogue</Link> / <span style={{ color: 'var(--accent-gold, #d4a340)' }}>Shopping Cart</span>
          </div>
          <h1 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 'clamp(24px, 4.5vw, 32px)', fontWeight: 800, margin: 0, color: 'var(--ink, #111)' }}>
            Your Atelier Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '6px' }}>
            Handcrafted Indian leather footwear, bags & accessories prepared for wholesale dispatch.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div style={{
            background: '#faf9f6',
            border: '1px dashed #d5d0c5',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#888'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Your cart is empty</h2>
            <p style={{ color: '#666', fontSize: '14px', maxWidth: '420px', margin: '0 auto 24px' }}>
              You haven't added any handcrafted leather products yet. Explore our curated collections of shoes, slippers, wallets, and bags.
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                color: '#0d0d0d',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: '0 4px 14px rgba(212, 163, 64, 0.3)'
              }}
            >
              Explore Catalogue &rarr;
            </Link>
          </div>
        ) : (
          <div className="cart-grid-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px', alignItems: 'start' }}>
            {/* Left Column: Cart items & Delivery Details Form */}
            <div>
              {/* Item List Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '14px',
                borderBottom: '2px solid #111',
                marginBottom: '18px'
              }}>
                <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Product Details
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    color: '#ef4444',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        backgroundColor: '#f5f5f5'
                      }}
                    />

                    {/* Details */}
                    <div>
                      <span style={{ fontSize: '11px', color: '#996515', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '2px 0 6px', color: '#111' }}>
                        {item.name}
                      </h3>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '10px' }}>
                        {item.price} <span style={{ fontSize: '11px', color: '#777', fontWeight: 400 }}>each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              padding: '4px 10px',
                              background: '#f8f8f8',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ padding: '4px 14px', fontSize: '13px', fontWeight: 700 }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              padding: '4px 10px',
                              background: '#f8f8f8',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            color: '#888',
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            textDecoration: 'underline'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Total for this line */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#888' }}>Total:</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink, #111)', fontFamily: 'Cinzel, Georgia, serif' }}>
                        ₹ {(item.priceNum * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery & Billing Form */}
              <div style={{
                background: '#fff',
                border: '1px solid #e8e5df',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#111',
                    color: '#C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}>
                    1
                  </div>
                  <div>
                    <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
                      Delivery & Gmail Receipt Details
                    </h2>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      Enter your address and email to receive real-time order tracking & official PDF invoice
                    </p>
                  </div>
                </div>

                <div className="cart-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={customer.fullName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.fullName ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.fullName && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.fullName}</span>
                    )}
                  </div>

                  {/* Gmail Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Gmail / Business Email * (For Receipt)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={customer.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.email ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.email && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.email}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={customer.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.phone ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.phone && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.phone}</span>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      City / Emirate *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Mumbai, Dubai, Riyadh"
                      value={customer.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.city ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.city && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.city}</span>
                    )}
                  </div>

                  {/* Address */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Street Address & Building *
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Flat/House No., Street Name, Landmark"
                      value={customer.address}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.address ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.address && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.address}</span>
                    )}
                  </div>

                  {/* State / Province */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="e.g. Maharashtra, Dubai"
                      value={customer.state}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      PIN / Postal Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="400001"
                      value={customer.pincode}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: formErrors.pincode ? '1px solid #ef4444' : '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                    {formErrors.pincode && (
                      <span style={{ color: '#ef4444', fontSize: '11px' }}>{formErrors.pincode}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Proceed to Pay button */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{
                background: '#fff',
                border: '1px solid #e2ddd2',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#444' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Items Subtotal:</span>
                    <span style={{ fontWeight: 600, color: '#111' }}>₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                      <span>Discount ({couponCode}):</span>
                      <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Express Air Shipping:</span>
                    <span>{shipping === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹ ${shipping}`}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated GST (5%):</span>
                    <span>₹ {tax.toLocaleString('en-IN')}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '2px solid #111',
                    paddingTop: '12px',
                    marginTop: '6px',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#000'
                  }}>
                    <span>Grand Total:</span>
                    <span style={{ color: '#b8860b', fontFamily: 'Cinzel, Georgia, serif' }}>
                      ₹ {finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} style={{ marginTop: '20px', borderTop: '1px dashed #ddd', paddingTop: '16px' }}>
                  <label style={{ fontSize: '11.5px', color: '#666', display: 'block', marginBottom: '6px' }}>
                    Have a promo or wholesale voucher?
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: '#111',
                        color: '#C5A059',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <div style={{
                      fontSize: '11px',
                      marginTop: '6px',
                      color: couponMessage.success ? '#10b981' : '#ef4444'
                    }}>
                      {couponMessage.message}
                    </div>
                  )}
                </form>

                {/* PROCEED TO PAY BUTTON */}
                <button
                  type="button"
                  onClick={handleProceedToPay}
                  style={{
                    width: '100%',
                    marginTop: '24px',
                    background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                    color: '#0d0d0d',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 20px rgba(212, 163, 64, 0.4)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                  <span>Proceed to Pay (₹ {finalTotal.toLocaleString('en-IN')})</span>
                </button>

                {/* Accepted Payment badges */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                    Real-Time Payment Methods Supported:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#f4f4f5', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                      GPay / UPI
                    </span>
                    <span style={{ background: '#f4f4f5', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                      Visa / Mastercard
                    </span>
                    <span style={{ background: '#f4f4f5', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                      Net Banking
                    </span>
                  </div>
                </div>

                {/* Gmail Guarantee Note */}
                <div style={{
                  marginTop: '18px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '11.5px',
                  color: '#475569',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: '15px' }}>📧</span>
                  <span>
                    <strong>Instant Gmail Invoice:</strong> Upon successful real-time payment, a verified tax receipt is automatically prepared for your Gmail.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        customerInfo={customer}
        onPaymentSuccess={(order) => {
          // Keep modal in success state so user sees invoice and Gmail action
        }}
      />
    </>
  );
}
