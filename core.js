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
  offer_end_date: ""
};

// Default Categories for UI Carousel & Filters
const CATEGORIES = [
  { name: "All", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80" },
  { name: "Men", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80" },
  { name: "Women", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80" },
  { name: "Unisex", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80" },
  { name: "Luxury", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=300&q=80" }
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

// ==========================================================================
// 3. ROW FORMATTERS (Database snake_case <-> Frontend camelCase)
// ==========================================================================

function formatProductFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || 'Unnamed Perfume',
    category: row.category || 'Luxury',
    type: row.type || 'Eau de Parfum',
    size: row.size || '100ml',
    rating: Number(row.rating) || 5.0,
    reviews: Number(row.reviews) || 0,
    retailPrice: Number(row.retail_price) || 0,
    mrp: Number(row.mrp) || Number(row.retail_price) || 0,
    stock: typeof row.stock === 'number' ? row.stock : (row.in_stock ? 20 : 0),
    wholesaleMOQ: Number(row.wholesale_moq) || 6,
    wholesaleTiers: Array.isArray(row.wholesale_tiers) && row.wholesale_tiers.length > 0 ? row.wholesale_tiers : [
      { min: 6, max: 11, price: Math.round(Number(row.retail_price) * 0.6) },
      { min: 12, max: 23, price: Math.round(Number(row.retail_price) * 0.55) },
      { min: 24, max: 9999, price: Math.round(Number(row.retail_price) * 0.5) }
    ],
    notes: row.notes && typeof row.notes === 'object' ? row.notes : { top: '', heart: '', base: '' },
    description: row.description || '',
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
    bestseller: !!row.bestseller,
    newArrival: !!row.new_arrival,
    active: row.in_stock !== false,
    createdAt: row.created_at
  };
}

function formatProductToRow(product) {
  const retail = Number(product.retailPrice) || 0;
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    type: product.type || 'Eau de Parfum',
    size: product.size || '100ml',
    rating: Number(product.rating) || 5.0,
    reviews: Number(product.reviews) || 0,
    retail_price: retail,
    mrp: Number(product.mrp) || Math.round(retail * 1.4),
    stock: typeof product.stock === 'number' ? product.stock : 20,
    wholesale_moq: Number(product.wholesaleMOQ) || 6,
    wholesale_tiers: Array.isArray(product.wholesaleTiers) ? product.wholesaleTiers : [],
    notes: product.notes || { top: '', heart: '', base: '' },
    description: product.description || '',
    images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [],
    bestseller: !!product.bestseller,
    new_arrival: !!product.newArrival,
    in_stock: (typeof product.stock === 'number') ? product.stock > 0 : (product.active !== false)
  };
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

  const { data, error } = await sb
    .from('products')
    .insert([payload])
    .select();

  if (error) {
    console.error('[Supabase Insert Product Error]', error);
    throw new Error(`Database insert failed: ${error.message} (Code: ${error.code})`);
  }

  if (!data || data.length === 0) {
    throw new Error("Database insert affected 0 rows. Please verify Supabase RLS INSERT policy.");
  }

  return formatProductFromRow(data[0]);
}

// Update an existing product in Supabase
async function dbUpdateProduct(product) {
  const sb = getSupabase();
  const payload = formatProductToRow(product);

  const { data, error } = await sb
    .from('products')
    .update(payload)
    .eq('id', product.id)
    .select();

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

  const { data, error } = await sb
    .from('products')
    .upsert(rows)
    .select();

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

function calculateProductPrice(product, mode = 'retail', qty = 1, settings = null) {
  if (!settings) settings = DEFAULT_SETTINGS;
  
  let isOfferActive = settings.offer_enabled && settings.offer_discount_percent > 0;
  
  if (isOfferActive && settings.offer_applies_to) {
    if (settings.offer_applies_to === 'retail' && mode !== 'retail') isOfferActive = false;
    if (settings.offer_applies_to === 'wholesale' && mode !== 'wholesale') isOfferActive = false;
  }

  const discountRate = isOfferActive ? (1 - settings.offer_discount_percent / 100) : 1;

  if (mode === 'retail') {
    const originalPrice = product.retailPrice || 0;
    const effectiveUnitPrice = isOfferActive ? Math.round(originalPrice * discountRate) : originalPrice;
    return {
      unitPrice: effectiveUnitPrice,
      originalPrice: originalPrice,
      isOffer: isOfferActive,
      discountPercent: settings.offer_discount_percent,
      totalPrice: effectiveUnitPrice * qty
    };
  } else {
    let matchedTier = (product.wholesaleTiers && product.wholesaleTiers.length > 0)
      ? product.wholesaleTiers[0]
      : { price: Math.round((product.retailPrice || 0) * 0.6) };

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

// Global Exports
window.dbFetchProducts = dbFetchProducts;
window.dbFetchOrders = dbFetchOrders;
window.dbFetchSettings = dbFetchSettings;
window.dbCreateProduct = dbCreateProduct;
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
