// CLASSIC EDGE ATELIER — SHARED JAVASCRIPT UTILITIES
const ALL_DUMMY_PRODUCTS = [
  { 
    category: 'Leather Shoes', 
    sku: 'CEA-LS-101', 
    name: 'Cap-Toe Oxford Brogue', 
    spec: 'Full-Grain Calf, Goodyear Welted, Hand-burnished cognac finish.', 
    pack: '12 Pairs / Export Master Carton · EU Sizes 40-45', 
    img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Leather Shoes', 
    sku: 'CEA-LS-102', 
    name: 'Artisan Penny Loafer', 
    spec: 'Supple Box Calf, cushioned memory-foam leather insole.', 
    pack: '12 Pairs / Carton · Single or Mixed Ratio', 
    img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Leather Shoes', 
    sku: 'CEA-LS-103', 
    name: 'Double Monk Strap Dress Shoe', 
    spec: 'Burnished Espresso leather, solid brass double buckle closure.', 
    pack: '12 Pairs / Carton · Export Packaged in Branded Boxes', 
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Arabic Slippers', 
    sku: 'CEA-AS-201', 
    name: 'Traditional Gulf Leather Slide', 
    spec: 'Ergonomic wide-band upper, genuine full-grain leather insole.', 
    pack: '24 Pairs / Master Carton · Mixed Gulf Sizes 40-46', 
    img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Arabic Slippers', 
    sku: 'CEA-AS-202', 
    name: 'Embossed Toe-Ring Slipper', 
    spec: 'Laser-textured leather upper, arch-support footbed.', 
    pack: '24 Pairs / Carton · Saddle Tan & Dark Brown', 
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Wallets', 
    sku: 'CEA-WL-301', 
    name: 'Classic Bifold Wallet', 
    spec: '8 Card slots, double currency compartment, turned edge finish.', 
    pack: '50 Units / Inner Carton · Individual Presentation Gift Box', 
    img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Wallets', 
    sku: 'CEA-WL-302', 
    name: 'Slim Foldable Card Wallet', 
    spec: 'Front pocket minimalist profile, RFID shielding, 6 card slots.', 
    pack: '50 Units / Master Carton', 
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Bags', 
    sku: 'CEA-BG-401', 
    name: 'Executive Laptop Briefcase', 
    spec: 'Padded 15.6" laptop compartment, solid brass hardware.', 
    pack: '6 Units / Master Carton · Dustbag Included', 
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Bags', 
    sku: 'CEA-BG-402', 
    name: 'Weekend Duffle Travel Holdall', 
    spec: 'Reinforced base with metal studs, dual YKK heavy brass zips.', 
    pack: '4 Units / Master Carton · Export Grade', 
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Belts', 
    sku: 'CEA-BL-501', 
    name: 'Classic Feather-Edge Dress Belt', 
    spec: 'Full-grain 32mm width, single-prong zinc alloy buckle.', 
    pack: '36 Units / Carton · Sizes 32-44"', 
    img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    category: 'Textiles & Garments', 
    sku: 'CEA-TX-601', 
    name: 'Export Cotton Suiting & Shirting', 
    spec: 'High-count combed cotton, mercerized finish, breathable weave.', 
    pack: 'Rolls or Carton Folded · Custom Export Spec', 
    img: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=600&q=80' 
  },
  {
    category: 'Leather Shoes',
    sku: 'CEA-RSH-01',
    name: 'Factory Stock Crepe-Sole Derby Shoe (Real Stock)',
    spec: 'Authentic atelier inventory. Hand-stitched sole with natural crepe bottom.',
    pack: '12 Pairs / Export Carton · EU Sizes 39-45',
    img: 'images and pdf/images/WhatsApp Image 2026-09-30 at 2.19.03 PM.jpeg'
  },
  {
    category: 'Leather Shoes',
    sku: 'CEA-RSH-02',
    name: 'Lite Foam Casual Clog & Slide (Real Stock)',
    spec: 'Dual-density cushioned footbed, breathable perforated toe box.',
    pack: '24 Pairs / Carton · Single/Assorted Colors',
    img: 'images and pdf/images/WhatsApp Image 2026-09-30 at 2.19.06 PM.jpeg'
  },
  {
    category: 'Leather Shoes',
    sku: 'CEA-RSH-03',
    name: 'Artisan Blake-Welted Crepe Boot (Real Stock)',
    spec: 'Full-grain pull-up leather, thick textured crepe outsole.',
    pack: '12 Pairs / Master Carton',
    img: 'images and pdf/images/WhatsApp Image 2026-09-30 at 2.19.14 PM.jpeg'
  },
  {
    category: 'Textiles & Garments',
    sku: 'CEA-ABY-101',
    name: 'Dubai Royal Nida Embroidered Abaya (abaya.pdf)',
    spec: 'Premium fluid Nida fabric with matching sheila scarf. Refer to abaya.pdf catalogue.',
    pack: '24 Pieces / Carton · Assorted Lengths 52"-60"',
    img: 'https://images.unsplash.com/photo-1585728748178-f742f56d4a71?auto=format&fit=crop&w=600&q=80'
  }
];

// PDF / Line-sheet Generator
function downloadCatalogue(categoryName) {
  const cat = categoryName || 'Complete Wholesale Catalogue';
  const filename = `Classic_Edge_Atelier_${cat.replace(/\s+/g, '_')}_Catalogue.html`;
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Classic Edge Atelier — Wholesale Catalogue & Export Specs</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; max-width: 860px; margin: 0 auto; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #C5A059; padding-bottom: 24px; margin-bottom: 30px; }
        .title { font-size: 28px; font-weight: 800; letter-spacing: 3px; color: #000; text-transform: uppercase; margin: 0; }
        .sub { font-size: 13px; color: #666; letter-spacing: 2px; text-transform: uppercase; margin-top: 8px; }
        .meta-box { background: #f8f6f0; border: 1px solid #e5dfd0; padding: 18px 22px; border-radius: 4px; margin-bottom: 30px; font-size: 13.5px; }
        .meta-box strong { color: #84631e; }
        .table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 12.5px; }
        .table th, .table td { border: 1px solid #ddd; padding: 12px 14px; text-align: left; }
        .table th { background: #1a1a20; color: #F5E2B8; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; }
        .table tr:nth-child(even) { background: #fafafa; }
        .contact-box { margin-top: 40px; border-top: 2px solid #C5A059; padding-top: 24px; text-align: center; font-size: 13px; color: #444; background: #faf9f6; padding: 20px; border-radius: 4px; }
        .contact-box strong { color: #000; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">CLASSIC EDGE ATELIER</h1>
        <div class="sub">Leather Footwear • Bags • Accessories • Textiles | Export Line-Sheet 2026</div>
      </div>
      <div class="meta-box">
        <strong>Target Export Markets:</strong> UAE (Dubai, Abu Dhabi), Saudi Arabia (Riyadh, Jeddah), Qatar, Kuwait, Bahrain, Oman<br>
        <strong>Manufacturer / Origin:</strong> India<br>
        <strong>Selected Collection:</strong> ${cat}<br>
        <strong>Direct WhatsApp Export Desk:</strong> +91 9443750820 | <strong>Email:</strong> classicedgeatlier@gmail.com
      </div>
      <h3 style="letter-spacing: 1px; text-transform: uppercase; font-size: 15px; border-left: 3px solid #C5A059; padding-left: 10px; margin-bottom: 14px;">
        Export Master Carton & Packaging Breakdown
      </h3>
      <table class="table">
        <thead>
          <tr>
            <th>Item SKU</th>
            <th>Category & Model</th>
            <th>Specifications / Leather Grade</th>
            <th>Carton Packaging</th>
            <th>Trade Terms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>CEA-LS-101</strong></td>
            <td>Cap-Toe Oxford Brogue Shoes</td>
            <td>Full-Grain Calf, Goodyear Welted, cognac burnish</td>
            <td>12 Pairs / Master Carton</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
          <tr>
            <td><strong>CEA-AS-201</strong></td>
            <td>Gulf Heritage Leather Slippers</td>
            <td>Wide-band ergonomic slide, full-grain footbed</td>
            <td>24 Pairs / Master Carton</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
          <tr>
            <td><strong>CEA-WL-301</strong></td>
            <td>Classic Bifold Wallets</td>
            <td>8 Card slots, turned edge, gift box presentation</td>
            <td>50 Units / Inner Carton</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
          <tr>
            <td><strong>CEA-BG-401</strong></td>
            <td>Executive Laptop Briefcase</td>
            <td>15.6" Padded compartment, brass finishings</td>
            <td>6 Units / Master Carton</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
          <tr>
            <td><strong>CEA-BL-501</strong></td>
            <td>Solid Brass Feather-Edge Belts</td>
            <td>Full-grain 32mm strap, zinc/brass buckle</td>
            <td>36 Units / Master Carton</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
          <tr>
            <td><strong>CEA-TX-601</strong></td>
            <td>Textile & Combed Cotton Garments</td>
            <td>High-thread count, export finish</td>
            <td>Custom Carton Folded</td>
            <td>FOB / CIF on enquiry</td>
          </tr>
        </tbody>
      </table>
      <div class="contact-box">
        <div>Ready for bulk carton shipments, private label branding, and sample dispatch:</div>
        <div style="margin-top: 8px;">
          <strong>WhatsApp Desk: +91 9443750820 &nbsp;•&nbsp; Direct Email: classicedgeatlier@gmail.com</strong>
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }
}

// Modal open/close
function openQuoteModal(productName = '', category = 'General') {
  const modal = document.getElementById('globalQuoteModal');
  if (!modal) return;
  modal.classList.add('active');

  const catSelect = document.getElementById('modal-category');
  const msgInput = document.getElementById('modal-msg');
  if (catSelect && category) {
    for (let opt of catSelect.options) {
      if (opt.value.toLowerCase().includes(category.toLowerCase())) {
        catSelect.value = opt.value;
        break;
      }
    }
  }
  if (msgInput && productName) {
    msgInput.value = `Hello Classic Edge Atelier, we would like to enquire about wholesale quotation and specs for: ${productName}.`;
  }
}

function closeQuoteModal() {
  const modal = document.getElementById('globalQuoteModal');
  if (modal) modal.classList.remove('active');
}

// Form Submission via WhatsApp
function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modal-name')?.value || 'Buyer';
  const company = document.getElementById('modal-company')?.value || 'Trading Co.';
  const country = document.getElementById('modal-country')?.value || 'UAE';
  const cat = document.getElementById('modal-category')?.value || 'Wholesale';
  const qty = document.getElementById('modal-qty')?.value || 'Open';
  const msg = document.getElementById('modal-msg')?.value || 'Please send quotations.';

  const text = `*New Wholesale Inquiry - Classic Edge Atelier*\n` +
    `--------------------------------\n` +
    `*Buyer:* ${name}\n` +
    `*Company:* ${company}\n` +
    `*Country/City:* ${country}\n` +
    `*Category:* ${cat}\n` +
    `*Quantity:* ${qty}\n` +
    `*Specifications:* ${msg}`;

  window.open(`https://wa.me/919443750820?text=${encodeURIComponent(text)}`, '_blank');
  closeQuoteModal();
}

function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('open');
}
