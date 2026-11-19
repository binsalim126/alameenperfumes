/* ==========================================================================
   AL-AMEEN PERFUMES - CORE STATE & CATALOG ENGINE
   Shared across index.html, shop.html, about.html, contact.html, and admin.html
   ========================================================================== */

const CONFIG = {
  STORE_NAME: "AL-AMEEN PERFUMES",
  TAGLINE: "Discover Your Signature Scent",
  WHATSAPP_NUMBER: "919876543210", // Edit here for your WhatsApp order reception
  CURRENCY: "₹",
  FREE_SHIPPING_MIN: 999
};

const DEFAULT_SETTINGS = {
  announcement_enabled: false, // Default is OFF as requested
  announcement_text: "Free shipping Pan-India · Wholesale rates available",
  offer_enabled: false,        // Default is OFF
  offer_badge: "Festive Offer",
  offer_discount_percent: 15
};

const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Al-Ameen Sultan Attar",
    category: "Luxury",
    type: "Pure Concentrated Oil",
    size: "12ml",
    rating: 5.0,
    reviews: 128,
    retailPrice: 1499,
    mrp: 2199,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 780 },
      { min: 12, max: 23, price: 710 },
      { min: 24, max: 9999, price: 640 }
    ],
    notes: {
      top: "Cambodian Oud, Saffron Stigmas",
      heart: "Taif Rose, Smoked Amber",
      base: "Aged Assam Agarwood, Black Musk"
    },
    description: "An imperial non-alcoholic blend crafted from triple-distilled aged Assam oud and handpicked Taif roses. Lingers 24+ hours.",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p2",
    name: "Royal Oud Intense",
    category: "Men",
    type: "Eau de Parfum",
    size: "100ml",
    rating: 4.9,
    reviews: 94,
    retailPrice: 2499,
    mrp: 3499,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 1350 },
      { min: 12, max: 23, price: 1220 },
      { min: 24, max: 9999, price: 1100 }
    ],
    notes: {
      top: "Bergamot, Pink Pepper",
      heart: "Cedarwood, Angelica Root",
      base: "Smoky Agarwood, Indian Sandalwood"
    },
    description: "Sophisticated French-Arabian formulation designed for evening events and royal gatherings. Deep, commanding, unforgettable.",
    images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p3",
    name: "Noor-E-Gulab (Rose Elixir)",
    category: "Women",
    type: "Eau de Parfum",
    size: "50ml",
    rating: 4.8,
    reviews: 112,
    retailPrice: 1899,
    mrp: 2599,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 990 },
      { min: 12, max: 23, price: 890 },
      { min: 24, max: 9999, price: 810 }
    ],
    notes: {
      top: "Morning Dew Roses, Lychee",
      heart: "Damask Rose, Peony Petals",
      base: "White Amber, Cashmere Musk"
    },
    description: "Freshly blossomed Taif roses dipped in crystal morning dew with soft sensual white amber undertones.",
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p4",
    name: "Zafraan & Sandalwood Pure",
    category: "Luxury",
    type: "Pure Concentrated Oil",
    size: "12ml",
    rating: 4.9,
    reviews: 73,
    retailPrice: 1999,
    mrp: 2799,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 1050 },
      { min: 12, max: 23, price: 950 },
      { min: 24, max: 9999, price: 860 }
    ],
    notes: {
      top: "Kashmiri Saffron, Cardamom",
      heart: "Saffron, Bulgarian Rose",
      base: "Pure Mysore Sandalwood Oil"
    },
    description: "100% alcohol-free traditional attar crafted using age-old hydro-distillation with pure Mysore sandalwood oil.",
    images: ["https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p5",
    name: "Aqua Di Arabian",
    category: "Men",
    type: "Eau de Parfum",
    size: "100ml",
    rating: 4.7,
    reviews: 84,
    retailPrice: 1699,
    mrp: 2299,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 890 },
      { min: 12, max: 23, price: 799 },
      { min: 24, max: 9999, price: 710 }
    ],
    notes: {
      top: "Sea Salt, Grapefruit",
      heart: "Clary Sage, Rosemary",
      base: "Marine Ambergris, Vetiver"
    },
    description: "Where Mediterranean aquatic sea breeze meets coastal ambergris dunes. Invigorating and magnetic.",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  },
  {
    id: "p6",
    name: "Musk Al Tahara Mist",
    category: "Body Mists",
    type: "Fine Fragrance Mist",
    size: "150ml",
    rating: 4.8,
    reviews: 160,
    retailPrice: 899,
    mrp: 1299,
    wholesaleMOQ: 12,
    wholesaleTiers: [
      { min: 12, max: 23, price: 440 },
      { min: 24, max: 47, price: 390 },
      { min: 48, max: 9999, price: 340 }
    ],
    notes: {
      top: "Powdery Lotus, Lily",
      heart: "White Musk, Iris",
      base: "Creamy Sandalwood"
    },
    description: "A pure, comforting cloud of velvety white musk and delicate dewy florals for everyday freshness.",
    images: ["https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p7",
    name: "Sandalwood Imperial",
    category: "Unisex",
    type: "Eau de Parfum",
    size: "100ml",
    rating: 4.9,
    reviews: 130,
    retailPrice: 2199,
    mrp: 2999,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 1150 },
      { min: 12, max: 23, price: 1020 },
      { min: 24, max: 9999, price: 920 }
    ],
    notes: {
      top: "Cardamom, Violet Leaves",
      heart: "Virginian Cedarwood, Orris",
      base: "Mysore Sandalwood, Cashmeran"
    },
    description: "Creamy, serene, and deeply aromatic Indian sandalwood elevated by crisp violet leaves.",
    images: ["https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  },
  {
    id: "p8",
    name: "Vanilla Bourbon Gold",
    category: "Women",
    type: "Eau de Parfum",
    size: "50ml",
    rating: 4.8,
    reviews: 76,
    retailPrice: 1599,
    mrp: 2199,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 820 },
      { min: 12, max: 23, price: 740 },
      { min: 24, max: 9999, price: 670 }
    ],
    notes: {
      top: "Salted Caramel, Almond",
      heart: "Bourbon Vanilla Pod, Tonka",
      base: "Benzoin Resin, Brown Sugar"
    },
    description: "Decadent gourmand luxury. Bourbon vanilla pods steeped in warm caramel nectar.",
    images: ["https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  },
  {
    id: "p9",
    name: "Oriental Discovery Gift Set",
    category: "Gift Sets",
    type: "4 × 25ml EDP Gift Box",
    size: "4 × 25ml",
    rating: 4.9,
    reviews: 92,
    retailPrice: 2799,
    mrp: 3799,
    wholesaleMOQ: 4,
    wholesaleTiers: [
      { min: 4, max: 9, price: 1550 },
      { min: 10, max: 19, price: 1400 },
      { min: 20, max: 9999, price: 1250 }
    ],
    notes: {
      top: "4 Iconic Signature Fragrances",
      heart: "Oud, Rose, Leather, Sandalwood",
      base: "Precious woods & amber"
    },
    description: "A velvet-lined collector's box featuring 4 travel flacons of our flagship creations.",
    images: ["https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80"],
    bestseller: true
  },
  {
    id: "p10",
    name: "Royal Miniature Attar Set",
    category: "Miniatures",
    type: "6 × 6ml Pocket Attars",
    size: "6 × 6ml",
    rating: 5.0,
    reviews: 145,
    retailPrice: 1799,
    mrp: 2499,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 950 },
      { min: 12, max: 23, price: 850 },
      { min: 24, max: 9999, price: 760 }
    ],
    notes: {
      top: "6 Traditional Indian Distillations",
      heart: "Khas (Vetiver), Shamama, Ruh Gulab",
      base: "Dehn Al Oud, White Musk, Sandal"
    },
    description: "Six roll-on miniature attars in a gold-embossed presentation velvet case.",
    images: ["https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  },
  {
    id: "p11",
    name: "Smoky Saffron & Tobacco",
    category: "Luxury",
    type: "Extrait de Parfum",
    size: "50ml",
    rating: 4.9,
    reviews: 67,
    retailPrice: 2299,
    mrp: 3199,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 1220 },
      { min: 12, max: 23, price: 1100 },
      { min: 24, max: 9999, price: 990 }
    ],
    notes: {
      top: "Kashmiri Saffron, Cinnamon",
      heart: "Blonde Tobacco Leaf, Cacao",
      base: "Vanilla, Guaiac Wood, Frankincense"
    },
    description: "Opulent honeyed pipe tobacco steeped with Kashmiri saffron and dark cacao.",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  },
  {
    id: "p12",
    name: "Citrus & Bergamot Breeze",
    category: "Unisex",
    type: "Eau de Parfum",
    size: "50ml",
    rating: 4.7,
    reviews: 58,
    retailPrice: 1399,
    mrp: 1899,
    wholesaleMOQ: 6,
    wholesaleTiers: [
      { min: 6, max: 11, price: 730 },
      { min: 12, max: 23, price: 660 },
      { min: 24, max: 9999, price: 590 }
    ],
    notes: {
      top: "Calabrian Bergamot, Lemon Zest",
      heart: "Neroli Blossom, Orange Flower",
      base: "Clean Cedarwood, White Musk"
    },
    description: "Sun-ripened Calabrian bergamot bursting with sparkling neroli blossoms.",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"],
    bestseller: false
  }
];

const CATEGORIES = [
  { name: "All", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80" },
  { name: "Men", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80" },
  { name: "Women", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80" },
  { name: "Unisex", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80" },
  { name: "Gift Sets", image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=300&q=80" },
  { name: "Miniatures", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=300&q=80" },
  { name: "Body Mists", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80" },
  { name: "Luxury", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=300&q=80" }
];

// Helper methods for storage & state
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function getStoredProducts() {
  const custom = getStorage('alameen_products', null);
  if (custom && Array.isArray(custom) && custom.length > 0) {
    return custom;
  }
  return [...DEFAULT_PRODUCTS];
}

function getStoredSettings() {
  const settings = getStorage('alameen_settings', null);
  return { ...DEFAULT_SETTINGS, ...(settings || {}) };
}

// Price calculation with Wholesale tiers & Festive Offer discount
function calculateProductPrice(product, mode = 'retail', qty = 1, settings = null) {
  if (!settings) settings = getStoredSettings();
  const isOfferActive = settings.offer_enabled && settings.offer_discount_percent > 0;
  const discountRate = isOfferActive ? (1 - settings.offer_discount_percent / 100) : 1;

  if (mode === 'retail') {
    const originalPrice = product.retailPrice;
    const effectiveUnitPrice = isOfferActive ? Math.round(originalPrice * discountRate) : originalPrice;
    return {
      unitPrice: effectiveUnitPrice,
      originalPrice: originalPrice,
      isOffer: isOfferActive,
      discountPercent: settings.offer_discount_percent,
      totalPrice: effectiveUnitPrice * qty
    };
  } else {
    let matchedTier = product.wholesaleTiers ? product.wholesaleTiers[0] : { price: Math.round(product.retailPrice * 0.6) };
    if (product.wholesaleTiers && Array.isArray(product.wholesaleTiers)) {
      for (const tier of product.wholesaleTiers) {
        if (qty >= tier.min) matchedTier = tier;
      }
    }
    const originalTierPrice = matchedTier.price;
    const effectiveTierPrice = isOfferActive ? Math.round(originalTierPrice * discountRate) : originalTierPrice;
    return {
      unitPrice: effectiveTierPrice,
      originalPrice: originalTierPrice,
      isOffer: isOfferActive,
      discountPercent: settings.offer_discount_percent,
      totalPrice: effectiveTierPrice * qty,
      moq: product.wholesaleMOQ || 6
    };
  }
}
