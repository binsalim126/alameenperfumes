/* ==========================================================================
   AL-AMEEN PERFUMES - CORE STATE, CATALOG & ORDERS ENGINE
   Shared across index.html, shop.html, about.html, contact.html, and admin.html
   ========================================================================== */

const CONFIG = {
  STORE_NAME: "AL-AMEEN PERFUMES",
  TAGLINE: "Discover Your Signature Scent",
  WHATSAPP_NUMBER: "919876543210", // Primary WhatsApp order receiving number
  CURRENCY: "₹",
  FREE_SHIPPING_MIN: 999,
  LOW_STOCK_THRESHOLD: 10
};

const DEFAULT_SETTINGS = {
  store_name: "AL-AMEEN PERFUMES",
  tagline: "Discover Your Signature Scent",
  whatsapp_number: "919876543210",
  free_shipping_min: 999,
  low_stock_threshold: 10,
  announcement_enabled: false, // Default is OFF
  announcement_text: "Free shipping Pan-India · Wholesale rates available",
  announcement_link: "shop.html",
  announcement_bg: "#04140E",
  offer_enabled: false,        // Default is OFF
  offer_name: "Festive Season Special",
  offer_badge: "Festive Offer",
  offer_discount_percent: 15,
  offer_applies_to: "both",     // 'retail', 'wholesale', 'both'
  offer_scope: "all",          // 'all', 'category', 'product'
  offer_coupon_code: "",
  offer_min_order: 0,
  offer_end_date: ""
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
    stock: 28,
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
    bestseller: true,
    newArrival: false,
    active: true
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
    stock: 18,
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
    bestseller: true,
    newArrival: true,
    active: true
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
    stock: 22,
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
    bestseller: true,
    newArrival: false,
    active: true
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
    stock: 8, // Low stock example
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
    bestseller: true,
    newArrival: false,
    active: true
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
    stock: 32,
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
    bestseller: false,
    newArrival: false,
    active: true
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
    stock: 40,
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
    bestseller: true,
    newArrival: false,
    active: true
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
    stock: 14,
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
    bestseller: false,
    newArrival: false,
    active: true
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
    stock: 6, // Low stock example
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
    bestseller: false,
    newArrival: true,
    active: true
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
    stock: 12,
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
    bestseller: true,
    newArrival: false,
    active: true
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
    stock: 20,
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
    bestseller: false,
    newArrival: false,
    active: true
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
    stock: 5, // Low stock example
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
    bestseller: false,
    newArrival: true,
    active: true
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
    stock: 30,
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
    bestseller: false,
    newArrival: false,
    active: true
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

// ==========================================================================
// STORAGE & DATA HELPERS
// ==========================================================================

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

function setStoredProducts(products) {
  setStorage('alameen_products', products);
}

function getStoredSettings() {
  const settings = getStorage('alameen_settings', null);
  return { ...DEFAULT_SETTINGS, ...(settings || {}) };
}

function setStoredSettings(settings) {
  setStorage('alameen_settings', settings);
}

// ==========================================================================
// PRICE CALCULATION (With Wholesale Tiers & Festive Offer Batch)
// ==========================================================================

function calculateProductPrice(product, mode = 'retail', qty = 1, settings = null) {
  if (!settings) settings = getStoredSettings();
  
  let isOfferActive = settings.offer_enabled && settings.offer_discount_percent > 0;
  
  // Check scope & audience
  if (isOfferActive && settings.offer_applies_to) {
    if (settings.offer_applies_to === 'retail' && mode !== 'retail') isOfferActive = false;
    if (settings.offer_applies_to === 'wholesale' && mode !== 'wholesale') isOfferActive = false;
  }

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

// ==========================================================================
// ORDERS MANAGEMENT & STOREFRONT CHECKOUT RECORD ENGINE
// ==========================================================================

function getStoredOrders() {
  const orders = getStorage('alameen_orders', null);
  if (orders && Array.isArray(orders)) {
    return orders;
  }
  // If empty on first load, seed with realistic sample data
  return seedSampleOrders();
}

function setStoredOrders(orders) {
  setStorage('alameen_orders', orders);
}

function generateNextOrderId() {
  const orders = getStoredOrders();
  let maxNum = 100;
  orders.forEach(o => {
    if (o.id && o.id.startsWith('ORD-')) {
      const num = parseInt(o.id.replace('ORD-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  const next = maxNum + 1;
  return `ORD-${String(next).padStart(4, '0')}`;
}

// Called by Storefront Checkout BEFORE opening WhatsApp
function createStoreOrder(orderData) {
  const orders = getStoredOrders();
  const nextId = generateNextOrderId();
  const now = new Date().toISOString();

  const newOrder = {
    id: nextId,
    createdAt: now,
    type: orderData.type || "Retail", // "Retail" or "Wholesale"
    items: orderData.items || [],
    subtotal: orderData.subtotal || orderData.total || 0,
    discount: orderData.discount || 0,
    total: orderData.total || 0,
    customer: {
      name: orderData.customer?.name || "Customer",
      contact: orderData.customer?.contact || "",
      address: orderData.customer?.address || "",
      pincode: orderData.customer?.pincode || "",
      notes: orderData.customer?.notes || ""
    },
    status: "New", // New -> Confirmed -> Packed -> Shipped -> Delivered, or Cancelled
    paymentStatus: "Pending", // Pending, Paid, Partial
    history: [
      { status: "New", at: now, note: "Order placed via Storefront Checkout" }
    ]
  };

  orders.unshift(newOrder);
  setStoredOrders(orders);

  // Background sync to Supabase if client is ready
  if (window.supabaseClient) {
    try {
      window.supabaseClient.from('orders').insert([{
        id: newOrder.id,
        created_at: newOrder.createdAt,
        order_type: newOrder.type,
        customer_name: newOrder.customer.name,
        customer_phone: newOrder.customer.contact,
        customer_address: newOrder.customer.address,
        total_amount: newOrder.total,
        status: newOrder.status,
        order_details: newOrder
      }]).then(() => {}).catch(() => {});
    } catch (e) {}
  }

  return newOrder;
}

// Update status with inventory deduction / restoration
function updateOrderStatus(orderId, newStatus, note = "") {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return false;

  const previousStatus = order.status;
  if (previousStatus === newStatus) return true;

  order.status = newStatus;
  const now = new Date().toISOString();
  if (!order.history) order.history = [];
  order.history.unshift({ status: newStatus, at: now, note: note || `Status changed to ${newStatus}` });

  // Stock Management:
  // If transitioning to "Confirmed", reduce stock
  // If transitioning to "Cancelled" from an active state, restore stock
  const products = getStoredProducts();
  let productsChanged = false;

  if (newStatus === "Confirmed" && previousStatus === "New") {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod && typeof prod.stock === 'number') {
        prod.stock = Math.max(0, prod.stock - (item.qty || 1));
        productsChanged = true;
      }
    });
  } else if (newStatus === "Cancelled" && ["Confirmed", "Packed", "Shipped"].includes(previousStatus)) {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod && typeof prod.stock === 'number') {
        prod.stock += (item.qty || 1);
        productsChanged = true;
      }
    });
  }

  if (productsChanged) {
    setStoredProducts(products);
  }

  setStoredOrders(orders);
  return true;
}

function updateOrderPaymentStatus(orderId, newPaymentStatus) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return false;

  order.paymentStatus = newPaymentStatus;
  setStoredOrders(orders);
  return true;
}

function deleteStoredOrder(orderId) {
  let orders = getStoredOrders();
  orders = orders.filter(o => o.id !== orderId);
  setStoredOrders(orders);
  return true;
}

// Build customer database dynamically from order history
function getCustomersFromOrders() {
  const orders = getStoredOrders();
  const customerMap = {};

  orders.forEach(order => {
    const phone = (order.customer?.contact || "").replace(/\D/g, '');
    const key = phone || order.customer?.name || order.id;
    if (!customerMap[key]) {
      customerMap[key] = {
        name: order.customer?.name || "Customer",
        phone: order.customer?.contact || "—",
        address: order.customer?.address || "—",
        pincode: order.customer?.pincode || "—",
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order.createdAt,
        type: order.type || "Retail",
        orders: []
      };
    }

    const c = customerMap[key];
    c.totalOrders += 1;
    if (order.status !== "Cancelled") {
      c.totalSpent += (order.total || 0);
    }
    if (new Date(order.createdAt) > new Date(c.lastOrderDate)) {
      c.lastOrderDate = order.createdAt;
      c.type = order.type || c.type;
      c.name = order.customer?.name || c.name;
    }
    c.orders.push(order);
  });

  return Object.values(customerMap);
}

// ==========================================================================
// REALISTIC SAMPLE ORDER SEED DATA (15 Orders across Retail/Wholesale)
// ==========================================================================

function seedSampleOrders(force = false) {
  if (!force) {
    const existing = getStorage('alameen_orders', null);
    if (existing && Array.isArray(existing) && existing.length > 0) {
      return existing;
    }
  }

  const now = new Date();
  const sampleData = [
    {
      id: "ORD-0115",
      daysAgo: 0.1,
      type: "Retail",
      customer: { name: "Zubair Hashmi", contact: "9820145678", address: "Flat 402, Al-Madina Heights, Mohammed Ali Road, Mumbai", pincode: "400003", notes: "Please gift wrap with gold ribbon" },
      status: "New",
      paymentStatus: "Pending",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 2, unitPrice: 1499, lineTotal: 2998 },
        { productId: "p3", name: "Noor-E-Gulab (Rose Elixir)", size: "50ml", qty: 1, unitPrice: 1899, lineTotal: 1899 }
      ],
      subtotal: 4897, discount: 0, total: 4897
    },
    {
      id: "ORD-0114",
      daysAgo: 0.3,
      type: "Wholesale",
      customer: { name: "Al-Burooj Perfume Boutique", contact: "9845233119", address: "Shop 12, Commercial Street, Bangalore", pincode: "560001", notes: "Urgent wholesale dispatch for bridal exhibition" },
      status: "New",
      paymentStatus: "Pending",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 12, unitPrice: 710, lineTotal: 8520 },
        { productId: "p2", name: "Royal Oud Intense", size: "100ml", qty: 6, unitPrice: 1350, lineTotal: 8100 },
        { productId: "p9", name: "Oriental Discovery Gift Set", size: "4 × 25ml", qty: 4, unitPrice: 1550, lineTotal: 6200 }
      ],
      subtotal: 22820, discount: 0, total: 22820
    },
    {
      id: "ORD-0113",
      daysAgo: 1,
      type: "Retail",
      customer: { name: "Farhan Al-Kassim", contact: "9447120987", address: "Near Beach Road, Calicut, Kerala", pincode: "673001", notes: "Leave at security desk if unavailable" },
      status: "Confirmed",
      paymentStatus: "Paid",
      items: [
        { productId: "p2", name: "Royal Oud Intense", size: "100ml", qty: 1, unitPrice: 2499, lineTotal: 2499 }
      ],
      subtotal: 2499, discount: 0, total: 2499
    },
    {
      id: "ORD-0112",
      daysAgo: 1.8,
      type: "Wholesale",
      customer: { name: "Naseem Royal Scents", contact: "9711899201", address: "Chandni Chowk, Old Delhi", pincode: "110006", notes: "Pack in shock-proof master box" },
      status: "Packed",
      paymentStatus: "Paid",
      items: [
        { productId: "p4", name: "Zafraan & Sandalwood Pure", size: "12ml", qty: 12, unitPrice: 950, lineTotal: 11400 },
        { productId: "p6", name: "Musk Al Tahara Mist", size: "150ml", qty: 24, unitPrice: 390, lineTotal: 9360 }
      ],
      subtotal: 20760, discount: 0, total: 20760
    },
    {
      id: "ORD-0111",
      daysAgo: 2.5,
      type: "Retail",
      customer: { name: "Ayesha Siddiqui", contact: "9988771122", address: "Banjara Hills, Road No. 12, Hyderabad", pincode: "500034", notes: "Express delivery appreciated" },
      status: "Shipped",
      paymentStatus: "Paid",
      items: [
        { productId: "p3", name: "Noor-E-Gulab (Rose Elixir)", size: "50ml", qty: 2, unitPrice: 1899, lineTotal: 3798 },
        { productId: "p6", name: "Musk Al Tahara Mist", size: "150ml", qty: 1, unitPrice: 899, lineTotal: 899 }
      ],
      subtotal: 4697, discount: 0, total: 4697
    },
    {
      id: "ORD-0110",
      daysAgo: 3.2,
      type: "Retail",
      customer: { name: "Irfan Merchant", contact: "9821034567", address: "Koregaon Park, Lane 5, Pune", pincode: "411001", notes: "" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p9", name: "Oriental Discovery Gift Set", size: "4 × 25ml", qty: 1, unitPrice: 2799, lineTotal: 2799 }
      ],
      subtotal: 2799, discount: 0, total: 2799
    },
    {
      id: "ORD-0109",
      daysAgo: 4.1,
      type: "Wholesale",
      customer: { name: "Al-Rawda Fragrance Hub", contact: "9833011223", address: "Relief Road, Ahmedabad, Gujarat", pincode: "380001", notes: "Regular monthly wholesale batch" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 24, unitPrice: 640, lineTotal: 15360 },
        { productId: "p7", name: "Sandalwood Imperial", size: "100ml", qty: 12, unitPrice: 1020, lineTotal: 12240 }
      ],
      subtotal: 27600, discount: 0, total: 27600
    },
    {
      id: "ORD-0108",
      daysAgo: 5,
      type: "Retail",
      customer: { name: "Sameer Patel", contact: "9769012345", address: "Vashi Sector 17, Navi Mumbai", pincode: "400703", notes: "" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p5", name: "Aqua Di Arabian", size: "100ml", qty: 1, unitPrice: 1699, lineTotal: 1699 }
      ],
      subtotal: 1699, discount: 0, total: 1699
    },
    {
      id: "ORD-0107",
      daysAgo: 6.5,
      type: "Retail",
      customer: { name: "Imran Sheikh", contact: "9123456780", address: "Gomti Nagar, Lucknow, UP", pincode: "226010", notes: "Cancelled due to duplicate order" },
      status: "Cancelled",
      paymentStatus: "Pending",
      items: [
        { productId: "p2", name: "Royal Oud Intense", size: "100ml", qty: 1, unitPrice: 2499, lineTotal: 2499 }
      ],
      subtotal: 2499, discount: 0, total: 2499
    },
    {
      id: "ORD-0106",
      daysAgo: 8,
      type: "Wholesale",
      customer: { name: "Deccan Attar House", contact: "9848012345", address: "Charminar Market, Hyderabad", pincode: "500002", notes: "Special Ramadan wholesale supply" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p10", name: "Royal Miniature Attar Set", size: "6 × 6ml", qty: 12, unitPrice: 850, lineTotal: 10200 },
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 12, unitPrice: 710, lineTotal: 8520 }
      ],
      subtotal: 18720, discount: 0, total: 18720
    },
    {
      id: "ORD-0105",
      daysAgo: 11,
      type: "Retail",
      customer: { name: "Meera Nair", contact: "9495012345", address: "Panampilly Nagar, Kochi, Kerala", pincode: "682036", notes: "" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p8", name: "Vanilla Bourbon Gold", size: "50ml", qty: 1, unitPrice: 1599, lineTotal: 1599 }
      ],
      subtotal: 1599, discount: 0, total: 1599
    },
    {
      id: "ORD-0104",
      daysAgo: 14,
      type: "Wholesale",
      customer: { name: "Kashmir Scent Boutique", contact: "9419012345", address: "Residency Road, Srinagar, J&K", pincode: "190001", notes: "Air cargo delivery via Srinagar Airport" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p11", name: "Smoky Saffron & Tobacco", size: "50ml", qty: 6, unitPrice: 1220, lineTotal: 7320 },
        { productId: "p4", name: "Zafraan & Sandalwood Pure", size: "12ml", qty: 6, unitPrice: 1050, lineTotal: 6300 }
      ],
      subtotal: 13620, discount: 0, total: 13620
    },
    {
      id: "ORD-0103",
      daysAgo: 18,
      type: "Retail",
      customer: { name: "Tariq Mansoor", contact: "9810012345", address: "Civil Lines, Jaipur, Rajasthan", pincode: "302006", notes: "" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 1, unitPrice: 1499, lineTotal: 1499 },
        { productId: "p12", name: "Citrus & Bergamot Breeze", size: "50ml", qty: 1, unitPrice: 1399, lineTotal: 1399 }
      ],
      subtotal: 2898, discount: 0, total: 2898
    },
    {
      id: "ORD-0102",
      daysAgo: 22,
      type: "Retail",
      customer: { name: "Zainab Begum", contact: "9831012345", address: "Park Street, Kolkata, West Bengal", pincode: "700016", notes: "Wedding gift" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p9", name: "Oriental Discovery Gift Set", size: "4 × 25ml", qty: 2, unitPrice: 2799, lineTotal: 5598 }
      ],
      subtotal: 5598, discount: 0, total: 5598
    },
    {
      id: "ORD-0101",
      daysAgo: 26,
      type: "Wholesale",
      customer: { name: "Zayd Merchant Boutique", contact: "9820011223", address: "Abids, Hyderabad, Telangana", pincode: "500001", notes: "Flagship wholesale launch order" },
      status: "Delivered",
      paymentStatus: "Paid",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 24, unitPrice: 640, lineTotal: 15360 },
        { productId: "p2", name: "Royal Oud Intense", size: "100ml", qty: 12, unitPrice: 1220, lineTotal: 14640 },
        { productId: "p3", name: "Noor-E-Gulab (Rose Elixir)", size: "50ml", qty: 12, unitPrice: 890, lineTotal: 10680 }
      ],
      subtotal: 40680, discount: 0, total: 40680
    }
  ];

  const generatedOrders = sampleData.map(item => {
    const orderDate = new Date(now.getTime() - item.daysAgo * 86400000).toISOString();
    return {
      id: item.id,
      createdAt: orderDate,
      type: item.type,
      items: item.items,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      customer: item.customer,
      status: item.status,
      paymentStatus: item.paymentStatus,
      history: [
        { status: "New", at: orderDate, note: "Order initiated on WhatsApp" },
        ...(item.status !== "New" ? [{ status: item.status, at: orderDate, note: `Status updated to ${item.status}` }] : [])
      ]
    };
  });

  setStoredOrders(generatedOrders);
  return generatedOrders;
}
