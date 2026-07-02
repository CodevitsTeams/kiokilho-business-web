-- Migration: enable_public_crud
-- Created at: 2026-07-02 01:00:00

-- Enable public access for INSERT, UPDATE, DELETE on products table
-- WARNING: This is for development/prototype purposes only.
-- In production, these actions should be protected by authentication.

CREATE POLICY "Enable insert for all users" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.products FOR DELETE USING (true);
