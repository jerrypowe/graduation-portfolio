-- ==============================================================================
-- Graduation Portfolio: Wishes Table Schema & Security Policies (Supabase SQL)
-- ==============================================================================

-- 1. Create wishes table
create table if not exists public.wishes (
  id uuid default gen_random_uuid() primary key,
  name varchar(40) not null,
  message text not null,
  color varchar(20) default 'yellow',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.wishes enable row level security;

-- 3. Policy: Public Read Access
-- Allows any visitor (anonymous or authenticated) to read graduation wishes
drop policy if exists "Allow public read access on wishes" on public.wishes;
create policy "Allow public read access on wishes"
  on public.wishes
  for select
  using (true);

-- 4. Policy: Public Insert Access with strict server-side validation
-- Allows visitors to insert wishes while restricting malicious oversized payloads
drop policy if exists "Allow public insert on wishes" on public.wishes;
create policy "Allow public insert on wishes"
  on public.wishes
  for insert
  with check (
    char_length(trim(name)) >= 1 and 
    char_length(trim(name)) <= 40 and
    char_length(trim(message)) >= 1 and
    char_length(trim(message)) <= 1000
  );

-- 5. Add index on created_at for fast descending queries
create index if not exists idx_wishes_created_at on public.wishes (created_at desc);
