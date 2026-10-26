import React, { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { CATEGORIES } from '../data/productsData';
import { CONTACT_INFO } from '../data/marketsData';

export default function PrivateLabel() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    businessEmail: '',
    whatsappNumber: '',
    country: '',
    productCategory: 'Leather Shoes',
    estimatedQuantity: '',
    brandingRequirements: 'Logo Debossing / Hot Stamping',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const brandingOptions = [
    'Logo Debossing / Blind Stamping',
    'Gold / Silver Foil Stamping',
    'Custom Metal Hardware & Buckles',
    'Custom Woven Inner Labels / Badges',
    'Bespoke Retail Boxes & Dust Bags',
    'Multiple Custom Options (To be discussed)'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.contactPersonName.trim()) errs.contactPersonName = "Contact person's name is required";
    if (!formData.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      errs.businessEmail = 'Please provide a valid business email';
    }
    if (!formData.whatsappNumber.trim()) errs.whatsappNumber = 'WhatsApp or phone number is required';
    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.productCategory.trim()) errs.productCategory = 'Product category is required';
    if (!formData.message.trim()) errs.message = 'Please provide your custom specifications';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveEnquiryLocally = (method) => {
    try {
      const existing = JSON.parse(localStorage.getItem('classic_edge_enquiries') || '[]');
      const record = {
        id: `PL-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        dateDisplay: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        channel: method,
        buyer: {
          fullName: formData.contactPersonName,
          companyName: formData.companyName,
          businessEmail: formData.businessEmail,
          contactNumber: formData.whatsappNumber,
          country: formData.country,
          productCategory: formData.productCategory,
          orderQuantity: formData.estimatedQuantity,
          enquiryType: 'Private Label & Custom Branding',
          message: `Branding: ${formData.brandingRequirements} | Details: ${formData.message}`
        },
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

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedText = `*Private Label & Customisation Discussion - Classic Edge Atelier*\n` +
      `--------------------------------\n` +
      `*Company:* ${formData.companyName}\n` +
      `*Contact Person:* ${formData.contactPersonName}\n` +
      `*Business Email:* ${formData.businessEmail}\n` +
      `*WhatsApp:* ${formData.whatsappNumber}\n` +
      `*Country:* ${formData.country}\n` +
      `*Product Category:* ${formData.productCategory}\n` +
      `*Est. Order Quantity:* ${formData.estimatedQuantity || 'To be discussed'}\n` +
      `*Branding Requirement:* ${formData.brandingRequirements}\n` +
      `*Specifications / Message:* ${formData.message}`;

    saveEnquiryLocally('WhatsApp');
    const encoded = encodeURIComponent(formattedText);
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encoded}`, '_blank');
    setSubmitSuccess(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Private Label Enquiry: ${formData.companyName} - ${formData.productCategory} | Classic Edge Atelier`;
    const body = 
      `Dear Classic Edge Atelier Export Team,\n\n` +
      `We wish to discuss a private label / custom manufacturing partnership:\n\n` +
      `• Company Name: ${formData.companyName}\n` +
      `• Contact Person: ${formData.contactPersonName}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• WhatsApp / Phone: ${formData.whatsappNumber}\n` +
      `• Country: ${formData.country}\n` +
      `• Target Product Category: ${formData.productCategory}\n` +
      `• Estimated Order Quantity: ${formData.estimatedQuantity || 'Open for discussion'}\n` +
      `• Custom Branding Options: ${formData.brandingRequirements}\n\n` +
      `Specifications & Technical Scope:\n${formData.message}\n\n` +
      `Destination Desk: ${CONTACT_INFO.email}\n` +
      `Origin: India`;

    saveEnquiryLocally('Email');
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitSuccess(true);
  };

  return (
    <>
      <SEO 
        title="Private Label & Customisation | Your Brand, Our Manufacturing Partnership"
        description="Collaborate with Classic Edge for private label leather goods, custom branding, debossing, hardware customization, packaging options, and contract manufacturing from India."
      />

      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <span className="badge-dark" style={{ marginBottom: 12 }}>OEM & Contract Manufacturing</span>
            <h1 className="page-banner-title">
              Your Brand. Our Manufacturing Partnership.
            </h1>
            <p className="page-banner-desc">
              Discuss customized branding, product specifications, packaging requirements, and product selection according to feasibility. We work with private brands, retail distributors, and hospitality houses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Process & Capabilities Overview */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            pretitle="Contract Manufacturing Process"
            title="A Structured Path to Launching Your Private Collection"
            subtitle="We maintain an open, consultative collaboration process to translate your brand design guidelines into tangible, export-quality products."
          />

          <div className="process-grid" style={{ marginBottom: 70 }}>
            <div className="process-card">
              <div className="process-number">01</div>
              <h3 className="process-title">Submit Requirements</h3>
              <p className="process-desc">
                Submit your product, branding parameters, target audience, and initial volume estimates through our customisation desk.
              </p>
            </div>
            <div className="process-card">
              <div className="process-number">02</div>
              <h3 className="process-title">Discuss Specifications</h3>
              <p className="process-desc">
                Consult on leather grades, stitch detailing, sole types, custom branding feasibility, and mutually agreeable order quantities.
              </p>
            </div>
            <div className="process-card">
              <div className="process-number">03</div>
              <h3 className="process-title">Review Quotations & Samples</h3>
              <p className="process-desc">
                Receive comprehensive commercial pricing and review sample availability or development options where feasible for your project.
              </p>
            </div>
            <div className="process-card">
              <div className="process-number">04</div>
              <h3 className="process-title">Confirm Agreed Details</h3>
              <p className="process-desc">
                Confirm all technical specifications, packaging standards, quality checklists, and delivery timeframes prior to order execution.
              </p>
            </div>
          </div>

          {/* Feasibility Notes Box */}
          <div style={{ background: 'var(--color-cream-card)', border: '1px solid var(--color-cream-border)', borderRadius: 12, padding: 36, marginBottom: 70 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: 14 }}>
              Customisation Feasibility & Scope
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              <div>
                <strong style={{ color: 'var(--color-tan-dark)', display: 'block', marginBottom: 6 }}>Branding & Finishing:</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Logo debossing, foil stamping, woven brand tags, and laser-engraved hardware are available subject to artwork review and tooling setup.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-tan-dark)', display: 'block', marginBottom: 6 }}>Bespoke Packaging:</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Rigid presentation boxes, customized dust bags, barcode labeling, and export cartons can be coordinated to your distribution standards.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-tan-dark)', display: 'block', marginBottom: 6 }}>Quantities & Lead Times:</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Minimum order quantities and delivery schedules depend on leather availability, tooling requirements, and production schedules, evaluated per project.
                </p>
              </div>
            </div>
          </div>

          {/* Customisation Enquiry Form */}
          <div className="card-form-container">
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="badge-dark" style={{ marginBottom: 10 }}>Direct Inquiry</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: 10 }}>
                Request a Customisation Discussion
              </h2>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)' }}>
                Fill out your brand specifications below. Our export desk will review the parameters and contact you to begin discussions.
              </p>
            </div>

            {submitSuccess && (
              <div className="form-status-alert success">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>Discussion Request Sent</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem' }}>
                    Your customisation parameters have been forwarded to Classic Edge export management. We look forward to evaluating your requirements.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pl-companyName">
                    Company Name <span className="form-required">*</span>
                  </label>
                  <input
                    id="pl-companyName"
                    type="text"
                    className={`form-input ${errors.companyName ? 'error' : ''}`}
                    placeholder="e.g. Al-Nukhba Lifestyle Trading"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                  {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pl-contactPersonName">
                    Contact Person's Name <span className="form-required">*</span>
                  </label>
                  <input
                    id="pl-contactPersonName"
                    type="text"
                    className={`form-input ${errors.contactPersonName ? 'error' : ''}`}
                    placeholder="e.g. Faisal Al-Hassan"
                    value={formData.contactPersonName}
                    onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                  />
                  {errors.contactPersonName && <span className="form-error-msg">{errors.contactPersonName}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pl-businessEmail">
                    Business Email <span className="form-required">*</span>
                  </label>
                  <input
                    id="pl-businessEmail"
                    type="email"
                    className={`form-input ${errors.businessEmail ? 'error' : ''}`}
                    placeholder="procurement@brand.com"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                  {errors.businessEmail && <span className="form-error-msg">{errors.businessEmail}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pl-whatsappNumber">
                    WhatsApp Number <span className="form-required">*</span>
                  </label>
                  <input
                    id="pl-whatsappNumber"
                    type="tel"
                    className={`form-input ${errors.whatsappNumber ? 'error' : ''}`}
                    placeholder="e.g. +966 50 123 4567"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  />
                  {errors.whatsappNumber && <span className="form-error-msg">{errors.whatsappNumber}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="pl-country">
                    Country <span className="form-required">*</span>
                  </label>
                  <input
                    id="pl-country"
                    type="text"
                    className={`form-input ${errors.country ? 'error' : ''}`}
                    placeholder="e.g. Saudi Arabia, UAE, Qatar..."
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                  {errors.country && <span className="form-error-msg">{errors.country}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pl-productCategory">
                    Product Category <span className="form-required">*</span>
                  </label>
                  <select
                    id="pl-productCategory"
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
                  <label className="form-label" htmlFor="pl-estimatedQuantity">
                    Estimated Order Quantity
                  </label>
                  <input
                    id="pl-estimatedQuantity"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 300 - 500 units"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  />
                  <span className="form-hint">Discussed individually according to production feasibility</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pl-brandingRequirements">
                    Branding Requirements
                  </label>
                  <select
                    id="pl-brandingRequirements"
                    className="form-select"
                    value={formData.brandingRequirements}
                    onChange={(e) => setFormData({ ...formData, brandingRequirements: e.target.value })}
                  >
                    {brandingOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pl-message">
                  Message & Additional Specifications <span className="form-required">*</span>
                </label>
                <textarea
                  id="pl-message"
                  rows="4"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Describe your design elements, target materials, packaging preferences, and any timeline constraints."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              {/* Clean High-Contrast Action Box */}
              <div style={{
                marginTop: '32px',
                background: '#19191d',
                border: '1.5px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '12px',
                padding: '22px 24px',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.35)'
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
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#f5e2b8',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Official Export Desk Dispatch
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#a6a29a' }}>
                    Official Desk: <strong style={{ color: '#fff' }}>classicedgeatelier@gmail.com</strong>
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: '#b8b4ab', margin: '0 0 18px 0', lineHeight: 1.5 }}>
                  Select your preferred dispatch channel to submit your private-label specification directly to our production evaluation desk in India.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  <button
                    type="button"
                    className="btn-whatsapp"
                    onClick={handleWhatsAppSubmit}
                    title="Send private-label specifications via WhatsApp"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.074-2.027-.474-1.636-.676-2.69-2.348-2.771-2.457-.082-.109-.659-.877-.659-1.674 0-.796.417-1.189.565-1.353.149-.164.324-.205.433-.205.109 0 .218.001.313.006.1.005.234-.038.366.279.136.328.465 1.135.506 1.218.041.083.069.179.014.288-.055.109-.082.177-.164.273-.082.096-.172.214-.246.288-.082.083-.167.172-.072.336.095.164.423.698.908 1.129.624.555 1.15.727 1.314.809.164.082.261.069.358-.041.096-.11.41-4.78.52-6.42.109-.164.218-.137.368-.082.15.055.952.449 1.116.531.164.082.273.123.313.191.041.068.041.396-.103.801zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.176L2 22l4.981-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.611 0-3.11-.479-4.368-1.303l-.313-.206-2.887.803.803-2.822-.206-.328A8.204 8.204 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z"/>
                    </svg>
                    <span>Submit via WhatsApp (+91 9443750820)</span>
                  </button>

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleEmailSubmit}
                    title="Send private-label specifications to classicedgeatelier@gmail.com"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Submit via Email Desk</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
