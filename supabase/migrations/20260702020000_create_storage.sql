-- Migration: create_storage
-- Created at: 2026-07-02 02:00:00

-- Create "products" bucket for storing product images
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Set up public access controls for storage.objects
-- WARNING: This allows anyone to upload/delete files. For development only!

create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

create policy "Public Insert"
on storage.objects for insert
with check ( bucket_id = 'products' );

create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'products' );

create policy "Public Delete"
on storage.objects for delete
using ( bucket_id = 'products' );
