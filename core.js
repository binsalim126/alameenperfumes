/* ==========================================================================
   AL-AMEEN PERFUMES - CORE STATE, DATABASE & REALTIME ENGINE
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
// 1. SUPABASE CLIENT INITIALIZATION & LIVE CREDENTIALS
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
  console.warn('[Al-Ameen Database] Supabase client init error:', e);
}

// --------------------------------------------------------------------------
// 2. PURGE LEGACY BUSINESS STORAGE (Strict Requirement 1)
// --------------------------------------------------------------------------
// Remove all legacy product, order, and store keys from browser localStorage
(function purgeLegacyStoreData() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('alameen_products');
      localStorage.removeItem('alameen_orders');
      localStorage.removeItem('alameen_settings');
      localStorage.removeItem('alameen_categories');
    }
  } catch (e) {
    // ignore sandbox storage access errors
  }
})();

// Default Site Settings Object (used when DB is booting)
const DEFAULT_SETTINGS = {
  store_name: "AL-AMEEN PERFUMES",
  tagline: "Discover Your Signature Scent",
  whatsapp_number: "919876543210",
  free_shipping_min: 999,
  low_stock_threshold: 10,
  announcement_enabled: false,
  announcement_text: "Free shipping Pan-India · Wholesale rates available",
  announcement_link: "shop.html",
  announcement_bg: "#04140E",
  offer_enabled: false,
  offer_name: "Festive Season Special",
  offer_badge: "Festive Offer",
  offer_discount_percent: 15,
  offer_applies_to: "both",
  offer_scope: "all",
  offer_coupon_code: "",
  offer_min_order: 0,
  offer_end_date: "",
  wholesale_default_moq: 6,
  wholesale_default_discount: 40,
  wholesale_tier1_min: 6,
  wholesale_tier1_discount: 40,
  wholesale_tier2_min: 12,
  wholesale_tier2_discount: 48,
  wholesale_tier3_min: 24,
  wholesale_tier3_discount: 55,
  attar_sizes: ["3ml", "6ml", "12ml"],
  spray_sizes: ["50ml", "100ml"]
};

// Default Categories for UI Carousel & Filters
const CATEGORIES = [
  { name: "All", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80" },
  { name: "Luxury", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=300&q=80" },
  { name: "Men", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80" },
  { name: "Women", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80" },
  { name: "Unisex", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80" },
  { name: "Gift Sets", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80" },
  { name: "Miniatures", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80" },
  { name: "Body Mists", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80" }
];

// 4 Authentic Al-Ameen Flagship Creations for Manual DB Seeding
const FLAGSHIP_SEED_PRODUCTS = [
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
    bottleSizes: [
      { size: "3ml", price: 499, mrp: 799, label: "3ml Flacon (Pocket Edition)" },
      { size: "6ml", price: 899, mrp: 1399, label: "6ml Flacon (Standard Edition)" },
      { size: "12ml", price: 1499, mrp: 2199, label: "12ml Flacon (Royal Flacon)" }
    ],
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
    bottleSizes: [
      { size: "50ml", price: 1799, mrp: 2499, label: "50ml Spray Flacon" },
      { size: "100ml", price: 2499, mrp: 3499, label: "100ml Luxury Vaporisateur" }
    ],
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
    bottleSizes: [
      { size: "50ml", price: 1899, mrp: 2599, label: "50ml Spray Flacon" },
      { size: "100ml", price: 2699, mrp: 3699, label: "100ml Luxury Vaporisateur" }
    ],
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
    bottleSizes: [
      { size: "3ml", price: 699, mrp: 999, label: "3ml Flacon (Pocket Edition)" },
      { size: "6ml", price: 1199, mrp: 1699, label: "6ml Flacon (Standard Edition)" },
      { size: "12ml", price: 1999, mrp: 2799, label: "12ml Flacon (Royal Flacon)" }
    ],
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

// ==========================================================================
// 3. ROW FORMATTERS & BOTTLE SIZES (Database snake_case <-> Frontend camelCase)
// ==========================================================================

// Safely track whether Supabase schema has 'bottle_sizes' column. Default false to prevent PGRST204 errors.
// Bottle sizes are ALWAYS safely persisted inside 'notes' JSON (notes.bottle_sizes).
if (typeof window.hasBottleSizesColumn === 'undefined') {
  window.hasBottleSizesColumn = false;
}

// Dynamic bottle size generation based on product category, concentration & admin configured settings
function getProductSizes(product, customSettings = null) {
  if (!product) return [];
  if (Array.isArray(product.bottleSizes) && product.bottleSizes.length > 0) {
    return product.bottleSizes;
  }
  if (Array.isArray(product.bottle_sizes) && product.bottle_sizes.length > 0) {
    return product.bottle_sizes;
  }

  const settings = customSettings || window.currentSettings || DEFAULT_SETTINGS;
  const basePrice = Number(product.retailPrice || product.retail_price) || 999;
  const baseMrp = Number(product.mrp) || Math.round(basePrice * 1.4);
  const typeStr = ((product.type || '') + ' ' + (product.category || '')).toLowerCase();

  const attarSizes = (settings && Array.isArray(settings.attar_sizes) && settings.attar_sizes.length > 0)
    ? settings.attar_sizes
    : ['3ml', '6ml', '12ml'];

  const spraySizes = (settings && Array.isArray(settings.spray_sizes) && settings.spray_sizes.length > 0)
    ? settings.spray_sizes
    : ['50ml', '100ml'];

  // Attar / Concentrated Oil: configured ml sizes
  if (typeStr.includes('attar') || typeStr.includes('oil') || typeStr.includes('concentrated') || typeStr.includes('pure') || (product.size && product.size.toLowerCase().includes('12ml')) || !typeStr.includes('spray')) {
    const parsed = attarSizes.map(s => ({ size: s, ml: parseFloat(s) || 12 }));
    const maxMl = Math.max(...parsed.map(p => p.ml));

    return attarSizes.map(sz => {
      const ml = parseFloat(sz) || 12;
      const price = (ml === maxMl) ? basePrice : Math.max(149, Math.round((basePrice * Math.pow(ml / maxMl, 0.75)) / 10) * 10 - 1);
      const mrp = Math.round(price * 1.4);
      const label = `${sz} Flacon (${sz === '3ml' ? 'Pocket Edition' : sz === '12ml' ? 'Royal Flacon' : 'Standard Edition'})`;
      return { size: sz, price: price, mrp: mrp, label: label };
    });
  }

  // Spray / Eau de Parfum: configured ml sizes
  if (typeStr.includes('spray') || typeStr.includes('edp') || typeStr.includes('eau de parfum') || typeStr.includes('parfum')) {
    const parsed = spraySizes.map(s => ({ size: s, ml: parseFloat(s) || 100 }));
    const maxMl = Math.max(...parsed.map(p => p.ml));

    return spraySizes.map(sz => {
      const ml = parseFloat(sz) || 100;
      const price = (ml === maxMl) ? basePrice : Math.max(499, Math.round((basePrice * Math.pow(ml / maxMl, 0.75)) / 50) * 50 - 1);
      const mrp = Math.round(price * 1.35);
      const label = `${sz} Spray (${sz === '100ml' ? 'Luxury Vaporisateur' : 'Spray Flacon'})`;
      return { size: sz, price: price, mrp: mrp, label: label };
    });
  }

  // Fallback
  return [
    { size: product.size || 'Standard', price: basePrice, mrp: baseMrp, label: product.size || 'Standard Edition' }
  ];
}

// Calculate wholesale volume tiers from retail price & tier settings
function calculateTiersFromRetail(retailPrice, tierSettings = null) {
  const retail = Number(retailPrice) || 0;
  const s = tierSettings || DEFAULT_SETTINGS;
  const t1Disc = Number(s.wholesale_tier1_discount) || 40;
  const t2Disc = Number(s.wholesale_tier2_discount) || 48;
  const t3Disc = Number(s.wholesale_tier3_discount) || 55;
  const moq = Number(s.wholesale_tier1_min || s.wholesaleMOQ) || 6;

  return [
    { min: moq, max: moq * 2 - 1, price: Math.round(retail * (1 - t1Disc / 100)) },
    { min: moq * 2, max: moq * 4 - 1, price: Math.round(retail * (1 - t2Disc / 100)) },
    { min: moq * 4, max: 9999, price: Math.round(retail * (1 - t3Disc / 100)) }
  ];
}

function formatProductFromRow(row) {
  if (!row) return null;
  const rawSizes = (Array.isArray(row.bottle_sizes) && row.bottle_sizes.length > 0)
    ? row.bottle_sizes
    : (row.notes && Array.isArray(row.notes.bottle_sizes) && row.notes.bottle_sizes.length > 0)
      ? row.notes.bottle_sizes
      : getProductSizes({
          type: row.type,
          category: row.category,
          size: row.size,
          retailPrice: Number(row.retail_price),
          mrp: Number(row.mrp)
        });

  return {
    id: row.id,
    name: row.name || 'Unnamed Perfume',
    category: row.category || 'Luxury',
    type: row.type || 'Eau de Parfum',
    size: row.size || (rawSizes[rawSizes.length - 1]?.size || '12ml'),
    bottleSizes: rawSizes,
    rating: Number(row.rating) || 5.0,
    reviews: Number(row.reviews) || 0,
    retailPrice: Number(row.retail_price) || 0,
    mrp: Number(row.mrp) || Number(row.retail_price) || 0,
    stock: typeof row.stock === 'number' ? row.stock : (row.in_stock ? 20 : 0),
    wholesaleMOQ: Number(row.wholesale_moq) || 6,
    wholesalePrice: Number(row.wholesale_price) || (Array.isArray(row.wholesale_tiers) && row.wholesale_tiers[0]?.price) || Math.round((Number(row.retail_price) || 0) * 0.60),
    wholesaleTiers: Array.isArray(row.wholesale_tiers) && row.wholesale_tiers.length > 0 
      ? row.wholesale_tiers 
      : [{ min: Number(row.wholesale_moq) || 6, max: 9999, price: Math.round((Number(row.retail_price) || 0) * 0.60) }],
    notes: row.notes && typeof row.notes === 'object' ? row.notes : { top: '', heart: '', base: '' },
    description: row.description || '',
    images: (Array.isArray(row.images) && row.images.length > 0) ? row.images : ((typeof row.images === 'string' && row.images.trim()) ? [row.images.trim()] : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80']),
    bestseller: !!row.bestseller,
    newArrival: !!row.new_arrival,
    active: row.in_stock !== false,
    createdAt: row.created_at
  };
}

function formatProductToRow(product) {
  const retail = Number(product.retailPrice) || 0;
  const sizes = Array.isArray(product.bottleSizes) && product.bottleSizes.length > 0 ? product.bottleSizes : getProductSizes(product);
  
  // Also preserve bottle_sizes inside notes JSON so sizes are always preserved even if the bottle_sizes column is not in Supabase yet
  const notesObj = (product.notes && typeof product.notes === 'object') ? { ...product.notes } : { top: '', heart: '', base: '' };
  notesObj.bottle_sizes = sizes;

  const row = {
    id: product.id,
    name: product.name,
    category: product.category,
    type: product.type || 'Eau de Parfum',
    size: product.size || (sizes[sizes.length - 1]?.size || '12ml'),
    rating: Number(product.rating) || 5.0,
    reviews: Number(product.reviews) || 0,
    retail_price: retail,
    mrp: Number(product.mrp) || Math.round(retail * 1.4),
    stock: typeof product.stock === 'number' ? product.stock : 20,
    wholesale_moq: Number(product.wholesaleMOQ) || 6,
    wholesale_tiers: [
      {
        min: Number(product.wholesaleMOQ) || 6,
        max: 9999,
        price: Number(product.wholesalePrice) || Math.round(retail * 0.60)
      }
    ],
    notes: notesObj,
    description: product.description || '',
    images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [],
    bestseller: !!product.bestseller,
    new_arrival: !!product.newArrival,
    in_stock: product.active !== false
  };

  if (window.hasBottleSizesColumn === true) {
    row.bottle_sizes = sizes;
  }

  return row;
}

function formatOrderFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    type: row.order_type || 'Retail',
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(row.subtotal) || 0,
    discount: Number(row.discount) || 0,
    shipping: Number(row.shipping) || 0,
    total: Number(row.total) || 0,
    customer: {
      name: row.customer_name || 'Customer',
      contact: row.customer_phone || '',
      address: row.customer_address || '',
      pincode: row.customer_pincode || '',
      notes: row.customer_notes || ''
    },
    status: row.status || 'New',
    paymentStatus: row.payment_status || 'Pending',
    history: Array.isArray(row.history) ? row.history : []
  };
}

// ==========================================================================
// 4. SUPABASE CRUD OPERATIONS (Strict Database Operations, No Fake Local Fallbacks)
// ==========================================================================

function getSupabase() {
  if (window.supabaseClient) return window.supabaseClient;
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    window.supabaseClient = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
    return window.supabaseClient;
  }
  throw new Error("Supabase client library not loaded. Please ensure Supabase CDN script is present and network is active.");
}

// Fetch products directly from Supabase
async function dbFetchProducts() {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase Fetch Products Error]', error);
    throw error;
  }

  if (Array.isArray(data) && data.length > 0) {
    window.hasBottleSizesColumn = ('bottle_sizes' in data[0]);
  }

  return (data || []).map(formatProductFromRow);
}

// Fetch orders directly from Supabase
async function dbFetchOrders() {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase Fetch Orders Error]', error);
    throw error;
  }

  return (data || []).map(formatOrderFromRow);
}

// Fetch settings from Supabase
async function dbFetchSettings() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb.from('site_settings').select('*');
    if (error) {
      console.warn('[Supabase Settings Fetch Note]', error.message);
      return { ...DEFAULT_SETTINGS };
    }

    const merged = { ...DEFAULT_SETTINGS };
    (data || []).forEach(row => {
      if (row.key === 'general' && row.value && typeof row.value === 'object') {
        Object.assign(merged, row.value);
      }
    });
    window.currentSettings = merged;
    return merged;
  } catch (err) {
    console.warn('[Supabase Settings Catch]', err);
    return { ...DEFAULT_SETTINGS };
  }
}

// Create a new product in Supabase
async function dbCreateProduct(product) {
  const sb = getSupabase();
  const payload = formatProductToRow(product);

  let { data, error } = await sb
    .from('products')
    .insert([payload])
    .select();

  // Graceful fallback if 'bottle_sizes' column does not exist or schema cache is stale (PGRST204)
  if (error && (error.code === 'PGRST204' || (error.message && error.message.toLowerCase().includes('bottle_sizes')))) {
    console.warn('[Supabase Fallback] "bottle_sizes" column missing in Supabase schema cache. Retrying insert without column...');
    window.hasBottleSizesColumn = false;
    const fallbackPayload = { ...payload };
    delete fallbackPayload.bottle_sizes;
    
    // Explicitly select only universal columns to prevent PostgREST from failing on stale column cache
    const retry = await sb.from('products')
      .insert([fallbackPayload])
      .select('id, name, category, type, size, retail_price, mrp, stock, wholesale_moq, wholesale_tiers, notes, description, images, bestseller, new_arrival, in_stock');
      
    if (retry.data && retry.data.length > 0) {
      data = [{ ...fallbackPayload, ...retry.data[0] }];
      error = null;
    } else if (!retry.error) {
      data = [fallbackPayload];
      error = null;
    } else {
      // Last-resort fallback: insert without select representation
      const blindInsert = await sb.from('products').insert([fallbackPayload]);
      if (!blindInsert.error) {
        data = [fallbackPayload];
        error = null;
      } else {
        data = retry.data;
        error = blindInsert.error || retry.error;
      }
    }
  }

  if (error) {
    console.error('[Supabase Insert Product Error]', error);
    throw new Error(`Database insert failed: ${error.message} (Code: ${error.code})`);
  }

  if (!data || data.length === 0) {
    throw new Error("Database insert affected 0 rows. Please verify Supabase RLS INSERT policy.");
  }

  return formatProductFromRow(data[0]);
}

// Batch create or upsert products in Supabase
async function dbBatchCreateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) return [];
  const sb = getSupabase();
  const rows = products.map(formatProductToRow);

  let { data, error } = await sb
    .from('products')
    .upsert(rows)
    .select();

  // Graceful fallback if 'bottle_sizes' column does not exist or schema cache is stale (PGRST204)
  if (error && (error.code === 'PGRST204' || (error.message && error.message.toLowerCase().includes('bottle_sizes')))) {
    console.warn('[Supabase Fallback] "bottle_sizes" column missing in Supabase schema cache during batch upsert. Retrying without column...');
    window.hasBottleSizesColumn = false;
    const stripped = rows.map(r => {
      const copy = { ...r };
      delete copy.bottle_sizes;
      return copy;
    });

    const retry = await sb.from('products').upsert(stripped).select();
    if (!retry.error) {
      data = retry.data || stripped;
      error = null;
    } else {
      const blind = await sb.from('products').upsert(stripped);
      if (!blind.error) {
        data = stripped;
        error = null;
      } else {
        error = blind.error || retry.error;
      }
    }
  }

  if (error) {
    console.error('[Supabase Batch Insert Error]', error);
    throw new Error(`Batch insert failed: ${error.message} (Code: ${error.code})`);
  }

  return (data || rows).map(formatProductFromRow);
}

// Update an existing product in Supabase
async function dbUpdateProduct(product) {
  const sb = getSupabase();
  const payload = formatProductToRow(product);

  let { data, error } = await sb
    .from('products')
    .update(payload)
    .eq('id', product.id)
    .select();

  // Graceful fallback if 'bottle_sizes' column does not exist or schema cache is stale (PGRST204)
  if (error && (error.code === 'PGRST204' || (error.message && error.message.toLowerCase().includes('bottle_sizes')))) {
    console.warn('[Supabase Fallback] "bottle_sizes" column missing in Supabase schema cache. Retrying update without column...');
    window.hasBottleSizesColumn = false;
    const fallbackPayload = { ...payload };
    delete fallbackPayload.bottle_sizes;
    
    // Explicitly select only universal columns
    const retry = await sb.from('products')
      .update(fallbackPayload)
      .eq('id', product.id)
      .select('id, name, category, type, size, retail_price, mrp, stock, wholesale_moq, wholesale_tiers, notes, description, images, bestseller, new_arrival, in_stock');
      
    if (retry.data && retry.data.length > 0) {
      data = [{ ...fallbackPayload, ...retry.data[0] }];
      error = null;
    } else if (!retry.error) {
      data = [fallbackPayload];
      error = null;
    } else {
      const blindUpdate = await sb.from('products').update(fallbackPayload).eq('id', product.id);
      if (!blindUpdate.error) {
        data = [fallbackPayload];
        error = null;
      } else {
        data = retry.data;
        error = blindUpdate.error || retry.error;
      }
    }
  }

  if (error) {
    console.error('[Supabase Update Product Error]', error);
    throw new Error(`Database update failed: ${error.message} (Code: ${error.code})`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Product ${product.id} was not found in Supabase or update affected 0 rows.`);
  }

  return formatProductFromRow(data[0]);
}

// Delete a product in Supabase
async function dbDeleteProduct(productId) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('products')
    .delete()
    .eq('id', productId)
    .select();

  if (error) {
    console.error('[Supabase Delete Product Error]', error);
    throw new Error(`Database delete failed: ${error.message} (Code: ${error.code})`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Product ${productId} was not found in database or delete affected 0 rows. Please check Supabase RLS DELETE policy.`);
  }

  return true;
}

// Create an order in Supabase
async function dbCreateOrder(orderData) {
  const sb = getSupabase();
  const orderId = `ORD-${Date.now().toString().slice(-4)}`;
  const now = new Date().toISOString();

  const fullOrder = {
    id: orderId,
    createdAt: now,
    type: orderData.type || "Retail",
    items: orderData.items || [],
    subtotal: Number(orderData.subtotal) || Number(orderData.total) || 0,
    discount: Number(orderData.discount) || 0,
    total: Number(orderData.total) || 0,
    customer: {
      name: orderData.customer?.name || "Customer",
      contact: orderData.customer?.contact || "",
      address: orderData.customer?.address || "",
      pincode: orderData.customer?.pincode || "",
      notes: orderData.customer?.notes || ""
    },
    status: "New",
    paymentStatus: "Pending",
    history: [
      { status: "New", at: now, note: "Order placed via Storefront Checkout" }
    ]
  };

  const row = {
    id: fullOrder.id,
    created_at: fullOrder.createdAt,
    order_type: fullOrder.type,
    customer_name: fullOrder.customer.name,
    customer_phone: fullOrder.customer.contact,
    customer_address: fullOrder.customer.address,
    customer_pincode: fullOrder.customer.pincode,
    customer_notes: fullOrder.customer.notes,
    items: fullOrder.items,
    subtotal: fullOrder.subtotal,
    discount: fullOrder.discount,
    shipping: 0,
    total: fullOrder.total,
    status: fullOrder.status,
    payment_status: fullOrder.paymentStatus,
    history: fullOrder.history
  };

  const { data, error } = await sb
    .from('orders')
    .insert([row])
    .select();

  if (error) {
    console.error('[Supabase Insert Order Error]', error);
    throw new Error(`Failed to save order to database: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error("Order creation affected 0 rows. Check Supabase orders RLS policy.");
  }

  return fullOrder;
}

// Update order status in Supabase
async function dbUpdateOrderStatus(orderId, newStatus, currentOrder = null) {
  const sb = getSupabase();
  const now = new Date().toISOString();

  let history = (currentOrder && Array.isArray(currentOrder.history)) ? [...currentOrder.history] : [];
  history.unshift({ status: newStatus, at: now, note: `Status updated to ${newStatus}` });

  const { data, error } = await sb
    .from('orders')
    .update({ status: newStatus, history: history })
    .eq('id', orderId)
    .select();

  if (error) {
    console.error('[Supabase Update Order Status Error]', error);
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Order ${orderId} was not found or affected 0 rows.`);
  }

  return true;
}

// Update payment status in Supabase
async function dbUpdateOrderPayment(orderId, paymentStatus) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('orders')
    .update({ payment_status: paymentStatus })
    .eq('id', orderId)
    .select();

  if (error) throw error;
  return true;
}

// Delete an order in Supabase
async function dbDeleteOrder(orderId) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('orders')
    .delete()
    .eq('id', orderId)
    .select();

  if (error) throw error;
  return true;
}

// Save site settings to Supabase
async function dbSaveSettings(settingsObj) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('site_settings')
    .upsert([
      { key: 'general', value: settingsObj, updated_at: new Date().toISOString() }
    ])
    .select();

  if (error) {
    console.error('[Supabase Save Settings Error]', error);
    throw new Error(`Failed to save settings to database: ${error.message}`);
  }

  return true;
}

// Get admin password from Supabase
async function dbGetAdminPassword() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('site_settings')
      .select('value')
      .eq('key', 'admin_auth')
      .maybeSingle();

    if (!error && data && data.value && data.value.password) {
      return data.value.password;
    }
  } catch (e) {}
  return "Alameen@786";
}

// Save admin password to Supabase
async function dbSaveAdminPassword(newPassword) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('site_settings')
    .upsert([
      {
        key: 'admin_auth',
        value: { admin_id: "AlameenPerfumes", password: newPassword, updated_at: new Date().toISOString() },
        updated_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    throw new Error(`Failed to save password to Supabase: ${error.message}`);
  }
  return true;
}

// Seed 4 authentic flagship creations directly to Supabase
async function dbSeedFlagshipProductsToSupabase() {
  const sb = getSupabase();
  const rows = FLAGSHIP_SEED_PRODUCTS.map(formatProductToRow);

  let { data, error } = await sb
    .from('products')
    .upsert(rows)
    .select();

  // Graceful fallback if 'bottle_sizes' column does not exist in remote Supabase table
  if (error && (error.code === 'PGRST204' || (error.message && error.message.toLowerCase().includes('bottle_sizes')))) {
    window.hasBottleSizesColumn = false;
    const stripped = rows.map(r => {
      const copy = { ...r };
      delete copy.bottle_sizes;
      return copy;
    });
    const retry = await sb.from('products').upsert(stripped).select();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error('[Supabase Seed Error]', error);
    throw new Error(`Seeding failed: ${error.message}`);
  }

  return (data || []).map(formatProductFromRow);
}

// ==========================================================================
// 5. SUPABASE REALTIME SUBSCRIPTION ENGINE (Requirement 4)
// ==========================================================================

function initSupabaseRealtime(tableName, callback) {
  try {
    const sb = getSupabase();
    const channelName = `realtime_${tableName}_${Math.random().toString(36).slice(2, 8)}`;
    
    const channel = sb
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          console.log(`[Supabase Realtime Sync] Table "${tableName}" event:`, payload.eventType, payload);
          if (typeof callback === 'function') {
            callback(payload);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`[Supabase Realtime] Subscribed to "${tableName}" changes.`);
        }
      });

    return channel;
  } catch (err) {
    console.warn(`[Supabase Realtime] Could not subscribe to ${tableName}:`, err.message);
    return null;
  }
}

function removeSupabaseRealtime(channel) {
  try {
    if (channel && window.supabaseClient) {
      window.supabaseClient.removeChannel(channel);
      console.log('[Supabase Realtime] Unsubscribed channel successfully.');
    }
  } catch (e) {
    console.warn('[Supabase Realtime Unsubscribe Exception]', e);
  }
}

// ==========================================================================
// 6. PRICE CALCULATION (Dynamic with Wholesale Tiers & Offers)
// ==========================================================================

function calculateProductPrice(product, mode = 'retail', qty = 1, settings = null, selectedSize = null) {
  if (!settings) settings = DEFAULT_SETTINGS;
  if (!product) {
    return { unitPrice: 0, originalPrice: 0, mrp: 0, selectedSize: '12ml', isOffer: false, discountPercent: 0, totalPrice: 0 };
  }

  // Resolve sizes
  const sizes = getProductSizes(product);
  let sizeObj = null;
  if (selectedSize && sizes.length > 0) {
    sizeObj = sizes.find(s => s.size === selectedSize || s.size.toLowerCase() === selectedSize.toLowerCase());
  }
  if (!sizeObj && sizes.length > 0) {
    sizeObj = sizes.find(s => s.size === product.size) || sizes[sizes.length - 1];
  }

  const baseRetailPrice = sizeObj ? Number(sizeObj.price) : (Number(product.retailPrice) || 0);
  const baseMrp = sizeObj ? Number(sizeObj.mrp) : (Number(product.mrp) || Math.round(baseRetailPrice * 1.4));
  const activeSizeName = sizeObj ? sizeObj.size : (product.size || '12ml');

  let isOfferActive = settings.offer_enabled && settings.offer_discount_percent > 0;
  
  if (isOfferActive && settings.offer_applies_to) {
    if (settings.offer_applies_to === 'retail' && mode !== 'retail') isOfferActive = false;
    if (settings.offer_applies_to === 'wholesale' && mode !== 'wholesale') isOfferActive = false;
  }

  const discountRate = isOfferActive ? (1 - settings.offer_discount_percent / 100) : 1;

  if (mode === 'retail') {
    const originalPrice = baseRetailPrice;
    const effectiveUnitPrice = isOfferActive ? Math.round(originalPrice * discountRate) : originalPrice;
    return {
      unitPrice: effectiveUnitPrice,
      originalPrice: originalPrice,
      mrp: baseMrp,
      selectedSize: activeSizeName,
      isOffer: isOfferActive,
      discountPercent: settings.offer_discount_percent,
      totalPrice: effectiveUnitPrice * qty
    };
  } else {
    // Single Wholesale Pricing based purely on MOQ (Tier complexity removed)
    const baseWholesalePrice = Number(product.wholesalePrice) 
      || (product.wholesaleTiers && product.wholesaleTiers[0]?.price) 
      || Math.round(baseRetailPrice * 0.6);
    let originalTierPrice = baseWholesalePrice;

    // Scale proportionally if customer chose a smaller/larger size in wholesale
    if (sizeObj && product.retailPrice && baseRetailPrice !== Number(product.retailPrice)) {
      const ratio = baseRetailPrice / Number(product.retailPrice);
      originalTierPrice = Math.max(50, Math.round(originalTierPrice * ratio));
    }

    const effectiveTierPrice = isOfferActive ? Math.round(originalTierPrice * discountRate) : originalTierPrice;
    return {
      unitPrice: effectiveTierPrice,
      originalPrice: originalTierPrice,
      mrp: baseMrp,
      selectedSize: activeSizeName,
      isOffer: isOfferActive,
      discountPercent: settings.offer_discount_percent,
      totalPrice: effectiveTierPrice * qty,
      moq: product.wholesaleMOQ || 6
    };
  }
}

// UI Cart & Wishlist Storage (Isolated client-side session only)
function getClientSession(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setClientSession(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function setStorage(key, value) {
  setClientSession(key, value);
}

function getStorage(key, fallback = null) {
  return getClientSession(key, fallback);
}

// Global Exports
window.CONFIG = CONFIG;
window.setStorage = setStorage;
window.getStorage = getStorage;
window.getProductSizes = getProductSizes;
window.calculateTiersFromRetail = calculateTiersFromRetail;
window.dbFetchProducts = dbFetchProducts;
window.dbFetchOrders = dbFetchOrders;
window.dbFetchSettings = dbFetchSettings;
window.dbCreateProduct = dbCreateProduct;
window.dbBatchCreateProducts = dbBatchCreateProducts;
window.dbUpdateProduct = dbUpdateProduct;
window.dbDeleteProduct = dbDeleteProduct;
window.dbCreateOrder = dbCreateOrder;
window.dbUpdateOrderStatus = dbUpdateOrderStatus;
window.dbUpdateOrderPayment = dbUpdateOrderPayment;
window.dbDeleteOrder = dbDeleteOrder;
window.dbSaveSettings = dbSaveSettings;
window.dbGetAdminPassword = dbGetAdminPassword;
window.dbSaveAdminPassword = dbSaveAdminPassword;
window.dbSeedFlagshipProductsToSupabase = dbSeedFlagshipProductsToSupabase;
window.initSupabaseRealtime = initSupabaseRealtime;
window.removeSupabaseRealtime = removeSupabaseRealtime;
window.calculateProductPrice = calculateProductPrice;
window.getClientSession = getClientSession;
window.setClientSession = setClientSession;

// ==========================================================================
// 6. GLOBAL LUXURY TOP-STACKED TOAST NOTIFICATION SYSTEM (BUG 1 FIX)
// ==========================================================================
(function injectGlobalToastStyles() {
  if (typeof document === 'undefined') return;
  const styleId = 'alameen-global-toast-styles';
  if (document.getElementById(styleId)) return;

  const styleEl = document.createElement('style');
  styleEl.id = styleId;
  styleEl.textContent = `
    .toast-container,
    .toast-container-top {
      position: fixed !important;
      top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: calc(100% - 24px) !important;
      max-width: 480px !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      align-items: center !important;
      pointer-events: none !important;
      margin: 0 !important;
      padding: 0 !important;
      bottom: auto !important;
      right: auto !important;
    }

    .toast-box,
    .alameen-toast-box {
      pointer-events: auto !important;
      cursor: pointer !important;
      width: 100% !important;
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 12px 16px !important;
      background: rgba(10, 38, 28, 0.96) !important;
      color: #FFFFFF !important;
      border-radius: 14px !important;
      border: 1px solid rgba(212, 175, 55, 0.35) !important;
      border-left: 4px solid #D4AF37 !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 16px rgba(212, 175, 55, 0.15) !important;
      backdrop-filter: blur(14px) !important;
      -webkit-backdrop-filter: blur(14px) !important;
      animation: toastSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      user-select: none !important;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .toast-box.success,
    .alameen-toast-box.success {
      border-left-color: #2E9D74 !important;
    }

    .toast-box.error,
    .alameen-toast-box.error {
      border-left-color: #DC2626 !important;
    }

    .toast-box.info,
    .alameen-toast-box.info {
      border-left-color: #D4AF37 !important;
    }

    .toast-box.toast-exit,
    .alameen-toast-box.toast-exit {
      animation: toastSlideUp 0.24s cubic-bezier(0.4, 0, 1, 1) forwards !important;
    }

    .toast-icon-wrap {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
    }

    .toast-msg-text {
      flex: 1;
      font-size: 14px !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      color: #FFFFFF !important;
      word-break: break-word !important;
    }

    .toast-close-x {
      flex-shrink: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      padding: 2px 6px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    .toast-close-x:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.15);
    }

    @keyframes toastSlideDown {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes toastSlideUp {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-16px) scale(0.96);
      }
    }
  `;
  document.head.appendChild(styleEl);
})();

function getOrCreateToastContainer() {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-top';
    document.body.appendChild(container);
  }
  return container;
}

window.showToast = function(msg, type = 'info') {
  const container = getOrCreateToastContainer();
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `alameen-toast-box ${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  const iconSvg = (type === 'success')
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9D74" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
    : (type === 'error')
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon-wrap">${iconSvg}</div>
    <div class="toast-msg-text">${msg}</div>
    <div class="toast-close-x" aria-label="Dismiss">✕</div>
  `;

  let isDismissing = false;
  const dismiss = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isDismissing) return;
    isDismissing = true;
    toast.classList.add('toast-exit');
    setTimeout(() => {
      try { toast.remove(); } catch (err) {}
    }, 240);
  };

  // Tap to dismiss
  toast.addEventListener('click', dismiss);

  container.appendChild(toast);

  // Auto-hide after 3 seconds
  setTimeout(dismiss, 3000);
};

window.showAlameenToast = window.showToast;
