-- Phase 1: Cart table for ShopSphere
-- Run this in Supabase SQL Editor.

create table if not exists public.cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id bigint not null,
  title text not null,
  price numeric(10,2) not null,
  quantity integer not null default 1 check (quantity > 0),
  image text,
  created_at timestamp with time zone not null default now(),
  unique (user_id, product_id)
);

-- Helpful indexes for common queries
create index if not exists cart_items_user_id_idx on public.cart_items(user_id);
create index if not exists cart_items_created_at_idx on public.cart_items(created_at desc);

-- Enable Row Level Security (Phase 4 policies can be added later)
alter table public.cart_items enable row level security;
