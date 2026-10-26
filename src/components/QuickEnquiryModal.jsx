import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/productsData';
import { CONTACT_INFO } from '../data/marketsData';

export default function QuickEnquiryModal({ isOpen, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    businessEmail: '',
    contactNumber: '',
    country: '',
    productCategory: '',
    productName: '',
    orderQuantity: '',
    enquiryType: 'Wholesale',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'email_dispatched' | 'whatsapp_dispatched' | null
  const [copied, setCopied] = useState(false);
  const [lastEnquiry, setLastEnquiry] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        productCategory: initialData.productCategory || 'Leather Shoes',
        productName: initialData.productName || '',
        enquiryType: initialData.enquiryType || 'Wholesale',
        message: initialData.productName ? `Hello Classic Edge Atelier, we would like to enquire about bulk quotation, specifications, and sample feasibility for: ${initialData.productName}.` : ''
      }));
      setErrors({});
      setSubmitStatus(null);
      setCopied(false);
      setLastEnquiry(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number or WhatsApp is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.productCategory.trim()) newErrors.productCategory = 'Please select a product category';
    if (!formData.message.trim()) newErrors.message = 'Please describe your requirement or specifications';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEnquiryLocally = (method) => {
    try {
      const existing = JSON.parse(localStorage.getItem('classic_edge_enquiries') || '[]');
      const record = {
        id: `RFQ-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        dateDisplay: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        channel: method,
        buyer: { ...formData },
        status: 'New'
      };
      existing.unshift(record);
      localStorage.setItem('classic_edge_enquiries', JSON.stringify(existing));
      return record;
    } catch (e) {
      console.warn('Could not save enquiry locally:', e);
      return null;
    }
  };

  const buildMessageContent = () => {
    return (
      `Dear Classic Edge Atelier Export Team,\n\n` +
      `We wish to submit the following bulk wholesale enquiry for evaluation:\n\n` +
      `• Contact Person: ${formData.fullName}\n` +
      `• Company Name: ${formData.companyName}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• Contact / WhatsApp: ${formData.contactNumber}\n` +
      `• Country of Import: ${formData.country}\n` +
      `• Product Category: ${formData.productCategory}\n` +
      `${formData.productName ? `• Selected Product Model: ${formData.productName}\n` : ''}` +
      `• Estimated Order Quantity: ${formData.orderQuantity || 'Open for discussion'}\n` +
      `• Type of Enquiry: ${formData.enquiryType}\n\n` +
      `Requirements & Specifications:\n${formData.message}\n\n` +
      `Destination Official Desk: ${CONTACT_INFO.email}\n` +
      `Origin: India`
    );
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = `*New B2B Wholesale Enquiry - Classic Edge Atelier*\n` +
      `--------------------------------\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Company:* ${formData.companyName}\n` +
      `*Email:* ${formData.businessEmail}\n` +
      `*Phone/WhatsApp:* ${formData.contactNumber}\n` +
      `*Country:* ${formData.country}\n` +
      `*Category:* ${formData.productCategory}\n` +
      `${formData.productName ? `*Product Model:* ${formData.productName}\n` : ''}` +
      `*Est. Quantity:* ${formData.orderQuantity || 'Open for discussion'}\n` +
      `*Enquiry Type:* ${formData.enquiryType}\n` +
      `*Specifications:*\n${formData.message}`;

    const saved = saveEnquiryLocally('WhatsApp');
    setLastEnquiry({ body: formattedMessage, saved });
    setSubmitStatus('whatsapp_dispatched');

    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encoded}`, '_blank');
  };

  const handleEmailSend = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `B2B Wholesale Enquiry: ${formData.companyName} - ${formData.productCategory} | Classic Edge Atelier`;
    const body = buildMessageContent();

    const saved = saveEnquiryLocally('Email');
    setLastEnquiry({ subject, body, saved });
    setSubmitStatus('email_dispatched');

    // Trigger standard mailto for native client (Outlook/Apple Mail/Windows Mail)
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyDetails = () => {
    if (!lastEnquiry?.body) return;
    navigator.clipboard.writeText(lastEnquiry.body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge-dark" style={{ marginBottom: 6 }}>Export Trade Desk</span>
            <h3 id="modal-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#ffffff' }}>
              Wholesale & Export Enquiry
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close enquiry modal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {submitStatus ? (
            <div style={{
              background: '#18181c',
              border: '1.5px solid #10b981',
              borderRadius: '12px',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1.5px solid #10b981',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h4 style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '20px',
                color: '#ffffff',
                marginBottom: '8px',
                fontWeight: 700
              }}>
                {submitStatus === 'email_dispatched' 
                  ? 'Enquiry Dispatched to Email Desk' 
                  : 'WhatsApp Export Desk Connected'}
              </h4>

              <div style={{
                display: 'inline-block',
                background: 'rgba(212, 163, 64, 0.12)',
                border: '1px solid rgba(212, 163, 64, 0.3)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#f5e2b8',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '14px'
              }}>
                REF: {lastEnquiry?.saved?.id || 'CEA-ENQUIRY'} • OFFICIAL DESK: classicedgeatelier@gmail.com
              </div>

              <p style={{
                fontSize: '13.5px',
                color: '#d4d0c7',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 auto 20px'
              }}>
                {submitStatus === 'email_dispatched'
                  ? 'Your enquiry has been prepared for classicedgeatelier@gmail.com and dispatched to your mail client. If your email application did not launch automatically, click below to open directly in Gmail Web or copy the formatted text.'
                  : 'Your pre-formatted quotation request has been sent to WhatsApp (+91 9443750820). You can also send a copy directly to our official email desk below:'}
              </p>

              {/* Action buttons in success state */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                {submitStatus === 'email_dispatched' && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_INFO.email)}&su=${encodeURIComponent(lastEnquiry?.subject || '')}&body=${encodeURIComponent(lastEnquiry?.body || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Open in Gmail Web</span>
                  </a>
                )}

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCopyDetails}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Enquiry Text'}</span>
                </button>

                {submitStatus === 'whatsapp_dispatched' && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleEmailSend}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Also Send to Email Desk</span>
                  </button>
                )}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'center', gap: '14px' }}>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a6a29a',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  ← Edit Enquiry Form
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#d4a340',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close Window ✕
                </button>
              </div>
            </div>
          ) : (
            <form noValidate>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="m-fullName">
                    Full Name <span className="form-required">*</span>
                  </label>
                  <input
                    id="m-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="e.g. Tariq Al-Mansoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-companyName">
                    Company Name <span className="form-required">*</span>
                  </label>
                  <input
                    id="m-companyName"
                    type="text"
                    className={`form-input ${errors.companyName ? 'error' : ''}`}
                    placeholder="e.g. Gulf Retail Trading LLC"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                  {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="m-businessEmail">
                    Business Email <span className="form-required">*</span>
                  </label>
                  <input
                    id="m-businessEmail"
                    type="email"
                    className={`form-input ${errors.businessEmail ? 'error' : ''}`}
                    placeholder="name@company.com"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                  {errors.businessEmail && <span className="form-error-msg">{errors.businessEmail}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-contactNumber">
                    Contact / WhatsApp Number <span className="form-required">*</span>
                  </label>
                  <input
                    id="m-contactNumber"
                    type="tel"
                    className={`form-input ${errors.contactNumber ? 'error' : ''}`}
                    placeholder="e.g. +971 50 123 4567"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  />
                  {errors.contactNumber && <span className="form-error-msg">{errors.contactNumber}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="m-country">
                    Country <span className="form-required">*</span>
                  </label>
                  <input
                    id="m-country"
                    type="text"
                    className={`form-input ${errors.country ? 'error' : ''}`}
                    placeholder="e.g. UAE, Saudi Arabia, Qatar, Oman..."
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                  {errors.country && <span className="form-error-msg">{errors.country}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-productCategory">
                    Product Category <span className="form-required">*</span>
                  </label>
                  <select
                    id="m-productCategory"
                    className={`form-select ${errors.productCategory ? 'error' : ''}`}
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.productCategory && <span className="form-error-msg">{errors.productCategory}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="m-orderQuantity">
                    Estimated Order Quantity
                  </label>
                  <input
                    id="m-orderQuantity"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 200 pairs, 500 units, carton quantity"
                    value={formData.orderQuantity}
                    onChange={(e) => setFormData({ ...formData, orderQuantity: e.target.value })}
                  />
                  <span className="form-hint">Quantities and MOQs are open for discussion</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-enquiryType">
                    Type of Enquiry
                  </label>
                  <select
                    id="m-enquiryType"
                    className="form-select"
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                  >
                    <option value="Wholesale">Wholesale Supply</option>
                    <option value="Bulk Supply">Bulk Sourcing</option>
                    <option value="Private Label">Private Label & Custom Branding</option>
                    <option value="Customisation">Customisation Discussion</option>
                    <option value="General Enquiry">General Trade Enquiry</option>
                  </select>
                </div>
              </div>

              {formData.productName && (
                <div className="form-group">
                  <label className="form-label">Product Selected</label>
                  <div style={{ padding: '10px 14px', background: 'rgba(212, 163, 64, 0.12)', border: '1px solid rgba(212, 163, 64, 0.3)', borderRadius: 8, fontSize: '0.9rem', color: '#f5e2b8', fontWeight: 600 }}>
                    {formData.productName}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="m-message">
                  Specifications & Requirements <span className="form-required">*</span>
                </label>
                <textarea
                  id="m-message"
                  rows="4"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Share your specific dimensions, material requirements, branding needs, or target delivery destination."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              {/* Clean High-Contrast Action Box */}
              <div style={{
                marginTop: '24px',
                background: '#19191d',
                border: '1.5px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#d4a340'
                    }}></span>
                    <span style={{
                      fontFamily: 'Cinzel, Georgia, serif',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: '#f5e2b8',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Official Export Desk Dispatch
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#a6a29a' }}>
                    Desk Email: <strong style={{ color: '#fff' }}>classicedgeatelier@gmail.com</strong>
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: '#b8b4ab', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  Select your dispatch method. Both channels format your enquiry and deliver it directly to our export evaluation desk.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
                  <button 
                    type="button" 
                    className="btn-whatsapp" 
                    onClick={handleWhatsAppSend}
                    title="Open direct WhatsApp chat with pre-filled enquiry"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.027-.474-1.636-.676-2.69-2.348-2.771-2.457-.082-.109-.659-.877-.659-1.674 0-.796.417-1.189.565-1.353.149-.164.324-.205.433-.205.109 0 .218.001.313.006.1.005.234-.038.366.279.136.328.465 1.135.506 1.218.041.083.069.179.014.288-.055.109-.082.177-.164.273-.082.096-.172.214-.246.288-.082.083-.167.172-.072.336.095.164.423.698.908 1.129.624.555 1.15.727 1.314.809.164.082.261.069.358-.041.096-.11.41-4.78.52-6.42.109-.164.218-.137.368-.082.15.055.952.449 1.116.531.164.082.273.123.313.191.041.068.041.396-.103.801zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.176L2 22l4.981-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.611 0-3.11-.479-4.368-1.303l-.313-.206-2.887.803.803-2.822-.206-.328A8.204 8.204 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z"/>
                    </svg>
                    <span>Send via WhatsApp (+91 9443750820)</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleEmailSend}
                    title="Send formal quotation request to classicedgeatelier@gmail.com"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Send via Email Desk</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
