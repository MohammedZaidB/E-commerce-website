# Classic Edge — Premium B2B Leather & Textile Website

A modern, responsive, high-conversion B2B wholesale website developed for **Classic Edge**, an India-based manufacturer and supplier of leather goods and textiles, built to attract international buyers, importers, wholesalers, distributors, and private-label brands across the **GCC (United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)** and global markets.

---

## 1. Business & Contact Information

- **Company Name:** Classic Edge
- **Business Type:** Leather products and textile manufacturer and supplier
- **Country of Origin:** India
- **Official Business Email:** classicedgeatlier@gmail.com
- **Direct WhatsApp:** +91 9443750820
- **Direct WhatsApp Link:** [https://wa.me/919443750820](https://wa.me/919443750820)
- **Email Link:** [mailto:classicedgeatlier@gmail.com](mailto:classicedgeatlier@gmail.com)
- **Target Markets:** UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman

---

## 2. Project Architecture & Pages

The application is structured using **React 18**, **Vite**, and **React Router**:

```text
d:\E-commerce website\
├── index.html                  # SEO-optimized HTML5 shell with Open Graph and Schema.org
├── package.json                # Dependencies & Vite build scripts
├── vite.config.js              # Vite bundler configuration
├── standalone-preview.html     # Zero-build standalone preview runner for instant browser testing
├── public/
│   ├── favicon.svg             # Monogram brand favicon (CE in gold and dark espresso)
│   ├── robots.txt              # Search engine crawler permissions
│   └── sitemap.xml             # XML sitemap for Google/Bing indexing
├── src/
│   ├── main.jsx                # React DOM entry point with BrowserRouter
│   ├── App.jsx                 # Global state, router switch, and modal management
│   ├── index.css               # Core CSS design system, typography, tokens, colors
│   ├── data/
│   │   ├── productsData.js     # 7 core B2B product categories & items
│   │   └── marketsData.js      # GCC market specifications & contact references
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive header with mobile hamburger drawer & quick contact
│   │   ├── Footer.jsx          # Comprehensive B2B footer with GCC badges & mail/chat links
│   │   ├── ProductCard.jsx     # Card with category badge, specifications, and enquiry trigger
│   │   ├── QuickEnquiryModal.jsx # Global quotation modal with dual WhatsApp/Email generators
│   │   ├── FloatingWhatsApp.jsx # Fixed floating WhatsApp contact badge with tooltip
│   │   ├── SectionHeader.jsx   # Consistent section pretitle, title, and subtitles
│   │   ├── ProcessSteps.jsx    # 4-step sourcing workflow component
│   │   └── SEO.jsx             # Dynamic page title and meta description updater
│   ├── pages/
│   │   ├── Home.jsx            # Hero, Category highlights, B2B Sourcing Partner, GCC Section
│   │   ├── Products.jsx        # Complete catalogue with category filtering and search
│   │   ├── PrivateLabel.jsx    # OEM/ODM manufacturing, feasibility, and discussion form
│   │   ├── About.jsx           # Company profile, product scope, and long-term B2B ethos
│   │   ├── WholesaleExport.jsx # Landing page for international GCC buyers & trade parameters
│   │   └── Contact.jsx         # Clean contact desk + validated 9-field B2B enquiry form
│   └── styles/
│       ├── components.css      # Component-level styling (Navbar, Footer, Modals, Forms)
│       └── pages.css           # Page layouts (Hero, GCC grid, Catalogue, Contact split)
```

---

## 3. Product Categories Included

1. **Leather Shoes** — Formal oxfords, brogues, derby footwear, and casual loafers.
2. **Leather Slippers** — Everyday cushioned leather slippers and regional Arabian slides.
3. **Wallets** — Classic bifold wallets, foldable slim cardholders, and contemporary zip styles.
4. **Bags** — Executive leather messenger briefcases, weekender duffles, and everyday carry totes.
5. **Belts** — Classic dress leather belts and casual belts with solid brass/silver buckles.
6. **Other Leather Goods** — Executive desk accessories, portfolios, passport cases, and key organizers.
7. **Textiles and Garments** — Woven textile fabrics, cotton/linen blends, and tailored garment manufacturing discussions.

*All products display "Available on enquiry" for pricing, MOQs, and specifications, adhering strictly to authentic B2B trade practices.*

---

## 4. Getting Started & Running Locally

### Option 1: Standard React + Vite Setup
```bash
# 1. Navigate to the project directory
cd "d:\E-commerce website"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Build for Production
```bash
npm run build
```
Generates an optimized, minified production build in the `dist/` directory ready for deployment on Vercel, Netlify, Cloudflare Pages, or AWS S3.

### Option 3: Instant Local Preview (Zero Build Required)
Simply double-click `standalone-preview.html` to open it in Chrome, Edge, or Firefox. It runs directly with CDN React and Babel for instantaneous client reviews.

---

## 5. Enquiry Form & Backend Integration

The enquiry forms on the website currently feature **Functional Client-Side Routing**:
1. **WhatsApp Direct Integration:** Clicking "Submit via WhatsApp" generates a structured, URL-encoded trade quotation message and directly launches WhatsApp with `+91 9443750820`.
2. **Business Email Desk:** Clicking "Submit via Email Desk" generates a formatted business message and opens the buyer's default desktop/mobile email client addressed to `classicedgeatlier@gmail.com`.

### Connecting to an Automated Backend Service:
If you wish to send emails directly from the server or store them in a database:

#### Option A: Formspree (Zero code backend)
1. Register at [https://formspree.io](https://formspree.io) and create a form pointing to `classicedgeatlier@gmail.com`.
2. In `src/pages/Contact.jsx` and `src/components/QuickEnquiryModal.jsx`, set the form `action="https://formspree.io/f/{YOUR_FORM_ID}"` and method `POST`.

#### Option B: EmailJS
1. Sign up on [https://www.emailjs.com](https://www.emailjs.com).
2. Install SDK: `npm install @emailjs/browser`.
3. Call `emailjs.send("service_id", "template_id", formData, "public_key")` in `handleSubmit`.

---

## 6. Pre-Launch Checklist for Classic Edge

Before pointing the public domain to production, the business owner should verify the following:

- [ ] **Domain & Hosting:** Register domain (e.g. `classicedge-exports.com`) and connect DNS records.
- [ ] **Email Setup:** Confirm that `classicedgeatlier@gmail.com` is configured with auto-responders or filters to monitor B2B buyer leads.
- [ ] **WhatsApp Business Profile:** Ensure `+91 9443750820` is set up with a WhatsApp Business profile containing the Classic Edge logo, business hours (IST / Gulf Standard Time), and a catalog greeting message.
- [ ] **Sample Policy:** Agree upon an internal policy regarding sample charges and courier costs (e.g. buyer pays DHL/FedEx freight).
- [ ] **Payment Terms:** Clarify accepted payment mechanisms (e.g., Wire Transfer / T/T, Letter of Credit / L/C for container consignments).
- [ ] **Shipping Terms:** Establish standard Incoterms available for quotation (e.g. FOB Mumbai/Chennai, CIF Dubai/Dammam).
- [ ] **Privacy Notice:** If tracking scripts (e.g. Google Analytics 4) are added later, add a standard GDPR/GCC-compliant privacy policy notice.
