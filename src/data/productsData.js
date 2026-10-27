// Product catalogue data for Classic Edge Atelier
// Incorporates real footwear factory photos (31 styles) and Abaya export line from abaya.pdf

import { REAL_SHOE_PRODUCTS, ABAYA_PRODUCTS, ABAYA_PDF_URL } from './realCatalogData';

export { ABAYA_PDF_URL };

export const CATEGORIES = [
  { id: 'all', name: 'All Collections' },
  { id: 'leather-items', name: '👞 Leather Items' },
  { id: 'abaya-collection', name: '🧕 Abayas (26 Styles from abaya.pdf)' },
  { id: 'shirts', name: '👔 Shirts' },
  { id: 'pants', name: '👖 Pants & Trousers' },
  { id: 'real-shoes', name: 'Factory Shoes (31 Photos)' },
  { id: 'leather-slippers', name: 'Leather Slippers' },
  { id: 'wallets', name: 'Wallets' },
  { id: 'bags', name: 'Bags' },
  { id: 'belts', name: 'Belts' },
  { id: 'other-leather-goods', name: 'Other Leather Goods' }
];

const BASE_PRODUCTS = [
  // --- A. LEATHER SHOES ---
  {
    id: 'ls-01',
    name: 'Handcrafted Oxford & Brogue Formal Shoes',
    category: 'leather-shoes',
    categoryLabel: 'Leather Shoes',
    subType: 'Formal Shoes',
    price: '₹ 3,499',
    priceNum: 3499,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
    description: 'Classic lace-up formal dress shoes crafted with premium leather uppers, neat perforations, and durable outsoles. Designed for corporate and formalwear retail collections.',
    highlights: ['Traditional wingtip & cap-toe options', 'Hand-finished burnish', 'Custom branding & sole stamping on discussion'],
    specs: 'Sizes 39-45 EU available. Pure full-grain calf leather with cushioned insole.'
  },
  {
    id: 'ls-02',
    name: 'Slip-On Leather Loafers & Casual Footwear',
    category: 'leather-shoes',
    categoryLabel: 'Leather Shoes',
    subType: 'Casual Shoes',
    price: '₹ 2,899',
    priceNum: 2899,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
    description: 'Refined penny loafers and casual driving shoes engineered for comfort and modern style. Suitable for department store and private-label retail distributions.',
    highlights: ['Cushioned leather footbed', 'Supple upper finishes', 'Private-label branding options'],
    specs: 'Flexible rubber driver sole. Tan, Cognac and Jet Black finishes.'
  },
  {
    id: 'ls-03',
    name: 'Contemporary Derby & Dress Footwear',
    category: 'leather-shoes',
    categoryLabel: 'Leather Shoes',
    subType: 'Formal & Casual Footwear',
    price: '₹ 3,199',
    priceNum: 3199,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    description: 'Versatile derby footwear combining timeless Indian leather craftsmanship with clean international profiles, subject to production availability.',
    highlights: ['Open lacing construction', 'Stitched welt detailing', 'Tailored packaging discussion'],
    specs: 'Blake-stitched construction with dual density shock-absorbing heels.'
  },

  // --- B. LEATHER SLIPPERS ---
  {
    id: 'lp-01',
    name: 'Artisanal Everyday Leather Slippers',
    category: 'leather-slippers',
    categoryLabel: 'Leather Slippers',
    subType: 'Everyday Slippers',
    price: '₹ 1,199',
    priceNum: 1199,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80',
    description: 'Ergonomic slip-on leather footwear featuring soft footbed cushioning and durable under-sole construction for daily comfort and relaxed elegance.',
    highlights: ['Natural leather lining', 'Comfort-contoured footbed', 'Wholesale packaging options'],
    specs: 'Hand-sewn leather strap with moisture-resistant arch support.'
  },
  {
    id: 'lp-02',
    name: 'Traditional & Casual Arabian Style Slides',
    category: 'leather-slippers',
    categoryLabel: 'Leather Slippers',
    subType: 'Casual Leather Slippers',
    price: '₹ 1,499',
    priceNum: 1499,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    description: 'Distinctive leather slides developed with attention to regional Middle Eastern preferences, offering lightweight comfort and fine upper stitching.',
    highlights: ['Wide upper band for secure fit', 'Moisture-resistant leather insole', 'Custom embossing available'],
    specs: 'Specifically designed for GCC climate with ultra-light anti-slip outsole.'
  },
  {
    id: 'lp-03',
    name: 'Cross-Strap Casual Leather Slides',
    category: 'leather-slippers',
    categoryLabel: 'Leather Slippers',
    subType: 'Other Footwear Styles',
    price: '₹ 1,299',
    priceNum: 1299,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern cross-strap leather footwear ideal for warm-climate lifestyle ranges, resorts, and branded casual footwear lines.',
    highlights: ['Soft leather upper bands', 'Treaded grip sole', 'Custom specifications welcome'],
    specs: 'Double-stitched cross vamp with contoured memory-foam footbed.'
  },

  // --- C. WALLETS ---
  {
    id: 'wl-01',
    name: 'Classic Bifold Leather Wallet',
    category: 'wallets',
    categoryLabel: 'Wallets',
    subType: 'Classic Wallets',
    price: '₹ 1,299',
    priceNum: 1299,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    description: 'Timeless bifold design engineered with multiple credit card slots, currency compartments, and precision edge-coat finishing for enduring luxury.',
    highlights: ['RFID shielding options', 'Clean turned-edge craftsmanship', 'Debossed logo placement'],
    specs: '6 card slots, 2 hidden receipt slots, full currency divider. Vegetable-tanned.'
  },
  {
    id: 'wl-02',
    name: 'Slim Foldable Pocket Wallet',
    category: 'wallets',
    categoryLabel: 'Wallets',
    subType: 'Foldable Wallets',
    price: '₹ 999',
    priceNum: 999,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
    description: 'Minimalist compact wallet featuring fold-over convenience and streamlined profile for front-pocket carry without excess bulk.',
    highlights: ['Ultra-slim profile', 'Reinforced corner stitching', 'Custom packaging gift boxes'],
    specs: 'Holds 8-10 cards and folded notes. Just 8mm thick when empty.'
  },
  {
    id: 'wl-03',
    name: 'Contemporary Zip-Around & Card Wallets',
    category: 'wallets',
    categoryLabel: 'Wallets',
    subType: 'Contemporary Wallet Styles',
    price: '₹ 1,149',
    priceNum: 1149,
    image: 'https://images.unsplash.com/photo-1606503825008-909a67e63c23?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern zip-secure wallet and card organizer designed for international travellers and urban professionals.',
    highlights: ['Smooth running metal zippers', 'Multi-pocket layout', 'Private-label pullers available'],
    specs: 'Full perimeter YKK antique zipper with accordion coin pocket.'
  },

  // --- D. BAGS ---
  {
    id: 'bg-01',
    name: 'Executive Leather Messenger & Briefcase',
    category: 'bags',
    categoryLabel: 'Bags',
    subType: 'Leather Bags',
    price: '₹ 4,999',
    priceNum: 4999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    description: 'Structured business messenger bag with padded laptop compartment, organiser pockets, adjustable leather shoulder strap, and solid brass fittings.',
    highlights: ['Full leather handle & strap', 'Durable inner twill lining', 'Custom hardware branding'],
    specs: 'Fits up to 16-inch laptops. Solid brass hardware with detachable trolley strap.'
  },
  {
    id: 'bg-02',
    name: 'Weekender Duffle & Travel Leather Bag',
    category: 'bags',
    categoryLabel: 'Bags',
    subType: 'Everyday Carry Bags',
    price: '₹ 5,499',
    priceNum: 5499,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    description: 'Spacious travel holdall featuring substantial capacity, reinforced stress points, and dual grab handles. Ideal for premium corporate travel and luxury brands.',
    highlights: ['Reinforced base with metal studs', 'Heavy-duty zip enclosure', 'Detachable shoulder sling'],
    specs: '52-liter capacity. Water-resistant wax-treated full grain leather.'
  },
  {
    id: 'bg-03',
    name: 'Minimalist Leather Tote & City Bag',
    category: 'bags',
    categoryLabel: 'Bags',
    subType: 'Other Available Bag Styles',
    price: '₹ 3,799',
    priceNum: 3799,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean silhouette tote bag crafted for everyday versatility, retail fashion collections, and private-label merchandise lines.',
    highlights: ['Spacious main interior', 'Key leash and inner zip pocket', 'Smooth hand feel'],
    specs: 'Magnetic snap closure with interior zipper pocket and smartphone pouch.'
  },

  // --- E. BELTS ---
  {
    id: 'bl-01',
    name: 'Classic Full-Grain Dress Leather Belt',
    category: 'belts',
    categoryLabel: 'Belts',
    subType: 'Classic Leather Belts',
    price: '₹ 899',
    priceNum: 899,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
    description: 'Sleek formal belt with feathered edge detailing, single-prong solid buckle, and smooth glazed leather surface for bespoke tailoring lines.',
    highlights: ['Reversible or fixed buckle options', 'Single & double loop designs', 'Logo stamping on inner suede side'],
    specs: '35mm width, 100% genuine top-grain cowhide leather with zinc-alloy buckle.'
  },
  {
    id: 'bl-02',
    name: 'Casual Jean & Chino Leather Belts',
    category: 'belts',
    categoryLabel: 'Belts',
    subType: 'Formal & Casual Belt Styles',
    price: '₹ 999',
    priceNum: 999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    description: 'Sturdy casual belts featuring heavier edge stitching, antique brass buckles, and natural textured leather surfaces.',
    highlights: ['Heavy-gauge stitch detailing', 'Antique brass or nickel-free hardware', 'Debossed branding'],
    specs: '40mm width with burnished raw edges. Antique bronze finish roller buckle.'
  },

  // --- F. OTHER LEATHER GOODS ---
  {
    id: 'og-01',
    name: 'Executive Leather Desk Accessories & Folios',
    category: 'other-leather-goods',
    categoryLabel: 'Other Leather Goods',
    subType: 'Additional Leather Accessories',
    price: '₹ 1,899',
    priceNum: 1899,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    description: 'Bespoke leather desk pads, document portfolios, coaster sets, and writing folders tailored for hospitality, luxury corporate gifting, and office retail.',
    highlights: ['Precision perimeter stitching', 'Felt/suede anti-slip backing', 'Corporate logo embossing on discussion'],
    specs: 'A4 document sleeve, pen holder, card slots and magnetic closing flap.'
  },
  {
    id: 'og-02',
    name: 'Travel Leather Accessories & Key Organizers',
    category: 'other-leather-goods',
    categoryLabel: 'Other Leather Goods',
    subType: 'Leather Small Goods',
    price: '₹ 749',
    priceNum: 749,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    description: 'Passport cases, luggage tags, key fobs, and tech cable wraps crafted for travel brands and retail accessory ranges.',
    highlights: ['Compact form factor', 'Solid hardware fittings', 'Custom packaging options'],
    specs: 'Dual passport holder with boarding pass pocket and SIM card storage slots.'
  },

  // --- G. TEXTILES AND GARMENTS ---
  {
    id: 'tx-01',
    name: 'Premium Woven Textile Fabrics & Materials',
    category: 'textiles-garments',
    categoryLabel: 'Textiles and Garments',
    subType: 'Textile Products',
    price: '₹ 2,499',
    priceNum: 2499,
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80',
    description: 'Export-grade woven textiles, natural cotton, linen blends, and specialised fabrics sourced for apparel manufacturing and wholesale trade.',
    highlights: ['Multiple weave structures', 'Consistent dye lot options', 'Bulk roll packaging'],
    specs: '240 GSM organic combed cotton-linen blend. Colorfast reactive dyeing.'
  },
  {
    id: 'tx-02',
    name: 'Garments & Apparel Manufacturing Discussions',
    category: 'textiles-garments',
    categoryLabel: 'Textiles and Garments',
    subType: 'Garments & Apparel',
    price: '₹ 1,999',
    priceNum: 1999,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
    description: 'Tailored casual wear, shirting, and private-label apparel manufacturing capacity available for international commercial buyers and brand owners.',
    highlights: ['Custom pattern grading', 'Label and tag application', 'Export carton packaging'],
    specs: 'Standard sample pack with fabric swatch card and pattern mockups.'
  },
  {
    id: 'tx-03',
    name: 'Specialised Textile Items & Custom Supplies',
    category: 'textiles-garments',
    categoryLabel: 'Textiles and Garments',
    subType: 'Other Textile Items',
    price: '₹ 1,599',
    priceNum: 1599,
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
    description: 'Custom textile merchandise, institutional linen, and specialised garment orders produced according to buyer technical specifications.',
    highlights: ['Specifications tailored per market', 'Inspection and quality checkpoints', 'Sample review feasibility'],
    specs: 'Certified OEKO-TEX Standard 100 hospitality towels and luxury sheeting sets.'
  },

  // --- H. SHIRTS (GARMENTS & SHIRTING) ---
  {
    id: 'sh-01',
    name: 'Executive Formal Egyptian Cotton Dress Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Formal Shirts',
    price: '₹ 1,499',
    priceNum: 1499,
    image: 'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-01',
    description: 'Crisp white 100% Giza Egyptian cotton formal shirt tailored with French cuffs and structured spread collar.',
    highlights: ['100% pure combed Giza cotton', 'Mother-of-pearl buttons', 'Wrinkle-resistant easy care finish'],
    specs: 'Available sizes 38-46. Carton packing 48 units. Export quality single-needle tailoring.'
  },
  {
    id: 'sh-02',
    name: 'Tailored Slim-Fit Navy Oxford Cotton Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Casual & Oxford Shirts',
    price: '₹ 1,699',
    priceNum: 1699,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-02',
    description: 'Classic button-down Oxford weave cotton shirt in deep navy blue, ideal for business casual and uniform supply.',
    highlights: ['Heavyweight Oxford cotton weave', 'Button-down collar', 'Pre-washed for soft handfeel'],
    specs: 'Available sizes S-3XL. 100% organic cotton yarn. Pre-shrunk colorfast fabric.'
  },
  {
    id: 'sh-03',
    name: 'Breathable Pure Linen Resort Casual Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Linen Shirts',
    price: '₹ 1,899',
    priceNum: 1899,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-03',
    description: 'Featherlight 100% pure European flax linen casual shirt in natural sand beige designed for warm Gulf climates.',
    highlights: ['100% European flax linen', 'Relaxed resort fit', 'Ultra-breathable moisture wicking'],
    specs: 'Available in Sand, White, Olive, and Sky Blue. Sizing 38-46.'
  },
  {
    id: 'sh-04',
    name: 'Executive Micro-Stripe Business Dress Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Formal Shirts',
    price: '₹ 1,599',
    priceNum: 1599,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-04',
    description: 'Fine blue pinstripe two-ply cotton shirting engineered with reinforced collar stays and double-button cuffs.',
    highlights: ['Two-ply combed cotton', 'German interlining collars', 'Stitch density 18-20 SPI'],
    specs: 'Sizes 39-44. Ideal for corporate retail collections and luxury private label.'
  },
  {
    id: 'sh-05',
    name: 'Mercerised Pique Cotton Luxury Polo Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Polo Shirts',
    price: '₹ 1,299',
    priceNum: 1299,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-05',
    description: 'Double-mercerised breathable pique cotton polo shirt featuring anti-curl collar and ribbed sleeve cuffs.',
    highlights: ['220 GSM combed pique cotton', 'Anti-curl collar technology', 'Lustrous mercerised finish'],
    specs: 'Custom corporate embroidery & branding available on discussion.'
  },
  {
    id: 'sh-06',
    name: 'Minimalist Mandarin Collar Summer Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    subType: 'Casual Shirts',
    price: '₹ 1,749',
    priceNum: 1749,
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-SHT-06',
    description: 'Band-collar contemporary shirt in premium cotton-linen blend tailored for modern Arabian and modest menswear.',
    highlights: ['Stand mandarin band collar', 'Concealed front placket', 'Breathable lightweight weave'],
    specs: 'Export packaging 36 units per carton. Available sizes 38-46.'
  },

  // --- I. PANTS & TROUSERS ("PAINT") ---
  {
    id: 'pt-01',
    name: 'Executive Pleated Formal Wool-Blend Trousers',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Formal Trousers',
    price: '₹ 1,999',
    priceNum: 1999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-01',
    description: 'Tailored single-pleat dress trousers in wrinkle-resistant charcoal wool-poly blend with hidden waistband flex.',
    highlights: ['Flexible comfort waistband', 'Precision blind-stitch hem', 'Wrinkle recovery fabric'],
    specs: 'Waist sizes 30-42 inch. Finished inseam lengths. Export carton 30 units.'
  },
  {
    id: 'pt-02',
    name: 'Slim-Fit Stretch Cotton Chino Pants (Khaki)',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Chino Pants',
    price: '₹ 1,699',
    priceNum: 1699,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-02',
    description: 'Premium 98% combed cotton with 2% elastane stretch chino pants in classic desert khaki for smart daily wear.',
    highlights: ['Two-way stretch comfort', 'Enzyme washed soft finish', 'Reinforced crotch gusset'],
    specs: 'Available in Khaki, Navy, Olive, Black, and Stone. Sizes 30-40.'
  },
  {
    id: 'pt-03',
    name: 'Contemporary Flat-Front Navy Dress Trousers',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Formal Trousers',
    price: '₹ 1,849',
    priceNum: 1849,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-03',
    description: 'Sharp flat-front executive trousers crafted with satin interior waistband lining and slash side pockets.',
    highlights: ['Flat-front slim architectural cut', 'Satin waist gripper', 'Crease-retention treatment'],
    specs: 'Available waist 30-42. High durability export fabric for corporate uniforms.'
  },
  {
    id: 'pt-04',
    name: 'Relaxed Fit Drawstring Pure Linen Pants',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Linen Pants',
    price: '₹ 1,799',
    priceNum: 1799,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-04',
    description: 'Airy straight-leg natural flax linen pants with elasticated drawstring waist tailored for warm weather comfort.',
    highlights: ['100% natural European flax linen', 'Elastic drawstring waist', 'Deep secure side pockets'],
    specs: 'Available sizes S-XXL in Natural Cream, Beige, Navy and White.'
  },
  {
    id: 'pt-05',
    name: 'Raw Selvedge Stretch Indigo Denim Jeans',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Denim Jeans',
    price: '₹ 2,199',
    priceNum: 2199,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-05',
    description: '13.5 oz heavy-duty ring-spun indigo denim jeans with copper rivets, genuine leather patch and chain stitching.',
    highlights: ['13.5 oz ring-spun denim', 'Copper hardware & rivets', 'Genuine leather atelier back patch'],
    specs: 'Waist 30-38 inch. Inseam 32/34. Export carton packaging 24 units.'
  },
  {
    id: 'pt-06',
    name: 'Tailored Gurkha Belted High-Waist Trousers',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    subType: 'Gurkha Trousers',
    price: '₹ 2,299',
    priceNum: 2299,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    modelCode: 'CE-PNT-06',
    description: 'Bespoke Gurkha-waistband tailored trousers with double side buckles in premium Italian olive cotton twill.',
    highlights: ['Traditional Gurkha buckle waistband', 'Double inward pleats', 'High-rise vintage silhouette'],
    specs: 'Made in small atelier batches. Sizing 30-40 inch waist.'
  }
];

// Combine all 31 real factory shoes, abaya items, and base collection
export const PRODUCTS = [
  ...REAL_SHOE_PRODUCTS,
  ...ABAYA_PRODUCTS,
  ...BASE_PRODUCTS
];

export const SOURCING_BENEFITS = [
  {
    title: 'Direct Sourcing from India',
    desc: 'Collaborate directly with an India-based manufacturer and supplier, facilitating transparent pricing and direct production communication.',
    icon: 'Factory'
  },
  {
    title: 'Custom Branding & Private Label',
    desc: 'Discuss logo debossing, customized hardware, bespoke packaging, and unique product dimensions to match your brand requirements.',
    icon: 'Sparkles'
  },
  {
    title: 'Flexible Specification Discussions',
    desc: 'Every market has distinct requirements. We consult closely on leather finishes, dimensions, sole types, and fabric compositions.',
    icon: 'Layers'
  },
  {
    title: 'Dedicated Middle East & GCC Trade Desk',
    desc: 'Structured to support commercial importers, wholesalers, and retail chains across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.',
    icon: 'Globe'
  }
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Share Your Requirements',
    desc: 'Provide your desired product categories, preliminary quantities, target markets, and specific design or branding preferences.'
  },
  {
    step: '02',
    title: 'Discuss Specifications',
    desc: 'We examine feasibility, material grades, sizing scales, customisation options, and potential delivery considerations with your team.'
  },
  {
    step: '03',
    title: 'Review Quotation & Samples',
    desc: 'Receive formal wholesale quotations and discuss sample creation or evaluation options where feasible for your commercial order.'
  },
  {
    step: '04',
    title: 'Confirm the Order',
    desc: 'Finalise technical specifications, packaging guidelines, payment terms, and delivery schedules to initiate scheduled supply.'
  }
];
