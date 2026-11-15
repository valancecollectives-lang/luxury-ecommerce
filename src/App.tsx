import React, { useState, useEffect, useMemo } from 'react';

// --- DATA TYPES ---
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // vs USD
  prefix: boolean;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1, prefix: true },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, prefix: true },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, prefix: true },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5, prefix: true },
};

export interface FinishVariant {
  id: string;
  name: string;
  priceDelta: number;
  swatchColor: string;
  secondarySwatch?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Seating' | 'Lighting' | 'Objects & Ceramics' | 'Textiles';
  materialClass: 'Wood' | 'Stone & Marble' | 'Brass & Metal' | 'Linen & Wool' | 'Clay';
  priceUSD: number;
  provenance: string;
  artisan: string;
  leadTime: string;
  editionBadge: string;
  images: string[];
  finishes: FinishVariant[];
  dimensions: string;
  weight: string;
  materialsDetail: string;
  careGuide: string;
  description: string;
  roomTag: 'Living' | 'Dining' | 'Sanctuary';
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  selectedFinish: FinishVariant;
  quantity: number;
}

export interface RoomSpace {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  description: string;
  productIds: string[];
  hotspots: { x: number; y: number; productId: string; label: string }[];
}

// --- CATALOG DATA ---
export const PRODUCTS: Product[] = [
  {
    id: 'sora-armchair',
    name: 'Sora Sculptural Lounge Chair',
    subtitle: 'Edition 04 / Bleached Ash & Belgian Flax',
    category: 'Seating',
    materialClass: 'Wood',
    priceUSD: 1450,
    provenance: 'Nagano Prefecture, Japan',
    artisan: 'Studio Moriyama Joinery (Est. 1954)',
    leadTime: 'In Stock • Dispatched in 48h',
    editionBadge: 'Numbered Edition of 60',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'bleached-ash', name: 'Bleached Mountain Ash & Natural Flax', priceDelta: 0, swatchColor: '#E6DDD0', secondarySwatch: '#D2C5B4' },
      { id: 'shou-sugi', name: 'Charred Shou Sugi Ban & Slate Flax', priceDelta: 160, swatchColor: '#2B2927', secondarySwatch: '#4A4643' },
    ],
    dimensions: 'W 84cm × D 79cm × H 72cm (Seat Height 38cm)',
    weight: '19.4 kg',
    materialsDetail: 'Hand-shaped FSC-certified solid ash wood with traditional mortise-and-tenon joints. Upholstered in untreated French washed flax linen over organic natural latex.',
    careGuide: 'Wipe timber with dry lint-free cloth. Nourish wood annually with organic beeswax balm. Professional dry clean for linen cushions.',
    description: 'Conceived as an architectural meditation on sitting. The low, sloping stance encourages diaphragmatic breathing, while the exposed joinery honors Japanese woodworking heritage.',
    roomTag: 'Living',
  },
  {
    id: 'kanso-lamp',
    name: 'Kanso Travertine Table Lamp',
    subtitle: 'Monolith Column in Honed Rapolano Stone',
    category: 'Lighting',
    materialClass: 'Stone & Marble',
    priceUSD: 520,
    provenance: 'Rapolano Terme, Tuscany',
    artisan: 'Cava Fratelli Stone Ateliers',
    leadTime: 'In Stock • Immediate Dispatch',
    editionBadge: 'Limited Studio Allocation',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'ivory-travertine', name: 'Honed Rapolano Ivory Travertine', priceDelta: 0, swatchColor: '#D8CEBE' },
      { id: 'nero-marquina', name: 'Noir Marquina Veined Stone', priceDelta: 90, swatchColor: '#21201F', secondarySwatch: '#5C5854' },
    ],
    dimensions: 'Ø 24cm × H 38cm',
    weight: '8.2 kg',
    materialsDetail: 'Honed porous travertine solid column block paired with solid unlacquered spun brass shade. Discrete brass rotary dimmer switch at base with warm 2200K LED array.',
    careGuide: 'Stone is pre-sealed with breathable carnauba wax. Clean only with a damp cotton cloth; do not use acidic solutions.',
    description: 'Sculpted from a single geological block of Tuscan limestone. When lit, the amber illumination cascades downward, emphasizing the subterranean mineral cavities in the stone face.',
    roomTag: 'Living',
  },
  {
    id: 'mizu-vessel',
    name: 'Mizu Hand-Thrown Stoneware Vessel',
    subtitle: 'Kyoto Wild Riverbed Clay with Natural Ash Glaze',
    category: 'Objects & Ceramics',
    materialClass: 'Clay',
    priceUSD: 240,
    provenance: 'Uji River Basin, Kyoto, Japan',
    artisan: 'Master Hiroshi Kawai (5th Gen)',
    leadTime: 'Batch 06: Only 14 Remaining',
    editionBadge: 'Wood-Kiln Fired',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'natural-ash', name: 'Wild River Clay & Pine Ash Glaze', priceDelta: 0, swatchColor: '#6B6055', secondarySwatch: '#3E3730' },
      { id: 'matte-chalk', name: 'Iron Slip & Matte Chalk Wash', priceDelta: 25, swatchColor: '#DCD4C7', secondarySwatch: '#8E8476' },
    ],
    dimensions: 'Ø 20cm × H 28cm (Mouth Ø 8cm)',
    weight: '3.4 kg',
    materialsDetail: 'High-fired coarse mountain clay harvested by hand from riverbed sediment. Fired for 96 continuous hours in a split-bamboo anagama kiln with red pine wood.',
    careGuide: 'Rinse with tepid water. Water-tight for seasonal botanical branches. Surface develops deeper wabi patina with repeated handling.',
    description: 'Each vessel bears the direct path of flame and wood-ash melting across its curves. No two vessels share identical flashings; signed with the artist\'s personal seal stamped at base.',
    roomTag: 'Dining',
  },
  {
    id: 'nara-linen-throw',
    name: 'Nara Washed Belgian Flax Blanket',
    subtitle: 'Stone-Washed Long-Staple Flax / Fringe Hem',
    category: 'Textiles',
    materialClass: 'Linen & Wool',
    priceUSD: 290,
    provenance: 'Flanders, Belgium',
    artisan: 'Kortrijk Heritage Looms',
    leadTime: 'In Stock • Dispatched in 24h',
    editionBadge: 'Pure European Flax®',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606744888344-498238f017e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584100936798-638541cfc345?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'raw-ecru', name: 'Undyed Raw Oatmeal Ecru', priceDelta: 0, swatchColor: '#DDD5C7' },
      { id: 'slate-charcoal', name: 'Mineral Charcoal & Peat', priceDelta: 20, swatchColor: '#3A3835' },
    ],
    dimensions: '150cm × 240cm',
    weight: '1.4 kg',
    materialsDetail: '100% Normandy-grown flax fiber, dew-retted and woven on vintage rapier looms. Finished with natural volcanic pumice wash for unparalleled fluid drape.',
    careGuide: 'Gentle machine wash cold with organic neutral detergent. Line dry in gentle shade or tumble dry on delicate low heat for relaxed rumpled texture.',
    description: 'Dense yet breathing naturally through warm summer evenings and crisp autumn frost. Generously proportioned for king beds or draped over low architectural sofas.',
    roomTag: 'Sanctuary',
  },
  {
    id: 'kyoto-bench',
    name: 'Kyoto Low Monolith Bench',
    subtitle: 'Charred White Oak / Hand-Carved Joinery',
    category: 'Seating',
    materialClass: 'Wood',
    priceUSD: 1890,
    provenance: 'Gifu Forest Valley, Japan',
    artisan: 'Atelier Hida Takayama Woodcraft',
    leadTime: 'Made to Order • 3–4 Weeks Lead Time',
    editionBadge: 'Master Guild Certified',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'charred-oak', name: 'Shou Sugi Ban Flame-Charred Oak', priceDelta: 0, swatchColor: '#1A1816' },
      { id: 'natural-smoked', name: 'Smoked Japanese White Oak', priceDelta: -50, swatchColor: '#786650' },
    ],
    dimensions: 'W 155cm × D 38cm × H 37cm',
    weight: '27.5 kg',
    materialsDetail: 'Air-seasoned solid Japanese white oak aged for 5 years. Preserved through traditional Yakisugi flame-charring, brush-burnished, and sealed with natural walnut oil.',
    careGuide: 'Dust with soft dry cloth. Highly resistant to spills, humidity, and insects due to the carbonized exterior shell.',
    description: 'Rooted in monumental minimalism. Serves with quiet dignity as a dining bench, gallery seating, or low art display plinth in an entrance hall.',
    roomTag: 'Dining',
  },
  {
    id: 'arco-pendant',
    name: 'Arco Spun Brass Ceiling Monograph',
    subtitle: 'Unlacquered Living Brass & Bone China Diffuser',
    category: 'Lighting',
    materialClass: 'Brass & Metal',
    priceUSD: 720,
    provenance: 'Wiltshire Foundry, England',
    artisan: 'Atelier Vance Metalworks',
    leadTime: 'In Stock • Dispatched in 48h',
    editionBadge: 'Bespoke Patina',
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'raw-brass', name: 'Living Spun Raw Brass (Hand-Rubbed)', priceDelta: 0, swatchColor: '#CBB279' },
      { id: 'bronzed-gunmetal', name: 'Patinated Dark Bronze & Umber', priceDelta: 85, swatchColor: '#433D35' },
    ],
    dimensions: 'Ø 48cm × H 22cm (300cm Braided Fabric Cord)',
    weight: '5.6 kg',
    materialsDetail: 'Spun by hand from 2.5mm solid copper-zinc brass plate. Features an interior soft matte reflector and hand-turned brass ceiling canopy with hidden magnetic mounting.',
    careGuide: 'Unlacquered surface will gracefully age and develop unique fingerprints and patina over decades. Brass polish may be used if high shine is preferred.',
    description: 'A sweeping hemisphere of warm metal that directs glare-free luminescence across dining tables and reading alcoves with architectural precision.',
    roomTag: 'Dining',
  },
  {
    id: 'ostrava-pedestal',
    name: 'Ostrava Fluted Viola Marble Pedestal',
    subtitle: 'Quarried Calacatta Viola / Honed Matte Facets',
    category: 'Objects & Ceramics',
    materialClass: 'Stone & Marble',
    priceUSD: 1350,
    provenance: 'Apuan Alps, Carrara, Italy',
    artisan: 'Laboratorio Marmi di Carrara',
    leadTime: 'Numbered Series of 30',
    editionBadge: 'Monolithic Carving',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'viola-burgundy', name: 'Calacatta Viola Deep Cabernet Vein', priceDelta: 0, swatchColor: '#E2DBD2', secondarySwatch: '#582C35' },
      { id: 'arabescato-grigio', name: 'Arabescato Grigio Silver Vein', priceDelta: -80, swatchColor: '#ECE7E1', secondarySwatch: '#787570' },
    ],
    dimensions: 'W 32cm × D 32cm × H 76cm',
    weight: '36.0 kg',
    materialsDetail: 'Milled from a continuous block of Italian brecciated marble. Vertical concave flutes are carved, then finished by hand using water-wetted diamond abrasive pads.',
    careGuide: 'Supplied with felt foot pads. Clean with stone-safe pH-neutral cleaner. Wipe wine, oil, and acidic liquids immediately to avoid etching.',
    description: 'Designed as an exhibition plinth for sculptural vessels, floral ikebana arrangements, or as an independent architectural focal anchor.',
    roomTag: 'Living',
  },
  {
    id: 'wabi-teaset',
    name: 'Wabi Ceremonial Kyusu & Cup Set',
    subtitle: 'Includes Teapot with Bent Bamboo Handle & Two Cups',
    category: 'Objects & Ceramics',
    materialClass: 'Clay',
    priceUSD: 310,
    provenance: 'Shigaraki Ceramic Valley, Japan',
    artisan: 'Tanaka Kiln Studio',
    leadTime: 'In Stock • Dispatched in 24h',
    editionBadge: 'Ceremonial Grade',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'coarse-iron', name: 'Coarse Iron-Speckled Stoneware', priceDelta: 0, swatchColor: '#4A4138' },
      { id: 'hakeme-slip', name: 'Hakeme Brushed Cream Slip', priceDelta: 30, swatchColor: '#D9D1C3', secondarySwatch: '#5A5146' },
    ],
    dimensions: 'Pot Capacity 620ml; Cups 175ml (Pair)',
    weight: '1.3 kg',
    materialsDetail: 'Local coarse clay with quartz inclusions. Natural bent smoked bamboo handle secured with hand-twisted brass wire loops. Precision ceramic filter holes inside spout.',
    careGuide: 'Rinse with pure hot water only. Do not wash with detergent as clay absorbs tea oils over years, improving steep flavors.',
    description: 'Created specifically for slow gyokuro and sencha infusions. The balance between the tactile, gritty clay body and smooth bamboo handle invites mindful ritual.',
    roomTag: 'Sanctuary',
  },
  {
    id: 'elysian-rug',
    name: 'Elysian Hand-Knotted Highland Rug',
    subtitle: 'Tibetan Highland Wool / Raw Architectural Pile',
    category: 'Textiles',
    materialClass: 'Linen & Wool',
    priceUSD: 1750,
    provenance: 'Kathmandu Valley, Nepal',
    artisan: 'Himalayan Artisans Cooperative',
    leadTime: 'Limited Allocation • 2 Pieces in Stock',
    editionBadge: 'GoodWeave Certified',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'natural-ecru', name: 'Undyed Natural Ecru & Chalk Sheep Wool', priceDelta: 0, swatchColor: '#EBE4D8' },
      { id: 'slate-dappled', name: 'Dappled Mineral Sand & Shadow Grey', priceDelta: 90, swatchColor: '#A89F93', secondarySwatch: '#5E574E' },
    ],
    dimensions: '200cm × 300cm (Custom dimensions on request)',
    weight: '16.5 kg',
    materialsDetail: 'Hand-carded and hand-spun Tibetan highland sheep wool rich in natural lanolin. 80-knot Senneh construction woven on traditional vertical timber looms.',
    careGuide: 'Vacuum without beater bar. Natural lanolin resists spills; blot liquids promptly with clean cotton towel. Professional wool rug wash every 3-5 years.',
    description: 'Unbleached and un-dyed, displaying the organic tonal variations of Tibetan highland fleece. Absorbs room acoustic reverberation while offering luxurious softness underfoot.',
    roomTag: 'Living',
  },
  {
    id: 'material-swatch-box',
    name: 'The Atelier Monograph & Material Box',
    subtitle: 'Includes 4 Hardwood Samples, 2 Honed Stones & 4 Flax Cuts',
    category: 'Objects & Ceramics',
    materialClass: 'Wood',
    priceUSD: 45,
    provenance: 'Curated by AURA Atelier Copenhagen',
    artisan: 'AURA Materials Library',
    leadTime: 'Immediate Worldwide Dispatch',
    editionBadge: 'Fully Refundable with Order',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85',
    ],
    finishes: [
      { id: 'full-box', name: 'Complete 2026 Material Monograph Kit', priceDelta: 0, swatchColor: '#D8CEBE' },
    ],
    dimensions: 'W 24cm × D 18cm × H 6cm (Clothbound Box)',
    weight: '1.9 kg',
    materialsDetail: 'Contains 10cm hand-finished blocks of Bleached Ash, Shou Sugi Ban Oak, Honed Rapolano Travertine, Viola Marble, and swatches of Normandy Flax. $45 cost is automatically refunded on any furniture commission.',
    careGuide: 'Keep in dry studio environment for client consultations.',
    description: 'Created for architects, collectors, and interior designers who wish to experience the tactile weight, aroma, and light reflectance of our raw materials before specifying.',
    roomTag: 'Sanctuary',
  },
];

// --- ROOM SPACES DATA ---
export const ROOM_SPACES: RoomSpace[] = [
  {
    id: 'living-gallery',
    number: '01',
    title: 'The Living Gallery',
    subtitle: 'Copenhagen Waterfront Residence',
    location: 'Holmen, Copenhagen',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    description: 'Generous morning daylight filters through floor-to-ceiling acoustic glass, striking the tactile grains of bleached mountain ash and the quiet monolith of Rapolano travertine.',
    productIds: ['sora-armchair', 'kanso-lamp', 'ostrava-pedestal', 'elysian-rug'],
    hotspots: [
      { x: 38, y: 64, productId: 'sora-armchair', label: 'Sora Lounge Chair' },
      { x: 68, y: 48, productId: 'kanso-lamp', label: 'Kanso Travertine Lamp' },
      { x: 82, y: 72, productId: 'ostrava-pedestal', label: 'Ostrava Viola Pedestal' },
    ],
  },
  {
    id: 'dining-atrium',
    number: '02',
    title: 'The Dining Atrium',
    subtitle: 'Private Residence in the Brera District',
    location: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'A dialogue between brutalist charred timber and luminous spun brass. Designed for communal meals that extend deep into the night under warm amber illumination.',
    productIds: ['kyoto-bench', 'arco-pendant', 'mizu-vessel'],
    hotspots: [
      { x: 50, y: 35, productId: 'arco-pendant', label: 'Arco Brass Monograph' },
      { x: 42, y: 78, productId: 'kyoto-bench', label: 'Kyoto Monolith Bench' },
      { x: 62, y: 65, productId: 'mizu-vessel', label: 'Mizu Stoneware Vessel' },
    ],
  },
  {
    id: 'sanctuary-tea',
    number: '03',
    title: 'The Quiet Sanctuary',
    subtitle: 'Pavilion Restored with Wabi-Sabi Aesthetics',
    location: 'Higashiyama, Kyoto',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    description: 'A space of intentional stillness. Hand-washed Belgian flax drapes softly alongside unglazed Shigaraki ceramics and the soothing cadence of steeped green tea.',
    productIds: ['nara-linen-throw', 'wabi-teaset', 'material-swatch-box'],
    hotspots: [
      { x: 48, y: 68, productId: 'wabi-teaset', label: 'Wabi Kyusu Set' },
      { x: 74, y: 55, productId: 'nara-linen-throw', label: 'Nara Washed Flax' },
    ],
  },
];

// --- PRESS & CRITICAL ACCLAIM ---
export const PRESS_ACCLAIM = [
  {
    publication: 'Architectural Digest',
    quote: 'AURA Studio is redefining quiet luxury for contemporary residential interiors with an uncompromising devotion to raw materials and generational ateliers.',
    date: 'Design Excellence Issue',
  },
  {
    publication: 'Wallpaper*',
    quote: 'Best in Show: The Sora Lounge Chair achieves a sublime architectural balance between structural restraint and tactile warmth.',
    date: 'Design Awards 2026',
  },
  {
    publication: 'Elle Decor',
    quote: 'The antithesis to fast consumer furniture. Heirloom objects designed to patina with profound grace over generations of living.',
    date: 'Milan Design Week',
  },
  {
    publication: 'Financial Times • How To Spend It',
    quote: 'For serious collectors, AURA offers museum-grade provenance without institutional pretension. Honest stone, flame-charred oak, and pure flax.',
    date: 'The Collector Edition',
  },
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  // Navigation & Preferences
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeMaterial, setActiveMaterial] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('curated');
  const [viewMode, setViewMode] = useState<'grid' | 'lookbook'>('grid');

  // Interactive Overlays
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);

  // Settlement summary record (preserves order information on Step 4 confirmation even after cart is emptied)
  const [settledSummary, setSettledSummary] = useState<{
    reference: string;
    totalUSD: number;
    currency: CurrencyCode;
    formattedTotal: string;
    itemCount: number;
  } | null>(null);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewFinish, setQuickViewFinish] = useState<FinishVariant | null>(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);

  // Room Spaces
  const [activeSpace, setActiveSpace] = useState<RoomSpace>(ROOM_SPACES[0]);
  const [activeHotspotProduct, setActiveHotspotProduct] = useState<Product | null>(null);

  // Cart Customization
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0); // 0.1 for 10%
  const [promoMessage, setPromoMessage] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');
  const [deliveryTier, setDeliveryTier] = useState<'standard' | 'white-glove'>('white-glove');

  // Trade Form
  const [tradeForm, setTradeForm] = useState({
    firmName: '',
    contactName: '',
    email: '',
    projectType: 'Private Residential Commission',
    timeline: '3–6 Months',
    notes: '',
  });
  const [tradeSubmitted, setTradeSubmitted] = useState(false);

  // Checkout Form
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    suite: '',
    city: '',
    country: 'United States',
    postalCode: '',
    buildingAccessNotes: '',
    paymentMethod: 'apple-pay' as 'apple-pay' | 'card' | 'wire',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // LocalStorage Sync Effects
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart_v1', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist_v1', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  // Pricing Helpers
  const formatPrice = (usd: number): string => {
    const curr = CURRENCIES[currency];
    const converted = Math.round(usd * curr.rate);
    return `${curr.symbol}${converted.toLocaleString('en-US')}`;
  };

  // Cart Calculations
  const rawSubtotalUSD = useMemo(() => {
    return cart.reduce((acc, item) => {
      const itemBase = item.product.priceUSD + (item.selectedFinish?.priceDelta || 0);
      return acc + itemBase * item.quantity;
    }, 0);
  }, [cart]);

  const discountAmountUSD = Math.round(rawSubtotalUSD * promoDiscountRate);
  const whiteGloveThresholdUSD = 1500;
  const isComplimentaryDelivery = rawSubtotalUSD >= whiteGloveThresholdUSD;
  const deliveryCostUSD = rawSubtotalUSD === 0 
    ? 0 
    : isComplimentaryDelivery 
      ? 0 
      : deliveryTier === 'white-glove' ? 140 : 45;

  const totalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD + deliveryCostUSD);
  const totalItemCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  // Cart Actions
  const addToCart = (product: Product, finish?: FinishVariant) => {
    const chosenFinish = finish || product.finishes[0];
    const cartItemId = `${product.id}-${chosenFinish.id}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        cartItemId,
        productId: product.id,
        product,
        selectedFinish: chosenFinish,
        quantity: 1,
      }];
    });

    showToast(`Added "${product.name}" to shopping bag.`);
    setCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => {
      const next = prev.filter(i => i.cartItemId !== cartItemId);
      if (next.length === 0) {
        showToast('Shopping bag is now unoccupied.');
      }
      return next;
    });
  };

  // Finalize White-Glove Settlement
  const handleFinalizeSettlement = () => {
    if (cart.length === 0) {
      showToast('Shopping bag is empty. Please select an object first.');
      return;
    }

    setSettledSummary({
      reference: `#AU-${Math.floor(10000 + Math.random() * 90000)}`,
      totalUSD,
      currency,
      formattedTotal: formatPrice(totalUSD),
      itemCount: totalItemCount,
    });
    setCart([]);
    try {
      localStorage.removeItem('aura_cart_v1');
    } catch {}
    setCheckoutStep(4);
    showToast('Settlement authorized. Order registered with European logistics desk.');
  };

  // Wishlist Action
  const toggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from curated wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved item to curated wishlist.');
        return [...prev, productId];
      }
    });
  };

  // Promo Engine
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      setPromoDiscountRate(0.1);
      setPromoMessage('✓ 10% Atelier Welcome Privileges applied to order.');
    } else {
      setPromoMessage('Invalid invitation code. Try: AURA10');
    }
  };

  // Open Quick View
  const handleOpenQuickView = (prod: Product, finish?: FinishVariant) => {
    setQuickViewProduct(prod);
    setQuickViewFinish(finish || prod.finishes[0]);
    setQuickViewImageIndex(0);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCategory = activeCategory === 'All' || prod.category === activeCategory;
      const matchesMaterial = activeMaterial === 'All' || prod.materialClass === activeMaterial;
      return matchesCategory && matchesMaterial;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      return 0; // curated order
    });
  }, [activeCategory, activeMaterial, sortBy]);

  // Live Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materialsDetail.toLowerCase().includes(q) ||
      p.provenance.toLowerCase().includes(q) ||
      p.artisan.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="aura-sanctuary">
      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="aura-toast" role="status">
          <span className="toast-dot" />
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* --- 1. TOP UTILITY MONOGRAPH TICKER --- */}
      <div className="utility-ticker">
        <div className="ticker-container">
          <div className="ticker-left">
            <span className="ticker-tag">COMPLIMENTARY WHITE-GLOVE LOGISTICS</span>
            <span className="ticker-sub">Direct delivery, room-of-choice placement & crating removal on commissions over {formatPrice(whiteGloveThresholdUSD)}</span>
          </div>

          <div className="ticker-right">
            <div className="currency-selector">
              {(['USD', 'EUR', 'GBP', 'JPY'] as CurrencyCode[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`currency-btn ${currency === c ? 'active' : ''}`}
                  aria-label={`Switch currency to ${c}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <span className="ticker-divider">•</span>

            <button 
              className="trade-link-btn"
              onClick={() => setTradeModalOpen(true)}
            >
              Trade & Architects Portal
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. ARCHITECTURAL MASTHEAD --- */}
      <header className="site-header">
        <div className="header-inner">
          {/* Left Navigation */}
          <nav className="primary-nav" aria-label="Main Navigation">
            <a href="#collection" className="nav-anchor" onClick={() => setActiveCategory('All')}>
              Collection
            </a>
            <a href="#spaces" className="nav-anchor">
              Curated Spaces
            </a>
            <a href="#materials" className="nav-anchor">
              Material Monograph
            </a>
            <button 
              onClick={() => setTradeModalOpen(true)} 
              className="nav-anchor btn-clean"
            >
              Trade Concierge
            </button>
          </nav>

          {/* Center Architectural Wordmark */}
          <div className="brand-center">
            <a href="#" className="brand-wordmark" aria-label="AURA Studio Home">
              <span className="mark-main">A U R A</span>
              <span className="mark-sub">STUDIO COPENHAGEN & KYOTO</span>
            </a>
          </div>

          {/* Right Utilities */}
          <div className="header-utilities">
            <button 
              className="util-btn search-trigger" 
              onClick={() => setSearchOpen(true)}
              aria-label="Search Collection"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="7.5" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
              <span className="util-label">Search</span>
            </button>

            <button 
              className="util-btn wishlist-trigger" 
              onClick={() => setWishlistOpen(true)}
              aria-label="View Saved Objects"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="util-label">Saved ({wishlist.length})</span>
            </button>

            <button 
              className="bag-indicator-btn" 
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Bag"
            >
              <span className="bag-dot" />
              <span className="bag-text">Bag ({totalItemCount})</span>
              {totalUSD > 0 && <span className="bag-preview-val">• {formatPrice(totalUSD)}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* --- 3. EDITORIAL HERO MONOGRAPH --- */}
      <section className="hero-monograph">
        <div className="hero-container">
          <div className="hero-editorial-copy">
            <div className="edition-badge">
              <span className="pulse-mark" />
              <span>VOL. VI / ARCHITECTURAL OBJECTS OF SILENCE</span>
            </div>

            <h1 className="hero-title">
              Form distilled to its <br />
              <span className="serif-italic">essential permanence</span>.
            </h1>

            <p className="hero-body">
              Furniture, monolithic stonework, and hand-patinated lighting commissioned in strictly numbered allocations. Hand-shaped with multi-generational craft studios across Kyoto, Milan, and Copenhagen.
            </p>

            <div className="hero-cta-cluster">
              <a href="#collection" className="btn-primary-atelier">
                Explore Collection
              </a>
              <a href="#spaces" className="btn-secondary-atelier">
                View Curated Spaces
              </a>
              <button 
                onClick={() => {
                  const box = PRODUCTS.find(p => p.id === 'material-swatch-box');
                  if (box) addToCart(box);
                }}
                className="btn-text-monograph"
              >
                Order Material Swatch Box ({formatPrice(45)}) →
              </button>
            </div>

            <div className="hero-provenance-strip">
              <div className="strip-item">
                <span className="strip-title">Provenances</span>
                <span className="strip-val">Nagano • Rapolano • Flanders</span>
              </div>
              <div className="strip-item">
                <span className="strip-title">Joinery</span>
                <span className="strip-val">Traditional Blind Mortise & Tenon</span>
              </div>
              <div className="strip-item">
                <span className="strip-title">Logistics</span>
                <span className="strip-val">Insured White-Glove Crating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-frame">
            <div className="visual-wrapper">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural living gallery with Sora Armchair and Kanso Travertine lamp"
                className="hero-monograph-img"
              />

              {/* Interactive In-Scene Pin */}
              <button
                className="scene-pin"
                style={{ top: '62%', left: '42%' }}
                onClick={() => {
                  const p = PRODUCTS.find(item => item.id === 'sora-armchair');
                  if (p) handleOpenQuickView(p);
                }}
                aria-label="Inspect Sora Lounge Chair in photo"
              >
                <span className="pin-ping" />
                <span className="pin-center" />
                <span className="pin-tooltip">Plate 01: Sora Armchair — Inspect Object</span>
              </button>
            </div>
            <div className="visual-caption">
              <span>Plate 01 — Private Residential Salon, Holmen. Sora Armchair in Bleached Ash paired with Honed Rapolano Table Lamp.</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. ATELIER MATERIAL PROVENANCE STRIP --- */}
      <section className="provenance-ticker-bar">
        <div className="ticker-track">
          <span>HONED RAPOLANO TRAVERTINE</span>
          <span className="sep">✦</span>
          <span>FSC BLEACHED MOUNTAIN ASH</span>
          <span className="sep">✦</span>
          <span>SHOU SUGI BAN CHARRED OAK</span>
          <span className="sep">✦</span>
          <span>NORMANDY LONG-STAPLE FLUX</span>
          <span className="sep">✦</span>
          <span>KYOTO WOOD-FIRED WILD CLAY</span>
          <span className="sep">✦</span>
          <span>UNLACQUERED SPUN BRASS</span>
          <span className="sep">✦</span>
        </div>
      </section>

      {/* --- 5. CURATED SPACES (SHOP BY ARCHITECTURAL INTERIOR) --- */}
      <section className="spaces-section" id="spaces">
        <div className="section-header-wide">
          <div className="header-left">
            <span className="kicker-tag">ARCHITECTURAL CONTEXT</span>
            <h2 className="section-title">Curated Spaces</h2>
            <p className="section-description">
              Observe how our monolithic forms inhabit light, scale, and quiet acoustics across three international residences.
            </p>
          </div>

          {/* Space Tabs */}
          <div className="space-selector-tabs">
            {ROOM_SPACES.map((space) => (
              <button
                key={space.id}
                onClick={() => {
                  setActiveSpace(space);
                  setActiveHotspotProduct(null);
                }}
                className={`space-tab ${activeSpace.id === space.id ? 'active' : ''}`}
              >
                <span className="space-num">{space.number}</span>
                <span className="space-name">{space.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Space Canvas */}
        <div className="space-stage">
          <div className="stage-image-wrapper">
            <img 
              src={activeSpace.image} 
              alt={activeSpace.title} 
              className="stage-img"
            />

            {/* Interactive Pins */}
            {activeSpace.hotspots.map((h, idx) => (
              <button
                key={idx}
                className="space-hotspot-pin"
                style={{ top: `${h.y}%`, left: `${h.x}%` }}
                onClick={() => {
                  const found = PRODUCTS.find(p => p.id === h.productId);
                  if (found) setActiveHotspotProduct(found);
                }}
                aria-label={`View ${h.label}`}
              >
                <span className="h-pulse" />
                <span className="h-dot" />
                <span className="h-badge">{h.label}</span>
              </button>
            ))}
          </div>

          {/* Space Information Sidebar */}
          <div className="stage-narrative">
            <span className="space-location-tag">{activeSpace.location}</span>
            <h3 className="stage-title">{activeSpace.title}</h3>
            <p className="stage-text">{activeSpace.description}</p>

            {/* Selected Hotspot Object Card */}
            {activeHotspotProduct ? (
              <div className="hotspot-product-card">
                <span className="inspect-label">Selected In This Space:</span>
                <div className="h-prod-row">
                  <img src={activeHotspotProduct.images[0]} alt={activeHotspotProduct.name} className="h-prod-thumb" />
                  <div className="h-prod-meta">
                    <h4>{activeHotspotProduct.name}</h4>
                    <span className="h-prod-price">{formatPrice(activeHotspotProduct.priceUSD)}</span>
                    <span className="h-prod-artisan">{activeHotspotProduct.provenance}</span>
                  </div>
                </div>
                <div className="h-prod-actions">
                  <button 
                    onClick={() => handleOpenQuickView(activeHotspotProduct)} 
                    className="btn-h-secondary"
                  >
                    Inspect Details
                  </button>
                  <button 
                    onClick={() => addToCart(activeHotspotProduct)} 
                    className="btn-h-primary"
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-objects-list">
                <span className="list-title">Objects Configured In This Interior:</span>
                <div className="object-chips">
                  {activeSpace.productIds.map(pid => {
                    const prod = PRODUCTS.find(p => p.id === pid);
                    if (!prod) return null;
                    return (
                      <div 
                        key={pid} 
                        className="object-chip"
                        onClick={() => handleOpenQuickView(prod)}
                      >
                        <span className="chip-name">{prod.name}</span>
                        <span className="chip-price">{formatPrice(prod.priceUSD)}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="hint-text">Click any pin in the photography above to inspect specifications.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- 6. MAIN CATALOG SECTION --- */}
      <section className="catalog-section" id="collection">
        <div className="catalog-container">
          <div className="catalog-masthead">
            <div>
              <span className="kicker-tag">LIMITED EDITIONS & COMMISSIONS</span>
              <h2 className="catalog-heading">The Collection</h2>
            </div>

            {/* View Mode Toggle */}
            <div className="view-toggle-row">
              <span className="catalog-count-label">{filteredProducts.length} Architectural Objects</span>
              <div className="toggle-pill">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  title="Archive Grid View"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('lookbook')}
                  className={`toggle-btn ${viewMode === 'lookbook' ? 'active' : ''}`}
                  title="Editorial Lookbook View"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="8" />
                    <rect x="3" y="13" width="18" height="8" />
                  </svg>
                  <span>Lookbook</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filtering & Sorting Toolbar */}
          <div className="catalog-toolbar-panel">
            {/* Category Tabs */}
            <div className="category-scroll-strip">
              {['All', 'Seating', 'Lighting', 'Objects & Ceramics', 'Textiles'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Material & Sort Selectors */}
            <div className="secondary-filters-row">
              <div className="filter-group">
                <label htmlFor="material-select">Material:</label>
                <select
                  id="material-select"
                  value={activeMaterial}
                  onChange={(e) => setActiveMaterial(e.target.value)}
                  className="select-custom"
                >
                  <option value="All">All Provenances</option>
                  <option value="Wood">Solid Ash & White Oak</option>
                  <option value="Stone & Marble">Travertine & Viola Marble</option>
                  <option value="Brass & Metal">Living Spun Brass</option>
                  <option value="Linen & Wool">Belgian Flax & Wool</option>
                  <option value="Clay">High-Fired Wild Clay</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-select">Order:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select-custom"
                >
                  <option value="curated">Curated Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Presentation */}
          <div className={`products-viewport ${viewMode === 'lookbook' ? 'mode-lookbook' : 'mode-grid'}`}>
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                viewMode={viewMode}
                currency={currency}
                formatPrice={formatPrice}
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={(e) => toggleWishlist(prod.id, e)}
                onQuickView={(finish) => handleOpenQuickView(prod, finish)}
                onAddToCart={(finish) => addToCart(prod, finish)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. MATERIAL MONOGRAPH SPOTLIGHT BANNER --- */}
      <section className="material-box-banner">
        <div className="box-banner-inner">
          <div className="box-visual">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85"
              alt="Atelier material sample box presentation"
              className="box-img"
            />
          </div>
          <div className="box-content">
            <span className="kicker-tag">ARCHITECT & CLIENT MONOGRAPH</span>
            <h2 className="box-title">Specify with material certainty.</h2>
            <p className="box-text">
              Experience the density of unlacquered brass, the tactile grit of wood-fired clay, and the cool hone of Rapolano travertine before commissioning.
            </p>
            <div className="box-perks">
              <div className="perk">
                <span className="perk-bullet">✦</span>
                <span>Four 10cm hand-finished timber blocks (Ash, Shou Sugi Ban, Smoked Oak)</span>
              </div>
              <div className="perk">
                <span className="perk-bullet">✦</span>
                <span>Two honed Italian stone monoliths (Travertine & Calacatta Viola)</span>
              </div>
              <div className="perk">
                <span className="perk-bullet">✦</span>
                <span>Full Belgian flax & wool swatch cards</span>
              </div>
              <div className="perk">
                <span className="perk-bullet">✦</span>
                <strong>{formatPrice(45)} fee is automatically refunded on your subsequent commission</strong>
              </div>
            </div>
            <div className="box-actions">
              <button 
                onClick={() => {
                  const box = PRODUCTS.find(p => p.id === 'material-swatch-box');
                  if (box) addToCart(box);
                }}
                className="btn-primary-atelier"
              >
                Order The Material Box • {formatPrice(45)}
              </button>
              <button 
                onClick={() => setTradeModalOpen(true)}
                className="btn-secondary-atelier"
              >
                Request Trade Complimentary Box
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. MATERIAL PROVENANCE MONOGRAPHS --- */}
      <section className="materials-monograph-section" id="materials">
        <div className="monograph-container">
          <div className="section-head-center">
            <span className="kicker-tag">FOUR GEOLOGICAL & BOTANICAL ROOTS</span>
            <h2 className="section-title">Material Integrity</h2>
            <p className="section-subtext">
              We reject synthetic laminates, chemical lacquers, and mass manufacturing. Our materials are harvested with reverence and finished with traditional organic mediums.
            </p>
          </div>

          <div className="materials-quad-grid">
            <div className="mat-card">
              <div className="mat-thumb-frame">
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80" alt="Rapolano Travertine" />
              </div>
              <span className="mat-origin">Tuscany, Italy</span>
              <h3 className="mat-name">Rapolano Travertine</h3>
              <p className="mat-desc">
                Quarried from geothermal limestone springs in Rapolano Terme. Honed with water and sealed exclusively with unrefined carnauba wax to retain porous subterranean warmth.
              </p>
            </div>

            <div className="mat-card">
              <div className="mat-thumb-frame">
                <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80" alt="Shou Sugi Ban Charred Oak" />
              </div>
              <span className="mat-origin">Gifu, Japan</span>
              <h3 className="mat-name">Shou Sugi Ban Oak</h3>
              <p className="mat-desc">
                Solid Japanese white oak flame-charred to 800°C. The resulting crystalline carbon mantle resists moisture, rot, and insects without petroleum sealants.
              </p>
            </div>

            <div className="mat-card">
              <div className="mat-thumb-frame">
                <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80" alt="Normandy Washed Flax" />
              </div>
              <span className="mat-origin">Flanders, Belgium</span>
              <h3 className="mat-name">Long-Staple Flax Linen</h3>
              <p className="mat-desc">
                Dew-retted along the coast of Normandy and woven in historic Flanders mills. Softened with volcanic pumice baths to preserve flax tensile longevity.
              </p>
            </div>

            <div className="mat-card">
              <div className="mat-thumb-frame">
                <img src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80" alt="Kyoto Riverbed Clay" />
              </div>
              <span className="mat-origin">Uji Basin, Kyoto</span>
              <h3 className="mat-name">Anagama Wood-Fired Clay</h3>
              <p className="mat-desc">
                Coarse mountain clay rich in quartz pebbles. Wood-fired for 4 consecutive days with aged red pine; melting wood embers generate an organic, unrepeatable glaze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 9. PRESS & CRITICAL ACCLAIM (REPLACING GENERIC 5-STAR REVIEWS) --- */}
      <section className="press-monograph-section">
        <div className="press-container">
          <div className="press-grid">
            {PRESS_ACCLAIM.map((item, idx) => (
              <div key={idx} className="press-card">
                <span className="press-date">{item.date}</span>
                <p className="press-quote">“{item.quote}”</p>
                <span className="press-publication">{item.publication}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 10. NEWSLETTER: THE ATELIER CIRCLE --- */}
      <section className="atelier-circle-section">
        <div className="circle-container">
          <div className="circle-copy">
            <span className="kicker-tag">CONFIDENTIAL ALLOCATIONS</span>
            <h2 className="circle-title">The Atelier Circle</h2>
            <p className="circle-desc">
              Receive private invitations to numbered seasonal monograph drops, architectural salon invitations, and bespoke commission windows before public announcements.
            </p>
          </div>

          <div className="circle-form-wrap">
            {newsletterSubscribed ? (
              <div className="subscribed-banner">
                <span className="banner-check">✓</span>
                <div>
                  <strong>Your invitation has been recorded.</strong>
                  <p>Welcome privileges and invitation code <code>AURA10</code> have been reserved under your email.</p>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.includes('@')) {
                    setNewsletterSubscribed(true);
                    showToast('Welcome to the Atelier Circle.');
                  }
                }}
                className="circle-form"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter your professional or personal email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="circle-input"
                  aria-label="Email Address for Atelier Circle"
                />
                <button type="submit" className="btn-circle-submit">
                  Request Invitation
                </button>
              </form>
            )}
            <span className="discretion-note">Strictly confidential. Never shared with third parties. Unsubscribe at any time.</span>
          </div>
        </div>
      </section>

      {/* --- 11. ARCHITECTURAL FOOTER --- */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* Top Column Grid */}
          <div className="footer-columns">
            {/* Brand Monograph */}
            <div className="f-col-identity">
              <span className="f-logo">A U R A</span>
              <p className="f-credo">
                Architectural objects and tactile furnishings forged for enduring spaces. Crafted by generational master ateliers across Europe and Japan.
              </p>
              <div className="f-studios-strip">
                <span className="studio-pill">Copenhagen Atelier</span>
                <span className="studio-pill">Kyoto Kiln</span>
                <span className="studio-pill">Milan Showroom</span>
                <span className="studio-pill">Tribeca NY Salon</span>
              </div>
            </div>

            {/* Column 2: Collections */}
            <div className="f-col">
              <h4 className="f-col-title">COLLECTIONS</h4>
              <ul className="f-list">
                <li><a href="#collection" onClick={() => setActiveCategory('Seating')}>Architectural Seating</a></li>
                <li><a href="#collection" onClick={() => setActiveCategory('Lighting')}>Luminous Monoliths</a></li>
                <li><a href="#collection" onClick={() => setActiveCategory('Objects & Ceramics')}>Wood-Fired Ceramics</a></li>
                <li><a href="#collection" onClick={() => setActiveCategory('Textiles')}>Heirloom Belgian Flax</a></li>
                <li><a href="#collection" onClick={() => setActiveCategory('All')}>Archive Index</a></li>
              </ul>
            </div>

            {/* Column 3: Client Services */}
            <div className="f-col">
              <h4 className="f-col-title">CLIENT SERVICES</h4>
              <ul className="f-list">
                <li><button onClick={() => setTradeModalOpen(true)} className="btn-clean f-link">Trade & Architects Portal</button></li>
                <li><a href="#spaces">Curated Spaces Explorer</a></li>
                <li><a href="#materials">Material Specifications</a></li>
                <li><a href="#collection" onClick={() => {
                  const box = PRODUCTS.find(p => p.id === 'material-swatch-box');
                  if (box) addToCart(box);
                }}>Request Material Box ({formatPrice(45)})</a></li>
                <li><a href="mailto:concierge@aurastudioliving.com">Bespoke Commission Inquiry</a></li>
              </ul>
            </div>

            {/* Column 4: Studio Locations */}
            <div className="f-col">
              <h4 className="f-col-title">STUDIOS & SALONS</h4>
              <div className="salon-address">
                <strong>Copenhagen</strong>
                <span>Bredgade 28, 1260 København K</span>
              </div>
              <div className="salon-address">
                <strong>Kyoto</strong>
                <span>Sanjo-dori, Higashiyama-ku</span>
              </div>
              <div className="salon-address">
                <strong>New York</strong>
                <span>74 Franklin St, Tribeca</span>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Currency */}
          <div className="footer-bottom-bar">
            <div className="bottom-left">
              <span>© {new Date().getFullYear()} AURA Studio Living Aps. All rights reserved.</span>
              <span className="bullet-sep">•</span>
              <a href="#">Privacy Protocol</a>
              <span className="bullet-sep">•</span>
              <a href="#">White-Glove Terms</a>
              <span className="bullet-sep">•</span>
              <a href="#">Carbon Neutral Shipping</a>
            </div>

            <div className="bottom-right">
              <span>Region: Worldwide / Selected Currency: <strong>{currency} ({CURRENCIES[currency].symbol})</strong></span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE DRAWERS & MODALS
         ========================================================================= */}

      {/* --- MODAL 1: SLIDE-OUT SHOPPING BAG --- */}
      {cartOpen && (
        <div className="backdrop-overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer-panel drawer-cart" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-row">
                <span className="drawer-title">SHOPPING BAG ({totalItemCount})</span>
                <button className="btn-close-drawer" onClick={() => setCartOpen(false)} aria-label="Close Bag">
                  ✕
                </button>
              </div>

              {/* White Glove Tier Tracker */}
              {cart.length > 0 ? (
                <div className="delivery-meter-box">
                  <div className="meter-labels">
                    {isComplimentaryDelivery ? (
                      <span className="meter-unlocked">
                        ✓ <strong>Complimentary White-Glove In-Home Placement</strong> unlocked
                      </span>
                    ) : (
                      <span className="meter-remaining">
                        Add <strong>{formatPrice(whiteGloveThresholdUSD - rawSubtotalUSD)}</strong> more for Complimentary White-Glove In-Home Delivery
                      </span>
                    )}
                  </div>
                  <div className="meter-track">
                    <div 
                      className="meter-bar" 
                      style={{ width: `${Math.min(100, (rawSubtotalUSD / whiteGloveThresholdUSD) * 100)}%` }} 
                    />
                  </div>
                </div>
              ) : (
                <div className="delivery-meter-box meter-subtle">
                  <div className="meter-labels">
                    <span className="meter-remaining">
                      Commissions over <strong>{formatPrice(whiteGloveThresholdUSD)}</strong> qualify for Complimentary White-Glove Placement
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-icon-wrap">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <p className="empty-title">Your shopping bag is currently unoccupied.</p>
                  <p className="empty-subtitle">Discover our limited allocations of furniture, lighting, and ceramics.</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      const el = document.getElementById('collection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="btn-primary-atelier btn-compact"
                  >
                    Explore The Collection
                  </button>
                </div>
              ) : (
                <div className="cart-items-feed">
                  {cart.map((item) => {
                    const linePriceUSD = (item.product.priceUSD + (item.selectedFinish?.priceDelta || 0)) * item.quantity;
                    return (
                      <div key={item.cartItemId} className="cart-line-item">
                        <img src={item.product.images[0]} alt={item.product.name} className="line-item-thumb" />
                        <div className="line-item-info">
                          <div className="line-item-top">
                            <h4 className="line-item-title">{item.product.name}</h4>
                            <span className="line-item-price">{formatPrice(linePriceUSD)}</span>
                          </div>
                          <span className="line-item-finish">Finish: {item.selectedFinish.name}</span>
                          <span className="line-item-lead">{item.product.leadTime}</span>

                          <div className="line-item-controls">
                            <div className="quantity-stepper">
                              <button onClick={() => updateQuantity(item.cartItemId, -1)} aria-label="Decrease quantity">−</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.cartItemId, 1)} aria-label="Increase quantity">+</button>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item.cartItemId)} 
                              className="btn-remove-line"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Material Box Upsell Prompt if not already in cart */}
                  {!cart.some(i => i.productId === 'material-swatch-box') && (
                    <div className="cart-upsell-strip">
                      <div className="upsell-text">
                        <strong>Include Atelier Material Box ({formatPrice(45)})</strong>
                        <span>Swatches of our four timbers, stones, and linen. $45 credited to your commission.</span>
                      </div>
                      <button
                        onClick={() => {
                          const box = PRODUCTS.find(p => p.id === 'material-swatch-box');
                          if (box) addToCart(box);
                        }}
                        className="btn-upsell-add"
                      >
                        + Add
                      </button>
                    </div>
                  )}

                  {/* Gift Packaging & Handwritten Calligraphy */}
                  <div className="cart-gift-box">
                    <label className="checkbox-wrap">
                      <input 
                        type="checkbox" 
                        checked={giftPackaging} 
                        onChange={(e) => setGiftPackaging(e.target.checked)} 
                      />
                      <span>Complimentary linen-wrapped gift presentation & wax seal</span>
                    </label>
                    {giftPackaging && (
                      <textarea
                        placeholder="Enter your personalized gift note message..."
                        value={giftNoteText}
                        onChange={(e) => setGiftNoteText(e.target.value)}
                        className="gift-textarea"
                        rows={2}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="promo-row">
                  <input
                    type="text"
                    placeholder="Invitation / Promo code (Try: AURA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="btn-promo-apply">
                    Apply
                  </button>
                </form>
                {promoMessage && <div className="promo-feedback">{promoMessage}</div>}

                {/* Subtotal & Delivery Tier */}
                <div className="financial-breakdown">
                  <div className="finance-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(rawSubtotalUSD)}</span>
                  </div>

                  {discountAmountUSD > 0 && (
                    <div className="finance-row discount-row">
                      <span>Privilege Discount (10%)</span>
                      <span>-{formatPrice(discountAmountUSD)}</span>
                    </div>
                  )}

                  <div className="finance-row">
                    <span>
                      {deliveryTier === 'white-glove' ? 'White-Glove Delivery' : 'Standard Insured Freight'}
                      {isComplimentaryDelivery && ' (Complimentary)'}
                    </span>
                    <span>{deliveryCostUSD === 0 ? 'COMPLIMENTARY' : formatPrice(deliveryCostUSD)}</span>
                  </div>

                  <div className="finance-row total-highlight">
                    <span>Total Due ({currency})</span>
                    <span className="grand-total">{formatPrice(totalUSD)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                    setCheckoutStep(1);
                  }}
                  className="btn-primary-atelier btn-full-width"
                >
                  Proceed to Secure Checkout →
                </button>

                <div className="trust-seal-strip">
                  <span>🔒 256-bit Encrypted Checkout • Insured Freight Included</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* --- MODAL 2: DEEP QUICK VIEW PRODUCT INSPECTOR --- */}
      {quickViewProduct && quickViewFinish && (
        <div className="backdrop-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-stage modal-quickview" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setQuickViewProduct(null)} aria-label="Close Inspector">
              ✕
            </button>

            <div className="quickview-layout">
              {/* Left Gallery with Multi-Angle Thumbnails */}
              <div className="qv-gallery-col">
                <div className="qv-main-display">
                  <img
                    src={quickViewProduct.images[quickViewImageIndex] || quickViewProduct.images[0]}
                    alt={quickViewProduct.name}
                    className="qv-hero-img"
                  />
                  <span className="qv-angle-indicator">View {quickViewImageIndex + 1} of {quickViewProduct.images.length}</span>
                </div>

                <div className="qv-thumb-strip">
                  {quickViewProduct.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuickViewImageIndex(idx)}
                      className={`qv-thumb-btn ${quickViewImageIndex === idx ? 'active' : ''}`}
                    >
                      <img src={imgUrl} alt="Thumbnail view" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Specifications & Customization */}
              <div className="qv-details-col">
                <div className="qv-top-meta">
                  <span className="kicker-tag">{quickViewProduct.category.toUpperCase()}</span>
                  <span className="edition-tag">{quickViewProduct.editionBadge}</span>
                </div>

                <h2 className="qv-title">{quickViewProduct.name}</h2>
                <span className="qv-subtitle">{quickViewProduct.subtitle}</span>

                <div className="qv-price-provenance">
                  <span className="qv-price">
                    {formatPrice(quickViewProduct.priceUSD + quickViewFinish.priceDelta)}
                  </span>
                  <span className="qv-provenance">{quickViewProduct.provenance}</span>
                </div>

                <p className="qv-narrative">{quickViewProduct.description}</p>

                {/* Finish Variant Selector */}
                {quickViewProduct.finishes.length > 1 && (
                  <div className="qv-finishes-box">
                    <span className="finish-label">Select Atelier Finish: <strong>{quickViewFinish.name}</strong></span>
                    <div className="finish-swatches-row">
                      {quickViewProduct.finishes.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setQuickViewFinish(f)}
                          className={`swatch-btn ${quickViewFinish.id === f.id ? 'active' : ''}`}
                          title={f.name}
                        >
                          <span 
                            className="swatch-circle" 
                            style={{ 
                              backgroundColor: f.swatchColor,
                              borderRight: f.secondarySwatch ? `8px solid ${f.secondarySwatch}` : undefined 
                            }} 
                          />
                          <span className="swatch-name-text">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architectural Specifications Table */}
                <div className="qv-specs-table">
                  <div className="spec-row">
                    <span className="s-label">Artisan Studio</span>
                    <span className="s-val">{quickViewProduct.artisan}</span>
                  </div>
                  <div className="spec-row">
                    <span className="s-label">Dimensions</span>
                    <span className="s-val">{quickViewProduct.dimensions}</span>
                  </div>
                  <div className="spec-row">
                    <span className="s-label">Weight</span>
                    <span className="s-val">{quickViewProduct.weight}</span>
                  </div>
                  <div className="spec-row">
                    <span className="s-label">Materiality</span>
                    <span className="s-val">{quickViewProduct.materialsDetail}</span>
                  </div>
                  <div className="spec-row">
                    <span className="s-label">Dispatch Lead</span>
                    <span className="s-val text-accent">{quickViewProduct.leadTime}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="qv-actions-cluster">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewFinish);
                      setQuickViewProduct(null);
                    }}
                    className="btn-primary-atelier btn-full-width"
                  >
                    Add to Bag • {formatPrice(quickViewProduct.priceUSD + quickViewFinish.priceDelta)}
                  </button>

                  <div className="qv-sub-actions">
                    <button 
                      onClick={(e) => toggleWishlist(quickViewProduct.id, e)}
                      className="btn-sub-action"
                    >
                      {wishlist.includes(quickViewProduct.id) ? '♥ Saved in Wishlist' : '♡ Save to Wishlist'}
                    </button>
                    <button 
                      onClick={() => {
                        setQuickViewProduct(null);
                        setTradeModalOpen(true);
                      }}
                      className="btn-sub-action"
                    >
                      Request 3D CAD/BIM File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: TRADE & ARCHITECTURAL CONCIERGE --- */}
      {tradeModalOpen && (
        <div className="backdrop-overlay" onClick={() => setTradeModalOpen(false)}>
          <div className="modal-stage modal-trade" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setTradeModalOpen(false)} aria-label="Close Trade Portal">
              ✕
            </button>

            <div className="trade-modal-inner">
              <span className="kicker-tag">AURA STUDIO TRADE PROGRAM</span>
              <h2 className="trade-title">Bespoke Specifications for Architects & Designers</h2>
              <p className="trade-subtitle">
                We partner with international architectural practices, boutique hospitality operators, and interior designers.
              </p>

              <div className="trade-benefits-row">
                <div className="t-benefit">
                  <span className="t-icon">20%</span>
                  <h4>Trade Privilege</h4>
                  <p>Volume pricing on all catalog pieces and bespoke residential commissions.</p>
                </div>
                <div className="t-benefit">
                  <span className="t-icon">CAD</span>
                  <h4>BIM & 3D Assets</h4>
                  <p>Revit, Rhino 3DM, and high-resolution material shader maps for rendering.</p>
                </div>
                <div className="t-benefit">
                  <span className="t-icon">BOX</span>
                  <h4>Complimentary Samples</h4>
                  <p>Full Atelier Material Box sent to registered practice addresses at no charge.</p>
                </div>
              </div>

              {tradeSubmitted ? (
                <div className="trade-success-box">
                  <span className="success-icon">✓</span>
                  <h3>Trade Application Received</h3>
                  <p>Our European Trade Director will review your credentials and dispatch your practice access token and complimentary material kit within 24 hours.</p>
                  <button onClick={() => setTradeModalOpen(false)} className="btn-primary-atelier btn-compact">
                    Return to Collection
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (tradeForm.email && tradeForm.firmName) {
                      setTradeSubmitted(true);
                    }
                  }} 
                  className="trade-form-grid"
                >
                  <div className="form-field">
                    <label>Architecture Practice / Design Firm *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Studio OMA / Foster & Partners" 
                      value={tradeForm.firmName}
                      onChange={(e) => setTradeForm({ ...tradeForm, firmName: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Principal Designer / Specifier *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Full Name" 
                      value={tradeForm.contactName}
                      onChange={(e) => setTradeForm({ ...tradeForm, contactName: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Professional Email *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@firm-architecture.com" 
                      value={tradeForm.email}
                      onChange={(e) => setTradeForm({ ...tradeForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Project Typology</label>
                    <select 
                      value={tradeForm.projectType}
                      onChange={(e) => setTradeForm({ ...tradeForm, projectType: e.target.value })}
                      className="select-custom"
                    >
                      <option value="Private Residential Commission">Private Residential Commission</option>
                      <option value="Luxury Hospitality & Boutique Hotel">Luxury Hospitality & Boutique Hotel</option>
                      <option value="Corporate Executive Headquarters">Corporate Executive Headquarters</option>
                      <option value="Cultural / Museum Exhibition">Cultural / Museum Exhibition</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label>Project Scope or Custom Dimension Requirements</label>
                    <textarea 
                      placeholder="Outline any custom timber finishes, dimensions, or quantity requirements..."
                      value={tradeForm.notes}
                      onChange={(e) => setTradeForm({ ...tradeForm, notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="form-actions full-width">
                    <button type="submit" className="btn-primary-atelier btn-full-width">
                      Submit Trade Specification Request →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: FULL MULTI-STEP LUXURY CHECKOUT --- */}
      {checkoutOpen && (
        <div className="backdrop-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="modal-stage modal-checkout" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setCheckoutOpen(false)} aria-label="Close Checkout">
              ✕
            </button>

            <div className="checkout-stepper-head">
              <span className="brand-badge-sm">AURA STUDIO LOGISTICS</span>
              <div className="step-breadcrumbs">
                <span className={`step-node ${checkoutStep >= 1 ? 'active' : ''}`}>1. Address</span>
                <span className="step-arrow">→</span>
                <span className={`step-node ${checkoutStep >= 2 ? 'active' : ''}`}>2. White Glove</span>
                <span className="step-arrow">→</span>
                <span className={`step-node ${checkoutStep >= 3 ? 'active' : ''}`}>3. Settlement</span>
                <span className="step-arrow">→</span>
                <span className={`step-node ${checkoutStep === 4 ? 'active' : ''}`}>4. Confirmation</span>
              </div>
            </div>

            <div className="checkout-content-area">
              {cart.length === 0 && checkoutStep !== 4 ? (
                <div className="checkout-empty-state">
                  <div className="empty-icon-wrap">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <h3 className="empty-title">Your shopping bag is unoccupied.</h3>
                  <p className="empty-subtitle">
                    Please select at least one architectural piece from the collection before proceeding to white-glove settlement.
                  </p>
                  <button 
                    onClick={() => {
                      setCheckoutOpen(false);
                      const el = document.getElementById('collection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary-atelier btn-compact"
                  >
                    Explore The Collection
                  </button>
                </div>
              ) : (
                <>
                  {/* STEP 1: ADDRESS */}
                  {checkoutStep === 1 && (
                <div className="step-view">
                  <h3 className="step-title">White-Glove Delivery Destination</h3>
                  <p className="step-sub">Please provide the residential or commercial address where your shipment will be placed.</p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCheckoutStep(2);
                    }}
                    className="checkout-form-grid"
                  >
                    <div className="form-field">
                      <label>First Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Julian" 
                        value={checkoutForm.firstName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, firstName: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Last Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Møller" 
                        value={checkoutForm.lastName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, lastName: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Email for Tracking Documents *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="julian@example.com" 
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Phone (For Delivery Driver Appointment) *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+1 (555) 234-5678" 
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-field full-width">
                      <label>Street Address *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="148 Mercer St, Penthouse A" 
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>City *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="New York" 
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Postal Code *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="10012" 
                        value={checkoutForm.postalCode}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                      />
                    </div>

                    <div className="form-field full-width">
                      <label>Building Entry / Service Elevator Notes</label>
                      <input 
                        type="text" 
                        placeholder="Freight elevator required, Certificate of Insurance needed for building" 
                        value={checkoutForm.buildingAccessNotes}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, buildingAccessNotes: e.target.value })}
                      />
                    </div>

                    <div className="checkout-step-footer full-width">
                      <button type="submit" className="btn-primary-atelier btn-full-width">
                        Continue to Delivery Scheduling →
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: WHITE GLOVE SELECTION */}
              {checkoutStep === 2 && (
                <div className="step-view">
                  <h3 className="step-title">Select White-Glove Handling</h3>
                  <p className="step-sub">Our logistics teams handle all crating, transit, and installation with museum care.</p>

                  <div className="delivery-tier-selector">
                    <label 
                      className={`tier-card ${deliveryTier === 'white-glove' ? 'active' : ''}`}
                      onClick={() => setDeliveryTier('white-glove')}
                    >
                      <div className="tier-radio">
                        <input 
                          type="radio" 
                          name="tier" 
                          checked={deliveryTier === 'white-glove'} 
                          onChange={() => setDeliveryTier('white-glove')} 
                        />
                      </div>
                      <div className="tier-text">
                        <div className="tier-head">
                          <strong>White-Glove In-Home Placement & Debris Removal</strong>
                          <span className="tier-cost">
                            {isComplimentaryDelivery ? 'COMPLIMENTARY' : formatPrice(140)}
                          </span>
                        </div>
                        <p>A two-person specialist team carries items into your room of choice, uncrates, places to specification, and disposes of all protective wooden crates.</p>
                        <span className="tier-badge">Recommended for Furniture & Marble</span>
                      </div>
                    </label>

                    <label 
                      className={`tier-card ${deliveryTier === 'standard' ? 'active' : ''}`}
                      onClick={() => setDeliveryTier('standard')}
                    >
                      <div className="tier-radio">
                        <input 
                          type="radio" 
                          name="tier" 
                          checked={deliveryTier === 'standard'} 
                          onChange={() => setDeliveryTier('standard')} 
                        />
                      </div>
                      <div className="tier-text">
                        <div className="tier-head">
                          <strong>Standard Insured Crating (Curbside)</strong>
                          <span className="tier-cost">
                            {isComplimentaryDelivery ? 'COMPLIMENTARY' : formatPrice(45)}
                          </span>
                        </div>
                        <p>Delivered in custom plywood crating to building threshold or front entryway. Suitable for smaller vessels and textiles.</p>
                      </div>
                    </label>
                  </div>

                  <div className="checkout-step-footer">
                    <button onClick={() => setCheckoutStep(1)} className="btn-secondary-atelier">
                      ← Back
                    </button>
                    <button onClick={() => setCheckoutStep(3)} className="btn-primary-atelier">
                      Proceed to Settlement ({formatPrice(totalUSD)}) →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {checkoutStep === 3 && (
                <div className="step-view">
                  <h3 className="step-title">Order Settlement</h3>
                  <p className="step-sub">All transactions are encrypted with 256-bit bank level SSL protocols.</p>

                  <div className="payment-method-tabs">
                    <button
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'apple-pay' })}
                      className={`pay-tab ${checkoutForm.paymentMethod === 'apple-pay' ? 'active' : ''}`}
                    >
                       Pay
                    </button>
                    <button
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'card' })}
                      className={`pay-tab ${checkoutForm.paymentMethod === 'card' ? 'active' : ''}`}
                    >
                      Credit Card (Amex / Visa)
                    </button>
                    <button
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'wire' })}
                      className={`pay-tab ${checkoutForm.paymentMethod === 'wire' ? 'active' : ''}`}
                    >
                      Bank Wire Transfer
                    </button>
                  </div>

                  {checkoutForm.paymentMethod === 'apple-pay' && (
                    <div className="apple-pay-box">
                      <p>Instant biometric authorization with Apple Pay.</p>
                      <button 
                        onClick={handleFinalizeSettlement} 
                        className="btn-apple-pay"
                      >
                        Pay with Pay • {formatPrice(totalUSD)}
                      </button>
                    </div>
                  )}

                  {checkoutForm.paymentMethod === 'card' && (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFinalizeSettlement();
                      }}
                      className="card-form-grid"
                    >
                      <div className="form-field full-width">
                        <label>Card Number</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="4242 •••• •••• 4242" 
                          value={checkoutForm.cardNumber}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Expires</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="MM/YY" 
                          value={checkoutForm.cardExpiry}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Security Code (CVC)</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="CVC" 
                          value={checkoutForm.cardCvc}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, cardCvc: e.target.value })}
                        />
                      </div>

                      <div className="checkout-step-footer full-width">
                        <button type="button" onClick={() => setCheckoutStep(2)} className="btn-secondary-atelier">
                          ← Back
                        </button>
                        <button type="submit" className="btn-primary-atelier">
                          Authorize Settlement of {formatPrice(totalUSD)}
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutForm.paymentMethod === 'wire' && (
                    <div className="wire-instructions-box">
                      <p>For collector commissions over $5,000, direct wire settlement is standard. A 2% cash settlement credit is automatically reflected.</p>
                      <div className="wire-bank-meta">
                        <div><strong>Beneficiary:</strong> AURA Studio Living Ltd</div>
                        <div><strong>IBAN:</strong> DK82 3000 4829 1049 28</div>
                        <div><strong>SWIFT / BIC:</strong> DABADKKK</div>
                      </div>
                      <button 
                        onClick={handleFinalizeSettlement} 
                        className="btn-primary-atelier btn-full-width"
                      >
                        Confirm Commission & Reserve Allocation
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: ORDER CONFIRMATION */}
              {checkoutStep === 4 && (
                <div className="step-view confirmation-view">
                  <span className="conf-icon">✦</span>
                  <span className="kicker-tag">OFFICIAL ATELIER CONFIRMATION</span>
                  <h3 className="conf-title">Thank You, {checkoutForm.firstName || 'Collector'}.</h3>
                  <p className="conf-lead">
                    Commission Reference <strong>{settledSummary?.reference || '#AU-94826'}</strong> has been registered with our European logistics desk.
                  </p>

                  <div className="conf-order-summary">
                    <div className="conf-row">
                      <span>Recipient:</span>
                      <strong>{checkoutForm.firstName} {checkoutForm.lastName} ({checkoutForm.email})</strong>
                    </div>
                    <div className="conf-row">
                      <span>Destination:</span>
                      <strong>{checkoutForm.address}, {checkoutForm.city}</strong>
                    </div>
                    <div className="conf-row">
                      <span>Handling Tier:</span>
                      <strong>{deliveryTier === 'white-glove' ? 'White-Glove In-Home Placement' : 'Standard Insured Crating'}</strong>
                    </div>
                    <div className="conf-row">
                      <span>Total Settled:</span>
                      <strong>{settledSummary?.formattedTotal || formatPrice(totalUSD)} ({settledSummary?.currency || currency})</strong>
                    </div>
                  </div>

                  <p className="conf-note">
                    A numbered Certificate of Authenticity and White-Glove dispatch scheduling link have been transmitted to your email.
                  </p>

                  <div className="conf-actions">
                    <button 
                      onClick={() => {
                        setCheckoutOpen(false);
                        setCheckoutStep(1);
                        setSettledSummary(null);
                      }} 
                      className="btn-primary-atelier"
                    >
                      Continue Exploring Collection
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="btn-secondary-atelier"
                    >
                      Print Receipt / Spec Sheet
                    </button>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 5: SEARCH OVERLAY --- */}
      {searchOpen && (
        <div className="backdrop-overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal-stage modal-search" onClick={(e) => e.stopPropagation()}>
            <div className="search-bar-wrap">
              <input 
                type="text" 
                autoFocus
                placeholder="Search by object name, material, travertine, oak, Kyoto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-large-input"
              />
              <button className="btn-close-search" onClick={() => setSearchOpen(false)}>
                ✕
              </button>
            </div>

            <div className="search-results-area">
              {searchQuery.trim() === '' ? (
                <div className="search-suggestions">
                  <span className="sugg-title">Popular Material Searches:</span>
                  <div className="sugg-tags">
                    {['Sora Armchair', 'Honed Travertine', 'Kyoto Clay', 'Belgian Flax', 'Shou Sugi Ban', 'Viola Marble'].map(tag => (
                      <button 
                        key={tag} 
                        onClick={() => setSearchQuery(tag)} 
                        className="sugg-btn"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="search-none">
                  <p>No architectural pieces found matching “{searchQuery}”.</p>
                </div>
              ) : (
                <div className="search-results-list">
                  {searchResults.map(prod => (
                    <div 
                      key={prod.id} 
                      className="search-item-row"
                      onClick={() => {
                        setSearchOpen(false);
                        handleOpenQuickView(prod);
                      }}
                    >
                      <img src={prod.images[0]} alt={prod.name} className="search-thumb" />
                      <div className="search-item-meta">
                        <h4>{prod.name}</h4>
                        <span className="search-item-sub">{prod.materialsDetail}</span>
                        <span className="search-item-price">{formatPrice(prod.priceUSD)}</span>
                      </div>
                      <span className="search-arrow">View Object →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 6: CURATED WISHLIST DRAWER --- */}
      {wishlistOpen && (
        <div className="backdrop-overlay" onClick={() => setWishlistOpen(false)}>
          <aside className="drawer-panel drawer-wishlist" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-row">
                <span className="drawer-title">CURATED WISHLIST ({wishlist.length})</span>
                <button className="btn-close-drawer" onClick={() => setWishlistOpen(false)}>✕</button>
              </div>
              <p className="drawer-sub">Saved pieces for consideration with your interior designer.</p>
            </div>

            <div className="drawer-body">
              {wishlist.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-icon-wrap">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <p className="empty-title">Your curated wishlist is unoccupied.</p>
                  <p className="empty-subtitle">Select the heart icon on any architectural object as you explore to curate your residential palette.</p>
                  <button 
                    onClick={() => {
                      setWishlistOpen(false);
                      const el = document.getElementById('collection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="btn-primary-atelier btn-compact"
                  >
                    Explore The Collection
                  </button>
                </div>
              ) : (
                <div className="wishlist-feed">
                  {wishlist.map(pid => {
                    const prod = PRODUCTS.find(p => p.id === pid);
                    if (!prod) return null;
                    return (
                      <div key={pid} className="wishlist-item-card">
                        <img src={prod.images[0]} alt={prod.name} className="wish-thumb" />
                        <div className="wish-info">
                          <h4>{prod.name}</h4>
                          <span className="wish-price">{formatPrice(prod.priceUSD)}</span>
                          <span className="wish-provenance">{prod.provenance}</span>
                          <div className="wish-actions">
                            <button 
                              onClick={() => {
                                addToCart(prod);
                                setWishlistOpen(false);
                              }}
                              className="btn-wish-add"
                            >
                              + Move to Bag
                            </button>
                            <button 
                              onClick={() => toggleWishlist(prod.id)}
                              className="btn-wish-remove"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: PRODUCT CARD ---
interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'lookbook';
  currency: CurrencyCode;
  formatPrice: (usd: number) => string;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onQuickView: (finish?: FinishVariant) => void;
  onAddToCart: (finish?: FinishVariant) => void;
}

function ProductCard({
  product,
  viewMode,
  formatPrice,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishVariant>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);

  const activePriceUSD = product.priceUSD + selectedFinish.priceDelta;
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <article 
      className={`architectural-card ${viewMode === 'lookbook' ? 'card-lookbook' : 'card-grid'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Frame */}
      <div className="card-visual-frame" onClick={() => onQuickView(selectedFinish)}>
        <img
          src={isHovered ? secondaryImage : product.images[0]}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />

        {/* Edition Stamp */}
        <span className="card-edition-badge">{product.editionBadge}</span>

        {/* Wishlist Heart */}
        <button
          onClick={onToggleWishlist}
          className={`card-wish-btn ${isWishlisted ? 'saved' : ''}`}
          aria-label="Save to Wishlist"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover Quick View Trigger */}
        <div className="card-hover-overlay">
          <button 
            className="btn-quick-inspect"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(selectedFinish);
            }}
          >
            Inspect Specifications
          </button>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="card-meta">
        <div className="meta-top-line">
          <span className="card-category">{product.category}</span>
          <span className="card-provenance">{product.provenance}</span>
        </div>

        <h3 className="card-title" onClick={() => onQuickView(selectedFinish)}>
          {product.name}
        </h3>

        <p className="card-material-line">{product.materialsDetail}</p>

        {/* Swatch Selector if multiple finishes exist */}
        {product.finishes.length > 1 && (
          <div className="card-swatches-strip">
            {product.finishes.map((f) => (
              <button
                key={f.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFinish(f);
                }}
                className={`card-swatch-dot ${selectedFinish.id === f.id ? 'active' : ''}`}
                title={f.name}
              >
                <span 
                  className="dot-inner" 
                  style={{ backgroundColor: f.swatchColor }} 
                />
              </button>
            ))}
            <span className="active-finish-hint">{selectedFinish.name.split('&')[0]}</span>
          </div>
        )}

        {/* Footer Pricing & CTA */}
        <div className="card-footer-row">
          <div className="price-column">
            <span className="price-main">{formatPrice(activePriceUSD)}</span>
            <span className="lead-time-sub">{product.leadTime}</span>
          </div>

          <button
            onClick={() => onAddToCart(selectedFinish)}
            className="btn-card-order"
            aria-label={`Add ${product.name} to bag`}
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
