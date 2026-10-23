import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { CONTACT_INFO } from '../data/marketsData';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Leather & Textile Sourcing Partner from India"
        description="Classic Edge is an India-based manufacturer and supplier of leather products and textiles, serving international businesses seeking bulk wholesale supply and private-label partnerships."
      />

      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <span className="badge-dark" style={{ marginBottom: 12 }}>Company Profile</span>
            <h1 className="page-banner-title">
              Classic Edge — Your Leather and Textile Sourcing Partner from India
            </h1>
            <p className="page-banner-desc">
              Dedicated to manufacturing integrity, transparent B2B collaboration, and reliable wholesale supply for global importers and Middle Eastern retail brands.
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile Story */}
      <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <span className="section-pretitle">Business Introduction</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.3rem', color: 'var(--color-primary-dark)', marginBottom: 20 }}>
                Committed to Craftsmanship and Long-Term Sourcing Partnerships
              </h2>
              <blockquote style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: 20, margin: '24px 0', fontStyle: 'italic', color: 'var(--color-text-main)', fontSize: '1.08rem', lineHeight: 1.7 }}>
                “Classic Edge is an India-based manufacturer and supplier of leather products and textiles, serving the needs of businesses seeking wholesale supply and customised product solutions. Our product range includes leather shoes, slippers, wallets, bags, belts, other leather goods, textiles, and garments. We welcome enquiries from importers, wholesalers, distributors, retailers, and private-label partners interested in developing long-term business relationships.”
              </blockquote>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: 24 }}>
                India has long maintained a revered international standing in leather tanning, shoemaking traditions, and fine textile weaving. Classic Edge channels this manufacturing heritage into an organized B2B export desk, enabling buyers in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, and broader international markets to access versatile sourcing without intermediaries.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Our Desk
                </Link>
              </div>
            </div>

            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-cream-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" 
                alt="Classic Edge artisan leather craftsmanship and finished footwear collection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Core Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, marginBottom: 70 }}>
            <div className="card-premium" style={{ padding: 32 }}>
              <span className="badge-tan" style={{ marginBottom: 12 }}>Portfolio Scope</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: 10 }}>
                Our Business & Product Range
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                We encompass formal and casual leather shoes, ergonomic everyday leather slippers, structured bifold and foldable wallets, professional bags and travel holdalls, finished leather belts, small leather goods, and export-grade textiles and garments.
              </p>
            </div>

            <div className="card-premium" style={{ padding: 32 }}>
              <span className="badge-tan" style={{ marginBottom: 12 }}>Consultative Approach</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: 10 }}>
                Our Approach to Buyer Requirements
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Recognising that distinct markets prioritize varying leather finishes, stitch densities, sizing conventions, and price points, we review buyer specifications thoroughly rather than offering rigid, one-size-fits-all catalogues.
              </p>
            </div>

            <div className="card-premium" style={{ padding: 32 }}>
              <span className="badge-tan" style={{ marginBottom: 12 }}>Volume Supply</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: 10 }}>
                Bulk Purchasing Enquiries
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                We cater to commercial importers, wholesalers, and retail distributors seeking regular consignments, container shipments, or structured delivery schedules with transparent pricing and documentation.
              </p>
            </div>

            <div className="card-premium" style={{ padding: 32 }}>
              <span className="badge-tan" style={{ marginBottom: 12 }}>Partnership Ethos</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: 10 }}>
                Focus on Long-Term B2B Relationships
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Rather than transactional one-off interactions, our focus is grounded in sustainable business partnerships, continuous communication, consistent quality adherence, and long-term supply reliability.
              </p>
            </div>
          </div>

          {/* Sourcing Ethos Banner */}
          <div style={{ background: 'var(--color-cream-card)', border: '1px solid var(--color-cream-border)', borderRadius: 16, padding: '44px 40px', textAlign: 'center' }}>
            <span className="badge-dark" style={{ marginBottom: 12 }}>Commercial Principles</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-primary-dark)', marginBottom: 14 }}>
              Direct, Transparent, and Professional Communication
            </h2>
            <p style={{ maxWidth: 720, margin: '0 auto 24px auto', fontSize: '0.94rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              All product inquiries, sample options, material grading, and shipment schedules are communicated clearly by our business representatives. We welcome open technical dialogue with buyers across the GCC and around the world.
            </p>
            <div style={{ display: 'inline-flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                Message on WhatsApp ({CONTACT_INFO.whatsappNumber})
              </a>
              <a href={CONTACT_INFO.emailLink} className="btn-primary">
                Send Direct Email ({CONTACT_INFO.email})
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
