CREATE TABLE admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO admins (email, password) VALUES ('kiokilho@gmail.com', 'Kiokilho@2026');

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to admins" ON admins FOR SELECT USING (true);
