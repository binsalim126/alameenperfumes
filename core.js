/* ==========================================================================
   AL-AMEEN PERFUMES - CORE STATE, CATALOG & DATABASE ENGINE
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

// ==========================================================================
// SUPABASE CLIENT INITIALIZATION & LIVE AUTO-STORE CONFIG
// ==========================================================================
const SUPABASE_CONFIG = {
  URL: "https://gqezejlrbmmavhixzand.supabase.co",
  ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZXplamxyYm1tYXZoaXh6YW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNzk2MjAsImV4cCI6MjExMDY1NTYyMH0.v3Bsa07E3nl7JJjNmYSewCTa_JyknqPKJ1JCr5CyJRE"
};

let supabaseClient = null;
try {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
    window.supabaseClient = supabaseClient;
  }
} catch (e) {
  console.warn('Supabase initialization note:', e);
}

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

// Core Authentic Al-Ameen Flagship Catalog
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
    stock: 15,
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
  }
];

const CATEGORIES = [
  { name: "All", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80" },
  { name: "Men", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80" },
  { name: "Women", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80" },
  { name: "Unisex", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80" },
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
// AUTO-STORE PRODUCTS IN DATABASE (Supabase + LocalStorage Synchronization)
// ==========================================================================

async function autoStoreProductInDatabase(product) {
  // 1. Immediately store in local state
  let products = getStoredProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx > -1) {
    products[idx] = product;
  } else {
    products.unshift(product);
  }
  setStoredProducts(products);

  // 2. Auto-sync to Supabase database if connected
  if (window.supabaseClient) {
    try {
      const payload = {
        id: product.id,
        name: product.name,
        category: product.category,
        type: product.type || 'Eau de Parfum',
        size: product.size || '100ml',
        retail_price: Number(product.retailPrice) || 0,
        mrp: Number(product.mrp) || Number(product.retailPrice) || 0,
        wholesale_moq: Number(product.wholesaleMOQ) || 6,
        wholesale_tiers: product.wholesaleTiers || [],
        notes: product.notes || {},
        description: product.description || '',
        images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [],
        bestseller: !!product.bestseller,
        in_stock: (typeof product.stock === 'number') ? product.stock > 0 : true
      };

      const { data, error } = await window.supabaseClient.from('products').upsert([payload]);
      if (error) {
        console.warn('Supabase sync notice:', error.message);
        return { success: true, localOnly: true, note: error.message };
      }
      return { success: true, localOnly: false, data };
    } catch (err) {
      console.warn('Supabase sync exception:', err.message);
      return { success: true, localOnly: true, note: err.message };
    }
  }

  return { success: true, localOnly: true };
}

async function deleteProductFromDatabase(productId) {
  let products = getStoredProducts();
  products = products.filter(p => p.id !== productId);
  setStoredProducts(products);

  if (window.supabaseClient) {
    try {
      await window.supabaseClient.from('products').delete().eq('id', productId);
    } catch (e) {
      console.warn('Supabase delete notice:', e.message);
    }
  }
  return true;
}

// Pulls latest products from Supabase database if available
async function syncProductsFromSupabase() {
  if (!window.supabaseClient) return false;
  try {
    const { data, error } = await window.supabaseClient.from('products').select('*');
    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped = data.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        type: row.type || 'Eau de Parfum',
        size: row.size || '100ml',
        rating: Number(row.rating) || 5.0,
        reviews: Number(row.reviews) || 0,
        retailPrice: Number(row.retail_price) || 0,
        mrp: Number(row.mrp) || Number(row.retail_price) || 0,
        stock: 25,
        wholesaleMOQ: Number(row.wholesale_moq) || 6,
        wholesaleTiers: row.wholesale_tiers || [],
        notes: row.notes || { top: '', heart: '', base: '' },
        description: row.description || '',
        images: Array.isArray(row.images) && row.images.length > 0 ? row.images : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
        bestseller: !!row.bestseller,
        newArrival: false,
        active: true
      }));
      setStoredProducts(mapped);
      return mapped;
    }
  } catch (e) {
    console.warn('Supabase query note:', e.message);
  }
  return false;
}

// Pushes all local products to Supabase in one batch
async function syncAllProductsToSupabase() {
  const products = getStoredProducts();
  if (!window.supabaseClient) {
    return { success: true, count: products.length, note: 'Saved locally (Supabase client not loaded)' };
  }
  try {
    const payloads = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      type: product.type || 'Eau de Parfum',
      size: product.size || '100ml',
      retail_price: Number(product.retailPrice) || 0,
      mrp: Number(product.mrp) || Number(product.retailPrice) || 0,
      wholesale_moq: Number(product.wholesaleMOQ) || 6,
      wholesale_tiers: product.wholesaleTiers || [],
      notes: product.notes || {},
      description: product.description || '',
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [],
      bestseller: !!product.bestseller,
      in_stock: (typeof product.stock === 'number') ? product.stock > 0 : true
    }));

    const { data, error } = await window.supabaseClient.from('products').upsert(payloads);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, count: products.length, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Auto-run non-blocking Supabase sync on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    syncProductsFromSupabase().catch(() => {});
  });
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

// Returns clean stored orders list (defaults to [] if empty - NO auto-seeded demo junk)
function getStoredOrders() {
  const orders = getStorage('alameen_orders', null);
  if (orders && Array.isArray(orders)) {
    return orders;
  }
  return []; // Clean empty state by default!
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
// CLEANUP & DEMO DATA MANAGEMENT HELPERS
// ==========================================================================

// Clears all demo customers and demo orders (sets orders to [])
function clearAllDemoCustomersAndOrders() {
  setStoredOrders([]);
  return true;
}

// Resets products to the 4 authentic Al-Ameen creations
function resetProductsToFlagship() {
  setStoredProducts([...DEFAULT_PRODUCTS]);
  return [...DEFAULT_PRODUCTS];
}

// Clears all products (leaves catalog empty for fresh manual entry)
function clearAllProducts() {
  setStoredProducts([]);
  return [];
}

// Optional: seed sample orders only if explicitly requested
function seedSampleOrders(force = false) {
  const now = new Date();
  const sampleData = [
    {
      id: "ORD-0115",
      createdAt: new Date(now.getTime() - 0.1 * 86400000).toISOString(),
      type: "Retail",
      customer: { name: "Zubair Hashmi", contact: "9820145678", address: "Flat 402, Al-Madina Heights, Mohammed Ali Road, Mumbai", pincode: "400003", notes: "Please gift wrap with gold ribbon" },
      status: "New",
      paymentStatus: "Pending",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 2, unitPrice: 1499, lineTotal: 2998 },
        { productId: "p3", name: "Noor-E-Gulab (Rose Elixir)", size: "50ml", qty: 1, unitPrice: 1899, lineTotal: 1899 }
      ],
      subtotal: 4897, discount: 0, total: 4897,
      history: [{ status: "New", at: new Date().toISOString(), note: "Order placed" }]
    },
    {
      id: "ORD-0114",
      createdAt: new Date(now.getTime() - 0.3 * 86400000).toISOString(),
      type: "Wholesale",
      customer: { name: "Al-Burooj Perfume Boutique", contact: "9845233119", address: "Shop 12, Commercial Street, Bangalore", pincode: "560001", notes: "Urgent wholesale dispatch for bridal exhibition" },
      status: "New",
      paymentStatus: "Pending",
      items: [
        { productId: "p1", name: "Al-Ameen Sultan Attar", size: "12ml", qty: 12, unitPrice: 710, lineTotal: 8520 },
        { productId: "p2", name: "Royal Oud Intense", size: "100ml", qty: 6, unitPrice: 1350, lineTotal: 8100 }
      ],
      subtotal: 16620, discount: 0, total: 16620,
      history: [{ status: "New", at: new Date().toISOString(), note: "Wholesale order placed" }]
    }
  ];

  setStoredOrders(sampleData);
  return sampleData;
}
