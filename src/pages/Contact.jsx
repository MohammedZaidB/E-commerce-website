import React, { useState } from 'react';
import SEO from '../components/SEO';
import { CATEGORIES } from '../data/productsData';
import { CONTACT_INFO, TARGET_MARKETS } from '../data/marketsData';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    businessEmail: '',
    contactNumber: '',
    country: '',
    productCategory: 'Leather Shoes',
    orderQuantity: '',
    enquiryType: 'Wholesale',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'instructions' | null
  const [activeMethod, setActiveMethod] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      errs.businessEmail = 'Please provide a valid business email address';
    }
    if (!formData.contactNumber.trim()) errs.contactNumber = 'Contact number or WhatsApp is required';
    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.productCategory.trim()) errs.productCategory = 'Please select a product category';
    if (!formData.message.trim()) errs.message = 'Please provide details of your requirement';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateWhatsAppMessage = () => {
    return `*New B2B Wholesale Enquiry - Classic Edge Atelier*\n` +
      `--------------------------------\n` +
      `*Full Name:* ${formData.fullName}\n` +
      `*Company Name:* ${formData.companyName}\n` +
      `*Business Email:* ${formData.businessEmail}\n` +
      `*Contact / WhatsApp:* ${formData.contactNumber}\n` +
      `*Country:* ${formData.country}\n` +
      `*Product Category:* ${formData.productCategory}\n` +
      `*Estimated Quantity:* ${formData.orderQuantity || 'To be discussed'}\n` +
      `*Type of Enquiry:* ${formData.enquiryType}\n` +
      `*Message / Specifications:* ${formData.message}`;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setActiveMethod('whatsapp');
    const encoded = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encoded}`, '_blank');
    setStatus('success');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setActiveMethod('email');
    const subject = encodeURIComponent(`B2B Wholesale Enquiry: ${formData.companyName} [${formData.enquiryType}]`);
    const body = encodeURIComponent(
      `Dear Classic Edge Export Team,\n\n` +
      `We wish to submit the following commercial enquiry for your evaluation:\n\n` +
      `• Full Name: ${formData.fullName}\n` +
      `• Company Name: ${formData.companyName}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• Contact / WhatsApp: ${formData.contactNumber}\n` +
      `• Country: ${formData.country}\n` +
      `• Product Category: ${formData.productCategory}\n` +
      `• Estimated Order Quantity: ${formData.orderQuantity || 'Open for discussion'}\n` +
      `• Type of Enquiry: ${formData.enquiryType}\n\n` +
      `Requirements & Specifications:\n${formData.message}\n\n` +
      `Sincerely,\n${formData.fullName}\n${formData.companyName}`
    );

    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    setStatus('success');
  };

  return (
    <>
      <SEO 
        title="Contact Us | Wholesale & Export Sourcing Desk"
        description="Contact Classic Edge Atelier for wholesale inquiries, bulk quotes, and private-label manufacturing discussions. Email: classicedgeatlier@gmail.com, WhatsApp: +91 9443750820."
      />

      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <span className="badge-dark" style={{ marginBottom: 12 }}>Direct Communication</span>
            <h1 className="page-banner-title">
              Contact Classic Edge
            </h1>
            <p className="page-banner-desc">
              We encourage international buyers, importers, and brand owners to share their commercial requirements. Our export team responds promptly to evaluate specifications and quotations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Split */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream-bg)' }}>
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left: Official Contact Desk Information */}
            <div className="contact-info-panel">
              <span className="badge-dark" style={{ alignSelf: 'flex-start', marginBottom: 16 }}>Official Desk</span>
              <h2 className="contact-info-title">
                Direct Export Channels
              </h2>
              <p className="contact-info-desc">
                Connect directly with our export desk through WhatsApp or email. We ensure transparent pricing, dedicated discussion on specifications, and responsive business dialogue.
              </p>

              <div className="contact-channels-list">
                {/* Email Channel */}
                <a href={CONTACT_INFO.emailLink} className="contact-channel-card" title="Click to email via Gmail">
                  <div className="contact-channel-icon" style={{ background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                      <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
                      <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C8.132,7.553,5.637,8.083,4.516,9.986L3,12.298z"></path>
                      <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341c1.744-1.306,4.239-0.776,5.36,1.127L45,12.298z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="contact-channel-label">Official Business Email</span>
                    <div className="contact-channel-value" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f5f3ef' }}>{CONTACT_INFO.email}</div>
                    <span style={{ fontSize: '0.85rem', color: '#ea4335', marginTop: 4, display: 'block', fontWeight: 600 }}>
                      Click to compose email in Gmail &rarr;
                    </span>
                  </div>
                </a>

                {/* WhatsApp Channel */}
                <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-channel-card">
                  <div className="contact-channel-icon whatsapp">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.027-.474-1.636-.676-2.69-2.348-2.771-2.457-.082-.109-.659-.877-.659-1.674 0-.796.417-1.189.565-1.353.149-.164.324-.205.433-.205.109 0 .218.001.313.006.1.005.234-.038.366.279.136.328.465 1.135.506 1.218.041.083.069.179.014.288-.055.109-.082.177-.164.273-.082.096-.172.214-.246.288-.082.083-.167.172-.072.336.095.164.423.698.908 1.129.624.555 1.15.727 1.314.809.164.082.261.069.358-.041.096-.11.41-4.78.52-6.42.109-.164.218-.137.368-.082.15.055.952.449 1.116.531.164.082.273.123.313.191.041.068.041.396-.103.801zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.176L2 22l4.981-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.611 0-3.11-.479-4.368-1.303l-.313-.206-2.887.803.803-2.822-.206-.328A8.204 8.204 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="contact-channel-label">Direct WhatsApp / Call Desk</span>
                    <div className="contact-channel-value" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f5f3ef' }}>{CONTACT_INFO.whatsappNumber}</div>
                    <span style={{ fontSize: '0.8rem', color: '#25D366', marginTop: 4, display: 'block' }}>
                      Click to open direct chat &rarr;
                    </span>
                  </div>
                </a>

                {/* Country of Origin */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon origin">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="contact-channel-label">Country of Origin</span>
                    <div className="contact-channel-value">India</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-tan-light)', marginTop: 4, display: 'block' }}>
                      Wholesale supply & international export
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-on-dark-muted)', display: 'block', marginBottom: 10 }}>
                  Primary Target Markets:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {TARGET_MARKETS.map(m => (
                    <span key={m.shortCode} className="badge-dark" style={{ fontSize: '0.72rem', padding: '4px 8px' }}>
                      {m.flag} {m.country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Wholesale Enquiry Form */}
            <div className="contact-form-panel">
              <div style={{ marginBottom: 28 }}>
                <span className="badge-tan" style={{ marginBottom: 10 }}>Commercial Quotation</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                  Wholesale Enquiry Form
                </h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                  Please share your business details and requirements below. Required fields are marked with an asterisk (<span style={{ color: 'var(--color-error)' }}>*</span>).
                </p>
              </div>

              {status === 'success' && (
                <div className="form-status-alert success">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div>
                    <strong>Enquiry Prepared Successfully!</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem' }}>
                      {activeMethod === 'whatsapp' 
                        ? 'Your message has been formatted and opened in WhatsApp. Please press send to connect with our export desk.'
                        : 'Your email draft has been opened with your default mail application. Please review and send your enquiry.'
                      }
                    </p>
                  </div>
                </div>
              )}

              <form noValidate>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-fullName">
                      Full Name <span className="form-required">*</span>
                    </label>
                    <input
                      id="cf-fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="e.g. Abdullah Al-Otaibi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-companyName">
                      Company Name <span className="form-required">*</span>
                    </label>
                    <input
                      id="cf-companyName"
                      type="text"
                      className={`form-input ${errors.companyName ? 'error' : ''}`}
                      placeholder="e.g. Modern Gulf Footwear W.L.L."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                    {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-businessEmail">
                      Business Email <span className="form-required">*</span>
                    </label>
                    <input
                      id="cf-businessEmail"
                      type="email"
                      className={`form-input ${errors.businessEmail ? 'error' : ''}`}
                      placeholder="buyer@company.com"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    />
                    {errors.businessEmail && <span className="form-error-msg">{errors.businessEmail}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-contactNumber">
                      Contact Number <span className="form-required">*</span>
                    </label>
                    <input
                      id="cf-contactNumber"
                      type="tel"
                      className={`form-input ${errors.contactNumber ? 'error' : ''}`}
                      placeholder="e.g. +971 50 987 6543"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    />
                    {errors.contactNumber && <span className="form-error-msg">{errors.contactNumber}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-country">
                      Country <span className="form-required">*</span>
                    </label>
                    <input
                      id="cf-country"
                      type="text"
                      className={`form-input ${errors.country ? 'error' : ''}`}
                      placeholder="e.g. UAE, Saudi Arabia, Qatar, Kuwait..."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    {errors.country && <span className="form-error-msg">{errors.country}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-productCategory">
                      Product Category <span className="form-required">*</span>
                    </label>
                    <select
                      id="cf-productCategory"
                      className={`form-select ${errors.productCategory ? 'error' : ''}`}
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.productCategory && <span className="form-error-msg">{errors.productCategory}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-orderQuantity">
                      Estimated Order Quantity
                    </label>
                    <input
                      id="cf-orderQuantity"
                      type="text"
                      className="form-input"
                      placeholder="e.g. 500 pairs, 1,000 units"
                      value={formData.orderQuantity}
                      onChange={(e) => setFormData({ ...formData, orderQuantity: e.target.value })}
                    />
                    <span className="form-hint">Available on discussion</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-enquiryType">
                      Type of Enquiry <span className="form-required">*</span>
                    </label>
                    <select
                      id="cf-enquiryType"
                      className="form-select"
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    >
                      <option value="Wholesale">Wholesale Supply</option>
                      <option value="Bulk Supply">Bulk Sourcing</option>
                      <option value="Private Label">Private Label Manufacturing</option>
                      <option value="Customisation">Customisation Discussion</option>
                      <option value="General Enquiry">General Trade Enquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cf-message">
                    Message & Business Requirements <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    rows="4"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Provide details regarding your target styles, desired delivery port, packaging specifications, or custom branding requirements."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {errors.message && <span className="form-error-msg">{errors.message}</span>}
                </div>

                {/* Submission Action Buttons */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 30 }}>
                  <button
                    type="button"
                    className="btn-whatsapp"
                    style={{ flex: '1 1 220px' }}
                    onClick={handleWhatsAppSubmit}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.027-.474-1.636-.676-2.69-2.348-2.771-2.457-.082-.109-.659-.877-.659-1.674 0-.796.417-1.189.565-1.353.149-.164.324-.205.433-.205.109 0 .218.001.313.006.1.005.234-.038.366.279.136.328.465 1.135.506 1.218.041.083.069.179.014.288-.055.109-.082.177-.164.273-.082.096-.172.214-.246.288-.082.083-.167.172-.072.336.095.164.423.698.908 1.129.624.555 1.15.727 1.314.809.164.082.261.069.358-.041.096-.11.41-4.78.52-6.42.109-.164.218-.137.368-.082.15.055.952.449 1.116.531.164.082.273.123.313.191.041.068.041.396-.103.801zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.176L2 22l4.981-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.611 0-3.11-.479-4.368-1.303l-.313-.206-2.887.803.803-2.822-.206-.328A8.204 8.204 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z"/>
                    </svg>
                    <span>Submit via WhatsApp (+91 9443750820)</span>
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    style={{ flex: '1 1 220px' }}
                    onClick={handleEmailSubmit}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Submit via Email Desk</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
