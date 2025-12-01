-- 1. Pastikan Keamanan (RLS) Aktif
alter table public.products enable row level security;

-- 2. Reset Policy (Hapus aturan lama biar tidak bentrok, lalu buat baru)
drop policy if exists "Produk dapat dilihat publik" on public.products;

create policy "Produk dapat dilihat publik"
on public.products for select
to anon, authenticated
using (true);

-- 3. Aktifkan Ekstensi Tambahan (Untuk merapikan teks/slug)
create extension if not exists "unaccent";

-- 4. Buat/Update Fungsi Pembuat Slug
create or replace function public.slugify(
  v text
) returns text as $$
begin
  -- Ubah ke huruf kecil, hilangkan aksen, ganti spasi jadi strip (-)
  return trim(both '-' from regexp_replace(lower(unaccent(v)), '[^a-z0-9]+', '-', 'g'));
end;
$$ language plpgsql;

-- 5. Buat/Update Fungsi Pemicu (Trigger Function)
create or replace function public.set_slug() returns trigger as $$
begin
  -- Cek: Jika kolom slug kosong, buatkan otomatis dari kolom name
  if new.slug is null or new.slug = '' then
    new.slug := public.slugify(new.name);
  end if;
  return new;
end;
$$ language plpgsql;

-- 6. Pasang Trigger ke Tabel Products
-- (Hapus trigger lama dulu biar tidak error "already exists")
drop trigger if exists "products_slug_insert" on public.products;

create trigger "products_slug_insert"
before insert on public.products
for each row execute procedure public.set_slug();