-- Migration: add_dimensions_to_products
-- Created at: 2026-07-02 04:00:00

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS dimensions text DEFAULT '30 x 15 x 40 cm';
