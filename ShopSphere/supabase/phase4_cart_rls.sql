-- Phase 4: Basic Row Level Security policies for cart_items
-- Run this entire file in Supabase SQL Editor.

alter table public.cart_items enable row level security;

drop policy if exists "Users can view own cart" on public.cart_items;
drop policy if exists "Users can insert own cart" on public.cart_items;
drop policy if exists "Users can update own cart" on public.cart_items;
drop policy if exists "Users can delete own cart" on public.cart_items;

create policy "Users can view own cart"
on public.cart_items
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own cart"
on public.cart_items
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own cart"
on public.cart_items
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own cart"
on public.cart_items
for delete
to authenticated
using (auth.uid() = user_id);

-- Optional verification query (run after creating policies)
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'cart_items';
