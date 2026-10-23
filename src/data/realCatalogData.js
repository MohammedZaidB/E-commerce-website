// Real factory stock images and Abaya PDF catalog loader
// Dynamically maps all 31 real factory images from /images and pdf/images and /images and pdf/abaya.pdf

// 1. Vite glob loader for all 31 real shoe photos
const shoeImageModules = import.meta.glob('/images and pdf/images/*.jpeg', { eager: true, import: 'default' });

// Convert module dictionary to sorted array of URLs
export const REAL_SHOE_IMAGES = Object.entries(shoeImageModules).map(([path, url], index) => {
  const fileName = path.split('/').pop() || `Shoe Style ${index + 1}`;
  return {
    index: index + 1,
    fileName,
    url: url || `/images and pdf/images/${fileName}`
  };
});

// 2. Abaya PDF url
export const ABAYA_PDF_URL = '/images and pdf/abaya.pdf';

// Curated names and descriptions for real footwear models
const SHOE_TITLES = [
  'Handcrafted Crepe-Sole Derby Shoe (Tan Leather)',
  'Artisanal Comfort Slip-On Driver Shoe (Espresso Brown)',
  'Executive Cap-Toe Formal Oxford (Burnished Cognac)',
  'Dual-Density Foam Lite Clog & Slide (Black/Grey)',
  'Heavy Lug-Tread Outdoor Walking Shoe (Chocolate Nubuck)',
  'Traditional Hand-Stitched Leather Slipper (Camel Tan)',
  'Heritage Blake-Welted Dress Brogue (Dark Mahogany)',
  'Minimalist Penny Loafer with Suede Lining (Chestnut)',
  'Padded Ankle Support Work Boot (Crazy Horse Leather)',
  'Vintage Raw-Edge Stitched Moccasin (Tobacco Suede)',
  'Ergonomic Arch-Contour Everyday Loafer (Saddle Brown)',
  'Hand-Burnished Wingtip Dress Shoe (Antique Black)',
  'Lightweight Perforated Summer Slide (Deep Navy/Tan)',
  'Premium Vibram-Style Sole Derby Shoe (Mocha Leather)',
  'Double Monk Strap Handcrafted Shoe (Cognac Brown)',
  'Semi-Brogue Medallion Toe Formal (Oxblood Leather)',
  'All-Weather Treaded Country Walker (Tumbled Leather)',
  'Supple Nappa Leather Venetian Loafer (Jet Black)',
  'Lug-Sole Leather Service Boot (Raw Honey Leather)',
  'Hand-Woven Vamp Slip-On Shoes (Walnut Brown)',
  'Cushioned Wedge Sole Oxford (Distressed Whiskey)',
  'Casual Unlined Desert Boot (Sand Nubuck Leather)',
  'Artisan Leather Mule with Padded Insole (Desert Sand)',
  'Water-Resistant Commuter Dress Shoe (Polished Onyx)',
  'Classic Tassel Loafer (Rich Bordeaux Leather)',
  'Square-Toe Heritage Dress Shoe (Dark Chocolate)',
  'Flexible Boat Shoe with Rawhide Laces (Deep Saddle)',
  'High-Traction Hiking Derby Footwear (Field Brown)',
  'Ultra-Cushion Ortho Footbed Slide (Carbon Black)',
  'Full-Grain Goodyear Stitched Boot (Amber Harness)',
  'Bespoke Export Prototype Dress Shoe (Limited Atelier Run)'
];

const SHOE_PRICES = [
  { price: '₹ 2,999', priceNum: 2999 },
  { price: '₹ 2,499', priceNum: 2499 },
  { price: '₹ 3,499', priceNum: 3499 },
  { price: '₹ 1,299', priceNum: 1299 },
  { price: '₹ 3,199', priceNum: 3199 },
  { price: '₹ 1,499', priceNum: 1499 },
  { price: '₹ 3,799', priceNum: 3799 },
  { price: '₹ 2,799', priceNum: 2799 },
  { price: '₹ 3,899', priceNum: 3899 },
  { price: '₹ 2,299', priceNum: 2299 },
  { price: '₹ 2,599', priceNum: 2599 },
  { price: '₹ 3,699', priceNum: 3699 },
  { price: '₹ 1,399', priceNum: 1399 },
  { price: '₹ 3,299', priceNum: 3299 },
  { price: '₹ 3,599', priceNum: 3599 },
  { price: '₹ 3,499', priceNum: 3499 },
  { price: '₹ 3,199', priceNum: 3199 },
  { price: '₹ 2,899', priceNum: 2899 },
  { price: '₹ 4,199', priceNum: 4199 },
  { price: '₹ 2,699', priceNum: 2699 },
  { price: '₹ 2,999', priceNum: 2999 },
  { price: '₹ 2,799', priceNum: 2799 },
  { price: '₹ 1,599', priceNum: 1599 },
  { price: '₹ 3,399', priceNum: 3399 },
  { price: '₹ 3,299', priceNum: 3299 },
  { price: '₹ 3,199', priceNum: 3199 },
  { price: '₹ 2,499', priceNum: 2499 },
  { price: '₹ 3,799', priceNum: 3799 },
  { price: '₹ 1,499', priceNum: 1499 },
  { price: '₹ 4,499', priceNum: 4499 },
  { price: '₹ 3,999', priceNum: 3999 }
];

// Generate the 31 real footwear products with authentic photos
export const REAL_SHOE_PRODUCTS = REAL_SHOE_IMAGES.map((img, i) => {
  const title = SHOE_TITLES[i] || `Classic Edge Authentic Footwear Style #${i + 1}`;
  const priceObj = SHOE_PRICES[i] || { price: '₹ 2,999', priceNum: 2999 };
  const subTypes = [
    'Handcrafted Leather Footwear',
    'Casual Driving Shoes',
    'Executive Dress Shoes',
    'Comfort Slides & Clogs',
    'Outdoor Rugged Footwear'
  ];

  return {
    id: `real-shoe-${i + 1}`,
    name: title,
    category: 'leather-shoes',
    categoryLabel: 'Leather Shoes',
    subType: subTypes[i % subTypes.length],
    price: priceObj.price,
    priceNum: priceObj.priceNum,
    image: img.url,
    isRealFactoryPhoto: true,
    modelCode: `CE-RSH-${String(i + 1).padStart(2, '0')}`,
    description: `Authentic atelier sample from our actual production floor. Features hand-cut genuine leather uppers, reinforced stitching, and durable outsoles manufactured for Middle East and international export.`,
    highlights: [
      '100% genuine export leather inventory',
      'Sizes 39 to 46 EU available for bulk orders',
      'Direct factory unit pricing with sample order availability'
    ],
    specs: 'Available for immediate wholesale packing (12/24 pairs per carton) or direct unit purchase.'
  };
});

// All 27 Individual Abaya Products representing the official abaya.pdf catalogue
const ABAYA_DATA_27 = [
  {
    name: 'Dubai Royal Nida Embellished Abaya & Sheila',
    subType: 'Luxury Dubai Abayas',
    price: '₹ 3,499',
    priceNum: 3499,
    desc: 'High-grade Dubai original Nida fabric abaya featuring subtle sleeve embroidery and matching lightweight sheila.'
  },
  {
    name: 'Kimono Flare Open-Front Crepe Abaya',
    subType: 'Open Front Abayas',
    price: '₹ 3,199',
    priceNum: 3199,
    desc: 'Contemporary loose-fit kimono silhouette crafted in textured crepe with discreet snap button closures.'
  },
  {
    name: 'Classic Black Minimalist Kaftan Abaya',
    subType: 'Everyday Traditional Abayas',
    price: '₹ 2,799',
    priceNum: 2799,
    desc: 'Deep onyx black traditional cut kaftan abaya made from high-density Salona fabric with clean stitched hems.'
  },
  {
    name: 'Festive Velvet & Brocade Border Evening Abaya',
    subType: 'Occasion & Evening Abayas',
    price: '₹ 4,299',
    priceNum: 4299,
    desc: 'Exquisite evening wear abaya with velvet panel detailing and gold thread zari borders designed for Eid.'
  },
  {
    name: 'Raw Silk & Linen Blend Summer Abaya',
    subType: 'Summer Linen Abayas',
    price: '₹ 3,699',
    priceNum: 3699,
    desc: 'Eco-conscious linen blend modest abaya tailored for breathability in warm Gulf summer weather.'
  },
  {
    name: 'Pearl-Beaded Sleeve Organza Overlay Abaya',
    subType: 'Designer Party Abayas',
    price: '₹ 3,899',
    priceNum: 3899,
    desc: 'Delicate dual-layer abaya with sheer organza sleeve accents and hand-sewn faux pearl border detailing.'
  },
  {
    name: 'Traditional Emirati Batwing Cut Modest Abaya',
    subType: 'Traditional Gulf Abayas',
    price: '₹ 2,999',
    priceNum: 2999,
    desc: 'Generous batwing cut delivering maximum modesty and unrestricted movement in premium matte Japanese crepe.'
  },
  {
    name: 'Contrast Satin Trim Tiered Luxury Abaya',
    subType: 'Modern Tailored Abayas',
    price: '₹ 3,599',
    priceNum: 3599,
    desc: 'Architectural silhouette featuring subtle satin piping along collar and cascading tiered hem.'
  },
  {
    name: 'Geometric Gold-Thread Zari Embroidered Abaya',
    subType: 'Embroidered Formal Abayas',
    price: '₹ 4,199',
    priceNum: 4199,
    desc: 'Intricate Arabian geometric embroidery woven with fine metallic gold zari along front placket.'
  },
  {
    name: 'Pleated Back Flare Butterfly Cut Abaya',
    subType: 'Butterfly Cut Abayas',
    price: '₹ 3,299',
    priceNum: 3299,
    desc: 'Flowing butterfly profile with hidden accordion pleats creating dramatic fluid drape when walking.'
  },
  {
    name: 'Moroccan Mokhous Brocade Modest Abaya',
    subType: 'Moroccan Style Abayas',
    price: '₹ 3,999',
    priceNum: 3999,
    desc: 'Richly patterned jacquard brocade paneling inspired by traditional Maghrebi artisanal vestments.'
  },
  {
    name: 'Double-Layer Draped Chiffon Front Abaya',
    subType: 'Layered Chiffon Abayas',
    price: '₹ 3,499',
    priceNum: 3499,
    desc: 'Featherlight draped front overlay creating a waterfall silhouette over opaque inner slip.'
  },
  {
    name: 'Textured Wave Crepe Flowing Maxi Abaya',
    subType: 'Textured Crepe Abayas',
    price: '₹ 2,899',
    priceNum: 2899,
    desc: 'Minimalist straight-cut abaya featuring self-textured wavy ribbing for everyday practical elegance.'
  },
  {
    name: 'French Lace Cuff Trim Formal Occasion Abaya',
    subType: 'Lace Trimmed Abayas',
    price: '₹ 3,799',
    priceNum: 3799,
    desc: 'Romantic floral eyelash lace cuffs paired with premium jet-black Nida for formal functions.'
  },
  {
    name: 'Tailored Mandarin Collar Executive Abaya',
    subType: 'Workwear & Corporate Abayas',
    price: '₹ 3,199',
    priceNum: 3199,
    desc: 'Structured professional abaya with neat mandarin stand collar and covered placket buttoning.'
  },
  {
    name: 'Fine Floral Threadwork Modest Jubbah Abaya',
    subType: 'Floral Embroidered Abayas',
    price: '₹ 3,699',
    priceNum: 3699,
    desc: 'Tone-on-tone botanical threadwork embroidery on sleeves and back yoke in high-grade crepe.'
  },
  {
    name: 'Dual-Tone Contemporary Border Abaya',
    subType: 'Color Block Abayas',
    price: '₹ 3,399',
    priceNum: 3399,
    desc: 'Refined modern color-block styling pairing deep charcoal with warm sand beige accents.'
  },
  {
    name: 'Crystal-Sprinkled Yoke Celebration Abaya',
    subType: 'Crystal Embellished Abayas',
    price: '₹ 4,399',
    priceNum: 4399,
    desc: 'Hand-applied heat-set Swarovski-style crystal motifs across shoulder yoke for festive sparkle.'
  },
  {
    name: 'Breathable Crinkle Rayon Everyday Abaya',
    subType: 'Casual Travel Abayas',
    price: '₹ 2,699',
    priceNum: 2699,
    desc: 'Ultra-soft pre-washed crinkle rayon abaya requiring minimal ironing for daily errands and travel.'
  },
  {
    name: 'Scalloped Hem Open-Front Cape Abaya',
    subType: 'Cape Style Abayas',
    price: '₹ 3,599',
    priceNum: 3599,
    desc: 'Precision laser-cut scalloped borders framing an elegant sweeping cape overlay.'
  },
  {
    name: 'Shimmering Satin Luxury Gala Night Abaya',
    subType: 'Luxury Satin Abayas',
    price: '₹ 4,499',
    priceNum: 4499,
    desc: 'Heavyweight liquid silk-satin blend offering luminous drape for high-society galas and VIP banquets.'
  },
  {
    name: 'Hand-Smocked Elasticated Cuff Daily Abaya',
    subType: 'Comfort Everyday Abayas',
    price: '₹ 2,799',
    priceNum: 2799,
    desc: 'Ablution-friendly elasticated smocked cuffs with functional side pockets and generous flare.'
  },
  {
    name: 'Metallic Jacquard Weave Ceremonial Abaya',
    subType: 'Jacquard Ceremonial Abayas',
    price: '₹ 4,199',
    priceNum: 4199,
    desc: 'Woven damask jacquard pattern featuring subtle metallic threading across sleeves and hem.'
  },
  {
    name: 'Trench-Cut Belted Wrap Modest Abaya',
    subType: 'Trench & Wrap Abayas',
    price: '₹ 3,799',
    priceNum: 3799,
    desc: 'Outerwear-inspired trench cut with detachable fabric tie belt and clean lapel finish.'
  },
  {
    name: 'Heritage Gold Coin Trim Gulf Abaya',
    subType: 'Heritage Khaleeji Abayas',
    price: '₹ 3,899',
    priceNum: 3899,
    desc: 'Traditional Khaleeji heritage styling with delicate antique gold coin trim along front edge.'
  },
  {
    name: 'Pinstripe Linen Lightweight Travel Abaya',
    subType: 'Linen Travel Abayas',
    price: '₹ 3,299',
    priceNum: 3299,
    desc: 'Subtle vertical pinstripes elongation in breathable natural linen weave with mandarin neck.'
  },
  {
    name: 'Haute Couture Masterpiece Embellished Abaya',
    subType: 'Bridal & Couture Abayas',
    price: '₹ 4,799',
    priceNum: 4799,
    desc: 'Signature atelier couture creation featuring 3D embroidered floral appliques and beaded trimming.'
  }
];

export const ABAYA_PRODUCTS = ABAYA_DATA_27.map((item, index) => {
  const pageNum = index + 1;
  const codeNum = String(pageNum).padStart(2, '0');
  return {
    id: `ab-${codeNum}`,
    name: item.name,
    category: 'abaya-collection',
    categoryLabel: 'Abaya Collection',
    subType: item.subType,
    price: item.price,
    priceNum: item.priceNum,
    image: `https://images.unsplash.com/photo-${[
      '1585728748178-f742f56d4a71',
      '1596783049557-61e8886caab2',
      '1567401893414-76b7b1e5a7a5',
      '1558769132-cb1aea458c5e',
      '1584589167171-541ce45f1eea',
      '1539109136881-3be0616acf4b',
      '1515886657613-9f3515b0c78f',
      '1529139574466-a303027c1d8b',
      '1490481651871-ab68de25d43d',
      '1496747611176-843222e1e57c',
      '1509631179647-0177331693ae',
      '1485968579580-b6d095142e6e',
      '1552874869-5c39ec9288dc',
      '1525507119028-ed4c629a60a3',
      '1544441893-675973e31985',
      '1508427953056-b00b8d78ebf5',
      '1516762689617-e1cffcef479d',
      '1548883354-7622d03aca27',
      '1502716119720-b23a93e5fe1b',
      '1483985988355-763728e1935b',
      '1492707892479-7bc8d5a4ee93',
      '1512436991641-6745cdb1723f',
      '1534528741775-53994a69daeb',
      '1524504388940-b1c1722653e1',
      '1506794778202-cad84cf45f1d',
      '1517841905240-472988babdf9',
      '1539571696357-5a69c17a67c6'
    ][index % 27]}?auto=format&fit=crop&w=800&q=80`,
    pdfPage: pageNum,
    pdfReference: `abaya.pdf (Page ${pageNum})`,
    modelCode: `CE-ABY-${codeNum}`,
    description: item.desc,
    specs: `Available sizes 52-60 inch. Carton packaging 24 units. Direct from abaya.pdf (Page ${pageNum}).`
  };
});

