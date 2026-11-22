-- ==========================================================================
-- AL-AMEEN PERFUMES — COMPLETE SUPABASE DATABASE SCHEMA & REALTIME SETUP
-- Project ID: gqezejlrbmmavhixzand
-- Project URL: https://gqezejlrbmmavhixzand.supabase.co
-- ==========================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/gqezejlrbmmavhixzand
-- 2. Click on "SQL Editor" in the left navigation sidebar
-- 3. Click "New query", paste this entire script, and click "RUN" (green button)
-- ==========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- --------------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- --------------------------------------------------------------------------
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  type text default 'Eau de Parfum',
  size text default '100ml',
  rating numeric default 4.8,
  reviews integer default 0,
  retail_price numeric not null,
  mrp numeric,
  stock integer default 20,
  wholesale_moq integer default 6,
  wholesale_tiers jsonb default '[]'::jsonb,
  bottle_sizes jsonb default '[]'::jsonb,
  notes jsonb default '{"top": "", "heart": "", "base": ""}'::jsonb,
  description text,
  images text[] default array[]::text[],
  bestseller boolean default false,
  new_arrival boolean default false,
  in_stock boolean default true,
  created_at timestamp with time zone default now()
);

-- Ensure missing columns are added if table was previously partially created
alter table public.products add column if not exists stock integer default 20;
alter table public.products add column if not exists new_arrival boolean default false;
alter table public.products add column if not exists in_stock boolean default true;
alter table public.products add column if not exists wholesale_tiers jsonb default '[]'::jsonb;
alter table public.products add column if not exists bottle_sizes jsonb default '[]'::jsonb;
alter table public.products add column if not exists notes jsonb default '{"top": "", "heart": "", "base": ""}'::jsonb;

-- --------------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- --------------------------------------------------------------------------
create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  image text,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

-- --------------------------------------------------------------------------
-- 3. ORDERS TABLE (Captures all store orders with items & customer details)
-- --------------------------------------------------------------------------
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  customer_pincode text,
  customer_notes text,
  order_type text default 'Retail',
  items jsonb not null,
  subtotal numeric not null,
  discount numeric default 0,
  shipping numeric default 0,
  total numeric not null,
  status text default 'New', -- 'New', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'
  payment_status text default 'Pending', -- 'Pending', 'Paid', 'Partial'
  history jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

alter table public.orders add column if not exists discount numeric default 0;
alter table public.orders add column if not exists payment_status text default 'Pending';
alter table public.orders add column if not exists history jsonb default '[]'::jsonb;

-- --------------------------------------------------------------------------
-- 4. SITE SETTINGS TABLE (Announcements, Offers, Admin Auth & Parameters)
-- --------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

-- --------------------------------------------------------------------------
-- 5. REVIEWS & TESTIMONIALS TABLE
-- --------------------------------------------------------------------------
create table if not exists public.reviews (
  id text primary key,
  customer_name text not null,
  location text,
  order_type text default 'Retail Order',
  rating integer default 5,
  quote text not null,
  is_approved boolean default true,
  created_at timestamp with time zone default now()
);

-- --------------------------------------------------------------------------
-- 6. GRANT TABLE & SCHEMA PRIVILEGES TO ANON AND AUTHENTICATED ROLES
-- --------------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines in schema public to anon, authenticated, service_role;

-- --------------------------------------------------------------------------
-- 7. ENABLE ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.site_settings enable row level security;
alter table public.reviews enable row level security;

-- --------------------------------------------------------------------------
-- 8. RLS POLICIES (Full CRUD access for anonymous public store & admin client)
-- --------------------------------------------------------------------------
-- PRODUCTS
drop policy if exists "Allow public read products" on public.products;
drop policy if exists "Allow public insert products" on public.products;
drop policy if exists "Allow public update products" on public.products;
drop policy if exists "Allow public delete products" on public.products;
create policy "Allow public read products" on public.products for select using (true);
create policy "Allow public insert products" on public.products for insert with check (true);
create policy "Allow public update products" on public.products for update using (true);
create policy "Allow public delete products" on public.products for delete using (true);

-- CATEGORIES
drop policy if exists "Allow public read categories" on public.categories;
drop policy if exists "Allow public insert categories" on public.categories;
drop policy if exists "Allow public update categories" on public.categories;
drop policy if exists "Allow public delete categories" on public.categories;
create policy "Allow public read categories" on public.categories for select using (true);
create policy "Allow public insert categories" on public.categories for insert with check (true);
create policy "Allow public update categories" on public.categories for update using (true);
create policy "Allow public delete categories" on public.categories for delete using (true);

-- ORDERS
drop policy if exists "Allow public read orders" on public.orders;
drop policy if exists "Allow public insert orders" on public.orders;
drop policy if exists "Allow public update orders" on public.orders;
drop policy if exists "Allow public delete orders" on public.orders;
create policy "Allow public read orders" on public.orders for select using (true);
create policy "Allow public insert orders" on public.orders for insert with check (true);
create policy "Allow public update orders" on public.orders for update using (true);
create policy "Allow public delete orders" on public.orders for delete using (true);

-- SITE SETTINGS
drop policy if exists "Allow public read site_settings" on public.site_settings;
drop policy if exists "Allow public insert site_settings" on public.site_settings;
drop policy if exists "Allow public update site_settings" on public.site_settings;
drop policy if exists "Allow public delete site_settings" on public.site_settings;
create policy "Allow public read site_settings" on public.site_settings for select using (true);
create policy "Allow public insert site_settings" on public.site_settings for insert with check (true);
create policy "Allow public update site_settings" on public.site_settings for update using (true);
create policy "Allow public delete site_settings" on public.site_settings for delete using (true);

-- REVIEWS
drop policy if exists "Allow public read reviews" on public.reviews;
drop policy if exists "Allow public insert reviews" on public.reviews;
drop policy if exists "Allow public update reviews" on public.reviews;
drop policy if exists "Allow public delete reviews" on public.reviews;
create policy "Allow public read reviews" on public.reviews for select using (true);
create policy "Allow public insert reviews" on public.reviews for insert with check (true);
create policy "Allow public update reviews" on public.reviews for update using (true);
create policy "Allow public delete reviews" on public.reviews for delete using (true);

-- --------------------------------------------------------------------------
-- 8. ENABLE REALTIME REPLICATION (Real-time sync across phones & laptops)
-- --------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'products') then
    alter publication supabase_realtime add table public.products;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'orders') then
    alter publication supabase_realtime add table public.orders;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'site_settings') then
    alter publication supabase_realtime add table public.site_settings;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'categories') then
    alter publication supabase_realtime add table public.categories;
  end if;
end $$;

-- --------------------------------------------------------------------------
-- 9. SEED 4 AUTHENTIC AL-AMEEN FLAGSHIP PERFUMES INTO DATABASE
-- --------------------------------------------------------------------------
insert into public.products (id, name, category, type, size, rating, reviews, retail_price, mrp, stock, wholesale_moq, wholesale_tiers, notes, description, images, bestseller, new_arrival, in_stock)
values
(
  'p1',
  'Al-Ameen Sultan Attar',
  'Luxury',
  'Pure Concentrated Oil',
  '12ml',
  5.0,
  128,
  1499,
  2199,
  28,
  6,
  '[{"min": 6, "max": 11, "price": 780}, {"min": 12, "max": 23, "price": 710}, {"min": 24, "max": 9999, "price": 640}]'::jsonb,
  '{"top": "Cambodian Oud, Saffron Stigmas", "heart": "Taif Rose, Smoked Amber", "base": "Aged Assam Agarwood, Black Musk"}'::jsonb,
  'An imperial non-alcoholic blend crafted from triple-distilled aged Assam oud and handpicked Taif roses. Lingers 24+ hours.',
  array['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
  true,
  false,
  true
),
(
  'p2',
  'Royal Oud Intense',
  'Men',
  'Eau de Parfum',
  '100ml',
  4.9,
  94,
  2499,
  3499,
  18,
  6,
  '[{"min": 6, "max": 11, "price": 1350}, {"min": 12, "max": 23, "price": 1220}, {"min": 24, "max": 9999, "price": 1100}]'::jsonb,
  '{"top": "Bergamot, Pink Pepper", "heart": "Cedarwood, Angelica Root", "base": "Smoky Agarwood, Indian Sandalwood"}'::jsonb,
  'Sophisticated French-Arabian formulation designed for evening events and royal gatherings. Deep, commanding, unforgettable.',
  array['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'],
  true,
  true,
  true
),
(
  'p3',
  'Noor-E-Gulab (Rose Elixir)',
  'Women',
  'Eau de Parfum',
  '50ml',
  4.8,
  112,
  1899,
  2599,
  22,
  6,
  '[{"min": 6, "max": 11, "price": 990}, {"min": 12, "max": 23, "price": 890}, {"min": 24, "max": 9999, "price": 810}]'::jsonb,
  '{"top": "Morning Dew Roses, Lychee", "heart": "Damask Rose, Peony Petals", "base": "White Amber, Cashmere Musk"}'::jsonb,
  'Freshly blossomed Taif roses dipped in crystal morning dew with soft sensual white amber undertones.',
  array['https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80'],
  true,
  false,
  true
),
(
  'p4',
  'Zafraan & Sandalwood Pure',
  'Luxury',
  'Pure Concentrated Oil',
  '12ml',
  4.9,
  73,
  1999,
  2799,
  15,
  6,
  '[{"min": 6, "max": 11, "price": 1050}, {"min": 12, "max": 23, "price": 950}, {"min": 24, "max": 9999, "price": 860}]'::jsonb,
  '{"top": "Kashmiri Saffron, Cardamom", "heart": "Saffron, Bulgarian Rose", "base": "Pure Mysore Sandalwood Oil"}'::jsonb,
  '100% alcohol-free traditional attar crafted using age-old hydro-distillation with pure Mysore sandalwood oil.',
  array['https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80'],
  true,
  false,
  true
)
on conflict (id) do update set
  name = excluded.name,
  retail_price = excluded.retail_price,
  wholesale_tiers = excluded.wholesale_tiers,
  stock = excluded.stock,
  in_stock = excluded.in_stock;

-- Seed default categories
insert into public.categories (id, name, image, display_order)
values
  ('cat_all', 'All', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80', 1),
  ('cat_men', 'Men', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80', 2),
  ('cat_women', 'Women', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80', 3),
  ('cat_unisex', 'Unisex', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80', 4),
  ('cat_luxury', 'Luxury', 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=300&q=80', 5)
on conflict (id) do nothing;

-- Seed default site settings
insert into public.site_settings (key, value)
values
  ('general', '{"store_name": "AL-AMEEN PERFUMES", "tagline": "Discover Your Signature Scent", "whatsapp_number": "919446617266", "store_phone": "+91 94466 17266", "store_email": "alameenperfumes786@gmail.com", "store_address": "Alameen Perfumes Online, Near Ernakulam, Eramalloor, 688537, Keralam", "courier_partners": "DTDC, Speed & Safe Gokulam", "free_shipping_min": 999, "low_stock_threshold": 10, "announcement_enabled": false, "announcement_text": "Free shipping Pan-India · Wholesale rates available", "offer_enabled": false, "offer_name": "Festive Season Special", "offer_badge": "Festive Offer", "offer_discount_percent": 15, "offer_applies_to": "both"}'::jsonb),
  ('admin_auth', '{"admin_id": "AlameenPerfumes", "password_hash": "Alameen@786"}'::jsonb)
on conflict (key) do nothing;

-- --------------------------------------------------------------------------
-- 11. WHOLESALE COLUMNS MIGRATION (Optional native columns)
-- --------------------------------------------------------------------------
alter table public.products add column if not exists wholesale_price numeric;
alter table public.products add column if not exists wholesale_sizes jsonb;

-- --------------------------------------------------------------------------
-- 12. SUPABASE STORAGE BUCKET FOR PRODUCT IMAGES (Phone & Computer Uploads)
-- --------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public Access for Product Images" on storage.objects;
create policy "Public Access for Product Images"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Public Insert for Product Images" on storage.objects;
create policy "Public Insert for Product Images"
on storage.objects for insert
with check (bucket_id = 'product-images');

drop policy if exists "Public Update for Product Images" on storage.objects;
create policy "Public Update for Product Images"
on storage.objects for update
using (bucket_id = 'product-images');

drop policy if exists "Public Delete for Product Images" on storage.objects;
create policy "Public Delete for Product Images"
on storage.objects for delete
using (bucket_id = 'product-images');

-- --------------------------------------------------------------------------
-- 13. RELOAD POSTGREST SCHEMA CACHE
-- --------------------------------------------------------------------------
notify pgrst, 'reload schema';
