-- Migration: create_categories
-- Created at: 2026-07-02 03:00:00

create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.categories enable row level security;

-- Public policies for development/prototype (no auth required)
create policy "Enable read access for all users" on public.categories for select using (true);
create policy "Enable insert for all users" on public.categories for insert with check (true);
create policy "Enable update for all users" on public.categories for update using (true);
create policy "Enable delete for all users" on public.categories for delete using (true);

-- Insert default categories to get started
insert into public.categories (name) values
('Tote Bag'),
('Sling Bag'),
('Backpack')
on conflict (name) do nothing;
