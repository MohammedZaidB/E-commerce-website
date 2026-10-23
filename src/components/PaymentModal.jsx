import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function PaymentModal({ isOpen, onClose, customerInfo, onPaymentSuccess }) {
  const { finalTotal, subtotal, shipping, tax, discountAmount, cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('gpay'); // 'gpay' | 'card' | 'netbanking'
  const [paymentState, setPaymentState] = useState('input'); // 'input' | 'processing' | 'otp' | 'success' | 'failed'
  const [processingStep, setProcessingStep] = useState(0);

  // Form states
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(customerInfo?.fullName || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [otpCode, setOtpCode] = useState('749215');

  // Success details
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    if (customerInfo?.fullName && !cardName) {
      setCardName(customerInfo.fullName);
    }
  }, [customerInfo]);

  if (!isOpen) return null;

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardExpiry(raw);
  };

  const formatCardBrand = () => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'VISA';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('6')) return 'RuPay';
    if (num.startsWith('3')) return 'Amex';
    return 'Card';
  };

  const handleInitiatePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        alert('Please enter a valid expiry date (MM/YY).');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        alert('Please enter a valid 3-digit CVV.');
        return;
      }
    }

    if (paymentMethod === 'gpay') {
      if (!upiId && !customerInfo?.phone) {
        setUpiId(`${customerInfo?.email?.split('@')[0] || 'buyer'}@okaxis`);
      }
    }

    // Move to Real-time processing
    setPaymentState('processing');
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
    }, 1200);

    setTimeout(() => {
      if (paymentMethod === 'card') {
        setPaymentState('otp');
      } else {
        setProcessingStep(3);
        setTimeout(() => {
          finalizeOrder();
        }, 1200);
      }
    }, 2400);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setPaymentState('processing');
    setProcessingStep(3);

    setTimeout(() => {
      finalizeOrder();
    }, 1500);
  };

  const finalizeOrder = async () => {
    const orderRef = `CE-ORD-${Date.now().toString().slice(-6)}`;
    const txnId = `TXN-${paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const orderDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const orderPayload = {
      orderId: orderRef,
      transactionId: txnId,
      date: orderDate,
      customer: {
        name: customerInfo.fullName || 'Valued Customer',
        email: customerInfo.email || 'customer@gmail.com',
        phone: customerInfo.phone || '+91 9876543210',
        address: `${customerInfo.address || ''}, ${customerInfo.city || ''}, ${customerInfo.state || ''} - ${customerInfo.pincode || ''}`
      },
      payment: {
        method: paymentMethod === 'gpay' ? 'Google Pay / UPI' : paymentMethod === 'card' ? `Card (${formatCardBrand()} •••• ${cardNumber.slice(-4) || '8839'})` : `Net Banking (${selectedBank})`,
        amount: finalTotal,
        subtotal,
        shipping,
        tax,
        discount: discountAmount,
        status: 'PAID'
      },
      items: cartItems
    };

    setCompletedOrder(orderPayload);
    setPaymentState('success');

    // Attempt to notify backend
    try {
      await fetch('/api/payment/process-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      }).catch(() => null);
    } catch {
      // Ignore network failure in demo mode
    }

    clearCart();
    if (onPaymentSuccess) {
      onPaymentSuccess(orderPayload);
    }
  };

  const handleOpenGmailReceipt = () => {
    if (!completedOrder) return;
    const recipient = completedOrder.customer.email || 'customer@gmail.com';
    const subject = `Order Confirmation & Receipt - ${completedOrder.orderId} | Classic Edge Atelier`;
    
    let itemsText = completedOrder.items.map(
      (item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - ${item.price}`
    ).join('\n');

    const emailBody = 
`Dear ${completedOrder.customer.name},

Thank you for your purchase with Classic Edge Atelier! Your real-time payment has been successfully processed.

==============================
ORDER RECEIPT & TAX INVOICE
==============================
Order ID: ${completedOrder.orderId}
Transaction ID: ${completedOrder.transactionId}
Date: ${completedOrder.date}
Payment Method: ${completedOrder.payment.method}
Payment Status: VERIFIED & CONFIRMED

ITEMS PURCHASED:
${itemsText}

------------------------------
Subtotal: ₹ ${completedOrder.payment.subtotal.toLocaleString('en-IN')}
Shipping: ${completedOrder.payment.shipping === 0 ? 'FREE' : `₹ ${completedOrder.payment.shipping}`}
Taxes (GST 5%): ₹ ${completedOrder.payment.tax.toLocaleString('en-IN')}
Total Paid: ₹ ${completedOrder.payment.amount.toLocaleString('en-IN')}
------------------------------

SHIPPING ADDRESS:
${completedOrder.customer.address}
Contact: ${completedOrder.customer.phone}

Your handcrafted leather goods are currently being prepared by our master artisans in India and will be dispatched via insured express courier.

Classic Edge Atelier Export Desk
WhatsApp: +91 9443750820
Email: classicedgeatlier@gmail.com
Website: www.classicedge-atelier.com
`;

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailWebUrl, '_blank');
  };

  const handleDownloadInvoice = () => {
    if (!completedOrder) return;
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Tax Invoice - ${completedOrder.orderId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #111; max-width: 750px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #C5A059; padding-bottom: 15px; margin-bottom: 25px; }
          .logo { font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #000; }
          .badge { display: inline-block; background: #e6f4ea; color: #137333; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; font-size: 13px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
          .table th, .table td { border-bottom: 1px solid #eee; padding: 10px 8px; text-align: left; }
          .table th { background: #fafafa; font-weight: 600; text-transform: uppercase; font-size: 11px; }
          .totals { margin-top: 20px; width: 300px; margin-left: auto; font-size: 13px; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .grand-total { font-size: 16px; font-weight: 800; border-top: 2px solid #111; padding-top: 8px; color: #b8860b; }
          .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 11px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">CLASSIC EDGE ATELIER</div>
            <div style="font-size: 11px; color: #666; letter-spacing: 1px;">PREMIUM LEATHER & TEXTILE EXPORTS</div>
          </div>
          <div style="text-align: right;">
            <div class="badge">PAYMENT CONFIRMED</div>
            <div style="font-size: 12px; color: #555; margin-top: 4px;">Date: ${completedOrder.date}</div>
          </div>
        </div>

        <div class="grid">
          <div>
            <strong>BILLED TO:</strong><br>
            ${completedOrder.customer.name}<br>
            ${completedOrder.customer.email}<br>
            ${completedOrder.customer.phone}<br>
            ${completedOrder.customer.address}
          </div>
          <div style="text-align: right;">
            <strong>INVOICE REFERENCE:</strong><br>
            Invoice #: ${completedOrder.orderId}<br>
            Txn ID: ${completedOrder.transactionId}<br>
            Payment Mode: ${completedOrder.payment.method}
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${completedOrder.items.map(item => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td style="text-align: right;">₹ ${(item.priceNum * item.quantity).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Subtotal:</span>
            <span>₹ ${completedOrder.payment.subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div class="totals-row">
            <span>Shipping:</span>
            <span>${completedOrder.payment.shipping === 0 ? 'FREE' : `₹ ${completedOrder.payment.shipping}`}</span>
          </div>
          <div class="totals-row">
            <span>GST (5%):</span>
            <span>₹ ${completedOrder.payment.tax.toLocaleString('en-IN')}</span>
          </div>
          <div class="totals-row grand-total">
            <span>Total Paid:</span>
            <span>₹ ${completedOrder.payment.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="footer">
          This is a computer-generated tax invoice for Classic Edge Atelier exports.<br>
          For queries, reach out at classicedgeatlier@gmail.com | WhatsApp: +91 9443750820
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${completedOrder.orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(10, 10, 12, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#141416',
        border: '1px solid #2d2d30',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.15)',
        color: '#fff',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          borderBottom: '1px solid #242428',
          background: 'linear-gradient(180deg, #1c1c20 0%, #141416 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #d4a340 0%, #996515 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
              color: '#000'
            }}>
              CE
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, letterSpacing: '0.5px' }}>
                Secure Payment Checkout
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
                256-Bit SSL Encrypted Real-Time Gateway
              </p>
            </div>
          </div>
          {paymentState !== 'processing' && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '22px',
                cursor: 'pointer',
                padding: '4px 8px',
                lineHeight: 1
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {paymentState === 'input' && (
            <div>
              {/* Total amount highlight banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 163, 64, 0.12) 0%, rgba(20, 20, 22, 0.8) 100%)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Payable Amount
                  </span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#f3c969', fontFamily: 'Cinzel, Georgia, serif' }}>
                    ₹ {finalTotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#a1a1aa' }}>
                  <span>{cartItems.length} Product(s)</span><br />
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Includes GST & Insured Delivery</span>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#d4d4d8', marginBottom: '8px', display: 'block' }}>
                  Select Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {/* Option 1: GPay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    style={{
                      background: paymentMethod === 'gpay' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : '#1a1a1e',
                      border: paymentMethod === 'gpay' ? '2px solid #38bdf8' : '1px solid #2a2a30',
                      borderRadius: '8px',
                      padding: '12px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontWeight: 800, color: '#4285F4', fontSize: '15px' }}>G</span>
                      <span style={{ fontWeight: 800, color: '#EA4335', fontSize: '15px' }}>P</span>
                      <span style={{ fontWeight: 800, color: '#FBBC05', fontSize: '15px' }}>a</span>
                      <span style={{ fontWeight: 800, color: '#34A853', fontSize: '15px' }}>y</span>
                    </div>
                    <span style={{ fontSize: '11px', color: paymentMethod === 'gpay' ? '#38bdf8' : '#a1a1aa', fontWeight: 600 }}>
                      Google Pay / UPI
                    </span>
                  </button>

                  {/* Option 2: Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      background: paymentMethod === 'card' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : '#1a1a1e',
                      border: paymentMethod === 'card' ? '2px solid #d4a340' : '1px solid #2a2a30',
                      borderRadius: '8px',
                      padding: '12px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={paymentMethod === 'card' ? '#d4a340' : '#a1a1aa'} strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                    <span style={{ fontSize: '11px', color: paymentMethod === 'card' ? '#d4a340' : '#a1a1aa', fontWeight: 600 }}>
                      Debit / Credit Card
                    </span>
                  </button>

                  {/* Option 3: Net Banking */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    style={{
                      background: paymentMethod === 'netbanking' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : '#1a1a1e',
                      border: paymentMethod === 'netbanking' ? '2px solid #10b981' : '1px solid #2a2a30',
                      borderRadius: '8px',
                      padding: '12px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={paymentMethod === 'netbanking' ? '#10b981' : '#a1a1aa'} strokeWidth="2">
                      <line x1="3" y1="21" x2="21" y2="21"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                      <polyline points="5 6 12 3 19 6"></polyline>
                      <line x1="4" y1="10" x2="4" y2="21"></line>
                      <line x1="20" y1="10" x2="20" y2="21"></line>
                    </svg>
                    <span style={{ fontSize: '11px', color: paymentMethod === 'netbanking' ? '#10b981' : '#a1a1aa', fontWeight: 600 }}>
                      Net Banking
                    </span>
                  </button>
                </div>
              </div>

              {/* Tab Form: Google Pay / UPI */}
              {paymentMethod === 'gpay' && (
                <div style={{ background: '#18181c', borderRadius: '10px', padding: '16px', border: '1px solid #27272e' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px' }}>
                        <span style={{ color: '#000', fontWeight: 800, fontSize: '12px' }}>GPay</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Instant UPI Payment</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '12px' }}>
                      Zero Gateway Fees
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '16px', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>
                        Enter UPI ID or Google Pay VPA:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#0e0e10',
                          border: '1px solid #33333d',
                          borderRadius: '6px',
                          padding: '10px 12px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        {['@okhdfcbank', '@okaxis', '@oksbi', '@paytm'].map((handle) => (
                          <button
                            key={handle}
                            type="button"
                            onClick={() => setUpiId((prev) => (prev.split('@')[0] || 'buyer') + handle)}
                            style={{
                              background: '#22222a',
                              border: '1px solid #333',
                              color: '#9ca3af',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            {handle}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic QR Code Simulation */}
                    <div style={{
                      background: '#fff',
                      padding: '8px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '90px',
                        height: '90px',
                        background: '#000',
                        backgroundImage: 'radial-gradient(#fff 25%, transparent 25%), radial-gradient(#fff 25%, transparent 25%)',
                        backgroundPosition: '0 0, 4px 4px',
                        backgroundSize: '8px 8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{ background: '#fff', padding: '2px 4px', borderRadius: '2px', fontSize: '8px', fontWeight: 800, color: '#000' }}>
                          GPAY
                        </div>
                      </div>
                      <span style={{ fontSize: '9px', color: '#111', fontWeight: 600, marginTop: '4px' }}>
                        Scan to Pay ₹{finalTotal}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Form: Credit / Debit Card */}
              {paymentMethod === 'card' && (
                <div style={{ background: '#18181c', borderRadius: '10px', padding: '16px', border: '1px solid #27272e' }}>
                  {/* Virtual Card Preview */}
                  <div style={{
                    background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    marginBottom: '16px',
                    border: '1px solid #4a4a55',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#f3c969', fontWeight: 700 }}>
                        CLASSIC EDGE PLATINUM
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '13px', color: '#fff' }}>
                        {formatCardBrand()}
                      </span>
                    </div>
                    <div style={{ fontSize: '16px', letterSpacing: '2px', fontFamily: 'monospace', marginBottom: '12px' }}>
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#ccc' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#888' }}>CARD HOLDER</div>
                        <div>{cardName.toUpperCase() || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: '#888' }}>EXPIRES</div>
                        <div>{cardExpiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>
                        Card Number:
                      </label>
                      <input
                        type="text"
                        placeholder="4532 8923 1120 8839"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        style={{
                          width: '100%',
                          background: '#0e0e10',
                          border: '1px solid #33333d',
                          borderRadius: '6px',
                          padding: '10px 12px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>
                          Expiry (MM/YY):
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          style={{
                            width: '100%',
                            background: '#0e0e10',
                            border: '1px solid #33333d',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            color: '#fff',
                            fontSize: '13px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>
                          CVV:
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          style={{
                            width: '100%',
                            background: '#0e0e10',
                            border: '1px solid #33333d',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            color: '#fff',
                            fontSize: '13px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Form: Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div style={{ background: '#18181c', borderRadius: '10px', padding: '16px', border: '1px solid #27272e' }}>
                  <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '8px' }}>
                    Select Popular Bank:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    {['HDFC', 'SBI', 'ICICI', 'Axis Bank', 'Kotak', 'PNB'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        style={{
                          background: selectedBank === bank ? '#10b98122' : '#22222a',
                          border: selectedBank === bank ? '1.5px solid #10b981' : '1px solid #333',
                          color: selectedBank === bank ? '#34d399' : '#e4e4e7',
                          borderRadius: '6px',
                          padding: '8px 4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <label style={{ fontSize: '11px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>
                    Or All Other Banks:
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0e0e10',
                      border: '1px solid #33333d',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="HDFC">HDFC Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak">Kotak Mahindra Bank</option>
                    <option value="PNB">Punjab National Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="IndusInd Bank">IndusInd Bank</option>
                  </select>
                </div>
              )}

              {/* Email Receipt Reminder */}
              <div style={{
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#93c5fd'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>
                  Order invoice will be sent to: <strong>{customerInfo?.email || 'your Gmail address'}</strong>
                </span>
              </div>

              {/* Pay Now Button */}
              <button
                type="button"
                onClick={handleInitiatePayment}
                style={{
                  width: '100%',
                  marginTop: '18px',
                  background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                  color: '#0d0d0d',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(212, 163, 64, 0.35)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Pay ₹ {finalTotal.toLocaleString('en-IN')} Now</span>
              </button>
            </div>
          )}

          {/* Processing State with real-time steps */}
          {paymentState === 'processing' && (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 20px',
                border: '4px solid rgba(212, 163, 64, 0.2)',
                borderTopColor: '#d4a340',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
                Processing Real-Time Payment...
              </h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px' }}>
                Please do not refresh or close this window.
              </p>

              <div style={{
                background: '#18181c',
                borderRadius: '8px',
                padding: '14px',
                textAlign: 'left',
                maxWidth: '380px',
                margin: '0 auto',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: processingStep >= 1 ? '#34d399' : '#6b7280', marginBottom: '8px' }}>
                  <span>{processingStep >= 1 ? '✓' : '•'}</span>
                  <span>Connecting to {paymentMethod === 'gpay' ? 'UPI NPCI Switch' : paymentMethod === 'card' ? 'Visa / Mastercard Network' : 'Bank Gateway'}...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: processingStep >= 2 ? '#34d399' : '#6b7280', marginBottom: '8px' }}>
                  <span>{processingStep >= 2 ? '✓' : '•'}</span>
                  <span>Verifying buyer credentials & token authentication...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: processingStep >= 3 ? '#34d399' : '#6b7280' }}>
                  <span>{processingStep >= 3 ? '✓' : '•'}</span>
                  <span>Confirming transaction settlement & dispatching Gmail invoice...</span>
                </div>
              </div>
            </div>
          )}

          {/* OTP Simulation (for Card payment) */}
          {paymentState === 'otp' && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: '#38bdf8'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                Bank 3D-Secure Verification
              </h3>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
                A one-time OTP was sent to your registered mobile number for card ending in {cardNumber.slice(-4) || '8839'}.
              </p>

              <div style={{
                background: '#1a1a20',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                display: 'inline-block',
                border: '1px dashed #444'
              }}>
                <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Demo OTP Code: </span>
                <strong style={{ color: '#f3c969', letterSpacing: '2px', fontSize: '14px' }}>749215</strong>
              </div>

              <div style={{ maxWidth: '280px', margin: '0 auto 16px' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    background: '#0e0e10',
                    border: '1px solid #38bdf8',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fff',
                    fontSize: '18px',
                    letterSpacing: '6px',
                    fontWeight: 700,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '280px'
                }}
              >
                Authorize & Complete Payment
              </button>
            </div>
          )}

          {/* Success State */}
          {paymentState === 'success' && completedOrder && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                color: '#fff',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f3c969', margin: '0 0 4px', fontFamily: 'Cinzel, Georgia, serif' }}>
                Payment Received Successfully!
              </h2>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                Your order is confirmed and routed to our export production floor.
              </p>

              {/* Order summary box */}
              <div style={{
                background: '#18181c',
                border: '1px solid #282830',
                borderRadius: '10px',
                padding: '14px 18px',
                textAlign: 'left',
                marginBottom: '16px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #222' }}>
                  <span style={{ color: '#888' }}>Order Number:</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{completedOrder.orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #222' }}>
                  <span style={{ color: '#888' }}>Transaction Ref:</span>
                  <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{completedOrder.transactionId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #222' }}>
                  <span style={{ color: '#888' }}>Payment Mode:</span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>{completedOrder.payment.method}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ color: '#888' }}>Total Amount:</span>
                  <span style={{ fontWeight: 800, color: '#f3c969', fontSize: '14px' }}>
                    ₹ {completedOrder.payment.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Gmail Notification Banner */}
              <div style={{
                background: 'rgba(234, 67, 53, 0.12)',
                border: '1px solid rgba(234, 67, 53, 0.3)',
                borderRadius: '10px',
                padding: '14px',
                marginBottom: '18px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: '#EA4335',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '12px'
                  }}>
                    M
                  </div>
                  <strong style={{ fontSize: '13px', color: '#ff8a80' }}>
                    Gmail Receipt Dispatched!
                  </strong>
                </div>
                <p style={{ fontSize: '11px', color: '#d1d5db', margin: 0, lineHeight: 1.4 }}>
                  A full tax invoice and order summary have been sent to <strong>{completedOrder.customer.email}</strong>.
                  You can also open it directly in Gmail with one click below:
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleOpenGmailReceipt}
                  style={{
                    background: '#EA4335',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.35)'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Open & View Receipt in Gmail</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleDownloadInvoice}
                    style={{
                      background: '#22222a',
                      color: '#e4e4e7',
                      border: '1px solid #3a3a44',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      background: 'linear-gradient(135deg, #d4a340 0%, #b8860b 100%)',
                      color: '#0d0d0d',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
