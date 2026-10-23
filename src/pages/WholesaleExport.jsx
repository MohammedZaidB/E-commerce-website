import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { TARGET_MARKETS, CONTACT_INFO } from '../data/marketsData';

export default function WholesaleExport({ onOpenQuoteModal }) {
  return (
    <>
      <SEO 
        title="Wholesale & Export Enquiries | Supplier from India"
        description="Looking for a leather and textile supplier from India? Connect with Classic Edge to discuss wholesale purchasing, bulk supply, quotations, and private label partnerships across the GCC."
      />

      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <span className="badge-dark" style={{ marginBottom: 12 }}>International Trade Desk</span>
            <h1 className="page-banner-title">
              Looking for a Leather and Textile Supplier from India?
            </h1>
            <p className="page-banner-desc">
              Connect with Classic Edge to discuss wholesale purchasing, bulk requirements, product specifications, quotations, and potential private-label partnerships.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn-gold"
                onClick={() => onOpenQuoteModal({ enquiryType: 'Wholesale' })}
              >
                <span>Send Your Enquiry</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a 
                href={CONTACT_INFO.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                <span>WhatsApp Export Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets Spotlight */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeader
            pretitle="Export Focus"
            title="Strategic Target Markets Across the GCC"
            subtitle="We are actively structured to serve wholesale buyers, distribution firms, retail brands, and commercial importers across key Gulf markets."
          />

          <div className="gcc-grid" style={{ marginBottom: 70 }}>
            {TARGET_MARKETS.map((market) => (
              <div key={market.shortCode} className="card-premium" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: '2.4rem', lineHeight: 1 }}>{market.flag}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary-dark)' }}>
                      {market.country}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-tan)', fontWeight: 600 }}>
                      Key Hubs: {market.cities}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                  {market.focus}
                </p>
                <div style={{ borderTop: '1px solid var(--color-cream-border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge-tan" style={{ fontSize: '0.74rem' }}>{market.currencyRef}</span>
                  <button
                    type="button"
                    style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-primary-dark)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    onClick={() => onOpenQuoteModal({
                      country: market.country,
                      enquiryType: 'Wholesale',
                      message: `Enquiring from ${market.country} regarding import procedures, commercial quotation, and product specifications.`
                    })}
                  >
                    <span>Request Quotation</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sourcing Framework Parameters */}
          <div style={{ background: 'var(--color-cream-card)', border: '1px solid var(--color-cream-border)', borderRadius: 16, padding: '48px 40px', marginBottom: 70 }}>
            <div style={{ maxWidth: 760, marginBottom: 36 }}>
              <span className="badge-dark" style={{ marginBottom: 10 }}>Trade Transparency</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-primary-dark)', marginBottom: 12 }}>
                Commercial Terms & Discussion Parameters
              </h2>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                To maintain fair and competitive business practices, commercial variables are determined following a thorough assessment of each client's specific requirements:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              <div style={{ background: '#ffffff', padding: 24, borderRadius: 10, border: '1px solid var(--color-cream-border)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                  Wholesale Pricing
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Pricing is quoted on an individual basis depending on order volume, leather classification, hardware selections, and agreed Incoterms (e.g. FOB, CIF, or Ex-Works).
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: 24, borderRadius: 10, border: '1px solid var(--color-cream-border)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                  Minimum Order Quantities (MOQ)
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  MOQs are evaluated per style, sizing breakdown, and colorway. We maintain an open discussion policy to facilitate new product line trials where feasible.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: 24, borderRadius: 10, border: '1px solid var(--color-cream-border)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                  Sample Options
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  Sample evaluation, material swatch swatches, and pre-production prototypes can be coordinated subject to project scope and material availability.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: 24, borderRadius: 10, border: '1px solid var(--color-cream-border)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: 8 }}>
                  Shipping & Logistics
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                  We coordinate with your designated freight forwarders or assist with export documentation to major Gulf maritime ports and air cargo hubs.
                </p>
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="cta-banner">
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#ffffff', marginBottom: 10 }}>
                Initiate a Commercial Export Enquiry Today
              </h3>
              <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '0.95rem', maxWidth: 640 }}>
                Our export team will promptly review your requirements, product selections, and distribution markets to formulate an official quotation.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn-gold"
                onClick={() => onOpenQuoteModal({ enquiryType: 'Bulk Supply' })}
              >
                Send Your Enquiry
              </button>
              <a 
                href={CONTACT_INFO.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                Direct WhatsApp Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
