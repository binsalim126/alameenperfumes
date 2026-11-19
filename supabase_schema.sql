-- ==========================================================================
-- AL-AMEEN PERFUMES — SUPABASE DATABASE SCHEMA
-- Project ID: gqezejlrbmmavhixzand
-- Project URL: https://gqezejlrbmmavhixzand.supabase.co
-- ==========================================================================
-- Instructions:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gqezejlrbmmavhixzand
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New query", paste the entire code below, and click "RUN"
-- ==========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  type text,
  size text,
  rating numeric default 4.8,
  reviews integer default 0,
  retail_price numeric not null,
  mrp numeric,
  wholesale_moq integer default 6,
  wholesale_tiers jsonb default '[]'::jsonb,
  notes jsonb default '{}'::jsonb,
  description text,
  images text[] default array[]::text[],
  bestseller boolean default false,
  in_stock boolean default true,
  created_at timestamp with time zone default now()
);

-- 2. CATEGORIES TABLE
create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  image text,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

-- 3. REVIEWS TABLE
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

-- 4. ORDERS TABLE (Captures all WhatsApp orders)
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  customer_pincode text not null,
  customer_notes text,
  order_type text default 'Retail',
  items jsonb not null,
  subtotal numeric not null,
  shipping numeric default 0,
  total numeric not null,
  status text default 'New', -- 'New', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'
  created_at timestamp with time zone default now()
);

-- 5. SITE SETTINGS & OFFERS TABLE
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.reviews enable row level security;
alter table public.orders enable row level security;
alter table public.site_settings enable row level security;

-- 7. ACCESS POLICIES (Allow public & admin operations with anon key)
drop policy if exists "Allow public read products" on public.products;
drop policy if exists "Allow public insert products" on public.products;
drop policy if exists "Allow public update products" on public.products;
drop policy if exists "Allow public delete products" on public.products;
create policy "Allow public read products" on public.products for select using (true);
create policy "Allow public insert products" on public.products for insert with check (true);
create policy "Allow public update products" on public.products for update using (true);
create policy "Allow public delete products" on public.products for delete using (true);

drop policy if exists "Allow public read categories" on public.categories;
drop policy if exists "Allow public insert categories" on public.categories;
drop policy if exists "Allow public update categories" on public.categories;
drop policy if exists "Allow public delete categories" on public.categories;
create policy "Allow public read categories" on public.categories for select using (true);
create policy "Allow public insert categories" on public.categories for insert with check (true);
create policy "Allow public update categories" on public.categories for update using (true);
create policy "Allow public delete categories" on public.categories for delete using (true);

drop policy if exists "Allow public read reviews" on public.reviews;
drop policy if exists "Allow public insert reviews" on public.reviews;
drop policy if exists "Allow public update reviews" on public.reviews;
drop policy if exists "Allow public delete reviews" on public.reviews;
create policy "Allow public read reviews" on public.reviews for select using (true);
create policy "Allow public insert reviews" on public.reviews for insert with check (true);
create policy "Allow public update reviews" on public.reviews for update using (true);
create policy "Allow public delete reviews" on public.reviews for delete using (true);

drop policy if exists "Allow public read orders" on public.orders;
drop policy if exists "Allow public insert orders" on public.orders;
drop policy if exists "Allow public update orders" on public.orders;
drop policy if exists "Allow public delete orders" on public.orders;
create policy "Allow public read orders" on public.orders for select using (true);
create policy "Allow public insert orders" on public.orders for insert with check (true);
create policy "Allow public update orders" on public.orders for update using (true);
create policy "Allow public delete orders" on public.orders for delete using (true);

drop policy if exists "Allow public read site_settings" on public.site_settings;
drop policy if exists "Allow public insert site_settings" on public.site_settings;
drop policy if exists "Allow public update site_settings" on public.site_settings;
create policy "Allow public read site_settings" on public.site_settings for select using (true);
create policy "Allow public insert site_settings" on public.site_settings for insert with check (true);
create policy "Allow public update site_settings" on public.site_settings for update using (true);
